"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/Loader";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

export function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when a conversation is selected or opened
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    onSendMessage(trimmed);
    setText("");

    // Maintain cursor focus seamlessly after sending
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 md:p-4 border-t border-purple-500/15 bg-brand-sidebar shrink-0 z-10">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          autoFocus
          className="flex-1 h-11 px-4 rounded-xl bg-brand-card/80 border border-purple-500/25 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-gradient-from focus:border-transparent transition-all"
        />

        <Button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="h-11 w-11 p-0 rounded-xl bg-brand-gradient hover:brightness-110 text-white shrink-0 shadow-lg shadow-purple-950/30 transition-all"
        >
          {isLoading ? (
            <Loader size={0.35} />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
}
