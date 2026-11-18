import { describe, expect, it } from "vite-plus/test";

import { normalize } from "./normalize.ts";

describe("normalize", () => {
	it("lowercases", () => {
		expect(normalize("My Son WON'T Sleep")).toBe("my son won't sleep");
	});

	it("collapses runs of three or more of the same letter", () => {
		expect(normalize("nahiiii pleeeease")).toBe("nahi please");
	});

	it("keeps doubled letters, which Roman Urdu spells with", () => {
		expect(normalize("zyaadti bachche saans")).toBe("zyaadti bachche saans");
	});

	it("collapses whitespace and trims", () => {
		expect(normalize("  my   son\n won't \t sleep ")).toBe("my son won't sleep");
	});

	it("straightens curly apostrophes", () => {
		expect(normalize("can’t breathe")).toBe("can't breathe");
	});
});
