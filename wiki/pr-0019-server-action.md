---
title: "PR #19: Add the Server Action"
type: pr
updated: 2026-11-19
summary: askCoach, a Server Function that validates the conversation and calls respond with the Gemini model from COACH_MODEL. Stacked on PR #18. Closes ticket-0020.
---

# PR #19: Add the Server Action

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md) · Ticket: [ticket-0020](ticket-0020-server-action.md)

## Facts

|             |                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| GitHub      | [aaditmshah/alpha-kids-practical-test#19](https://github.com/aaditmshah/alpha-kids-practical-test/pull/19)         |
| Branch      | `server-action` → `coach-orchestrator` (stacked on [PR #18](pr-0018-coach-orchestrator.md))                        |
| Opened      | 2026-11-19, by Aadit's GitHub account (aaditmshah)                                                                 |
| Written by  | Claude Code (Claude Opus 5.5)                                                                                      |
| Reviewed by | Aadit                                                                                                              |
| Merge       | Fast-forward of `main` after PR #18, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

The chat page needs a server-side entry point that holds the API key and calls the coach. Server Functions can be reached by a direct POST, so the input is checked inside it.

## Commits

| #   | Commit                                | What                                                                                                                         | Why                                         |
| --- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 1   | `✨ Add the askCoach Server Function` | `parseHistory` and `modelId` in `src/coach/input.ts`, `askCoach` in `src/app/actions.ts`, tests; ticket-0020 done; this page | [ticket-0020](ticket-0020-server-action.md) |

## Review

Waiting for Aadit's review.

## See also

- [Log](log.md)
