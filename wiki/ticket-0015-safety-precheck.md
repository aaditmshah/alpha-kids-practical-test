---
title: "ticket-0015: Build the Keyword Safety Pre-Check"
type: ticket
status: todo
updated: 2026-11-18
summary: precheck(text) returns the risk (emergency, abuse, self_harm) or null, from English and Roman Urdu phrase patterns, before any model call.
---

# ticket-0015: Build the Keyword Safety Pre-Check

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Requirements | R8 in [Requirements](requirements.md)                                                           |
| Decisions    | [ADR-0011](adr-0011-layered-safety-escalation.md), [ADR-0013](adr-0013-roman-urdu-detection.md) |
| Depends on   | [ticket-0014](ticket-0014-language-detection.md) (normalisation)                                |
| Files        | `src/coach/precheck.ts`                                                                         |

Also builds `normalize` (moved here from [ticket-0014](ticket-0014-language-detection.md), which is Aadit's exercise ([ADR-0019](adr-0019-learning-exercises.md))).

## Tests that drive it

- [ ] Each category in English and Roman Urdu from [Research: Safety](research-safety-escalation.md) and [Research: Roman Urdu](research-roman-urdu.md) → that risk
- [ ] Spelling variants and both gendered verb forms (_chahta/chahti_) match
- [ ] Benign look-alikes (_I'm dying to know…_, sibling hitting, toddler biting) → null

## Also

- [ ] Patterns stay phrase-level, never single words like _die_
