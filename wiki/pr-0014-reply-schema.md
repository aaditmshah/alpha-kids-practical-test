---
title: "PR #14: Define the Reply Schema"
type: pr
updated: 2026-11-18
summary: The schema half of ticket-0017. The CoachReply Zod schema with length limits and model-facing descriptions, and the postcheck stub for Aadit's exercise. Stacked on PR #13.
---

# PR #14: Define the Reply Schema

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md) · Ticket: [ticket-0017](ticket-0017-reply-schema-and-postchecks.md) · Stacked on: [PR #13](pr-0013-fixed-messages.md)

## Facts

|             |                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#14](https://github.com/aaditmshah/alpha-kids-practical-test/pull/14)     |
| Branch      | `reply-schema` → `fixed-messages` (stacked; Aadit corrected the base from `main`)                              |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                             |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                              |
| Reviewed by | Aadit                                                                                                          |
| Merge       | Bottom-up fast-forward push by Aadit, one PR at a time ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

The reply schema is the contract the model is held to ([ADR-0015](adr-0015-coach-reply-schema.md), [ADR-0014](adr-0014-vercel-ai-sdk.md)). The post-checks are [Aadit's exercise](adr-0019-learning-exercises.md).

## Commits

| #   | Commit                                   | What                                                   | Why                                              |
| --- | ---------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| 1   | `🦺 Define the coach reply schema`       | `schema.ts` with 12 tests                              | Gemini drops length limits, so Zod enforces them |
| 2   | `🚧 Stub postcheck for Aadit's exercise` | A typed stub with the ADR-0015 patterns documented     | Fixes the interface the orchestrator will call   |
| 3   | `📝 Record the reply schema in the wiki` | Ticket-0017 in progress, board, session #12, this page | Everything is recorded in the wiki               |

## Review

Aadit reviewed the whole stack (PRs #10 to #15) at once: _"I reviewed all the PRs. They look good."_ No changes requested.

He also found that this PR, like the rest of the stack, had been opened against `main` instead of the branch below it, and retargeted it himself. See the correction in [ADR-0008](adr-0008-protected-main-linear-history.md).

The review is recorded on the top PR ([PR #15](pr-0015-model-adapter.md)) for the whole stack, so the stack didn't need restacking.

## See also

- [Log](log.md)
- [PR #15: Build the Model Adapter and Prompt](pr-0015-model-adapter.md)
