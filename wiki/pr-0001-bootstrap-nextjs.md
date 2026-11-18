---
title: "PR #1: Bootstrap the Next.js App with Vite+"
type: pr
updated: 2026-11-18
summary: Scaffolds Next.js with Vite+, adopts the candidate's website conventions, adds CI and branch protection, and tightens the wiki (markdownlint, TypeScript linter, backlinks, PR tracking). 26 atomic commits; reviewed by the candidate.
---

# PR #1: Bootstrap the Next.js App with Vite+

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #4](session-2026-11-18-04-bootstrap.md) · Tickets: [ticket-0010](ticket-0010-bootstrap-app.md), [ticket-0011](ticket-0011-protect-main.md)

## Facts

|             |                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#1](https://github.com/aaditmshah/alpha-kids-practical-test/pull/1)                                     |
| Branch      | `bootstrap-nextjs` → `main`                                                                                                                  |
| Opened      | 2026-11-18, by the candidate's GitHub account (aaditmshah)                                                                                   |
| Written by  | Claude Code (Claude Opus 5.5), working with the candidate. Commits carry the candidate's git identity and a `Co-Authored-By: Claude` trailer |
| Reviewed by | The candidate (aaditmshah)                                                                                                                   |
| Merge       | Rebase only ([ADR-0008](adr-0008-protected-main-linear-history.md)), after the required `ci` check passes                                    |

## Why

