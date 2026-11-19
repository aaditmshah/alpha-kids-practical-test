import { describe, expect, it } from "vite-plus/test";

import { detectLanguage } from "./language";

describe("detectLanguage", () => {
	it("should return ur-Latn if the text has any Arabic script characters", () => {
		expect(detectLanguage("السلام عليكم")).toStrictEqual("ur-Latn");
	});

	it("should return en if the text has no Arabic script characters or Roman Urdu markers", () => {
		expect(detectLanguage("The main purpose of life is to serve your country")).toStrictEqual("en");
	});

	it("should return en if the text has fewer than 2 Roman Urdu markers", () => {
		expect(detectLanguage("He is a good bachcha")).toStrictEqual("en");
	});

	it("should return en if less than 15% of the words in the text are Roman Urdu markers", () => {
		expect(
			detectLanguage(
				"Nahii! Tum kya kar rahe ho? Don't you know that if you put Mentos into soda then it will explode?!",
			),
		).toStrictEqual("en");
	});

	it("should return ur-Latn if the text has at least 2 Roman Urdu markers which make up at least 15% of all the words", () => {
		expect(
			detectLanguage(
				"Nahiii! Tum kya kar rahe ho? Don't you know that if you put Mentos into soda then it will explode?!",
			),
		).toStrictEqual("ur-Latn");
	});
});
