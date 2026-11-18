---
title: "PR #4: Record PR #3's Review"
type: pr
updated: 2026-11-18
summary: Records Aadit's review of PR #3 (ADR-0011 accepted), which was merged before its review was written down, and makes recording reviews before merge part of the git-commit skill.
---

# PR #4: Record PR #3's Review

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #7](session-2026-11-18-07-review-and-security.md)

## Facts

|             |                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#4](https://github.com/aaditmshah/alpha-kids-practical-test/pull/4) |
| Branch      | `record-pr-3-review` → `main`                                                                            |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                       |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                        |
| Reviewed by | Aadit                                                                                                    |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))    |

## Why

[PR #3](pr-0003-research-safety-escalation.md) asked Aadit to accept [ADR-0011](adr-0011-layered-safety-escalation.md) and check the helplines. He approved and merged before the answers were recorded on the PR.

## Commits

| #   | Commit                     | What                                                                                                                       | Why                                                          |
| --- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | `📝 Record PR #3's review` | ADR-0011 accepted; PR #3's review section; a `git-commit` skill step to record reviews before merge; session #7; this page | The wiki records every decision, and the gap shouldn't recur |

## Review

Aadit reviewed PR #4 together with PR #5, which is stacked on it: _"Both look good. Please update and restack them. After that, I'll merge them."_ No changes requested. Recorded before merge, as the new `git-commit` step requires.

## See also

- [Log](log.md)
- [PR #5: Fix the basic-ftp Vulnerability](pr-0005-security-basic-ftp.md)