The candidate asked for a Next.js app bootstrapped with [Vite+](https://viteplus.dev/), with the conventions of their website repository, before research on safety and escalation continued. The decisions are in [ADR-0007](adr-0007-nextjs-with-vite-plus.md) (stack) and [ADR-0008](adr-0008-protected-main-linear-history.md) (workflow). The research is in [Bootstrapping Next.js with Vite+](research-vite-plus-nextjs.md) and [Website conventions](research-website-conventions.md).

## Commits

In order. Commit SHAs are left out, because GitHub's rebase merge rewrites them. Find a commit on `main` by its subject.

### Bootstrap

| #   | Commit                                                | What                                                                                                                       | Why                                                                                                           |
| --- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | `🐛 Compare ticket statuses by table cell`            | Wiki linter compares trimmed table cells, not an exact `\| status \|` string                                               | Formatting pads table cells, which made every ticket look out of sync                                         |
| 2   | `🏗️ Scaffold Next.js app with Vite+`                  | `vp create next-app` output, untouched, plus the Vite+ block in CLAUDE.md                                                  | Keeps generated code separate from the customisations that follow                                             |
| 3   | `🎨 Adopt the website's EditorConfig and format`      | `.editorconfig` (tabs, 100 columns) and `vp fmt` over the whole repo                                                       | One file sets the style for editor and formatter. Oxfmt formats Markdown too, so the wiki had to be formatted |
| 4   | `🔧 Adopt the website's lint and format config`       | Short Oxlint config with whole categories as errors, plus the Next.js plugin. Sorted imports, scripts and Tailwind classes | Replaces a 1,249-line rule-by-rule config that was hard to read                                               |
| 5   | `🔧 Tighten TypeScript and use subpath imports`       | Strict compiler options and the `#/*` alias for `src/*`                                                                    | The coach handles untrusted model output; matches the website                                                 |
| 6   | `📌 Pin Node.js and pnpm, and delay new releases`     | `engines`, `devEngines`, a one-week `minimumReleaseAge`, regenerated lockfile                                              | Reviewers get the same runtime; a delay protects against compromised releases                                 |
| 7   | `🔧 Adopt the website's VS Code settings`             | Settings and recommended extensions                                                                                        | Same editor setup as the website                                                                              |
| 8   | `🔨 Add the website's gitmoji commit hook`            | `prepare-commit-msg` hook, `gitmoji-cli`, `githooks:install`, Unicode emoji config                                         | Makes [ADR-0006](adr-0006-gitmoji-atomic-commits.md) messages easy to write by hand                           |
| 9   | `✅ Configure Vitest for unit tests`                  | Test include pattern, Node environment, `passWithNoTests`                                                                  | The runner must be ready before the first TDD cycle, without failing CI                                       |
| 10  | `👷 Run checks in CI on pull requests and main`       | `ci` job: typegen, check, test, wiki lint, build; Dependabot                                                               | Quality is enforced by required checks, not hooks                                                             |
| 11  | `📝 Replace the Next.js README with run instructions` | README for running the app locally                                                                                         | Reviewers run the app locally ([ADR-0005](adr-0005-local-only.md))                                            |
| 12  | `📝 Record the bootstrap in the wiki`                 | Research pages, ADR-0007, ADR-0008, tickets 0010 and 0011, session #4                                                      | Everything is recorded in the wiki                                                                            |
| 13  | `📝 Document the stack and the pull request workflow` | CLAUDE.md commands, and the branch section of the `git-commit` skill                                                       | Direct pushes to `main` are now rejected; `vp dev` and `vp build` are easy mistakes                           |

### Review round 1: markdownlint

| #   | Commit                                                    | What                                                                                   | Why                                                                                                |
| --- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 14  | `🚨 Stop MD025 from flagging every wiki page title`       | MD025 told to ignore the frontmatter title; linter requires exactly one H1 matching it | The candidate saw a warning on every page; see [ADR-0009](adr-0009-title-in-frontmatter-and-h1.md) |
| 15  | `🚨 Fix markdownlint findings in docs and the wiki`       | Bare URLs, a fence language, a fence blank line, emphasis used as a heading            | Genuine issues flagged in the editor                                                               |
| 16  | `🔧 Turn off markdownlint rules that fight the formatter` | MD010 and MD013 off                                                                    | Oxfmt and `.editorconfig` own tabs and line length                                                 |
| 17  | `🔧 Keep trailing commas out of JSONC files`              | Oxfmt override for `*.jsonc`                                                           | The JSONC spec doesn't guarantee trailing commas parse                                             |
| 18  | `🚨 Give AGENTS.md a top-level heading`                   | H1 above Next's managed block                                                          | MD041; `next dev` only rewrites inside its markers                                                 |

### Review round 2: gitmoji list and TypeScript linter

| #   | Commit                                               | What                                                                  | Why                                                               |
| --- | ---------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 19  | `📝 List gitmojis from the CLI instead of a table`   | `vpx gitmoji list` and `vpx gitmoji search` in the `git-commit` skill | A copied table could only drift from the CLI                      |
| 20  | `🐛 Let Oxlint report unused code, not the compiler` | Drop `noUnusedLocals` and `noUnusedParameters`                        | `next build` failed after any `next dev` run, on a generated file |
| 21  | `♻️ Convert the wiki linter to TypeScript`           | `lint.ts`, run by plain `node`; `.claude/**/*.ts` added to tsconfig   | Same type checking as the rest of the project                     |
| 22  | `📝 Record the PR review changes in the wiki`        | Session, research pages and log                                       | Everything is recorded in the wiki                                |

### Review round 3: backlinks and PR tracking

| #   | Commit                                      | What                                                                                          | Why                                       |
| --- | ------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 23  | `✨ Require a backlink for every wiki link` | Linter rule, `--fix` mode, "See also" sections, "Back to:" lines pointing at category indexes | VS Code's preview has no back button      |
| 24  | `✨ Track pull requests in the wiki`        | `pr-` page type, this page, the PR index                                                      | PR descriptions don't give enough context |

### Review round 4: PR pages without status, checked in CI

| #   | Commit                                           | What                                                                                                       | Why                                                                               |
| --- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 25  | `👷 Check in CI that every PR has its wiki page` | Tested script comparing the PR's number and branch with `wiki/pr-NNNN-<branch>.md`; a step in the `ci` job | A PR without its page can't merge                                                 |
| 26  | `🔥 Drop the status from PR wiki pages`          | No `status` on PR pages; the linter rejects one; [ADR-0010](adr-0010-pr-pages-without-status.md)           | A status would be stale after every merge; the GitHub link is the source of truth |

## Review

The candidate reviewed the PR in four rounds:

1. **markdownlint.** _"MD025/single-title/single-h1"_ on every wiki page. Four options were compared, and the candidate chose to keep both the title and the H1 ([ADR-0009](adr-0009-title-in-frontmatter-and-h1.md)). Then the rest of markdownlint's findings, and two nits: a trailing comma in JSONC, and MD041 in `AGENTS.md`. Commits 14–18.
2. **Hardcoded gitmoji table; lint script in JavaScript.** Replaced with the CLI, and converted to TypeScript. The conversion exposed a build failure after `next dev`, which had come in with commit 5. Commits 19–22.
3. **Backlinks and PR tracking.** _"Let's ensure that all page hyperlinks have backreferences"_, and _"Let's also track PRs in the wiki … Reading the PR description doesn't give me enough context."_ Commits 23–24.
4. **PR page status and a CI check.** _"It's not practical to have to update outdated information in a separate PR. That's an infinite regress."_ The page check was first built against PR titles, then rewritten after the candidate clarified that they meant branch names. Commits 25–26.

Also recorded: the agent once committed a staged `git mv` into the wrong commit. It rebuilt both commits before pushing, so the history never contained the mistake.

The full discussion is in [session #4](session-2026-11-18-04-bootstrap.md).

## See also

- [Wiki Conventions](conventions.md)
- [Log](log.md)
- [ticket-0012: Wiki Backlinks and Pull Request Tracking](ticket-0012-backlinks-and-pr-tracking.md)
