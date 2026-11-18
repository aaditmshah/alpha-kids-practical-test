---
title: Alpha Kids Practical Test Wiki
type: index
status: active
updated: 2026-11-18
summary: The wiki's home page. Start here to understand the project's state, its history and where to find everything.
---

# Alpha Kids Practical Test Wiki

This wiki records the **whole process** of building a small bilingual (English/Roman Urdu) LLM parenting coach for the [Alpha Kids practical test](source-practical-test-brief.md): research, decisions, plans, the work board, and a record of every working session. It is written for both AI agents and human reviewers. Every link opens another page, as on Wikipedia.

## Current state (2026-11-18)

- **Phase:** research and planning. The Next.js app is scaffolded with Vite+ ([ADR-0007](adr-0007-nextjs-with-vite-plus.md)), but the coach is not built yet. `main` is protected: changes arrive as pull requests that pass CI and are merged by rebase ([ADR-0008](adr-0008-protected-main-linear-history.md)). The work is committed to git, following [ADR-0006](adr-0006-gitmoji-atomic-commits.md), and pushed to the public repository [github.com/aaditmshah/alpha-kids-practical-test](https://github.com/aaditmshah/alpha-kids-practical-test).
- **Decided:** [flat LLM wiki](adr-0001-flat-llm-wiki.md); [minimal scope, built with TDD](adr-0002-minimal-scope-tdd.md); [Gemini free tier](adr-0003-llm-provider.md); [Roman Urdu only](adr-0004-roman-urdu-only.md); [local only, no deployment](adr-0005-local-only.md); [Gitmoji and atomic commits](adr-0006-gitmoji-atomic-commits.md); [Next.js with Vite+](adr-0007-nextjs-with-vite-plus.md); [protected main, linear history](adr-0008-protected-main-linear-history.md).
- **Next:** [safety and escalation research](ticket-0004-research-safety-escalation.md), [Roman Urdu research](ticket-0005-research-roman-urdu.md), then the LLM client choice in [ticket-0007](ticket-0007-choose-stack.md) and the [plan](plan.md).

## Start here

| Page                                | What it is                                            |
| ----------------------------------- | ----------------------------------------------------- |
| [Requirements](requirements.md)     | The brief as numbered, testable requirements (R1–R12) |
| [Plan](plan.md)                     | Phases, approach and milestones                       |
| [Kanban board](kanban.md)           | Work status at a glance                               |
| [Open questions](open-questions.md) | Unresolved decisions and unknowns                     |
| [Log](log.md)                       | Chronological record of every notable event           |
| [Conventions](conventions.md)       | How this wiki is organised and maintained             |

## Category indexes

| Index                           | Contents                              |
| ------------------------------- | ------------------------------------- |
| [Sources](index-sources.md)     | Raw inputs, captured as they were     |
| [Research](index-research.md)   | What we learned, with citations       |
| [Decisions](index-decisions.md) | Architectural decision records (ADRs) |
| [Tickets](index-tickets.md)     | Every unit of work                    |
| [Sessions](index-sessions.md)   | Records of each working conversation  |

## See also

- [ticket-0001: Set Up the LLM Wiki and Its Skills](ticket-0001-set-up-wiki.md)
