---
title: "ADR-0012: Indian Helplines Only"
type: adr
status: accepted
updated: 2026-11-18
summary: Escalation messages list Indian helplines only (112, 1098, 181 and 14416), each verified from an official Government of India source.
---

# ADR-0012: Indian Helplines Only

Back to: [Decisions](index-decisions.md) · Research: [Safety and escalation](research-safety-escalation.md) · Session: [2026-11-18 #6](session-2026-11-18-06-safety-research.md)

## Context

Escalation messages need real phone numbers, and the app has no idea where a parent is. The earlier plan was to cover the regions an Urdu requirement suggests. Aadit decided otherwise: _"Also include Indian helpline. I am from India."_, then _"In fact, just use India. Nothing else."_

## Decision

List Indian helplines only:

- **112** for any emergency
- **1098** for a child at risk
- **181** for a woman facing violence
- **14416** (Tele MANAS) for suicidal thoughts and mental health

Each number is verified in [Research: Safety and escalation](research-safety-escalation.md). Other regions are out of scope.

## Consequences

- One short, verifiable list keeps the escalation text brief, which R5 in [Requirements](requirements.md) asks for.
- Aadit can check the numbers and the Roman Urdu/Hindi wording himself.
- A parent outside India would see numbers that don't work for them. That is accepted for a local-only demo ([ADR-0005](adr-0005-local-only.md)), and the README will say so.

## See also

- [ADR-0011: Layered Safety with Fixed Escalation Messages](adr-0011-layered-safety-escalation.md)
- [Log](log.md)
- [Open Questions](open-questions.md)
- [PR #3: Research Safety and Escalation](pr-0003-research-safety-escalation.md)
- [Research: Alpha Kids (the company)](research-alpha-kids.md)
- [ticket-0004: Research Safety and Escalation](ticket-0004-research-safety-escalation.md)
- [Research: Roman Urdu Handling](research-roman-urdu.md)
- [Alpha Kids Practical Test Wiki](index.md)
- [ticket-0016: Write the Fixed Messages](ticket-0016-fixed-messages.md)
- [ticket-0023: Finish the README and Submit](ticket-0023-readme-and-submission.md)
- [PR #13: Write the Fixed Messages](pr-0013-fixed-messages.md)
- [How We Used Coding Agents](coding-agents.md)
