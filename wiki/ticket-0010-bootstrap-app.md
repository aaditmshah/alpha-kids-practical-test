---
title: "ticket-0010: Bootstrap the Next.js App with Vite+"
type: ticket
status: done
updated: 2026-11-18
summary: Scaffold Next.js with Vite+, adopt the candidate's website conventions (editor, lint, format, TypeScript, pins, VS Code, gitmoji hook), add CI and a README.
---

# ticket-0010: Bootstrap the Next.js App with Vite+

Back to: [Home](index.md) · [Tickets](index-tickets.md) · [Kanban](kanban.md) · Decision: [ADR-0007](adr-0007-nextjs-with-vite-plus.md) · Requirements: R1, R11, R13 in [Requirements](requirements.md)

## Acceptance criteria

- [x] Research how to bootstrap Next.js with Vite+ → [Research](research-vite-plus-nextjs.md)
- [x] Scaffold with `vp create next-app`, committed untouched
- [x] Copy the website's conventions → [Website conventions](research-website-conventions.md)
- [x] `vp check`, `vp test`, `vp run wiki:lint` and `vp run build` pass
- [x] CI workflow and Dependabot
- [x] README with local run instructions ([ADR-0005](adr-0005-local-only.md))
- [x] Delivered as atomic commits in [pull request #1](https://github.com/aaditmshah/alpha-kids-practical-test/pull/1)
