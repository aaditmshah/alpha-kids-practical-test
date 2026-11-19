---
title: "PR #25: Override minimatch"
type: pr
updated: 2026-11-19
summary: A pnpm override that lifts minimatch to 11.0.8, closing Dependabot alert #5 (GHSA-g3hv-75wg-m249), a denial of service reached only through a test dependency. Stacked on PR #24.
---

# PR #25: Override minimatch

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-19 #3](session-2026-11-19-03-submission-notes.md)

## Facts

|             |                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| GitHub      | [aaditmshah/alpha-kids-practical-test#25](https://github.com/aaditmshah/alpha-kids-practical-test/pull/25)         |
| Branch      | `minimatch-override` → `submission-notes` (stacked on [PR #24](pr-0024-submission-notes.md))                       |
| Opened      | 2026-11-19, by Aadit's GitHub account (aaditmshah)                                                                 |
| Written by  | Claude Code (Claude Opus 5.5)                                                                                      |
| Reviewed by | Aadit                                                                                                              |
| Merge       | Fast-forward of `main` after PR #24, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

Dependabot alert #5, [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249): minimatch from 7.0.0 up to, but not including, 11.0.1 can be made to expand a glob pattern exponentially, a denial of service. Aadit asked to fix it before submitting, so the repository is clean.

- **Exposure:** low. The only copy, 10.2.6, came through the Gherkin runner: `@amiceli/vitest-cucumber` → `ts-morph` → `@ts-morph/common`, a dev dependency that only matches our own feature-file paths. Nothing in the app uses it.
- **Fix:** a pnpm override, `minimatch@>=7 <11.0.1: ^11.0.1`, like the earlier `basic-ftp` one. It resolved to 11.0.8, which is older than the repository's 7-day minimum release age. `@ts-morph/common` asks for minimatch 10, but it only calls `minimatch(path, pattern)`, which 11 still exports. The new version brings one small package by the same author, `@isaacs/nonrecursive-glob-match`.
- **Checked:** formatting, lint, types, all 298 tests (including the Gherkin specs, which load features through the runner) and the build pass.
- **Remove it** once `@ts-morph/common` asks for minimatch 11.0.1 or later.

## Commits

| #   | Commit                                    | What                                                       | Why                               |
| --- | ----------------------------------------- | ---------------------------------------------------------- | --------------------------------- |
| 1   | `🔒️ Override minimatch to fix a glob DoS` | The override, the lockfile, this page, the session and log | Dependabot alert #5               |
| 2   | `📝 Record PR #25's review`               | Aadit's approval                                           | Reviews are recorded before merge |

## Review

Aadit asked for this fix (_"Yes, let's fix the dependabot alert too."_) after approving the rest of the stack. He approved it: _"Everything looks good."_ No changes requested.

## See also

- [Log](log.md)
