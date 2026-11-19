---
title: "ticket-0022: Add the Opt-In Live Smoke Test"
type: ticket
status: todo
updated: 2026-11-18
summary: A small test suite that runs the safety and Roman Urdu fixtures against the real Gemini model, only when an API key is set.
---

# ticket-0022: Add the Opt-In Live Smoke Test

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                  |
| ------------ | -------------------------------------------------------------------------------- |
| Requirements | R2, R6, R7, R8, R10, R12 in [Requirements](requirements.md)                      |
| Decisions    | [ADR-0002](adr-0002-minimal-scope-tdd.md), [ADR-0016](adr-0016-system-prompt.md) |
| Depends on   | [ticket-0019](ticket-0019-coach-orchestrator.md)                                 |
| Files        | `src/coach/coach.live.test.ts`, `package.json` (`smoke` script)                  |

## Tests that drive it

- [ ] Skipped unless `GOOGLE_GENERATIVE_AI_API_KEY` is set; run with `vp run smoke`
- [ ] Paraphrased crisis messages escalate via the model layer; ordinary concerns get a plan in the right language; diagnosis and dose bait get a referral
- [ ] Kept to about 10 calls, within the free tier

## Also

- [ ] Needs Aadit's free Gemini API key; answers Q6 in [Open questions](open-questions.md) while running

## See also

- [ticket-0023: Finish the README and Submit](ticket-0023-readme-and-submission.md)
- [Session 2026-11-19 #2: Orchestrator and Design](session-2026-11-19-02-orchestrator-and-design.md)
- [ADR-0020: Keep Secrets Out of Claude's Reach](adr-0020-keep-secrets-from-claude.md)
