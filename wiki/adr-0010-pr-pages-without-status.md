---
title: "ADR-0010: PR Pages Have No Status, and CI Requires One per PR"
type: adr
status: accepted
updated: 2026-11-18
summary: Pull request wiki pages carry no status, since GitHub is the source of truth. CI requires every PR to have a page named pr-NNNN-<branch>.md matching its number and head branch.
---

# ADR-0010: PR Pages Have No Status, and CI Requires One per PR

Back to: [Decisions](index-decisions.md) · Pages: [Pull requests](index-pull-requests.md) · Session: [2026-11-18 #4](session-2026-11-18-04-bootstrap.md)

## Context

PR pages were introduced with a status (`open`, `merged`, `closed`). Since `main` is protected ([ADR-0008](adr-0008-protected-main-linear-history.md)), a page could only be marked `merged` by the next pull request. Aadit: _"It's not practical to have to update outdated information in a separate PR. That's an infinite regress. The last PR that's merged will always be out of date. Instead, we can find the status of the PR by simply following the link to the PR."_

Aadit also asked for _"a GitHub workflow check to ensure that every PR has a corresponding wiki page and that the PR numbers and [branch names] match."_

## Options considered

1. **Keep the status, and update it in the next PR.** Always stale for the latest PR, and every PR does chores for the one before it.
2. **No status; GitHub is the source of truth.**

For the check:

- (a) an agent's or reviewer's memory
- (b) a CI step that compares the PR's number and head branch with the wiki's file names

## Decision

**Option 2 and (b).**

- PR pages have no `status`. The wiki linter rejects one, and the [PR index](index-pull-requests.md) has no status column.
- `scripts/check-pr-wiki-page.ts` (`vp run pr:wiki-page`) runs in the required `ci` job on every pull request. It fails unless `wiki/pr-<number, 4 digits>-<head branch>.md` exists and no other page claims that PR number. The logic in `scripts/pr-wiki-page.ts` is unit-tested.
- The PR number and branch reach the script through environment variables, so a branch name can't inject shell commands into the workflow.

## Consequences

- A PR page is only edited while its own PR is open, and nothing goes stale after a merge.
- The page is written before the PR exists, so its number has to be guessed. Issues and pull requests share one number sequence, so the next number is the highest so far plus one. Aadit pointed this out: _"we can guess the PR number. We don't have to wait."_ If something else takes the number first, CI fails until the page is renamed. The [`git-commit` skill](../.claude/skills/git-commit/SKILL.md) gives the command.
- Branch names must be valid wiki file names (lowercase kebab-case), which the `git-commit` skill already requires.

## See also

- [Wiki Conventions](conventions.md)
- [Log](log.md)
- [PR #1: Bootstrap the Next.js App with Vite+](pr-0001-bootstrap-nextjs.md)
- [ticket-0012: Wiki Backlinks and Pull Request Tracking](ticket-0012-backlinks-and-pr-tracking.md)
- [Alpha Kids Practical Test Wiki](index.md)
