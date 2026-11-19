import { describe, expect, it } from "vite-plus/test";

import { postcheck } from "./postcheck";
import { EXAMPLES } from "./prompt";
import type { CoachReply } from "./schema";

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
});
