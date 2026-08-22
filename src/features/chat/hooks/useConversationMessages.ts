"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "../types/chat.types";
import { messageService } from "../services/message.service";
import { chatSocketService } from "../services/chat-socket.service";

const PAGE_LIMIT = 20;

export const getMessagesQueryKey = (conversationId: string) => [
  "chat",
  "messages",
  conversationId,
];

/**
 * Custom hook for cursor-based paginated message history + real-time socket sync.
 * Initial load fetches latest PAGE_LIMIT messages (newest first → reversed).
 * loadOlderMessages() fetches older messages using `before` cursor param.
 */
export function useConversationMessages(conversationId: string) {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const initializedFor = useRef<string | null>(null);

  // Initial load whenever conversation changes
  useEffect(() => {
    if (!conversationId || initializedFor.current === conversationId) return;
    initializedFor.current = conversationId;

    setIsLoading(true);
    setMessages([]);
    setHasMore(false);

    messageService
      .getConversationMessages(conversationId, PAGE_LIMIT)
      .then((res) => {
        setMessages([...( res.messages || [])].reverse());
        setHasMore(res.hasMore ?? false);
      })
      .finally(() => setIsLoading(false));
  }, [conversationId]);

  // Reset when conversation changes (next render picks it up via ref)
  useEffect(() => {
    initializedFor.current = null;
  }, [conversationId]);

  /** Prepend older messages (scroll-up pagination) */
  const loadOlderMessages = useCallback(async () => {
    if (!hasMore || isLoadingOlder || !messages.length) return;

    const oldestId = messages[0]._id;
    setIsLoadingOlder(true);

    try {
      const res = await messageService.getConversationMessages(
        conversationId,
        PAGE_LIMIT,
        oldestId
      );
      const older = [...(res.messages || [])].reverse();
      setMessages((prev) => [...older, ...prev]);
      setHasMore(res.hasMore ?? false);
    } finally {
      setIsLoadingOlder(false);
    }
  }, [conversationId, hasMore, isLoadingOlder, messages]);

  /** Append a new real-time message (no duplicates) */
  const addMessage = useCallback((newMsg: Message) => {
    setMessages((prev) => {
      if (prev.some((m) => m._id === newMsg._id)) return prev;
      return [...prev, newMsg];
    });
    // Keep query cache in sync for other hooks that may observe it
    queryClient.setQueryData<Message[]>(
      getMessagesQueryKey(conversationId),
      (prev = []) => {
        if (prev.some((m) => m._id === newMsg._id)) return prev;
        return [...prev, newMsg];
      }
    );
  }, [conversationId, queryClient]);

  // Subscribe to real-time socket events
  useEffect(() => {
    if (!conversationId) return;
    const unsub = chatSocketService.subscribeToNewMessage((incomingMsg) => {
      if (incomingMsg.conversation === conversationId) {
        addMessage(incomingMsg as unknown as Message);
      }
    });
    return () => unsub();
  }, [conversationId, addMessage]);

  return { messages, isLoading, isLoadingOlder, hasMore, addMessage, loadOlderMessages };
}
