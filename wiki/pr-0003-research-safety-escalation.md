---
title: "PR #3: Research Safety and Escalation"
type: pr
updated: 2026-11-18
summary: Safety and escalation research (ticket-0004). Proposes layered crisis detection with fixed escalation messages (ADR-0012 lists only Indian helplines, all verified).
---

# PR #3: Research Safety and Escalation

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #6](session-2026-11-18-06-safety-research.md) · Ticket: [ticket-0004](ticket-0004-research-safety-escalation.md)

## Facts

|             |                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#3](https://github.com/aaditmshah/alpha-kids-practical-test/pull/3) |
| Branch      | `research-safety-escalation` → `main`                                                                    |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                       |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                        |
| Reviewed by | Aadit                                                                                                    |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))    |

## Why

Safety is the core of the brief: R6, R7 and R8 in [Requirements](requirements.md). The design has to be settled before the reply schema ([ticket-0006](ticket-0006-design-coach-contract.md)) and the build.

## Commits

| #   | Commit                              | What                                                                                                                                                                                             | Why                                                                                  |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| 1   | `📝 Research safety and escalation` | [Research page](research-safety-escalation.md), [ADR-0011](adr-0011-layered-safety-escalation.md), [ADR-0012](adr-0012-india-helplines.md), ticket-0004 done, Q3 answered, session #6, this page | Escalation must never depend on the model alone, and every helpline must be verified |

## Review

_(Review comments are recorded here as they arrive.)_
