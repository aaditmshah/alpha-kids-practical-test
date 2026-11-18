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
