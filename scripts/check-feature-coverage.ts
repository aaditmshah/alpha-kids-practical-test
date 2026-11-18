// Checks the Gherkin features in features/ against the brief (ADR-0017): every functional
// requirement (R1–R10) has a scenario, every feature quotes the brief, and every quote is word for
// word. Usage: node scripts/check-feature-coverage.ts

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { checkFeatureCoverage } from "./feature-coverage.ts";

const FUNCTIONAL_REQUIREMENTS = Array.from({ length: 10 }, (_, index) => `R${index + 1}`);

const features = readdirSync("features")
	.filter((file) => file.endsWith(".feature"))
	.map((file) => ({ file, text: readFileSync(join("features", file), "utf8") }));
const brief = readFileSync("wiki/source-practical-test-brief.md", "utf8");

const problems = checkFeatureCoverage(features, brief, FUNCTIONAL_REQUIREMENTS);
for (const problem of problems) console.error(problem);
if (problems.length > 0) process.exit(1);
console.log(`${features.length} features cover R1–R10 and quote the brief word for word.`);
