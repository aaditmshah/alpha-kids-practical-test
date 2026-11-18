---
title: "PR #2: Document Fast-Forward Merges"
type: pr
updated: 2026-11-18
summary: Corrects the wiki, the git-commit skill and CLAUDE.md, which said PRs merge through GitHub's rebase button. Aadit fast-forwards main locally, so commits keep their hashes and CI results.
---

# PR #2: Document Fast-Forward Merges

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #5](session-2026-11-18-05-fast-forward-merges.md)

## Facts

|             |                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#2](https://github.com/aaditmshah/alpha-kids-practical-test/pull/2) |
| Branch      | `fast-forward-merges` → `main`                                                                           |
| Opened      | 2026-11-18, by Aadit's GitHub account (aaditmshah)                                                       |
| Written by  | Claude Code (Claude Opus 5.5), working with Aadit                                                        |
| Reviewed by | Aadit                                                                                                    |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))    |

## Why

[PR #1](pr-0001-bootstrap-nextjs.md) was merged by a local fast-forward, and its commits kept their hashes. The wiki and the `git-commit` skill had said PRs merge through GitHub's rebase button, which rewrites hashes. They told agents to run `gh pr merge --rebase`. See [session #5](session-2026-11-18-05-fast-forward-merges.md).

## Commits

| #   | Commit                            | What                                                                                                                                                                                 | Why                                                                                            |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| 1   | `📝 Document fast-forward merges` | ADR-0008, the `git-commit` skill, CLAUDE.md, conventions, Home, the PR index, PR #1's page and the website research now describe local fast-forward merges; session #5 and this page | Aadit merges with `git merge --ff-only` to keep hashes and CI results; the wiki said otherwise |

## Review

_(Review comments are recorded here as they arrive.)_

## See also

- [Log](log.md)
