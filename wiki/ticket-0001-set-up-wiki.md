---
title: "ticket-0001: Set Up the LLM Wiki and Its Skills"
type: ticket
status: done
updated: 2026-11-18
summary: Create the flat wiki (conventions, indexes, log, board), the wiki-query, wiki-update and wiki-maintain skills, and a root CLAUDE.md that points agents to them.
---

# ticket-0001: Set Up the LLM Wiki and Its Skills

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · Decision: [ADR-0001](adr-0001-flat-llm-wiki.md)

## Acceptance criteria

- [x] Flat `wiki/` directory with [Conventions](conventions.md), [Home](index.md), category indexes, [Log](log.md) and [Kanban](kanban.md)
- [x] Skills `wiki-query`, `wiki-update` and `wiki-maintain` in `.claude/skills/`
- [x] Root [CLAUDE.md](../CLAUDE.md) tells agents to use the skills first
- [x] Links are relative Markdown, so they work in VS Code and on GitHub
- [x] A link checker script exists for the maintenance skill

## Notes

Done in [session 2026-11-18-01](session-2026-11-18-01-kickoff.md).

## See also

- [Plan](plan.md)
