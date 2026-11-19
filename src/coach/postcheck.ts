import type { CoachReply } from "./schema.ts";

/** Why a model reply was replaced by the fixed referral message (ADR-0015). */
export type PostcheckHit = "dose" | "diagnosis";

const DOSE = /\b\d+(\.\d+)?\s?(mg|ml|mcg|drops?|tablets?|goli)\b/i;
const DIAGNOSIS =
	/(sounds like|might have|may have|could have|could be|probably has|likely has|signs of|symptoms of)\s+(adhd|autism|autistic|depression|bipolar|ocd|dyslexia|anxiety disorder)/i;

/**
 * Checks the model's text (summary, plan steps, check-in and referral) for what the coach must
 * never say (R6, R7), after the reply has passed schema validation. Returns the first problem
 * found, checking for a dose before a diagnosis, or null. A hit makes the orchestrator show the
 * fixed referral message instead. Matching is case-insensitive, since the model writes "ADHD".
 *
 * - "dose": a number followed by a unit of medicine, such as "5 ml", "2 tablets", "10mg" or
 *   "1 goli"
 * - "diagnosis": a hedge ("sounds like", "might have", "may have", "could be", "signs of", …)
 *   directly followed by a condition, such as "sounds like ADHD" or "might have autism"
 *
 * Echoing a diagnosis the parent already has ("since your son has ADHD") doesn't hit. The patterns
 * are deliberately narrow (ADR-0015): the system prompt is the first line of defence, and this is
 * the backstop. Built by Aadit as a learning exercise (ADR-0019).
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
