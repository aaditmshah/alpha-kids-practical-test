import type { MockLanguageModelV4 } from "ai/test";

import { respond } from "#/coach/coach.ts";
import { exampleReply } from "#/coach/testing.ts";
import type { CoachTurn } from "#/coach/turn.ts";
import type { Language } from "#/coach/types.ts";

/** Shared helpers for the respond-level Gherkin specs (ADR-0017). */

/** The system prompt's worked examples double as ordinary model replies. */
export const ENGLISH_PLAN = exampleReply("en");
export const ROMAN_URDU_PLAN = exampleReply("ur-Latn");

/** The language names the feature files use. */
export const LANGUAGES: Readonly<Record<string, Language>> = {
	"English": "en",
	"Roman Urdu": "ur-Latn",
};

/** Sends one concern, as the parent's first message, to a coach backed by the given model. */
export const send = (concern: string, model: MockLanguageModelV4): Promise<CoachTurn> =>
	respond([{ role: "parent", text: concern }], { model });
