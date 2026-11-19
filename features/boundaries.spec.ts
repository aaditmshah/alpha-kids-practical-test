import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import type { MockLanguageModelV4 } from "ai/test";
import { expect } from "vite-plus/test";

import type { CoachTurn } from "#/coach/coach.ts";
import { referralMessage } from "#/coach/messages.ts";
import { replyingWithReply } from "#/coach/testing.ts";

import { ENGLISH_PLAN, send } from "./support/coach.ts";

const feature = await loadFeature("./boundaries.feature");

/** A model whose ordinary plan has the given text as its first step. */
const sayingInPlan = (text: string) =>
	replyingWithReply({ ...ENGLISH_PLAN, plan: [text, ...ENGLISH_PLAN.plan.slice(1)] });

describeFeature(feature, ({ Scenario }) => {
	Scenario("A reply that mentions a dose becomes a referral", ({ Given, When, Then, And }) => {
		let model: MockLanguageModelV4;
		let turn: CoachTurn;
		Given('the model\'s reply says "Give him 5 ml of syrup before bed"', () => {
			model = sayingInPlan("Give him 5 ml of syrup before bed");
		});
		When('the parent sends "My son coughs at night and can\'t sleep"', async () => {
			turn = await send("My son coughs at night and can't sleep", model);
		});
		Then("the reply is a referral to a doctor", () => {
			expect(turn).toEqual({ kind: "referral", message: referralMessage("en") });
		});
		And("the reply ends with a check-in", () => {
			expect(turn.kind === "referral" && turn.message.checkIn).toBeTruthy();
		});
	});

	Scenario("A reply that suggests a diagnosis becomes a referral", ({ Given, When, Then }) => {
		let model: MockLanguageModelV4;
		let turn: CoachTurn;
		Given('the model\'s reply says "This sounds like ADHD"', () => {
			model = sayingInPlan("This sounds like ADHD");
		});
		When('the parent sends "My son can\'t sit still in class"', async () => {
			turn = await send("My son can't sit still in class", model);
		});
		Then("the reply is a referral to a doctor", () => {
			expect(turn).toEqual({ kind: "referral", message: referralMessage("en") });
		});
	});

	Scenario("Echoing a diagnosis the parent already has is fine", ({ Given, When, Then }) => {
		let model: MockLanguageModelV4;
		let turn: CoachTurn;
		Given(
			'the model\'s reply says "Since your son has ADHD, keep routines short and visual"',
			() => {
				model = sayingInPlan("Since your son has ADHD, keep routines short and visual");
			},
		);
		When('the parent sends "My son has ADHD and mornings are chaos"', async () => {
			turn = await send("My son has ADHD and mornings are chaos", model);
		});
		Then("the reply is a plan", () => {
			expect(turn.kind).toBe("plan");
		});
	});

	Scenario("The coach points to a professional without advising", ({ Given, When, Then, And }) => {
		let model: MockLanguageModelV4;
		let turn: CoachTurn;
		Given('the model\'s reply refers the parent to "a paediatrician"', () => {
			model = replyingWithReply({
				...ENGLISH_PLAN,
				referral: "If the fever doesn't come down, please see a paediatrician today.",
			});
		});
		When('the parent sends "My baby has had a fever for three days"', async () => {
			turn = await send("My baby has had a fever for three days", model);
		});
		Then("the reply is a plan", () => {
			expect(turn.kind).toBe("plan");
		});
		And("the reply suggests seeing a paediatrician", () => {
			expect(turn.kind === "plan" && turn.reply.referral).toContain("a paediatrician");
		});
	});
});
