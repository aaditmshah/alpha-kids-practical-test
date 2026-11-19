import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vite-plus/test";

import { escalationMessage, failSafeMessage, referralMessage } from "#/coach/messages.ts";
import { exampleReply } from "#/coach/testing.ts";

import { CoachTurnView } from "./CoachTurnView.tsx";

afterEach(cleanup);

const ENGLISH = exampleReply("en");

describe("CoachTurnView", () => {
	it("renders a plan as the summary, numbered steps and the check-in last", () => {
		const { container } = render(<CoachTurnView turn={{ kind: "plan", reply: ENGLISH }} />);
		const steps = within(screen.getByRole("list")).getAllByRole("listitem");
		// Each item shows its number, then the step.
		expect(steps.map((step) => step.textContent)).toEqual(
			ENGLISH.plan.map((step, index) => `${index + 1}${step}`),
		);
		const text = container.textContent ?? "";
		expect(text.startsWith(ENGLISH.summary)).toBe(true);
		expect(text.endsWith(ENGLISH.checkIn.text)).toBe(true);
	});

	it("shows a plan's referral before the check-in", () => {
		const reply = { ...ENGLISH, referral: "Mention it to a paediatrician." };
		const { container } = render(<CoachTurnView turn={{ kind: "plan", reply }} />);
		const text = container.textContent ?? "";
		expect(text.indexOf(reply.referral)).toBeGreaterThan(text.indexOf(ENGLISH.plan.at(-1) ?? ""));
		expect(text.indexOf(reply.referral)).toBeLessThan(text.indexOf(ENGLISH.checkIn.text));
	});

	it("marks each turn with its language", () => {
		const reply = exampleReply("ur-Latn");
		const { container } = render(<CoachTurnView turn={{ kind: "plan", reply }} />);
		expect(container.firstElementChild?.getAttribute("lang")).toBe("ur-Latn");
	});

	it("renders an escalation as an alert that leads with its title and 112", () => {
		const message = escalationMessage("abuse", "en");
		render(<CoachTurnView turn={{ kind: "escalation", message }} />);
		const alert = screen.getByRole("alert");
		expect(within(alert).getByRole("heading").textContent).toBe(message.title);
		expect(alert.textContent?.startsWith(message.title + message.immediateDanger)).toBe(true);
	});

	it("makes every helpline a tel: link", () => {
		const message = escalationMessage("abuse", "en");
		render(<CoachTurnView turn={{ kind: "escalation", message }} />);
		for (const helpline of message.helplines) {
			const link = screen.getByRole("link", { name: new RegExp(helpline.number) });
			expect(link.getAttribute("href")).toBe(`tel:${helpline.number}`);
		}
	});

	it("renders a referral with its check-in", () => {
		const message = referralMessage("en");
		render(<CoachTurnView turn={{ kind: "referral", message }} />);
		expect(screen.getByText(message.text)).toBeTruthy();
		expect(screen.getByText(message.checkIn)).toBeTruthy();
	});

	it("renders the fail-safe with 112 as a tel: link", () => {
		const message = failSafeMessage("en");
		const { container } = render(<CoachTurnView turn={{ kind: "failSafe", message }} />);
		expect(container.textContent).toBe(message.text);
		expect(screen.getByRole("link", { name: "112" }).getAttribute("href")).toBe("tel:112");
	});
});
