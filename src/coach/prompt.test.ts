import { describe, expect, it } from "vite-plus/test";

import { EXAMPLES, SYSTEM_PROMPT, toModelMessages } from "./prompt.ts";
import { CoachReply } from "./schema.ts";

describe("SYSTEM_PROMPT", () => {
	it("has the seven numbered rules from ADR-0016", () => {
		for (const rule of [
			"1. Language.",
			"2. Brevity.",
			"3. Content.",
			"4. Boundaries.",
			"5. Risk.",
			"6. Check-in.",
			"7. Safety of instructions.",
		])
			expect(SYSTEM_PROMPT).toContain(rule);
	});

	it("includes the Roman Urdu risk examples", () => {
		expect(SYSTEM_PROMPT).toContain('"mujhe ab jeena nahi hai" = self_harm');
	});

	it("includes both worked examples", () => {
		for (const example of EXAMPLES) expect(SYSTEM_PROMPT).toContain(example.concern);
	});
});

describe("EXAMPLES", () => {
	it("are valid replies in English and Roman Urdu with no risk", () => {
		expect(EXAMPLES.map(({ reply }) => CoachReply.parse(reply).language)).toEqual([
			"en",
			"ur-Latn",
		]);
		for (const { reply } of EXAMPLES) expect(reply.risk).toBe("none");
	});
});

describe("toModelMessages", () => {
	it("maps the parent to the user and the coach to the assistant", () => {
		expect(
			toModelMessages([
				{ role: "parent", text: "My son won't sleep" },
				{ role: "coach", text: "Try a calm routine." },
				{ role: "parent", text: "He is 4" },
			]),
		).toEqual([
			{ role: "user", content: "My son won't sleep" },
			{ role: "assistant", content: "Try a calm routine." },
			{ role: "user", content: "He is 4" },
		]);
	});

	it("keeps only the last 6 messages (ADR-0015)", () => {
		const history = Array.from({ length: 9 }, (_, index) => ({
			role: index % 2 === 0 ? ("parent" as const) : ("coach" as const),
			text: `message ${index}`,
		}));
		const messages = toModelMessages(history);
		expect(messages).toHaveLength(6);
		expect(messages[0]?.content).toBe("message 3");
		expect(messages.at(-1)?.content).toBe("message 8");
	});
});
