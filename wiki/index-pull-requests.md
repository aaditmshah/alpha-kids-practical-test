---
title: "Index: Pull Requests"
type: index
status: active
updated: 2026-11-18
summary: Every pull request into main, with its status, plus the few commits pushed directly before main was protected.
---

# Index: Pull Requests

Back to: [Home](index.md)

`main` is protected ([ADR-0008](adr-0008-protected-main-linear-history.md)), so every change since the bootstrap arrives as a pull request, which Aadit fast-forwards into `main` ([ADR-0008](adr-0008-protected-main-linear-history.md)). Each PR has a page recording who made and reviewed it, what every commit does and why, and how the review went. The pages carry no status; follow the GitHub link for it ([ADR-0010](adr-0010-pr-pages-without-status.md)).

| PR                                                                              | Summary                                                                                                                 |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [PR #1: Bootstrap the Next.js app with Vite+](pr-0001-bootstrap-nextjs.md)      | Next.js scaffolded with Vite+; website conventions; CI; markdownlint; TypeScript wiki linter; backlinks; PR tracking    |
| [PR #2: Document fast-forward merges](pr-0002-fast-forward-merges.md)           | Corrects the docs: PRs are fast-forwarded into `main` locally, not rebase-merged on GitHub                              |
| [PR #3: Research safety and escalation](pr-0003-research-safety-escalation.md)  | Safety and escalation research, ADR-0011 (layered detection) and ADR-0012 (Indian helplines)                            |
| [PR #4: Record PR #3's review](pr-0004-record-pr-3-review.md)                   | ADR-0011 accepted; reviews are recorded before merge from now on                                                        |
| [PR #5: Fix the basic-ftp vulnerability](pr-0005-security-basic-ftp.md)         | Overrides basic-ftp to a patched version (Dependabot alert #2); documents stacked PRs. Stacked on PR #4                 |
| [PR #6: Research Roman Urdu handling](pr-0006-research-roman-urdu.md)           | Roman Urdu research and ADR-0013 (proposed); confirms one-push stack merges                                             |
| [PR #7: Choose the LLM client](pr-0007-choose-llm-client.md)                    | LLM client research and ADR-0014 (proposed)                                                                             |
| [PR #8: Design the coach contract](pr-0008-design-coach-contract.md)            | Reply schema and post-checks (ADR-0015) and system prompt (ADR-0016), both proposed                                     |
| [PR #9: Write the implementation plan](pr-0009-implementation-plan.md)          | Architecture, test plan, milestones and build tickets 0013–0023                                                         |
| [PR #10: Add dependencies and test projects](pr-0010-test-and-runtime-setup.md) | AI SDK, Zod, Testing Library, jsdom, vitest-cucumber; unit and component test projects; `.env.example` (ticket-0013)    |
| [PR #11: Write the Gherkin features](pr-0011-gherkin-features.md)               | Six executable-ready features quoting the brief; coverage check in CI; ADR-0019 (learning exercises). Stacked on PR #10 |
| [PR #12: Add the keyword safety pre-check](pr-0012-safety-precheck.md)          | `normalize`, `precheck` (English and Roman Urdu crisis phrases), and the `detectLanguage` stub. Stacked on PR #11       |
| [PR #13: Write the fixed messages](pr-0013-fixed-messages.md)                   | Helplines constant and the escalation, referral and fail-safe messages in English and Roman Urdu. Stacked on PR #12     |
| [PR #14: Define the reply schema](pr-0014-reply-schema.md)                      | `CoachReply` Zod schema and the `postcheck` stub for Aadit. Stacked on PR #13                                           |
| [PR #15: Build the model adapter and prompt](pr-0015-model-adapter.md)          | System prompt with examples, history trimming, and `askModel` with typed failures. Stacked on PR #14                    |
| [PR #16: Document how a stack is merged](pr-0016-document-stack-merge.md)       | Stacks merge bottom-up, one fast-forward push per PR, as Aadit found when one push was rejected                         |
| [PR #17: Aadit's learning exercises](pr-0017-learning-exercises.md)             | `detectLanguage` and `postcheck`, built by Aadit test-first, with review additions; separate type imports required      |
| [PR #18: Build the coach orchestrator](pr-0018-coach-orchestrator.md)           | `respond()` applies the safety layers in order; the respond-level Gherkin scenarios run; the UI design canvas recorded  |

## Before pull requests

Before branch protection existed, three commits went straight to `main`:

| Commit                                           | What and why                                                                                                                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `🎉 Begin project with an LLM wiki`              | The wiki, its three skills, the linter and the root CLAUDE.md, from [session #1](session-2026-11-18-01-kickoff.md) and [session #2](session-2026-11-18-02-decisions.md) |
| `🧑‍💻 Add git-commit skill and commit conventions` | The `git-commit` skill and [ADR-0006](adr-0006-gitmoji-atomic-commits.md), from [session #3](session-2026-11-18-03-commit-conventions.md)                               |
| `📝 Record the push to GitHub in the wiki`       | The public repository link, recorded after Aadit's first push                                                                                                           |

## See also

- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
- [ticket-0012: Wiki Backlinks and Pull Request Tracking](ticket-0012-backlinks-and-pr-tracking.md)
- [PR #17: Aadit's Learning Exercises](pr-0017-learning-exercises.md)
