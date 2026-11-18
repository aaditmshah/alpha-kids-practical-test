---
title: "ADR-0011: Layered Safety with Fixed Escalation Messages"
type: adr
status: proposed
updated: 2026-11-18
summary: Proposed. Crisis detection has three layers. A keyword pre-check in code runs before the model, the model's structured reply carries a risk field, and any failure falls back to a safe message. Every escalation shows fixed, pre-written text with Indian helplines, never generated text.
---

# ADR-0011: Layered Safety with Fixed Escalation Messages

Back to: [Decisions](index-decisions.md) · Research: [Safety and escalation](research-safety-escalation.md) · Ticket: [ticket-0004](ticket-0004-research-safety-escalation.md)

**Status: proposed.** It becomes accepted when Aadit agrees.

## Context

R8 in [Requirements](requirements.md) says the coach must _"clearly escalate if the parent describes an emergency, abuse, or self harm"_. A free-tier model can be rate-limited, blocked or wrong, and Gemini's adjustable safety filters are off by default. Escalation is the one behaviour that must not fail.

## Options considered

1. **Model only:** trust the model to notice and escalate. Simplest, but untestable without live calls, and it fails silently when the model is down.
2. **Keywords only:** deterministic, but misses paraphrases.
3. **Layered (chosen):**
   - a keyword pre-check before the model
   - the model's `risk` field as a second net
   - a fail-safe for model errors

   Every escalation shows fixed text.

## Decision

**Option 3**, as described in [Research: Safety and escalation](research-safety-escalation.md):

- **A pre-check hit skips the model** and shows the fixed escalation for its category (`emergency`, `abuse` or `self_harm`).
- **A model reply with `risk` other than `none`** is replaced by the same fixed escalation.
- **Model errors** show a short fixed message that still points to 112.
- **Escalation messages are written once,** in English and Roman Urdu, and list the helplines in [ADR-0012](adr-0012-india-helplines.md). They are never generated.

## Consequences

- The most important behaviour is covered by fast, free unit tests.
- Some false positives will happen; the message invites the parent to clarify.
- The keyword lists need care in Roman Urdu, where spelling varies ([ticket-0005](ticket-0005-research-roman-urdu.md)).
- The reply schema in [ticket-0006](ticket-0006-design-coach-contract.md) must include `risk`.

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Log](log.md)
- [PR #3: Research Safety and Escalation](pr-0003-research-safety-escalation.md)
- [Session 2026-11-18 #6: Safety Research](session-2026-11-18-06-safety-research.md)
