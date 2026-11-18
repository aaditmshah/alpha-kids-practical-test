---
title: "Session 2026-11-18 #10: Coach Contract"
type: session
status: active
updated: 2026-11-18
summary: Aadit merged PR #7. Claude designed the reply schema, post-checks and display rules (ADR-0015) and the system prompt (ADR-0016) for ticket-0006.
---

# Session 2026-11-18 #10: Coach Contract

Back to: [Sessions](index-sessions.md) · Previous: [Session #9](session-2026-11-18-09-llm-client.md)

## Work

Aadit: _"Merged."_ That was [PR #7](pr-0007-choose-llm-client.md). Claude then took [ticket-0006](ticket-0006-design-coach-contract.md), the last design step before the implementation plan.

- **[ADR-0015](adr-0015-coach-reply-schema.md), the reply schema:**
  - a flat Zod object: `language`, `risk`, `summary`, 2–4 `plan` steps, `checkIn` (`kind` plus `text`) and a nullable `referral`
  - `checkIn` became an object rather than the sketch's union, because Gemini doesn't support `anyOf`
  - post-checks for dose amounts and suggested diagnoses
  - a table of what the app shows in each situation
  - the last 6 messages sent as history
- **[ADR-0016](adr-0016-system-prompt.md), the system prompt:** seven rules covering language, brevity, content, boundaries, risk (with Roman Urdu examples), the check-in and resistance to injected instructions, plus two examples, at temperature 0.3.
- **New text for Aadit to check:** a fixed referral reply in English and Roman Urdu.

## Open at end of session

- Aadit's review of ADR-0015, ADR-0016 and the referral wording, to be recorded on [PR #8](pr-0008-design-coach-contract.md) before merge.
- Next: [ticket-0008](ticket-0008-write-implementation-plan.md), the implementation plan and build tickets.
