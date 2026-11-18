---
title: "PR #13: Write the Fixed Messages"
type: pr
updated: 2026-11-18
summary: Ticket-0016. The verified Indian helplines as one constant, and the escalation, referral and fail-safe messages in English and Roman Urdu, as structured objects with 18 tests. Stacked on PR #12.
---

# PR #13: Write the Fixed Messages

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md) · Ticket: [ticket-0016](ticket-0016-fixed-messages.md) · Stacked on: [PR #12](pr-0012-safety-precheck.md)

## Facts

|             |                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#13](https://github.com/aaditmshah/alpha-kids-practical-test/pull/13)                       |
| Branch      | `fixed-messages` → `main`, branched from `safety-precheck`                                                                       |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                                               |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                                                |
| Reviewed by | Aadit                                                                                                                            |
| Merge       | Fast-forward of `main` with the rest of the stack, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

Escalations are fixed text, never generated ([ADR-0011](adr-0011-layered-safety-escalation.md)), and so are the referral and fail-safe ([ADR-0015](adr-0015-coach-reply-schema.md)).

## Commits

| #   | Commit                                                           | What                                       | Why                                                                                                    |
| --- | ---------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 1   | `💬 Write the fixed escalation, referral and fail-safe messages` | `helplines.ts`, `messages.ts`, 18 tests    | One source for the approved wording and the verified numbers ([ADR-0012](adr-0012-india-helplines.md)) |
| 2   | `📝 Record ticket-0016 in the wiki`                              | Ticket done, board, session #12, this page | Everything is recorded in the wiki                                                                     |

## Review

_(Recorded here before merge.)_

## See also

- [Log](log.md)
- [PR #14: Define the Reply Schema](pr-0014-reply-schema.md)
