"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Interactive Demo", href: "#demo" },
  { name: "Architecture", href: "#architecture" },
];

/**
 * LandingNavbar Component.
 * Fixed ultra-modern navigation header with responsive mobile menu dropdown.
 */
export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        isScrolled || isMobileMenuOpen
          ? "bg-brand-bg/95 backdrop-blur-2xl py-3 shadow-2xl shadow-purple-950/40 border-b border-purple-500/15"
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
              <span className="text-base font-extrabold text-brand-text tracking-wide group-hover:text-purple-400 transition-colors">
                TAGHYEER
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Sparkles className="h-2.5 w-2.5 text-fuchsia-400" /> Relay
              </span>
            </div>
            <p className="text-[10px] text-brand-muted font-mono">Real-time Messaging</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-brand-muted">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-purple-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5">
          <Link href="/chat" className="hidden sm:block">
            <Button
              size="sm"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold shadow-xl shadow-purple-950/80 hover:scale-105 transition-all border border-purple-400/30"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Open Chat</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-brand-card/80 border border-purple-500/25 text-brand-text hover:text-purple-400 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-purple-500/15 bg-brand-bg/95 backdrop-blur-2xl px-4 py-4 space-y-3"
          >
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-brand-text hover:bg-purple-500/15 hover:text-purple-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-purple-500/15">
              <Link href="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-center bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold py-2.5">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Open Chat
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
