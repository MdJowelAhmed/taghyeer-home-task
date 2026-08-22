"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback, useMemo } from "react";
import { Message, Conversation, Participant } from "../types/chat.types";
import { MessageBubble } from "./MessageBubble";
import { MessageSquareDashed, ArrowDown } from "lucide-react";
import { Loader } from "@/components/ui/Loader";

const TOP_THRESHOLD = 100;

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
  isLoading?: boolean;
  isLoadingOlder?: boolean;
  hasMore?: boolean;
  onLoadOlder?: () => void;
  conversation?: Conversation;
  currentUser?: { name?: string; phone?: string };
  onSelectUser?: (user: { _id: string; name: string; phone?: string }) => void;
}

export function MessageList({
  messages, currentUserId, isLoading, isLoadingOlder, hasMore, onLoadOlder,
  conversation, currentUser, onSelectUser,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const prevMsgLenRef = useRef(0);
  const paginationInProgressRef = useRef(false);
  const prevScrollHeightRef = useRef(0);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const participantsMap = useMemo(() => {
    const map = new Map<string, Participant>();
    if (conversation?.participant) map.set(conversation.participant._id, conversation.participant);
    if (Array.isArray(conversation?.participants)) {
      conversation.participants.forEach((p) => {
        if (typeof p === "object" && p && "_id" in p) map.set((p as Participant)._id, p as Participant);
      });
    }
    return map;
  }, [conversation]);

  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    setShowScrollButton(false);
    setUnreadCount(0);
  }, []);

  /**
   * useLayoutEffect: fires synchronously AFTER DOM update but BEFORE browser paint.
   * This is the key to zero-flash scroll restoration — the user never sees
   * the intermediate position where older messages are at the top.
   */
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (paginationInProgressRef.current) {
      // Restore scroll so the same message stays in view — no visual jump
      container.scrollTop = container.scrollHeight - prevScrollHeightRef.current;
      paginationInProgressRef.current = false;
      prevMsgLenRef.current = messages.length;
      return;
    }

    const isInitial = prevMsgLenRef.current === 0;
    const addedCount = messages.length - prevMsgLenRef.current;
    prevMsgLenRef.current = messages.length;

    if (isInitial && messages.length > 0) {
      // First render of this conversation — jump to bottom instantly
      container.scrollTop = container.scrollHeight;
      return;
    }

    if (addedCount > 0) {
      const lastMsg = messages[messages.length - 1];
      const isSelf = Boolean(lastMsg && currentUserId && (
        lastMsg.sender === currentUserId ||
        (typeof lastMsg.sender === "object" && (lastMsg.sender as any)._id === currentUserId)
      ));
      if (isNearBottomRef.current || isSelf) {
        // Smooth scroll for real-time appended messages
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setShowScrollButton(false);
        setUnreadCount(0);
      } else {
        setShowScrollButton(true);
        setUnreadCount((p) => p + addedCount);
      }
    }
  }, [messages, currentUserId]);

  const triggerLoadOlder = useCallback(() => {
    if (!hasMore || isLoadingOlder || !onLoadOlder || paginationInProgressRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    paginationInProgressRef.current = true;
    prevScrollHeightRef.current = container.scrollHeight;
    onLoadOlder();
  }, [hasMore, isLoadingOlder, onLoadOlder]);

  const handleScroll = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const dist = c.scrollHeight - c.scrollTop - c.clientHeight;
    isNearBottomRef.current = dist < 120;
    if (isNearBottomRef.current) { setShowScrollButton(false); setUnreadCount(0); }
    else if (dist > 200) setShowScrollButton(true);
    if (c.scrollTop <= TOP_THRESHOLD) triggerLoadOlder();
  }, [triggerLoadOlder]);

  // Grace timer for empty state to prevent brief flashes before messages load
  const [showEmptyState, setShowEmptyState] = useState(false);

  useEffect(() => {
    if (!isLoading && messages.length === 0) {
      const timer = setTimeout(() => setShowEmptyState(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowEmptyState(false);
    }
  }, [isLoading, messages.length]);

  if (isLoading || (messages.length === 0 && !showEmptyState)) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
        <Loader size={1} />
      </div>
    );
  }

  if (!isLoading && messages.length === 0 && showEmptyState) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-2.5 animate-in fade-in duration-200">
        <div className="p-3.5 rounded-2xl bg-purple-500/15 text-[#D72DFC] border border-purple-500/25 shadow-lg">
          <MessageSquareDashed className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-brand-text">No messages yet</p>
        <p className="text-xs text-brand-muted max-w-xs">Send a message below to start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="relative flex-1 min-h-0">
      {/* overflow-anchor:none prevents browser's own scroll anchoring from
          fighting with our manual restoration — essential for smooth UX */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto p-4 md:p-6 space-y-1"
        style={{ overflowAnchor: "none" }}
      >
        {isLoadingOlder ? (
          <div className="flex items-center justify-center py-3 gap-2 text-xs text-purple-300">
            <Loader size={0.35} />
            <span>Loading older messages...</span>
          </div>
        ) : !hasMore && messages.length > 0 ? (
          <div className="flex items-center justify-center py-3">
            <span className="text-[11px] text-brand-muted font-mono px-3 py-1 rounded-full bg-brand-surface border border-brand-border">
              ── Beginning of conversation ──
            </span>
          </div>
        ) : null}

        {messages.map((msg) => {
          const senderId = typeof msg.sender === "object" ? (msg.sender as any)._id : msg.sender;
          const isSelf = Boolean(currentUserId && senderId === currentUserId);
          const pInfo = participantsMap.get(senderId);
          const senderName = isSelf ? currentUser?.name || "You" : pInfo?.name || (typeof msg.sender === "object" ? (msg.sender as any).name : "User");
          const senderPhone = isSelf ? currentUser?.phone || "" : pInfo?.phone || (typeof msg.sender === "object" ? (msg.sender as any).phone : "");
          return (
            <MessageBubble key={msg._id} message={msg} isSelf={isSelf} senderId={senderId}
              senderName={senderName} senderPhone={senderPhone} onSelectUser={onSelectUser} />
          );
        })}
        <div ref={bottomRef} />
      </div>

      {showScrollButton && (
        <button
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gradient hover:brightness-110 text-white text-xs font-semibold shadow-xl border border-purple-400/30 transition-all transform hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {unreadCount > 0 && <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-white text-purple-700 font-extrabold text-[11px]">{unreadCount}</span>}
          <span>{unreadCount > 0 ? `${unreadCount === 1 ? "new message" : "new messages"}` : "Scroll to bottom"}</span>
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
