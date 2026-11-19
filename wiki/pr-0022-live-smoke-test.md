---
title: "PR #22: Add the Live Smoke Test"
type: pr
updated: 2026-11-19
summary: An opt-in smoke test against the real Gemini model. Its first run found the larger flash models overloaded, so model calls now time out after 20 seconds and the default model is Flash-Lite. Stacked on PR #21. Closes ticket-0022.
---

# PR #22: Add the Live Smoke Test

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md) · Ticket: [ticket-0022](ticket-0022-live-smoke-test.md)

## Facts

|             |                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| GitHub      | [aaditmshah/alpha-kids-practical-test#22](https://github.com/aaditmshah/alpha-kids-practical-test/pull/22)         |
| Branch      | `live-smoke-test` → `protect-secrets` (stacked on [PR #21](pr-0021-protect-secrets.md))                            |
| Opened      | 2026-11-19, by Aadit's GitHub account (aaditmshah)                                                                 |
| Written by  | Claude Code (Claude Opus 5.5)                                                                                      |
| Reviewed by | Aadit                                                                                                              |
| Merge       | Fast-forward of `main` after PR #21, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

The unit tests mock the model, so only a live run shows whether the real model follows the system prompt, and whether the free tier is usable.

## Commits

| #   | Commit                                              | What                                                                                               | Why                                                                         |
| --- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | `⏱️ Give up on a model that doesn't answer in time` | A 20-second limit on model calls, with a hanging mock and a test                                   | `gemini-3.8-flash` held requests for over a minute                          |
| 2   | `🔧 Default to Gemini 3.5 Flash-Lite`               | The default model, `.env.example`, and an [ADR-0003](adr-0003-llm-provider.md) amendment           | The larger flash models were overloaded; Flash-Lite passed every live check |
| 3   | `✅ Add the opt-in live smoke test`                 | `src/coach/coach.live.test.ts` and `vp run smoke`; ticket-0022 done; Q6 partly answered; this page | [ticket-0022](ticket-0022-live-smoke-test.md)                               |
| 4   | `📝 Record PR #22's review`                         | Aadit's approval                                                                                   | Reviews are recorded before merge                                           |

## Review

Aadit: _"Looks good. I'm glad that we did the smoke test to check whether the chat actually works and added a timeout to prevent the user from waiting indefinitely."_ No changes requested.

## See also

- [Log](log.md)
- [PR #23: Finish the README](pr-0023-readme-and-submission.md)
