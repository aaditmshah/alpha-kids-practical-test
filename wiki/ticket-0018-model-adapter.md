---
title: "ticket-0018: Build the Model Adapter and Prompt"
type: ticket
status: done
updated: 2026-11-18
summary: askModel(history, model) calls generateText with Output.object and the system prompt, returning a validated CoachReply or a typed failure.
---

# ticket-0018: Build the Model Adapter and Prompt

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Requirements | R3, R5, R6, R7, R8, R10, R12 in [Requirements](requirements.md)                                                          |
| Decisions    | [ADR-0014](adr-0014-vercel-ai-sdk.md), [ADR-0016](adr-0016-system-prompt.md), [ADR-0015](adr-0015-coach-reply-schema.md) |
| Depends on   | [ticket-0017](ticket-0017-reply-schema-and-postchecks.md)                                                                |
| Files        | `src/coach/prompt.ts`, `src/coach/model.ts`                                                                              |

## Tests that drive it

- [x] With `MockLanguageModelV4`: valid JSON → `CoachReply`; invalid JSON or schema mismatch → `invalid_output`; a 429 → `rate_limited`; other API errors → `unavailable`
- [x] The system prompt is passed as `system`, never mixed into parent text; temperature 0.3
- [x] Only the last 6 history messages are sent; coach turns are sent as their rendered text
- [x] The prompt contains the seven rules and the two examples from [ADR-0016](adr-0016-system-prompt.md)

## Also

- [x] Confirms which AI SDK error classes mark rate limits and safety blocks (open point in [Research: LLM client](research-llm-client.md))

## See also

- [ticket-0019: Build the Coach Orchestrator](ticket-0019-coach-orchestrator.md)

## Result

Delivered in [PR #15](pr-0015-model-adapter.md):

- `src/coach/prompt.ts`: the ADR-0016 system prompt, two worked examples (valid `CoachReply` objects in English and Roman Urdu), and `toModelMessages` (the last 6 messages)
- `src/coach/model.ts`: `askModel(history, model)` using `generateText` and `Output.object`, at temperature 0.3, with up to 800 output tokens and one retry
- **Error classes confirmed** (the open point in [Research: LLM client](research-llm-client.md)): bad output → `NoObjectGeneratedError` (or `NoOutputGeneratedError`); API errors → `APICallError` with `statusCode`; retried errors wrapped in `RetryError` with `lastError`. Mapped to `rate_limited` (429), `invalid_output` and `unavailable`
- 14 tests with `MockLanguageModelV4`. The two retryable cases add about 3 seconds of SDK backoff to the suite
