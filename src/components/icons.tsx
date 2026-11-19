import type { SVGProps } from "react";

/** Inline stroke icons from the approved design. They are decorative, so screen readers skip them. */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

const Icon = ({ children, ...props }: IconProps & { children: React.ReactNode }) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		focusable="false"
		{...props}
	>
		{children}
	</svg>
);

export const SmileBubbleIcon = (props: IconProps) => (
	<Icon {...props}>
		<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z" />
		<path d="M9 11h.01M15 11h.01" />
		<path d="M9.5 14.5a3.5 3.5 0 0 0 5 0" />
	</Icon>
);

export const HeartIcon = (props: IconProps) => (
	<Icon {...props}>
		<path d="M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21z" />
	</Icon>
);

export const SendIcon = (props: IconProps) => (
	<Icon {...props}>
		<path d="M5 12h14M13 6l6 6-6 6" />
	</Icon>
);

export const ClockIcon = (props: IconProps) => (
	<Icon {...props}>
		<circle cx="12" cy="13" r="8" />
		<path d="M12 9v4l2.5 2.5M9 2h6" />
	</Icon>
);

export const QuestionIcon = (props: IconProps) => (
	<Icon {...props}>
		<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z" />
		<path d="M10 9.5a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2v.5M12 16h.01" />
	</Icon>
);

export const AlertIcon = (props: IconProps) => (
	<Icon {...props}>
		<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
		<path d="M12 9v4M12 17h.01" />
	</Icon>
);

export const StethoscopeIcon = (props: IconProps) => (
	<Icon {...props}>
		<path d="M5 3v6a5 5 0 0 0 10 0V3" />
		<path d="M10 14v2a5 5 0 0 0 10 0v-2" />
		<circle cx="20" cy="12" r="2" />
	</Icon>
);

export const CloudIcon = (props: IconProps) => (
	<Icon {...props}>
		<path d="M17.5 19H7a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 11a4 4 0 0 1-2 8z" />
	</Icon>
);
