import { render, screen, fireEvent } from "@testing-library/react";
import { AddMemberDialog } from "../AddMemberDialog";
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

describe("AddMemberDialog", () => {
  it("does not render when isOpen is false", () => {
    renderWithProviders(
      <AddMemberDialog
        isOpen={false}
        onClose={jest.fn()}
        conversationId="conv-123"
        existingParticipantIds={[]}
      />
    );

    expect(screen.queryByText(/add members/i)).not.toBeInTheDocument();
  });

  it("renders search input and Add Members button when open", () => {
    renderWithProviders(
      <AddMemberDialog
        isOpen={true}
        onClose={jest.fn()}
        conversationId="conv-123"
        existingParticipantIds={[]}
      />
    );

    expect(
      screen.getByPlaceholderText(/search user name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add members/i })
    ).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    const handleClose = jest.fn();
    renderWithProviders(
      <AddMemberDialog
        isOpen={true}
        onClose={handleClose}
        conversationId="conv-123"
        existingParticipantIds={[]}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
