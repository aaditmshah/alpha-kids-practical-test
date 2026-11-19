---
title: Video Walkthrough Script
type: plan
status: active
updated: 2026-11-19
summary: A 2-minute script for the walkthrough video the interviewer asked for. It shows one everyday concern and one crisis, where the coach refuses to coach and sends the parent to help.
---

# Video Walkthrough Script

Back to: [Home](index.md) · Deliverable 2 of the [submission](source-submission-deliverables.md) · Ticket: [ticket-0026](ticket-0026-video-walkthrough.md)

The interviewer asked for _"a 2-minute Loom or similar video walkthrough including: one everyday concern, and one case where the parent describes a crisis so that I can see the safe refusal."_ Aadit records it. This script fits in two minutes at a relaxed pace.

## Before recording

- Build and start the production app: `vp run build`, then `vp run start`. Open <http://localhost:3000> in a narrow window, or the browser's phone view, so the design reads well.
- Run `vp run smoke` first. If the model is overloaded, the coach shows its fail-safe, which is safe but not the demo you want.
- Use only made-up concerns: Google may use free-tier prompts.

## Script

| Time      | Show                                                                                                                      | Say                                                                                                                                                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:15 | The empty chat                                                                                                            | "This is Parent Coach. A parent types a worry in English or Roman Urdu, and gets a short, safe plan and a time to check in. It runs locally on Gemini's free tier."                                                                                              |
| 0:15–0:50 | Type _My 3-year-old refuses to sleep at bedtime_ and send it. Point at the waiting bubble, then the reply                 | "An everyday concern. The reply is always the same shape: a one-line summary, two to four steps, and a check-in, here a time to come back. It never diagnoses or prescribes."                                                                                    |
| 0:50–1:00 | Tap the _Meri beti khana nahi khati_ chip, if time allows                                                                 | "In Roman Urdu, the coach answers in Roman Urdu."                                                                                                                                                                                                                |
| 1:00–1:40 | Type _My husband hits me every day_ and send it. Point at the red alert, the "call 112 now" line and the helpline buttons | "Now a crisis. The coach doesn't try to coach through it. A keyword check catches it before the model is even asked, and shows a fixed, pre-approved message first: call 112 if anyone is in danger, then the Child and Women helplines as tap-to-call buttons." |
| 1:40–2:00 | The README, then the wiki's home page                                                                                     | "The model is the second layer: it flags crises the keywords miss, and replies that mention a dose become a doctor referral. If it fails, the parent still sees 112. Everything we decided is in the wiki, and you can explore it with Claude Code."             |

## Backup lines

- A crisis the keywords miss, if there's time: _I can't do this anymore, everyone would be better off without me_. The model flags it, and the same fixed escalation appears, with Tele MANAS (14416).
- In Roman Urdu: _Bachche ne zehar kha liya_ escalates in Roman Urdu.

## See also

- [Kanban Board](kanban.md)
- [PR #24: Add the Submission Notes](pr-0024-submission-notes.md)
- [Requirements](requirements.md)
- [Session 2026-11-19 #3: Submission Notes](session-2026-11-19-03-submission-notes.md)
