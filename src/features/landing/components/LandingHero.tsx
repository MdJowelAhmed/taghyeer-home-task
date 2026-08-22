"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ArrowDown, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroChatPreview } from "./HeroChatPreview";

import { AnimatedBackgroundNodes } from "./AnimatedBackgroundNodes";
import { StaggeredTitle } from "./StaggeredTitle";
import heroImg from "@/assets/hero2.webp";

/**
 * LandingHero Component with framer-motion entrance and hero2.webp background image overlay.
 */
export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-brand-bg">
      {/* Background Image with Smooth Ambient Breathing Animation */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <Image
          src={heroImg}
          alt="Hero Digital Globe Network Background"
          fill
          priority
          className="object-cover object-center mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/50 via-brand-bg/20 to-brand-bg" />
      </motion.div>

      <AnimatedBackgroundNodes />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Animated Copywriting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono italic shadow-xl shadow-purple-950/40">
              <Zap className="h-3.5 w-3.5 text-fuchsia-400 animate-pulse" />
              <span className="tracking-wide font-mono italic">REAL-TIME COMMUNICATION ENGINE</span>
            </div>

            <StaggeredTitle
              text="Real conversations."
              highlightText="Without the waiting."
              className="text-4xl md:text-5xl lg:text-6xl text-white"
            />

            <p className="pt-2 text-sm md:text-base text-brand-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Connect with people instantly, start private 1-to-1 chats, and bring your groups together in one sleek, real-time messaging space.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/chat" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-7 text-sm font-extrabold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-2xl shadow-purple-950/90 hover:scale-105 transition-all gap-2 border border-purple-400/30"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Open Chat Application</span>
                </Button>
              </Link>

              <a href="#features" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-6 text-sm font-semibold border-purple-500/30 bg-purple-950/20 text-slate-200 hover:bg-purple-900/30 hover:border-purple-400/50 gap-2"
                >
                  <span>Explore Features</span>
                  <ArrowDown className="h-4 w-4 text-purple-400" />
                </Button>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>JWT Authenticated</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="h-4 w-4 text-fuchsia-400" />
                <span>Socket.io Live Sync</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroChatPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
