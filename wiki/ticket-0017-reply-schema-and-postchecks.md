---
title: "ticket-0017: Implement the Reply Schema and Post-Checks"
type: ticket
status: todo
updated: 2026-11-18
summary: The CoachReply Zod schema and the dose and diagnosis post-checks from ADR-0015.
---

# ticket-0017: Implement the Reply Schema and Post-Checks

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                       |
| ------------ | ----------------------------------------------------- |
| Requirements | R3, R4, R5, R6, R7 in [Requirements](requirements.md) |
| Decisions    | [ADR-0015](adr-0015-coach-reply-schema.md)            |
| Depends on   | [ticket-0013](ticket-0013-test-and-runtime-setup.md)  |
| Files        | `src/coach/schema.ts`, `src/coach/postcheck.ts`       |

## Tests that drive it

- [ ] Valid replies parse; missing fields, 1 or 5 plan steps, unknown enums and over-length strings fail
- [ ] `5 ml`, `2 tablets`, `10mg` → dose hit; `sounds like ADHD`, `might have autism` → diagnosis hit
- [ ] Echoing the parent's own diagnosis (_since your son has ADHD_) → no hit

## See also

- [ticket-0018: Build the Model Adapter and Prompt](ticket-0018-model-adapter.md)
