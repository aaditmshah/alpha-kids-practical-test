import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import type { MockLanguageModelV4 } from "ai/test";
import { expect } from "vite-plus/test";

import { apiError, failingWith, replyingWith } from "#/coach/testing.ts";
import type { CoachTurn } from "#/coach/turn.ts";

import { send } from "./support/coach.ts";

const feature = await loadFeature("./coach-unavailable.feature");

/** A model for each way the feature says the model can fail. */
const FAILING_MODELS: Readonly<Record<string, () => MockLanguageModelV4>> = {
	"rate limited": () => failingWith(apiError(429)),
	"unavailable": () => failingWith(apiError(503)),
	"invalid output": () => replyingWith("Sorry, I can only answer in prose."),
};

describeFeature(feature, ({ ScenarioOutline }) => {
	ScenarioOutline(
		"A model failure shows the fail-safe message",
		({ Given, When, Then, And }, variables) => {
			let model: MockLanguageModelV4;
			let turn: CoachTurn;
			Given("the model fails because it is <failure>", () => {
				const failing = FAILING_MODELS[variables["failure"]];
				if (!failing) throw new Error(`Unknown failure: ${variables["failure"]}`);
				model = failing();
			});
			When('the parent sends "My son won\'t sleep"', async () => {
				turn = await send("My son won't sleep", model);
			});
			Then("the reply is the fail-safe message in English", () => {
				expect(turn.kind).toBe("failSafe");
				expect(turn.kind === "failSafe" && turn.message.language).toBe("en");
			});
			And("the fail-safe message tells the parent to call 112 if anyone is in danger", () => {
				expect(turn.kind === "failSafe" && turn.message.text).toContain(
					"If anyone is in danger, call 112.",
				);
			});
		},
	);
});
