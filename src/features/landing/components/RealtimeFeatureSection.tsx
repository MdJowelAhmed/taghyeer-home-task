"use client";

import { motion } from "framer-motion";
import { Zap, CheckCheck, RefreshCwOff, Radio } from "lucide-react";

/**
 * RealtimeFeatureSection Component.
 * Animated zero-latency WebSocket showcase with framer-motion scroll reveals.
 */
export function RealtimeFeatureSection() {
  return (
    <section id="features" className="py-24 bg-[#070c22]/80 border-y border-purple-500/20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Feature Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0b102b] border border-purple-500/30 shadow-2xl shadow-purple-950/80 space-y-4 relative group hover:border-purple-400/50 transition-colors">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white">Socket.io Handshake</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono border border-emerald-500/30">
                  0ms Latency
                </span>
              </div>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-xs text-purple-200 flex items-center justify-between shadow-sm"
                >
                  <span className="font-mono">Event: message:send</span>
                  <Zap className="h-4 w-4 text-fuchsia-400" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3.5 rounded-xl bg-[#0f172a] border border-purple-500/20 text-xs text-slate-200 flex items-center justify-between shadow-sm"
                >
                  <span className="font-mono">Broadcast: message:new</span>
                  <CheckCheck className="h-4 w-4 text-emerald-400" />
                </motion.div>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-center text-xs font-bold shadow-lg shadow-purple-950/60">
                <span>Instant UI Refresh Without Reloading</span>
              </div>
            </div>
          </motion.div>

          {/* Right Feature Copywriting */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 space-y-4 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold">
              <RefreshCwOff className="h-3.5 w-3.5 text-fuchsia-400" />
              <span>ZERO PAGE REFRESH</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Messages that arrive while you&apos;re{" "}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                still typing.
              </span>
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              No page refresh. No polling delays. Powered by WebSocket event listeners, messages and active chat status sync instantly across all devices.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
