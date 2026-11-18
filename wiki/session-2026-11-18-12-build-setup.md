---
title: "Session 2026-11-18 #12: Build Setup"
type: session
status: active
updated: 2026-11-18
summary: Aadit merged PR #9. Claude did ticket-0013 (runtime and test dependencies, unit and component test projects, the Gherkin runner, .env.example) in PR #10.
---

# Session 2026-11-18 #12: Build Setup

Back to: [Sessions](index-sessions.md) · Previous: [Session #11](session-2026-11-18-11-implementation-plan.md)

## Work

Aadit merged [PR #9](pr-0009-implementation-plan.md). Claude took [ticket-0013](ticket-0013-test-and-runtime-setup.md), which the Gherkin features in M0 need first.

- **Dependencies:** pnpm's one-week release delay chose `ai` 7.0.169, `@ai-sdk/google` 4.0.117 and `zod` 4.6.7.
- **One Vitest:** `@amiceli/vitest-cucumber` 8.0.0 asks for `vitest` ^5 as a peer. `vitest` is pinned to the 5.0.5 that Vite+ ships, through the catalog, an override and the peer rules, as in Aadit's website, so only one copy is installed.
- **Test-first setup:** the sample component test failed first, because everything ran in Node and there was no DOM. Splitting Vitest into `unit` (Node) and `component` (jsdom) projects made it pass.
- **The runner's guarantee:** deleting a step from the sample feature's spec made the suite fail, which [ADR-0017](adr-0017-bdd-gherkin-features.md) relies on.
- **A lint clash:** Oxlint's `vitest/no-standalone-expect` flagged `expect` inside Gherkin steps. It now treats `Given`, `When`, `Then`, `And` and `But` as test blocks.
- **`.env.example`** documents the key and the model, with a reminder about free-tier data.

## The PR stack and Aadit's exercises

Aadit approved [PR #10](pr-0010-test-and-runtime-setup.md) and asked for the next tickets as one stack of PRs, _"I'll review them and merge them all once you're done"_, with some of the code left for him: _"I'd like to learn."_ → [ADR-0019](adr-0019-learning-exercises.md): `detectLanguage` and the post-checks are his to build, from typed stubs, and the stack pauses before the orchestrator.

- **[PR #11](pr-0011-gherkin-features.md), ticket-0024:**
  - six features, each quoting the brief, tagged with requirement IDs, and checked to parse with `vitest-cucumber`
  - a tested coverage check in CI, which also verifies each quote word for word against the brief
- **A change to ADR-0017.** Because unimplemented steps fail, each feature's spec arrives with the ticket that builds the behaviour, not with the features.

- **[PR #12](pr-0012-safety-precheck.md), ticket-0015:** `normalize` and the keyword pre-check, written test-first with 38 cases. When a message describes several crises, the most urgent wins. Also the `detectLanguage` stub.

- **[PR #13](pr-0013-fixed-messages.md), ticket-0016:** the helplines and the fixed messages as structured objects, using the approved wording, with 18 tests.

- **[PR #14](pr-0014-reply-schema.md), the schema half of ticket-0017:** the `CoachReply` Zod schema, with 12 tests and descriptions for the model, plus the `postcheck` stub.

- **[PR #15](pr-0015-model-adapter.md), ticket-0018:**
  - the system prompt, with examples that are tested against the schema
  - history trimmed to the last 6 messages
  - `askModel`, with typed failures

  The AI SDK's error classes were confirmed from its bundled docs.

- **Where the stack stops.** It ends here, before the orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md)), which needs Aadit's `detectLanguage` and `postcheck` ([ADR-0019](adr-0019-learning-exercises.md)).

## Open at end of session

- Aadit's review of [PR #10](pr-0010-test-and-runtime-setup.md).
- Aadit reviews and merges the stack, PRs #10 to #15. His review of the features (PR #11) completes [ticket-0024](ticket-0024-gherkin-features.md).
- Aadit's exercises: [ticket-0014](ticket-0014-language-detection.md) (`detectLanguage`) and the post-checks in [ticket-0017](ticket-0017-reply-schema-and-postchecks.md).
- Then Claude: the orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md)). The UI design ([ticket-0025](ticket-0025-ui-design.md)) can start any time.
