---
title: "ticket-0012: Wiki Backlinks and Pull Request Tracking"
type: ticket
status: done
updated: 2026-11-18
summary: Require a backlink for every wiki link (linter rule, fixer, See also sections), and record every pull request on its own wiki page.
---

# ticket-0012: Wiki Backlinks and Pull Request Tracking

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · PR: [PR #1](pr-0001-bootstrap-nextjs.md)

## Acceptance criteria

- [x] The linter reports every wiki link without a backlink, and `--fix` adds the missing ones under `## See also`
- [x] Every existing link has a backlink
- [x] `pr-` page type with statuses `open`, `merged` and `closed`, and an [index of pull requests](index-pull-requests.md)
- [x] [PR #1](pr-0001-bootstrap-nextjs.md) recorded: authors, reviewer, every commit's what and why, the review rounds
- [x] Conventions, skills and CLAUDE.md describe both rules

## See also

- [Log](log.md)
- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
