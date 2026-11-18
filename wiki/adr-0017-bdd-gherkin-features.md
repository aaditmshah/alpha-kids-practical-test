---
title: "ADR-0017: Executable Gherkin Features Drive the Build"
type: adr
status: accepted
updated: 2026-11-18
summary: User stories are written as Gherkin feature files that quote the brief, tag requirement IDs, and run as Vitest tests through @amiceli/vitest-cucumber. A CI check fails if a brief requirement has no scenario.
---

# ADR-0017: Executable Gherkin Features Drive the Build

Back to: [Decisions](index-decisions.md) · Session: [2026-11-18 #11](session-2026-11-18-11-implementation-plan.md) · Ticket: [ticket-0024](ticket-0024-gherkin-features.md)

## Context

Reviewing the [plan](plan.md) in [PR #9](pr-0009-implementation-plan.md), Aadit asked for _"user stories in Gherkin feature files for BDD. We'll use this to drive our TDD. We should refer to the original source when writing the stories so that we can verify that we've captured all the requirements correctly."_

## Options considered

1. **Feature files as documentation only.** Cheap, but they drift from the code.
2. **Executable features with QuickPickle,** a Vitest plugin using the official Gherkin parser. It's a small project, about 32 weekly downloads ([QuickPickle](https://github.com/dnotes/quickpickle)), and needs a plugin in the Vite+ config.
3. **Executable features with [`@amiceli/vitest-cucumber`](https://npmjs.com/package/%40amiceli%2Fvitest-cucumber).** No plugin: a `.spec.ts` loads a `.feature` with `loadFeature`/`describeFeature`, and it fails when a scenario or step has no implementation.

Aadit chose option 3: _"It's simpler and more popular"_, and _"we should have executable scenarios"_.

## Decision

- **Location:** feature files live in `features/` at the repository root, with a spec file next to each.
- **Traceability:**
  - Every `Feature` quotes the brief sentence it implements, word for word, from [the brief](source-practical-test-brief.md).
  - Every scenario is tagged with its requirement IDs (`@R3 @R4`, from [Requirements](requirements.md)).
  - A tested script, run in CI, fails if any functional requirement (R1–R10) has no scenario. Process requirements (R11–R13) stay in the wiki.
- **Test levels:**
  - Most scenarios run against `respond()` with a mocked model: fast and deterministic.
  - Conversation-history and banner scenarios run against the chat component, in jsdom.
  - Scenario Outlines with `Examples` tables reuse the fixtures from the [safety](research-safety-escalation.md) and [Roman Urdu](research-roman-urdu.md) research.
- **Two loops:** a failing scenario is the outer loop (BDD). The unit tests in each ticket are the inner loop (TDD).

## Consequences

- The brief's requirements are checked mechanically: a missing scenario or an unimplemented step fails CI.
- Step definitions add some code. Keeping the features to six areas keeps it small.
- The runner's version is held back by the one-week release delay, like every dependency.

## See also

- [ADR-0018: Design the UI in Claude Design, Pastel and Playful](adr-0018-ui-design-claude-design.md)
- [Alpha Kids Practical Test Wiki](index.md)
- [ticket-0013: Add Dependencies and Test Projects](ticket-0013-test-and-runtime-setup.md)
- [PR #10: Add Dependencies and Test Projects](pr-0010-test-and-runtime-setup.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)
