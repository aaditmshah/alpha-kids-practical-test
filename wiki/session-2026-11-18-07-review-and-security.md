---
title: "Session 2026-11-18 #7: PR #3 Review and a Security Alert"
type: session
status: active
updated: 2026-11-18
summary: Aadit merged PR #3 before its review was recorded, so PR #4 records it (ADR-0011 accepted) and adds a rule to record reviews before merge. A Dependabot alert for basic-ftp is fixed in a follow-up PR.
---

# Session 2026-11-18 #7: PR #3 Review and a Security Alert

Back to: [Sessions](index-sessions.md) · Previous: [Session #6](session-2026-11-18-06-safety-research.md)

## Requests

Aadit: _"Reviewed and merged. Everything looks good. By the way, dependabot flagged a security vulnerability … Oops, I forgot that you need to record any answers on PR #3 before merging. Let's do that next?"_

## PR #3's review ([PR #4](pr-0004-record-pr-3-review.md))

- [ADR-0011](adr-0011-layered-safety-escalation.md) is accepted, and the helpline list needed no changes. Both are recorded on [PR #3's page](pr-0003-research-safety-escalation.md).
- The `git-commit` skill now says to record a PR's review on its wiki page as the PR's last commit before merging, and to record it in the next PR if a merge comes first.

## Security alert

Dependabot alert #2, [GHSA-5pm8-86m8-9m6r](https://github.com/advisories/GHSA-5pm8-86m8-9m6r): a medium-severity DoS bug in `basic-ftp` `<= 6.2.3`. A malicious FTP server could crash `Client.list()`. Our copy, 5.3.1, is a development-only transitive dependency of `gitmoji-cli`, through `proxy-agent` → `pac-proxy-agent` → `get-uri@6.0.5`.

Claude considered three fixes:

- **Override to 6.2.4:** published 2026-10-30, so it passes the one-week release delay. Its only breaking change in 6.0 is that separate transfer hosts are no longer allowed by default, a security hardening that `get-uri` doesn't depend on.
- **Wait for the chain to update:** `get-uri@8.0.2` moved to `basic-ftp@^6.2.4` only on 2026-11-16, and gitmoji-cli's chain still uses `get-uri@6`.
- **Dismiss the alert as unreachable.**

Claude chose the override; it ships in the next PR.

## Open at end of session

- Next: [ticket-0005](ticket-0005-research-roman-urdu.md), Roman Urdu handling, including the Roman Urdu escalation wording for Aadit to check.
