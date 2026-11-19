---
title: "Session 2026-11-19 #2: Orchestrator and Design"
type: session
status: active
updated: 2026-11-19
summary: Aadit has a deadline, so there are no more exercises and the UI design runs alongside the code. Claude built the coach orchestrator with executable Gherkin specs, drafted the design canvas and opened PR #18.
---

# Session 2026-11-19 #2: Orchestrator and Design

Back to: [Sessions](index-sessions.md) · Previous: [Session 2026-11-19 #1](session-2026-11-19-01-learning-exercises.md)

## Decisions

- **No more learning exercises.** Aadit has a submission deadline: _"Don't have time for more exercises."_ Claude builds every remaining ticket, and Aadit reviews and merges. He said the wiki is didactic enough to learn from later. This closes [ADR-0019](adr-0019-learning-exercises.md).
- **Design in parallel.** Aadit: _"Yes, start the design work in parallel."_ The Claude Design canvas ([ticket-0025](ticket-0025-ui-design.md)) is drafted alongside the orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md)) and the Server Action ([ticket-0020](ticket-0020-server-action.md)). It still needs Aadit's approval before the chat page ([ticket-0021](ticket-0021-chat-ui.md)).

## Work

### The coach orchestrator ([ticket-0019](ticket-0019-coach-orchestrator.md))

- **`respond(history, { model })`** applies the display table in [ADR-0015](adr-0015-coach-reply-schema.md) and returns one `CoachTurn`. The layers run in the order [ADR-0011](adr-0011-layered-safety-escalation.md) sets: pre-check, model, risk, post-check, then the plan. A failure at any step falls to the fail-safe.
- **Language of fixed messages:** the parent's language (from `detectLanguage`) when the model hasn't answered, as for a pre-check escalation or the fail-safe, and the reply's `language` when it has.
- **Only the latest parent message is pre-checked.** An earlier crisis was escalated when it was sent, so a later "thank you, he's fine now" gets an ordinary reply.
- **`turnToText` and `turnLanguage`** came with it, because the history sends coach turns as text (ADR-0015) and the page needs each turn's `lang`.
- **Shared mocks:** `src/coach/testing.ts` now holds the mock models, so the model adapter's tests, the orchestrator's tests and the specs share one copy.
- **Executable Gherkin:** five spec files run 22 scenario examples against `respond()`, excluding `@component` scenarios, which wait for the chat page ([ADR-0017](adr-0017-bdd-gherkin-features.md)).

### The UI design ([ticket-0025](ticket-0025-ui-design.md))

- **Canvas drafted** in Claude Design with eight artboards: seven phone states and a desktop page with history. The ticket records the palette, fonts, layout, escalation treatment and contrast checks.
- **Pastel, with a loud exception:** the escalation is a solid red alert with big `tel:` buttons, so the playful style never softens a crisis ([ADR-0018](adr-0018-ui-design-claude-design.md)).

### The Server Action ([ticket-0020](ticket-0020-server-action.md))

- **`askCoach(history)`** validates the conversation with Zod and calls `respond` with the Gemini model named by `COACH_MODEL`. Invalid input gets the fail-safe without calling the model. Opened as [PR #19](pr-0019-server-action.md), stacked on PR #18.

### The chat page ([ticket-0021](ticket-0021-chat-ui.md))

- **Built from the [UI Design](design.md)**, with Tailwind tokens for its palette and `next/font` for Fredoka and Nunito. Claude compared screenshots of the built page with the design on phone and desktop. Opened as [PR #20](pr-0020-chat-page.md), stacked on PR #19.
- **Every Gherkin scenario now runs**, including the four `@component` ones.

### Secrets ([ADR-0020](adr-0020-keep-secrets-from-claude.md))

- Before adding his Gemini key, Aadit asked that Claude be unable to read it. Project settings now deny reading or editing `.env` secrets files, and a Bash hook blocks commands that name them. Both were checked live. Opened as [PR #21](pr-0021-protect-secrets.md), stacked on PR #20.

### The live smoke test ([ticket-0022](ticket-0022-live-smoke-test.md))

- Eight live calls with Aadit's key. On the first run, `gemini-3.8-flash` never answered and the larger flash models returned 503 for high demand. `gemini-3.5-flash-lite` passed every check.
- So model calls now give up after 20 seconds, which shows the fail-safe, and Flash-Lite is the default ([ADR-0003](adr-0003-llm-provider.md)). Opened as [PR #22](pr-0022-live-smoke-test.md), stacked on PR #21.

## Review

Aadit approved [PR #18](pr-0018-coach-orchestrator.md) and the design (_"The design looks beautiful. I love it."_), and asked for the artboards in the wiki, as raw HTML if need be. Claude rendered each artboard to a PNG with headless Chromium and saved its standalone HTML beside it, on the new [UI Design](design.md) page. The linter now accepts these assets. He also ruled out translating the interface: _"English is fine. No need for Roman Urdu. This is a practical test, not a full product."_

Aadit approved [PR #19](pr-0019-server-action.md) too: _"Looks good to me."_

He then approved [PR #20](pr-0020-chat-page.md) and [PR #21](pr-0021-protect-secrets.md): _"I reviewed all the PRs. They all look good."_ He added his Gemini key for the smoke test.

## Open at end of session

- Aadit's merge of [PR #18](pr-0018-coach-orchestrator.md).
- Next: the opt-in live smoke test ([ticket-0022](ticket-0022-live-smoke-test.md)), which needs Aadit's Gemini key, and the README ([ticket-0023](ticket-0023-readme-and-submission.md)).

## See also

- [Log](log.md)
