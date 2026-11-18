---
title: "Session 2026-11-18 #4: Bootstrap the App"
type: session
status: active
updated: 2026-11-18
summary: Bootstrapped Next.js with Vite+, copied the candidate's website conventions, added CI, protected main with rebase-only merging, and opened PR #1.
---

# Session 2026-11-18 #4: Bootstrap the App

Back to: [Sessions](index-sessions.md) · Previous: [Session #3](session-2026-11-18-03-commit-conventions.md)

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

## Follow-up: markdownlint MD025

While reviewing PR #1, the candidate reported a markdownlint warning on every wiki page: _"MD025/single-title/single-h1: Multiple top-level headings in the same document"_. The cause is the frontmatter `title` plus the page's H1. The candidate listed the options (use an H2, remove the H1, remove `title`, or something else), with the constraint that humans must see the title clearly and prominently.

The agent compared the options and recommended keeping both. That means configuring MD025's `front_matter_title` to `""` and adding a linter check that the H1 matches `title`. The candidate agreed: _"Go with option 4 and add it to PR #1."_ → [ADR-0009](adr-0009-title-in-frontmatter-and-h1.md)

Running markdownlint over the whole repository then showed 339 findings from other rules. Most were MD013 (line length, 80 by default) and MD010 (hard tabs), and both contradict the formatter. The candidate approved turning those two off and fixing the genuine findings: bare URLs, emphasis used as a heading, a fenced code block missing its language, and a fenced code block missing its blank lines. One of those fixes wraps a bare URL in `<…>` on an existing [log](log.md) line. The text is unchanged; only the Markdown syntax changed. Generated agent files were left as they are. See [ADR-0009](adr-0009-title-in-frontmatter-and-h1.md).

The candidate then pointed out two nits. First, `.markdownlint.jsonc` had a trailing comma, which the formatter had added and which the JSONC spec doesn't guarantee is allowed. Fixed with an Oxfmt override for `*.jsonc`. Second, `AGENTS.md` started with an H2 (MD041). Fixed with an H1 above Next's managed block, after checking that `next dev` keeps content outside its markers. markdownlint now reports no issues in the repository.

## PR review comments

While reviewing PR #1, the candidate asked for two more changes:

1. _"The choosing a gitmoji section contains a hardcoded list of gitmojis. We can get this list by running the command `vpx gitmoji list`."_ The table in the [`git-commit` skill](../.claude/skills/git-commit/SKILL.md) was replaced with `vpx gitmoji list` and `vpx gitmoji search <word>`.
2. _"May we convert [the wiki-maintain lint script] to TypeScript?"_ Converted to `lint.ts`, typed under the strict tsconfig and run with plain `node`, which strips the types. A copy of the wiki seeded with seven kinds of error confirmed it still catches all of them.

The conversion turned up two problems, both now fixed and listed in [Research: Vite+ and Next.js](research-vite-plus-nextjs.md):

- **The checker skipped `.claude/`.** TypeScript's include globs skip dot-directories, so `.claude/**/*.ts` was added to `include`.
- **`next build` failed after a `next dev` run.** That bug came in with the strict tsconfig commit: the generated `.next/dev/types/validator.ts` broke the build under `noUnusedLocals` and `noUnusedParameters`. Both options were dropped, and Oxlint's `no-unused-vars` now reports unused code.

The agent also made and caught a mistake of its own. A staged `git mv` slipped into the bug-fix commit, so the two commits were rebuilt before pushing.

## Final review: backlinks

After approving PR #1, the candidate asked for backlinks: _"Let's ensure that all page hyperlinks have backreferences … otherwise I have no way to go back to the previous page when exploring the wiki in VS Code which doesn't have a "back" button … For all the other backlinks we can add a "See also" section like we have on wikipedia. We should also add a lint rule."_

What changed:

- **New linter rule:** every link from page A to page B needs a link from B back to A. A new `--fix` mode adds missing backlinks to a `## See also` section.
- **"Back to:" lines** on leaf pages now point at their category index instead of Home, unless Home links to the page directly. Otherwise Home would have needed a See also entry for almost every page.
- **The log** keeps its See also section above a new `## Entries` heading, so entries are still appended at the bottom.
- **The fixer added 111 backlinks across 36 pages.**
- **Frozen pages:** the [Conventions](conventions.md) now allow navigation changes on source pages and the log, but never content changes.

## Open at end of session

- PR #1 is waiting for CI and for the candidate's review and merge (rebase).
- Still open: Q3 (helpline regions) and Q6 (Gemini quota). The LLM client library is still to be chosen in [ticket-0007](ticket-0007-choose-stack.md).
- Next: [ticket-0004](ticket-0004-research-safety-escalation.md), safety and escalation research.
