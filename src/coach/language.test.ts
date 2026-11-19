import { describe, expect, it } from "vite-plus/test";

import { detectLanguage } from "./language.ts";

describe("detectLanguage", () => {
	it("should return ur-Latn if the text has any Arabic script characters", () => {
		expect(detectLanguage("السلام عليكم")).toBe("ur-Latn");
	});

	it("should return en if the text has no Arabic script characters or Roman Urdu markers", () => {
		expect(detectLanguage("The main purpose of life is to serve your country")).toBe("en");
	});

	it("should return en if the text has fewer than 2 Roman Urdu markers", () => {
		expect(detectLanguage("He is a good bachcha")).toBe("en");
	});

	it("should return en if less than 15% of the words in the text are Roman Urdu markers", () => {
		expect(
			detectLanguage(
				"Nahii! Yeh kya? Don't you know that if you put Mentos into a bottle of soda then it will explode?!",
			),
		).toBe("en");
	});

	it("should return ur-Latn if the text has at least 2 Roman Urdu markers which make up at least 15% of all the words", () => {
		expect(
			detectLanguage(
				"Nahiii! Yeh kya? Don't you know that if you put Mentos into a bottle of soda then it will explode?!",
			),
		).toBe("ur-Latn");
	});

	it.each([
		["Mera beta screen time pe bohat tantrum karta hai"],
		["Meri beti sabziyan nahi khati, kya karoon?"],
		["Bachche ne zehar kha liya"],
		["Mera shohar mujhe roz maarta hai"],
		["Mera beta khudkushi ki baatein kar raha hai"],
		["Mujhe nahi pata"],
		["Kya karoon?"],
		["mera beta so nhi rha"],
	])("should return ur-Latn for the Roman Urdu fixture %j", (message) => {
		expect(detectLanguage(message)).toBe("ur-Latn");
	});

	it.each([["My son throws food at dinner"], ["My daughter won't eat vegetables"], [""]])(
		"should return en for the English fixture %j",
		(message) => {
			expect(detectLanguage(message)).toBe("en");
		},
	);
});
