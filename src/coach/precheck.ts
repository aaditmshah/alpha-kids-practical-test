import { normalize } from "./normalize.ts";
import type { Risk } from "./types.ts";

/**
 * Crisis phrases in English and Roman Urdu, checked before any model call (ADR-0011). They are
 * phrase-level on purpose: single words like "die" or "hit" would escalate everyday concerns.
 * Roman Urdu patterns allow spelling variants and both gendered verb forms (ADR-0013).
 */
const PATTERNS: ReadonlyArray<readonly [Risk, readonly RegExp[]]> = [
	[
		"emergency",
		[
			/\b(not|stopped|isn't|is not) breathing\b/,
			/\bcan'?t breathe\b/,
			/\b(unconscious|unresponsive|overdosed?|seizures?)\b/,
			/\bswallowed (poison|bleach|pills|tablets|medicine|a battery|batteries)\b/,
			/\bpoison(ed|ing)?\b/,
			/\b(went|is|has gone) missing\b/,
			/\bwon'?t stop bleeding\b/,
			/\bsaa?ns nahi?n? (le|aa)/,
			/\bbehosh\b/,
			/\bz[ae]h[ae]r\b/,
			/\bdaura (pad|aa)/,
			/\bkhoon (beh|nikal)/,
			/\b(gum|lapata) ho (gaya|gayi)\b/,
		],
	],
	[
		"self_harm",
		[
			/\bsuicid(e|al)\b/,
			/\bkill(ing)? (my|him|her|them)sel(f|ves)\b/,
			/\b(want|wants|wanted) to die\b/,
			/\bend (my|his|her|their) (own )?life\b/,
			/\bself[- ]?harm/,
			/\b(cutting|hurting|harming) (my|him|her|them)sel(f|ves)\b/,
			/\bkhud ?k[ua]sh[iy]\b/,
			/\bmar(na|ne|ni) (chahta|chahti|chahte)\b/,
			/\bjaan de ?(na|ni|dunga|dungi|doonga|doongi)\b/,
			/\bzind(a|agi) (khatam|nahi rehna)\b/,
			/\bapne aap ko (nuksan|nuqsan|nuksaan|chot)\b/,
		],
	],
	[
		"abuse",
		[
			/\bsexually abus/,
			/\bmolest/,
			/\btouched (him|her|my \w+) inappropriately\b/,
			/\b(husband|wife|partner|boyfriend|girlfriend|in-law)\b.*\b(hits|beats|slaps|chokes|abuses)\b/,
			/\bbeats (my|our) (child|children|kids|son|daughter|baby)\b/,
			/\b(jinsi|sexual) (ziyadti|zyadti|zyaadti)\b/,
			/\bga?lat (tareeq?e|tarike) se chh?u/,
			/\b(shohar|pati|husband)\b.*\bmaar(ta|te|ti)\b/,
		],
	],
];

/**
 * Returns the crisis a parent's message describes, or null. When a message describes more than
 * one, the most urgent wins: an emergency, then self-harm, then abuse.
 */
export const precheck = (message: string): Risk | null => {
	const text = normalize(message);
	const match = PATTERNS.find(([, patterns]) => patterns.some((pattern) => pattern.test(text)));
	return match?.[0] ?? null;
};
