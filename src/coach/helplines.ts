/** A phone line the coach shows in an escalation. */
export interface Helpline {
	readonly number: string;
	readonly name: string;
}

/**
 * The Indian helplines the coach shows, each verified from an official Government of India source
 * (ADR-0012, wiki/research-safety-escalation.md). Recheck them before submitting.
 */
export const HELPLINES = {
	emergency: { number: "112", name: "Emergency (police, fire, ambulance)" },
	child: { number: "1098", name: "Child Helpline" },
	women: { number: "181", name: "Women Helpline" },
	mentalHealth: { number: "14416", name: "Tele MANAS" },
} as const satisfies Record<string, Helpline>;
