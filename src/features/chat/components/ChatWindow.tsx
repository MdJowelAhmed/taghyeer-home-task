"use client";

import { useState } from "react";
import { Conversation, Message } from "../types/chat.types";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useSendMessage } from "../hooks/useSendMessage";

interface ChatWindowProps {
  conversation: Conversation;
  currentUserId?: string;
  onBack: () => void;
}

export function ChatWindow({
  conversation,
  currentUserId,
  onBack,
}: ChatWindowProps) {
  // Local messages state for sending and display until message history API is verified
  const [messages, setMessages] = useState<Message[]>(() => {
    if (conversation.lastMessage?.text && conversation.lastMessage?._id) {
      return [
        {
          _id: conversation.lastMessage._id,
          conversation: conversation._id,
          sender: conversation.lastMessage.sender || "",
          text: conversation.lastMessage.text,
          createdAt: conversation.lastMessage.createdAt || conversation.updatedAt,
        },
      ];
    }
    return [];
  });

  const { mutate: sendMessage, isPending } = useSendMessage((sentMsg) => {
    setMessages((prev) => [...prev, sentMsg]);
  });

  const handleSend = (text: string) => {
    sendMessage({
      conversationId: conversation._id,
      text,
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
      <ChatHeader conversation={conversation} onBack={onBack} />
      <MessageList messages={messages} currentUserId={currentUserId} />
      <MessageInput onSendMessage={handleSend} isLoading={isPending} />
    </div>
  );
}
