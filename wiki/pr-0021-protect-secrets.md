---
title: "PR #21: Keep Secrets Out of Claude's Reach"
type: pr
updated: 2026-11-19
summary: Project Claude settings that deny reading .env secrets files, and a tested Bash hook that blocks commands naming them. Stacked on PR #20.
---

# PR #21: Keep Secrets Out of Claude's Reach

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md) · Decision: [ADR-0020](adr-0020-keep-secrets-from-claude.md)

## Facts

|             |                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| GitHub      | [aaditmshah/alpha-kids-practical-test#21](https://github.com/aaditmshah/alpha-kids-practical-test/pull/21)         |
| Branch      | `protect-secrets` → `chat-page` (stacked on [PR #20](pr-0020-chat-page.md))                                        |
| Opened      | 2026-11-19, by Aadit's GitHub account (aaditmshah)                                                                 |
| Written by  | Claude Code (Claude Opus 5.5)                                                                                      |
| Reviewed by | Aadit                                                                                                              |
| Merge       | Fast-forward of `main` after PR #20, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

Aadit asked for Claude to be unable to read his Gemini key before he adds it for the live smoke test.

## Commits

| #   | Commit                                       | What                                                                                                                                              | Why                                     |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 1   | `🔒️ Keep .env secrets out of Claude's reach` | `.claude/settings.json`, the hook and its tests, the test project include, [ADR-0020](adr-0020-keep-secrets-from-claude.md), CLAUDE.md, this page | The key must never enter a conversation |

## Review

Waiting for Aadit's review.

## See also

- [Log](log.md)
