import { describe, expect, it } from "vite-plus/test";

import { respond, turnLanguage, turnToText } from "./coach.ts";
import type { CoachTurn } from "./coach.ts";
import { escalationMessage, failSafeMessage, referralMessage } from "./messages.ts";
import type { ChatMessage } from "./prompt.ts";
import { exampleReply, failingWith, replyingWith, replyingWithReply } from "./testing.ts";

const ENGLISH = exampleReply("en");
const ROMAN_URDU = exampleReply("ur-Latn");

const parent = (text: string): ChatMessage[] => [{ role: "parent", text }];

describe("respond", () => {
	it("escalates a crisis without asking the model", async () => {
		const model = replyingWithReply(ENGLISH);
		const turn = await respond(parent("My toddler swallowed poison"), { model });
		expect(turn).toEqual({ kind: "escalation", message: escalationMessage("emergency", "en") });
		expect(model.doGenerateCalls).toHaveLength(0);
	});

	it("writes a pre-check escalation in the parent's language", async () => {
		const model = replyingWithReply(ENGLISH);
		const turn = await respond(parent("Mera shohar mujhe roz maarta hai"), { model });
		expect(turn).toEqual({ kind: "escalation", message: escalationMessage("abuse", "ur-Latn") });
	});

	it("pre-checks only the parent's latest message", async () => {
		const history: ChatMessage[] = [
			{ role: "parent", text: "My toddler swallowed poison" },
			{ role: "coach", text: "This sounds serious." },
			{ role: "parent", text: "Thank you, the doctor says he's fine now" },
		];
		const turn = await respond(history, { model: replyingWithReply(ENGLISH) });
		expect(turn).toEqual({ kind: "plan", reply: ENGLISH });
	});

	it("escalates when the model flags a risk, in the reply's language", async () => {
		const model = replyingWithReply({ ...ROMAN_URDU, risk: "self_harm" });
		const turn = await respond(parent("Mujhse ab yeh sab nahi hota"), { model });
		expect(turn).toEqual({
			kind: "escalation",
			message: escalationMessage("self_harm", "ur-Latn"),
		});
	});

	it("replaces a reply that mentions a dose with a referral", async () => {
		const model = replyingWithReply({ ...ENGLISH, plan: ["Give him 5 ml of syrup.", "Rest."] });
		const turn = await respond(parent("My son coughs at night"), { model });
		expect(turn).toEqual({ kind: "referral", message: referralMessage("en") });
	});

	it("replaces a reply that suggests a diagnosis with a referral, in the reply's language", async () => {
		const model = replyingWithReply({ ...ROMAN_URDU, summary: "This sounds like ADHD." });
		const turn = await respond(parent("Mera beta ek jagah nahi baithta"), { model });
		expect(turn).toEqual({ kind: "referral", message: referralMessage("ur-Latn") });
	});

	it("shows the fail-safe in the parent's language when the model fails", async () => {
		const turn = await respond(parent("Meri beti sabziyan nahi khati, kya karoon?"), {
			model: failingWith(new Error("network down")),
		});
		expect(turn).toEqual({ kind: "failSafe", message: failSafeMessage("ur-Latn") });
	});

	it("shows the fail-safe when the model's output doesn't fit the schema", async () => {
		const turn = await respond(parent("My son won't sleep"), { model: replyingWith("not json") });
		expect(turn).toEqual({ kind: "failSafe", message: failSafeMessage("en") });
	});

	it("passes an ordinary plan through", async () => {
		const turn = await respond(parent("My 3-year-old fights bedtime"), {
			model: replyingWithReply(ENGLISH),
		});
		expect(turn).toEqual({ kind: "plan", reply: ENGLISH });
	});
});

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
