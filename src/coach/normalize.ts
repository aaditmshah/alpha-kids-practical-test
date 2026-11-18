/**
 * Prepares a parent's message for pattern matching: lowercase, straight apostrophes, runs of three
 * or more of the same letter collapsed to one ("nahiiii" → "nahi"), and single spaces. Doubled
 * letters stay, because Roman Urdu spells with them ("zyaadti", "bachche").
 */
export const normalize = (text: string): string =>
	text
		.toLowerCase()
		.replaceAll(/[‘’]/g, "'")
		.replaceAll(/(\p{L})\1{2,}/gu, "$1")
		.replaceAll(/\s+/g, " ")
		.trim();
