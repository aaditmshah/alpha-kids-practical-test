import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";

import "./globals.css";

// Self-hosted at build time by next/font, so nothing loads from Google at runtime (ADR-0018).
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["500", "600"] });
const nunito = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "Parent Coach",
	description: "Short, safe parenting plans in English or Roman Urdu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}>
			<body className="h-full font-sans">{children}</body>
		</html>
	);
}
