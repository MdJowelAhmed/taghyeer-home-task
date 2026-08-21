"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "../services/message.service";
import { SendMessagePayload, Message } from "../types/chat.types";
import { CONVERSATIONS_QUERY_KEY } from "./useConversations";

/**
 * Custom mutation hook for sending messages in a conversation.
 *
 * Sends the payload via the REST API, which automatically triggers
 * a `message:new` event across Socket.io to other participants on the server.
 * Invalidates the conversations list query so that sidebar previews
 * and sort orders are updated immediately.
 *
 * Architecture Flow:
 * UI Components -> Custom Hooks -> Services -> apiFetch / Socket
 *
 * @param onSuccessCallback - Optional callback invoked with the created message
 */
export function useSendMessage(onSuccessCallback?: (msg: Message) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SendMessagePayload) => {
      return messageService.sendMessage(payload);
    },
    onSuccess: (newMessage) => {
      // Invalidate conversation list so lastMessage and timestamps update
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });

      // Optimistically update message query cache if present
      const messagesQueryKey = ["chat", "messages", newMessage.conversation];
      queryClient.setQueryData<Message[]>(messagesQueryKey, (prev = []) => {
        if (prev.some((m) => m._id === newMessage._id)) {
          return prev;
        }
        return [...prev, newMessage];
      });

      if (onSuccessCallback) {
        onSuccessCallback(newMessage);
      }
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
    },
  });
}
