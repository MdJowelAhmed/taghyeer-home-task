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
    <div className="relative flex-1 flex overflow-hidden bg-brand-bg">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[450px] h-[450px] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-fuchsia-900/10 blur-[140px] pointer-events-none" />

      {/* Sidebar */}
      <div
        className={cn(
          "w-full md:w-auto h-full flex flex-col shrink-0 z-10",
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

      {/* Main Chat Area */}
      <div
        className={cn(
          "flex-1 h-full flex flex-col overflow-hidden z-10",
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
