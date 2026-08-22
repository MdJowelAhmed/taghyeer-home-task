"use client";

import { motion } from "framer-motion";
import { RefreshCwOff } from "lucide-react";
import { NetworkPacketVisualizer } from "./NetworkPacketVisualizer";

import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * RealtimeFeatureSection Component.
 * Animated zero-latency WebSocket showcase with framer-motion scroll reveals and live packet visualizer.
 */
export function RealtimeFeatureSection() {
  return (
    <section id="features" className="py-24 bg-brand-sidebar/80 border-y border-brand-border relative overflow-hidden">
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
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-mono italic">
              <RefreshCwOff className="h-3.5 w-3.5 text-fuchsia-400" />
              <span className="font-mono italic">ZERO PAGE REFRESH</span>
            </div>

            <SectionTitle align="left" className="text-3xl md:text-4xl font-mono italic">
              Messages that arrive while you are still typing.
            </SectionTitle>

            <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
              No page refresh. No polling delays. Powered by WebSocket event listeners, messages and active chat status sync instantly across all devices.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
