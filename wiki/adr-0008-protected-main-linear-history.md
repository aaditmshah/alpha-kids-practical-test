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

**PRs that all target `main` merge with one push.** GitHub marks a PR as merged once its head commit is reachable from the base branch, however it got there. Its docs call these indirect merges: a PR _"can be marked as merged if its head branch commits become reachable from the base branch outside that pull request … pushed directly to the default branch"_ ([GitHub docs](https://docs.github.com/en/pull-requests/reference/pull-request-merges)). The Enterprise docs give the stacked case as an example: _"Merging feature_2 into main and pushing main to the server from the command line will mark both pull requests as merged"_ ([GitHub Enterprise Server docs](https://docs.github.com/en/enterprise-server@3.18/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges)). So fast-forwarding `main` to the top of a stack and pushing once merges the whole stack. Confirmed on 2026-11-18: one push of `main` to the top of the stack marked [PR #4](pr-0004-record-pr-3-review.md) and [PR #5](pr-0005-security-basic-ftp.md) merged at the same second, and protected `main` accepted the push. Two cautions:

**Correction (2026-11-18): stacked PRs target the branch below them, not `main`.** Aadit, reviewing the first real stack ([PR #10](pr-0010-test-and-runtime-setup.md) to [PR #15](pr-0015-model-adapter.md)): _"All your PRs had the base branch set to main, which is incorrect. For stacked PRs, the base branch should be the head of the previous PR branch."_ He retargeted them himself. With the right bases, each PR's diff shows only its own commits.

This changes how a stack is merged. **Confirmed on the PR #10–#15 merge (2026-11-18):** with stacked bases, one push to the top of the stack is **rejected**, because protected `main` won't accept commits whose PR targets another branch. Aadit merged the stack one PR at a time, from the bottom up:

```bash
git switch main
git reset --hard test-and-runtime-setup && git push   # PR #10 merged; GitHub retargets #11 to main
git reset --hard gherkin-features && git push         # PR #11 merged; #12 retargeted
# … and so on, up to the top of the stack (model-adapter, PR #15)
git fetch --all --tags --prune
git branch --delete --force <each merged branch>
```

Each push merged exactly one PR, then GitHub deleted its branch and retargeted the next PR to `main`, so the next fast-forward was accepted. The six merges landed between 17:09:37 and 17:11:49. `git merge --ff-only <branch>` works the same as `git reset --hard <branch>` here, since `main` is always an ancestor. The earlier one-push merge (PRs #4 and #5) worked only because both of those PRs targeted `main`.

- GitHub marks the lower PRs merged _"even if branch protection rules on that pull request"_ haven't been met. Each PR's own CI and recorded review must be checked before the push.
- GitHub's native stacked PRs (a public preview) merge a whole stack from the UI, but only by merge commit, squash or rebase, never by fast-forward ([About stacked PRs](https://docs.github.com/en/pull-requests/get-started/about-stacked-prs)). They don't fit this workflow.

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
- [PR #5: Fix the basic-ftp Vulnerability](pr-0005-security-basic-ftp.md)
- [Session 2026-11-18 #7: PR #3 Review and a Security Alert](session-2026-11-18-07-review-and-security.md)
- [PR #6: Research Roman Urdu Handling](pr-0006-research-roman-urdu.md)
- [Session 2026-11-18 #8: Roman Urdu Research](session-2026-11-18-08-roman-urdu-research.md)
- [PR #7: Choose the LLM Client](pr-0007-choose-llm-client.md)
- [PR #8: Design the Coach Contract](pr-0008-design-coach-contract.md)
- [Plan](plan.md)
- [PR #9: Write the Implementation Plan](pr-0009-implementation-plan.md)
- [PR #10: Add Dependencies and Test Projects](pr-0010-test-and-runtime-setup.md)
- [PR #11: Write the Gherkin Features](pr-0011-gherkin-features.md)
- [PR #12: Add the Keyword Safety Pre-Check](pr-0012-safety-precheck.md)
- [PR #13: Write the Fixed Messages](pr-0013-fixed-messages.md)
- [PR #14: Define the Reply Schema](pr-0014-reply-schema.md)
- [PR #15: Build the Model Adapter and Prompt](pr-0015-model-adapter.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)
- [PR #16: Document How a Stack Is Merged](pr-0016-document-stack-merge.md)
- [PR #17: Aadit's Learning Exercises](pr-0017-learning-exercises.md)
