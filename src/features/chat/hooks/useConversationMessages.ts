"use client";

import { useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Message } from "../types/chat.types";
import { messageService } from "../services/message.service";
import { chatSocketService } from "../services/chat-socket.service";

export const getMessagesQueryKey = (conversationId: string) => [
  "chat",
  "messages",
  conversationId,
];

/**
 * Custom hook to load full conversation message history and subscribe
 * to incoming real-time Socket.io message events.
 *
 * Ensures messages persist on page reload and update in real-time.
 */
export function useConversationMessages(conversationId: string) {
  const queryClient = useQueryClient();
  const queryKey = getMessagesQueryKey(conversationId);

  const { data: messages = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await messageService.getConversationMessages(conversationId);
      const rawMessages = response.messages || [];
      // Backend returns newest first; reverse for standard top-to-bottom chat flow
      return [...rawMessages].reverse();
    },
    enabled: Boolean(conversationId),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const addMessage = useCallback(
    (newMsg: Message) => {
      queryClient.setQueryData<Message[]>(queryKey, (prev = []) => {
        // Prevent duplicate messages
        if (prev.some((m) => m._id === newMsg._id)) {
          return prev;
        }
        return [...prev, newMsg];
      });
    },
    [queryClient, queryKey]
  );

  useEffect(() => {
    if (!conversationId) return;

    // Listen for incoming real-time messages for this conversation
    const unsubscribe = chatSocketService.subscribeToNewMessage((incomingMsg) => {
      if (incomingMsg.conversation === conversationId) {
        addMessage(incomingMsg);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [conversationId, addMessage]);

  return {
    messages,
    isLoading,
    addMessage,
  };
}
