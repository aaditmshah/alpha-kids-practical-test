---
title: "ticket-0015: Build the Keyword Safety Pre-Check"
type: ticket
status: done
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

- [x] Each category in English and Roman Urdu from [Research: Safety](research-safety-escalation.md) and [Research: Roman Urdu](research-roman-urdu.md) → that risk
- [x] Spelling variants and both gendered verb forms (_chahta/chahti_) match
- [x] Benign look-alikes (_I'm dying to know…_, sibling hitting, toddler biting) → null

## Also

- [x] Patterns stay phrase-level, never single words like _die_

## Result

Delivered in [PR #12](pr-0012-safety-precheck.md):

- `src/coach/normalize.ts`: lowercase, straight apostrophes, runs of three or more letters collapsed, single spaces
- `src/coach/precheck.ts`: English and Roman Urdu phrase patterns for emergencies, self-harm and abuse; when several match, the most urgent wins (emergency, then self-harm, then abuse)
- 38 unit tests, including spelling variants (_zahar_, _khud kashi_), shouting, and benign look-alikes (_I'm dying to know_, sibling and toddler hitting, _killing it at school_)
- The `detectLanguage` stub for [Aadit's exercise](adr-0019-learning-exercises.md)
