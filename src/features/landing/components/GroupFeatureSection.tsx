"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck } from "lucide-react";
import { UserAvatar } from "@/features/chat/components/UserAvatar";

/**
 * GroupFeatureSection Component.
 * Framer Motion animated group collaboration showcase.
 */
export function GroupFeatureSection() {
  return (
    <section className="py-24 bg-[#070c22]/80 border-y border-purple-500/20 relative overflow-hidden">
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
            <div className="w-full max-w-sm p-5 rounded-2xl bg-[#0b102b] border border-purple-500/30 shadow-2xl shadow-purple-950/80 space-y-4">
              {/* Group Header */}
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white flex items-center justify-center font-bold shadow-md">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Frontend Team Alpha</h4>
                    <p className="text-[10px] text-purple-300">4 members • Active</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Group
                </span>
              </div>

              {/* Members Avatars Stack */}
              <div className="p-3.5 rounded-xl bg-[#0f172a] border border-purple-500/20 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-fuchsia-400" /> Admin Controls
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Multi-user</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <UserAvatar name="Jowel Ahmed" size="sm" isOnline={true} />
                  <UserAvatar name="Sarah Khan" size="sm" />
                  <UserAvatar name="Kyle Reese" size="sm" />
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[10px] font-bold text-purple-200">
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
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold">
              <Users className="h-3.5 w-3.5 text-fuchsia-400" />
              <span>GROUP COLLABORATION</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              One conversation.{" "}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                Everyone included.
              </span>
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Create groups, add members, promote admins, and keep your entire team in sync with unified group message streaming and real-time member updates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
