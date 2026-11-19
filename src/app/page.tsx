import { Chat } from "#/components/Chat.tsx";

import { askCoach } from "./actions.ts";

export default function Home() {
	return <Chat ask={askCoach} />;
}
