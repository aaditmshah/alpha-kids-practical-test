// Checks that the current pull request has its wiki page, named wiki/pr-NNNN-<branch>.md after the
// PR's number and head branch. CI passes both through the environment.
// Usage: PR_NUMBER=1 PR_BRANCH=bootstrap-nextjs node scripts/check-pr-wiki-page.ts [wikiDir]

import { readdirSync } from "node:fs";
import { resolve } from "node:path";

import { checkPrWikiPage } from "./pr-wiki-page.ts";

const { PR_NUMBER, PR_BRANCH } = process.env;
const number = Number(PR_NUMBER);
if (!Number.isInteger(number) || number < 1 || !PR_BRANCH) {
	console.error("Set PR_NUMBER (a positive integer) and PR_BRANCH.");
	process.exit(2);
}

const files = readdirSync(resolve(process.argv[2] ?? "wiki"));
const problems = checkPrWikiPage({ number, branch: PR_BRANCH }, files);
for (const problem of problems) console.error(problem);
if (problems.length > 0) process.exit(1);
console.log(`PR #${number} has its wiki page.`);
