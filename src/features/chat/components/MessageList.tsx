"use client";

import { useEffect, useRef } from "react";
import { Message } from "../types/chat.types";
import { MessageBubble } from "./MessageBubble";
import { MessageSquareDashed } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-2">
        <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-500">
          <MessageSquareDashed className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-slate-600">No messages yet</p>
        <p className="text-xs text-slate-400">
          Send a greeting to start this conversation!
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
