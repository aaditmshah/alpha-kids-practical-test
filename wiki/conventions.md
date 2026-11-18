---
title: Wiki Conventions
type: meta
status: active
updated: 2026-11-18
summary: The rules for this wiki. Covers the flat layout, file naming, frontmatter, linking, and how to add, change and record things.
---

# Wiki Conventions

This wiki holds the full state of the project: what we researched, decided, planned and built, and how we worked. It is written mainly for AI agents, but every page must also read well for a human. Anyone should be able to browse it like Wikipedia, in VS Code or on GitHub.

Back to: [Home](index.md)

## Layout

- **Flat directory.** Every page lives directly in `wiki/`. Never create subdirectories. Flat files make links trivial: every link is just `[Text](other-page.md)`.
- **Page type comes from the filename prefix.** Without folders, a prefix groups related pages so they sort together:

| Prefix                   | Type                                                                              | Example                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `index-`                 | Category index                                                                    | [index-decisions.md](index-decisions.md)                                                                                                 |
| `source-`                | A raw source, captured as it was and never edited afterwards                      | [source-practical-test-brief.md](source-practical-test-brief.md)                                                                         |
| `research-`              | What we learned on a topic, with citations                                        | [research-alpha-kids.md](research-alpha-kids.md)                                                                                         |
| `adr-NNNN-`              | Architectural decision record                                                     | [adr-0001-flat-llm-wiki.md](adr-0001-flat-llm-wiki.md)                                                                                   |
| `ticket-NNNN-`           | A unit of work tracked on the [Kanban board](kanban.md)                           | [ticket-0001-set-up-wiki.md](ticket-0001-set-up-wiki.md)                                                                                 |
| `session-YYYY-MM-DD-NN-` | A record of one working conversation: what was discussed, asked, decided and done | [session-2026-11-18-01-kickoff.md](session-2026-11-18-01-kickoff.md)                                                                     |
| _(no prefix)_            | Hub and singleton pages                                                           | [plan.md](plan.md), [requirements.md](requirements.md), [kanban.md](kanban.md), [log.md](log.md), [open-questions.md](open-questions.md) |

- Filenames are lowercase kebab-case, ASCII only. Numbers are zero-padded to 4 digits and never reused.

## Frontmatter

Every page starts with YAML frontmatter, so an agent can triage it without reading the body:

```yaml
---
title: Human readable title
type: meta | index | source | research | adr | ticket | session | plan | board | log
status: (see below)
updated: YYYY-MM-DD
summary: One or two sentences. This is what the index pages repeat.
---
```

The body then starts with exactly one H1 that repeats `title` word for word, for example `# Wiki Conventions`. The frontmatter is what agents read; the H1 is the prominent title humans see, since VS Code's preview hides frontmatter and GitHub shows it only as a small table. The wiki linter fails if the two differ, and `.markdownlint.jsonc` stops markdownlint from counting the frontmatter `title` as a second H1 ([ADR-0009](adr-0009-title-in-frontmatter-and-h1.md)).

Status values:

- **ADRs:** `proposed`, `accepted`, `superseded`, `rejected`. A superseded ADR links to the ADR that replaces it.
- **Tickets:** `todo`, `in-progress`, `done`, `dropped`.
- **Everything else:** `active`, `draft`, `stale`.

## Linking

- Use plain relative Markdown links only, such as `[Gemini decision](adr-0003-llm-provider.md)`. They work in VS Code preview and on GitHub. Do **not** use `[[wikilinks]]`, because GitHub does not render them.
- Links to files outside `wiki/` use `../`, for example `[CLAUDE.md](../CLAUDE.md)`.
- Link generously, the way Wikipedia does. The first time a page mentions a concept that has its own page, link it.
- Every page starts with a **"Back to:" line** linking up the hierarchy: Home ↔ category index ↔ page. Leaf pages (`source-`, `research-`, `adr-`, `ticket-`, `session-`) link to their category index, and to [Home](index.md) only when Home links to them directly. Every page must be reachable from an index; a page nothing links to is a bug.
- **Every link needs a backlink.** If page A links to page B, B must link back to A, because VS Code's preview has no back button. The best backlink is a natural link in the prose. Otherwise, put it under a `## See also` section at the end of the page, as Wikipedia does. The [log](log.md) keeps its See also section above `## Entries`, so new entries can still be appended. `vp run wiki:lint` reports every missing backlink, and `node .claude/skills/wiki-maintain/scripts/lint.ts --fix wiki` adds them to See also.
- Cite external facts with inline links to the original URL, plus the date accessed when the fact is likely to change, such as prices or rate limits.

## Indexes

- [index.md](index.md) is the entry point. It links to every category index and to the hub pages.
- Each category index (`index-*.md`) lists every page of its type in a table, with that page's `summary` and `status`.
- Whenever you add a page or change a page's status or summary, update its index in the same change.

## Recording everything

The user's standing instruction is that **everything we discuss, decide and do is recorded here.**

- **Every working conversation gets a session page.** It records the user's requests (quoted where wording matters), the options discussed, the decisions made (with links to ADRs), and what was done.
- **Every decision with real alternatives gets an ADR.** It covers context, options, the decision and its consequences. Small preferences can go in the session page instead.
- **Every piece of work gets a ticket**, placed on the [Kanban board](kanban.md).
- **[log.md](log.md) gets one line per notable event**, appended at the bottom and never rewritten.
- **Unresolved questions go in [open-questions.md](open-questions.md).** When one is answered, strike it through and link to the answer.

## Writing style

- Write for a human first: short paragraphs, clear headings, tables where they help.
- Separate fact from inference. Write "inferred" or "unverified" explicitly.
- Never edit the captured content of `source-` pages, and never rewrite earlier [log](log.md) entries. Corrections go in research pages. Navigation (the "Back to:" line and `## See also`) is the only part of these pages that may change.

## Skills

Agents should use these project skills rather than editing the wiki by hand:

- `wiki-query`: answer questions from the wiki ([SKILL.md](../.claude/skills/wiki-query/SKILL.md))
- `wiki-update`: record new information, decisions, sessions and tickets ([SKILL.md](../.claude/skills/wiki-update/SKILL.md))
- `wiki-maintain`: check the wiki for broken links, orphans, stale indexes and contradictions ([SKILL.md](../.claude/skills/wiki-maintain/SKILL.md))

Commits use the `git-commit` skill ([SKILL.md](../.claude/skills/git-commit/SKILL.md), [ADR-0006](adr-0006-gitmoji-atomic-commits.md)). Wiki updates go in the same commit as the change they record.

## See also

- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
