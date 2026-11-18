---
title: "ticket-0020: Add the Server Action"
type: ticket
status: todo
updated: 2026-11-18
summary: A 'use server' askCoach(history) that validates its input with Zod and calls respond with the real Gemini model.
---

# ticket-0020: Add the Server Action

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                      |
| ------------ | ------------------------------------------------------------------------------------ |
| Requirements | R1, R12 in [Requirements](requirements.md)                                           |
| Decisions    | [ADR-0007](adr-0007-nextjs-with-vite-plus.md), [ADR-0014](adr-0014-vercel-ai-sdk.md) |
| Depends on   | [ticket-0019](ticket-0019-coach-orchestrator.md)                                     |
| Files        | `src/app/actions.ts`, `src/coach/input.ts`                                           |

## Tests that drive it

- [ ] Input validation: rejects empty or over-long messages (> 1,000 characters), unknown roles and over-long histories
- [ ] A valid history reaches `respond` with the configured model ID (`COACH_MODEL`, default `gemini-3.8-flash`)

## Also

- [ ] Server Functions are reachable by direct POST, so input is validated inside the action (Next.js data security guidance)

## See also

- [ticket-0021: Build the Chat Page](ticket-0021-chat-ui.md)
