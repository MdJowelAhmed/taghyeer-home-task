import { normalizeSocketMessage, chatSocketService } from "../chat-socket.service";
import { getSocket } from "@/lib/socket";

jest.mock("@/lib/socket", () => ({
  getSocket: jest.fn(),
  disconnectSocket: jest.fn(),
  isSocketConnected: jest.fn(),
}));

describe("chatSocketService & normalizeSocketMessage", () => {
  it("normalizes socket message with numeric timestamp and id", () => {
    const raw = {
      id: "msg-123",
      conversation: "conv-456",
      sender: "user-789",
      text: "Real-time socket message",
      createdAt: 1787328315263,
    };

    const normalized = normalizeSocketMessage(raw);

    expect(normalized._id).toBe("msg-123");
    expect(normalized.conversation).toBe("conv-456");
    expect(normalized.sender).toBe("user-789");
    expect(normalized.text).toBe("Real-time socket message");
    expect(normalized.createdAt).toBe(new Date(1787328315263).toISOString());
  });

  it("normalizes socket message with _id and string ISO timestamp", () => {
    const raw = {
      _id: "msg-999",
      conversation: "conv-456",
      sender: "user-789",
      text: "Another message",
      createdAt: "2026-08-21T16:05:15.263Z",
    };

    const normalized = normalizeSocketMessage(raw);

    expect(normalized._id).toBe("msg-999");
    expect(normalized.createdAt).toBe("2026-08-21T16:05:15.263Z");
  });

  it("subscribes and unsubscribes from message:new", () => {
    const mockOn = jest.fn();
    const mockOff = jest.fn();
    const mockSocket = {
      on: mockOn,
      off: mockOff,
    };

    (getSocket as jest.Mock).mockReturnValue(mockSocket);

    const handler = jest.fn();
    const unsubscribe = chatSocketService.subscribeToNewMessage(handler);

    expect(mockOn).toHaveBeenCalledWith("message:new", expect.any(Function));

    unsubscribe();
    expect(mockOff).toHaveBeenCalledWith("message:new", expect.any(Function));
  });

  it("subscribes and unsubscribes from conversation:updated", () => {
    const mockOn = jest.fn();
    const mockOff = jest.fn();
    const mockSocket = {
      on: mockOn,
      off: mockOff,
    };

    (getSocket as jest.Mock).mockReturnValue(mockSocket);

    const handler = jest.fn();
    const unsubscribe = chatSocketService.subscribeToConversationUpdated(handler);

    expect(mockOn).toHaveBeenCalledWith("conversation:updated", handler);

    unsubscribe();
    expect(mockOff).toHaveBeenCalledWith("conversation:updated", handler);
  });
});
