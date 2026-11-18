---
title: "PR #9: Write the Implementation Plan"
type: pr
updated: 2026-11-18
summary: Fills in the plan's architecture, test plan and milestones, creates build tickets 0013–0025 (including executable Gherkin features and a Claude Design UI, added in review), and fixes stale statuses on Home and in the plan.
---

# PR #9: Write the Implementation Plan

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #11](session-2026-11-18-11-implementation-plan.md) · Ticket: [ticket-0008](ticket-0008-write-implementation-plan.md)

## Facts

|             |                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#9](https://github.com/aaditmshah/alpha-kids-practical-test/pull/9) |
| Branch      | `implementation-plan` → `main`                                                                           |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                       |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                        |
| Reviewed by | Aadit                                                                                                    |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))    |

## Why

Research and design are done ([ADR-0011](adr-0011-layered-safety-escalation.md) to [ADR-0016](adr-0016-system-prompt.md)). The build needs a plan Aadit has approved, and small test-first tickets.

## Commits

| #   | Commit                                               | What                                                                                                                                                                       | Why                                                                        |
| --- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1   | `📝 Write the implementation plan and build tickets` | [Plan](plan.md) architecture, test plan and milestones; tickets 0013–0023; board, indexes, Home; session #11; this page                                                    | The build starts from an approved plan, one ticket per PR                  |
| 2   | `📝 Add BDD and UI design to the plan`               | [ADR-0017](adr-0017-bdd-gherkin-features.md), [ADR-0018](adr-0018-ui-design-claude-design.md), tickets 0024 and 0025, milestone M0, updates to tickets 0013, 0019 and 0021 | Aadit's review asked for executable Gherkin stories and a Claude Design UI |
| 3   | `📝 Record PR #9's review`                           | The plan approved; ticket-0008 done; this review section                                                                                                                   | Records the review before merge                                            |

## Review

Questions for Aadit:

1. Approve the plan (architecture, test plan, milestones)?
2. Anything to add, drop or re-order among tickets 0013–0023?

Aadit's answers:

> "I like this plan, especially the four milestones each with multiple tasks. There are two things that I'd like to add to it."

He then asked for executable Gherkin user stories that trace to the brief, and for a UI designed in Claude Design. His answers to Claude's three follow-up questions:

> "1. Let's go with `@amiceli/vitest-cucumber`. It's simpler and more popular. 2. Yes, we should have executable scenarios. 3. Start fresh. We can take a look at https://alpha.kids/ for inspiration. Even better, make it something fun and peppy with pastel colors, etc. to show that it's child friendly. Similarly, we can use fonts that are friendly and inviting."

- **The plan:** approved, with milestone M0 added (commit 2). Ticket-0008 is done.
- **[ADR-0017](adr-0017-bdd-gherkin-features.md)** and **[ADR-0018](adr-0018-ui-design-claude-design.md):** accepted.

## See also

- [Log](log.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)
