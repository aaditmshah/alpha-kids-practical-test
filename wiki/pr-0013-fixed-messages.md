---
title: "PR #13: Write the Fixed Messages"
type: pr
updated: 2026-11-18
summary: Ticket-0016. The verified Indian helplines as one constant, and the escalation, referral and fail-safe messages in English and Roman Urdu, as structured objects with 18 tests. Stacked on PR #12.
---

# PR #13: Write the Fixed Messages

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md) · Ticket: [ticket-0016](ticket-0016-fixed-messages.md) · Stacked on: [PR #12](pr-0012-safety-precheck.md)

## Facts

|             |                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#13](https://github.com/aaditmshah/alpha-kids-practical-test/pull/13)     |
| Branch      | `fixed-messages` → `safety-precheck` (stacked; Aadit corrected the base from `main`)                           |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                             |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                              |
| Reviewed by | Aadit                                                                                                          |
| Merge       | Bottom-up fast-forward push by Aadit, one PR at a time ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

Escalations are fixed text, never generated ([ADR-0011](adr-0011-layered-safety-escalation.md)), and so are the referral and fail-safe ([ADR-0015](adr-0015-coach-reply-schema.md)).

## Commits

| #   | Commit                                                           | What                                       | Why                                                                                                    |
| --- | ---------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 1   | `💬 Write the fixed escalation, referral and fail-safe messages` | `helplines.ts`, `messages.ts`, 18 tests    | One source for the approved wording and the verified numbers ([ADR-0012](adr-0012-india-helplines.md)) |
| 2   | `📝 Record ticket-0016 in the wiki`                              | Ticket done, board, session #12, this page | Everything is recorded in the wiki                                                                     |

## Review

Aadit reviewed the whole stack (PRs #10 to #15) at once: _"I reviewed all the PRs. They look good."_ No changes requested.

He also found that this PR, like the rest of the stack, had been opened against `main` instead of the branch below it, and retargeted it himself. See the correction in [ADR-0008](adr-0008-protected-main-linear-history.md).

The review is recorded on the top PR ([PR #15](pr-0015-model-adapter.md)) for the whole stack, so the stack didn't need restacking.

## See also

- [Log](log.md)
- [PR #14: Define the Reply Schema](pr-0014-reply-schema.md)
