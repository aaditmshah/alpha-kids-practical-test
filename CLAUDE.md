# Alpha Kids Practical Test

A small bilingual (English and Roman Urdu) LLM parenting coach, built as an interview practical test for [Alpha Kids](https://alpha.kids/). The brief is in `wiki/source-practical-test-brief.md`.

## The wiki comes first

`wiki/` is the project's memory and is **submitted with the code**. It records all research, decisions (ADRs), plans, tickets, the Kanban board and a record of every session. **Everything we discuss, decide and do must be recorded there.**

Use the project skills. Prefer them over ad-hoc reading and editing:

| When                                                                                      | Skill                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Starting a session, answering a project question, or before researching something         | **`wiki-query`**. Start at `wiki/index.md`                                                                                                                                        |
| Something was learned, decided, discussed or done, and **always before ending a session** | **`wiki-update`**                                                                                                                                                                 |
| After many edits, before committing or submitting, or when something seems inconsistent   | **`wiki-maintain`** (runs `node .claude/skills/wiki-maintain/scripts/lint.mjs wiki`)                                                                                              |
| Committing anything                                                                       | **`git-commit`**: atomic commits, Unicode gitmoji, imperative subject, body with _what_ in the imperative and _why_ in the indicative (`wiki/adr-0006-gitmoji-atomic-commits.md`) |

Wiki rules (full detail in `wiki/conventions.md`):

- Keep it flat: no subdirectories. Filename prefixes give the type: `source-`, `research-`, `adr-NNNN-`, `ticket-NNNN-`, `session-YYYY-MM-DD-NN-`, `index-`.
- Use relative Markdown links (`[Text](page.md)`), never `[[wikilinks]]`. Links must work in VS Code and on GitHub.
- Every page has frontmatter (`title`, `type`, `status`, `updated`, `summary`) and appears in its category index.
- No secrets or real personal data in the wiki.

## How we work

- **Minimal scope.** Throwaway-sized: implement the brief well, with no extras (`wiki/adr-0002-minimal-scope-tdd.md`).
- **TDD.** Write a failing test first. The LLM is mocked in unit tests; live calls happen only in an opt-in smoke test.
- **$0 LLM cost.** Gemini free tier (`wiki/adr-0003-llm-provider.md`). Never commit API keys.
- **Urdu means Roman Urdu (Latin script) only.** No Urdu script and no right-to-left work (`wiki/adr-0004-roman-urdu-only.md`).
- **Local only.** No deployment; the README explains how to build and run it (`wiki/adr-0005-local-only.md`).
- **Work from tickets.** Pick work from `wiki/kanban.md`, and move tickets as their status changes.
- **Safety is the core requirement.** No diagnosis, no medical or legal instructions, and clear escalation for emergencies, abuse or self-harm.

## Stack and commands

Next.js 16 with the Vite+ toolchain (`wiki/adr-0007-nextjs-with-vite-plus.md`). Next.js builds and
serves the app, and Vite+ provides pnpm, Oxlint, Oxfmt and Vitest.

- **Run the app with `vp run dev`, `vp run build` and `vp run start`.** Never use the built-in
  `vp dev` or `vp build`: they run Vite, not Next.js.
- **Check with `vp check` (format, lint, type check), `vp test` and `vp run wiki:lint`.** On a fresh
  clone, run `vp run typegen` first, because Next's route types live in the gitignored `.next/`.
- Import from `src/` with the `#/*` alias.

## Git workflow

`main` is protected (`wiki/adr-0008-protected-main-linear-history.md`): nobody can push to it
directly. Every change, wiki updates included, goes through a branch and a pull request that must
pass the `ci` check while up to date with `main`. Pull requests merge by rebase only, so history
stays linear. There are no pre-commit checks; run the checks yourself before pushing. Use the
`git-commit` skill for branches, commits and pull requests.

Next.js-specific agent rules live in AGENTS.md, which `next dev` keeps up to date: @AGENTS.md

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Running Scripts

Run TypeScript and JavaScript files with `vpx <file>`, for example `vpx ./scripts/seed.ts --dry-run`. It handles enums, decorators, JSX, and tsconfig `paths`, so do not add `tsx` or `ts-node` to run scripts. `vpx --watch <file>` reruns the file when a file it uses changes, in place of `tsx watch`. `vp node <file>` runs plain Node.js.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
