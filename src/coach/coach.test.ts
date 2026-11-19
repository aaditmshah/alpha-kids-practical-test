import { describe, expect, it } from "vite-plus/test";

import { respond } from "./coach.ts";
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
