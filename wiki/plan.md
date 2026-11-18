---
title: Plan
type: plan
status: active
updated: 2026-11-18
summary: Phased plan, architecture, test plan and build milestones. Research and design are done; the build runs from executable Gherkin features and a Claude Design UI (M0) through tickets 0013–0025, test-first.
---

# Plan

Back to: [Home](index.md) · [Requirements](requirements.md) · [Kanban](kanban.md)

## Guiding constraints

- Small, throwaway-sized app built with TDD ([ADR-0002](adr-0002-minimal-scope-tdd.md))
- $0 LLM cost: Gemini free tier ([ADR-0003](adr-0003-llm-provider.md))
- English and Roman Urdu only ([ADR-0004](adr-0004-roman-urdu-only.md))
- Local only, no deployment ([ADR-0005](adr-0005-local-only.md))
- Everything recorded in this wiki ([ADR-0001](adr-0001-flat-llm-wiki.md))

## Phases

| #   | Phase                                                                                                          | Tickets                                                                                                                                                         | Status |
| --- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | Set up the wiki and do context research                                                                        | [0001](ticket-0001-set-up-wiki.md), [0002](ticket-0002-research-alpha-kids.md), [0003](ticket-0003-research-llm-providers.md)                                   | done   |
| 2   | Research what is still open: safety, Roman Urdu, stack                                                         | [0004](ticket-0004-research-safety-escalation.md), [0005](ticket-0005-research-roman-urdu.md), [0007](ticket-0007-choose-stack.md)                              | done   |
| 3   | Design the reply schema and prompt, and write the implementation plan                                          | [0006](ticket-0006-design-coach-contract.md), [0008](ticket-0008-write-implementation-plan.md)                                                                  | done   |
| 3½  | Bootstrap the app and protect `main`                                                                           | [0010](ticket-0010-bootstrap-app.md), [0011](ticket-0011-protect-main.md)                                                                                       | done   |
| 4   | Specify (Gherkin), design (Claude Design), then build with BDD and TDD                                         | [0024](ticket-0024-gherkin-features.md), [0025](ticket-0025-ui-design.md), [0013](ticket-0013-test-and-runtime-setup.md)–[0022](ticket-0022-live-smoke-test.md) | todo   |
| 5   | Submit: README with local build and run steps ([ADR-0005](adr-0005-local-only.md)), live smoke run, wiki check | [0023](ticket-0023-readme-and-submission.md)                                                                                                                    | todo   |

## Architecture

One page, one Server Function and a pure core. Everything that decides what a parent sees lives in `src/coach/`, as plain functions that unit tests can reach without Next.js or the network.

```text
features/               Gherkin user stories, quoting the brief, tagged @R1–@R10   (ADR-0017)
  *.feature, *.spec.ts  executable through @amiceli/vitest-cucumber
scripts/
  feature-coverage.ts   fails CI if a functional requirement has no scenario
src/
  app/
    page.tsx            server component; renders <Chat />
    actions.ts          'use server' askCoach(history): validate input, respond(history, gemini)
  components/
    Chat.tsx            'use client'; history in state, form, pending state
    CoachTurnView.tsx   one coach turn: escalation banner | plan | referral | fail-safe
  coach/
    normalize.ts        lowercase, collapse repeated letters and whitespace
    language.ts         detectLanguage(text): "en" | "ur-Latn"          (ADR-0013)
    precheck.ts         precheck(text): risk | null                     (ADR-0011, ADR-0013)
    helplines.ts        112, 1098, 181, 14416                           (ADR-0012)
    messages.ts         fixed escalation, referral and fail-safe text   (ADR-0011, ADR-0015)
    schema.ts           CoachReply Zod schema                           (ADR-0015)
    postcheck.ts        dose and diagnosis checks                       (ADR-0015)
    prompt.ts           system prompt, examples, history → messages     (ADR-0016)
    model.ts            askModel(history, model) via the AI SDK         (ADR-0014)
    coach.ts            respond(history, deps): CoachTurn               (ADR-0015 display table)
    input.ts            Zod schema for the Server Function's input
```

**Request flow:**

1. The parent submits a message.
2. `Chat` appends it to the history and calls `askCoach` with the last messages.
3. The action validates the input and calls `respond`:
   1. `precheck` on the new message. On a hit, it returns the fixed escalation, in the language from `detectLanguage`, without calling the model.
   2. `askModel` returns a validated `CoachReply` or a typed failure (`rate_limited`, `invalid_output`, `unavailable`). A failure returns the fixed fail-safe.
   3. If `risk ≠ none`, it returns the fixed escalation in the reply's language.
   4. If `postcheck` hits, it returns the fixed referral reply.
   5. Otherwise it returns the plan turn.
