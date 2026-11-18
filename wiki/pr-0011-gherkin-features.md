---
title: "PR #11: Write the Gherkin Features"
type: pr
updated: 2026-11-18
summary: Ticket-0024. Six Gherkin features quoting the brief and tagged with requirement IDs, a CI check that every functional requirement is covered and every quote is word for word, and ADR-0019 (learning exercises for Aadit). Stacked on PR #10.
---

# PR #11: Write the Gherkin Features

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md) · Ticket: [ticket-0024](ticket-0024-gherkin-features.md) · Stacked on: [PR #10](pr-0010-test-and-runtime-setup.md)

## Facts

|             |                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#11](https://github.com/aaditmshah/alpha-kids-practical-test/pull/11)                       |
| Branch      | `gherkin-features` → `main`, branched from `test-and-runtime-setup`                                                              |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                                               |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                                                |
| Reviewed by | Aadit                                                                                                                            |
| Merge       | Fast-forward of `main` with the rest of the stack, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

[ADR-0017](adr-0017-bdd-gherkin-features.md): user stories written from the brief drive the build, and CI verifies that they cover it.

## Commits

| #   | Commit                                              | What                                                                                                                  | Why                                                       |
| --- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 1   | `✅ Write the Gherkin features`                     | Six features in `features/`, each with `Brief:` quotes, a user story and requirement tags; the sample feature removed | The requirements trace to the source                      |
| 2   | `👷 Check feature coverage against the brief in CI` | `scripts/feature-coverage.ts` (unit-tested) and `vp run features:coverage` in CI                                      | A missing requirement or a drifting quote fails the build |
| 3   | `📝 Record ticket-0024 and the learning exercises`  | [ADR-0019](adr-0019-learning-exercises.md), an ADR-0017 refinement, ticket updates, the board, session #12, this page | Everything is recorded in the wiki                        |

## Review

Questions for Aadit:

1. Do the six features capture the brief correctly? Any stories to add, drop or reword?
2. Are the exercises in ADR-0019 the right ones for you?

_(Answers are recorded here before merge.)_

## See also

- [Log](log.md)
- [PR #12: Add the Keyword Safety Pre-Check](pr-0012-safety-precheck.md)
