"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAvatar } from "@/features/chat/components/UserAvatar";
import { Send, Sparkles, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SectionTitle } from "@/components/ui/SectionTitle";

interface SandboxMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

/**
 * InteractiveDemoSection Component with framer-motion AnimatePresence.
 * Live sandbox where visitors type messages and experience real-time messaging on the landing page.
 */
export function InteractiveDemoSection() {
  const [messages, setMessages] = useState<SandboxMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! Type any test message below to experience instant real-time chat preview.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: SandboxMessage = {
      id: String(Date.now()),
      sender: "user",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      const botMsg: SandboxMessage = {
        id: String(Date.now() + 1),
        sender: "bot",
        text: `Delivered instantly! Got your message: "${userMsg.text}"`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <section id="demo" className="py-32 md:py-40 min-h-[600px] flex items-center bg-brand-sidebar/80 border-y border-brand-border relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-mono italic">
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
            <span className="font-mono italic">INTERACTIVE DEMO</span>
          </div>
          <SectionTitle align="center" className="text-3xl md:text-4xl font-mono italic">
            See it happen.
          </SectionTitle>
          <p className="text-xs md:text-sm text-brand-muted pt-1">
            Try typing a message in the live widget below to test instant message delivery.
          </p>
        </motion.div>

        {/* Live Interactive Sandbox Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl mx-auto rounded-2xl border border-brand-border bg-brand-card shadow-2xl shadow-purple-950/90 overflow-hidden"
        >
          <div className="p-3.5 border-b border-brand-border bg-brand-sidebar flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <UserAvatar name="Taghyeer Bot" size="sm" isOnline={true} />
              <div>
                <h4 className="text-xs font-bold text-brand-text">Taghyeer Demo Bot</h4>
                <p className="text-[10px] text-emerald-400 font-mono">Connected • Real-time</p>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
              Live Sandbox
            </span>
          </div>

          <div className="p-4 space-y-2.5 h-64 overflow-y-auto bg-gradient-to-b from-brand-bg/90 to-brand-card/90">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex w-full ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-br-xs shadow-md shadow-purple-950/50"
                        : "bg-brand-surface border border-purple-500/20 text-brand-text rounded-bl-xs shadow-sm"
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <div
                      className={`text-[9px] mt-1 text-right font-mono flex items-center justify-end gap-1 ${
                        m.sender === "user" ? "text-purple-100/90" : "text-slate-400"
                      }`}
                    >
                      <span>{m.time}</span>
                      {m.sender === "user" && <CheckCheck className="h-3 w-3 text-purple-200" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-brand-border bg-brand-sidebar flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something to test live delivery..."
              className="flex-1 h-10 px-3.5 rounded-xl bg-brand-card border border-brand-border text-xs text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button type="submit" size="sm" disabled={!inputText.trim()} className="h-10 px-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold">
              <Send className="h-3.5 w-3.5 mr-1" /> Send
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
