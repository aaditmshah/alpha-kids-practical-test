---
title: "ticket-0007: Choose the Stack and Test Tooling"
type: ticket
status: todo
updated: 2026-11-18
summary: Choose the web framework (Next.js or plain Node), the LLM client library, the test runner and the UI approach, keeping it as small as possible.
---

# ticket-0007: Choose the Stack and Test Tooling

Back to: [Home](index.md) · [Tickets](index-tickets.md) · [Kanban](kanban.md) · Constraints: [ADR-0002](adr-0002-minimal-scope-tdd.md), [ADR-0003](adr-0003-llm-provider.md)

## Questions to answer

- Next.js App Router (one route handler plus one page) or a plain Node server with static HTML?
- LLM client: the official Google Gen AI SDK, or the Vercel AI SDK (whose schema-based object generation makes switching to Groq easy)?
- Tests: Vitest for units, with the model adapter mocked. Optionally React Testing Library for the UI.
- Styling: plain CSS or Tailwind.

## Output

An ADR for the stack.
