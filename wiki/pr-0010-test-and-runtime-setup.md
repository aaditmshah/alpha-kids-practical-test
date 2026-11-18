---
title: "PR #10: Add Dependencies and Test Projects"
type: pr
updated: 2026-11-18
summary: Ticket-0013. Adds the AI SDK, Zod, Testing Library, jsdom and vitest-cucumber, splits Vitest into unit and component projects, and adds .env.example.
---

# PR #10: Add Dependencies and Test Projects

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md) · Ticket: [ticket-0013](ticket-0013-test-and-runtime-setup.md)

## Facts

|             |                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#10](https://github.com/aaditmshah/alpha-kids-practical-test/pull/10) |
| Branch      | `test-and-runtime-setup` → `main`                                                                          |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                         |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                          |
| Reviewed by | Aadit                                                                                                      |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))      |

## Why

The first build ticket of the [plan](plan.md). The Gherkin features ([ticket-0024](ticket-0024-gherkin-features.md)) need the runner, and every later ticket needs the dependencies and test projects.

## Commits

| #   | Commit                                              | What                                                                 | Why                                                                                             |
| --- | --------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1   | `➕ Add the AI SDK, its Google provider and Zod`    | `ai`, `@ai-sdk/google`, `zod`                                        | The model adapter, schema and input validation use them ([ADR-0014](adr-0014-vercel-ai-sdk.md)) |
| 2   | `➕ Add Testing Library, jsdom and vitest-cucumber` | Test dependencies, with `vitest` pinned to one copy                  | Component tests and executable Gherkin ([ADR-0017](adr-0017-bdd-gherkin-features.md))           |
| 3   | `✅ Split tests into unit and component projects`   | Node and jsdom projects, sample tests, a lint rule for Gherkin steps | Logic runs in Node, the UI needs a DOM. The sample proves a missing step fails                  |
| 4   | `🔧 Add .env.example for the Gemini key and model`  | `.env.example`, plus a `.gitignore` exception                        | Reviewers need to know which variables to set ([ADR-0005](adr-0005-local-only.md))              |
| 5   | `📝 Record ticket-0013 in the wiki`                 | Ticket done, board, session #12, this page                           | Everything is recorded in the wiki                                                              |
| 6   | `📝 Record PR #10's review`                         | This review section                                                  | Records the review before merge                                                                 |

## Review

Aadit: _"I reviewed the PR. Looks good to me."_ No changes requested.

He also asked Claude to build the next tickets as one stack of PRs, which he will review and merge together, and to leave some of the code for him to implement: _"I'd like to learn."_ See [session #12](session-2026-11-18-12-build-setup.md).

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Log](log.md)
