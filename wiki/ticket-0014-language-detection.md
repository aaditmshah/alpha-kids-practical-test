---
title: "ticket-0014: Detect the Reply Language"
type: ticket
status: done
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

- [x] `normalize`: lowercases, collapses runs of the same letter (_nahiiii_ → _nahi_) and whitespace _(built in [ticket-0015](ticket-0015-safety-precheck.md))_
- [x] English concerns → `en`; Roman Urdu and mixed concerns from [Research: Roman Urdu](research-roman-urdu.md) → `ur-Latn`
- [x] Ambiguous tokens (_main, me, to, is_) alone don't flip English text to Roman Urdu
- [x] Any Arabic-script character → `ur-Latn`

## Also

- [x] Thresholds (≥ 2 markers, ≥ 15% of words) tuned only through tests

## See also

- [ticket-0015: Build the Keyword Safety Pre-Check](ticket-0015-safety-precheck.md)
- [ticket-0019: Build the Coach Orchestrator](ticket-0019-coach-orchestrator.md)
- [Alpha Kids Practical Test Wiki](index.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)
- [PR #17: Aadit's Learning Exercises](pr-0017-learning-exercises.md)
- [Session 2026-11-19 #1: Learning Exercises](session-2026-11-19-01-learning-exercises.md)

## Result

Built by Aadit, test-first, in [PR #17](pr-0017-learning-exercises.md):

- `detectLanguage`: Arabic script, or at least 2 marker words making up at least 15% of the normalised words, means `ur-Latn`. Aadit's tests cover Arabic script, ambiguous English words, too few markers, a low ratio, and a ratio at the threshold reached through normalisation
- **Review:** the escalation fixture _Bachche ne zehar kha liya_ and _Kya karoon?_ came out as English, because the marker list from [Research: Roman Urdu](research-roman-urdu.md) lacked _ne_, _liya_ and _karoon_. Claude added 51 markers (verbs, postpositions, pronouns, question words, texting spellings like _nhi_ and _rha_) and 11 fixture tests. Aadit: _"The list of markers is not exhaustive, and it can never be exhaustive. We can keep adding to the list."_
