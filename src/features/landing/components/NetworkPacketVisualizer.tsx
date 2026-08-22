"use client";

import { motion } from "framer-motion";
import { Server, Smartphone, Zap, CheckCircle2 } from "lucide-react";

/**
 * NetworkPacketVisualizer Component.
 * Animated real-time packet stream moving along paths between client node and socket server node.
 */
export function NetworkPacketVisualizer() {
  return (
    <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0b102b] border border-purple-500/30 shadow-2xl shadow-purple-950/90 relative overflow-hidden group hover:border-purple-400/60 transition-colors">
      {/* Client and Server Nodes Row */}
      <div className="flex items-center justify-between z-10 relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-200"
        >
          <Smartphone className="h-6 w-6 text-fuchsia-400" />
          <span className="text-[10px] font-bold">Client App</span>
        </motion.div>

        {/* Central Animated Pulse Stream */}
        <div className="flex-1 px-4 flex flex-col items-center justify-center relative">
          <div className="w-full h-0.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 relative overflow-hidden rounded-full">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-white shadow-lg shadow-white"
            />
          </div>
          <span className="text-[9px] font-mono text-purple-300 mt-1 flex items-center gap-1">
            <Zap className="h-3 w-3 text-cyan-400 animate-bounce" /> WS Event (0ms)
          </span>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200"
        >
          <Server className="h-6 w-6 text-cyan-400" />
          <span className="text-[10px] font-bold">Socket.io Node</span>
        </motion.div>
      </div>

      {/* Real-time Event Stream Badges */}
      <div className="mt-5 space-y-2 pt-3 border-t border-purple-500/20">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-500/30 text-xs text-purple-200 flex items-center justify-between font-mono"
        >
          <span>Emit: &quot;message:send&quot;</span>
          <span className="h-2 w-2 rounded-full bg-fuchsia-400 animate-ping" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
          className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between font-mono"
        >
          <span>Broadcast: &quot;message:new&quot;</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        </motion.div>
      </div>
    </div>
  );
}
