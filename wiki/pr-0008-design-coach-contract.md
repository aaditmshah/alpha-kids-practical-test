---
title: "PR #8: Design the Coach Contract"
type: pr
updated: 2026-11-18
summary: Designs the coach reply schema, post-checks and display rules (ADR-0015) and the system prompt (ADR-0016), both proposed. Closes ticket-0006.
---

# PR #8: Design the Coach Contract

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #10](session-2026-11-18-10-coach-contract.md) · Ticket: [ticket-0006](ticket-0006-design-coach-contract.md)

## Facts

|             |                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#8](https://github.com/aaditmshah/alpha-kids-practical-test/pull/8) |
| Branch      | `design-coach-contract` → `main`                                                                         |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                       |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                        |
| Reviewed by | Aadit                                                                                                    |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))    |

## Why

The schema and prompt are the contract between the app and the model. The implementation plan ([ticket-0008](ticket-0008-write-implementation-plan.md)) and the TDD build depend on them.

## Commits

| #   | Commit                                        | What                                                                                                                        | Why                                                                                    |
| --- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1   | `📝 Design the coach reply schema and prompt` | [ADR-0015](adr-0015-coach-reply-schema.md), [ADR-0016](adr-0016-system-prompt.md), ticket-0006 done, session #10, this page | The brief's structure, brevity and safety rules have to be pinned down before building |
| 2   | `📝 Record PR #8's review`                    | ADR-0015 and ADR-0016 accepted, log entry (partial)                                                                         | Records the review before merge                                                        |
| 3   | `📝 Finish recording PR #8's review`          | The rest: this review section, the indexes, ticket-0006, Home, session #10                                                  | A script error left commit 2 incomplete                                                |

## Review

Questions for Aadit:

1. Accept ADR-0015 (schema, post-checks, display rules, history)?
2. Accept ADR-0016 (system prompt)?
3. Is the Roman Urdu referral reply wording right?

Aadit's answer:

> "Approved, record it and I'll merge"

- **ADR-0015:** accepted, with no changes ([ADR-0015](adr-0015-coach-reply-schema.md)).
- **ADR-0016:** accepted, with no changes ([ADR-0016](adr-0016-system-prompt.md)).
- **Roman Urdu referral wording:** approved as drafted.

The review was recorded in two commits. A script error left the first one partial, and the second finishes it.

## See also

- [Log](log.md)
