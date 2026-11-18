---
title: "ticket-0019: Build the Coach Orchestrator"
type: ticket
status: todo
updated: 2026-11-18
summary: respond(history, deps) applies ADR-0015's display table (pre-check, model, risk, post-check and fail-safe), returning one CoachTurn.
---

# ticket-0019: Build the Coach Orchestrator

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Requirements | R3–R8, R10 in [Requirements](requirements.md)                                                   |
| Decisions    | [ADR-0011](adr-0011-layered-safety-escalation.md), [ADR-0015](adr-0015-coach-reply-schema.md)   |
| Depends on   | [ticket-0014](ticket-0014-language-detection.md) to [ticket-0018](ticket-0018-model-adapter.md) |
| Files        | `src/coach/coach.ts`                                                                            |

## Tests that drive it

- [ ] A pre-check hit returns the escalation **without calling the model** (the mock records no call)
- [ ] A model reply with risk ≠ none returns the escalation in the reply's language
- [ ] A post-check hit returns the referral reply
- [ ] Any model failure returns the fail-safe, in the language detected from the parent's message
- [ ] Otherwise returns the plan turn: summary, steps, optional referral, check-in
- [ ] The `respond()`-level scenarios in [ticket-0024](ticket-0024-gherkin-features.md)'s features pass

## See also

- [ticket-0020: Add the Server Action](ticket-0020-server-action.md)
- [ticket-0022: Add the Opt-In Live Smoke Test](ticket-0022-live-smoke-test.md)
- [ADR-0019: Leave Learning Exercises for Aadit](adr-0019-learning-exercises.md)
