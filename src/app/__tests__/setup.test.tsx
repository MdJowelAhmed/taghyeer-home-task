import { render, screen } from "@testing-library/react";

/**
 * Minimal smoke test to verify that Jest + React Testing Library +
 * jest-dom matchers are all wired up correctly.
 *
 * This test does not test any application code — it only validates
 * the testing infrastructure itself.
 */
describe("Testing infrastructure", () => {
  it("renders a React element and finds it in the DOM", () => {
    render(<p data-testid="hello">Hello, world!</p>);
    expect(screen.getByTestId("hello")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });
});
