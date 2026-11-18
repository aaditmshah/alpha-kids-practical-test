---
title: "ADR-0015: Coach Reply Schema and Post-Checks"
type: adr
status: accepted
updated: 2026-11-18
summary: The model returns one flat Zod-validated object (language, risk, summary, 2–4 plan steps, a check-in, an optional referral). Code then applies length limits and post-checks for doses and diagnoses, and the app decides what to show.
---

# ADR-0015: Coach Reply Schema and Post-Checks

Back to: [Decisions](index-decisions.md) · Ticket: [ticket-0006](ticket-0006-design-coach-contract.md) · Prompt: [ADR-0016](adr-0016-system-prompt.md)

**Status: accepted** on 2026-11-18, in Aadit's review of [PR #8](pr-0008-design-coach-contract.md): _"Approved, record it and I'll merge"_

## Context

The brief asks for a _"short, structured, and safe plan along with a follow-up check-in, i.e. either a question or a time to come back"_ (R3–R5 in [Requirements](requirements.md)). The model is held to a Zod schema through the Vercel AI SDK ([ADR-0014](adr-0014-vercel-ai-sdk.md)). Gemini enforces only part of JSON Schema: `enum`, `required` and `minItems`/`maxItems` are enforced, length limits are dropped, `anyOf` isn't in the supported subset, and deep nesting can be rejected ([Research: LLM client](research-llm-client.md)). Escalation replaces the model's text whenever risk is found ([ADR-0011](adr-0011-layered-safety-escalation.md)).

## Decision

### The schema

```ts
const CoachReply = z.object({
	language: z.enum(["en", "ur-Latn"]),
	risk: z.enum(["none", "emergency", "abuse", "self_harm"]),
	summary: z.string().max(240), // one sentence that shows the concern was understood
	plan: z.array(z.string().max(200)).min(2).max(4), // short, practical steps, each starting with a verb
	checkIn: z.object({
		kind: z.enum(["question", "time"]), // a question, or a time to come back
		text: z.string().max(200),
	}),
	referral: z.string().max(200).nullable(), // one line naming the right professional, or null
});
```

- **One level of nesting.** `checkIn` is an object with an enum `kind`, not a union, because Gemini doesn't support `anyOf`.
- **`.max()` lengths are generous** and checked by Zod in our code, since Gemini drops them. A reply that breaks them fails validation and goes to the fail-safe.
- **`referral`** is how the coach points to a doctor, counsellor or lawyer without diagnosing or advising (R6, R7).

### Post-checks (code, after validation)

These checks cover the model's text only. A hit replaces the reply with a fixed **referral reply**, a pre-written line in the reply's language plus a check-in question.

| Check                   | Pattern (case-insensitive)                                                                                                                                    | Why                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Dose or medicine amount | `\b\d+(\.\d+)?\s?(mg\|ml\|mcg\|drops?\|tablets?\|goli)\b`                                                                                                     | R7: no medical instructions                                                                                                  |
| Suggested diagnosis     | `(sounds like\|might have\|probably has\|likely has\|signs of\|symptoms of)\s+(adhd\|autism\|autistic\|depression\|bipolar\|ocd\|dyslexia\|anxiety disorder)` | R6: no diagnosis. Narrow on purpose: echoing a diagnosis the parent already mentioned ("since your son has ADHD") is allowed |

Referral reply (Aadit approved the wording in [PR #8](pr-0008-design-coach-contract.md)):

| English                                                                                                                    | Roman Urdu                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| This needs a doctor's advice, so medicines, doses or a diagnosis can't come from here. Please talk to your child's doctor. | Is ke liye doctor ki salah zaroori hai, isliye dawai, dose ya bimari ka naam yahan se nahi bataya ja sakta. Apne bachche ke doctor se baat karein. |
| Check-in: What would help most before you see the doctor?                                                                  | Check-in: Doctor se milne se pehle aapko kis cheez mein sabse zyada madad chahiye?                                                                 |

### What the app shows

| Situation                    | Shown                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| The pre-check matches        | Fixed escalation ([ADR-0011](adr-0011-layered-safety-escalation.md)); the model is not called |
| `risk` is not `none`         | Fixed escalation for that risk, in `language`                                                 |
| A post-check hits            | Fixed referral reply, in `language`                                                           |
| Model error or invalid reply | Fixed fail-safe ([ADR-0011](adr-0011-layered-safety-escalation.md))                           |
| Otherwise                    | `summary`, the numbered `plan`, `referral` (if any), then `checkIn`                           |

### Conversation history

The page keeps the history in browser state (R9) and sends the **last 6 messages** with each request. The server stays stateless. Earlier coach replies are sent as their rendered text, so the model sees what the parent saw.

## Consequences

- Every rule that matters is enforced in code that unit tests can cover: schema validation, lengths, post-checks and the display decision.
- The post-checks are narrow, so they will miss some phrasings. The prompt ([ADR-0016](adr-0016-system-prompt.md)) is the first line of defence for R6 and R7, and the post-checks are a net.
- The referral reply's Roman Urdu wording was approved by Aadit as drafted.

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Log](log.md)
- [PR #8: Design the Coach Contract](pr-0008-design-coach-contract.md)
- [Session 2026-11-18 #10: Coach Contract](session-2026-11-18-10-coach-contract.md)
- [ticket-0016: Write the Fixed Messages](ticket-0016-fixed-messages.md)
- [ticket-0017: Implement the Reply Schema and Post-Checks](ticket-0017-reply-schema-and-postchecks.md)
- [ticket-0018: Build the Model Adapter and Prompt](ticket-0018-model-adapter.md)
- [ticket-0019: Build the Coach Orchestrator](ticket-0019-coach-orchestrator.md)
- [ticket-0021: Build the Chat Page](ticket-0021-chat-ui.md)
