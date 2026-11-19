import type { LanguageModel } from "ai";

import { detectLanguage } from "./language.ts";
import type { EscalationMessage, FailSafeMessage, ReferralMessage } from "./messages.ts";
import { escalationMessage, failSafeMessage, referralMessage } from "./messages.ts";
import { askModel } from "./model.ts";
import { postcheck } from "./postcheck.ts";
import { precheck } from "./precheck.ts";
import type { ChatMessage } from "./prompt.ts";
import type { CoachReply } from "./schema.ts";
import type { Language } from "./types.ts";

/** What the coach shows for one parent message (ADR-0015's display table). */
export type CoachTurn =
	| { readonly kind: "escalation"; readonly message: EscalationMessage }
	| { readonly kind: "referral"; readonly message: ReferralMessage }
	| { readonly kind: "failSafe"; readonly message: FailSafeMessage }
	| { readonly kind: "plan"; readonly reply: CoachReply };

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

/** The language a turn is written in, for the page's `lang` attribute (R10). */
export const turnLanguage = (turn: CoachTurn): Language =>
	turn.kind === "plan" ? turn.reply.language : turn.message.language;

/**
 * A turn as plain text, which is how coach turns go back to the model in the history (ADR-0015).
 * The model then sees what the parent saw, including fixed messages it never wrote.
 */
export const turnToText = (turn: CoachTurn): string => {
	switch (turn.kind) {
		case "plan": {
			const { summary, plan, referral, checkIn } = turn.reply;
			const steps = plan.map((step, index) => `${index + 1}. ${step}`);
			return [summary, ...steps, ...(referral ? [referral] : []), checkIn.text].join("\n");
		}
		case "escalation": {
			const { message } = turn;
			return [
				message.title,
				message.immediateDanger,
				...message.guidance,
				...message.helplines.map((helpline) => `${helpline.name}: ${helpline.number}`),
				message.trustedPerson,
				message.checkIn,
			].join("\n");
		}
		case "referral":
			return `${turn.message.text}\n${turn.message.checkIn}`;
	}
	// Only the fail-safe is left.
	return turn.message.text;
};
