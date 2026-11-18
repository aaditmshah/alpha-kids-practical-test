---
title: "Research: Free LLM Providers"
type: research
status: active
updated: 2026-11-18
summary: A comparison of $0 LLM API tiers (Gemini, Groq, OpenRouter, Cerebras, Mistral, GitHub Models and others) for an Urdu-capable coach with structured output. Recommendation is the Gemini free tier (Flash), with Groq as a fallback.
---

# Research: Free LLM Providers

Back to: [Research](index-research.md) · Ticket: [ticket-0003](ticket-0003-research-llm-providers.md) · Decision: [ADR-0003](adr-0003-llm-provider.md)

Accessed 2026-11-18. **Free-tier limits change often.** Treat the numbers here as indicative and check the provider's console before relying on them.

## What we need

1. **$0 to build and demo** ([R12](requirements.md)). No card on file is a bonus.
2. **Good Urdu** (Roman Urdu; see [ADR-0004](adr-0004-roman-urdu-only.md)), in both understanding and generation ([R2](requirements.md), [R10](requirements.md)).
3. **Reliable structured output** (a JSON schema) for plan, check-in and escalation ([R3](requirements.md), [R4](requirements.md)).
4. **Enough quota** for development and a reviewer's demo, which is tens to low hundreds of requests a day.
5. **Sensible safety behaviour** on crisis content.

Volume is tiny, so quota barely matters. **Urdu quality and structured output are what separate the options.**

## Options

| Provider                          | Free models (examples)                                                                                                                                     | Free limits                                                                                                                                                                                                                              | Card                | Trains on free data?                                                                                           | Notes                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Google Gemini API (AI Studio)** | `gemini-3.8-flash`, `gemini-3.6-flash`, `gemini-3.5-flash-lite`, `gemini-3.1-flash-lite`, and others ([pricing](https://aistudio.google.com/docs/pricing)) | No longer published per model; shown in [AI Studio](https://aistudio.google.com/rate-limit) after sign-in. Third-party reports: 5–15 RPM, 20–1,500 RPD ([OpenRouter blog](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/)) | No                  | **Yes**, "Used to improve our products" on the free tier ([pricing](https://aistudio.google.com/docs/pricing)) | First-party frontier model family with strong multilingual support and native JSON-schema output |
| **Groq**                          | `gpt-oss-120b`, Llama variants                                                                                                                             | About 30 RPM, about 1K RPD on gpt-oss-120b (third-party, Oct 2026; the [official page](https://console.groq.com/docs/rate-limits) returned 403 to our fetch)                                                                             | No                  | No                                                                                                             | Very fast, OpenAI-compatible. Urdu quality of open models is weaker (unverified)                 |
| **OpenRouter `:free` models**     | Rotating open models                                                                                                                                       | 20 RPM, **50/day** (1,000/day after a $10 top-up) ([OpenRouter blog](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/))                                                                                                      | No                  | Depends on the upstream provider                                                                               | 50/day is tight. The model list changes                                                          |
| **Cerebras**                      | Llama 3.3 70B, others                                                                                                                                      | 30 RPM, about 1M tokens/day                                                                                                                                                                                                              | No                  | No                                                                                                             | Fast. Same open-model Urdu concern                                                               |
| **Mistral (Experiment tier)**     | Mistral Small/Large                                                                                                                                        | About 1B tokens/month                                                                                                                                                                                                                    | No                  | Yes                                                                                                            | Weaker Urdu (unverified)                                                                         |
| **GitHub Models**                 | GPT-4o-class, Llama, Phi                                                                                                                                   | 15 RPM, 150–1,000/day                                                                                                                                                                                                                    | No (GitHub account) | No                                                                                                             | Meant for prototyping. The model list changes                                                    |
| **Cloudflare Workers AI**         | 20+ open models                                                                                                                                            | About 10K "neurons"/day                                                                                                                                                                                                                  | No                  | No                                                                                                             | Extra platform to learn                                                                          |
| **Cohere**                        | Command R+                                                                                                                                                 | About 100/day                                                                                                                                                                                                                            | No                  | No                                                                                                             | Non-commercial only                                                                              |
| **Anthropic / OpenAI**            | —                                                                                                                                                          | No ongoing free tier                                                                                                                                                                                                                     | Yes                 | —                                                                                                              | Ruled out by [R12](requirements.md)                                                              |

Sources: [Gemini pricing page](https://aistudio.google.com/docs/pricing), [Gemini rate limits](https://aistudio.google.com/docs/rate-limits), [OpenRouter: Free LLM APIs compared](https://openrouter.ai/blog/tutorials/free-llm-apis-compared/) (published 2026-06-15, updated 2026-09-24).

## Important details

- **Gemini model deprecations:** `gemini-2.5-pro` and `gemini-2.5-flash` are deprecated. Requests to them are routed to newer models on **2026-12-01**. Use a 3.x model ID.
- **Gemini free-tier data use:** Prompts may be used to improve Google's products. That is acceptable here: it is a demo with made-up example concerns and no real user data. **Do not** paste real family information while demoing. Note this in the app README.
- **Gemini rate limits are per project, not per API key.** Daily quotas reset at midnight Pacific time ([rate limits](https://aistudio.google.com/docs/rate-limits)).
- **TDD costs nothing anyway.** Unit tests mock the model. Only a small, opt-in "live" smoke suite calls the real API.

## Recommendation

**Gemini free tier, with `gemini-3.8-flash` as the default model and `gemini-3.5-flash-lite` as the quota fallback.** The model ID is set through an environment variable.

Why:

- It is the only $0 option backed by a first-party frontier model family, which matters most for Urdu quality and nuanced safety judgement.
- It has native JSON-schema structured output.
- No card is needed.

**Fallback provider: Groq (`gpt-oss-120b`).** It has no training on our data and is OpenAI-compatible.

Calling the model through a small adapter keeps the provider swappable. The concrete library is decided in [ticket-0007](ticket-0007-choose-stack.md).

## Still to verify

- [ ] Actual RPM/RPD for the chosen model, from the [AI Studio dashboard](https://aistudio.google.com/rate-limit) once the user has created a key.
- [ ] A quick qualitative Urdu check: two or three concerns written in **Roman Urdu** ([ADR-0004](adr-0004-roman-urdu-only.md)), run through Flash and Flash-Lite.

## See also

- [Log](log.md)
- [Open Questions](open-questions.md)
- [Session 2026-11-18 #1: Kickoff](session-2026-11-18-01-kickoff.md)
