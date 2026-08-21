import { apiFetch } from "@/lib/api";
import {
  ConversationListResponse,
  CreateConversationPayload,
  CreateConversationResponse,
  CreateGroupPayload,
  AddParticipantsPayload,
  GroupConversationResponse,
} from "../types/chat.types";

export const conversationService = {
  getConversations: () => {
    return apiFetch<ConversationListResponse>("/conversations");
  },

  createConversation: (payload: CreateConversationPayload) => {
    return apiFetch<CreateConversationResponse>("/conversations", {
      method: "POST",
      body: payload,
    });
  },

  createGroup: (payload: CreateGroupPayload) => {
    return apiFetch<GroupConversationResponse>("/conversations/group", {
      method: "POST",
      body: payload,
    });
  },

  addParticipants: (
    conversationId: string,
    payload: AddParticipantsPayload
  ) => {
    return apiFetch<GroupConversationResponse>(
      `/conversations/${conversationId}/participants`,
      {
        method: "POST",
        body: payload,
      }
    );
  },

  removeParticipant: (conversationId: string, userId: string) => {
    return apiFetch<GroupConversationResponse>(
      `/conversations/${conversationId}/participants/${userId}`,
      {
        method: "DELETE",
      }
    );
  },

  promoteAdmin: (conversationId: string, userId: string) => {
    return apiFetch<GroupConversationResponse>(
      `/conversations/${conversationId}/admins`,
      {
        method: "POST",
        body: { userId },
      }
    );
  },
};
