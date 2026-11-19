"use client";

import { useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

import { detectLanguage } from "#/coach/language.ts";
import { HISTORY_LIMIT, MAX_MESSAGE_LENGTH } from "#/coach/limits.ts";
import { failSafeMessage } from "#/coach/messages.ts";
import type { ChatMessage } from "#/coach/prompt.ts";
import type { CoachTurn } from "#/coach/turn.ts";
import { turnToText } from "#/coach/turn.ts";

import { CoachTurnView } from "./CoachTurnView.tsx";
import { HeartIcon, SendIcon, SmileBubbleIcon } from "./icons.tsx";

/** Sends the conversation to the coach. The page passes the askCoach Server Function. */
export type Ask = (history: ChatMessage[]) => Promise<CoachTurn>;

type Entry =
	| { readonly id: number; readonly role: "parent"; readonly text: string }
	| { readonly id: number; readonly role: "coach"; readonly turn: CoachTurn };

/** Example concerns for an empty chat, in both languages the coach speaks. */
const SUGGESTIONS = [
	{ text: "My toddler won't sleep", className: "bg-mint text-mint-deep" },
	{ text: "Meri beti khana nahi khati", className: "bg-peach text-peach-ink" },
	{ text: "Tantrums at the shop", className: "bg-sky text-sky-deep" },
] as const;

/** The latest messages, as the server expects them: coach turns become the text the parent saw. */
const toHistory = (entries: readonly Entry[]): ChatMessage[] =>
	entries
		.slice(-HISTORY_LIMIT)
		.map((entry) =>
			entry.role === "parent"
				? { role: "parent", text: entry.text }
				: { role: "coach", text: turnToText(entry.turn) },
		);

const EmptyState = ({ onPick }: { onPick: (text: string) => void }) => (
	<div className="flex flex-1 flex-col items-center justify-center gap-[18px] px-3 py-6 text-center">
		<div aria-hidden="true" className="relative size-[132px]">
			<div className="absolute top-2.5 left-0 size-28 rounded-full bg-lavender" />
			<div className="absolute top-0 right-0 size-11 rounded-full bg-butter-deep" />
			<div className="absolute right-2 bottom-1.5 size-7 rounded-full bg-mint" />
			<HeartIcon className="absolute top-[34px] left-6 size-16 text-accent" strokeWidth={1.6} />
		</div>
		<h2 className="font-display text-[26px] leading-tight font-semibold">
			What's on your mind today?
		</h2>
		<p className="max-w-md text-soft">
			Tell me about a worry with your child, in English or Roman Urdu. You'll get a short plan and a
			time to check in.
		</p>
		<div className="mt-1 flex flex-wrap justify-center gap-2.5">
			{SUGGESTIONS.map(({ text, className }) => (
				<button
					key={text}
					type="button"
					onClick={() => onPick(text)}
					className={`min-h-11 rounded-full px-4 py-2.5 text-[15px] font-bold ${className}`}
				>
					{text}
				</button>
			))}
		</div>
	</div>
);

const Waiting = () => (
	<output className="flex items-center gap-3 self-start rounded-[22px] rounded-tl-md border-2 border-card-line bg-white px-[18px] py-3.5">
		<div aria-hidden="true" className="flex gap-1.5">
			<span className="size-2.5 animate-bounce rounded-full bg-dot-pink" />
			<span className="size-2.5 animate-bounce rounded-full bg-dot-yellow [animation-delay:150ms]" />
			<span className="size-2.5 animate-bounce rounded-full bg-dot-green [animation-delay:300ms]" />
		</div>
		<span className="text-[15px] font-bold text-soft">The coach is replying…</span>
	</output>
);

/**
 * The chat: the conversation so far, kept only in the page (R9), and a box to send a concern. One
 * concern is answered at a time. If the request itself fails, the parent still gets the fail-safe,
 * with 112, in their language.
 */
export const Chat = ({ ask }: { ask: Ask }) => {
	const [entries, setEntries] = useState<readonly Entry[]>([]);
	const [draft, setDraft] = useState("");
	const [pending, setPending] = useState(false);
	const nextId = useRef(0);

	const send = async (raw: string) => {
		const text = raw.trim();
		if (text === "" || pending) return;
		const withConcern = [...entries, { id: nextId.current++, role: "parent" as const, text }];
		setEntries(withConcern);
		setDraft("");
		setPending(true);
		let turn: CoachTurn;
		try {
			turn = await ask(toHistory(withConcern));
		} catch {
			turn = { kind: "failSafe", message: failSafeMessage(detectLanguage(text)) };
		}
		setEntries((current) => [...current, { id: nextId.current++, role: "coach", turn }]);
		setPending(false);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		void send(draft);
	};

	// Enter sends and Shift+Enter starts a new line, as in most chat apps.
	const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
			event.preventDefault();
			void send(draft);
		}
	};

	return (
		<div className="flex h-dvh flex-col">
			<header className="border-b-2 border-line bg-white">
				<div className="mx-auto flex max-w-[800px] items-center gap-3 px-5 py-4 md:px-6 md:py-5">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blush md:size-12">
						<SmileBubbleIcon className="size-[26px] text-blush-ink" />
					</div>
					<div className="flex flex-col gap-0.5">
						<h1 className="font-display text-[22px] leading-tight font-semibold md:text-[26px]">
							Parent Coach
						</h1>
						<p className="text-[13px] text-muted md:text-sm">
							Short, safe plans in English or Roman Urdu
						</p>
					</div>
				</div>
			</header>

			{/* Reversed, so the scroll position starts at, and stays with, the newest message. */}
			<div className="flex flex-1 flex-col-reverse overflow-y-auto">
				<div
					role="log"
					aria-label="Conversation"
					className="mx-auto flex min-h-full max-w-[800px] flex-col justify-end gap-3.5 p-4 md:gap-[18px] md:px-6 md:py-7"
				>
					{entries.length === 0 && !pending ? (
						<EmptyState onPick={(text) => void send(text)} />
					) : null}
					{entries.map((entry) =>
						entry.role === "parent" ? (
							<p
								key={entry.id}
								className="max-w-[80%] self-end rounded-[20px] rounded-br-md bg-mint px-4 py-3 leading-relaxed whitespace-pre-line text-mint-ink md:max-w-[70%]"
							>
								{entry.text}
							</p>
						) : (
							<div key={entry.id} className="md:max-w-[88%]">
								<CoachTurnView turn={entry.turn} />
							</div>
						),
					)}
					{pending ? <Waiting /> : null}
				</div>
			</div>

			<div className="border-t-2 border-line bg-white">
				<form
					onSubmit={onSubmit}
					className="mx-auto flex max-w-[800px] flex-col gap-2 px-4 pt-3 pb-[18px] md:px-6 md:pt-4 md:pb-[22px]"
				>
					<label htmlFor="concern" className="text-[13px] font-bold text-soft md:text-sm">
						Your concern
					</label>
					<div className="flex items-end gap-2.5 md:gap-3">
						<textarea
							id="concern"
							rows={2}
							value={draft}
							maxLength={MAX_MESSAGE_LENGTH}
							placeholder="Type in English or Roman Urdu"
							onChange={(event) => setDraft(event.target.value)}
							onKeyDown={onKeyDown}
							className="min-h-[52px] min-w-0 flex-1 resize-none rounded-[18px] border-2 border-field-line bg-page px-3.5 py-3 placeholder:text-muted focus:border-accent focus:outline-none md:rounded-[20px] md:text-[17px]"
						/>
						<button
							type="submit"
							disabled={pending || draft.trim() === ""}
							aria-label="Send"
							className="flex size-[52px] shrink-0 items-center justify-center gap-2 rounded-full bg-accent font-display text-[17px] font-semibold text-white hover:bg-accent-strong disabled:bg-accent-muted md:h-14 md:w-auto md:px-[22px]"
						>
							<span className="hidden md:inline">Send</span>
							<SendIcon className="size-[22px] md:size-5" strokeWidth={2.2} />
						</button>
					</div>
					<p className="text-xs text-muted md:text-[13px]">
						Not a doctor or a lawyer. In an emergency, call{" "}
						<a href="tel:112" className="font-extrabold text-accent hover:text-accent-strong">
							112
						</a>
						.
					</p>
				</form>
			</div>
		</div>
	);
};
