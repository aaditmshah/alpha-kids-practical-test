import type { LanguageModel } from "ai";

import { detectLanguage } from "./language.ts";
import { escalationMessage, failSafeMessage, referralMessage } from "./messages.ts";
import { askModel } from "./model.ts";
import { postcheck } from "./postcheck.ts";
import { precheck } from "./precheck.ts";
import type { ChatMessage } from "./prompt.ts";
import type { CoachTurn } from "./turn.ts";

/** What respond needs from outside: the model, so tests can pass a mock (ADR-0014). */
export interface CoachDeps {
	readonly model: LanguageModel;
}

/**
 * Replies to the parent's latest message, applying the safety layers in order (ADR-0011):
 *
 * 1. A crisis keyword escalates in the parent's language, and the model isn't asked.
 * 2. A model failure shows the fail-safe, also in the parent's language.
 * 3. A reply the model flags as risky escalates in the reply's language.
 * 4. A reply that mentions a dose or suggests a diagnosis becomes a referral to a doctor.
 * 5. Anything else is shown as the model's plan.
 */
export const respond = async (
	history: readonly ChatMessage[],
	{ model }: CoachDeps,
): Promise<CoachTurn> => {
	// Only the latest message is checked: an earlier crisis was escalated when it was sent.
	const concern = history.findLast((message) => message.role === "parent")?.text ?? "";
	const crisis = precheck(concern);
	if (crisis)
		return { kind: "escalation", message: escalationMessage(crisis, detectLanguage(concern)) };

	const result = await askModel(history, model);
	if (!result.ok) return { kind: "failSafe", message: failSafeMessage(detectLanguage(concern)) };

	const { reply } = result;
	if (reply.risk !== "none")
		return { kind: "escalation", message: escalationMessage(reply.risk, reply.language) };
	if (postcheck(reply)) return { kind: "referral", message: referralMessage(reply.language) };
	return { kind: "plan", reply };
};
