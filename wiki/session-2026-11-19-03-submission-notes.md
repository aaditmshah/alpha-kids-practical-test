---
title: "Session 2026-11-19 #3: Submission Notes"
type: session
status: active
updated: 2026-11-19
summary: Aadit shared the interviewer's three deliverables. Claude recorded them, wrote the coding agents note and a 2-minute video script, and made the README point reviewers to the wiki through Claude Code.
---

# Session 2026-11-19 #3: Submission Notes

Back to: [Sessions](index-sessions.md) · Previous: [Session 2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md)

## Discussion

- Aadit approved the README in [PR #23](pr-0023-readme-and-submission.md): _"The README looks excellent."_
- He shared what the interviewer asked for: a repo link with a short README, a 2-minute video with one everyday concern and one crisis, and a brief note on how coding agents were used. They are recorded verbatim as a [source](source-submission-deliverables.md), and as D1 to D3 in the [requirements](requirements.md).
- **Selling the wiki:** _"we spent so much time and effort building the wiki. It should now pay off. We can tell the interviewer to explore the codebase using Claude to explore the wiki."_ He suggested two prompts, and asked Claude to add its own: _"We control the narrative here."_

## Work

- **[How we used coding agents](coding-agents.md)** ([ticket-0027](ticket-0027-coding-agents-note.md)): who did what, the guardrails that kept the agent honest, what went wrong, and the numbers. Every claim links to its record. It stays honest about the mistakes, because they show how the process caught them.
- **[Video walkthrough script](walkthrough.md)** ([ticket-0026](ticket-0026-video-walkthrough.md)): two minutes, with _My 3-year-old refuses to sleep at bedtime_ as the everyday concern and _My husband hits me every day_ as the crisis. Aadit records it.
- **README:** links for the interviewer at the top, and an "Explore it with Claude Code" section with seven prompts, Aadit's two included.
- Opened as [PR #24](pr-0024-submission-notes.md), stacked on PR #23.

## Review

Aadit approved [PR #24](pr-0024-submission-notes.md) and confirmed the helplines: _"The coding agents note is good. The helpline numbers are correct. I'll record the video now."_ Tickets 0023 and 0027 are done.

## The video

- Aadit wanted to show the app on his phone, but the phone couldn't reach `http://192.168.0.100:3000`. Claude found nothing on the laptop blocking it: the server listened on all interfaces, no firewall was running, and Mullvad's local network sharing was on. The laptop reached the router, but the phone never answered ARP, so the router (Jio_27) isolates its Wi-Fi clients. Claude suggested recording in the browser's phone view instead.
- Aadit recorded the walkthrough with the Loom Chrome extension: [the video](https://www.loom.com/share/1a78d5e4b4a547e68c894b3afa76bc6f). It is linked from the README, and [ticket-0026](ticket-0026-video-walkthrough.md) is done.

## Open at end of session

- Aadit merges the stack (#18 to #24) and submits.

## See also

- [ticket-0023: Finish the README and Submit](ticket-0023-readme-and-submission.md)
