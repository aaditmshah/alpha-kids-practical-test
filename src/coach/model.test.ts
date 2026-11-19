import { describe, expect, it } from "vite-plus/test";

import { askModel } from "./model.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";
import { apiError, failingWith, hanging, replyingWith } from "./testing.ts";

const REPLY = {
	language: "en",
	risk: "none",
	summary: "Night-time fears are common at four.",
	plan: ["Keep a short, calm bedtime routine.", "Leave a small night light on."],
	checkIn: { kind: "question", text: "What happens just before he gets scared?" },
	referral: null,
};

const HISTORY = [{ role: "parent" as const, text: "My son is scared of the dark" }];

describe("askModel", () => {
	it("returns the model's reply when it matches the schema", async () => {
		expect(await askModel(HISTORY, replyingWith(JSON.stringify(REPLY)))).toEqual({
			ok: true,
			reply: REPLY,
		});
	});

	it("sends the system prompt as instructions and the parent's text as a user message", async () => {
		const model = replyingWith(JSON.stringify(REPLY));
		await askModel(HISTORY, model);
		const [call] = model.doGenerateCalls;
		expect(call?.prompt[0]).toEqual({ role: "system", content: SYSTEM_PROMPT });
		expect(call?.prompt.at(-1)).toEqual({
			role: "user",
			content: [{ type: "text", text: "My son is scared of the dark" }],
		});
		expect(call?.temperature).toBe(0.3);
	});

	it.each([
		["not JSON", "Sorry, I can't help with that."],
		["JSON that breaks the schema", JSON.stringify({ ...REPLY, plan: ["Only one step."] })],
	])("reports invalid output when the reply is %s", async (_, text) => {
		expect(await askModel(HISTORY, replyingWith(text))).toEqual({
			ok: false,
			failure: "invalid_output",
		});
	});

	it("gives up on a model that doesn't answer in time", async () => {
		expect(await askModel(HISTORY, hanging(), { timeoutMs: 50 })).toEqual({
			ok: false,
			failure: "unavailable",
		});
	});

	it("reports a rate limit when Gemini answers 429", async () => {
		expect(await askModel(HISTORY, failingWith(apiError(429)))).toEqual({
			ok: false,
			failure: "rate_limited",
		});
	});

	it.each([
		["a server error", apiError(503)],
		["a refused request", apiError(400)],
		["a network failure", new TypeError("fetch failed")],
	])("reports the model unavailable after %s", async (_, error) => {
		expect(await askModel(HISTORY, failingWith(error))).toEqual({
			ok: false,
			failure: "unavailable",
		});
	});
});
