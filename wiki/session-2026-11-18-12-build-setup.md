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

## Stack review

Aadit: _"I reviewed all the PRs. They look good. I'll attempt the exercises next."_ He also corrected a mistake: _"All your PRs had the base branch set to main, which is incorrect. For stacked PRs, the base branch should be the head of the previous PR branch. I fixed it for you."_

Claude made three changes:

- **The stacking rule,** in the `git-commit` skill and [ADR-0008](adr-0008-protected-main-linear-history.md): a stacked PR targets the branch below it.
- **The reviews:** recorded for PRs #11 to #15 in one commit on the top PR, rather than restacking six branches.
- **Ticket-0024 closed,** since the features were approved.

With per-branch bases, the one-push merge now depends on GitHub retargeting the upper PRs when the lower branches are deleted. That behaviour is documented for merges from the UI, and is to be confirmed on this merge.

## Merging the stack

Aadit: _"I set main to model-adapter locally. On pushing, the remote rejected the changes because the base branch of PR #15 is not main. So, the fix is to fast-forward to the HEAD of each PR and push separately. Each time I did that, GitHub would automatically mark the PR as merged and change the base of the next PR to main."_

Claude read his shell history:

- `git rebase model-adapter` on `main`, and a rejected push
- then `git reset --hard <branch> && git push` for each PR from `test-and-runtime-setup` up to `model-adapter`
- then pruning, and deleting the local branches

The six PRs merged between 17:09:37 and 17:11:49. [ADR-0008](adr-0008-protected-main-linear-history.md) and the `git-commit` skill now describe the bottom-up procedure, in [PR #16](pr-0016-document-stack-merge.md). The earlier one-push merge only worked because PRs #4 and #5 both targeted `main`.

## Open at end of session

- Aadit's review of [PR #10](pr-0010-test-and-runtime-setup.md).
- Aadit reviews and merges the stack, PRs #10 to #15. His review of the features (PR #11) completes [ticket-0024](ticket-0024-gherkin-features.md).
- Aadit's exercises: [ticket-0014](ticket-0014-language-detection.md) (`detectLanguage`) and the post-checks in [ticket-0017](ticket-0017-reply-schema-and-postchecks.md).
- Then Claude: the orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md)). The UI design ([ticket-0025](ticket-0025-ui-design.md)) can start any time.

## See also

- [Session 2026-11-19 #1: Learning Exercises](session-2026-11-19-01-learning-exercises.md)
