"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getSocket,
  disconnectSocket,
  isSocketConnected,
  subscribeSocketState,
} from "@/lib/socket";
import { chatSocketService } from "../services/chat-socket.service";
import { CONVERSATIONS_QUERY_KEY } from "./useConversations";

/**
 * Hook to manage Socket.io lifecycle and synchronize real-time updates globally.
 *
 * Automatically connects to the Socket.io server using the JWT handshake auth,
 * listens for incoming conversation updates and message broadcasts, and invalidates
 * the active conversations query cache to ensure live UI synchronization.
 *
 * @param authToken - Optional explicit auth token override
 */
export function useChatSocket(
  onNewMessage?: (msg: any) => void,
  authToken?: string
) {
  const queryClient = useQueryClient();

  const isConnected = useSyncExternalStore(
    subscribeSocketState,
    isSocketConnected,
    () => false
  );

  useEffect(() => {
    const socket = getSocket(authToken);
    if (!socket) return;

    // Global listener for conversation changes (rename, participants add/remove)
    const unsubscribeConversation =
      chatSocketService.subscribeToConversationUpdated(() => {
        queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      });

    // Global listener for new messages to update conversation preview, ordering, and unread counts
    const unsubscribeNewMessage = chatSocketService.subscribeToNewMessage((msg) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      if (onNewMessage) onNewMessage(msg);
    });

    return () => {
      unsubscribeConversation();
      unsubscribeNewMessage();
    };
  }, [authToken, queryClient, onNewMessage]);

  return { isConnected, disconnect: disconnectSocket };
}
