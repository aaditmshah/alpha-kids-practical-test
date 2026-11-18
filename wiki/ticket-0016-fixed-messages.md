---
title: "ticket-0016: Write the Fixed Messages"
type: ticket
status: done
updated: 2026-11-18
summary: The pre-written escalation, referral and fail-safe messages in English and Roman Urdu, with the Indian helplines as one constant.
---

# ticket-0016: Write the Fixed Messages

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Requirements | R4, R7, R8, R10 in [Requirements](requirements.md)                                                                                     |
| Decisions    | [ADR-0011](adr-0011-layered-safety-escalation.md), [ADR-0012](adr-0012-india-helplines.md), [ADR-0015](adr-0015-coach-reply-schema.md) |
| Depends on   | [ticket-0013](ticket-0013-test-and-runtime-setup.md)                                                                                   |
| Files        | `src/coach/helplines.ts`, `src/coach/messages.ts`                                                                                      |

## Tests that drive it

- [x] Every escalation (each risk × language) contains 112, the risk's helpline, the trusted-person line and the check-in question
- [x] Abuse escalation lists both 1098 and 181; self-harm lists 14416
- [x] Referral and fail-safe messages exist in both languages; the fail-safe mentions 112
- [x] Text matches the wording Aadit approved in [Research: Roman Urdu](research-roman-urdu.md) and [ADR-0015](adr-0015-coach-reply-schema.md)

## Also

- [x] Helpline numbers live in one constant, so a test can assert them against [ADR-0012](adr-0012-india-helplines.md)

## Result

Delivered in [PR #13](pr-0013-fixed-messages.md):

- `src/coach/helplines.ts`: 112, 1098, 181 and 14416 as one constant ([ADR-0012](adr-0012-india-helplines.md))
- `src/coach/messages.ts`: `escalationMessage(risk, language)`, `referralMessage(language)` and `failSafeMessage(language)`, as structured objects (title, guidance lines, helplines, trusted-person line, check-in) so the UI can lay them out
- 18 tests: every risk and language, the helpline lists, the approved wording, and no gendered first-person verbs in Roman Urdu
