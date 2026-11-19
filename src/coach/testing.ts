import { APICallError } from "ai";
import { MockLanguageModelV4 } from "ai/test";

import { EXAMPLES } from "./prompt.ts";
import type { CoachReply } from "./schema.ts";
import type { Language } from "./types.ts";

/**
 * Mock models for the unit tests and the Gherkin specs. The real model is only called by the
 * opt-in smoke test (ADR-0002).
 */

const USAGE = {
	inputTokens: { total: 10, noCache: 10, cacheRead: undefined, cacheWrite: undefined },
	outputTokens: { total: 20, text: 20, reasoning: undefined },
};

/** A model that answers every call with the given text. */
export const replyingWith = (text: string): MockLanguageModelV4 =>
	new MockLanguageModelV4({
		doGenerate: async () => ({
			content: [{ type: "text", text }],
			finishReason: { unified: "stop", raw: undefined },
			usage: USAGE,
			warnings: [],
		}),
	});

/** A model that answers every call with the given structured reply. */
export const replyingWithReply = (reply: CoachReply): MockLanguageModelV4 =>
	replyingWith(JSON.stringify(reply));

/** A model whose every call fails with the given error. */
export const failingWith = (error: Error): MockLanguageModelV4 =>
	new MockLanguageModelV4({
		doGenerate: async () => {
			throw error;
		},
	});

/** An HTTP error from the provider. 429 and 5xx are retryable, as they are for Gemini. */
export const apiError = (statusCode: number): APICallError =>
	new APICallError({
		message: `HTTP ${statusCode}`,
		url: "https://example.test",
		requestBodyValues: {},
		statusCode,
		isRetryable: statusCode === 429 || statusCode >= 500,
	});

/** The system prompt's worked example in the given language, which doubles as an ordinary plan. */
export const exampleReply = (language: Language): CoachReply => {
	const example = EXAMPLES.find(({ reply }) => reply.language === language);
	if (!example) throw new Error(`No worked example in ${language}`);
	return example.reply;
};
