---
title: "Research: LLM Client Library"
type: research
status: active
updated: 2026-11-18
summary: Compares Google's @google/genai SDK with the Vercel AI SDK (ai + @ai-sdk/google) for calling Gemini with structured output. The AI SDK wins on Zod-validated structured output, built-in test mocks and a one-import switch to Groq.
---

# Research: LLM Client Library

Back to: [Research](index-research.md) · Ticket: [ticket-0007](ticket-0007-choose-stack.md) · Decision: [ADR-0014](adr-0014-vercel-ai-sdk.md)

Accessed 2026-11-18. The provider is already chosen: Gemini's free tier ([ADR-0003](adr-0003-llm-provider.md)), with Groq as the fallback.

## What the client must do

1. Return a **structured reply** (plan, check-in, risk, language) that the model is constrained to and that we validate ([ADR-0011](adr-0011-layered-safety-escalation.md), [ADR-0013](adr-0013-roman-urdu-detection.md)).
2. **Report failures distinctly** (rate limit, safety block, invalid output), so the fail-safe message can be shown.
3. Be **easy to mock** in unit tests ([ADR-0002](adr-0002-minimal-scope-tdd.md)).
4. Make **switching to Groq** cheap if Gemini's free tier disappoints.

## Candidates

|                          | `@google/genai` (Google Gen AI SDK)                                                                                                                                                                                                                          | `ai` + `@ai-sdk/google` (Vercel AI SDK)                                                                                                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Latest (npm, 2026-11-18) | 3.6.0                                                                                                                                                                                                                                                        | `ai` 7.0.176, `@ai-sdk/google` 4.0.122                                                                                                                                                                                                                                         |
| Structured output        | Google's docs now show the Interactions API: `client.interactions.create({ response_format: { mime_type: "application/json", schema } })`, then parse and validate yourself ([Gemini structured output](https://aistudio.google.com/docs/structured-output)) | `generateText({ output: Output.object({ schema }) })` with a Zod schema. Gemini gets the schema (`structuredOutputs` on by default), and the SDK validates the reply against it ([AI SDK Google provider](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai)) |
| Test support             | None built in                                                                                                                                                                                                                                                | `MockLanguageModelV4` from `ai/test`, which returns scripted text or JSON ([AI SDK testing](https://ai-sdk.dev/docs/ai-sdk-core/testing))                                                                                                                                      |
| Switching to Groq        | A rewrite against another SDK                                                                                                                                                                                                                                | Change the provider import (`@ai-sdk/groq`)                                                                                                                                                                                                                                    |
| Dependencies             | `ws`, `p-retry`, `protobufjs`, `google-auth-library`                                                                                                                                                                                                         | `@ai-sdk/provider`, `@ai-sdk/provider-utils`, `@ai-sdk/gateway`, with `zod` as a peer                                                                                                                                                                                          |
| API key variable         | Passed explicitly or read from the environment                                                                                                                                                                                                               | `GOOGLE_GENERATIVE_AI_API_KEY` by default                                                                                                                                                                                                                                      |
| Safety settings          | Native                                                                                                                                                                                                                                                       | `providerOptions.google.safetySettings`                                                                                                                                                                                                                                        |

## Gemini's schema limits (either library)

Gemini enforces only a subset of JSON Schema through constrained decoding:

- **Enforced:** `enum`, `required`, `minItems` and `maxItems`.
- **Silently dropped:** `minLength`, `maxLength` and similar keywords.
- **Rejected:** very large or deeply nested schemas, with _"400 INVALID_ARGUMENT"_ ([Gemini structured output](https://aistudio.google.com/docs/structured-output)).

So the reply schema ([ticket-0006](ticket-0006-design-coach-contract.md)) stays flat, uses `enum` for `risk` and `language`, and uses `minItems`/`maxItems` for the plan steps. Length limits are checked in our code. Google's docs also warn that schema-valid output can still be semantically wrong, which is what the post-checks in [ADR-0011](adr-0011-layered-safety-escalation.md) are for.

## Recommendation

**The Vercel AI SDK** (`ai`, `@ai-sdk/google`, `zod` 4), behind our own one-function adapter:

- Zod-validated structured output covers requirements 1 and 2. A reply that fails validation becomes a typed error, which feeds the fail-safe.
- `MockLanguageModelV4` lets tests exercise the real adapter code, including parsing and validation, without network calls.
- Groq is one import away.

Versions are picked by pnpm's one-week `minimumReleaseAge`, since both packages release almost daily.

## To confirm while building

- **Error types:** which AI SDK error classes and fields mark a 429 rate limit, a Gemini safety block and a validation failure, so the fail-safe can tell them apart. Pin these down test-first.
- **Model ID:** that `gemini-3.8-flash` works through `@ai-sdk/google`, in the opt-in live smoke test.

## See also

- [Log](log.md)
- [PR #7: Choose the LLM Client](pr-0007-choose-llm-client.md)
- [Session 2026-11-18 #9: LLM Client](session-2026-11-18-09-llm-client.md)
- [ADR-0015: Coach Reply Schema and Post-Checks](adr-0015-coach-reply-schema.md)
