export interface Participant {
  _id: string;
  name: string;
  phone: string;
}

export interface LastMessage {
  _id?: string;
  text?: string;
  sender?: string;
  createdAt?: string;
}

export interface Conversation {
  _id: string;
  type: "direct" | "group" | string;
  name?: string;
  createdBy?: string;
  admins?: string[];
  lastMessage?: LastMessage;
  updatedAt: string;
  participant?: Participant;
  participants?: string[] | Participant[];
}

export interface ConversationListResponse {
  data: Conversation[];
}

export interface CreateConversationPayload {
  userId: string;
}

export interface CreateConversationResponse {
  _id: string;
  participants: string[];
  createdAt: string;
}

export interface CreateGroupPayload {
  name: string;
  participantIds: string[];
}

export interface GroupConversationResponse {
  _id: string;
  type: "group";
  name: string;
  createdBy: string;
  admins: string[];
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: string;
  text: string;
  createdAt: string;
}

export interface SendMessagePayload {
  conversationId: string;
  text: string;
}
