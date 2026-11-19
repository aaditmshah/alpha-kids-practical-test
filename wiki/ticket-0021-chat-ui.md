---
title: "ticket-0021: Build the Chat Page"
type: ticket
status: done
updated: 2026-11-19
summary: A client chat component that keeps the conversation in state, sends it to the Server Action, and renders each coach turn with the escalation banner first.
---

# ticket-0021: Build the Chat Page

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------- |
| Requirements | R1, R2, R4, R8, R9 in [Requirements](requirements.md)                                         |
| Decisions    | [ADR-0011](adr-0011-layered-safety-escalation.md), [ADR-0015](adr-0015-coach-reply-schema.md) |
| Depends on   | [ticket-0020](ticket-0020-server-action.md), [ticket-0025](ticket-0025-ui-design.md)          |
| Files        | `src/app/page.tsx`, `src/components/Chat.tsx`, `src/components/CoachTurnView.tsx`             |

## Tests that drive it

- [x] An escalation turn renders a distinct banner (role `alert`) above everything else, with tappable `tel:` links
- [x] A plan turn renders the summary, a numbered list of steps, the referral when present, and the check-in last
- [x] Submitting appends the parent's message and the coach's reply to the history, and shows a pending state while waiting
- [x] The Next.js starter content and unused images are removed
- [x] The component-level scenarios (history, banner) in [ticket-0024](ticket-0024-gherkin-features.md)'s features pass
- [x] Matches the approved design from [ticket-0025](ticket-0025-ui-design.md)

## Also

- [x] Styling follows the approved design ([ADR-0018](adr-0018-ui-design-claude-design.md)), with Tailwind

## Result

Built by Claude in [PR #20](pr-0020-chat-page.md), stacked on PR #19, from the approved [UI Design](design.md).

- **`Chat`** (a Client Component) keeps the conversation in React state only (R9) and takes the coach as a prop, `ask`. The page passes the `askCoach` Server Function; tests pass a fake.
- **`CoachTurnView`** draws each kind of turn as the design does. An escalation is a `role="alert"` section that opens with its title and the call to 112, with each helpline as a `tel:` link. The fail-safe's 112 is a `tel:` link too.
- **One concern at a time:** Send is disabled while the coach replies, and an `<output>` status bubble says "The coach is replying…". Enter sends; Shift+Enter starts a new line. The box holds at most 1,000 characters, the server's limit.
- **History sent:** the last six messages, with coach turns as the text the parent saw (`turnToText`), as [ADR-0015](adr-0015-coach-reply-schema.md) says.
- **If the request fails** (network down, server error), the parent still gets the fail-safe with 112, in the language of their message.
- **Newest message in view:** the conversation scrolls in a reversed flex column, so it starts at, and stays with, the latest message without any script.
- **Browser-safe modules:** `CoachTurn` and its helpers moved to `src/coach/turn.ts`, and the limits to `src/coach/limits.ts`, so the page doesn't ship the AI SDK or Zod.
- **Tailwind tokens** in `globals.css` hold the design's palette; Fredoka and Nunito are self-hosted with `next/font`. The Next.js starter content and images are gone.
- **Executable Gherkin:** the four `@component` scenarios now run against the page, so every scenario in the six features is executable.
- **Difference from the design:** Send is greyed out while the box is empty, not only while waiting.

## See also

- [ticket-0023: Finish the README and Submit](ticket-0023-readme-and-submission.md)
- [Session 2026-11-19 #2: Orchestrator and Design](session-2026-11-19-02-orchestrator-and-design.md)
- [ticket-0019: Build the Coach Orchestrator](ticket-0019-coach-orchestrator.md)
- [UI Design](design.md)
