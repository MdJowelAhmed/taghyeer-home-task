"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Message } from "../types/chat.types";
import { MessageBubble } from "./MessageBubble";
import { MessageSquareDashed, Loader2, ArrowDown } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
  isLoading?: boolean;
}

/**
 * MessageList Component with Smart Auto Scroll & Dynamic Unread Counter.
 * Features:
 * - Automatic scroll on initial load & self messages.
 * - Dynamic unread count badge ("3 new messages ↓") when scrolled up.
 * - Smooth scroll & badge reset on click or scroll-to-bottom.
 */
export function MessageList({
  messages,
  currentUserId,
  isLoading,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const prevMessagesLengthRef = useRef(0);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
    setShowScrollButton(false);
    setUnreadCount(0);
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    const isBottom = distanceFromBottom < 120;
    isNearBottomRef.current = isBottom;

    if (isBottom) {
      setShowScrollButton(false);
      setUnreadCount(0);
    } else if (distanceFromBottom > 200) {
      setShowScrollButton(true);
    }
  };

  useEffect(() => {
    const isInitialLoad = prevMessagesLengthRef.current === 0;
    const addedCount = messages.length - prevMessagesLengthRef.current;
    const lastMsg = messages[messages.length - 1];
    const isSelfMsg = Boolean(lastMsg && currentUserId && lastMsg.sender === currentUserId);

    if (isInitialLoad) {
      scrollToBottom(false);
    } else if (addedCount > 0) {
      if (isNearBottomRef.current || isSelfMsg) {
        scrollToBottom(true);
      } else {
        setShowScrollButton(true);
        setUnreadCount((prev) => prev + addedCount);
      }
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, currentUserId, scrollToBottom]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <div className="flex items-center gap-2 text-sm text-purple-300">
          <Loader2 className="h-5 w-5 animate-spin text-[#D72DFC]" />
          <span>Loading messages...</span>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-2.5">
        <div className="p-3.5 rounded-2xl bg-purple-500/15 text-[#D72DFC] border border-purple-500/25 shadow-lg shadow-purple-950/40">
          <MessageSquareDashed className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-slate-200">No messages yet</p>
        <p className="text-xs text-slate-400 max-w-xs">
          Send a greeting or message below to start the conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex-1 min-h-0">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto p-4 md:p-6 space-y-1"
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isSelf={Boolean(currentUserId && msg.sender === currentUserId)}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Bonus Smart Floating Unread Message Badge */}
      {showScrollButton && (
        <button
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gradient hover:brightness-110 text-white text-xs font-semibold shadow-xl shadow-purple-950/70 border border-purple-400/30 transition-all transform hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {unreadCount > 0 && (
            <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-white text-purple-700 font-extrabold text-[11px] shadow-sm">
              {unreadCount}
            </span>
          )}
          <span>
            {unreadCount > 0
              ? `${unreadCount === 1 ? "new message" : "new messages"}`
              : "Scroll to bottom"}
          </span>
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
