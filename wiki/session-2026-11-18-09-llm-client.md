---
title: "Session 2026-11-18 #9: LLM Client"
type: session
status: active
updated: 2026-11-18
summary: Aadit merged PR #6. Claude compared Google's Gen AI SDK with the Vercel AI SDK for calling Gemini and proposed the AI SDK (ADR-0014).
---

# Session 2026-11-18 #9: LLM Client

Back to: [Sessions](index-sessions.md) · Previous: [Session #8](session-2026-11-18-08-roman-urdu-research.md)

## Work

Aadit: _"Merged."_ That was [PR #6](pr-0006-research-roman-urdu.md). Claude then took [ticket-0007](ticket-0007-choose-stack.md), the last open stack choice.

- **The comparison** is in [Research: LLM client library](research-llm-client.md). Google's SDK now documents structured output through a new Interactions API, needs us to validate ourselves, and has no test helpers. The Vercel AI SDK validates structured output against a Zod schema, ships `MockLanguageModelV4`, and switches to Groq with one import.
- **Gemini's schema limits** shape the reply schema in [ticket-0006](ticket-0006-design-coach-contract.md): enums and item counts are enforced, length limits are dropped, and nested schemas can be rejected.
- **Proposed:** [ADR-0014](adr-0014-vercel-ai-sdk.md).

## Open at end of session

- ~~Aadit's review of ADR-0014.~~ Accepted (_"Let's lock it in."_), recorded on [PR #7](pr-0007-choose-llm-client.md).
- Next: [ticket-0006](ticket-0006-design-coach-contract.md) (reply schema and prompt), then [ticket-0008](ticket-0008-write-implementation-plan.md) (implementation plan).
