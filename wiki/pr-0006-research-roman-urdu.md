---
title: "PR #6: Research Roman Urdu Handling"
type: pr
updated: 2026-11-18
summary: Roman Urdu research (ticket-0005) with draft escalation wording in English and Roman Urdu, ADR-0013 (proposed), and confirmation that one push merges a stack.
---

# PR #6: Research Roman Urdu Handling

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #8](session-2026-11-18-08-roman-urdu-research.md) · Ticket: [ticket-0005](ticket-0005-research-roman-urdu.md)

## Facts

|             |                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#6](https://github.com/aaditmshah/alpha-kids-practical-test/pull/6) |
| Branch      | `research-roman-urdu` → `main`                                                                           |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                       |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                        |
| Reviewed by | Aadit                                                                                                    |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))    |

## Why

R2 and R10 in [Requirements](requirements.md) need the coach to understand and answer in Roman Urdu, and the escalation text from [ADR-0011](adr-0011-layered-safety-escalation.md) needs Roman Urdu wording that Aadit can check.

## Commits

| #   | Commit                                    | What                                                                                                                           | Why                                                                                                                                        |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `📝 Confirm that one push merges a stack` | ADR-0008 and the log record that one push merged PRs #4 and #5                                                                 | The documented behaviour was confirmed in this repository                                                                                  |
| 2   | `📝 Research Roman Urdu handling`         | [Research page](research-roman-urdu.md), [ADR-0013](adr-0013-roman-urdu-detection.md), ticket-0005 done, session #8, this page | Detection, reply language, spelling style, crisis phrases and escalation wording all have to be settled before the reply schema and prompt |

## Review

Questions for Aadit:

1. Is the Roman Urdu escalation wording right and natural? Which lines should change?
2. Accept ADR-0013, or amend it?

Aadit's answer:

> "Sounds good. Supporting Roman Urdu is a complicated feature because it's non-deterministic and fuzzy natural language processing. Especially handling different spellings. This is a difficult problem to solve. Your proposed solution is good. Especially for the practical test. It's like the Tesla demo of its car which can go upside down and land safely. It's a pre-programmed demo, which is all right for this practical test. Approved."

- **Roman Urdu escalation wording:** approved as drafted, with no changes.
- **ADR-0013:** accepted ([ADR-0013](adr-0013-roman-urdu-detection.md)), as a scoped, demo-grade solution: the fixtures define what works, and robust handling of arbitrary spellings is out of scope.

## See also

- [Log](log.md)
