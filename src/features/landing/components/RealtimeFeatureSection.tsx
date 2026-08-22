"use client";

import { motion } from "framer-motion";
import { RefreshCwOff } from "lucide-react";
import { NetworkPacketVisualizer } from "./NetworkPacketVisualizer";

/**
 * RealtimeFeatureSection Component.
 * Animated zero-latency WebSocket showcase with framer-motion scroll reveals and live packet visualizer.
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
            <NetworkPacketVisualizer />
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
