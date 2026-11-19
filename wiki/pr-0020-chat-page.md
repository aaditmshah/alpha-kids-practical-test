---
title: "PR #20: Build the Chat Page"
type: pr
updated: 2026-11-19
summary: The chat page built from the approved design, with the conversation kept on the page, a loud escalation alert and tel links. Every Gherkin scenario now runs. Stacked on PR #19. Closes ticket-0021.
---

# PR #20: Build the Chat Page

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md) · Ticket: [ticket-0021](ticket-0021-chat-ui.md)

## Facts

|             |                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| GitHub      | [aaditmshah/alpha-kids-practical-test#20](https://github.com/aaditmshah/alpha-kids-practical-test/pull/20)         |
| Branch      | `chat-page` → `server-action` (stacked on [PR #19](pr-0019-server-action.md))                                      |
| Opened      | 2026-11-19, by Aadit's GitHub account (aaditmshah)                                                                 |
| Written by  | Claude Code (Claude Opus 5.5)                                                                                      |
| Reviewed by | Aadit                                                                                                              |
| Merge       | Fast-forward of `main` after PR #19, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

The brief asks for a simple web UI where a parent types a concern and sees the conversation (R1, R9). The page is built from the approved [UI Design](design.md).

## Commits

| #   | Commit                                      | What                                                                                                                           | Why                                                              |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| 1   | `♻️ Move coach turns into their own module` | `CoachTurn`, `turnLanguage` and `turnToText` move to `src/coach/turn.ts`                                                       | `coach.ts` imports the AI SDK, which shouldn't reach the browser |
| 2   | `♻️ Share the message limits with the page` | `HISTORY_LIMIT` and `MAX_MESSAGE_LENGTH` move to `src/coach/limits.ts`                                                         | The page needs them without importing Zod                        |
| 3   | `✨ Build the chat page`                    | `Chat`, `CoachTurnView`, icons, theme tokens, fonts, the component specs; starter content removed; ticket-0021 done; this page | [ticket-0021](ticket-0021-chat-ui.md)                            |

## Review

Waiting for Aadit's review.

## See also

- [Log](log.md)
- [PR #21: Keep Secrets Out of Claude's Reach](pr-0021-protect-secrets.md)
