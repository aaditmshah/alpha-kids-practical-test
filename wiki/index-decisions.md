---
title: "Index: Decisions (ADRs)"
type: index
status: active
updated: 2026-11-18
summary: Every architectural decision record, with its status.
---

# Index: Decisions (ADRs)

Back to: [Home](index.md)

| ADR                                                                                   | Status   | Summary                                                                                                             |
| ------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| [ADR-0001: Flat, linked LLM wiki](adr-0001-flat-llm-wiki.md)                          | accepted | Everything recorded in a flat `wiki/` with skills to query, update and maintain it                                  |
| [ADR-0002: Minimal scope, TDD](adr-0002-minimal-scope-tdd.md)                         | accepted | Throwaway-sized app, test-first, LLM mocked in unit tests                                                           |
| [ADR-0003: LLM provider: Gemini free tier](adr-0003-llm-provider.md)                  | accepted | Gemini Flash (free), behind an adapter, with Groq as the fallback                                                   |
| [ADR-0004: Roman Urdu only](adr-0004-roman-urdu-only.md)                              | accepted | Urdu supported only in Latin script; no Urdu script or right-to-left layout                                         |
| [ADR-0005: Local only](adr-0005-local-only.md)                                        | accepted | No deployment; reviewers build and run it locally from the README                                                   |
| [ADR-0006: Gitmoji, atomic commits](adr-0006-gitmoji-atomic-commits.md)               | accepted | Unicode gitmoji with an imperative subject, what/why in the body, and atomic commits                                |
| [ADR-0007: Next.js with Vite+](adr-0007-nextjs-with-vite-plus.md)                     | accepted | Next.js 16 scaffolded with Vite+; pnpm, Oxlint, Oxfmt and Vitest from Vite+; Turbopack builds                       |
| [ADR-0008: Protected main, linear history](adr-0008-protected-main-linear-history.md) | accepted | PRs must pass the `ci` check; merged by local fast-forward; no pre-commit checks                                    |
| [ADR-0009: Title in frontmatter and H1](adr-0009-title-in-frontmatter-and-h1.md)      | accepted | Keep both; MD025 told to ignore the frontmatter title; wiki linter enforces a match                                 |
| [ADR-0010: PR pages without status](adr-0010-pr-pages-without-status.md)              | accepted | PR pages have no status (GitHub is the source of truth); CI requires a page named after each PR's number and branch |
| [ADR-0011: Layered safety, fixed escalation](adr-0011-layered-safety-escalation.md)   | accepted | Keyword pre-check before the model, model risk field, fail-safe; escalation text is fixed, never generated          |
| [ADR-0012: Indian helplines only](adr-0012-india-helplines.md)                        | accepted | Escalation lists 112, 1098, 181 and 14416, all verified from official sources                                       |
| [ADR-0013: Roman Urdu detection](adr-0013-roman-urdu-detection.md)                    | accepted | Model reports reply language; marker-word heuristic for fixed text; Hindustani vocabulary; regex crisis phrases     |
| [ADR-0014: Vercel AI SDK](adr-0014-vercel-ai-sdk.md)                                  | proposed | Call Gemini via `ai` + `@ai-sdk/google` with Zod schemas, behind a one-function adapter                             |

## See also

- [Wiki Conventions](conventions.md)
