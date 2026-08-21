import { apiFetch } from "@/lib/api";
import { Message, SendMessagePayload } from "../types/chat.types";

export const messageService = {
  sendMessage: (payload: SendMessagePayload) => {
    return apiFetch<Message>("/messages", {
      method: "POST",
      body: payload,
    });
  },
};
