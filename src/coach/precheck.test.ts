import { describe, expect, it } from "vite-plus/test";

import { precheck } from "./precheck.ts";

describe("precheck", () => {
	it.each([
		// Emergencies
		["My toddler swallowed poison", "emergency"],
		["My baby is not breathing", "emergency"],
		["My son is unconscious", "emergency"],
		["She is having a seizure", "emergency"],
		["Our daughter went missing at the mall", "emergency"],
		["Bachche ne zehar kha liya", "emergency"],
		["Meri beti behosh ho gayi hai", "emergency"],
		["Mera beta saans nahi le raha", "emergency"],
		["Usko daura pad raha hai", "emergency"],
		["Mera beta lapata ho gaya", "emergency"],
		// Self-harm, the child's or the parent's
		["My son keeps talking about suicide", "self_harm"],
		["I want to kill myself", "self_harm"],
		["My daughter says she wants to die", "self_harm"],
		["He has been cutting himself", "self_harm"],
		["Mera beta khudkushi ki baatein kar raha hai", "self_harm"],
		["Main marna chahti hoon", "self_harm"],
		["Woh kehta hai jaan de dunga", "self_harm"],
		["Meri beti apne aap ko nuksan pahunchati hai", "self_harm"],
		// Abuse of a child or of the parent
		["My husband hits me every day", "abuse"],
		["My partner beats my children", "abuse"],
		["Someone touched my daughter inappropriately", "abuse"],
		["My son was sexually abused", "abuse"],
		["Mera shohar mujhe roz maarta hai", "abuse"],
		["Uske saath jinsi ziyadti hui", "abuse"],
	])("%s → %s", (message, risk) => {
		expect(precheck(message)).toBe(risk);
	});

	it.each([
		"My 3-year-old refuses to sleep at bedtime",
		"I'm dying to know how to stop the whining",
		"My son keeps hitting his little sister",
		"My toddler bites and hits me when he is angry",
		"Bhai apni behen ko maarta hai, kya karoon?",
		"Mera beta screen time pe bohat tantrum karta hai",
		"My daughter is killing it at school this year",
	])("%s → no escalation", (message) => {
		expect(precheck(message)).toBeNull();
	});

	it("tolerates spelling variants and shouting", () => {
		expect(precheck("KHUD KASHI")).toBe("self_harm");
		expect(precheck("bachche ne zahar kha liya!!!")).toBe("emergency");
		expect(precheck("he is not breathinggg")).toBe("emergency");
	});

	it("prefers an emergency when a message mentions several crises", () => {
		expect(precheck("My husband beat me and now our son is unconscious")).toBe("emergency");
	});
});
