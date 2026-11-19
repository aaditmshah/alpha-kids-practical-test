import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import { cleanup, screen, waitFor } from "@testing-library/react";
import { expect } from "vite-plus/test";

import { exampleReply } from "#/coach/testing.ts";

import { answering, deferred, openChat, sendConcern } from "./support/chat.tsx";

const feature = await loadFeature("./conversation-history.feature");

const FIRST = { kind: "plan", reply: exampleReply("en") } as const;
const SECOND = {
	kind: "plan",
	reply: { ...exampleReply("en"), summary: "Four-year-olds often fight sleep to stay with you." },
} as const;

describeFeature(feature, ({ AfterEachScenario, Scenario }) => {
	AfterEachScenario(cleanup);

	Scenario("Messages and replies stay on the page in order", ({ Given, When, And, Then }) => {
		Given("the chat page is open", () => {
			openChat(answering(FIRST, SECOND).ask);
		});
		When('the parent sends "My son won\'t sleep"', async () => {
			sendConcern("My son won't sleep");
			await screen.findByText(FIRST.reply.summary);
		});
		And('the parent sends "He is 4 years old"', async () => {
			sendConcern("He is 4 years old");
			await screen.findByText(SECOND.reply.summary);
		});
		Then("the conversation shows both concerns and both replies in order", () => {
			const text = screen.getByRole("log").textContent ?? "";
			const positions = [
				"My son won't sleep",
				FIRST.reply.summary,
				"He is 4 years old",
				SECOND.reply.summary,
			].map((part) => text.indexOf(part));
			expect(positions.every((position) => position >= 0)).toBe(true);
			expect(positions).toEqual(positions.toSorted((a, b) => a - b));
		});
	});

	Scenario("The page shows the coach is working", ({ Given, When, Then }) => {
		const reply = deferred<typeof FIRST>();
		Given("the chat page is open", () => {
			openChat(() => reply.promise);
		});
		When("the parent sends a concern", () => {
			sendConcern("My son won't sleep");
		});
		Then("the page shows that the coach is replying until the reply arrives", async () => {
			expect(screen.getByRole("status").textContent).toContain("The coach is replying");
			reply.resolve(FIRST);
			await screen.findByText(FIRST.reply.summary);
			await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
		});
	});
});
