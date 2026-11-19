import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import { cleanup, screen } from "@testing-library/react";
import { expect } from "vite-plus/test";

import { exampleReply } from "#/coach/testing.ts";

import { answering, openChat, sendConcern } from "./support/chat.tsx";

const feature = await loadFeature("./coaching-plan.feature");

describeFeature(
	feature,
	({ AfterEachScenario, Scenario }) => {
		AfterEachScenario(cleanup);

		Scenario("A parent types a concern on the page", ({ Given, When, Then }) => {
			Given("the chat page is open", () => {
				openChat(answering({ kind: "plan", reply: exampleReply("en") }).ask);
			});
			When('the parent types "My daughter cries at school drop-off" and sends it', () => {
				sendConcern("My daughter cries at school drop-off");
			});
			Then("the concern appears in the conversation", () => {
				expect(screen.getByRole("log").textContent).toContain(
					"My daughter cries at school drop-off",
				);
			});
		});
	},
	{ includeTags: ["component"] },
);
