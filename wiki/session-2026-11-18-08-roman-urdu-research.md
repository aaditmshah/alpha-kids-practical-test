---
title: "Session 2026-11-18 #8: Roman Urdu Research"
type: session
status: active
updated: 2026-11-18
summary: Aadit merged PRs #4 and #5 with one push, confirming ADR-0008. Claude researched Roman Urdu handling (ticket-0005) and drafted the escalation wording in English and Roman Urdu for Aadit to check.
---

# Session 2026-11-18 #8: Roman Urdu Research

Back to: [Sessions](index-sessions.md) · Previous: [Session #7](session-2026-11-18-07-review-and-security.md)

## Stack merge confirmed

Aadit: _"Done."_ One fast-forward push merged [PR #4](pr-0004-record-pr-3-review.md) and [PR #5](pr-0005-security-basic-ftp.md) at the same second (07:54:59Z), and Dependabot marked alert #2 fixed four seconds later. [ADR-0008](adr-0008-protected-main-linear-history.md) now records this as confirmed.

## Roman Urdu research ([ticket-0005](ticket-0005-research-roman-urdu.md))

- **Literature:**
  - Roman Urdu has no standard spelling.
  - Word lists can't settle ambiguous romanised words.
  - A 2026 benchmark found that LLM safety detection degrades on Roman Urdu, most of all for passive suicidal ideation. That strengthens the keyword pre-check in [ADR-0011](adr-0011-layered-safety-escalation.md).
- **Proposed in [ADR-0013](adr-0013-roman-urdu-detection.md):**
  - the model reports its reply language
  - a marker-word heuristic sets the language of fixed text
  - mixed messages get Roman Urdu replies
  - replies use Hindustani vocabulary shared by Hindi and Urdu
  - the coach uses no gendered first-person verbs
  - crisis phrases are regex patterns that allow spelling variants
- **Drafted:** the escalation and fail-safe wording in English and Roman Urdu, in [Research: Roman Urdu handling](research-roman-urdu.md), plus the test fixtures it implies.

## Open at end of session

- ~~Aadit's check of the Roman Urdu wording and of ADR-0013.~~ Approved: the wording is unchanged and ADR-0013 is accepted as a demo-grade solution (_"It's a pre-programmed demo, which is all right for this practical test"_), recorded on [PR #6](pr-0006-research-roman-urdu.md).
- Next: [ticket-0007](ticket-0007-choose-stack.md) (LLM client library), then [ticket-0006](ticket-0006-design-coach-contract.md) (reply schema and prompt).
