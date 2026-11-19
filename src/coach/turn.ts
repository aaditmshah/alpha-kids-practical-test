import type { EscalationMessage, FailSafeMessage, ReferralMessage } from "./messages.ts";
import type { CoachReply } from "./schema.ts";
import type { Language } from "./types.ts";

/*
 * Coach turns and what the page needs from them. This module stays free of the AI SDK, so the chat
 * page can import it without shipping the model code to the browser.
 */

/** What the coach shows for one parent message (ADR-0015's display table). */
export type CoachTurn =
	| { readonly kind: "escalation"; readonly message: EscalationMessage }
	| { readonly kind: "referral"; readonly message: ReferralMessage }
	| { readonly kind: "failSafe"; readonly message: FailSafeMessage }
	| { readonly kind: "plan"; readonly reply: CoachReply };

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
