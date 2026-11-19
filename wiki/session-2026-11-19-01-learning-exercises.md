---
title: "Session 2026-11-19 #1: Learning Exercises"
type: session
status: active
updated: 2026-11-19
summary: Aadit built detectLanguage and postcheck test-first. Claude reviewed both, fixed a marker gap that sent a Roman Urdu escalation out in English, widened the post-check tests and hedges, and opened PR #17.
---

# Session 2026-11-19 #1: Learning Exercises

Back to: [Sessions](index-sessions.md) · Previous: [Session 2026-11-18 #12](session-2026-11-18-12-build-setup.md)

## Work

Aadit did his two [learning exercises](adr-0019-learning-exercises.md) on a branch he forked from `main`, later named `learning-exercises`. He also added an Oxlint rule requiring separate type imports, and asked for it to be committed but not recorded here.

### `detectLanguage` ([ticket-0014](ticket-0014-language-detection.md))

- **Aadit's implementation and five tests,** committed as he wrote them.
- **Claude's review** ran every fixture in the project through the function. _Bachche ne zehar kha liya_, the Roman Urdu poisoning case in `features/escalation.feature`, and _Kya karoon?_ were detected as English, because the [research](research-roman-urdu.md) marker list lacked _ne_, _liya_ and _karoon_.
- **On test 5,** Claude also noted that it combines the threshold and normalisation (_Nahii_ versus _Nahiii_). Aadit kept it: _"Detecting a natural language is a genuinely hard problem. Let's not derail the practical test over it."_
- **Claude's follow-up commit:**
  - 51 markers
  - 11 fixture tests
  - a phrase in tests 4 and 5 swapped (to _"Yeh kya?"_), because the new markers changed their counts
  - the doc comment, `.ts` imports and `toBe`

### `postcheck` (second half of [ticket-0017](ticket-0017-reply-schema-and-postchecks.md))

- **Aadit's implementation and four tests,** committed as he wrote them. His case-insensitive matching closed a gap in [ADR-0015](adr-0015-coach-reply-schema.md).
- **Claude's review** probed every phrasing in the ticket, and all of them hit. It found that the tests covered one phrase each, all in the plan.
- **Claude's follow-up commit:**
  - table tests, a test per field and a precedence test
  - the hedges _may have_, _could have_ and _could be_, with ADR-0015 updated to match
  - the doc comment
- **Known gaps,** left by design: _sounds like he has ADHD_ and _half a tablet_ still get through, and _3 drops of food colouring_ is a false positive.

### Housekeeping

- [PR #16](pr-0016-document-stack-merge.md)'s review hadn't been recorded before merge, so it is recorded here.
- Branch `tmp` renamed to `learning-exercises`, and [PR #17](pr-0017-learning-exercises.md) opened.

## Review and feedback

Aadit approved [PR #17](pr-0017-learning-exercises.md): _"Looks good to me."_ He then gave honest feedback: the exercises taught him little. They were simple pure functions with their algorithms already documented, and what he'd have liked to learn was integrating the Vercel AI SDK, as in `askModel`. He added: _"No hard feelings."_ The lesson is recorded in [ADR-0019](adr-0019-learning-exercises.md): ask about learning objectives first.

## Open at end of session

- Aadit's review and merge of [PR #17](pr-0017-learning-exercises.md).
- Next: the orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md)), which makes the `respond()` scenarios of the Gherkin features executable.
