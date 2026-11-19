import { useId } from "react";

import type { EscalationMessage, FailSafeMessage, ReferralMessage } from "#/coach/messages.ts";
import type { CoachReply } from "#/coach/schema.ts";
import type { CoachTurn } from "#/coach/turn.ts";

import { AlertIcon, ClockIcon, CloudIcon, QuestionIcon, StethoscopeIcon } from "./icons.tsx";

/** The step numbers cycle through the design's pastels. */
const STEP_COLOURS = [
	"bg-lavender text-accent-strong",
	"bg-peach text-peach-ink",
	"bg-mint text-mint-deep",
] as const;

/** Tailwind needs whole class names, so the helpline grid's columns are spelled out. */
const HELPLINE_COLUMNS = ["grid-cols-1", "grid-cols-2", "grid-cols-3"] as const;

const CheckIn = ({ kind, text }: { kind: "question" | "time"; text: string }) => {
	const Icon = kind === "time" ? ClockIcon : QuestionIcon;
	return (
		<div className="flex items-start gap-2.5 rounded-2xl bg-butter px-3.5 py-3 text-butter-ink">
			<Icon className="mt-px size-[22px] shrink-0 text-butter-icon" />
			<p className="text-[15px] leading-relaxed font-bold">{text}</p>
		</div>
	);
};

const CARD = "flex flex-col gap-3.5 rounded-3xl rounded-tl-md p-[18px]";

const PlanView = ({ reply }: { reply: CoachReply }) => (
	<article lang={reply.language} className={`${CARD} border-2 border-card-line bg-white`}>
		<p className="text-[17px] leading-snug font-extrabold">{reply.summary}</p>
		<ol className="flex flex-col gap-2.5">
			{reply.plan.map((step, index) => (
				<li key={step} className="flex items-start gap-3">
					<span
						aria-hidden="true"
						className={`flex size-7 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-semibold ${STEP_COLOURS[index % STEP_COLOURS.length]}`}
					>
						{index + 1}
					</span>
					<span className="pt-0.5 leading-relaxed">{step}</span>
				</li>
			))}
		</ol>
		{reply.referral ? (
			<div className="flex items-start gap-2.5 rounded-2xl bg-sky px-3.5 py-3 text-sky-ink">
				<StethoscopeIcon className="mt-px size-[22px] shrink-0 text-sky-icon" />
				<p className="leading-relaxed">{reply.referral}</p>
			</div>
		) : null}
		<CheckIn kind={reply.checkIn.kind} text={reply.checkIn.text} />
	</article>
);

const EscalationView = ({ message }: { message: EscalationMessage }) => {
	const titleId = useId();
	return (
		<section
			role="alert"
			aria-labelledby={titleId}
			lang={message.language}
			className="flex flex-col gap-3 rounded-3xl bg-alert p-[18px] text-white ring-4 ring-alert-ring"
		>
			<div className="flex items-center gap-2.5">
				<AlertIcon className="size-7 shrink-0" strokeWidth={2.2} />
				<h2 id={titleId} className="font-display text-[22px] font-semibold">
					{message.title}
				</h2>
			</div>
			<p className="text-[17px] leading-snug font-extrabold">{message.immediateDanger}</p>
			<div
				className={`grid gap-2 ${HELPLINE_COLUMNS[message.helplines.length - 1] ?? "grid-cols-3"}`}
			>
				{message.helplines.map((helpline) => (
					<a
						key={helpline.number}
						href={`tel:${helpline.number}`}
						className="flex min-h-16 flex-col items-center justify-center gap-0.5 rounded-2xl bg-white px-1 text-center text-alert-ink no-underline hover:bg-alert-soft focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						<span className="font-display text-[22px] font-semibold">{helpline.number}</span>
						<span className="text-xs font-bold">{helpline.name}</span>
					</a>
				))}
			</div>
			<ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed">
				{message.guidance.map((line) => (
					<li key={line}>{line}</li>
				))}
				<li>{message.trustedPerson}</li>
			</ul>
			<p className="rounded-[14px] bg-alert-deep px-3 py-2.5 text-[15px] font-extrabold">
				{message.checkIn}
			</p>
			<p className="text-[13px] text-alert-soft">{message.ifMisread}</p>
		</section>
	);
};

const ReferralView = ({ message }: { message: ReferralMessage }) => (
	<article lang={message.language} className={`${CARD} bg-sky text-sky-ink`}>
		<div className="flex items-center gap-2.5">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-white">
				<StethoscopeIcon className="size-6 text-sky-icon" />
			</div>
			<h2 className="font-display text-lg font-semibold">A doctor is the right person</h2>
		</div>
		<p className="leading-relaxed">{message.text}</p>
		<CheckIn kind="question" text={message.checkIn} />
	</article>
);

/** Turns the last "112" in a fixed message into a tap-to-call link. */
const withEmergencyLink = (text: string) => {
	const at = text.lastIndexOf("112");
	if (at === -1) return text;
	return (
		<>
			{text.slice(0, at)}
			<a href="tel:112" className="font-extrabold text-alert-ink">
				112
			</a>
			{text.slice(at + 3)}
		</>
	);
};

const FailSafeView = ({ message }: { message: FailSafeMessage }) => (
	<article
		lang={message.language}
		className="flex items-start gap-3 rounded-3xl rounded-tl-md border-2 border-dashed border-butter-line bg-butter-pale p-[18px] text-butter-ink"
	>
		<div className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-butter-deep">
			<CloudIcon className="size-6 text-butter-icon" />
		</div>
		<p className="leading-relaxed">{withEmergencyLink(message.text)}</p>
	</article>
);

/** One coach turn, drawn as the approved design shows it (wiki/design.md). */
export const CoachTurnView = ({ turn }: { turn: CoachTurn }) => {
	switch (turn.kind) {
		case "plan":
			return <PlanView reply={turn.reply} />;
		case "escalation":
			return <EscalationView message={turn.message} />;
		case "referral":
			return <ReferralView message={turn.message} />;
	}
	return <FailSafeView message={turn.message} />;
};
