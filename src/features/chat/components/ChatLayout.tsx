"use client";

import { useState, useMemo } from "react";
import { useConversations } from "../hooks/useConversations";
import { useChatSocket } from "../hooks/useChatSocket";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { EmptyChat } from "./EmptyChat";
import { cn } from "@/lib/utils";

import { DirectMessageModal, TargetUser } from "./DirectMessageModal";

interface ChatLayoutProps {
  currentUserId?: string;
}

export function ChatLayout({ currentUserId }: ChatLayoutProps) {
  // Read initial active conversation ID from URL query params (?conversationId=xxx)
  const getInitialConvId = () => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get("conversationId") || params.get("id") || params.get("c") || null;
  };

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(getInitialConvId);
  const [unreadMap, setUnreadMap] = useState<Record<string, number>>({});
  const [directMessageUser, setDirectMessageUser] = useState<TargetUser | null>(null);

  // Sync URL search params without triggering page reload
  const updateUrlParam = (id: string | null) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("conversationId", id);
      url.searchParams.delete("id");
      url.searchParams.delete("c");
    } else {
      url.searchParams.delete("conversationId");
      url.searchParams.delete("id");
      url.searchParams.delete("c");
    }
    window.history.replaceState(null, "", url.pathname + url.search);
  };

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

  const handleSelectConversation = (id: string | null) => {
    setSelectedConversationId(id);
    updateUrlParam(id);
    if (id) {
      setUnreadMap((prev) => {
        if (!prev[id]) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handlePromptDirectMessage = (user: TargetUser) => {
    if (user._id === currentUserId) return;
    setDirectMessageUser(user);
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
            onBack={() => handleSelectConversation(null)}
            onSelectUser={handlePromptDirectMessage}
          />
        ) : (
          <EmptyChat />
        )}
      </div>

      {/* Direct Message Confirmation Modal */}
      <DirectMessageModal
        isOpen={Boolean(directMessageUser)}
        onClose={() => setDirectMessageUser(null)}
        targetUser={directMessageUser}
        onSelectConversation={handleSelectConversation}
      />
    </div>
  );
}