4. `Chat` appends the returned `CoachTurn`, and `CoachTurnView` renders it, with any escalation banner first.

**State:** the conversation lives only in the page's React state (R9). Nothing is stored on the server.

**Configuration:** `GOOGLE_GENERATIVE_AI_API_KEY` (required) and `COACH_MODEL` (default `gemini-3.8-flash`), in `.env.local`. `.env.example` is committed.

**Why a Server Function rather than a route handler:** Next.js 16 recommends Server Functions for mutations, and `useActionState` gives the pending state for free. Next.js also warns that Server Functions are _"reachable via direct POST requests"_, so `askCoach` validates its own input.

## Test plan

| Layer            | Runner                                          | What                                                                                                                                            | Tickets                                                                                                                               |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Acceptance (BDD) | Vitest + `@amiceli/vitest-cucumber` (`vp test`) | The Gherkin scenarios in `features/`, against `respond()` with a mocked model and against the chat component                                    | [0024](ticket-0024-gherkin-features.md), passing through [0019](ticket-0019-coach-orchestrator.md) and [0021](ticket-0021-chat-ui.md) |
| Unit             | Vitest, Node (`vp test`)                        | Normalisation, language, pre-check, messages, schema, post-checks, prompt, adapter (with `MockLanguageModelV4`), orchestrator, input validation | [0014](ticket-0014-language-detection.md)–[0020](ticket-0020-server-action.md)                                                        |
| Component        | Vitest, jsdom, Testing Library (`vp test`)      | `CoachTurnView` and `Chat` rendering and interaction, with the action mocked                                                                    | [0021](ticket-0021-chat-ui.md)                                                                                                        |
| Live smoke       | Vitest, opt-in (`vp run smoke`)                 | About 10 fixtures against real Gemini, only when an API key is set                                                                              | [0022](ticket-0022-live-smoke-test.md)                                                                                                |

- **BDD outside, TDD inside ([ADR-0017](adr-0017-bdd-gherkin-features.md)):** a failing scenario says _what_ to build, and the unit tests in each ticket drive _how_. `vp run features:coverage` fails CI if a functional requirement (R1–R10) has no scenario.
- **TDD, every ticket:** write a failing test, make it pass, then refactor. Commit when green, with test and code together ([ADR-0006](adr-0006-gitmoji-atomic-commits.md)).
- **Fixtures** come from the research pages: [Safety](research-safety-escalation.md) and [Roman Urdu](research-roman-urdu.md).
- **CI** (`ci` job) runs the unit and component tests on every PR. The live smoke test never runs in CI, because it needs a key and costs quota.

## Milestones

| Milestone              | Tickets                                                                                                                                                                                                                     | Result                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| M0: specify and design | [0024](ticket-0024-gherkin-features.md), [0025](ticket-0025-ui-design.md)                                                                                                                                                   | Executable user stories traced to the brief; an approved UI design. Design runs alongside M1–M2 and must be done before M3 |
| M1: deterministic core | [0013](ticket-0013-test-and-runtime-setup.md), [0014](ticket-0014-language-detection.md), [0015](ticket-0015-safety-precheck.md), [0016](ticket-0016-fixed-messages.md), [0017](ticket-0017-reply-schema-and-postchecks.md) | Everything that doesn't need the model, fully tested                                                                       |
| M2: the model          | [0018](ticket-0018-model-adapter.md), [0019](ticket-0019-coach-orchestrator.md), [0020](ticket-0020-server-action.md)                                                                                                       | `respond` works end to end, with the model mocked                                                                          |
| M3: the page           | [0021](ticket-0021-chat-ui.md)                                                                                                                                                                                              | The designed chat, in the browser                                                                                          |
| M4: submit             | [0022](ticket-0022-live-smoke-test.md), [0023](ticket-0023-readme-and-submission.md)                                                                                                                                        | Verified against real Gemini, documented for reviewers                                                                     |

Each ticket is one PR, stacked on the previous one where it depends on it ([ADR-0008](adr-0008-protected-main-linear-history.md)), so Aadit can fast-forward a milestone with one push.

## See also

- [Wiki Conventions](conventions.md)
- [PR #9: Write the Implementation Plan](pr-0009-implementation-plan.md)
- [Session 2026-11-18 #11: Implementation Plan](session-2026-11-18-11-implementation-plan.md)
