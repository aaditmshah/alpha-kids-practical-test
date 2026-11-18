---
title: "ADR-0007: Next.js App with the Vite+ Toolchain"
type: adr
status: accepted
updated: 2026-11-18
summary: The app is Next.js 16 (App Router, TypeScript, Tailwind, React Compiler), scaffolded with Vite+. Vite+ provides pnpm, Oxlint, Oxfmt and Vitest, and Next builds and serves with Turbopack. Conventions are copied from Aadit's website.
---

# ADR-0007: Next.js App with the Vite+ Toolchain

Back to: [Home](index.md) · [Decisions](index-decisions.md) · Research: [Vite+ and Next.js](research-vite-plus-nextjs.md), [Website conventions](research-website-conventions.md) · Session: [2026-11-18 #4](session-2026-11-18-04-bootstrap.md)

## Context

The [brief](source-practical-test-brief.md) allows Next.js or Node. Aadit asked for _"a simple Next.js application"_ bootstrapped with [Vite+](https://viteplus.dev/), which they already use for their website. This answers part of [ticket-0007](ticket-0007-choose-stack.md) and Q4 in [Open questions](open-questions.md).

## Options considered

1. **Next.js scaffolded with `vp create next-app`.** Vite+ provides the toolchain, and Next keeps Turbopack for building and serving.
2. **[vinext](https://cdn.jsdelivr.net/gh/cloudflare/vinext@main/README.md)**, a reimplementation of Next.js on Vite. It is experimental, and too risky for an interview submission.
3. **A plain Node server, or a Vite React app.** Allowed by the brief, but not what Aadit asked for.

## Decision

**Option 1.**

- **App:** Next.js 16.4.6, App Router, TypeScript, Tailwind CSS 4, the React Compiler, a `src/` directory, and the `#/*` alias for `src/*`.
- **Toolchain (Vite+ 1.4.0):**
  - pnpm 12.21.0 (pinned) and Node.js 26.13.0 (pinned)
  - Oxlint, with type-aware linting and type checking
  - Oxfmt, configured by `.editorconfig`
  - Vitest
- **Config:** the short lint and format style from Aadit's website, which replaced the 1,249-line config migrated from ESLint. See [Website conventions](research-website-conventions.md).
- **Commands:** use `vp run dev`, `vp run build` and `vp run start`. Never use the built-in `vp dev` or `vp build`, which run Vite.

## Consequences

- One CLI (`vp`) covers installing, checking, testing and running.
- Agents must remember the `vp run` versus built-in difference. It is noted in the root CLAUDE.md and the README.
- A fresh clone needs `vp run typegen` before `vp check`, because Next's route types live in `.next/`.
- The LLM client library is still open in [ticket-0007](ticket-0007-choose-stack.md).

## See also

- [Log](log.md)
- [ticket-0010: Bootstrap the Next.js App with Vite+](ticket-0010-bootstrap-app.md)
- [PR #1: Bootstrap the Next.js App with Vite+](pr-0001-bootstrap-nextjs.md)
- [ADR-0014: Call Gemini Through the Vercel AI SDK](adr-0014-vercel-ai-sdk.md)
