---
title: "ticket-0013: Add Dependencies and Test Projects"
type: ticket
status: done
updated: 2026-11-18
summary: Add the AI SDK, Zod and Testing Library, split Vitest into a Node project and a jsdom project, and add .env.example for the API key.
---

# ticket-0013: Add Dependencies and Test Projects

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                  |
| ------------ | -------------------------------------------------------------------------------- |
| Requirements | R11, R12 in [Requirements](requirements.md)                                      |
| Decisions    | [ADR-0014](adr-0014-vercel-ai-sdk.md), [ADR-0002](adr-0002-minimal-scope-tdd.md) |
| Depends on   | —                                                                                |
| Files        | `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `.env.example`, `.gitignore` |

## Tests that drive it

- [x] `vp test` runs two projects: `unit` (Node, `src/**/*.test.ts`, `scripts/**/*.test.ts`, `features/**/*.spec.ts`) and `component` (jsdom, `src/**/*.test.tsx`, `features/**/*.spec.tsx`)
- [x] A sample `.feature` runs through `@amiceli/vitest-cucumber`, and fails when a scenario has no implementation
- [x] A placeholder test in each project proves the setup, and is deleted by the first real ticket in that project

## Also

- [x] `ai`, `@ai-sdk/google`, `zod` (4.x) added; `@testing-library/react`, `@testing-library/dom`, `jsdom` and `@amiceli/vitest-cucumber` ([ADR-0017](adr-0017-bdd-gherkin-features.md)) added as dev dependencies, all within the one-week release delay
- [x] `.env.example` documents `GOOGLE_GENERATIVE_AI_API_KEY` and `COACH_MODEL` (default `gemini-3.8-flash`); `.env*` stays gitignored except `.env.example`

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Session 2026-11-18 #11: Implementation Plan](session-2026-11-18-11-implementation-plan.md)
- [ticket-0008: Write the Implementation Plan and Build Tickets](ticket-0008-write-implementation-plan.md)
- [ticket-0014: Detect the Reply Language](ticket-0014-language-detection.md)
- [ticket-0016: Write the Fixed Messages](ticket-0016-fixed-messages.md)
- [ticket-0017: Implement the Reply Schema and Post-Checks](ticket-0017-reply-schema-and-postchecks.md)
- [ticket-0024: Write the Gherkin Features](ticket-0024-gherkin-features.md)
- [Log](log.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)

## Result

Delivered in [PR #10](pr-0010-test-and-runtime-setup.md):

- `ai` 7.0.169, `@ai-sdk/google` 4.0.117 and `zod` 4.6.7, the newest versions past the one-week release delay
- `@testing-library/react`, `@testing-library/dom`, `jsdom` and `@amiceli/vitest-cucumber` 8.0.0, with `vitest` pinned to the 5.0.5 that Vite+ ships, so there is one copy
- `unit` and `component` Vitest projects. Oxlint treats Gherkin steps as test blocks
- A sample feature and a sample component test. Removing a step made the feature suite fail, as [ADR-0017](adr-0017-bdd-gherkin-features.md) requires
- `.env.example` with `GOOGLE_GENERATIVE_AI_API_KEY` and `COACH_MODEL`
