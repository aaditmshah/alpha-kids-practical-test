---
title: "ticket-0004: Research Safety and Escalation"
type: ticket
status: todo
updated: 2026-11-18
summary: Decide how the coach detects and escalates emergencies, abuse and self-harm, where the no-diagnosis and no-medical/legal line sits, and which verified helplines to show.
---

# ticket-0004: Research Safety and Escalation

Back to: [Home](index.md) · [Tickets](index-tickets.md) · [Kanban](kanban.md) · Requirements: R6, R7, R8 in [Requirements](requirements.md)

## Questions to answer

- How do we detect crisis content? Options: a fixed keyword check (English and Urdu), the model classifying risk inside the structured reply, or both. Lean toward both, because then escalation does not depend on the model alone.
- What does an escalation reply look like? It should be fixed text, appear first, be visually distinct and be bilingual.
- Which helplines and emergency numbers apply in **Pakistan** and the **UAE**, and what is the generic fallback? **Every number must be verified from an official source**, because a wrong number is worse than none.
- What is the boundary between allowed and forbidden? For example, "talk to your paediatrician" is allowed; "give 5 ml of X" is forbidden. Write down example phrasings.
- How should the coach handle a parent trying to talk it out of its rules (prompt injection)?

## Output

A `research-safety-escalation.md` page, plus an ADR for the detection approach.

## See also

- [ADR-0004: Support Urdu Only as Roman Urdu (Latin Script)](adr-0004-roman-urdu-only.md)
- [Index: Research](index-research.md)
- [Open Questions](open-questions.md)
- [Plan](plan.md)
- [Research: Alpha Kids (the company)](research-alpha-kids.md)
- [Session 2026-11-18 #2: Decisions](session-2026-11-18-02-decisions.md)
- [Session 2026-11-18 #3: Commit Conventions](session-2026-11-18-03-commit-conventions.md)
- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
- [ticket-0005: Research Roman Urdu Handling](ticket-0005-research-roman-urdu.md)
- [ticket-0006: Design the Coach Reply Schema and Prompt](ticket-0006-design-coach-contract.md)
- [ticket-0008: Write the Implementation Plan and Build Tickets](ticket-0008-write-implementation-plan.md)
- [Session 2026-11-18 #5: Fast-Forward Merges](session-2026-11-18-05-fast-forward-merges.md)
