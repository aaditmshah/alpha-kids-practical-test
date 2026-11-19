import { describe, expect, it } from "vite-plus/test";

import { escalationMessage, failSafeMessage, referralMessage } from "./messages.ts";
import { exampleReply } from "./testing.ts";
import type { CoachTurn } from "./turn.ts";
import { turnLanguage, turnToText } from "./turn.ts";

const ENGLISH = exampleReply("en");
const ROMAN_URDU = exampleReply("ur-Latn");

describe("turnLanguage", () => {
	it.each<[CoachTurn, string]>([
		[{ kind: "plan", reply: ROMAN_URDU }, "ur-Latn"],
		[{ kind: "escalation", message: escalationMessage("abuse", "ur-Latn") }, "ur-Latn"],
		[{ kind: "referral", message: referralMessage("en") }, "en"],
		[{ kind: "failSafe", message: failSafeMessage("ur-Latn") }, "ur-Latn"],
	])("reads the language of a %o turn", (turn, language) => {
		expect(turnLanguage(turn)).toBe(language);
	});
});

describe("turnToText", () => {
	it("renders a plan as its summary, numbered steps and check-in", () => {
		expect(turnToText({ kind: "plan", reply: ENGLISH })).toBe(
			[
				ENGLISH.summary,
				`1. ${ENGLISH.plan[0]}`,
				`2. ${ENGLISH.plan[1]}`,
				`3. ${ENGLISH.plan[2]}`,
				ENGLISH.checkIn.text,
			].join("\n"),
		);
	});

	it("includes a plan's referral before the check-in", () => {
		const reply = { ...ENGLISH, plan: ["Rest."], referral: "See a paediatrician." };
		expect(turnToText({ kind: "plan", reply })).toBe(
			[ENGLISH.summary, "1. Rest.", "See a paediatrician.", ENGLISH.checkIn.text].join("\n"),
		);
	});

	it("renders an escalation with its helplines", () => {
		const text = turnToText({ kind: "escalation", message: escalationMessage("abuse", "en") });
		expect(text).toContain("This sounds serious.");
		expect(text).toContain("Child Helpline: 1098");
		expect(text).toContain("Women Helpline: 181");
		expect(text).toContain("Are you and your child safe right now?");
	});

	it("renders a referral as its text and check-in", () => {
		const message = referralMessage("en");
		expect(turnToText({ kind: "referral", message })).toBe(`${message.text}\n${message.checkIn}`);
	});

	it("renders the fail-safe as its text", () => {
		const message = failSafeMessage("en");
		expect(turnToText({ kind: "failSafe", message })).toBe(message.text);
	});
});
