
import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Mock framer-motion so animations don't interfere with tests
vi.mock("framer-motion", () => {
	return {
		motion: {
			footer: (props: React.ComponentPropsWithoutRef<"footer">) => {
				const { children, ...rest } = props;
				return React.createElement("footer", rest, children);
			},
		},
	};
});

// Mock lucide icon to a simple svg we can query by test id
vi.mock("lucide-react", () => {
	return {
		Eye: (props: React.SVGProps<SVGSVGElement>) => React.createElement("svg", { "data-testid": "eye-icon", ...props }),
	};
});

import Footer from "../layout/Footer";

describe("Footer", () => {
	test("renders brand name and partner text", () => {
		render(<Footer />);

		expect(screen.getByText("HaiIntel")).toBeInTheDocument();
		expect(screen.getByText("Part of Vibrant Capital")).toBeInTheDocument();
	});

	test("renders copy about the challenge and tech stack", () => {
		render(<Footer />);

		expect(screen.getByText("UI Developer Challenge - Option B")).toBeInTheDocument();
		expect(screen.getByText("Built with Next.js, Tailwind CSS & Framer Motion")).toBeInTheDocument();
	});

	test("renders the eye icon and copyright text", () => {
		render(<Footer />);

		expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
		expect(screen.getByText(/© 2025 HaiIntel/i)).toBeInTheDocument();
	});
});

