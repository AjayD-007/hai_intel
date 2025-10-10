import React from "react";
import { render, screen } from "@testing-library/react";

function Greeting() {
  return <h1>Hello, World!</h1>;
}

test("renders greeting", () => {
  render(<Greeting />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});
