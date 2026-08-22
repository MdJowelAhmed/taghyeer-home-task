"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import loginImg from "@/assets/login.jpg";

/**
 * AnimatedLoginBackground Component.
 * Layered infinite smooth animated globe background for Login Page.
 */
export function AnimatedLoginBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Base Image Layer with Gentle Breathing Pulse */}
      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.45, 0.35] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={loginImg}
          alt="Login Global Network Background"
          fill
          priority
          className="object-cover object-center mix-blend-screen"
        />
      </motion.div>

      {/* Dark Vignette Overlay for Crisp Form Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020618]/75 via-[#020618]/45 to-[#020618]" />

      {/* Pulsing Globe Glow Aura */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 md:top-10 md:right-10 w-[450px] h-[450px] md:w-[550px] md:h-[550px] rounded-full bg-gradient-to-tr from-cyan-500/30 via-purple-600/30 to-indigo-600/30 blur-[120px]"
      />
    </div>
  );
}
