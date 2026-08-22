"use client";

import { motion } from "framer-motion";
import { Search, MessageSquare, Zap } from "lucide-react";

import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * HowItWorksSection Component with framer-motion stagger animations.
 */
export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Find Someone",
      description: "Search any contact instantly by name or phone number in the global search bar.",
      icon: Search,
    },
    {
      number: "02",
      title: "Start Conversation",
      description: "Open a direct 1-to-1 chat or build a group conversation with a single click.",
      icon: MessageSquare,
    },
    {
      number: "03",
      title: "Keep Flowing",
      description: "Send messages in real-time with instant socket sync, zero latency, and smart auto scroll.",
      icon: Zap,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#030712] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-16"
        >
          <SectionTitle align="center" className="text-3xl md:text-4xl font-mono italic">
            How Taghyeer Works
          </SectionTitle>
          <p className="text-xs md:text-sm text-slate-300">
            Three simple steps to start streaming real-time conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-7 rounded-2xl bg-[#0b102b] border border-purple-500/30 shadow-xl shadow-purple-950/60 relative overflow-hidden group hover:border-purple-400/60 transition-all"
              >
                <div className="text-5xl font-extrabold text-purple-500/20 group-hover:text-purple-500/40 transition-colors mb-4 font-mono">
                  {step.number}
                </div>
                <div className="h-11 w-11 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-950/50">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
