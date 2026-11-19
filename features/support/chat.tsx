import { fireEvent, render, screen } from "@testing-library/react";

import type { ChatMessage } from "#/coach/prompt.ts";
import type { CoachTurn } from "#/coach/turn.ts";
import type { Ask } from "#/components/Chat.tsx";
import { Chat } from "#/components/Chat.tsx";

/** Shared helpers for the component-level Gherkin specs and the chat tests (ADR-0017). */

/** A promise and the function that settles it, so a test can hold the coach's reply back. */
export const deferred = <T,>() => Promise.withResolvers<T>();

/** A fake askCoach that answers with the given turns in order and records what it was sent. */
export const answering = (...turns: CoachTurn[]) => {
	const calls: ChatMessage[][] = [];
	const ask: Ask = async (history) => {
		calls.push(history);
		const turn = turns[calls.length - 1];
		if (!turn) throw new Error("No more replies");
		return turn;
	};
	return { ask, calls };
};

/** Opens the chat page with the given askCoach. */
export const openChat = (ask: Ask) => render(<Chat ask={ask} />);

/** Types a concern into the box and presses Send, as a parent would. */
export const sendConcern = (text: string) => {
	fireEvent.change(screen.getByLabelText("Your concern"), { target: { value: text } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));
};
