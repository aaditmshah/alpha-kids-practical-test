---
title: "ticket-0014: Detect the Reply Language"
type: ticket
status: todo
updated: 2026-11-18
summary: detectLanguage(text) returns "en" or "ur-Latn" with the marker-word heuristic from ADR-0013, plus text normalisation shared with the pre-check.
---

# ticket-0014: Detect the Reply Language

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                      |
| ------------ | ---------------------------------------------------- |
| Requirements | R2, R10 in [Requirements](requirements.md)           |
| Decisions    | [ADR-0013](adr-0013-roman-urdu-detection.md)         |
| Depends on   | [ticket-0013](ticket-0013-test-and-runtime-setup.md) |
| Files        | `src/coach/normalize.ts`, `src/coach/language.ts`    |

**Aadit's exercise** ([ADR-0019](adr-0019-learning-exercises.md)): Aadit writes the tests and `detectLanguage`. Claude provides a typed stub in `src/coach/language.ts`. `normalize` moved to [ticket-0015](ticket-0015-safety-precheck.md).

## Tests that drive it

- [ ] `normalize`: lowercases, collapses runs of the same letter (_nahiiii_ → _nahi_) and whitespace
- [ ] English concerns → `en`; Roman Urdu and mixed concerns from [Research: Roman Urdu](research-roman-urdu.md) → `ur-Latn`
- [ ] Ambiguous tokens (_main, me, to, is_) alone don't flip English text to Roman Urdu
- [ ] Any Arabic-script character → `ur-Latn`

## Also

- [ ] Thresholds (≥ 2 markers, ≥ 15% of words) tuned only through tests

## See also

- [ticket-0015: Build the Keyword Safety Pre-Check](ticket-0015-safety-precheck.md)
- [ticket-0019: Build the Coach Orchestrator](ticket-0019-coach-orchestrator.md)
