---
title: "PR #7: Choose the LLM Client"
type: pr
updated: 2026-11-18
summary: Compares Google's Gen AI SDK with the Vercel AI SDK and proposes the AI SDK for calling Gemini (ADR-0014). Closes ticket-0007.
---

# PR #7: Choose the LLM Client

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #9](session-2026-11-18-09-llm-client.md) · Ticket: [ticket-0007](ticket-0007-choose-stack.md)

## Facts

|             |                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#7](https://github.com/aaditmshah/alpha-kids-practical-test/pull/7) |
| Branch      | `choose-llm-client` → `main`                                                                             |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                       |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                        |
| Reviewed by | Aadit                                                                                                    |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))    |

## Why

The LLM client was the last open stack choice, and the reply schema and implementation plan depend on it.

## Commits

| #   | Commit                             | What                                                                                                                    | Why                                                                                      |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | `📝 Choose the LLM client library` | [Research page](research-llm-client.md), [ADR-0014](adr-0014-vercel-ai-sdk.md), ticket-0007 done, session #9, this page | Structured output, error handling, test mocks and an easy Groq switch decide the library |

## Review

Question for Aadit: accept ADR-0014 (the Vercel AI SDK), or prefer Google's SDK?

Aadit's answer:

> "Vercel AI SDK sounds excellent. I especially love that it supports Zod out of the box, holds the AI model to that schema, is easy to mock, and the AI model can be changed easily. Let's lock it in."

- **ADR-0014:** accepted, with no changes ([ADR-0014](adr-0014-vercel-ai-sdk.md)). The reasons he valued most: Zod support out of the box, the model held to the schema, easy mocking, and an easy model switch.

## See also

- [Log](log.md)
