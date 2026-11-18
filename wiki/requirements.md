---
title: Requirements
type: plan
status: active
updated: 2026-11-18
summary: The brief broken into numbered, testable requirements (R1–R13), plus explicit non-goals and the scope constraints Aadit set.
---

# Requirements

Back to: [Home](index.md) · Source: [Practical test brief](source-practical-test-brief.md)

Each requirement has an ID so that [tickets](index-tickets.md) and tests can refer to it. "Brief" means the requirement is stated in the [brief](source-practical-test-brief.md). "Aadit" means Aadit added it (see [ADR-0002](adr-0002-minimal-scope-tdd.md)).

## Functional requirements

| ID  | Requirement                                                                                                                                 | Origin                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| R1  | App is built with Next.js or Node and has a simple web UI                                                                                   | Brief                    |
| R2  | A parent can type a concern in **English or Urdu**. Urdu means **Roman Urdu (Latin script) only** ([ADR-0004](adr-0004-roman-urdu-only.md)) | Brief, narrowed by Aadit |
| R3  | An LLM coach replies with a **short, structured plan**                                                                                      | Brief                    |
| R4  | Every reply includes a **follow-up check-in**: either a question or a time to come back                                                     | Brief                    |
| R5  | Replies are **brief and practical**                                                                                                         | Brief                    |
| R6  | The coach **does not diagnose**                                                                                                             | Brief                    |
| R7  | The coach **gives no medical or legal instructions**                                                                                        | Brief                    |
| R8  | The coach **clearly escalates** when the parent describes an **emergency, abuse, or self-harm**                                             | Brief                    |
| R9  | The page shows a simple conversation history                                                                                                | Brief                    |
| R10 | Replies come back in the language the parent wrote in: English or Roman Urdu (inferred from R2)                                             | Aadit                    |

## Process and constraint requirements

| ID  | Requirement                                                                    | Origin                                            |
| --- | ------------------------------------------------------------------------------ | ------------------------------------------------- |
| R11 | Built test-first (TDD). The LLM is mocked in unit tests, so tests cost nothing | Aadit ([ADR-0002](adr-0002-minimal-scope-tdd.md)) |
| R12 | Costs nothing to run: uses a free LLM tier (Gemini)                            | Aadit ([ADR-0003](adr-0003-llm-provider.md))      |
| R13 | Runs locally only. A reviewer builds and starts it from the README             | Aadit ([ADR-0005](adr-0005-local-only.md))        |

## Non-goals

These are explicitly out of scope: login, a database, Urdu script and right-to-left layout ([ADR-0004](adr-0004-roman-urdu-only.md)), deployment or hosting ([ADR-0005](adr-0005-local-only.md)), persistence across page reloads, a full-scale production setup, analytics, and multi-turn memory beyond what is shown on the page.

## Notes on interpretation

- **"Structured"** means a fixed reply shape (plan steps plus check-in plus optional escalation), not free prose. A typed output schema enforces it. The details are still to be designed in [ticket-0006](ticket-0006-design-coach-contract.md).
- **"Escalate clearly"** means the escalation must be visually distinct, appear first, and must not depend on the model remembering to add it. The approach is still to be researched in [ticket-0004](ticket-0004-research-safety-escalation.md).
- **Urdu** means Roman Urdu only ([ADR-0004](adr-0004-roman-urdu-only.md)). If a parent types in Urdu script anyway, the coach replies in Roman Urdu; no extra work goes into this case.

## See also

- [Wiki Conventions](conventions.md)
- [Plan](plan.md)
- [Research: Free LLM Providers](research-free-llm-providers.md)
- [Session 2026-11-18 #2: Decisions](session-2026-11-18-02-decisions.md)
- [ticket-0005: Research Roman Urdu Handling](ticket-0005-research-roman-urdu.md)
- [ticket-0010: Bootstrap the Next.js App with Vite+](ticket-0010-bootstrap-app.md)
- [ADR-0011: Layered Safety with Fixed Escalation Messages](adr-0011-layered-safety-escalation.md)
- [ADR-0012: Indian Helplines Only](adr-0012-india-helplines.md)
- [PR #3: Research Safety and Escalation](pr-0003-research-safety-escalation.md)
- [Research: Safety and Escalation](research-safety-escalation.md)
- [PR #6: Research Roman Urdu Handling](pr-0006-research-roman-urdu.md)
- [Research: Roman Urdu Handling](research-roman-urdu.md)
