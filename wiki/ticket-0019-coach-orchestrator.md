---
title: "ticket-0019: Build the Coach Orchestrator"
type: ticket
status: done
updated: 2026-11-19
summary: respond(history, deps) applies ADR-0015's display table (pre-check, model, risk, post-check and fail-safe), returning one CoachTurn.
---

# ticket-0019: Build the Coach Orchestrator

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Requirements | R3–R8, R10 in [Requirements](requirements.md)                                                   |
| Decisions    | [ADR-0011](adr-0011-layered-safety-escalation.md), [ADR-0015](adr-0015-coach-reply-schema.md)   |
| Depends on   | [ticket-0014](ticket-0014-language-detection.md) to [ticket-0018](ticket-0018-model-adapter.md) |
| Files        | `src/coach/coach.ts`, `src/coach/testing.ts`, `features/*.spec.ts`                              |

## Tests that drive it

- [x] A pre-check hit returns the escalation **without calling the model** (the mock records no call)
- [x] A model reply with risk ≠ none returns the escalation in the reply's language
- [x] A post-check hit returns the referral reply
- [x] Any model failure returns the fail-safe, in the language detected from the parent's message
- [x] Otherwise returns the plan turn: summary, steps, optional referral, check-in
- [x] The `respond()`-level scenarios in [ticket-0024](ticket-0024-gherkin-features.md)'s features pass

## Result

Built by Claude in [PR #18](pr-0018-coach-orchestrator.md), in [session 2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md).

- `respond(history, { model })` returns one `CoachTurn`: `escalation`, `referral`, `failSafe` or `plan`. Only the parent's latest message is pre-checked, since an earlier crisis was escalated when it was sent.
- `turnLanguage(turn)` gives the language for the page's `lang` attribute, and `turnToText(turn)` renders a coach turn as plain text for the history sent to the model.
- `src/coach/testing.ts` holds the mock models shared by the unit tests and the specs. The system prompt's worked examples double as ordinary model replies.
- Five feature specs run the non-`@component` scenarios against `respond()`. The `@component` scenarios and `conversation-history.feature` wait for the chat page ([ticket-0021](ticket-0021-chat-ui.md)).

## See also

- [ticket-0020: Add the Server Action](ticket-0020-server-action.md)
- [ticket-0022: Add the Opt-In Live Smoke Test](ticket-0022-live-smoke-test.md)
- [ADR-0019: Leave Learning Exercises for Aadit](adr-0019-learning-exercises.md)
- [Alpha Kids Practical Test Wiki](index.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)
- [PR #17: Aadit's Learning Exercises](pr-0017-learning-exercises.md)
- [Session 2026-11-19 #1: Learning Exercises](session-2026-11-19-01-learning-exercises.md)
