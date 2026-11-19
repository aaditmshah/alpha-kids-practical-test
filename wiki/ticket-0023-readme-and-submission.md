---
title: "ticket-0023: Finish the README and Submit"
type: ticket
status: in-progress
updated: 2026-11-19
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

- [x] CI stays green; `vp run smoke` passes with a real key

## Also

- [x] README covers: getting a free Gemini key, `.env.local`, build and start, checks, the smoke test, the free-tier data note, India-only helplines, and Roman Urdu as a demo-grade feature
- [ ] Helpline numbers rechecked by Aadit before submitting ([Research: Safety](research-safety-escalation.md))
- [x] `wiki-maintain` pass: indexes, board and Home's current state are accurate

## Result

Written by Claude in [PR #23](pr-0023-readme-and-submission.md), stacked on PR #22.

- **README:** screenshots of three key screens, the safety layers, setting up a free key, the free-tier privacy note, running the app, things to try, the checks and the smoke test, and the scope (Roman Urdu only, India only, no accounts or deployment).
- **Wiki pass:** Home's current state brought up to date, ADR-0019 and ADR-0020 added to its list of decisions, and the linter clean.
- **Left for Aadit:** recheck the helpline numbers against the [safety research](research-safety-escalation.md) before submitting.

## See also

- [Session 2026-11-18 #11: Implementation Plan](session-2026-11-18-11-implementation-plan.md)
- [ticket-0008: Write the Implementation Plan and Build Tickets](ticket-0008-write-implementation-plan.md)
- [Session 2026-11-19 #2: Orchestrator and Design](session-2026-11-19-02-orchestrator-and-design.md)
- [Alpha Kids Practical Test Wiki](index.md)
