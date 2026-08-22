"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserAvatar } from "@/features/chat/components/UserAvatar";
import { Send, CheckCheck, Zap, Lock, ShieldCheck } from "lucide-react";

interface DemoMessage {
  id: number;
  sender: "sarah" | "me";
  text: string;
  time: string;
}

const MESSAGES_SEQUENCE: DemoMessage[] = [
  {
    id: 1,
    sender: "sarah",
    text: "Hey! Are you free to review the chat build?",
    time: "10:14 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Yeah, testing real-time socket delivery right now!",
    time: "10:14 AM",
  },
  {
    id: 3,
    sender: "sarah",
    text: "Perfect. Messages arrive instantly without any reload 🚀",
    time: "10:15 AM",
  },
];

export function HeroChatPreview() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleCount(2), 1400);
    const timer2 = setTimeout(() => setIsTyping(true), 2400);
    const timer3 = setTimeout(() => {
      setIsTyping(false);
      setVisibleCount(3);
    }, 3600);

    const resetTimer = setTimeout(() => {
      setVisibleCount(1);
      setIsTyping(false);
    }, 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(resetTimer);
    };
  }, [visibleCount === 1]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating Feature Pills */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/80 backdrop-blur-xl border border-purple-400/40 text-purple-200 text-xs font-bold shadow-2xl shadow-purple-950/80"
      >
        <Zap className="h-3.5 w-3.5 text-fuchsia-400" />
        <span>0ms Latency</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -right-6 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-2xl shadow-purple-950/80"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>JWT Encrypted</span>
      </motion.div>

      {/* Main Glassmorphic Widget Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl border border-white/10 bg-[#0b102b]/90 backdrop-blur-2xl shadow-2xl shadow-purple-950/90 overflow-hidden"
      >
        {/* Widget Top Bar */}
        <div className="px-4 py-3 border-b border-purple-500/20 bg-[#070c22] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar name="Sarah Khan" size="sm" isOnline={true} />
            <div>
              <h4 className="text-xs font-bold text-white">Sarah Khan</h4>
              <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online • Socket Live</span>
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-300 border border-purple-500/30">
            Live Preview
          </span>
        </div>

        {/* Messages Body */}
        <div className="p-4 space-y-3 min-h-[220px] max-h-[220px] overflow-y-auto flex flex-col justify-end bg-gradient-to-b from-[#020618]/80 to-[#0b102b]/80">
          {MESSAGES_SEQUENCE.slice(0, visibleCount).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-xs relative ${
                  msg.sender === "me"
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-br-xs shadow-lg shadow-purple-950/40"
                    : "bg-[#0f172a] border border-purple-500/25 text-slate-100 rounded-bl-xs shadow-sm"
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <div
                  className={`text-[9px] mt-1 text-right font-mono flex items-center justify-end gap-1 ${
                    msg.sender === "me" ? "text-purple-100/90" : "text-slate-400"
                  }`}
                >
                  <span>{msg.time}</span>
                  {msg.sender === "me" && <CheckCheck className="h-3 w-3 text-purple-200" />}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-purple-300 animate-pulse pt-1">
              <UserAvatar name="Sarah Khan" size="sm" />
              <div className="px-3 py-1.5 rounded-full bg-[#0f172a] border border-purple-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-purple-500/20 bg-[#070c22] flex items-center gap-2">
          <div className="flex-1 h-9 px-3 rounded-xl bg-[#0b102b] border border-purple-500/20 text-xs text-slate-400 flex items-center">
            <span>Type a message...</span>
          </div>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-950/50">
            <Send className="h-4 w-4" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
