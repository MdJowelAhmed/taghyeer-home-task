"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { conversationService } from "../services/conversation.service";
import {
  CreateConversationPayload,
  CreateGroupPayload,
  AddParticipantsPayload,
  RenameGroupPayload,
} from "../types/chat.types";

export const CONVERSATIONS_QUERY_KEY = ["chat", "conversations"];

export function useConversations() {
  return useQuery({
    queryKey: CONVERSATIONS_QUERY_KEY,
    queryFn: async () => {
      const response = await conversationService.getConversations();
      return response.data || [];
    },
    staleTime: 1000 * 60,
  });
}

export function useCreateConversation(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateConversationPayload) =>
      conversationService.createConversation(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      if (onSuccessCallback && data._id) onSuccessCallback(data._id);
    },
    onError: () => toast.error("Failed to start conversation. Please try again."),
  });
}

export function useCreateGroupConversation(onSuccessCallback?: (id: string) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateGroupPayload) =>
      conversationService.createGroup(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      toast.success("Group created successfully!");
      if (onSuccessCallback && data._id) onSuccessCallback(data._id);
    },
    onError: () => toast.error("Failed to create group. Please try again."),
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
      toast.success("Member added successfully!");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => toast.error("Only admins can add members."),
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
      toast.success("Member removed.");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => toast.error("Failed to remove member."),
  });
}

export function usePromoteAdmin(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      conversationId,
      userId,
    }: {
      conversationId: string;
      userId: string;
    }) => conversationService.promoteAdmin(conversationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      toast.success("Member promoted to admin!");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => toast.error("Failed to promote member."),
  });
}

export function useRenameGroup(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      conversationId,
      payload,
    }: {
      conversationId: string;
      payload: RenameGroupPayload;
    }) => conversationService.renameGroup(conversationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_QUERY_KEY });
      toast.success("Group renamed successfully!");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => toast.error("Failed to rename group."),
  });
}
