import { render, screen, fireEvent } from "@testing-library/react";
import { ConversationItem } from "../ConversationItem";
import { Conversation } from "../../types/chat.types";

const mockConversation: Conversation = {
  _id: "conv-123",
  type: "direct",
  updatedAt: "2026-08-21T13:18:55.986Z",
  participant: {
    _id: "user-456",
    name: "Kyle Reese",
    phone: "+12025550103",
  },
  lastMessage: {
    _id: "msg-789",
    text: "Hi, how are you?",
    sender: "user-456",
    createdAt: "2026-08-21T13:18:55.986Z",
  },
};

describe("ConversationItem", () => {
  it("renders participant name, phone and last message text", () => {
    const handleSelect = jest.fn();

    render(
      <ConversationItem
        conversation={mockConversation}
        isSelected={false}
        onSelect={handleSelect}
      />
    );

    expect(screen.getByText("Kyle Reese")).toBeInTheDocument();
    expect(screen.getByText("Hi, how are you?")).toBeInTheDocument();
    expect(screen.getByText("+12025550103")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const handleSelect = jest.fn();

    render(
      <ConversationItem
        conversation={mockConversation}
        isSelected={false}
        onSelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleSelect).toHaveBeenCalledWith("conv-123");
  });
});
