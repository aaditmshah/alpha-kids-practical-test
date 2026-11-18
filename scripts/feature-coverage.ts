/** What a feature file contributes to coverage: its requirement tags and its quotes from the brief. */
export interface ParsedFeature {
	readonly requirements: ReadonlySet<string>;
	readonly briefQuotes: readonly string[];
}

/** A feature file: its name and its Gherkin text. */
export interface FeatureFile {
	readonly file: string;
	readonly text: string;
}

const REQUIREMENT_TAG = /@(R\d+)\b/g;
const BRIEF_QUOTE = /^\s*Brief:\s*"(.+)"\s*$/gm;

/** Reads the requirement tags (`@R1`…) and `Brief: "…"` quotes from a feature file. */
export const parseFeature = (text: string): ParsedFeature => ({
	requirements: new Set([...text.matchAll(REQUIREMENT_TAG)].map(([, id = ""]) => id)),
	briefQuotes: [...text.matchAll(BRIEF_QUOTE)].map(([, quote = ""]) => quote),
});

/**
 * Checks that every required requirement is tagged on some scenario, that every feature quotes
 * the brief, and that every quote appears word for word in the brief. Returns the problems found.
 */
export const checkFeatureCoverage = (
	features: readonly FeatureFile[],
	brief: string,
	required: readonly string[],
): string[] => {
	const problems: string[] = [];
	const covered = new Set<string>();
	for (const { file, text } of features) {
		const { requirements, briefQuotes } = parseFeature(text);
		for (const id of requirements) covered.add(id);
		if (briefQuotes.length === 0)
			problems.push(`${file}: quotes nothing from the brief; add a Brief: line.`);
		for (const quote of briefQuotes)
			if (!brief.includes(quote))
				problems.push(`${file}: quote not found in the brief: "${quote}"`);
	}
	for (const id of required) if (!covered.has(id)) problems.push(`No scenario covers ${id}.`);
	return problems;
};
