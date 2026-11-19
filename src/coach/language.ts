import { normalize } from "./normalize.ts";
import type { Language } from "./types.ts";

/**
 * Common Hindustani words that are almost never English. Words that are also English ("main",
 * "me", "to", "is", "par", "so", "us", "hum", "din") are left out. The list can never be
 * exhaustive, so add words as real messages show they are missing.
 */
const MARKERS: ReadonlySet<string> = new Set([
	"hai",
	"hain",
	"nahi",
	"nahin",
	"nai",
	"mera",
	"meri",
	"mere",
	"mujhe",
	"kya",
	"kyun",
	"kyon",
	"aur",
	"bhi",
	"ko",
	"se",
	"ka",
	"ki",
	"ke",
	"raha",
	"rahi",
	"rahe",
	"tha",
	"thi",
	"bahut",
	"bohat",
	"abhi",
	"kaise",
	"kuch",
	"woh",
	"wo",
	"yeh",
	"ye",
	"karta",
	"karti",
	"karna",
	"bachcha",
	"bacha",
	"bachche",
	"beta",
	"beti",
	// Verbs, postpositions and helpers. Texting spellings ("nhi", "rha") are common in India.
	"ne",
	"pe",
	"tak",
	"ho",
	"hoon",
	"hun",
	"kar",
	"karo",
	"karoon",
	"karun",
	"karein",
	"karte",
	"gaya",
	"gayi",
	"gaye",
	"liya",
	"diya",
	"chahta",
	"chahti",
	"chahiye",
	"sakta",
	"sakti",
	"nhi",
	"rha",
	"rhi",
	"rhe",
	// Pronouns and possessives.
	"aap",
	"aapka",
	"aapki",
	"apna",
	"apni",
	"apne",
	"usko",
	"usne",
	"uska",
	"uski",
	"tum",
	"tumhara",
	"hamara",
	// Question words and connectives.
	"kab",
	"kahan",
	"kyu",
	"lekin",
	"kyunki",
	"agar",
	"toh",
	"jab",
	"phir",
	"bohot",
	"bahot",
]);

/**
 * Detects the language of a parent's message, for the fixed messages that don't come from the
 * model (escalations and the fail-safe). See ADR-0013 and wiki/research-roman-urdu.md.
 *
 * Returns "ur-Latn" when the message contains any Arabic-script character, or when, after
 * normalisation, at least 2 of its words are Hindustani markers and they make up at least 15% of
 * its words. Otherwise returns "en". Built by Aadit as a learning exercise (ADR-0019).
 */
export const detectLanguage = (message: string): Language => {
	if (/\p{Script_Extensions=Arabic}/u.test(message)) return "ur-Latn";
	const words = normalize(message).match(/[\p{L}\p{N}_]+(?:'[\p{L}\p{N}_]+)*/gu) ?? [];
	const markers = words.filter((word) => MARKERS.has(word)).length;
	return markers >= 2 && markers / words.length >= 0.15 ? "ur-Latn" : "en";
};
