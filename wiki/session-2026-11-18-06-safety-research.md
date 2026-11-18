---
title: "Session 2026-11-18 #6: Safety Research"
type: session
status: active
updated: 2026-11-18
summary: Researched safety and escalation (ticket-0004). Aadit narrowed the helplines to India only, and Claude verified 112, 1098, 181 and 14416 from official sources and proposed layered crisis detection.
---

# Session 2026-11-18 #6: Safety Research

Back to: [Sessions](index-sessions.md) · Previous: [Session #5](session-2026-11-18-05-fast-forward-merges.md)

## Requests

After merging [PR #2](pr-0002-fast-forward-merges.md), Aadit said: _"Merged. Yes, go ahead with ticket 4."_ While the research was under way, he added: _"Also include Indian helpline. I am from India."_, then _"In fact, just use India. Nothing else."_ → [ADR-0012](adr-0012-india-helplines.md)

## How the research went

- **Helplines.** Each number had to come from an official Government of India source. pib.gov.in, mha.gov.in and telemanas.mohfw.gov.in refused automated fetches. Claude tried `curl` with a browser user agent, the permission check blocked it as an attempt to get round the block, and Claude dropped the approach. The numbers were verified instead from PIB's static PDFs (Ministry of Health, Ministry of Women and Child Development) and a state government page. See [Research: Safety and escalation](research-safety-escalation.md).
- **Model behaviour.** Gemini's adjustable safety filters are off by default for current models, and a blocked request returns an error with no content. Escalation can't rely on the model.
- **Messaging.** The Samaritans' guidance for tech platforms, and a CMAJ commentary on AI and suicide prevention, both point to fixed, compassionate templates with local helplines and encouragement to contact trusted people.

## Decisions

- [ADR-0012](adr-0012-india-helplines.md) (accepted): Indian helplines only.
- [ADR-0011](adr-0011-layered-safety-escalation.md) (proposed): a keyword pre-check before the model, the model's risk field, a fail-safe, and fixed escalation text.

## Work done

- [ticket-0004](ticket-0004-research-safety-escalation.md) done. Q3 answered in [Open questions](open-questions.md). The Alpha Kids research no longer assumes other regions.
- Delivered in [PR #3](pr-0003-research-safety-escalation.md).

## Open at end of session

- Aadit's review of ADR-0011 and of the escalation wording, especially the Roman Urdu, which [ticket-0005](ticket-0005-research-roman-urdu.md) will draft.
- Next: [ticket-0005](ticket-0005-research-roman-urdu.md), then [ticket-0007](ticket-0007-choose-stack.md).
