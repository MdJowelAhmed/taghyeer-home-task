import { render, screen, fireEvent } from "@testing-library/react";
import { RenameGroupDialog } from "../RenameGroupDialog";
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

describe("RenameGroupDialog", () => {
  it("does not render when isOpen is false", () => {
    renderWithProviders(
      <RenameGroupDialog
        isOpen={false}
        onClose={jest.fn()}
        conversationId="conv-123"
        currentName="Project 3 Team"
      />
    );

    expect(screen.queryByText(/rename group/i)).not.toBeInTheDocument();
  });

  it("renders input with current name and Save button when open", () => {
    renderWithProviders(
      <RenameGroupDialog
        isOpen={true}
        onClose={jest.fn()}
        conversationId="conv-123"
        currentName="Project 3 Team"
      />
    );

    expect(screen.getByText("Rename Group")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Project 3 Team")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    const handleClose = jest.fn();
    renderWithProviders(
      <RenameGroupDialog
        isOpen={true}
        onClose={handleClose}
        conversationId="conv-123"
        currentName="Project 3 Team"
      />
    );

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
