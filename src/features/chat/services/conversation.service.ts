import { apiFetch } from "@/lib/api";
import {
  ConversationListResponse,
  CreateConversationPayload,
  CreateConversationResponse,
  CreateGroupPayload,
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
};
