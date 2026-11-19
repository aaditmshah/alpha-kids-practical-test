---
title: "ticket-0025: Design the UI in Claude Design"
type: ticket
status: done
updated: 2026-11-19
summary: Design the chat UI in Claude Design from the Gherkin scenarios, in a fun, pastel, child-friendly style with a loud escalation banner, and record the decisions in the wiki.
---

# ticket-0025: Design the UI in Claude Design

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------- |
| Requirements | R1, R2, R4, R8, R9 in [Requirements](requirements.md)                                              |
| Decisions    | [ADR-0018](adr-0018-ui-design-claude-design.md), [ADR-0011](adr-0011-layered-safety-escalation.md) |
| Depends on   | [ticket-0024](ticket-0024-gherkin-features.md) (scenarios to design for)                           |
| Files        | Claude Design artifact; `wiki/design-…` notes                                                      |

## Acceptance criteria

- [x] One artboard per scenario state: empty chat, plan reply, Roman Urdu reply, escalation banner, referral, fail-safe, waiting, on mobile and desktop
- [x] Pastel palette and friendly fonts; [alpha.kids](https://alpha.kids/) used as inspiration only
- [x] Escalation banner meets WCAG AA contrast, comes first and has tappable `tel:` links
- [x] Aadit approves the design before [ticket-0021](ticket-0021-chat-ui.md) starts
- [x] Decisions recorded in the wiki (palette, fonts, layout, banner, accessibility), with the artifact link and exported images if possible

## Result

Claude drafted the canvas in [session 2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md), and Aadit approved it: _"The design looks beautiful. I love it."_ The screens, their standalone HTML and every design decision are on the [UI Design](design.md) page.

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Session 2026-11-18 #11: Implementation Plan](session-2026-11-18-11-implementation-plan.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)
- [PR #18: Build the Coach Orchestrator](pr-0018-coach-orchestrator.md)
- [Session 2026-11-19 #2: Orchestrator and Design](session-2026-11-19-02-orchestrator-and-design.md)
- [Log](log.md)
