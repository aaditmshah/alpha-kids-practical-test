---
title: "ticket-0011: Protect Main and Enforce Linear History"
type: ticket
status: done
updated: 2026-11-18
summary: Copy the website's branch protection to main (required ci check, PRs only, rules apply to admins, linear history), and allow rebase merging only.
---

# ticket-0011: Protect Main and Enforce Linear History

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · Decision: [ADR-0008](adr-0008-protected-main-linear-history.md)

## Acceptance criteria

- [x] Read the website's branch protection and merge settings with `gh api`
- [x] Repository: merge commits off, squash merging off, rebase merging on, delete merged branches, allow updating a PR branch
- [x] `main`: required `ci` check (strict), PR required (0 approvals), rules apply to admins, linear history, no force pushes or deletion
- [x] Workflow documented in the [`git-commit` skill](../.claude/skills/git-commit/SKILL.md) and CLAUDE.md

## See also

- [Log](log.md)
- [Plan](plan.md)
- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
- [PR #1: Bootstrap the Next.js App with Vite+](pr-0001-bootstrap-nextjs.md)
