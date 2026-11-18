#!/usr/bin/env node
// Wiki linter: checks the flat wiki/ directory against wiki/conventions.md.
// Usage: node .claude/skills/wiki-maintain/scripts/lint.mjs [wikiDir]
// Exits 1 if any errors are found; warnings never fail.

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";

const wikiDir = resolve(process.argv[2] ?? "wiki");
const repoRoot = dirname(wikiDir);
const errors = [];
const warnings = [];

const REQUIRED_KEYS = ["title", "type", "status", "updated", "summary"];
const PREFIX_INDEX = {
	"source-": "index-sources.md",
	"research-": "index-research.md",
	"adr-": "index-decisions.md",
	"ticket-": "index-tickets.md",
	"session-": "index-sessions.md",
};
const STATUSES = {
	adr: ["proposed", "accepted", "superseded", "rejected"],
	ticket: ["todo", "in-progress", "done", "dropped"],
};
const DEFAULT_STATUSES = ["active", "draft", "stale"];

const entries = readdirSync(wikiDir);
for (const e of entries) {
	if (statSync(join(wikiDir, e)).isDirectory())
		errors.push(`subdirectory not allowed (flat wiki): ${e}/`);
	else if (!e.endsWith(".md")) warnings.push(`non-markdown file in wiki: ${e}`);
	else if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(e))
		errors.push(`filename not lowercase kebab-case: ${e}`);
}
const pages = entries.filter((e) => e.endsWith(".md"));

function frontmatter(text) {
	const m = text.match(/^---\n([\s\S]*?)\n---\n/);
	if (!m) return null;
	const fm = {};
	for (const line of m[1].split("\n")) {
		const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
		if (kv) fm[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1");
	}
	return fm;
}

const inbound = Object.fromEntries(pages.map((p) => [p, new Set()]));
const contents = {};

for (const page of pages) {
	const text = readFileSync(join(wikiDir, page), "utf8");
	contents[page] = text;
	const fm = frontmatter(text);
	if (!fm) {
		errors.push(`${page}: missing YAML frontmatter`);
	} else {
		for (const k of REQUIRED_KEYS) if (!fm[k]) errors.push(`${page}: frontmatter missing "${k}"`);
		const allowed = STATUSES[fm.type] ?? DEFAULT_STATUSES;
		if (fm.status && !allowed.includes(fm.status))
			errors.push(
				`${page}: status "${fm.status}" not valid for type "${fm.type}" (allowed: ${allowed.join(", ")})`,
			);
		if (fm.updated && !/^\d{4}-\d{2}-\d{2}$/.test(fm.updated))
			errors.push(`${page}: "updated" must be YYYY-MM-DD`);
		// Each page has exactly one H1, and it repeats the frontmatter title: agents read the title
		// from the frontmatter, humans see the H1. Fenced code is skipped so examples don't count.
		const body = text.replace(/^---\n[\s\S]*?\n---\n/, "").replace(/```[\s\S]*?```/g, "");
		const h1s = [...body.matchAll(/^# (.+)$/gm)].map(([, heading]) => heading.trim());
		if (h1s.length !== 1) errors.push(`${page}: expected exactly one H1, found ${h1s.length}`);
		else if (fm.title && h1s[0] !== fm.title)
			errors.push(`${page}: H1 "${h1s[0]}" does not match frontmatter title "${fm.title}"`);
	}
	if (/\[\[[^\]]+\]\]/.test(text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "")))
		errors.push(`${page}: uses [[wikilinks]] (not rendered by GitHub); use [text](page.md)`);

	// Strip fenced and inline code so example links are ignored.
	const prose = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
	for (const [, target] of prose.matchAll(/\]\(([^)\s]+)\)/g)) {
		if (/^(https?:|mailto:|#)/.test(target)) continue;
		const path = decodeURIComponent(target.split("#")[0]);
		const abs = resolve(wikiDir, path);
		if (!existsSync(abs)) {
			errors.push(`${page}: broken link -> ${target}`);
			continue;
		}
		if (dirname(abs) === wikiDir && inbound[path] && path !== page) inbound[path].add(page);
		if (dirname(abs) !== wikiDir && !abs.startsWith(repoRoot))
			warnings.push(`${page}: link leaves repo -> ${target}`);
	}
}

for (const page of pages) {
	if (page === "index.md") continue;
	if (inbound[page].size === 0) errors.push(`${page}: orphan (no other wiki page links to it)`);
	for (const [prefix, index] of Object.entries(PREFIX_INDEX)) {
		if (page.startsWith(prefix) && contents[index] && !contents[index].includes(`](${page})`))
			errors.push(`${page}: not listed in ${index}`);
	}
}

// Kanban and ticket index must agree with each ticket's status.
for (const page of pages.filter((p) => p.startsWith("ticket-"))) {
	const status = frontmatter(contents[page])?.status;
	const idx = contents["index-tickets.md"] ?? "";
	const row = idx.split("\n").find((l) => l.includes(`](${page})`));
	if (
		row &&
		status &&
		!row
			.split("|")
			.map((cell) => cell.trim())
			.includes(status)
	)
		errors.push(`index-tickets.md: status for ${page} disagrees with ticket (${status})`);
	const kanban = contents["kanban.md"] ?? "";
	const sections = kanban.split(/^## /m).slice(1);
	const section = sections.find((s) => s.includes(`](${page})`));
	const expected = {
		"todo": "Todo",
		"in-progress": "In progress",
		"done": "Done",
		"dropped": "Dropped",
	}[status];
	if (!section) errors.push(`kanban.md: ${page} missing from board`);
	else if (expected && !section.startsWith(expected))
		errors.push(`kanban.md: ${page} is in the wrong column (ticket says ${status})`);
}

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(
	`\n${pages.length} pages checked: ${errors.length} error(s), ${warnings.length} warning(s).`,
);
process.exit(errors.length ? 1 : 0);
