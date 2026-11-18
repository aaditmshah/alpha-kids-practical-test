---
title: "PR #12: Add the Keyword Safety Pre-Check"
type: pr
updated: 2026-11-18
summary: Ticket-0015. Text normalisation and the English and Roman Urdu crisis-phrase pre-check, with 38 tests, plus the detectLanguage stub for Aadit's exercise. Stacked on PR #11.
---

# PR #12: Add the Keyword Safety Pre-Check

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md) · Ticket: [ticket-0015](ticket-0015-safety-precheck.md) · Stacked on: [PR #11](pr-0011-gherkin-features.md)

## Facts

|             |                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#12](https://github.com/aaditmshah/alpha-kids-practical-test/pull/12)                       |
| Branch      | `safety-precheck` → `main`, branched from `gherkin-features`                                                                     |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                                               |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                                                |
| Reviewed by | Aadit                                                                                                                            |
| Merge       | Fast-forward of `main` with the rest of the stack, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

The first safety layer ([ADR-0011](adr-0011-layered-safety-escalation.md)): crises are caught in code before the model is asked, in English and Roman Urdu ([ADR-0013](adr-0013-roman-urdu-detection.md)).

## Commits

| #   | Commit                                          | What                                                    | Why                                                                       |
| --- | ----------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1   | `✨ Normalise messages before pattern matching` | `normalize()` with tests                                | Shouting, stretched letters and curly quotes must not defeat the patterns |
| 2   | `✨ Add the keyword safety pre-check`           | `precheck()`, the `Risk` and `Language` types, 38 tests | Escalation never depends on the model alone                               |
| 3   | `🚧 Stub detectLanguage for Aadit's exercise`   | A typed stub that throws                                | [ADR-0019](adr-0019-learning-exercises.md): Aadit builds it test-first    |
| 4   | `📝 Record ticket-0015 in the wiki`             | Ticket done, board, session #12, this page              | Everything is recorded in the wiki                                        |

## Review

_(Recorded here before merge.)_

## See also

- [Log](log.md)
