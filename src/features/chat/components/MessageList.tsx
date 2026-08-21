"use client";

import { useEffect, useRef } from "react";
import { Message } from "../types/chat.types";
import { MessageBubble } from "./MessageBubble";
import { MessageSquareDashed, Loader2 } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
  isLoading?: boolean;
}

/**
 * MessageList Component
 * Displays loading state, empty state, or list of messages with auto-scroll to bottom.
 */
export function MessageList({
  messages,
  currentUserId,
  isLoading,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-1">
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          isSelf={Boolean(currentUserId && msg.sender === currentUserId)}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
