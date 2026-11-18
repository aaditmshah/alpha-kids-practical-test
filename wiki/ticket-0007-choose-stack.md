---
title: "ticket-0007: Choose the Stack and Test Tooling"
type: ticket
status: done
updated: 2026-11-18
summary: Framework, test runner and styling are decided (ADR-0007). The LLM client is the Vercel AI SDK (ADR-0014, proposed).
---

# ticket-0007: Choose the Stack and Test Tooling

Back to: [Home](index.md) · [Tickets](index-tickets.md) · [Kanban](kanban.md) · Constraints: [ADR-0002](adr-0002-minimal-scope-tdd.md), [ADR-0003](adr-0003-llm-provider.md)

## Questions to answer

- ~~Next.js App Router (one route handler plus one page) or a plain Node server with static HTML?~~ Decided: Next.js with the Vite+ toolchain ([ADR-0007](adr-0007-nextjs-with-vite-plus.md)).
- LLM client: the official Google Gen AI SDK, or the Vercel AI SDK (whose schema-based object generation makes switching to Groq easy)?
- ~~Tests: Vitest for units, with the model adapter mocked.~~ Decided: Vitest through Vite+ ([ADR-0007](adr-0007-nextjs-with-vite-plus.md)). React Testing Library for the UI is still optional.
- ~~Styling: plain CSS or Tailwind.~~ Decided: Tailwind CSS 4 ([ADR-0007](adr-0007-nextjs-with-vite-plus.md)).

## Output

An ADR for the LLM client library.

## Result

- [Research: LLM client library](research-llm-client.md)
- [ADR-0014](adr-0014-vercel-ai-sdk.md): the Vercel AI SDK, behind a one-function adapter (proposed)
- Delivered in [PR #7](pr-0007-choose-llm-client.md)

## See also

- [Plan](plan.md)
- [Research: Free LLM Providers](research-free-llm-providers.md)
- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
- [ticket-0008: Write the Implementation Plan and Build Tickets](ticket-0008-write-implementation-plan.md)
- [Session 2026-11-18 #5: Fast-Forward Merges](session-2026-11-18-05-fast-forward-merges.md)
- [Session 2026-11-18 #6: Safety Research](session-2026-11-18-06-safety-research.md)
- [Session 2026-11-18 #8: Roman Urdu Research](session-2026-11-18-08-roman-urdu-research.md)
- [Session 2026-11-18 #9: LLM Client](session-2026-11-18-09-llm-client.md)
