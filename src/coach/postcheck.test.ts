import { describe, expect, it } from "vite-plus/test";

import { postcheck } from "./postcheck.ts";
import { EXAMPLES } from "./prompt.ts";
import type { CoachReply } from "./schema.ts";

const DOSE_EXAMPLES: CoachReply[] = [
	{
		language: "en",
		risk: "none",
		summary: "Night wakeups are common.",
		plan: [
			"Your baby has a sleep cycle of 45 minutes.",
			"Give them 5 drops of cough syrup before bedtime for a good sleep.",
		],
		checkIn: { kind: "time", text: "Try this for 3 nights, then tell me how bedtime went." },
		referral: null,
	},
];

const DIAGNOSIS_EXAMPLES: CoachReply[] = [
	{
		language: "en",
		risk: "none",
		summary: "Playing video games all day is concerning.",
		plan: [
			"Zoning out while doing homework and playing video games all day is worrisome.",
			"This sounds like ADHD. You should get him checked out by a doctor.",
		],
		checkIn: { kind: "time", text: "Let me know what the doctor says ASAP." },
		referral: null,
	},
];

const ECHO_EXAMPLES: CoachReply[] = [
	{
		language: "en",
		risk: "none",
		summary: "Make chores fun for your child.",
		plan: [
			"Since your son has ADHD, don't force him to do chores.",
			"Instead, make the chores fun for him. For example, make it a competition.",
		],
		checkIn: { kind: "time", text: "Try this and then let me know how it goes." },
		referral: null,
	},
];

/** A clean reply with one field changed, to place a phrase anywhere in it. */
const replyWith = (patch: Partial<CoachReply>): CoachReply => ({
	language: "en",
	risk: "none",
	summary: "Bedtime can be hard at this age.",
	plan: ["Keep the same routine every night.", "Read one short story together."],
	checkIn: { kind: "question", text: "What time does bedtime start?" },
	referral: null,
	...patch,
});

describe("postcheck", () => {
	it("should return null for replies which don't mention any dose or diagnosis", () => {
		expect(EXAMPLES.map((example) => postcheck(example.reply))).toStrictEqual(
			EXAMPLES.map(() => null),
		);
	});

	it("should return dose for replies which mention a dose", () => {
		expect(DOSE_EXAMPLES.map(postcheck)).toStrictEqual(DOSE_EXAMPLES.map(() => "dose"));
	});

	it("should return diagnosis for replies which mention a diagnosis", () => {
		expect(DIAGNOSIS_EXAMPLES.map(postcheck)).toStrictEqual(
			DIAGNOSIS_EXAMPLES.map(() => "diagnosis"),
		);
	});

	it("should return null for replies which echo a parent's diagnosis", () => {
		expect(ECHO_EXAMPLES.map(postcheck)).toStrictEqual(ECHO_EXAMPLES.map(() => null));
	});

	it.each([
		"Give him 5 ml at night.",
		"Try 2 tablets.",
		"10mg before bed.",
		"Use 2.5 mL of syrup.",
		"1 goli raat ko dein.",
	])("should return dose for %j", (step) => {
		expect(postcheck(replyWith({ plan: [step, "Stay calm."] }))).toBe("dose");
	});

	it.each([
		"This sounds like ADHD.",
		"She might have autism.",
		"He probably has dyslexia.",
		"These are signs of depression.",
		"He may have ADHD.",
		"She could have anxiety disorder.",
		"It could be OCD.",
	])("should return diagnosis for %j", (step) => {
		expect(postcheck(replyWith({ plan: [step, "Stay calm."] }))).toBe("diagnosis");
	});

	it.each([
		["the summary", { summary: "This sounds like ADHD." }],
		["the check-in", { checkIn: { kind: "question" as const, text: "Did the 5 ml help?" } }],
		["the referral", { referral: "Ask the doctor about 10mg." }],
	])("should check %s, not just the plan", (_, patch) => {
		expect(postcheck(replyWith(patch))).not.toBeNull();
	});

	it("should report a dose before a diagnosis when a reply has both", () => {
		expect(
			postcheck(replyWith({ summary: "This sounds like ADHD.", plan: ["Give 5 ml.", "Rest."] })),
		).toBe("dose");
	});
});
