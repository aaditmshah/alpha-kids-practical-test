import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import type { MockLanguageModelV4 } from "ai/test";
import { expect } from "vite-plus/test";

import { replyingWithReply } from "#/coach/testing.ts";
import type { CoachTurn } from "#/coach/turn.ts";

import { ENGLISH_PLAN, ROMAN_URDU_PLAN, send } from "./support/coach.ts";

const feature = await loadFeature("./coaching-plan.feature");

/** The plan inside a turn, failing the step when the turn is anything else. */
const planOf = (turn: CoachTurn | undefined) => {
	if (turn?.kind !== "plan") throw new Error(`Expected a plan, got ${turn?.kind}`);
	return turn.reply;
};

describeFeature(
	feature,
	({ Scenario, ScenarioOutline }) => {
		Scenario("The coach replies with a structured plan", ({ Given, When, Then, And }) => {
			let model: MockLanguageModelV4;
			let turn: CoachTurn | undefined;
			Given("the model replies with an ordinary plan", () => {
				model = replyingWithReply(ENGLISH_PLAN);
			});
			When('the parent sends "My 3-year-old refuses to sleep at bedtime"', async () => {
				turn = await send("My 3-year-old refuses to sleep at bedtime", model);
			});
			Then("the reply has a one-sentence summary", () => {
				expect(planOf(turn).summary).toMatch(/^[^.!?]+[.!?]$/);
			});
			And("the reply has between 2 and 4 steps", () => {
				expect(planOf(turn).plan.length).toBeGreaterThanOrEqual(2);
				expect(planOf(turn).plan.length).toBeLessThanOrEqual(4);
			});
			And("the reply ends with a check-in", () => {
				expect(planOf(turn).checkIn.text).not.toBe("");
			});
		});

		ScenarioOutline(
			"The check-in is a question or a time to come back",
			({ Given, When, Then }, variables) => {
				let model: MockLanguageModelV4;
				let turn: CoachTurn | undefined;
				Given("the model's check-in is a <kind>", () => {
					// The English example checks in with a time, and the Roman Urdu one with a question.
					const reply = variables["kind"] === "time" ? ENGLISH_PLAN : ROMAN_URDU_PLAN;
					model = replyingWithReply(reply);
				});
				When('the parent sends "My son won\'t brush his teeth"', async () => {
					turn = await send("My son won't brush his teeth", model);
				});
				Then("the reply ends with a check-in that is a <kind>", () => {
					expect(planOf(turn).checkIn.kind).toBe(variables["kind"]);
				});
			},
		);
	},
	{ excludeTags: ["component"] },
);
