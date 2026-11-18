---
title: "Session 2026-11-18 #4: Bootstrap the App"
type: session
status: active
updated: 2026-11-18
summary: Bootstrapped Next.js with Vite+, copied the candidate's website conventions, added CI, protected main with rebase-only merging, and opened PR #1.
---

# Session 2026-11-18 #4: Bootstrap the App

Back to: [Home](index.md) · [Sessions](index-sessions.md) · Previous: [Session #3](session-2026-11-18-03-commit-conventions.md)

## Requests

1. Commit and push the wiki record of the push. Done as `📝 Record the push to GitHub in the wiki`, pushed directly to `main` before protection existed.
2. _"Before we work on researching safety and escalation, we should bootstrap a simple Next.js application. I like use Vite+ … Research how to bootstrap everything."_ Later: _"Also research for online documentation on bootstrapping Next.js with Vite+."_
3. Copy the candidate's website conventions from [kybernetic-systems/kybernetic.systems](https://github.com/kybernetic-systems/kybernetic.systems): _"my editor config, gitmoji-cli setup, githooks installation script, vscode extensions and settings, and anything else that you think I might want."_
4. Update the wiki afterwards, and ask for clarification when needed.

## Research and trial

- See [Research: Bootstrapping Next.js with Vite+](research-vite-plus-nextjs.md).
- The first trial install looked stuck. The agent first misdiagnosed it as hung, then found it was a slow download, made worse by the scratchpad being on a different filesystem from the pnpm store. The trial was rerun on the same filesystem.
- See [Research: Website conventions](research-website-conventions.md).

## Questions asked, and answers

| Question                                                                               | Answer                                                                                                                                  |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Git hooks: the website's `.githooks`, Vite+'s `.vite-hooks` with `vp staged`, or both? | The website's `.githooks` only. _"Don't use `vp staged`."_ Quality is enforced by a protected main and required checks                  |
| CI?                                                                                    | Yes, on pushes and PRs. Also copy the website's branch protection, enforce linear history, and disable merge commits and squash merging |
| Lint config: the migrated 1,249 lines, or the website's short style?                   | The website's style                                                                                                                     |

## Decisions

- [ADR-0007](adr-0007-nextjs-with-vite-plus.md): Next.js with the Vite+ toolchain
- [ADR-0008](adr-0008-protected-main-linear-history.md): protected main, linear history, checks in CI only

## Work done

- On branch `bootstrap-nextjs`, as atomic commits, in [PR #1](https://github.com/aaditmshah/alpha-kids-practical-test/pull/1):
  - fixed the wiki linter's status comparison
  - committed the untouched scaffold
  - adopted EditorConfig and formatted the repo
  - adopted the lint and format config
  - tightened TypeScript and added subpath imports
  - pinned Node.js and pnpm, with a release-age delay
  - adopted the VS Code settings
  - added the gitmoji hook
  - configured Vitest
  - added CI
  - wrote the README
  - recorded all of this in the wiki
- Applied the repository merge settings and branch protection on GitHub ([ticket-0011](ticket-0011-protect-main.md)).

## Open at end of session

- PR #1 is waiting for CI and for the candidate's review and merge (rebase).
- Still open: Q3 (helpline regions) and Q6 (Gemini quota). The LLM client library is still to be chosen in [ticket-0007](ticket-0007-choose-stack.md).
- Next: [ticket-0004](ticket-0004-research-safety-escalation.md), safety and escalation research.
