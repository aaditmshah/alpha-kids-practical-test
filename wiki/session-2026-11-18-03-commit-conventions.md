---
title: "Session 2026-11-18 #3: Commit Conventions"
type: session
status: active
updated: 2026-11-18
summary: First commits. Researched Gitmoji and cbeams' seven rules, created the git-commit skill, and adopted the mood rule (imperative for what, indicative for why).
---

# Session 2026-11-18 #3: Commit Conventions

Back to: [Sessions](index-sessions.md) · Previous: [Session #2](session-2026-11-18-02-decisions.md)

## Request

The candidate asked to:

- commit everything so far, using Gitmoji-style messages
- research [gitmoji.dev](https://gitmoji.dev/) and [cbea.ms/git-commit](https://cbea.ms/git-commit/)
- create a skill for writing good commit messages and committing atomic changes
- record it all in the wiki

They added the rule: _"use the imperative mood in the subject body to describe the changes we made. Use the indicative mood for why we made those changes."_

## Decisions

- [ADR-0006](adr-0006-gitmoji-atomic-commits.md): Unicode gitmoji, cbeams' seven rules, the mood rule, and atomic commits with their wiki updates included.

## Work done

- Wrote [Research: Commit messages](research-commit-messages.md).
- Created the [`git-commit` skill](../.claude/skills/git-commit/SKILL.md) and pointed the root CLAUDE.md to it.
- Made the commits:
  1. `🎉 Begin project with an LLM wiki`: the state at the end of [session #2](session-2026-11-18-02-decisions.md), committed as one bootstrap because its pages all link to each other.
  2. `🧑‍💻 Add git-commit skill and commit conventions`: this session's work.
- The candidate pushed both commits to the public GitHub repository [aaditmshah/alpha-kids-practical-test](https://github.com/aaditmshah/alpha-kids-practical-test) (`main`).
- No `.gitignore` yet. It is added when the app is scaffolded, because nothing needs ignoring until then.

## Open at end of session

Unchanged: Q3, Q4 and Q6 in [Open questions](open-questions.md). Next: [ticket-0004](ticket-0004-research-safety-escalation.md).

## See also

- [Log](log.md)
- [Session 2026-11-18 #4: Bootstrap the App](session-2026-11-18-04-bootstrap.md)
