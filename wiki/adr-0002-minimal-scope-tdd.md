---
title: "ADR-0002: Minimal Scope, Test-Driven Development"
type: adr
status: accepted
updated: 2026-11-18
summary: Treat the app as a small throwaway built with TDD. Do the brief's requirements well and skip production extras such as auth, persistence, observability and large eval harnesses.
---

# ADR-0002: Minimal Scope, Test-Driven Development

Back to: [Home](index.md) · [Decisions](index-decisions.md) · Session: [2026-11-18 kickoff](session-2026-11-18-01-kickoff.md)

## Context

Aadit said: _"This is a simple throwaway app. I don't want to spend too much time on this … Let's use test-driven development. However, I don't want to implement all the bells and whistles of a full-scale application."_

## Decision

- **Scope:** exactly the [requirements](requirements.md), done well. No auth, database, analytics, deployment pipeline, streaming polish or large evaluation harness unless a requirement needs it.
- **TDD:** write a failing test, make it pass, then refactor. Each ticket names the tests that drive it.
  - **Unit tests** cover the pure logic: the safety pre-check, the reply schema and its validation, prompt construction and response rendering. The **LLM is mocked**, so tests are free and deterministic.
  - **A small, opt-in live smoke test** calls the real model on a handful of fixed concerns (English, Urdu, and each escalation category). It runs only when an API key is present.
- **Effort is spent where reviewers will look:** safety and escalation, structure and brevity, Urdu, and a clear README plus this wiki.

## Consequences

- Aadit gets a reviewable, well-tested core quickly.
- Some ideas from the first discussion are deferred, unless they turn out to be cheap: a full eval scoring script, Roman Urdu, rate limiting, and polished streaming. These are tracked in [Open questions](open-questions.md).

## See also

- [ADR-0005: Local Only, No Deployment](adr-0005-local-only.md)
- [Log](log.md)
- [Plan](plan.md)
- [Research: Aadit's Website Conventions](research-website-conventions.md)
- [ticket-0007: Choose the Stack and Test Tooling](ticket-0007-choose-stack.md)
- [ADR-0013: Roman Urdu Detection and Reply Language](adr-0013-roman-urdu-detection.md)
- [ADR-0014: Call Gemini Through the Vercel AI SDK](adr-0014-vercel-ai-sdk.md)
- [Research: LLM Client Library](research-llm-client.md)
