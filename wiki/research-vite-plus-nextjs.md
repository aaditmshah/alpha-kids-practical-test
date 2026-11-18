---
title: "Research: Bootstrapping Next.js with Vite+"
type: research
status: active
updated: 2026-11-18
summary: Vite+ (vp) can scaffold Next.js through create-next-app and then takes over the toolchain (pnpm, Oxlint, Oxfmt, Vitest), but Next still builds and serves with Turbopack. Covers the trial run, what the migration does, and the problems hit.
---

# Research: Bootstrapping Next.js with Vite+

Back to: [Research](index-research.md) · Decision: [ADR-0007](adr-0007-nextjs-with-vite-plus.md) · Ticket: [ticket-0010](ticket-0010-bootstrap-app.md)

Accessed 2026-11-18, with Vite+ 1.4.0, create-next-app 16.4.6 and Node.js 26.13.0.

## What Vite+ is

[Vite+](https://viteplus.dev/) is a single CLI, `vp`, that bundles Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt and Vite Task. It also manages the Node.js runtime and the package manager. Its main commands:

- `vp create`: scaffold a project
- `vp install`, `vp add`: manage dependencies
- `vp check`: format, lint and type-check together
- `vp test`: run tests
- `vp run <script>`: run a package.json script

## Next.js support

- **[`vp create`](https://viteplus.dev/guide/create)** lists `next-app` as a shorthand for `create-next-app`. After a third-party template runs, _"`vp create` migrates the project to Vite+"_.
- **Next.js is not built on Vite.** The migration hands over the _toolchain_: pnpm, linting (ESLint becomes Oxlint), formatting (Oxfmt) and tests (Vitest). `next dev`, `next build` and `next start` still use Turbopack.
- **There is no official guide for Next.js with Vite+.** The [Vite+ beta announcement](https://voidzero.dev/posts/announcing-vite-plus-beta) (2026-07-02) calls Vite+ framework-agnostic, but says nothing specific about Next.js.
- **The only option that runs Next.js on Vite itself is [vinext](https://cdn.jsdelivr.net/gh/cloudflare/vinext@main/README.md),** a Cloudflare project that is still experimental. Rejected in [ADR-0007](adr-0007-nextjs-with-vite-plus.md).
- **Third-party write-ups are thin.** One reviewer found `vp create next-app` "wasn't quite working" ([DEV Community](https://dev.to/erikch/i-tried-vite-and-replaced-my-entire-frontend-toolchain-4cgb)). Our trial, below, worked.

## Trial run

Command used, in a temporary directory:

```bash
vp create next-app --no-interactive --package-manager pnpm --no-git --no-hooks \
	--agent claude --editor vscode -- <name> --ts --app --tailwind --eslint \
	--react-compiler --src-dir --import-alias "#/*" --use-pnpm --disable-git --yes \
	--no-agent-feedback
```

What it produced:

- **The Next.js 16.4.6 starter**, with the React Compiler, `cacheComponents` and `partialPrefetching` turned on.
- **Agent files:** `AGENTS.md`, which holds Next's agent rules and is rewritten by `next dev`, and `CLAUDE.md`, which holds Vite+'s agent block.
- **VS Code files:** `.vscode/settings.json` and `extensions.json`.
- **ESLint migrated to Oxlint:** 6 rules were skipped as unsupported. All the rules were written out one by one into a **1,249-line `vite.config.ts`**. We replaced it; see [ADR-0007](adr-0007-nextjs-with-vite-plus.md).
- **`vp check` passes and `next build` succeeds.** `vp test` failed only because there were no tests yet.

## Problems hit, and fixes

| Problem                                                                     | Cause                                                                                                                                                                             | Fix                                                                                             |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| The first install seemed to hang                                            | Downloads of about 100–150 KB/s (Next.js is 44 MB, its compiler binary 35 MB), plus `/tmp` sitting on a different filesystem from the pnpm store, which forces a full re-download | Scaffold on the same filesystem as the store. It wasn't hung, just slow                         |
| `vp check` reformatted the wiki                                             | Oxfmt also formats Markdown                                                                                                                                                       | Format the whole repo once. The changes are whitespace and table alignment only                 |
| The wiki linter reported every ticket out of sync                           | It matched `\| status \|` exactly, and the formatter pads table cells                                                                                                             | Compare trimmed cells instead                                                                   |
| `Cannot find name 'LayoutProps'` on a clean checkout                        | Next generates route types into the gitignored `.next/` folder                                                                                                                    | Run `vp run typegen` (`next typegen`) before `vp check`, in CI too                              |
| `next build` rewrote `tsconfig.json`                                        | Next adds `allowJs` and reindents the file                                                                                                                                        | Keep `allowJs` and reformat. Later builds leave the file alone                                  |
| `ERR_PNPM_NO_MATURE_MATCHING_VERSION`                                       | The one-week `minimumReleaseAge` rejected two transitive dependencies of `@vitest/browser` that were too new                                                                      | Regenerate the lockfile under the policy, which picks the mature predecessors                   |
| `vp test` fails with no tests                                               | This is Vitest's default behaviour                                                                                                                                                | Set `passWithNoTests: true` until the first TDD cycle                                           |
| `next build` fails on `.next/dev/types/validator.ts` after a `next dev` run | Next generates that file with unused imports, and the strict `noUnusedLocals` and `noUnusedParameters` options reject it                                                          | Drop both options. Oxlint's `no-unused-vars` reports unused code as errors and ignores `.next/` |
| The type checker can't find Node's types in `.claude/**/*.ts`               | TypeScript's `**/*` include globs skip dot-directories, so the file is checked as a standalone script                                                                             | Add `.claude/**/*.ts` to `include`, as the website does for `.storybook`                        |

## Commands to remember

- **Use `vp run dev`, `vp run build` and `vp run start`.** The built-in `vp dev` and `vp build` run Vite, not Next.js.
- **Checks:** `vp check` (format, lint and type check), `vp test`, and `vp run wiki:lint`.

## See also

- [Log](log.md)
- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
