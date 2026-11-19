---
title: "PR #16: Document How a Stack Is Merged"
type: pr
updated: 2026-11-18
summary: Records that a stack of PRs with stacked bases merges bottom-up, one fast-forward push per PR, after a single push to the top was rejected while merging PRs #10 to #15.
---

# PR #16: Document How a Stack Is Merged

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md)

## Facts

|             |                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#16](https://github.com/aaditmshah/alpha-kids-practical-test/pull/16) |
| Branch      | `document-stack-merge` → `main`                                                                            |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                         |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                          |
| Reviewed by | Aadit                                                                                                      |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))      |

## Why

[ADR-0008](adr-0008-protected-main-linear-history.md) and the `git-commit` skill said that one push to the top of a stack merges every PR in it. That was only true when every PR targeted `main`. With stacked bases, protected `main` rejected the push, and Aadit merged PRs #10 to #15 one at a time instead (see [session #12](session-2026-11-18-12-build-setup.md)).

## Commits

| #   | Commit                                  | What                                                                                                  | Why                                            |
| --- | --------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | `📝 Document merging a stack bottom-up` | ADR-0008, the `git-commit` skill, the merge rows of PR pages #11 to #15, session #12, Home, this page | The docs described a merge that GitHub rejects |

## Review

Aadit fast-forwarded it into `main` without comments: _"Merged. I'll now work through the exercises."_ No changes were requested. This review was recorded afterwards, in [PR #17](pr-0017-learning-exercises.md).

## See also

- [Log](log.md)
- [Session 2026-11-19 #1: Learning Exercises](session-2026-11-19-01-learning-exercises.md)
