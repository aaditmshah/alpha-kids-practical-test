import { describe, expect, it } from "vite-plus/test";

import { namesSecretsFile } from "./protect-env.ts";

describe("namesSecretsFile", () => {
	it.each([
		"cat .env.local",
		"cat ./.env.local",
		"head -1 .env",
		"grep KEY .env.production",
		"node --env-file=.env.local script.ts",
		"less '.env.local'",
		"cat .env*",
		"cp .env.development.local /tmp/x",
	])("flags %s", (command) => {
		expect(namesSecretsFile(command)).toBe(true);
	});

	it.each([
		"cat .env.example",
		"cp .env.example .env.example.bak",
		"vp test --run",
		'grep -rn "process.env" src',
		"printenv PATH",
		"ls next-env.d.ts",
	])("allows %s", (command) => {
		expect(namesSecretsFile(command)).toBe(false);
	});
});
