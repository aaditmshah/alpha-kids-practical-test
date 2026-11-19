import type { LanguageModel } from "ai";
import {
	APICallError,
	generateText,
	NoObjectGeneratedError,
	NoOutputGeneratedError,
	Output,
	RetryError,
} from "ai";

import type { ChatMessage } from "./prompt.ts";
import { SYSTEM_PROMPT, toModelMessages } from "./prompt.ts";
import { CoachReply } from "./schema.ts";

/** Why the model couldn't give a usable reply. Every failure leads to the fail-safe (ADR-0011). */
export type ModelFailure = "rate_limited" | "invalid_output" | "unavailable";

/** The model's validated reply, or the reason there isn't one. */
export type ModelResult =
	| { readonly ok: true; readonly reply: CoachReply }
	| { readonly ok: false; readonly failure: ModelFailure };

const classify = (error: unknown): ModelFailure => {
	const cause = RetryError.isInstance(error) ? error.lastError : error;
	if (APICallError.isInstance(cause) && cause.statusCode === 429) return "rate_limited";
	if (NoObjectGeneratedError.isInstance(cause) || NoOutputGeneratedError.isInstance(cause))
		return "invalid_output";
	return "unavailable";
};

/**
 * Asks the model for a structured reply to the conversation (ADR-0014). The system prompt goes in
 * as instructions and the parent's text only as messages, so a parent can't rewrite the rules
 * (ADR-0016). The reply is held to the CoachReply schema, and any failure becomes a ModelFailure
 * rather than an exception.
 */
export const askModel = async (
	history: readonly ChatMessage[],
	model: LanguageModel,
): Promise<ModelResult> => {
	try {
		const { output } = await generateText({
			model,
			system: SYSTEM_PROMPT,
			messages: toModelMessages(history),
			output: Output.object({ schema: CoachReply }),
			temperature: 0.3,
			maxOutputTokens: 800,
			// One quick retry for a blip. Free-tier rate limits won't clear in a second, so no more.
			maxRetries: 1,
		});
		return { ok: true, reply: output };
	} catch (error) {
		return { ok: false, failure: classify(error) };
	}
};
