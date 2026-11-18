---
title: "ticket-0023: Finish the README and Submit"
type: ticket
status: todo
updated: 2026-11-18
summary: Complete the README for reviewers, run the live smoke test, do a final wiki maintenance pass, and prepare the submission.
---

# ticket-0023: Finish the README and Submit

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| Requirements | R13 in [Requirements](requirements.md)                                                                            |
| Decisions    | [ADR-0005](adr-0005-local-only.md), [ADR-0003](adr-0003-llm-provider.md), [ADR-0012](adr-0012-india-helplines.md) |
| Depends on   | [ticket-0021](ticket-0021-chat-ui.md), [ticket-0022](ticket-0022-live-smoke-test.md)                              |
| Files        | `README.md`, `wiki/`                                                                                              |

## Tests that drive it

- [ ] CI stays green; `vp run smoke` passes with a real key

## Also

- [ ] README covers: getting a free Gemini key, `.env.local`, build and start, checks, the smoke test, the free-tier data note, India-only helplines, and Roman Urdu as a demo-grade feature
- [ ] Helpline numbers rechecked by Aadit before submitting ([Research: Safety](research-safety-escalation.md))
- [ ] `wiki-maintain` pass: indexes, board and Home's current state are accurate

## See also

- [Session 2026-11-18 #11: Implementation Plan](session-2026-11-18-11-implementation-plan.md)
- [ticket-0008: Write the Implementation Plan and Build Tickets](ticket-0008-write-implementation-plan.md)
