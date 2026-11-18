---
title: "ADR-0019: Leave Learning Exercises for Aadit"
type: adr
status: accepted
updated: 2026-11-18
summary: Two self-contained pieces are left for Aadit to build test-first, as typed stubs that throw. They are detectLanguage (ticket-0014) and the dose and diagnosis post-checks (part of ticket-0017). Claude builds everything that doesn't depend on them, and the stack pauses before the orchestrator (ticket-0019), which needs both.
---

# ADR-0019: Leave Learning Exercises for Aadit

Back to: [Decisions](index-decisions.md) · Session: [2026-11-18 #12](session-2026-11-18-12-build-setup.md) · Plan: [Plan](plan.md)

## Context

Aadit: _"You can go ahead and create a PR stack. I'll review them and merge them all once you're done. Also, while implementing the code, please leave some parts of the code for me to implement. I'd like to learn."_

## Options considered

1. **Skipped tests (`describe.skip`) Claude writes, with the code left to Aadit.** He would learn less, since writing the tests is half of TDD.
2. **Typed stubs that throw, plus the test cases listed in the ticket.** Aadit writes both the tests and the code. Later code compiles against the stub's signature.
3. **Leave whole tickets.** That would stall the stack.

## Decision

**Option 2,** for two self-contained pieces that carry real logic:

| Exercise                                        | Stub                     | Test cases                                                                                               | Why it's a good exercise                                          |
| ----------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `detectLanguage(text)`                          | `src/coach/language.ts`  | [ticket-0014](ticket-0014-language-detection.md) and [Research: Roman Urdu](research-roman-urdu.md)      | A heuristic tuned test by test, with the Roman Urdu Aadit reads   |
| `postcheck(reply)`: dose and diagnosis patterns | `src/coach/postcheck.ts` | [ticket-0017](ticket-0017-reply-schema-and-postchecks.md) and [ADR-0015](adr-0015-coach-reply-schema.md) | Regular expressions with false positives and negatives to balance |

- **Each stub** has the final signature and a doc comment, and throws `Error("Not implemented yet: Aadit's exercise (ADR-0019)")`.
- **Claude builds everything that doesn't call them:** `normalize` (moved from ticket-0014 to [ticket-0015](ticket-0015-safety-precheck.md)), the pre-check, the fixed messages, the reply schema and the model adapter.
- **The stack stops before [ticket-0019](ticket-0019-coach-orchestrator.md),** whose orchestrator calls both functions. Aadit's exercises unblock it.

## Consequences

- CI stays green: nothing calls a stub until the orchestrator exists.
- Aadit's PRs follow the same workflow and conventions: a branch, atomic gitmoji commits, a PR page and a recorded review. Claude reviews them if he asks.
- Each exercise ticket says who builds which part.

## See also

- [Log](log.md)
- [PR #11: Write the Gherkin Features](pr-0011-gherkin-features.md)
- [PR #12: Add the Keyword Safety Pre-Check](pr-0012-safety-precheck.md)
