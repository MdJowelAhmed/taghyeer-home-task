"use client";

import { Conversation } from "../types/chat.types";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useSendMessage } from "../hooks/useSendMessage";
import { useConversationMessages } from "../hooks/useConversationMessages";

interface ChatWindowProps {
  conversation: Conversation;
  currentUserId?: string;
  onBack: () => void;
  onSelectUser?: (user: { _id: string; name: string; phone?: string }) => void;
}

/**
 * ChatWindow component managing active conversation header,
 * real-time message history stream, and message composer.
 *
 * Architecture Flow: UI Components -> Custom Hooks -> Services -> apiFetch / Socket
 */
export function ChatWindow({
  conversation,
  currentUserId,
  onBack,
  onSelectUser,
}: ChatWindowProps) {
  const {
    messages,
    isLoading,
    isLoadingOlder,
    hasMore,
    addMessage,
    loadOlderMessages,
  } = useConversationMessages(conversation._id);

  const { mutate: sendMessage, isPending: isSending } = useSendMessage(
    (sentMsg) => addMessage(sentMsg)
  );

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendMessage({ conversationId: conversation._id, text: text.trim() });
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col h-full bg-brand-bg overflow-hidden relative">
      <ChatHeader
        conversation={conversation}
        currentUserId={currentUserId}
        onBack={onBack}
        onSelectUser={onSelectUser}
      />
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        isLoading={isLoading}
        isLoadingOlder={isLoadingOlder}
        hasMore={hasMore}
        onLoadOlder={loadOlderMessages}
        conversation={conversation}
        onSelectUser={onSelectUser}
      />
      <MessageInput onSendMessage={handleSend} isLoading={isSending} />
    </div>
  );
}
