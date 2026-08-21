"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

export function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    onSendMessage(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 md:p-4 border-t border-slate-200 bg-white shrink-0">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 h-11 px-4 rounded-xl bg-slate-100/90 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />

        <Button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="h-11 w-11 p-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 shadow-md shadow-indigo-100"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
}
