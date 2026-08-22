"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck } from "lucide-react";
import { UserAvatar } from "@/features/chat/components/UserAvatar";

import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * GroupFeatureSection Component.
 * Framer Motion animated group collaboration showcase.
 */
export function GroupFeatureSection() {
  return (
    <section className="py-24 bg-brand-sidebar/80 border-y border-brand-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-sm p-5 rounded-2xl bg-brand-card border border-brand-border shadow-2xl shadow-purple-950/80 space-y-4">
              {/* Group Header */}
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white flex items-center justify-center font-bold shadow-md">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-text">Frontend Team Alpha</h4>
                    <p className="text-[10px] text-purple-600 dark:text-purple-300">4 members • Active</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                  Group
                </span>
              </div>

              {/* Members Avatars Stack */}
              <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-text flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-fuchsia-400" /> Admin Controls
                  </span>
                  <span className="text-[10px] text-brand-muted font-mono">Multi-user</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <UserAvatar name="Jowel Ahmed" size="sm" isOnline={true} />
                  <UserAvatar name="Sarah Khan" size="sm" />
                  <UserAvatar name="Kyle Reese" size="sm" />
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[10px] font-bold text-purple-600 dark:text-purple-200">
                    +1
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 space-y-4 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-mono italic">
              <Users className="h-3.5 w-3.5 text-fuchsia-400" />
              <span className="font-mono italic">GROUP COLLABORATION</span>
            </div>

            <SectionTitle align="left" className="text-3xl md:text-4xl font-mono italic">
              One conversation. Everyone included.
            </SectionTitle>

            <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
              Create groups, add members, promote admins, and keep your entire team in sync with unified group message streaming and real-time member updates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
