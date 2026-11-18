---
title: "Session 2026-11-18 #11: Implementation Plan"
type: session
status: active
updated: 2026-11-18
summary: After lunch, Claude wrote the implementation plan (architecture, test plan, milestones) and build tickets 0013–0023 for ticket-0008, and fixed stale statuses on Home and in the plan.
---

# Session 2026-11-18 #11: Implementation Plan

Back to: [Sessions](index-sessions.md) · Previous: [Session #10](session-2026-11-18-10-coach-contract.md)

## Work

Aadit merged [PR #8](pr-0008-design-coach-contract.md) and took a lunch break, then said: _"I'm back. Let's continue."_ Claude started from the wiki, as [CLAUDE.md](../CLAUDE.md) asks, and took [ticket-0008](ticket-0008-write-implementation-plan.md).

- **Next.js 16 docs** (bundled in `node_modules/next/dist/docs`, as `AGENTS.md` asks):
  - Server Functions are the recommended way to handle mutations
  - they are _"reachable via direct POST requests"_, so they must validate their own input
  - the client dispatches them one at a time
  - Vitest can't test async Server Components, but it can test client components with jsdom and Testing Library
- **[Plan](plan.md):**
  - architecture: a pure `src/coach/` core, a `'use server'` action and a client chat
  - the request flow, following ADR-0015's display table
  - a test plan: unit, component and opt-in live
  - four milestones
- **Build tickets:** [0013](ticket-0013-test-and-runtime-setup.md) to [0023](ticket-0023-readme-and-submission.md), each naming the tests that drive it.
- **Wiki maintenance:**
  - Home's "Decided" list stopped at ADR-0008 and now lists ADR-0009 to ADR-0016
  - the plan showed phases 2 and 3 as "todo" after their tickets were done
  - one ticket summary had a `: ` that made its YAML frontmatter invalid

## Open at end of session

- Aadit's review of the plan, to be recorded on [PR #9](pr-0009-implementation-plan.md) before merge. Approval completes ticket-0008.
- Next: milestone M1, starting with [ticket-0013](ticket-0013-test-and-runtime-setup.md).
