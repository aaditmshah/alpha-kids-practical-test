---
title: "PR #17: Aadit's Learning Exercises"
type: pr
updated: 2026-11-19
summary: Aadit's two exercises, detectLanguage and postcheck, built test-first, each followed by Claude's review commit, plus an Oxlint rule requiring separate type imports. Closes ticket-0014 and ticket-0017.
---

# PR #17: Aadit's Learning Exercises

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-19 #1](session-2026-11-19-01-learning-exercises.md) · Tickets: [ticket-0014](ticket-0014-language-detection.md), [ticket-0017](ticket-0017-reply-schema-and-postchecks.md)

## Facts

|             |                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#17](https://github.com/aaditmshah/alpha-kids-practical-test/pull/17)                       |
| Branch      | `learning-exercises` → `main`                                                                                                    |
| Opened      | 2026-11-19, by Aadit's GitHub account (aaditmshah)                                                                               |
| Written by  | Aadit (the exercises and the lint rule); Claude Code (Claude Opus 5.5) for the review commits, the branch rename and this record |
| Reviewed by | Claude reviewed Aadit's code; Aadit reviews the PR                                                                               |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))                            |

## Why

[ADR-0019](adr-0019-learning-exercises.md): Aadit asked to implement part of the code himself, to learn. Both functions are needed by the orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md)).

## Commits

| #   | Commit                                               | Author | What                                                                                                         | Why                                                                         |
| --- | ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| 1   | `🚨 Require separate type imports`                   | Aadit  | Oxlint's `import/consistent-type-specifier-style`, and the two files it flagged                              | Clarity, and imports whose types are all inline aren't erased               |
| 2   | `✨ Detect the reply language`                       | Aadit  | `detectLanguage` and five tests                                                                              | The exercise from [ticket-0014](ticket-0014-language-detection.md)          |
| 3   | `🌐 Add Hindustani markers and fixture tests`        | Claude | 51 markers and 11 fixture tests; doc, imports and assertions tidied                                          | Review found a Roman Urdu escalation fixture detected as English            |
| 4   | `✨ Check model replies for doses and diagnoses`     | Aadit  | `postcheck` and four tests                                                                                   | The exercise from [ticket-0017](ticket-0017-reply-schema-and-postchecks.md) |
| 5   | `✅ Widen the post-check tests and diagnosis hedges` | Claude | Table, per-field and precedence tests; three more hedges; [ADR-0015](adr-0015-coach-reply-schema.md) updated | Review found one phrase tested per category, all in the plan                |
| 6   | `📝 Record the learning exercises in the wiki`       | Claude | Tickets 0014 and 0017 done, PR #16's review, session, this page                                              | Everything is recorded in the wiki                                          |

## Review

_(Recorded here before merge.)_

## See also

- [Log](log.md)
- [Alpha Kids Practical Test Wiki](index.md)
- [PR #16: Document How a Stack Is Merged](pr-0016-document-stack-merge.md)
