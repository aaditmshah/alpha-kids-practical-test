---
title: "ticket-0021: Build the Chat Page"
type: ticket
status: todo
updated: 2026-11-18
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

- [ ] An escalation turn renders a distinct banner (role `alert`) above everything else, with tappable `tel:` links
- [ ] A plan turn renders the summary, a numbered list of steps, the referral when present, and the check-in last
- [ ] Submitting appends the parent's message and the coach's reply to the history, and shows a pending state while waiting
- [ ] The Next.js starter content and unused images are removed
- [ ] The component-level scenarios (history, banner) in [ticket-0024](ticket-0024-gherkin-features.md)'s features pass
- [ ] Matches the approved design from [ticket-0025](ticket-0025-ui-design.md)

## Also

- [ ] Styling follows the approved design ([ADR-0018](adr-0018-ui-design-claude-design.md)), with Tailwind

## See also

- [ticket-0023: Finish the README and Submit](ticket-0023-readme-and-submission.md)
