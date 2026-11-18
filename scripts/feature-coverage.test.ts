import { describe, expect, it } from "vite-plus/test";

import { checkFeatureCoverage, parseFeature } from "./feature-coverage.ts";

const feature = (file: string, text: string) => ({ file, text });

const BRIEF =
	"> The coach should not diagnose, should not give medical or legal instructions, and should clearly escalate if the parent describes an emergency, abuse, or self harm.";

describe("parseFeature", () => {
	it("collects requirement tags from the feature and its scenarios", () => {
		const parsed = parseFeature(
			"@R6 @R7\nFeature: Boundaries\n\n  @R8\n  Scenario: A crisis escalates\n    Given a step\n",
		);
		expect([...parsed.requirements].toSorted()).toEqual(["R6", "R7", "R8"]);
	});

	it("collects Brief quotes from the description", () => {
		const parsed = parseFeature(
			'Feature: Boundaries\n  Brief: "The coach should not diagnose"\n  Brief: "should not give medical or legal instructions"\n',
		);
		expect(parsed.briefQuotes).toEqual([
			"The coach should not diagnose",
			"should not give medical or legal instructions",
		]);
	});

	it("ignores tags that are not requirement IDs", () => {
		const parsed = parseFeature("@component @R9\nFeature: History\n");
		expect([...parsed.requirements]).toEqual(["R9"]);
	});
});

describe("checkFeatureCoverage", () => {
	it("passes when every required requirement has a scenario and every quote is in the brief", () => {
		const features = [
			feature(
				"boundaries.feature",
				'@R6 @R7\nFeature: B\n  Brief: "The coach should not diagnose"\n',
			),
		];
		expect(checkFeatureCoverage(features, BRIEF, ["R6", "R7"])).toEqual([]);
	});

	it("reports requirements that no feature covers", () => {
		const features = [feature("boundaries.feature", '@R6\nFeature: B\n  Brief: "The coach"\n')];
		expect(checkFeatureCoverage(features, BRIEF, ["R6", "R7", "R8"])).toEqual([
			"No scenario covers R7.",
			"No scenario covers R8.",
		]);
	});

	it("reports quotes that are not word for word in the brief", () => {
		const features = [
			feature("boundaries.feature", '@R6\nFeature: B\n  Brief: "The coach must not diagnose"\n'),
		];
		expect(checkFeatureCoverage(features, BRIEF, ["R6"])).toEqual([
			'boundaries.feature: quote not found in the brief: "The coach must not diagnose"',
		]);
	});

	it("reports features that quote nothing from the brief", () => {
		const features = [feature("history.feature", "@R6\nFeature: H\n")];
		expect(checkFeatureCoverage(features, BRIEF, ["R6"])).toEqual([
			"history.feature: quotes nothing from the brief; add a Brief: line.",
		]);
	});
});
