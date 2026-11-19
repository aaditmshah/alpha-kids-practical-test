// PreToolUse hook for Bash: stops Claude from running a command that names a secrets file such as
// .env.local. The deny rules in .claude/settings.json cover Read, Grep, Glob and Edit; this covers
// shell commands like `cat .env.local`. .env.example holds no secrets, so it stays readable.
//
// It is a guard against mistakes, not a sandbox: a command could still reach the file without
// naming it (for example through a glob such as `.e*`).

import { readFileSync } from "node:fs";

/** `.env`, `.env.local`, `.env.production` and the like, but not `.env.example`. */
const SECRETS_FILE = /(?:^|[\s/'"`=:(<>|;&])\.env(?:\.(?!example\b)[\w.-]+)?(?![\w.])/;

export const namesSecretsFile = (command: string): boolean => SECRETS_FILE.test(command);

interface HookInput {
	readonly tool_input?: { readonly command?: unknown };
}

if (import.meta.main) {
	const input: HookInput = JSON.parse(readFileSync(0, "utf8"));
	const command = input.tool_input?.command;
	if (typeof command === "string" && namesSecretsFile(command)) {
		process.stdout.write(
			JSON.stringify({
				hookSpecificOutput: {
					hookEventName: "PreToolUse",
					permissionDecision: "deny",
					permissionDecisionReason:
						"This command names a .env secrets file. Aadit keeps API keys there, and Claude must not read them.",
				},
			}),
		);
	}
}
