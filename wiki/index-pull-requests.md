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

| PR                                                                             | Summary                                                                                                              |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| [PR #1: Bootstrap the Next.js app with Vite+](pr-0001-bootstrap-nextjs.md)     | Next.js scaffolded with Vite+; website conventions; CI; markdownlint; TypeScript wiki linter; backlinks; PR tracking |
| [PR #2: Document fast-forward merges](pr-0002-fast-forward-merges.md)          | Corrects the docs: PRs are fast-forwarded into `main` locally, not rebase-merged on GitHub                           |
| [PR #3: Research safety and escalation](pr-0003-research-safety-escalation.md) | Safety and escalation research, ADR-0011 (layered detection) and ADR-0012 (Indian helplines)                         |
| [PR #4: Record PR #3's review](pr-0004-record-pr-3-review.md)                  | ADR-0011 accepted; reviews are recorded before merge from now on                                                     |
| [PR #5: Fix the basic-ftp vulnerability](pr-0005-security-basic-ftp.md)        | Overrides basic-ftp to a patched version (Dependabot alert #2); documents stacked PRs. Stacked on PR #4              |
| [PR #6: Research Roman Urdu handling](pr-0006-research-roman-urdu.md)          | Roman Urdu research and ADR-0013 (proposed); confirms one-push stack merges                                          |
| [PR #7: Choose the LLM client](pr-0007-choose-llm-client.md)                   | LLM client research and ADR-0014 (proposed)                                                                          |
| [PR #8: Design the coach contract](pr-0008-design-coach-contract.md)           | Reply schema and post-checks (ADR-0015) and system prompt (ADR-0016), both proposed                                  |

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
