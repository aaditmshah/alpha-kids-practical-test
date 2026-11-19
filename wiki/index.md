---
title: Alpha Kids Practical Test Wiki
type: index
status: active
updated: 2026-11-18
summary: The wiki's home page. Start here to understand the project's state, its history and where to find everything.
---

# Alpha Kids Practical Test Wiki

This wiki records the **whole process** of building a small bilingual (English/Roman Urdu) LLM parenting coach for the [Alpha Kids practical test](source-practical-test-brief.md): research, decisions, plans, the work board, and a record of every working session. It is written for both AI agents and human reviewers. Every link opens another page, as on Wikipedia.

**Who:** Aadit Shah built this as a candidate for a role at [Alpha Kids](research-alpha-kids.md), working with Claude (Claude Code, an AI coding agent). Throughout the wiki, "Aadit" is the person who asks, reviews and decides, and "Claude" is the agent that researches, proposes and implements.

## Current state (2026-11-19)

- **Phase:** submitting ([plan](plan.md)). The coach works end to end: the safety layers, the Gemini model, the Server Action and the chat page from the approved [UI design](design.md). Every Gherkin scenario runs, and the opt-in live smoke test passes on `gemini-3.5-flash-lite`. The last PRs (#18 to #24) are stacked for Aadit to merge. `main` is protected: changes arrive as pull requests that pass CI and are fast-forwarded into `main` ([ADR-0008](adr-0008-protected-main-linear-history.md)). The work is committed to git, following [ADR-0006](adr-0006-gitmoji-atomic-commits.md), and pushed to the public repository [github.com/aaditmshah/alpha-kids-practical-test](https://github.com/aaditmshah/alpha-kids-practical-test).
- **Decided:** [flat LLM wiki](adr-0001-flat-llm-wiki.md); [minimal scope, built with TDD](adr-0002-minimal-scope-tdd.md); [Gemini free tier](adr-0003-llm-provider.md); [Roman Urdu only](adr-0004-roman-urdu-only.md); [local only, no deployment](adr-0005-local-only.md); [Gitmoji and atomic commits](adr-0006-gitmoji-atomic-commits.md); [Next.js with Vite+](adr-0007-nextjs-with-vite-plus.md); [protected main, linear history](adr-0008-protected-main-linear-history.md); [page titles in frontmatter and H1](adr-0009-title-in-frontmatter-and-h1.md); [PR pages without status](adr-0010-pr-pages-without-status.md); [layered safety, fixed escalation](adr-0011-layered-safety-escalation.md); [Indian helplines only](adr-0012-india-helplines.md); [Roman Urdu detection](adr-0013-roman-urdu-detection.md); [Vercel AI SDK](adr-0014-vercel-ai-sdk.md); [coach reply schema](adr-0015-coach-reply-schema.md); [system prompt](adr-0016-system-prompt.md); [executable Gherkin features](adr-0017-bdd-gherkin-features.md); [UI design in Claude Design](adr-0018-ui-design-claude-design.md); [learning exercises](adr-0019-learning-exercises.md); [secrets out of Claude's reach](adr-0020-keep-secrets-from-claude.md).
- **Next:** the [video walkthrough](https://www.loom.com/share/1a78d5e4b4a547e68c894b3afa76bc6f) is recorded. Aadit merges the stack and submits ([submission deliverables](source-submission-deliverables.md)).

## Start here

| Page                                          | What it is                                                                 |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| [Requirements](requirements.md)               | The brief as numbered, testable requirements (R1–R12)                      |
| [Plan](plan.md)                               | Phases, approach and milestones                                            |
| [Kanban board](kanban.md)                     | Work status at a glance                                                    |
| [UI design](design.md)                        | The approved chat UI: screens, HTML and decisions                          |
| [How we used coding agents](coding-agents.md) | The note for the interviewer: who did what, and what kept the agent honest |
| [Video walkthrough script](walkthrough.md)    | The 2-minute demo: one everyday concern, one crisis                        |
| [Open questions](open-questions.md)           | Unresolved decisions and unknowns                                          |
| [Log](log.md)                                 | Chronological record of every notable event                                |
| [Conventions](conventions.md)                 | How this wiki is organised and maintained                                  |

## Category indexes

| Index                                   | Contents                                                   |
| --------------------------------------- | ---------------------------------------------------------- |
| [Sources](index-sources.md)             | Raw inputs, captured as they were                          |
| [Research](index-research.md)           | What we learned, with citations                            |
| [Decisions](index-decisions.md)         | Architectural decision records (ADRs)                      |
| [Tickets](index-tickets.md)             | Every unit of work                                         |
| [Sessions](index-sessions.md)           | Records of each working conversation                       |
| [Pull requests](index-pull-requests.md) | Every pull request: authors, reviewers, commits and review |

## See also

- [ticket-0001: Set Up the LLM Wiki and Its Skills](ticket-0001-set-up-wiki.md)
- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
- [ticket-0004: Research Safety and Escalation](ticket-0004-research-safety-escalation.md)
- [ADR-0011: Layered Safety with Fixed Escalation Messages](adr-0011-layered-safety-escalation.md)
- [ticket-0005: Research Roman Urdu Handling](ticket-0005-research-roman-urdu.md)
- [ADR-0013: Roman Urdu Detection and Reply Language](adr-0013-roman-urdu-detection.md)
- [Research: Roman Urdu Handling](research-roman-urdu.md)
- [ticket-0007: Choose the Stack and Test Tooling](ticket-0007-choose-stack.md)
- [ADR-0014: Call Gemini Through the Vercel AI SDK](adr-0014-vercel-ai-sdk.md)
- [ticket-0006: Design the Coach Reply Schema and Prompt](ticket-0006-design-coach-contract.md)
- [ADR-0015: Coach Reply Schema and Post-Checks](adr-0015-coach-reply-schema.md)
- [ADR-0016: The Coach's System Prompt](adr-0016-system-prompt.md)
- [ticket-0008: Write the Implementation Plan and Build Tickets](ticket-0008-write-implementation-plan.md)
- [PR #10: Add Dependencies and Test Projects](pr-0010-test-and-runtime-setup.md)
- [ticket-0013: Add Dependencies and Test Projects](ticket-0013-test-and-runtime-setup.md)
- [ticket-0024: Write the Gherkin Features](ticket-0024-gherkin-features.md)
- [ticket-0025: Design the UI in Claude Design](ticket-0025-ui-design.md)
- [ticket-0014: Detect the Reply Language](ticket-0014-language-detection.md)
- [ticket-0017: Implement the Reply Schema and Post-Checks](ticket-0017-reply-schema-and-postchecks.md)
- [PR #17: Aadit's Learning Exercises](pr-0017-learning-exercises.md)
- [ticket-0019: Build the Coach Orchestrator](ticket-0019-coach-orchestrator.md)
- [How We Used Coding Agents](coding-agents.md)
- [Source: Submission Deliverables](source-submission-deliverables.md)
- [Video Walkthrough Script](walkthrough.md)
- [ticket-0023: Finish the README and Submit](ticket-0023-readme-and-submission.md)
