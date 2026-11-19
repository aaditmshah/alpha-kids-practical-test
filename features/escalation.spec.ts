import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import type { MockLanguageModelV4 } from "ai/test";
import { expect } from "vite-plus/test";

import { replyingWithReply } from "#/coach/testing.ts";
import type { CoachTurn } from "#/coach/turn.ts";

import { ENGLISH_PLAN, LANGUAGES, send } from "./support/coach.ts";

const feature = await loadFeature("./escalation.feature");

/** The escalation inside a turn, failing the step when the turn is anything else. */
const escalationOf = (turn: CoachTurn | undefined) => {
	if (turn?.kind !== "escalation") throw new Error(`Expected an escalation, got ${turn?.kind}`);
	return turn.message;
};

describeFeature(
	feature,
	({ Scenario, ScenarioOutline }) => {
		ScenarioOutline(
			"Crisis words escalate without asking the model",
			({ When, Then, And }, variables) => {
				// The model would answer with a plan, so only the pre-check can escalate.
				const model = replyingWithReply(ENGLISH_PLAN);
				let turn: CoachTurn | undefined;
				When('the parent sends "<concern>"', async () => {
					turn = await send(variables["concern"], model);
				});
				Then("the reply is a <risk> escalation in <language>", () => {
					expect(escalationOf(turn).risk).toBe(variables["risk"]);
					expect(escalationOf(turn).language).toBe(LANGUAGES[variables["language"]]);
				});
				And("the escalation lists <helpline>", () => {
					const numbers = escalationOf(turn).helplines.map((helpline) => helpline.number);
					expect(numbers).toContain(variables["helpline"]);
				});
				And("the escalation tells the parent to call 112 if anyone is in immediate danger", () => {
					expect(escalationOf(turn).immediateDanger).toContain("112");
				});
				And("the model was not asked", () => {
					expect(model.doGenerateCalls).toHaveLength(0);
				});
			},
		);

		Scenario(
			"A crisis the keywords miss still escalates through the model",
			({ Given, When, Then, And }) => {
				let model: MockLanguageModelV4;
				let turn: CoachTurn | undefined;
				Given("the model flags the concern as self_harm", () => {
					model = replyingWithReply({ ...ENGLISH_PLAN, risk: "self_harm" });
				});
				When(
					'the parent sends "I can\'t do this anymore, everyone would be better off without me"',
					async () => {
						turn = await send(
							"I can't do this anymore, everyone would be better off without me",
							model,
						);
					},
				);
				Then("the reply is a self_harm escalation in English", () => {
					expect(escalationOf(turn).risk).toBe("self_harm");
					expect(escalationOf(turn).language).toBe("en");
				});
				And("the escalation lists 14416", () => {
					const numbers = escalationOf(turn).helplines.map((helpline) => helpline.number);
					expect(numbers).toContain("14416");
				});
			},
		);

		Scenario("Everyday hitting between children is not a crisis", ({ Given, When, Then }) => {
			let model: MockLanguageModelV4;
			let turn: CoachTurn | undefined;
			Given("the model replies with an ordinary plan", () => {
				model = replyingWithReply(ENGLISH_PLAN);
			});
			When('the parent sends "My son keeps hitting his little sister"', async () => {
				turn = await send("My son keeps hitting his little sister", model);
			});
			Then("the reply is a plan", () => {
				expect(turn?.kind).toBe("plan");
			});
		});
	},
	{ excludeTags: ["component"] },
);
