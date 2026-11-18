import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import { expect } from "vite-plus/test";

const feature = await loadFeature("./features/test-setup.feature");

describeFeature(feature, ({ Scenario }) => {
	Scenario("Gherkin scenarios run as Vitest tests", ({ Given, When, Then }) => {
		const calls: string[] = [];
		Given("a feature file", () => {
			calls.push("given");
		});
		When("its scenario runs", () => {
			calls.push("when");
		});
		Then("each step is called", () => {
			expect(calls).toEqual(["given", "when"]);
		});
	});
});
