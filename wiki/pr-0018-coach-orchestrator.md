---
title: "PR #18: Build the Coach Orchestrator"
type: pr
updated: 2026-11-19
summary: respond() applies the safety layers in order and returns one CoachTurn, with executable Gherkin specs for every respond-level scenario. Closes ticket-0019, and records the Claude Design canvas for ticket-0025.
---

# PR #18: Build the Coach Orchestrator

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md) · Tickets: [ticket-0019](ticket-0019-coach-orchestrator.md), [ticket-0025](ticket-0025-ui-design.md)

## Facts

|             |                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#18](https://github.com/aaditmshah/alpha-kids-practical-test/pull/18) |
| Branch      | `coach-orchestrator` → `main`                                                                              |
| Opened      | 2026-11-19, by Aadit's GitHub account (aaditmshah)                                                         |
| Written by  | Claude Code (Claude Opus 5.5)                                                                              |
| Reviewed by | Aadit                                                                                                      |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))      |

## Why

The orchestrator is where the safety layers of [ADR-0011](adr-0011-layered-safety-escalation.md) come together, and the Server Action and chat page both call it. Aadit has a deadline, so Claude builds it, and the UI design runs alongside.

## Commits

| #   | Commit                                       | What                                                                                  | Why                                                              |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | `♻️ Share the mock models between tests`     | `src/coach/testing.ts`, used by the model adapter's tests                             | The orchestrator's tests and the specs need the same mocks       |
| 2   | `✨ Add the coach orchestrator`              | `respond`, `turnLanguage` and `turnToText`, with unit tests                           | [ticket-0019](ticket-0019-coach-orchestrator.md)                 |
| 3   | `✅ Run the respond-level Gherkin scenarios` | Five feature specs; ticket-0019 done; this page and the session                       | The features become executable as the behaviour lands (ADR-0017) |
| 4   | `📝 Record the UI design canvas`             | Design decisions on [ticket-0025](ticket-0025-ui-design.md), now in progress; the log | The canvas is private, so the wiki holds its decisions           |

## Review

Waiting for Aadit's review.

## See also

- [Log](log.md)
