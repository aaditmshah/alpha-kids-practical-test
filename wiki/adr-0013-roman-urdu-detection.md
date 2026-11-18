---
title: "ADR-0013: Roman Urdu Detection and Reply Language"
type: adr
status: accepted
updated: 2026-11-18
summary: The model reports the language it replied in. Fixed text uses a marker-word heuristic. Mixed messages get Roman Urdu replies in shared Hindustani vocabulary, with no gendered first-person verbs. Crisis phrases are regex patterns that allow spelling variants.
---

# ADR-0013: Roman Urdu Detection and Reply Language

Back to: [Decisions](index-decisions.md) · Research: [Roman Urdu handling](research-roman-urdu.md) · Ticket: [ticket-0005](ticket-0005-research-roman-urdu.md)

**Status: accepted** on 2026-11-18, in Aadit's review of [PR #6](pr-0006-research-roman-urdu.md). He accepts it as a deliberately scoped, demo-grade solution to a hard, fuzzy problem: _"It's a pre-programmed demo, which is all right for this practical test."_

## Context

The coach must reply in the parent's language, English or Roman Urdu ([ADR-0004](adr-0004-roman-urdu-only.md)). Roman Urdu has no standard spelling, parents mix it with English, and LLM safety detection is measurably weaker on it ([research](research-roman-urdu.md)).

## Options considered

1. **The model decides everything,** including the language of fixed text. But escalation from the pre-check deliberately skips the model ([ADR-0011](adr-0011-layered-safety-escalation.md)), so the language has to be known without it.
2. **A language-ID library or model.** Hinglish identifiers exist, but they add a dependency and don't target Roman Urdu.
3. **The model's `language` field when the model replies, and a marker-word heuristic for fixed text** (chosen).

## Decision

**Option 3:**

- **Language:** the structured reply carries `language: "en" | "ur-Latn"`. Fixed text uses a marker-word heuristic: at least 2 unambiguous Hindustani function words, making up at least 15% of the words, or any Arabic-script character.
- **Mixed messages:** they get Roman Urdu replies, keeping the English words parents naturally use.
- **Wording:** replies use Hindustani vocabulary shared by Hindi and Urdu, address the parent as _aap_, and never use gendered first-person verbs for the coach.
- **Crisis phrases:** Roman Urdu phrases are regex patterns with variant groups, matched after normalisation. A bare "hits" is left to the model, so everyday sibling and toddler hitting isn't escalated.

## Consequences

- Escalation and fail-safe text needs no model call and can be fully unit-tested.
- The thresholds are guesses until the TDD fixtures tune them.
- Urdu-script crisis messages rely on the model layer only, an accepted gap.
- The escalation wording in [Research: Roman Urdu handling](research-roman-urdu.md) was approved by Aadit as drafted.
- This is demo-grade Roman Urdu support: it handles the cases the fixtures cover. Robust handling of arbitrary spellings would need real NLP (normalisation, language ID), which is out of scope ([ADR-0002](adr-0002-minimal-scope-tdd.md)).

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Log](log.md)
- [PR #6: Research Roman Urdu Handling](pr-0006-research-roman-urdu.md)
- [Session 2026-11-18 #8: Roman Urdu Research](session-2026-11-18-08-roman-urdu-research.md)
- [Research: LLM Client Library](research-llm-client.md)
- [ADR-0016: The Coach's System Prompt](adr-0016-system-prompt.md)
