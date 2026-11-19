---
title: How We Used Coding Agents
type: meta
status: active
updated: 2026-11-19
summary: The note the interviewer asked for. Aadit led and decided; Claude Code researched, designed and built test-first; the wiki, the skills, CI and recorded reviews kept the agent accountable.
---

# How We Used Coding Agents

Back to: [Home](index.md) · Deliverable 3 of the [submission](source-submission-deliverables.md) · Ticket: [ticket-0027](ticket-0027-coding-agents-note.md)

**In short:** Aadit built this with [Claude Code](https://claude.com/claude-code) (Claude Opus 5.5) as his coding agent, and designed the UI with Claude Design. Aadit set the direction, made every decision and reviewed every pull request. Claude did the research, proposed options, and wrote the code test-first. Everything either of them discussed, decided or did is recorded in this wiki, so the whole process can be audited, and replayed.

## Who did what

**Aadit** acted as the lead:

- He set the constraints: minimal scope, test-first, $0 LLM cost, local only ([ADR-0002](adr-0002-minimal-scope-tdd.md), [ADR-0005](adr-0005-local-only.md)).
- He made the product calls: Gemini's free tier, Roman Urdu in Latin script, Indian helplines only, and a playful pastel UI ([ADR-0003](adr-0003-llm-provider.md), [ADR-0004](adr-0004-roman-urdu-only.md), [ADR-0012](adr-0012-india-helplines.md), [ADR-0018](adr-0018-ui-design-claude-design.md)).
- He approved the Roman Urdu wording of every crisis message, and the design.
- He set the engineering workflow: Gitmoji commits, a protected `main`, stacked pull requests merged by fast-forward ([ADR-0006](adr-0006-gitmoji-atomic-commits.md), [ADR-0008](adr-0008-protected-main-linear-history.md)).
- He reviewed and merged every pull request, and wrote two parts of the code himself, as learning exercises ([ADR-0019](adr-0019-learning-exercises.md)).

**Claude** did most of the work:

- researched the providers, Indian helplines (from official government sources), Roman Urdu and the SDKs, with sources cited on each [research page](index-research.md)
- drafted every ADR as options with a recommendation, for Aadit to decide
- wrote the user stories as executable Gherkin, then the code, test-first
- drafted the UI in Claude Design, as one artboard per state
- kept the wiki, the Kanban board and a page for every pull request up to date

## What kept the agent honest

An agent is fast but forgetful, and confident when it's wrong. These are the guardrails we used:

- **The wiki is the agent's memory.** The long working conversation was compacted to free up space. After that, Claude carried on from the wiki and its own notes, without Aadit repeating himself ([ADR-0001](adr-0001-flat-llm-wiki.md)).
- **Project skills** make the habits repeatable: `wiki-query` before answering, `wiki-update` after every change, `wiki-maintain` to lint the wiki, and `git-commit` for atomic commits. `CLAUDE.md` points every agent at them.
- **Specifications before code.** Each user story quotes the brief word for word, and a script checks that the quotes match. The stories run as tests ([ADR-0017](adr-0017-bdd-gherkin-features.md)).
- **CI on a protected `main`.** Nothing merged without passing formatting, lint, type checks, about 300 tests, the wiki linter and the build. Even Aadit couldn't push to `main` directly.
- **Reviews on the record.** Every pull request has a wiki page with its commits, Aadit's review in his own words, and how each comment was resolved.
- **A live test against the real model.** The unit tests mock the model, so an opt-in smoke test calls Gemini. Its first run found the default model overloaded on the free tier. That led to a 20-second timeout and a different default model ([ADR-0003](adr-0003-llm-provider.md)).
- **Secrets out of the agent's reach.** Claude Code settings deny reading the file that holds the API key, and a hook blocks shell commands that name it ([ADR-0020](adr-0020-keep-secrets-from-claude.md)).

## What went wrong, and what we learned

- **Learning exercises that taught little.** Claude picked two small pure functions for Aadit to write. Aadit said he learned little, and would rather have integrated the AI SDK. The lesson: ask about learning goals first ([ADR-0019](adr-0019-learning-exercises.md)).
- **Workflow corrections.** Claude opened stacked pull requests against `main` instead of the branch below, and Aadit corrected it. A single push to the top of a stack was rejected, so the merge order is now written down ([ADR-0008](adr-0008-protected-main-linear-history.md)).
- **The agent's own slips,** such as an edit script that dropped two rows from a PR page, or a commit that picked up unrelated staged files. Each was caught by a check or a re-read, and fixed before merge.

## By the numbers

Over two days (2026-11-18 and 2026-11-19), there were about 100 commits, 24 pull requests, 20 ADRs, 27 tickets, about 300 tests and over 100 wiki pages.

## Explore it with an agent

The wiki is written for agents as well as people. Open the repository in Claude Code and ask questions; `CLAUDE.md` tells it to start from the wiki. The [README](../README.md#explore-it-with-claude-code) suggests some prompts.

## See also

- [PR #24: Add the Submission Notes](pr-0024-submission-notes.md)
- [Requirements](requirements.md)
- [Session 2026-11-19 #3: Submission Notes](session-2026-11-19-03-submission-notes.md)
