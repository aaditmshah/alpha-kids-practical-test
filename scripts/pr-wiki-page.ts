/** A pull request as GitHub reports it: its number and the name of its head branch. */
export interface PullRequest {
	readonly number: number;
	readonly branch: string;
}

/** The file name a PR's wiki page must have: `pr-<number padded to 4 digits>-<branch>.md`. */
export const expectedPageFile = ({ number, branch }: PullRequest): string =>
	`pr-${String(number).padStart(4, "0")}-${branch}.md`;

/**
 * Checks that the wiki has the page for the pull request, named after its number and branch, and
 * that no other page claims the same PR number. Takes the file names in `wiki/` and returns the
 * problems found.
 */
export const checkPrWikiPage = (pr: PullRequest, files: readonly string[]): string[] => {
	const expected = expectedPageFile(pr);
	const prefix = `pr-${String(pr.number).padStart(4, "0")}-`;
	const mismatched = files
		.filter((file) => file.startsWith(prefix) && file.endsWith(".md") && file !== expected)
		.map(
			(file) =>
				`Wiki page ${file} does not match PR #${pr.number}'s branch: rename it to ${expected}.`,
		);
	if (mismatched.length > 0) return mismatched;
	return files.includes(expected)
		? []
		: [`No wiki page for PR #${pr.number}: expected wiki/${expected} (see the wiki-update skill).`];
};
