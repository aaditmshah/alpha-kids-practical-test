---
title: Plan
type: plan
status: draft
updated: 2026-11-18
summary: Phased plan. Research, then plan, then build with TDD, then submit. The architecture and test-plan sections are filled in by ticket-0008.
---

# Plan

Back to: [Home](index.md) · [Requirements](requirements.md) · [Kanban](kanban.md)

## Guiding constraints

- Small, throwaway-sized app built with TDD ([ADR-0002](adr-0002-minimal-scope-tdd.md))
- $0 LLM cost: Gemini free tier ([ADR-0003](adr-0003-llm-provider.md))
- English and Roman Urdu only ([ADR-0004](adr-0004-roman-urdu-only.md))
- Local only, no deployment ([ADR-0005](adr-0005-local-only.md))
- Everything recorded in this wiki ([ADR-0001](adr-0001-flat-llm-wiki.md))

## Phases

| #   | Phase                                                                                                          | Tickets                                                                                                                            | Status |
| --- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | Set up the wiki and do context research                                                                        | [0001](ticket-0001-set-up-wiki.md), [0002](ticket-0002-research-alpha-kids.md), [0003](ticket-0003-research-llm-providers.md)      | done   |
| 2   | Research what is still open: safety, Roman Urdu, stack                                                         | [0004](ticket-0004-research-safety-escalation.md), [0005](ticket-0005-research-roman-urdu.md), [0007](ticket-0007-choose-stack.md) | todo   |
| 3   | Design the reply schema and prompt, and write the implementation plan                                          | [0006](ticket-0006-design-coach-contract.md), [0008](ticket-0008-write-implementation-plan.md)                                     | todo   |
| 4   | Build with TDD                                                                                                 | to be created in 0008                                                                                                              | —      |
| 5   | Submit: README with local build and run steps ([ADR-0005](adr-0005-local-only.md)), live smoke run, wiki check | to be created in 0008                                                                                                              | —      |

## Architecture (draft)

_To be filled in by [ticket-0008](ticket-0008-write-implementation-plan.md)._ Working idea:

1. A single page with the chat history kept in the page's state.
2. It posts to one server endpoint.
3. The endpoint runs a fixed safety pre-check first, then calls the LLM adapter, which returns a structured `CoachReply`.
4. The UI renders the escalation banner (if any), then the plan, then the check-in.

## Test plan (draft)

_To be filled in by [ticket-0008](ticket-0008-write-implementation-plan.md)._ Unit tests with the LLM mocked, plus an opt-in live smoke test ([ADR-0002](adr-0002-minimal-scope-tdd.md)).
