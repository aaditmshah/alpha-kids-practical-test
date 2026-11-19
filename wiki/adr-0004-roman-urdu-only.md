---
title: "ADR-0004: Support Urdu Only as Roman Urdu (Latin Script)"
type: adr
status: accepted
updated: 2026-11-18
summary: Urdu is supported only as Roman Urdu (Latin alphabet), for both input and replies. No Urdu (Arabic) script, no right-to-left layout, no Nastaliq fonts.
---

# ADR-0004: Support Urdu Only as Roman Urdu (Latin Script)

Back to: [Home](index.md) · [Decisions](index-decisions.md) · Session: [2026-11-18 #2](session-2026-11-18-02-decisions.md)

## Context

The [brief](source-practical-test-brief.md) says a parent should be able to type a concern "in English or Urdu". Urdu can be written two ways:

- **Urdu script:** Perso-Arabic, written right to left, usually in the Nastaliq style.
- **Roman Urdu:** the Latin alphabet, very common in texting and on WhatsApp.

## Options considered

1. **Urdu script only.** Needs right-to-left layout, mixed-direction text handling and Nastaliq fonts. Aadit can't read it, so can't check the replies.
2. **Both scripts.** Has all the cost of option 1, plus detecting which script was used.
3. **Roman Urdu only.** No layout work. Aadit knows Hindi, which is mutually intelligible with spoken Urdu, so can read and check the replies.

## Decision

**Option 3.** Aadit gave two reasons:

1. _"This is a throwaway app. So, I don't want to spend time on supporting a use case that's high effort and low value."_
2. Aadit knows Hindi but can't read the Arabic alphabet, so couldn't check Urdu-script replies.

## Consequences

- R2 and R10 in [Requirements](requirements.md) now mean Roman Urdu.
- **Risk:** a reviewer might type in Urdu script. Mitigation at no extra cost: the model will probably still understand it, and the coach replies in Roman Urdu. The README states that Urdu is supported as Roman Urdu, and why.
- Roman Urdu spelling varies a lot, so the language and safety checks must cope with variants. See [ticket-0005](ticket-0005-research-roman-urdu.md) and [ticket-0004](ticket-0004-research-safety-escalation.md).

## See also

- [ADR-0003: LLM Provider: Gemini Free Tier](adr-0003-llm-provider.md)
- [Log](log.md)
- [Open Questions](open-questions.md)
- [Plan](plan.md)
- [Research: Free LLM Providers](research-free-llm-providers.md)
- [Research: Safety and Escalation](research-safety-escalation.md)
- [ADR-0013: Roman Urdu Detection and Reply Language](adr-0013-roman-urdu-detection.md)
- [Research: Roman Urdu Handling](research-roman-urdu.md)
- [How We Used Coding Agents](coding-agents.md)
