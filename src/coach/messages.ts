import { HELPLINES, type Helpline } from "./helplines.ts";
import type { Language, Risk } from "./types.ts";

/**
 * The fixed messages the coach shows instead of the model's text (ADR-0011, ADR-0015). They are
 * written once, never generated. The Roman Urdu wording is the version Aadit approved
 * (wiki/research-roman-urdu.md, ADR-0015), and none of it gives the coach a gender (ADR-0013).
 */

/** What the coach shows when a parent describes an emergency, abuse or self-harm. */
export interface EscalationMessage {
	readonly risk: Risk;
	readonly language: Language;
	readonly title: string;
	readonly immediateDanger: string;
	readonly guidance: readonly string[];
	readonly helplines: readonly Helpline[];
	readonly trustedPerson: string;
	readonly checkIn: string;
	readonly ifMisread: string;
}

/** What the coach shows when the model's reply strays into doses or a diagnosis. */
export interface ReferralMessage {
	readonly language: Language;
	readonly text: string;
	readonly checkIn: string;
}

/** What the coach shows when the model can't answer. */
export interface FailSafeMessage {
	readonly language: Language;
	readonly text: string;
}

interface Wording {
	readonly title: string;
	readonly immediateDanger: string;
	readonly guidance: Readonly<Record<Risk, readonly string[]>>;
	readonly trustedPerson: string;
	readonly checkIn: string;
	readonly ifMisread: string;
	readonly referral: string;
	readonly referralCheckIn: string;
	readonly failSafe: string;
}

const WORDING: Readonly<Record<Language, Wording>> = {
	"en": {
		title: "This sounds serious.",
		immediateDanger: "If anyone is in immediate danger, call 112 now.",
		guidance: {
			emergency: [
				"Call 112 now for an ambulance or the police. Stay with your child until help arrives.",
			],
			abuse: [
				"If a child is being hurt or is not safe, call Child Helpline 1098. It's free and linked to 112.",
				"If you are a woman facing violence, call Women Helpline 181, any time. Anyone in danger can call 112.",
			],
			self_harm: [
				"You don't have to handle this alone. Call Tele MANAS on 14416. It's free, 24x7, in 20 Indian languages.",
			],
		},
		trustedPerson: "Please also reach out to someone you trust right now.",
		checkIn: "Are you and your child safe right now?",
		ifMisread: "If it's something else, tell me a little more.",
		referral:
			"This needs a doctor's advice, so medicines, doses or a diagnosis can't come from here. Please talk to your child's doctor.",
		referralCheckIn: "What would help most before you see the doctor?",
		failSafe:
			"Sorry, a reply isn't possible right now. Please try again in a minute. If anyone is in danger, call 112.",
	},
	"ur-Latn": {
		title: "Yeh sangeen baat lagti hai.",
		immediateDanger: "Agar kisi ki jaan ko abhi khatra hai, to foran 112 par call karein.",
		guidance: {
			emergency: [
				"Abhi 112 par call karein, ambulance ya police ke liye. Madad aane tak apne bachche ke saath rahein.",
			],
			abuse: [
				"Agar kisi bachche ko nuksan pahunchaya ja raha hai ya woh mehfooz nahi hai, to Child Helpline 1098 par call karein. Yeh muft hai aur 112 se juda hua hai.",
				"Agar aap aurat hain aur aapke saath maar-peet ya zulm ho raha hai, to Women Helpline 181 par kabhi bhi call karein. Khatre mein koi bhi 112 par call kar sakta hai.",
			],
			self_harm: [
				"Aapko yeh akele nahi sambhaalna. Tele MANAS 14416 par call karein. Yeh muft hai, 24 ghante, Bharat ki 20 zabaanon mein.",
			],
		},
		trustedPerson: "Abhi kisi aise insaan se bhi baat karein jis par aap bharosa karte hain.",
		checkIn: "Kya aap aur aapka bachcha abhi mehfooz hain?",
		ifMisread: "Agar baat kuch aur hai, to mujhe thoda aur batayein.",
		referral:
			"Is ke liye doctor ki salah zaroori hai, isliye dawai, dose ya bimari ka naam yahan se nahi bataya ja sakta. Apne bachche ke doctor se baat karein.",
		referralCheckIn: "Doctor se milne se pehle aapko kis cheez mein sabse zyada madad chahiye?",
		failSafe:
			"Maaf kijiye, abhi jawab dena mumkin nahi hua. Ek minute baad dobara koshish karein. Agar koi khatre mein hai, to 112 par call karein.",
	},
};

const HELPLINES_FOR: Readonly<Record<Risk, readonly Helpline[]>> = {
	emergency: [HELPLINES.emergency],
	abuse: [HELPLINES.child, HELPLINES.women, HELPLINES.emergency],
	self_harm: [HELPLINES.mentalHealth, HELPLINES.emergency],
};

/** The escalation for a crisis, in the parent's language. */
export const escalationMessage = (risk: Risk, language: Language): EscalationMessage => {
	const wording = WORDING[language];
	return {
		risk,
		language,
		title: wording.title,
		immediateDanger: wording.immediateDanger,
		guidance: wording.guidance[risk],
		helplines: HELPLINES_FOR[risk],
		trustedPerson: wording.trustedPerson,
		checkIn: wording.checkIn,
		ifMisread: wording.ifMisread,
	};
};

/** The referral to a doctor that replaces a reply mentioning doses or a diagnosis. */
export const referralMessage = (language: Language): ReferralMessage => ({
	language,
	text: WORDING[language].referral,
	checkIn: WORDING[language].referralCheckIn,
});

/** The message shown when the model can't answer. It still points to 112. */
export const failSafeMessage = (language: Language): FailSafeMessage => ({
	language,
	text: WORDING[language].failSafe,
});
