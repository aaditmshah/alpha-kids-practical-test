---
title: "PR #5: Fix the basic-ftp Vulnerability"
type: pr
updated: 2026-11-18
summary: Overrides basic-ftp to 6.2.4 or later (6.2.6) to fix Dependabot alert #2 (GHSA-5pm8-86m8-9m6r), and documents stacked PRs in the git-commit skill. Stacked on PR #4.
---

# PR #5: Fix the basic-ftp Vulnerability

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #7](session-2026-11-18-07-review-and-security.md) · Stacked on: [PR #4](pr-0004-record-pr-3-review.md)

## Facts

|             |                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#5](https://github.com/aaditmshah/alpha-kids-practical-test/pull/5)          |
| Branch      | `security-basic-ftp` → `main`, branched from `record-pr-3-review` ([PR #4](pr-0004-record-pr-3-review.md))        |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                                |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                                 |
| Reviewed by | Aadit                                                                                                             |
| Merge       | Fast-forward of `main` after PR #4, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md)) |

## Why

Dependabot alert #2, [GHSA-5pm8-86m8-9m6r](https://github.com/advisories/GHSA-5pm8-86m8-9m6r), is a medium-severity DoS in `basic-ftp` `<= 6.2.3`: a `__proto__` fact in an MLSD listing crashes `Client.list()`. The copy here (5.3.1) came in as a development-only dependency of `gitmoji-cli`, through `proxy-agent` → `pac-proxy-agent` → `get-uri@6.0.5`, which asks for `basic-ftp@^5.0.2`. The triage is in [session #7](session-2026-11-18-07-review-and-security.md).

## Commits

| #   | Commit                                       | What                                                                                                           | Why                                                                                                                                                                                                                                                        |
| --- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `🔒️ Override basic-ftp to a patched version` | `basic-ftp@<6.2.4: ^6.2.4` in pnpm overrides, so the lockfile resolves 6.2.6; this page and the session record | Fixes the alert now, instead of waiting for gitmoji-cli's chain to reach `get-uri@8.0.2`. Version 6.0's only breaking change, no separate transfer hosts by default, doesn't affect `get-uri`. `vpx gitmoji`, `vp check`, the tests and the build all pass |
| 2   | `📝 Document stacked pull requests`          | A `git-commit` skill step on stacking PRs                                                                      | Aadit: _"you can create stacked PRs. I can merge them quickly."_                                                                                                                                                                                           |

## Review

_(Recorded here before merge.)_

## See also

- [Log](log.md)
