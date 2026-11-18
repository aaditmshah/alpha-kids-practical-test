import { describe, expect, it } from "vite-plus/test";

import { checkPrWikiPage, expectedPageFile } from "./pr-wiki-page.ts";

describe("expectedPageFile", () => {
	it("pads the PR number to four digits and appends the branch name", () => {
		expect(expectedPageFile({ number: 1, branch: "bootstrap-nextjs" })).toBe(
			"pr-0001-bootstrap-nextjs.md",
		);
	});

	it("keeps PR numbers longer than four digits whole", () => {
		expect(expectedPageFile({ number: 12_345, branch: "big" })).toBe("pr-12345-big.md");
	});
});

describe("checkPrWikiPage", () => {
	const pr = { number: 7, branch: "safety-precheck" };

	it("passes when the page for the PR's number and branch exists", () => {
		expect(checkPrWikiPage(pr, ["pr-0006-other.md", "pr-0007-safety-precheck.md"])).toEqual([]);
	});

	it("fails when no page exists for the PR number", () => {
		expect(checkPrWikiPage(pr, ["pr-0006-other.md"])).toEqual([
			"No wiki page for PR #7: expected wiki/pr-0007-safety-precheck.md (see the wiki-update skill).",
		]);
	});

	it("fails when the page for the PR number names a different branch", () => {
		expect(checkPrWikiPage(pr, ["pr-0007-safety-check.md"])).toEqual([
			"Wiki page pr-0007-safety-check.md does not match PR #7's branch: rename it to pr-0007-safety-precheck.md.",
		]);
	});

	it("fails when another page also claims the PR number", () => {
		expect(checkPrWikiPage(pr, ["pr-0007-safety-precheck.md", "pr-0007-old-name.md"])).toEqual([
			"Wiki page pr-0007-old-name.md does not match PR #7's branch: rename it to pr-0007-safety-precheck.md.",
		]);
	});

	it("does not mistake PR #70's page for PR #7's", () => {
		expect(checkPrWikiPage(pr, ["pr-0070-safety-precheck.md"])).toEqual([
			"No wiki page for PR #7: expected wiki/pr-0007-safety-precheck.md (see the wiki-update skill).",
		]);
	});
});
