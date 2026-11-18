// Wiki linter: checks the flat wiki/ directory against wiki/conventions.md.
// Usage: node .claude/skills/wiki-maintain/scripts/lint.ts [--fix] [wikiDir]
// Node.js runs it directly by stripping the types. Exits 1 if any errors are found; warnings never
// fail. `--fix` adds every missing backlink to the target page's "See also" section, then exits so
// the check can be run again.

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

type Frontmatter = Partial<Record<string, string>>;

const args = process.argv.slice(2);
const fix = args.includes("--fix");
const wikiDir = resolve(args.find((arg) => !arg.startsWith("--")) ?? "wiki");
const repoRoot = dirname(wikiDir);
const errors: string[] = [];
const warnings: string[] = [];

const REQUIRED_KEYS = ["title", "type", "status", "updated", "summary"] as const;
const PREFIX_INDEX: Readonly<Record<string, string>> = {
	"source-": "index-sources.md",
	"research-": "index-research.md",
	"adr-": "index-decisions.md",
	"ticket-": "index-tickets.md",
	"session-": "index-sessions.md",
	"pr-": "index-pull-requests.md",
};
const STATUSES: Readonly<Partial<Record<string, readonly string[]>>> = {
	adr: ["proposed", "accepted", "superseded", "rejected"],
	ticket: ["todo", "in-progress", "done", "dropped"],
};
const DEFAULT_STATUSES: readonly string[] = ["active", "draft", "stale"];
const STATUSLESS_TYPES: ReadonlySet<string> = new Set(["pr"]);
const KANBAN_COLUMNS: Readonly<Partial<Record<string, string>>> = {
	"todo": "Todo",
	"in-progress": "In progress",
	"done": "Done",
	"dropped": "Dropped",
};

/** Removes fenced and inline code, so examples inside code don't count as links or headings. */
const withoutCode = (text: string): string =>
	text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");

/**
 * Adds list items to the page's "See also" section. The items go at the end of the section if it
 * exists, wherever it is (the log keeps it above its entries); otherwise a new section is appended
 * to the page.
 */
const addToSeeAlso = (text: string, items: string): string => {
	const heading = /^## See also\n/m.exec(text);
	if (heading === null) return `${text.trimEnd()}\n\n## See also\n\n${items}\n`;
	const start = heading.index + heading[0].length;
	const next = /^## /m.exec(text.slice(start));
	const end = next === null ? text.length : start + next.index;
	const section = text.slice(start, end).trimEnd();
	return `${text.slice(0, start)}${section}\n${items}\n${next === null ? "" : "\n"}${text.slice(end)}`;
};

/** Reads the flat `key: value` pairs of a page's YAML frontmatter, or `null` if it has none. */
const frontmatter = (text: string): Frontmatter | null => {
	const block = /^---\n([\s\S]*?)\n---\n/.exec(text)?.[1];
	if (block === undefined) return null;
	const fields: Frontmatter = {};
	for (const line of block.split("\n")) {
		const [, key, value] = /^([a-zA-Z_]+):\s*(.*)$/.exec(line) ?? [];
		if (key !== undefined && value !== undefined) fields[key] = value.replace(/^"(.*)"$/, "$1");
	}
	return fields;
};

const entries = readdirSync(wikiDir);
for (const entry of entries) {
	if (statSync(join(wikiDir, entry)).isDirectory())
		errors.push(`subdirectory not allowed (flat wiki): ${entry}/`);
	else if (!entry.endsWith(".md")) warnings.push(`non-markdown file in wiki: ${entry}`);
	else if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(entry))
		errors.push(`filename not lowercase kebab-case: ${entry}`);
}
const pages = entries.filter((entry) => entry.endsWith(".md"));

// Wiki-page links in both directions, so every link can be checked for a link back.
const inbound = new Map(pages.map((page) => [page, new Set<string>()]));
const outbound = new Map(pages.map((page) => [page, new Set<string>()]));
const contents = new Map<string, string>();

