---
title: "ticket-0016: Write the Fixed Messages"
type: ticket
status: todo
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

- [ ] Every escalation (each risk × language) contains 112, the risk's helpline, the trusted-person line and the check-in question
- [ ] Abuse escalation lists both 1098 and 181; self-harm lists 14416
- [ ] Referral and fail-safe messages exist in both languages; the fail-safe mentions 112
- [ ] Text matches the wording Aadit approved in [Research: Roman Urdu](research-roman-urdu.md) and [ADR-0015](adr-0015-coach-reply-schema.md)

## Also

- [ ] Helpline numbers live in one constant, so a test can assert them against [ADR-0012](adr-0012-india-helplines.md)
