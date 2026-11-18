import { z } from "zod";

/**
 * The structured reply the model must return (ADR-0015). Gemini enforces the enums, required fields
 * and the number of plan steps; it ignores length limits, so Zod checks those here. The schema is
 * kept flat because Gemini supports neither `anyOf` nor deep nesting (wiki/research-llm-client.md).
 */
export const CoachReply = z.object({
	language: z.enum(["en", "ur-Latn"]).describe('"ur-Latn" for Roman Urdu, otherwise "en"'),
	risk: z
		.enum(["none", "emergency", "abuse", "self_harm"])
		.describe("Any crisis the parent describes, or none"),
	summary: z.string().max(240).describe("One sentence showing the concern was understood"),
	plan: z
		.array(z.string().max(200))
		.min(2)
		.max(4)
		.describe("2 to 4 short, practical steps, each starting with a verb"),
	checkIn: z
		.object({
			kind: z.enum(["question", "time"]),
			text: z.string().max(200),
		})
		.describe("A question to tailor the next step, or a time to come back and report"),
	referral: z
		.string()
		.max(200)
		.nullable()
		.describe("One line naming the right professional, or null"),
});

/** A validated reply from the model. */
export type CoachReply = z.infer<typeof CoachReply>;
