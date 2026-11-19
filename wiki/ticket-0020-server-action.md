---
title: "ticket-0020: Add the Server Action"
type: ticket
status: done
updated: 2026-11-19
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

- [x] Input validation: rejects empty or over-long messages (> 1,000 characters), unknown roles and over-long histories
- [x] A valid history reaches `respond` with the configured model ID (`COACH_MODEL`, default `gemini-3.8-flash`)

## Also

- [x] Server Functions are reachable by direct POST, so input is validated inside the action (Next.js data security guidance)

## Result

Built by Claude in [PR #19](pr-0019-server-action.md), stacked on PR #18.

- `askCoach(history)` in `src/app/actions.ts` is a Server Function: it runs only on the server, so the API key never reaches the browser.
- `parseHistory` in `src/coach/input.ts` accepts 1 to 40 messages, ending with the parent's. Parent messages are 1 to 1,000 characters after trimming; coach turns may be up to 4,000, since escalations are long. Unknown roles and extra fields are rejected.
- **Invalid input gets the English fail-safe, not an error.** The page never sends it, and a direct POST learns nothing from the reply. The model isn't called.
- `modelId` reads `COACH_MODEL`, falling back to the default when it is unset or blank. The default was `gemini-3.8-flash`, and became `gemini-3.5-flash-lite` after the live smoke test ([ADR-0003](adr-0003-llm-provider.md)).
- The action's tests mock `@ai-sdk/google` and `respond`, so no live call is made.

## See also

- [ticket-0021: Build the Chat Page](ticket-0021-chat-ui.md)
- [Session 2026-11-19 #2: Orchestrator and Design](session-2026-11-19-02-orchestrator-and-design.md)
