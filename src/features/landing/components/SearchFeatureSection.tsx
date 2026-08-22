"use client";

import { motion } from "framer-motion";
import { Search, UserPlus, Phone } from "lucide-react";
import { UserAvatar } from "@/features/chat/components/UserAvatar";

import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * SearchFeatureSection Component.
 * Framer Motion animated search discovery showcase.
 */
export function SearchFeatureSection() {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 space-y-4 text-center md:text-left order-2 md:order-1"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-mono italic">
              <Search className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-mono italic">INSTANT DISCOVERY</span>
            </div>

            <SectionTitle align="left" className="text-3xl md:text-4xl font-mono italic">
              Find someone. Start talking.
            </SectionTitle>

            <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
              Search any user across Taghyeer by name or phone number. One click initializes a direct conversation with full message history and status indicators.
            </p>
          </motion.div>

          {/* Right Visual Sandbox */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 flex justify-center order-1 md:order-2"
          >
            <div className="w-full max-w-sm p-5 rounded-2xl bg-brand-card border border-brand-border shadow-2xl shadow-purple-950/80 space-y-3">
              {/* Search Bar Visual */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                <div className="w-full h-10 pl-10 pr-3 rounded-xl bg-brand-sidebar border border-brand-border text-xs text-brand-text flex items-center font-medium">
                  <span>Searching &quot;Md Jowel&quot;...</span>
                </div>
              </div>

              {/* Result Items */}
              <div className="space-y-2 pt-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <UserAvatar name="Md Jowel Ahmed" size="sm" isOnline={true} />
                    <div>
                      <p className="text-xs font-bold text-brand-text">Md Jowel Ahmed</p>
                      <p className="text-[10px] text-purple-600 dark:text-purple-300 font-mono">01236547899</p>
                    </div>
                  </div>
                  <UserPlus className="h-4 w-4 text-fuchsia-400" />
                </motion.div>

                <div className="p-3 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-2.5">
                    <UserAvatar name="Kyle Reese" size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-brand-text">Kyle Reese</p>
                      <p className="text-[10px] text-brand-muted font-mono">+12805550103</p>
                    </div>
                  </div>
                  <Phone className="h-3.5 w-3.5 text-brand-muted" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
