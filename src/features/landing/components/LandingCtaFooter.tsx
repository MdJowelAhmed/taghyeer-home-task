"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * LandingCtaFooter Component with framer-motion glow animations.
 */
export function LandingCtaFooter() {
  return (
    <>
      {/* Final Call to Action */}
      <section className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-10 md:p-14 rounded-3xl bg-brand-card border border-brand-border shadow-2xl shadow-purple-950/90 space-y-6 relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-56 h-56 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-fuchsia-600/30 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-mono italic">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
              <span className="font-mono italic">START MESSAGING TODAY</span>
            </div>

            <SectionTitle align="center" className="text-3xl md:text-5xl font-mono italic">
              Your next conversation starts here.
            </SectionTitle>

            <p className="text-xs md:text-sm text-brand-muted max-w-md mx-auto leading-relaxed pt-1">
              Simple messaging. Instant real-time connection. Direct 1-to-1 and group chats without the waiting.
            </p>

            <div className="pt-2 flex justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="h-12 px-8 text-sm font-extrabold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-2xl shadow-purple-950/90 hover:scale-105 transition-all gap-2 border border-purple-400/30"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Open Chat Application</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-brand-border bg-brand-sidebar text-xs text-brand-muted">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white font-extrabold text-xs">
              T
            </div>
            <span className="font-bold text-brand-text tracking-wide">TAGHYEER CHAT</span>
            <span className="text-brand-muted">• Real conversations. Without the waiting.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-brand-text transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-text transition-colors">How It Works</a>
            <Link href="/chat" className="hover:text-brand-text transition-colors font-bold text-purple-600 dark:text-purple-400">Open Chat</Link>
          </div>

          <p className="text-[11px] font-mono text-brand-muted">
            &copy; {new Date().getFullYear()} Md Jowel Ahmed • Taghyeer Digital Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
