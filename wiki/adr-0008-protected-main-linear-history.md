---
title: "ADR-0008: Protected Main, Linear History, Quality Checks in CI Only"
type: adr
status: accepted
updated: 2026-11-18
summary: All changes reach main through pull requests that must pass the `ci` check, with the branch up to date. Aadit merges by fast-forwarding main locally, so commits keep their hashes and check statuses and history stays linear. There are no pre-commit checks, only the gitmoji picker hook.
---

# ADR-0008: Protected Main, Linear History, Quality Checks in CI Only

Back to: [Home](index.md) · [Decisions](index-decisions.md) · Session: [2026-11-18 #4](session-2026-11-18-04-bootstrap.md)

## Context

Aadit: _"I don't believe in running lint and other checks in the staging area on commit … I believe in enforcing code quality by protecting the main branch and enforcing GitHub checks to pass before being able to merge into main."_ They also said: _"I want to enforce linear commits. I'm a fast-forward and rebase guy … Let's disable merge commits and squash merging for PRs."_ They asked for CI on pushes and PRs, and for a branch protection rule like the one on their website.

## Options considered

1. **Pre-commit checks** (Vite+'s `vp staged`). Rejected by Aadit.
2. **CI plus branch protection,** copied from Aadit's website.

## Decision

**Option 2.** Applied on GitHub on 2026-11-18.

**Workflow:** `.github/workflows/ci.yml` has one job, `ci`. It runs on pull requests and on pushes to `main`. Steps:

- `vp install`
- `vp run typegen`
- `vp check`
- `vp test --run`
- `vp run wiki:lint`
- `vp run build`

**Branch protection on `main`:**

- the `ci` check is required, and the branch must be up to date
- changes must come through a pull request, with 0 approvals required
- the rules apply to admins too
- history must be linear
- force pushes and deletion are blocked

**Repository merge settings:**

- rebase merging only (merge commits and squash merging are off)
- merged branches are deleted automatically
- the "update branch" button is allowed

**Merging is a local fast-forward.** Aadit: _"When merging, I always use fast-forward merges because why unnecessarily create new commits which are exactly the same as the previous commits? This way, the git commits also retain their status checks."_ GitHub's merge button offers only merge commits, squash or rebase, and its rebase always creates new commits. So Aadit merges from the command line:

```bash
git switch main && git pull --ff-only
git merge --ff-only <branch>
git push
```

GitHub accepts the push to protected `main` because those exact commits passed the PR's required checks, and it marks the PR as merged. If `main` has moved, the branch is first rebased onto it (_"I use rebase when the base is out of date"_). Rebase merging stays enabled only as the least-bad option the GitHub UI offers.

**Hooks:** only `.githooks/prepare-commit-msg`, which opens the gitmoji picker. Install it with `vp run githooks:install`.

## Consequences

- Nobody, admins included, can push straight to `main`. Every change, wiki updates too, goes through a branch and a pull request.
- Fast-forward merging keeps every atomic commit ([ADR-0006](adr-0006-gitmoji-atomic-commits.md)) on `main` exactly as written, with the same hashes and the CI results attached to them.
- Requiring an up-to-date branch means rebasing onto `main` before merging, which suits Aadit's workflow.
- The [`git-commit` skill](../.claude/skills/git-commit/SKILL.md) and the root CLAUDE.md describe the branch and pull request workflow.

## See also

- [Log](log.md)
- [Research: Aadit's Website Conventions](research-website-conventions.md)
- [ticket-0011: Protect Main and Enforce Linear History](ticket-0011-protect-main.md)
- [Index: Pull Requests](index-pull-requests.md)
- [PR #1: Bootstrap the Next.js App with Vite+](pr-0001-bootstrap-nextjs.md)
- [ADR-0010: PR Pages Have No Status, and CI Requires One per PR](adr-0010-pr-pages-without-status.md)
- [PR #2: Document Fast-Forward Merges](pr-0002-fast-forward-merges.md)
- [Session 2026-11-18 #5: Fast-Forward Merges](session-2026-11-18-05-fast-forward-merges.md)
- [PR #3: Research Safety and Escalation](pr-0003-research-safety-escalation.md)
- [PR #4: Record PR #3's Review](pr-0004-record-pr-3-review.md)
