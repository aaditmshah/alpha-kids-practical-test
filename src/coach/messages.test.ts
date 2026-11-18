import { describe, expect, it } from "vite-plus/test";

import { HELPLINES } from "./helplines.ts";
import { escalationMessage, failSafeMessage, referralMessage } from "./messages.ts";
import type { Language, Risk } from "./types.ts";

const RISKS: readonly Risk[] = ["emergency", "abuse", "self_harm"];
const LANGUAGES: readonly Language[] = ["en", "ur-Latn"];
const everyCombination = RISKS.flatMap((risk) =>
	LANGUAGES.map((language) => [risk, language] as const),
);

/** Every visible line of a message, so tests can search its text. */
const allText = (message: object): string => JSON.stringify(message);

describe("HELPLINES", () => {
	it("lists the four verified Indian numbers from ADR-0012", () => {
		expect(Object.values(HELPLINES).map(({ number }) => number)).toEqual([
			"112",
			"1098",
			"181",
			"14416",
		]);
	});
});

describe("escalationMessage", () => {
	it.each(everyCombination)(
		"%s in %s tells the parent to call 112 in immediate danger",
		(risk, language) => {
			const message = escalationMessage(risk, language);
			expect(message.immediateDanger).toContain("112");
			expect(message.helplines.map(({ number }) => number)).toContain("112");
			expect(message.trustedPerson).not.toBe("");
			expect(message.checkIn).toMatch(/\?$/);
		},
	);

	it.each(LANGUAGES)(
		"abuse in %s lists the child helpline 1098 and the women helpline 181",
		(language) => {
			const numbers = escalationMessage("abuse", language).helplines.map(({ number }) => number);
			expect(numbers).toEqual(expect.arrayContaining(["1098", "181"]));
		},
	);

	it.each(LANGUAGES)("self-harm in %s lists Tele MANAS 14416", (language) => {
		const numbers = escalationMessage("self_harm", language).helplines.map(({ number }) => number);
		expect(numbers).toContain("14416");
	});

	it("uses the English wording", () => {
		const message = escalationMessage("self_harm", "en");
		expect(message.title).toBe("This sounds serious.");
		expect(message.checkIn).toBe("Are you and your child safe right now?");
	});

	it("uses the Roman Urdu wording Aadit approved", () => {
		const message = escalationMessage("emergency", "ur-Latn");
		expect(message.title).toBe("Yeh sangeen baat lagti hai.");
		expect(message.immediateDanger).toBe(
			"Agar kisi ki jaan ko abhi khatra hai, to foran 112 par call karein.",
		);
		expect(message.checkIn).toBe("Kya aap aur aapka bachcha abhi mehfooz hain?");
	});
});

describe("referralMessage", () => {
	it.each(LANGUAGES)(
		"in %s sends the parent to the child's doctor and asks a check-in question",
		(language) => {
			const message = referralMessage(language);
			expect(message.text).toMatch(/doctor/i);
			expect(message.checkIn).toMatch(/\?$/);
		},
	);
});

describe("failSafeMessage", () => {
	it.each(LANGUAGES)("in %s still says to call 112 if anyone is in danger", (language) => {
		expect(failSafeMessage(language).text).toContain("112");
	});
});

describe("Roman Urdu text", () => {
	it("never gives the coach a gender with first-person verbs (ADR-0013)", () => {
		const romanUrdu = [
			...RISKS.map((risk) => escalationMessage(risk, "ur-Latn")),
			referralMessage("ur-Latn"),
			failSafeMessage("ur-Latn"),
		];
		for (const message of romanUrdu)
			expect(allText(message)).not.toMatch(
				/\bmain \w+ (samjha|samjhi|saka|saki|gaya|gayi)\b|\bmain (samjha|samjhi)\b/,
			);
	});
});
