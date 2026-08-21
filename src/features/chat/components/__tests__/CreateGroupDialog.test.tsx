import { render, screen, fireEvent } from "@testing-library/react";
import { CreateGroupDialog } from "../CreateGroupDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

describe("CreateGroupDialog", () => {
  it("does not render when isOpen is false", () => {
    renderWithProviders(
      <CreateGroupDialog
        isOpen={false}
        onClose={jest.fn()}
        onSuccess={jest.fn()}
      />
    );

    expect(screen.queryByText(/create group/i)).not.toBeInTheDocument();
  });

  it("renders group name input and submit button when open", () => {
    renderWithProviders(
      <CreateGroupDialog
        isOpen={true}
        onClose={jest.fn()}
        onSuccess={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText(/project 3 team/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create group/i })
    ).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    const handleClose = jest.fn();
    renderWithProviders(
      <CreateGroupDialog
        isOpen={true}
        onClose={handleClose}
        onSuccess={jest.fn()}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
