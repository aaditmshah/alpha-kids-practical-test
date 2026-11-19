import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vite-plus/test";

import { escalationMessage, failSafeMessage } from "#/coach/messages.ts";
import { exampleReply } from "#/coach/testing.ts";
import { turnToText } from "#/coach/turn.ts";

import { answering, deferred, openChat, sendConcern } from "../../features/support/chat.tsx";

afterEach(cleanup);

const PLAN = { kind: "plan", reply: exampleReply("en") } as const;

describe("Chat", () => {
	it("starts with a greeting and example concerns", () => {
		openChat(answering().ask);
		expect(screen.getByRole("heading", { name: "What's on your mind today?" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "Meri beti khana nahi khati" })).toBeTruthy();
	});

	it("sends an example concern when the parent picks it", async () => {
		const { ask, calls } = answering(PLAN);
		openChat(ask);
		fireEvent.click(screen.getByRole("button", { name: "My toddler won't sleep" }));
		await screen.findByText(PLAN.reply.summary);
		expect(calls).toEqual([[{ role: "parent", text: "My toddler won't sleep" }]]);
	});

	it("sends the conversation so far, with coach turns as the text the parent saw", async () => {
		const { ask, calls } = answering(PLAN, PLAN);
		openChat(ask);
		sendConcern("My son won't sleep");
		await screen.findByText(PLAN.reply.summary);
		sendConcern("He is 4 years old");
		await waitFor(() => expect(calls).toHaveLength(2));
		expect(calls[1]).toEqual([
			{ role: "parent", text: "My son won't sleep" },
			{ role: "coach", text: turnToText(PLAN) },
			{ role: "parent", text: "He is 4 years old" },
		]);
	});

	it("trims the concern, and ignores a blank one", () => {
		const { ask, calls } = answering(PLAN);
		openChat(ask);
		sendConcern("   ");
		expect(calls).toHaveLength(0);
		sendConcern("  My son won't sleep  ");
		expect(calls).toEqual([[{ role: "parent", text: "My son won't sleep" }]]);
	});

	it("sends with Enter, and starts a new line with Shift+Enter", () => {
		const { ask, calls } = answering(PLAN);
		openChat(ask);
		const box = screen.getByLabelText("Your concern");
		fireEvent.change(box, { target: { value: "My son won't sleep" } });
		fireEvent.keyDown(box, { key: "Enter", shiftKey: true });
		expect(calls).toHaveLength(0);
		fireEvent.keyDown(box, { key: "Enter" });
		expect(calls).toHaveLength(1);
	});

	it("waits for one reply before taking the next concern", async () => {
		const reply = deferred<typeof PLAN>();
		const calls: unknown[] = [];
		openChat(async (history) => {
			calls.push(history);
			return reply.promise;
		});
		sendConcern("My son won't sleep");
		expect(screen.getByRole("status").textContent).toContain("The coach is replying");
		sendConcern("Hello?");
		expect(calls).toHaveLength(1);
		reply.resolve(PLAN);
		await screen.findByText(PLAN.reply.summary);
		expect(screen.queryByRole("status")).toBeNull();
	});

	it("shows the fail-safe in the parent's language when the request fails", async () => {
		openChat(answering().ask);
		sendConcern("Meri beti sabziyan nahi khati, kya karoon?");
		await screen.findByText(/Maaf kijiye/);
		const message = failSafeMessage("ur-Latn");
		expect(screen.getByText(/Maaf kijiye/).closest("article")?.textContent).toBe(message.text);
	});

	it("shows an escalation in the conversation", async () => {
		const turn = { kind: "escalation", message: escalationMessage("emergency", "en") } as const;
		openChat(answering(turn).ask);
		sendConcern("My toddler swallowed poison");
		const alert = await screen.findByRole("alert");
		expect(within(alert).getByRole("link", { name: /112/ }).getAttribute("href")).toBe("tel:112");
	});
});
