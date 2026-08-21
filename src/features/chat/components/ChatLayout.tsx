"use client";

import { useState, useMemo } from "react";
import { useConversations } from "../hooks/useConversations";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { EmptyChat } from "./EmptyChat";
import { cn } from "@/lib/utils";

interface ChatLayoutProps {
  currentUserId?: string;
}

export function ChatLayout({ currentUserId }: ChatLayoutProps) {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const { data: conversations = [], isLoading } = useConversations();

  const selectedConversation = useMemo(() => {
    return (
      conversations.find((c) => c._id === selectedConversationId) || null
    );
  }, [conversations, selectedConversationId]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar: Visible on desktop, or on mobile when no conversation is active */}
      <div
        className={cn(
          "w-full md:w-auto h-full flex flex-col shrink-0",
          selectedConversationId ? "hidden md:flex" : "flex"
        )}
      >
        <ChatSidebar
          conversations={conversations}
          isLoading={isLoading}
          selectedConversationId={selectedConversationId}
          onSelectConversation={(id) => setSelectedConversationId(id)}
        />
      </div>

      {/* Main Chat Area: Visible on desktop, or on mobile when conversation is active */}
      <div
        className={cn(
          "flex-1 h-full flex flex-col overflow-hidden",
          !selectedConversationId ? "hidden md:flex" : "flex"
        )}
      >
        {selectedConversation ? (
          <ChatWindow
            key={selectedConversation._id}
            conversation={selectedConversation}
            currentUserId={currentUserId}
            onBack={() => setSelectedConversationId(null)}
          />
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
}
