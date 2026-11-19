import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import type { MockLanguageModelV4 } from "ai/test";
import { expect } from "vite-plus/test";

import type { CoachTurn } from "#/coach/coach.ts";
import { turnLanguage } from "#/coach/coach.ts";
import { failingWith, replyingWithReply } from "#/coach/testing.ts";

import { ENGLISH_PLAN, LANGUAGES, ROMAN_URDU_PLAN, send } from "./support/coach.ts";

const feature = await loadFeature("./language.feature");

describeFeature(feature, ({ ScenarioOutline }) => {
	ScenarioOutline(
		"The coach's reply keeps the parent's language",
		({ Given, When, Then }, variables) => {
			let model: MockLanguageModelV4;
			let turn: CoachTurn;
			Given("the model replies in <language>", () => {
				const reply = LANGUAGES[variables["language"]] === "en" ? ENGLISH_PLAN : ROMAN_URDU_PLAN;
				model = replyingWithReply(reply);
			});
			When('the parent sends "<concern>"', async () => {
				turn = await send(variables["concern"], model);
			});
			Then("the reply is in <language>", () => {
				expect(turnLanguage(turn)).toBe(LANGUAGES[variables["language"]]);
			});
		},
	);

	ScenarioOutline(
		"Fixed messages follow the parent's language",
		({ Given, When, Then }, variables) => {
			let model: MockLanguageModelV4;
			let turn: CoachTurn;
			Given("the model is unavailable", () => {
				model = failingWith(new Error("network down"));
			});
			When('the parent sends "<concern>"', async () => {
				turn = await send(variables["concern"], model);
			});
			Then("the reply is in <language>", () => {
				expect(turn.kind).toBe("failSafe");
				expect(turnLanguage(turn)).toBe(LANGUAGES[variables["language"]]);
			});
		},
	);
});
