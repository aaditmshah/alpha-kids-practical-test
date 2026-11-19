"use server";

import { google } from "@ai-sdk/google";

import type { CoachTurn } from "#/coach/coach.ts";
import { respond } from "#/coach/coach.ts";
import { modelId, parseHistory } from "#/coach/input.ts";
import { failSafeMessage } from "#/coach/messages.ts";

/**
 * The Server Function the chat page calls with the conversation so far (ticket-0020). It runs only
 * on the server, so the Gemini API key never reaches the browser. Input that isn't a valid
 * conversation gets the fail-safe rather than an error: the page never sends it, and a direct POST
 * learns nothing from the reply.
 */
export async function askCoach(history: unknown): Promise<CoachTurn> {
	const messages = parseHistory(history);
	if (!messages) return { kind: "failSafe", message: failSafeMessage("en") };
	return respond(messages, { model: google(modelId(process.env)) });
}
