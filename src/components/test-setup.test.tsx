// Proves component tests run in jsdom. Replaced by the real component tests in ticket-0021.
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vite-plus/test";

afterEach(cleanup);

test("renders a component into jsdom", () => {
	render(<p>Hello, parent</p>);
	expect(screen.getByText("Hello, parent").tagName).toBe("P");
});
