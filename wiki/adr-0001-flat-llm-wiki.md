---
title: "ADR-0001: Record Everything in a Flat, Linked LLM Wiki"
type: adr
status: accepted
updated: 2026-11-18
summary: All research, decisions, plans, tickets and sessions live in a flat wiki/ directory of linked Markdown pages. Project skills are used to query, update and maintain it, and the wiki is part of the submission.
---

# ADR-0001: Record Everything in a Flat, Linked LLM Wiki

Back to: [Home](index.md) · [Decisions](index-decisions.md) · Session: [2026-11-18 kickoff](session-2026-11-18-01-kickoff.md)

## Context

The candidate wants the interviewers to see the _process_ of building the app, not just the result. An AI agent starting cold should be able to rebuild the full project state (research, decisions, plans, board and history) from the repo alone. Humans must also be able to browse it.

## Options considered

1. **Nested folders** (`wiki/adrs/`, `wiki/tickets/`, …). Tidy, but links need `../` paths, break when files move, and are awkward to write.
2. **Flat directory with filename prefixes** (`adr-`, `ticket-`, `research-`, …). Every link is `[x](page.md)`, and prefixes still group pages when sorted.
3. **External tool** (Notion, GitHub Wiki, Claude Docs). Not part of the repo, so it isn't submitted alongside the code, and agents can't easily keep it in sync.
4. **`[[wikilinks]]` (Obsidian style).** GitHub doesn't render them.

## Decision

**Option 2.** A flat `wiki/` directory with standard relative Markdown links, which work in VS Code and on GitHub. It has:

- a home page and per-category index pages
- YAML frontmatter on every page (type, status, updated, summary)
- an append-only [log](log.md)
- ADRs, tickets on a [Kanban board](kanban.md), and session pages

The rules are in [Conventions](conventions.md). Three project skills (`wiki-query`, `wiki-update`, `wiki-maintain`) keep agents working with the wiki consistently. The root [CLAUDE.md](../CLAUDE.md) tells agents to use these skills first.

## Consequences

- Recording takes discipline: every session must end with a wiki update. The `wiki-update` skill and `CLAUDE.md` enforce this.
- Indexes must be kept in sync by hand, and the `wiki-maintain` skill checks them.
- The wiki is submitted with the code. It must not contain secrets (API keys) or personal details beyond what the candidate wants to share.

## See also

- [ADR-0006: Gitmoji, Atomic Commits and the Mood Rule](adr-0006-gitmoji-atomic-commits.md)
- [Plan](plan.md)
- [ticket-0001: Set Up the LLM Wiki and Its Skills](ticket-0001-set-up-wiki.md)
