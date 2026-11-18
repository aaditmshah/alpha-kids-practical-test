---
title: "ADR-0014: Call Gemini Through the Vercel AI SDK"
type: adr
status: proposed
updated: 2026-11-18
summary: Proposed. Use the Vercel AI SDK (ai, @ai-sdk/google) with Zod 4 schemas behind a one-function adapter. It gives Zod-validated structured output, built-in test mocks and a one-import switch to Groq.
---

# ADR-0014: Call Gemini Through the Vercel AI SDK

Back to: [Decisions](index-decisions.md) · Research: [LLM client library](research-llm-client.md) · Ticket: [ticket-0007](ticket-0007-choose-stack.md)

**Status: proposed.** It becomes accepted when Aadit agrees.

## Context

Gemini is the model ([ADR-0003](adr-0003-llm-provider.md)) and Next.js is the app ([ADR-0007](adr-0007-nextjs-with-vite-plus.md)). We still need a library to call the model. The reply must be structured and validated, failures must reach the fail-safe ([ADR-0011](adr-0011-layered-safety-escalation.md)), and tests must not hit the network ([ADR-0002](adr-0002-minimal-scope-tdd.md)).

## Options considered

1. **`@google/genai`:** Google's own SDK. Its structured-output path is the new Interactions API, which means parsing and validating ourselves. It has no test helpers, and switching to Groq would mean a rewrite.
2. **Vercel AI SDK** (`ai` + `@ai-sdk/google`).
3. **Raw `fetch` to the REST API:** no dependency, but we would rebuild retries, errors and validation ourselves.

## Decision

**Option 2:**

- Call `generateText` with `Output.object({ schema })` and a flat Zod 4 schema, with the API key in `GOOGLE_GENERATIVE_AI_API_KEY`.
- Wrap it in one function, `coach(history) → CoachReply`, so the rest of the app never imports the SDK.
- Unit tests use `MockLanguageModelV4` from `ai/test`.

## Consequences

- Structured output is constrained by Gemini and validated by Zod. Invalid replies become typed errors, which go to the fail-safe.
- Switching to Groq is a provider import inside the adapter.
- Two fast-moving packages; the one-week release delay keeps their versions mature.
- The exact error classes for 429s and safety blocks are confirmed test-first during the build.

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Log](log.md)
- [PR #7: Choose the LLM Client](pr-0007-choose-llm-client.md)
- [Session 2026-11-18 #9: LLM Client](session-2026-11-18-09-llm-client.md)
