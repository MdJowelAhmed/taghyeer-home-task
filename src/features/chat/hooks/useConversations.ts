"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationService } from "../services/conversation.service";
import {
  CreateConversationPayload,
  CreateGroupPayload,
  AddParticipantsPayload,
} from "../types/chat.types";

export const CONVERSATIONS_QUERY_KEY = ["chat", "conversations"];

export function useConversations() {
  return useQuery({
    queryKey: CONVERSATIONS_QUERY_KEY,
    queryFn: async () => {
      const response = await conversationService.getConversations();
      return response.data || [];
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 10000, // Background poll every 10s until socket is integrated
  });
}

export function useCreateConversation(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateConversationPayload) =>
      conversationService.createConversation(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      if (onSuccessCallback && data._id) {
        onSuccessCallback(data._id);
      }
    },
  });
}

export function useCreateGroupConversation(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGroupPayload) =>
      conversationService.createGroup(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      if (onSuccessCallback && data._id) {
        onSuccessCallback(data._id);
      }
    },
  });
}

export function useAddParticipants(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      payload,
    }: {
      conversationId: string;
      payload: AddParticipantsPayload;
    }) => conversationService.addParticipants(conversationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
}

export function useRemoveParticipant(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      userId,
    }: {
      conversationId: string;
      userId: string;
    }) => conversationService.removeParticipant(conversationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
}
