import { z } from "zod";

import type { ChatMessage } from "./prompt.ts";

/** The longest message a parent can send. The page's text box enforces it too. */
export const MAX_MESSAGE_LENGTH = 1000;

/** The longest coach turn accepted back from the page. Escalations are the longest fixed text. */
const MAX_COACH_LENGTH = 4000;

/** The most messages a request may carry. Only the latest six reach the model (ADR-0015). */
export const MAX_HISTORY = 40;

/** The Gemini model used when COACH_MODEL isn't set (ADR-0003). */
export const DEFAULT_MODEL = "gemini-3.8-flash";

const Message = z.discriminatedUnion("role", [
	z.strictObject({
		role: z.literal("parent"),
		text: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
	}),
	z.strictObject({
		role: z.literal("coach"),
		text: z.string().trim().min(1).max(MAX_COACH_LENGTH),
	}),
]);

const History = z
	.array(Message)
	.min(1)
	.max(MAX_HISTORY)
	.refine((history) => history.at(-1)?.role === "parent", "The last message must be the parent's");

/**
 * Checks a conversation sent to the server. Server Functions can be called by a direct POST, not
 * only from the page, so nothing about the input can be trusted (ticket-0020). Returns null for
 * anything that isn't a well-formed conversation ending with the parent's message.
 */
export const parseHistory = (input: unknown): ChatMessage[] | null => {
	const result = History.safeParse(input);
	return result.success ? result.data : null;
};

/** The model to use, from the environment (`COACH_MODEL`), falling back to the default. */
export const modelId = (env: Readonly<Record<string, string | undefined>>): string =>
	env["COACH_MODEL"]?.trim() || DEFAULT_MODEL;
