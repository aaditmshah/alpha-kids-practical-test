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

## BDD and UI design added to the plan

Reviewing the plan, Aadit asked for two additions:

- _"I want to write some user stories in Gherkin feature files for BDD. We'll use this to drive our TDD. We should refer to the original source when writing the stories so that we can verify that we've captured all the requirements correctly."_
- _"I want to use Claude Design to design a great UI/UX for the app, keeping the user stories in our Gherkin files in mind. Design and coding must go hand-in-hand if we are to create a good product."_

Claude proposed the following, and asked three questions:

- **Executable features,** with each `Feature` quoting the brief, scenarios tagged with requirement IDs, and a CI coverage check.
- **A Claude Design canvas** with one artboard per scenario state, designed alongside M1–M2 and approved before M3.
- **A new milestone, M0.**

| Question                          | Aadit's answer                                                                                                                                                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runner                            | _"Let's go with `@amiceli/vitest-cucumber`. It's simpler and more popular."_                                                                                                                                                                    |
| Executable or documentation only? | _"Yes, we should have executable scenarios."_                                                                                                                                                                                                   |
| Design style                      | _"Start fresh. We can take a look at https://alpha.kids/ for inspiration. Even better, make it something fun and peppy with pastel colors, etc. to show that it's child friendly. Similarly, we can use fonts that are friendly and inviting."_ |

→ [ADR-0017](adr-0017-bdd-gherkin-features.md) and [ADR-0018](adr-0018-ui-design-claude-design.md). New tickets [0024](ticket-0024-gherkin-features.md) (features) and [0025](ticket-0025-ui-design.md) (design) form milestone M0. Tickets 0013, 0019 and 0021 now cover the runner, the scenarios and the design.

## Open at end of session

- ~~Aadit's review of the plan.~~ Approved with the M0 additions, and recorded on [PR #9](pr-0009-implementation-plan.md). Ticket-0008 is done.
- Next: milestone M0 ([ticket-0024](ticket-0024-gherkin-features.md), [ticket-0025](ticket-0025-ui-design.md)). [ticket-0013](ticket-0013-test-and-runtime-setup.md) comes first, since the features need the runner.
