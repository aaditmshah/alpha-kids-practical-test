---
title: "ADR-0018: Design the UI in Claude Design, Pastel and Playful"
type: adr
status: accepted
updated: 2026-11-18
summary: The UI is designed in Claude Design (a claude.ai Design artifact) from the Gherkin scenarios before the chat page is built. The style is fresh, fun and peppy, with pastel colours and friendly fonts, taking inspiration from alpha.kids.
---

# ADR-0018: Design the UI in Claude Design, Pastel and Playful

Back to: [Decisions](index-decisions.md) · Session: [2026-11-18 #11](session-2026-11-18-11-implementation-plan.md) · Ticket: [ticket-0025](ticket-0025-ui-design.md)

## Context

Aadit: _"I want to use Claude Design to design a great UI/UX for the app, keeping the user stories in our Gherkin files in mind. Design and coding must go hand-in-hand if we are to create a good product."_ On style: _"Start fresh. We can take a look at https://alpha.kids/ for inspiration. Even better, make it something fun and peppy with pastel colors, etc. to show that it's child friendly. Similarly, we can use fonts that are friendly and inviting."_

## Decision

- **Tool:** Claude Design, a Design artifact on claude.ai: a canvas of live artboards that Aadit can view and comment on. No design system is attached, so it starts fresh.
- **Input:** one artboard per scenario state from the [Gherkin features](adr-0017-bdd-gherkin-features.md):
  - empty chat
  - a plan reply
  - a Roman Urdu reply
  - an escalation banner with tappable helpline numbers
  - a referral reply
  - the fail-safe
  - the waiting state
  - mobile and desktop layouts
- **Style:** fun, peppy and child-friendly, with pastel colours and friendly, inviting fonts. [Alpha Kids](research-alpha-kids.md) is inspiration only, not a copy.
- **Safety stays loud:** the escalation banner must stand out from the pastel palette. It needs strong contrast that meets WCAG AA, must appear first, and has `tel:` links. Playful styling never softens a crisis message.
- **Timing:** design runs alongside milestones M1–M2, which don't depend on the UI. It must be approved before M3 (the chat page) starts.

## Consequences

- The chat page is built from an approved design rather than improvised.
- Design artifacts are private claude.ai pages that interviewers can't open. The wiki records the design decisions (palette, fonts, layout, banner treatment, accessibility) and the link, plus exported images of the key screens if the canvas allows it.
- Fonts come from Google Fonts through `next/font`, self-hosted at build time, so nothing extra loads at runtime.

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [PR #9: Write the Implementation Plan](pr-0009-implementation-plan.md)
- [ticket-0021: Build the Chat Page](ticket-0021-chat-ui.md)
- [Session 2026-11-19 #2: Orchestrator and Design](session-2026-11-19-02-orchestrator-and-design.md)
- [UI Design](design.md)
- [How We Used Coding Agents](coding-agents.md)
