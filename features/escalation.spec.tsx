import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import { cleanup, screen, within } from "@testing-library/react";
import { expect } from "vite-plus/test";

import { escalationMessage } from "#/coach/messages.ts";

import { answering, openChat, sendConcern } from "./support/chat.tsx";

const feature = await loadFeature("./escalation.feature");

const MESSAGE = escalationMessage("abuse", "en");

describeFeature(
	feature,
	({ AfterEachScenario, Scenario }) => {
		AfterEachScenario(cleanup);

		Scenario("The escalation is shown first and stands out", ({ Given, When, Then, And }) => {
			let alert: HTMLElement;
			Given("the chat page is open", () => {
				openChat(answering({ kind: "escalation", message: MESSAGE }).ask);
			});
			When("the coach escalates a concern", async () => {
				sendConcern("My husband hits me every day");
				alert = await screen.findByRole("alert");
			});
			Then("an alert appears before anything else in the reply", () => {
				// The alert is the whole reply, and it opens with the title and the call to 112.
				expect(alert.parentElement?.children).toHaveLength(1);
				expect(alert.textContent?.startsWith(MESSAGE.title + MESSAGE.immediateDanger)).toBe(true);
			});
			And("each helpline number is a link that starts a phone call", () => {
				for (const { number } of MESSAGE.helplines) {
					const link = within(alert).getByRole("link", { name: new RegExp(number) });
					expect(link.getAttribute("href")).toBe(`tel:${number}`);
				}
			});
		});
	},
	{ includeTags: ["component"] },
);
