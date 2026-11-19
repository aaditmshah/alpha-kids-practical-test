---
title: "ADR-0020: Keep Secrets Out of Claude's Reach"
type: adr
status: accepted
updated: 2026-11-19
summary: Project Claude settings deny reading or editing .env secrets files, and a Bash hook blocks commands that name them, so Aadit's Gemini key never enters a conversation.
---

# ADR-0020: Keep Secrets Out of Claude's Reach

Back to: [Decisions](index-decisions.md) · Session: [2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md) · PR: [#21](pr-0021-protect-secrets.md)

## Context

The live smoke test ([ticket-0022](ticket-0022-live-smoke-test.md)) needs Aadit's Gemini API key in `.env.local`, which git already ignores. Aadit: _"Before I add the secrets to `.env.local`, could you update the Claude settings to ensure that you can't access it?"_ Anything Claude reads goes into the conversation, so the key must never be read.

## Decision

Two layers in the committed project settings, `.claude/settings.json`:

1. **Permission deny rules** for `Read` and `Edit` on `.env`, `.env.local`, `.env.*.local`, `.env.development`, `.env.production` and `.env.test`. Read rules also cover Grep and Glob. `.env.example` holds no secrets and stays open.
2. **A PreToolUse hook on Bash**, `.claude/hooks/protect-env.ts`, which denies any command that names one of those files (`cat .env.local`, `--env-file=.env.local`, `.env*`). It has its own unit tests.

Both were checked: reading the file is refused by the permission rules, and the hook refused a command that only echoed the file's name.

## Consequences

- The settings are committed, so they protect anyone who opens the repository with Claude Code, interviewers included.
- **It is a guard against mistakes, not a sandbox.** A command could still reach the file without naming it, for example through a glob like `.e*`, and running the app or a test loads the key into that process. The rules stop Claude from reading the file, not from running code that uses the key. The smoke test must never print it.
- Shell commands that only mention the file in text, such as a heredoc that writes this page, are blocked too. Claude writes such text with its file tools instead.

## See also

- [ADR-0003: Use the Gemini Free Tier](adr-0003-llm-provider.md)
- [Log](log.md)
- [Alpha Kids Practical Test Wiki](index.md)
