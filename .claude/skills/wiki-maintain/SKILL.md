---
name: wiki-maintain
description: Check the project's LLM wiki (wiki/) for health problems (broken links, orphan pages, missing frontmatter, indexes or Kanban out of sync, stale or contradictory content, wiki versus code drift) and fix them. Use after a large batch of updates, before committing or submitting, or when the wiki seems inconsistent.
---

# wiki-maintain

## 1. Mechanical checks (automated)

```bash
node .claude/skills/wiki-maintain/scripts/lint.ts wiki
```

It reports these problems:

- subdirectories, or filenames that aren't kebab-case
- missing or invalid frontmatter (`title`, `type`, `status`, `updated`, `summary`, and valid status values)
- broken relative links, and `[[wikilinks]]`
- a missing or extra H1, or an H1 that doesn't match the frontmatter `title`
- orphan pages, which no other page links to
- prefixed pages missing from their category index
- a ticket status that disagrees with `index-tickets.md` or its `kanban.md` column

Fix every error. Re-run until it is clean.

## 2. Judgement checks (manual)

Skim `wiki/index.md`, each `index-*.md`, `kanban.md` and `open-questions.md`, then check:

- **Current state:** does the home page's "Current state" match reality (latest ADRs, tickets and log)?
- **Contradictions:** do two pages claim different things (for example, a research page recommends X but an accepted ADR chose Y without superseding it)? Fix the stale page, or record the conflict in `open-questions.md`.
- **Staleness:** do time-sensitive facts (prices, rate limits, model IDs) carry an access date? Flag anything older than about a month that still drives a decision.
- **Code drift:** once code exists, do the ADRs and plan still describe it? Check model IDs, the schema, scripts and the folder layout.
- **Answered questions:** are any open questions actually answered somewhere? Strike them through and link the answer.
- **Coverage:** were things discussed in recent sessions never turned into ADRs or tickets?
- **Readability:** does every page have a "Back to" line and sensible headings?

## 3. Record it

Append a `log.md` line such as `YYYY-MM-DD: [wiki] maintenance pass: <what was fixed>`, following the `wiki-update` skill.
