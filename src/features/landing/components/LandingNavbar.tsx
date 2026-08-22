"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * LandingNavbar Component.
 * Fixed ultra-modern navigation header with scroll blur and framer-motion entrance.
 */
export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030712]/90 backdrop-blur-2xl py-3 shadow-2xl shadow-purple-950/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-500 text-white shadow-lg shadow-purple-600/40 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-lg tracking-wider">T</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-white tracking-wide group-hover:text-purple-400 transition-colors">
                TAGHYEER
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Sparkles className="h-2.5 w-2.5 text-fuchsia-400" /> Relay
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Real-time Messaging</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-purple-400 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-purple-400 transition-colors">
            How It Works
          </a>
          <a href="#demo" className="hover:text-purple-400 transition-colors">
            Interactive Demo
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link href="/chat">
            <Button
              size="sm"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold shadow-xl shadow-purple-950/80 hover:scale-105 transition-all border border-purple-400/30"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Open Chat</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
