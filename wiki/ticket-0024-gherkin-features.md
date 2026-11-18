---
title: "ticket-0024: Write the Gherkin Features"
type: ticket
status: todo
updated: 2026-11-18
summary: Write executable Gherkin features for the brief's requirements, each quoting the brief and tagged with requirement IDs, plus a tested CI check that every functional requirement has a scenario.
---

# ticket-0024: Write the Gherkin Features

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requirements | R1–R10 in [Requirements](requirements.md)                                                                                                                                 |
| Decisions    | [ADR-0017](adr-0017-bdd-gherkin-features.md)                                                                                                                              |
| Depends on   | [ticket-0013](ticket-0013-test-and-runtime-setup.md) (runner installed)                                                                                                   |
| Files        | `features/*.feature`, `features/*.spec.ts` (pending steps), `scripts/feature-coverage.ts`, `scripts/feature-coverage.test.ts`, `package.json`, `.github/workflows/ci.yml` |

## Tests that drive it

- [ ] Six features: getting a plan, language, escalation, boundaries, conversation history, coach unavailable. Each quotes the [brief](source-practical-test-brief.md) word for word
- [ ] Every scenario is tagged with its requirement IDs. Outlines reuse the [safety](research-safety-escalation.md) and [Roman Urdu](research-roman-urdu.md) fixtures
- [ ] The coverage script fails when a functional requirement (R1–R10) has no scenario, and passes on the real features (unit-tested)
- [ ] Scenarios start red (steps not yet implemented). The tickets that build each behaviour turn them green

## Also

- [ ] Aadit reviews the features against the brief before the build relies on them
- [ ] CI runs the coverage check (`vp run features:coverage`)

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Session 2026-11-18 #11: Implementation Plan](session-2026-11-18-11-implementation-plan.md)
- [ticket-0019: Build the Coach Orchestrator](ticket-0019-coach-orchestrator.md)
- [ticket-0021: Build the Chat Page](ticket-0021-chat-ui.md)
- [ticket-0025: Design the UI in Claude Design](ticket-0025-ui-design.md)
- [PR #10: Add Dependencies and Test Projects](pr-0010-test-and-runtime-setup.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)
