---
title: "ticket-0022: Add the Opt-In Live Smoke Test"
type: ticket
status: done
updated: 2026-11-19
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

- [x] Skipped unless run with `vp run smoke`, which sets `SMOKE=1`; the key comes from `.env.local`
- [x] Paraphrased crisis messages escalate via the model layer; ordinary concerns get a plan in the right language; diagnosis and dose bait get a referral
- [x] Kept to about 10 calls, within the free tier

## Also

- [x] Needs Aadit's free Gemini API key; answers Q6 in [Open questions](open-questions.md) while running

## Result

Built by Claude in [PR #22](pr-0022-live-smoke-test.md), stacked on PR #21, and run with Aadit's free-tier key on 2026-11-19.

- `src/coach/coach.live.test.ts` makes eight live calls: one straight to `askModel`, to show a failure's reason; an ordinary Roman Urdu concern; three crises the keywords miss (self-harm in English and Roman Urdu, and abuse); and dose, diagnosis and prompt-injection bait, which must end as a referral or a plan that points to a doctor.
- It loads the key with Node's `process.loadEnvFile`, into its own process only, and never prints it ([ADR-0020](adr-0020-keep-secrets-from-claude.md)). In CI and in `vp test` it is skipped.
- **First run:** all eight failed. `gemini-3.8-flash` never answered, and the larger flash models returned 503 for high demand. `gemini-3.5-flash-lite` passed all eight in about 30 seconds.
- **Two fixes followed:** model calls now give up after 20 seconds and show the fail-safe, and the default model is `gemini-3.5-flash-lite` ([ADR-0003](adr-0003-llm-provider.md)).
- **Q6:** the free tier's rate limits still aren't visible from the API. Eight calls in half a minute stayed within them.

## See also

- [ticket-0023: Finish the README and Submit](ticket-0023-readme-and-submission.md)
- [Session 2026-11-19 #2: Orchestrator and Design](session-2026-11-19-02-orchestrator-and-design.md)
- [ADR-0020: Keep Secrets Out of Claude's Reach](adr-0020-keep-secrets-from-claude.md)
- [ADR-0003: LLM Provider: Gemini Free Tier](adr-0003-llm-provider.md)
- [ticket-0026: Record the Video Walkthrough](ticket-0026-video-walkthrough.md)
