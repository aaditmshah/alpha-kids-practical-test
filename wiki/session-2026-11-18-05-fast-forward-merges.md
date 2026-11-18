---
title: "Session 2026-11-18 #5: Fast-Forward Merges"
type: session
status: active
updated: 2026-11-18
summary: Aadit merged PR #1 by fast-forwarding main. The wiki and git-commit skill had wrongly said merges were GitHub rebase merges that rewrite hashes; corrected in PR #2.
---

# Session 2026-11-18 #5: Fast-Forward Merges

Back to: [Sessions](index-sessions.md) · Previous: [Session #4](session-2026-11-18-04-bootstrap.md)

## What happened

Aadit merged [PR #1](pr-0001-bootstrap-nextjs.md) without an approving review. GitHub doesn't let authors approve their own PRs, and branch protection requires 0 approvals ([ADR-0008](adr-0008-protected-main-linear-history.md)). He asked what was next.

Syncing `main` showed the PR's commits with their original hashes, which contradicted the wiki's claim that a rebase merge rewrites them. Aadit explained before Claude could investigate further: _"I did a fast-forward merge, which is my regular workflow. I use rebase when the base is out of date. When merging, I always use fast-forward merges because why unnecessarily create new commits which are exactly the same as the previous commits? This way, the git commits also retain their status checks."_

He also explained where the confusion came from: _"GitHub only allows three ways of merging: merge commit, squash, and rebase. It doesn't allow fast-forward merges from the UI."_ Disabling merge commits and squash merging had been read as "merge with GitHub's rebase button".

## Corrections ([PR #2](pr-0002-fast-forward-merges.md))

- [ADR-0008](adr-0008-protected-main-linear-history.md) now describes merging as a local `git merge --ff-only` followed by a push. GitHub accepts the push because the commits passed the PR's checks, and marks the PR merged.
- The `git-commit` skill and CLAUDE.md say the same, and tell agents never to use `gh pr merge` or the merge button.
- PR pages still leave SHAs out, but the reason changed: a page can't contain the hash of the commit that adds it, and rebasing a branch changes hashes. See [Conventions](conventions.md).
- Home, the PR index, PR #1's page and the website conventions research were corrected.

## What's next

From the [Kanban board](kanban.md):

1. [ticket-0004](ticket-0004-research-safety-escalation.md): safety and escalation research
2. [ticket-0005](ticket-0005-research-roman-urdu.md): Roman Urdu handling
3. [ticket-0007](ticket-0007-choose-stack.md): the LLM client library
4. [ticket-0006](ticket-0006-design-coach-contract.md) (reply schema and prompt), then [ticket-0008](ticket-0008-write-implementation-plan.md) (implementation plan and build tickets)

Aadit still needs to create a free Gemini API key, which also answers Q6 in [Open questions](open-questions.md).
