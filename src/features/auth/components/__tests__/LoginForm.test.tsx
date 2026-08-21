import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("LoginForm", () => {
  it("renders the login form elements", () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue to chat/i })
    ).toBeInTheDocument();
  });

  it("displays validation errors on empty submission", async () => {
    renderWithProviders(<LoginForm />);

    const submitButton = screen.getByRole("button", {
      name: /continue to chat/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/name must be at least 2 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/phone number must be at least 6 digits/i)
      ).toBeInTheDocument();
    });
  });
});
