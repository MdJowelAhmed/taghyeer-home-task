import { apiFetch } from "@/lib/api";
import {
  ConversationListResponse,
  CreateConversationPayload,
  CreateConversationResponse,
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
};
