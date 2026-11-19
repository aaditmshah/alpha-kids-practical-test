---
title: "Session 2026-11-19 #2: Orchestrator and Design"
type: session
status: active
updated: 2026-11-19
summary: Aadit has a deadline, so there are no more exercises and the UI design runs alongside the code. Claude built the coach orchestrator with executable Gherkin specs and opened PR #18.
---

# Session 2026-11-19 #2: Orchestrator and Design

Back to: [Sessions](index-sessions.md) · Previous: [Session 2026-11-19 #1](session-2026-11-19-01-learning-exercises.md)

## Decisions

- **No more learning exercises.** Aadit has a submission deadline: _"Don't have time for more exercises."_ Claude builds every remaining ticket, and Aadit reviews and merges. He said the wiki is didactic enough to learn from later. This closes [ADR-0019](adr-0019-learning-exercises.md).
- **Design in parallel.** Aadit: _"Yes, start the design work in parallel."_ The Claude Design canvas ([ticket-0025](ticket-0025-ui-design.md)) is drafted alongside the orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md)) and the Server Action ([ticket-0020](ticket-0020-server-action.md)). It still needs Aadit's approval before the chat page ([ticket-0021](ticket-0021-chat-ui.md)).

## Work

### The coach orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md))

- **`respond(history, { model })`** applies the display table in [ADR-0015](adr-0015-coach-reply-schema.md) and returns one `CoachTurn`. The layers run in the order [ADR-0011](adr-0011-layered-safety-escalation.md) sets: pre-check, model, risk, post-check, then the plan. A failure at any step falls to the fail-safe.
- **Language of fixed messages:** the parent's language (from `detectLanguage`) when the model hasn't answered, as for a pre-check escalation or the fail-safe, and the reply's `language` when it has.
- **Only the latest parent message is pre-checked.** An earlier crisis was escalated when it was sent, so a later "thank you, he's fine now" gets an ordinary reply.
- **`turnToText` and `turnLanguage`** came with it, because the history sends coach turns as text (ADR-0015) and the page needs each turn's `lang`.
- **Shared mocks:** `src/coach/testing.ts` now holds the mock models, so the model adapter's tests, the orchestrator's tests and the specs share one copy.
- **Executable Gherkin:** five spec files run 22 scenario examples against `respond()`, excluding `@component` scenarios, which wait for the chat page ([ADR-0017](adr-0017-bdd-gherkin-features.md)).

## Open at end of session

- Aadit's review and merge of [PR #18](pr-0018-coach-orchestrator.md).
- Next: the Server Action ([ticket-0020](ticket-0020-server-action.md)), stacked on PR #18.

## See also

- [Log](log.md)