for (const page of pages) {
	const text = readFileSync(join(wikiDir, page), "utf8");
	contents.set(page, text);
	const fm = frontmatter(text);
	if (fm === null) {
		errors.push(`${page}: missing YAML frontmatter`);
	} else {
		const { title, type, status, updated } = fm;
		// A PR page has no status: it would go stale as soon as the PR merges, and the GitHub link
		// always shows the current one.
		const statusless = STATUSLESS_TYPES.has(type ?? "");
		for (const key of REQUIRED_KEYS)
			if (!fm[key] && !(key === "status" && statusless))
				errors.push(`${page}: frontmatter missing "${key}"`);
		if (statusless && status !== undefined)
			errors.push(`${page}: "${type}" pages have no status; link to the source of truth instead`);
		const allowed = (type !== undefined && STATUSES[type]) || DEFAULT_STATUSES;
		if (status !== undefined && !statusless && !allowed.includes(status))
			errors.push(
				`${page}: status "${status}" not valid for type "${type}" (allowed: ${allowed.join(", ")})`,
			);
		if (updated !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(updated))
			errors.push(`${page}: "updated" must be YYYY-MM-DD`);
		// Each page has exactly one H1, and it repeats the frontmatter title: agents read the title
		// from the frontmatter, humans see the H1. Fenced code is skipped so examples don't count.
		const body = text.replace(/^---\n[\s\S]*?\n---\n/, "").replace(/```[\s\S]*?```/g, "");
		const h1s = [...body.matchAll(/^# (.+)$/gm)].map(([, heading = ""]) => heading.trim());
		const [h1] = h1s;
		if (h1s.length !== 1) errors.push(`${page}: expected exactly one H1, found ${h1s.length}`);
		else if (title && h1 !== title)
			errors.push(`${page}: H1 "${h1}" does not match frontmatter title "${title}"`);
	}

	const prose = withoutCode(text);
	if (/\[\[[^\]]+\]\]/.test(prose))
		errors.push(`${page}: uses [[wikilinks]] (not rendered by GitHub); use [text](page.md)`);

	for (const [, target = ""] of prose.matchAll(/\]\(([^)\s]+)\)/g)) {
		if (/^(https?:|mailto:|#)/.test(target)) continue;
		const path = decodeURIComponent(target.split("#")[0] ?? "");
		const abs = resolve(wikiDir, path);
		if (!existsSync(abs)) {
			errors.push(`${page}: broken link -> ${target}`);
			continue;
		}
		if (dirname(abs) === wikiDir && path !== page && inbound.has(path)) {
			inbound.get(path)?.add(page);
			outbound.get(page)?.add(path);
		}
		if (dirname(abs) !== wikiDir && !abs.startsWith(repoRoot))
			warnings.push(`${page}: link leaves repo -> ${target}`);
	}
}

for (const page of pages) {
	if (page === "index.md") continue;
	if (inbound.get(page)?.size === 0)
		errors.push(`${page}: orphan (no other wiki page links to it)`);
	for (const [prefix, index] of Object.entries(PREFIX_INDEX)) {
		const indexText = contents.get(index);
		if (page.startsWith(prefix) && indexText !== undefined && !indexText.includes(`](${page})`))
			errors.push(`${page}: not listed in ${index}`);
	}
}

// Every link between wiki pages needs a link back, because VS Code's preview has no back button.
// Links woven into the prose count; the rest go in a "See also" section.
const missingBacklinks = new Map<string, string[]>();
for (const [page, targets] of outbound) {
	for (const target of targets) {
		if (outbound.get(target)?.has(page)) continue;
		missingBacklinks.set(target, [...(missingBacklinks.get(target) ?? []), page]);
	}
}
if (fix) {
	for (const [page, sources] of missingBacklinks) {
		const items = sources
			.toSorted()
			.map((source) => {
				const title = frontmatter(contents.get(source) ?? "")?.["title"] ?? source;
				return `- [${title}](${source})`;
			})
			.join("\n");
		writeFileSync(join(wikiDir, page), addToSeeAlso(contents.get(page) ?? "", items));
	}
	const count = [...missingBacklinks.values()].flat().length;
	console.log(
		`Added ${count} backlink(s) to ${missingBacklinks.size} page(s). Run the check again.`,
	);
	process.exit(0);
}
for (const [page, sources] of missingBacklinks)
	for (const source of sources) errors.push(`${page}: no backlink to ${source}, which links here`);

// Kanban and ticket index must agree with each ticket's status.
const ticketIndex = contents.get("index-tickets.md") ?? "";
const kanbanSections = (contents.get("kanban.md") ?? "").split(/^## /m).slice(1);
for (const page of pages.filter((p) => p.startsWith("ticket-"))) {
	const status = frontmatter(contents.get(page) ?? "")?.["status"];
	const row = ticketIndex.split("\n").find((line) => line.includes(`](${page})`));
	const cells = row?.split("|").map((cell) => cell.trim());
	if (status !== undefined && cells !== undefined && !cells.includes(status))
		errors.push(`index-tickets.md: status for ${page} disagrees with ticket (${status})`);
	const section = kanbanSections.find((s) => s.includes(`](${page})`));
	const column = status === undefined ? undefined : KANBAN_COLUMNS[status];
	if (section === undefined) errors.push(`kanban.md: ${page} missing from board`);
	else if (column !== undefined && !section.startsWith(column))
		errors.push(`kanban.md: ${page} is in the wrong column (ticket says ${status})`);
}

for (const warning of warnings) console.log(`WARN  ${warning}`);
for (const error of errors) console.log(`ERROR ${error}`);
console.log(
	`\n${pages.length} pages checked: ${errors.length} error(s), ${warnings.length} warning(s).`,
);
process.exit(errors.length > 0 ? 1 : 0);
