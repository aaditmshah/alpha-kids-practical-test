---
title: "ADR-0003: LLM Provider: Gemini Free Tier"
type: adr
status: accepted
updated: 2026-11-18
summary: Use Google's Gemini API free tier (gemini-3.8-flash, falling back to gemini-3.5-flash-lite) through a swappable adapter, with Groq as the fallback provider. Chosen for $0 cost, Urdu quality and native JSON-schema output.
---

# ADR-0003: LLM Provider: Gemini Free Tier

Back to: [Home](index.md) · [Decisions](index-decisions.md) · Research: [Free LLM providers](research-free-llm-providers.md)

**Status: accepted** on 2026-11-18 ([session #2](session-2026-11-18-02-decisions.md)). Aadit: _"let's go with Gemini free tier for now. We can visit this decision later if it doesn't work out for us."_ If it disappoints, supersede this ADR with a new one (for example, switching to Groq).

## Context

Aadit's main concern is cost: _"I don't want to pay for the LLM model for a simple throwaway application."_ The coach must also handle Urdu well and return structured output reliably. See [Requirements](requirements.md) R2, R3, R10 and R12. Urdu means Roman Urdu ([ADR-0004](adr-0004-roman-urdu-only.md)).

## Options considered

Gemini free tier, Groq, OpenRouter `:free`, Cerebras, Mistral, GitHub Models, Cloudflare Workers AI and Cohere. Paid Anthropic/OpenAI were ruled out on cost. The full comparison is in [Research: Free LLM providers](research-free-llm-providers.md).

## Decision

- **Primary:** Google Gemini API free tier. Model `gemini-3.8-flash`, fallback `gemini-3.5-flash-lite`, selected with an environment variable.
- **Fallback provider:** Groq `gpt-oss-120b`, if Gemini's quota or quality disappoints.
- The model sits behind a one-function adapter (`coach(history) -> CoachReply`), so tests mock it and the provider can be swapped.

## Consequences

- **$0, and no card needed.**
- **Free-tier prompts may be used by Google to improve its products.** The demo must use made-up example concerns only, and the README will say so.
- Free-tier limits aren't published and may change. The app must show a friendly "coach is busy, try again" message when it hits a 429 (rate limit) response.
- Avoid the deprecated `gemini-2.5-*` model IDs, which are rerouted on 2026-12-01.

## See also

- [Log](log.md)
- [Open Questions](open-questions.md)
- [Plan](plan.md)
- [Session 2026-11-18 #1: Kickoff](session-2026-11-18-01-kickoff.md)
- [ticket-0003: Research Free LLM Providers](ticket-0003-research-llm-providers.md)
- [ticket-0007: Choose the Stack and Test Tooling](ticket-0007-choose-stack.md)
- [ADR-0014: Call Gemini Through the Vercel AI SDK](adr-0014-vercel-ai-sdk.md)
- [Research: LLM Client Library](research-llm-client.md)
