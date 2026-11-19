import type { CoachReply } from "./schema.ts";

/** Why a model reply was replaced by the fixed referral message (ADR-0015). */
export type PostcheckHit = "dose" | "diagnosis";

const DOSE = /\b\d+(\.\d+)?\s?(mg|ml|mcg|drops?|tablets?|goli)\b/i;
const DIAGNOSIS =
	/(sounds like|might have|probably has|likely has|signs of|symptoms of)\s+(adhd|autism|autistic|depression|bipolar|ocd|dyslexia|anxiety disorder)/i;

/**
 * Checks the model's text (summary, plan steps, check-in and referral) for what the coach must
 * never say (R6, R7), after the reply has passed schema validation. Returns the first problem
 * found, or null. A hit makes the orchestrator show the fixed referral message instead.
 *
 * - "dose": a dose or amount of medicine, e.g. "5 ml", "2 tablets", "10mg", "1 goli"
 *   (ADR-0015 pattern: \b\d+(\.\d+)?\s?(mg|ml|mcg|drops?|tablets?|goli)\b)
 * - "diagnosis": a suggested condition, e.g. "sounds like ADHD", "might have autism"
 *   (ADR-0015 pattern: (sounds like|might have|probably has|likely has|signs of|symptoms of)
 *   followed by a condition such as adhd, autism, depression, bipolar, ocd, dyslexia)
 *
 * Echoing a diagnosis the parent already has ("since your son has ADHD") is fine and must not hit.
 *
 * Aadit's exercise (ADR-0019): write the tests in postcheck.test.ts first, from the cases in
 * wiki/ticket-0017-reply-schema-and-postchecks.md, then replace this body.
 */
export const postcheck = (reply: CoachReply): PostcheckHit | null => {
	const texts = [
		reply.summary,
		...reply.plan,
		reply.checkIn.text,
		...(reply.referral === null ? [] : [reply.referral]),
	];

	if (texts.some((text) => DOSE.test(text))) return "dose";
	if (texts.some((text) => DIAGNOSIS.test(text))) return "diagnosis";
	return null;
};
