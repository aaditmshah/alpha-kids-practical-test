---
title: "PR #15: Build the Model Adapter and Prompt"
type: pr
updated: 2026-11-18
summary: Ticket-0018. The system prompt with tested examples, history trimming, and askModel, which calls Gemini through the AI SDK with the reply schema and maps failures to rate_limited, invalid_output or unavailable. Top of the stack, PRs #10 to #15.
---

# PR #15: Build the Model Adapter and Prompt

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md) · Ticket: [ticket-0018](ticket-0018-model-adapter.md) · Stacked on: [PR #14](pr-0014-reply-schema.md)

## Facts

|             |                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#15](https://github.com/aaditmshah/alpha-kids-practical-test/pull/15)                       |
| Branch      | `model-adapter` → `reply-schema` (stacked; Aadit corrected the base from `main`)                                                 |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                                               |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                                                |
| Reviewed by | Aadit                                                                                                                            |
| Merge       | Fast-forward of `main` to this PR merges the whole stack, PRs #10 to #15 ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

[ADR-0014](adr-0014-vercel-ai-sdk.md) puts Gemini behind one function, and [ADR-0016](adr-0016-system-prompt.md) defines the prompt. Every failure must reach the fail-safe rather than throw ([ADR-0011](adr-0011-layered-safety-escalation.md)).

## Commits

| #   | Commit                                              | What                                                                                                     | Why                                                                           |
| --- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | `💬 Write the coach's system prompt and examples`   | `prompt.ts` with tests                                                                                   | The rules, the examples (tested against the schema) and the 6-message history |
| 2   | `✨ Ask the model for a structured reply`           | `model.ts` with 14 tests using `MockLanguageModelV4`                                                     | One function, a validated reply, typed failures                               |
| 3   | `📝 Record ticket-0018 in the wiki`                 | Ticket done, the confirmed error classes, session #12, this page                                         | Everything is recorded in the wiki                                            |
| 4   | `📝 Record the stack's review and fix its PR bases` | Reviews for PRs #11 to #15, the stacked-PR rule in the `git-commit` skill and ADR-0008, ticket-0024 done | Aadit approved the stack and corrected its PR bases                           |

## Review

Aadit reviewed the whole stack (PRs #10 to #15) at once: _"I reviewed all the PRs. They look good."_ No changes requested.

He also found that this PR, like the rest of the stack, had been opened against `main` instead of the branch below it, and retargeted it himself. See the correction in [ADR-0008](adr-0008-protected-main-linear-history.md).

This PR's last commit records the review for the whole stack, so the stack didn't need restacking.

## See also

- [Log](log.md)
- [PR #11: Write the Gherkin Features](pr-0011-gherkin-features.md)
- [PR #12: Add the Keyword Safety Pre-Check](pr-0012-safety-precheck.md)
- [PR #13: Write the Fixed Messages](pr-0013-fixed-messages.md)
