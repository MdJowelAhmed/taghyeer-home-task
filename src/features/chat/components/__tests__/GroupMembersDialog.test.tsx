import { render, screen, fireEvent } from "@testing-library/react";
import { GroupMembersDialog } from "../GroupMembersDialog";
import { Conversation } from "../../types/chat.types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockGroupConversation: Conversation = {
  _id: "group-123",
  type: "group",
  name: "Project 3 Team",
  createdBy: "user-1",
  admins: ["user-1"],
  updatedAt: "2026-08-21T14:25:16.314Z",
  participants: [
    { _id: "user-1", name: "Jowel", phone: "0107852398" },
    { _id: "user-2", name: "Shariful Alam", phone: "+8801700000000" },
  ],
};

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

describe("GroupMembersDialog", () => {
  it("does not render when isOpen is false", () => {
    renderWithProviders(
      <GroupMembersDialog
        isOpen={false}
        onClose={jest.fn()}
        conversation={mockGroupConversation}
        currentUserId="user-1"
      />
    );

    expect(screen.queryByText("Project 3 Team")).not.toBeInTheDocument();
  });

  it("renders participants and admin badge when open", () => {
    renderWithProviders(
      <GroupMembersDialog
        isOpen={true}
        onClose={jest.fn()}
        conversation={mockGroupConversation}
        currentUserId="user-1"
      />
    );

    expect(screen.getByText("Project 3 Team")).toBeInTheDocument();
    expect(screen.getByText(/Jowel/i)).toBeInTheDocument();
    expect(screen.getByText(/Shariful Alam/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    renderWithProviders(
      <GroupMembersDialog
        isOpen={true}
        onClose={handleClose}
        conversation={mockGroupConversation}
        currentUserId="user-1"
      />
    );

    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
