import { defineConfig } from "vite-plus";

// Next.js builds and serves the app (`vp run dev`, `vp run build`). Vite+ provides the rest of the
// toolchain: formatting, linting, type checking and tests.
export default defineConfig({
	fmt: {
		ignorePatterns: ["next-env.d.ts"],
		sortPackageJson: {
			sortScripts: true,
		},
		sortTailwindcss: { stylesheet: "./src/app/globals.css" },
		sortImports: {},
		quoteProps: "consistent",
		overrides: [
			{
				// The JSONC spec only lets parsers accept trailing commas, and its reference parser rejects
				// them by default.
				files: ["**/*.jsonc"],
				options: { trailingComma: "none" },
			},
		],
	},
	lint: {
		ignorePatterns: [".next/**", "next-env.d.ts"],
		options: {
			typeAware: true,
			typeCheck: true,
		},
		plugins: [
			"eslint",
			"typescript",
			"unicorn",
			"react",
			"nextjs",
			"oxc",
			"import",
			"jsdoc",
			"jsx-a11y",
			"node",
			"promise",
			"vitest",
		],
		categories: {
			correctness: "error",
			suspicious: "error",
			perf: "error",
		},
		rules: {
			"import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
			"react/react-in-jsx-scope": "off",
			// Gherkin steps from @amiceli/vitest-cucumber are test blocks too (ADR-0017).
			"vitest/no-standalone-expect": [
				"error",
				{ additionalTestBlockFunctions: ["Given", "When", "Then", "And", "But"] },
			],
		},
	},
	test: {
		projects: [
			{
				extends: true,
				test: {
					// Pure logic, Gherkin features run against it, and the repository's scripts.
					name: "unit",
					include: ["src/**/*.test.ts", "scripts/**/*.test.ts", "features/**/*.spec.ts"],
					environment: "node",
				},
			},
			{
				extends: true,
				test: {
					// React components and the Gherkin features that exercise them.
					name: "component",
					include: ["src/**/*.test.tsx", "features/**/*.spec.tsx"],
					environment: "jsdom",
				},
			},
		],
	},
});
