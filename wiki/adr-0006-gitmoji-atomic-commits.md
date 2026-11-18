---
title: "ADR-0006: Gitmoji, Atomic Commits and the Mood Rule"
type: adr
status: accepted
updated: 2026-11-18
summary: Commits are atomic and use Gitmoji-style messages. A Unicode emoji and an imperative subject of 50 characters or fewer, then a body wrapped at 72 that says what changed in the imperative and why in the indicative. Encoded in the git-commit skill.
---

# ADR-0006: Gitmoji, Atomic Commits and the Mood Rule

Back to: [Home](index.md) · [Decisions](index-decisions.md) · Research: [Commit messages](research-commit-messages.md) · Session: [2026-11-18 #3](session-2026-11-18-03-commit-conventions.md)

## Context

The candidate prefers Gitmoji-style commit messages and asked for a skill that writes good messages and commits atomic changes. The git history is submitted alongside the [wiki](adr-0001-flat-llm-wiki.md), so it is part of how reviewers see the process.

## Options considered

1. **Conventional Commits** (`feat:`, `fix:`). A well-known standard, but not what the candidate prefers.
2. **Gitmoji with `:shortcodes:`.** Shortcodes render as emoji only on some websites; in a terminal they appear as text.
3. **Gitmoji with Unicode emoji,** plus cbeams' seven rules and the candidate's mood rule.

## Decision

**Option 3.**

- **Subject:** `<unicode gitmoji> <Imperative, capitalised subject>`. No scope, no trailing period, and 50 characters or fewer after the emoji (72 at most).
- **Body:** a blank line after the subject, wrapped at 72 characters. Say _what_ changed in the **imperative** mood and _why_ in the **indicative** mood. Don't explain _how_.
- **Atomic:** one logical change per commit, and the linter and tests pass at each commit. A change and the wiki pages that record it go in the same commit.
- **TDD:** commit at green, with the test and the code together. 🧪 is only for a deliberately red commit.
- **Individual commits are not logged in [log.md](log.md);** git history is that record.
- **Encoded in** the [`git-commit` skill](../.claude/skills/git-commit/SKILL.md), which the root [CLAUDE.md](../CLAUDE.md) points to.

## Consequences

- `git log --oneline` reads as a short story of the project.
- Some discipline is needed to split work into separate commits. The skill makes the agent plan its commits before staging anything.
- The first commit (`🎉 Begin project with an LLM wiki`) bundles the whole initial wiki. Its pages all link to each other, so splitting it would have left commits with broken links.

## See also

- [ADR-0008: Protected Main, Linear History, Quality Checks in CI Only](adr-0008-protected-main-linear-history.md)
- [Wiki Conventions](conventions.md)
- [Research: The Candidate's Website Conventions](research-website-conventions.md)
- [ticket-0009: Commit Conventions and the git-commit Skill](ticket-0009-commit-conventions.md)
