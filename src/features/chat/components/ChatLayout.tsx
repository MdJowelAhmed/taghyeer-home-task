"use client";

import { useState, useMemo } from "react";
import { useConversations } from "../hooks/useConversations";
import { useChatSocket } from "../hooks/useChatSocket";
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
  const [unreadMap, setUnreadMap] = useState<Record<string, number>>({});

  const getConvId = (msg: any) => {
    if (!msg) return null;
    if (typeof msg.conversation === "string") return msg.conversation;
    if (msg.conversation && typeof msg.conversation === "object") return msg.conversation._id;
    return msg.conversationId || null;
  };

  // Initialize and synchronize global real-time socket lifecycle
  useChatSocket((msg) => {
    const convId = getConvId(msg);
    if (convId && convId !== selectedConversationId) {
      setUnreadMap((prev) => ({
        ...prev,
        [convId]: (prev[convId] || 0) + 1,
      }));
    }
  });

  const { data: conversations = [], isLoading } = useConversations();

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    setUnreadMap((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const selectedConversation = useMemo(() => {
    return (
      conversations.find((c) => c._id === selectedConversationId) || null
    );
  }, [conversations, selectedConversationId]);

  return (
    <div className="relative flex-1 min-h-0 flex overflow-hidden bg-brand-bg">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-[20%] w-[450px] h-[450px] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] rounded-full bg-fuchsia-900/10 blur-[140px] pointer-events-none" />

      {/* Sidebar */}
      <div
        className={cn(
          "w-full md:w-auto h-full flex flex-col shrink-0 min-h-0 z-10",
          selectedConversationId ? "hidden md:flex" : "flex"
        )}
      >
        <ChatSidebar
          conversations={conversations}
          isLoading={isLoading}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          unreadMap={unreadMap}
        />
      </div>

      {/* Main Chat Area */}
      <div
        className={cn(
          "flex-1 min-h-0 h-full flex flex-col overflow-hidden z-10",
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

