import { describe, expect, it } from "vite-plus/test";

import { CoachReply } from "./schema.ts";

const valid = {
	language: "en",
	risk: "none",
	summary: "Bedtime battles at three are common and usually about control.",
	plan: ["Start the same 20-minute routine every night.", "Offer two choices, like which pyjamas."],
	checkIn: { kind: "time", text: "Try this for 3 nights, then tell me how bedtime went." },
	referral: null,
};

describe("CoachReply", () => {
	it("accepts a well-formed reply", () => {
		expect(CoachReply.parse(valid)).toEqual(valid);
	});

	it("accepts a referral line and Roman Urdu", () => {
		const reply = {
			...valid,
			language: "ur-Latn",
			referral: "Apne bachche ke doctor se baat karein.",
		};
		expect(CoachReply.safeParse(reply).success).toBe(true);
	});

	it.each([
		["a missing summary", { ...valid, summary: undefined }],
		["one plan step", { ...valid, plan: ["Only one step."] }],
		["five plan steps", { ...valid, plan: ["a", "b", "c", "d", "e"] }],
		["an unknown risk", { ...valid, risk: "danger" }],
		["an unknown language", { ...valid, language: "hi" }],
		["an unknown check-in kind", { ...valid, checkIn: { kind: "email", text: "Write to me." } }],
		["a summary over 240 characters", { ...valid, summary: "x".repeat(241) }],
		["a plan step over 200 characters", { ...valid, plan: ["x".repeat(201), "Short step."] }],
		[
			"a check-in over 200 characters",
			{ ...valid, checkIn: { kind: "question", text: "x".repeat(201) } },
		],
		["a missing referral (it must be null, not absent)", { ...valid, referral: undefined }],
	])("rejects %s", (_, reply) => {
		expect(CoachReply.safeParse(reply).success).toBe(false);
	});
});
