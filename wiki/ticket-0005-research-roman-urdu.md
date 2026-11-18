---
title: "ticket-0005: Research Roman Urdu Handling"
type: ticket
status: todo
updated: 2026-11-18
summary: Work out how the coach detects Roman Urdu (Urdu in Latin letters) versus English, replies in matching Roman Urdu, and copes with mixed English and Urdu messages.
---

# ticket-0005: Research Roman Urdu Handling

Back to: [Home](index.md) · [Tickets](index-tickets.md) · [Kanban](kanban.md) · Requirements: R2, R10 in [Requirements](requirements.md) · Decision: [ADR-0004](adr-0004-roman-urdu-only.md)

Roman Urdu only: no Urdu script and no right-to-left UI ([ADR-0004](adr-0004-roman-urdu-only.md)).

## Questions to answer

- **Detection:** should the model report the reply language (`en` or `ur-Latn`) in the structured reply? A keyword heuristic is unreliable for Roman Urdu because spelling varies widely ("nahi", "nahin", "nai").
- **Mixed messages:** parents often mix English and Urdu in one message. Which language should the reply use? Proposal: follow the dominant language, or the parent's last message.
- **Spelling:** which spelling conventions should replies follow, so that a Hindi reader like the candidate can check them?
- **Safety keywords:** collect Roman Urdu crisis terms for the fixed pre-check (shared with [ticket-0004](ticket-0004-research-safety-escalation.md)).
- **Urdu script typed anyway:** what happens if a parent types in Urdu script? Proposal: reply in Roman Urdu and spend no further effort.

## Output

A `research-roman-urdu.md` page, plus a set of Roman Urdu test concerns for the TDD fixtures.

## See also

- [Index: Research](index-research.md)
- [Log](log.md)
- [Plan](plan.md)
- [Session 2026-11-18 #2: Decisions](session-2026-11-18-02-decisions.md)
- [ticket-0006: Design the Coach Reply Schema and Prompt](ticket-0006-design-coach-contract.md)
