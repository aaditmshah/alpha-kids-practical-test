import type { Language } from "./types.ts";

/**
 * Detects the language of a parent's message, for the fixed messages that don't come from the
 * model (escalations and the fail-safe). See ADR-0013 and wiki/research-roman-urdu.md.
 *
 * Returns "ur-Latn" when the message has at least 2 unambiguous Hindustani marker words (such as
 * "hai", "nahi", "mujhe", "kya", "bachcha") making up at least 15% of its words, or contains any
 * Arabic-script character. Otherwise returns "en". Ambiguous romanised words ("main", "me", "to",
 * "is", "par", "so") never count as markers. Use `normalize` from ./normalize.ts first.
 *
 * Aadit's exercise (ADR-0019): write the tests in language.test.ts first, from the cases in
 * wiki/ticket-0014-language-detection.md, then replace this body.
 */
export const detectLanguage = (message: string): Language => {
	throw new Error(`Not implemented yet: Aadit's exercise (ADR-0019). Message: ${message}`);
};
