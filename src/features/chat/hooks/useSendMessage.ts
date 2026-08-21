"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "../services/message.service";
import { SendMessagePayload, Message } from "../types/chat.types";
import { CONVERSATIONS_QUERY_KEY } from "./useConversations";

export function useSendMessage(onSuccessCallback?: (msg: Message) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) =>
      messageService.sendMessage(payload),
    onSuccess: (newMessage) => {
      // Invalidate conversation list so lastMessage updates
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      if (onSuccessCallback) {
        onSuccessCallback(newMessage);
      }
    },
  });
}
