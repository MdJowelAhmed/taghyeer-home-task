import { getSocket } from "@/lib/socket";
import { Message, SocketMessagePayload, Conversation } from "../types/chat.types";

/**
 * Normalizes raw socket message payload to the application standard Message model.
 */
export function normalizeSocketMessage(raw: SocketMessagePayload): Message {
  const messageId = raw._id || raw.id || String(Date.now());
  const createdAtIso =
    typeof raw.createdAt === "number"
      ? new Date(raw.createdAt).toISOString()
      : typeof raw.createdAt === "string"
        ? raw.createdAt
        : new Date().toISOString();

  return {
    _id: messageId,
    conversation: raw.conversation,
    sender: raw.sender,
    text: raw.text,
    createdAt: createdAtIso,
  };
}

export const chatSocketService = {
  /**
   * Emits message:send event to the server via Socket.io.
   */
  emitSendMessage: (
    conversationId: string,
    text: string
  ): Promise<{ ok: boolean }> => {
    return new Promise((resolve, reject) => {
      const socket = getSocket();
      if (!socket || !socket.connected) {
        return reject(new Error("Socket is not connected"));
      }

      socket.emit("message:send", { conversationId, text }, (ack: { ok?: boolean; error?: string }) => {
        if (ack && ack.error) {
          reject(new Error(ack.error));
        } else {
          resolve({ ok: ack ? Boolean(ack.ok) : true });
        }
      });
    });
  },

  /**
   * Subscribes to message:new event.
   */
  subscribeToNewMessage: (
    handler: (message: Message) => void
  ): (() => void) => {
    const socket = getSocket();
    if (!socket) return () => {};

    const listener = (payload: SocketMessagePayload) => {
      const normalized = normalizeSocketMessage(payload);
      handler(normalized);
    };

    socket.on("message:new", listener);
    return () => {
      socket.off("message:new", listener);
    };
  },

  /**
   * Subscribes to conversation:updated event.
   */
  subscribeToConversationUpdated: (
    handler: (conversation: Conversation) => void
  ): (() => void) => {
    const socket = getSocket();
    if (!socket) return () => {};

    socket.on("conversation:updated", handler);
    return () => {
      socket.off("conversation:updated", handler);
    };
  },
};
