import { apiFetch } from "@/lib/api";
import {
  Message,
  MessagesResponse,
  SendMessagePayload,
} from "../types/chat.types";

/**
 * Message Service
 * Encapsulates REST API calls for sending and retrieving messages.
 * Follows the project architectural layer: Components -> Hooks -> Services -> apiFetch
 */
export const messageService = {
  /**
   * Fetches message history for a specific conversation.
   * Endpoint: GET /conversations/{conversationId}/messages
   *
   * @param conversationId - Target conversation identifier
   * @param limit - Optional limit of messages to fetch
   * @param before - Optional cursor timestamp/id for pagination
   * @returns Messages list and hasMore flag
   */
  getConversationMessages: (
    conversationId: string,
    limit?: number,
    before?: string
  ): Promise<MessagesResponse> => {
    const params = new URLSearchParams();
    if (limit) params.append("limit", String(limit));
    if (before) params.append("before", before);

    const query = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<MessagesResponse>(
      `/conversations/${conversationId}/messages${query}`
    );
  },

  /**
   * Sends a message to a conversation.
   * Endpoint: POST /messages
   *
   * @param payload - conversationId and text content
   * @returns Created message object
   */
  sendMessage: (payload: SendMessagePayload): Promise<Message> => {
    return apiFetch<Message>("/messages", {
      method: "POST",
      body: payload,
    });
  },
};
