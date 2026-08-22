import Image from "next/image";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Metadata } from "next";
import loginImg from "@/assets/login.jpg";

export const metadata: Metadata = {
  title: "Login | Taghyeer Digital Systems",
  description: "Sign in with your phone and name to start chatting.",
};

/**
 * Login Page with Taghyeer dark/light theme, cyber mesh lighting, and login.jpg background image.
 */
export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-bg relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={loginImg}
          alt="Login Network Background"
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020618]/70 via-[#020618]/40 to-[#020618]" />
      </div>
      {/* Top Bar with Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Taghyeer Hero Cyber Lighting Orbs */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[550px] h-[550px] bg-fuchsia-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-950/20 rounded-full blur-[180px] pointer-events-none" />

      {/* Decorative Network Grid Subtle Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--brand-gradient-to) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header Tagline */}
      <div className="text-center mb-6 z-10 animate-in fade-in duration-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card/80 border border-purple-500/30 text-xs font-semibold text-purple-300 shadow-md mb-2">
          <span>Enterprise Real-time Messaging</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-brand-text tracking-tight">
          Building Scalable{" "}
          <span className="text-brand-gradient">
            Digital Systems
          </span>
        </h1>
      </div>

      {/* Login Card */}
      <div className="w-full flex justify-center z-10">
        <LoginForm />
      </div>

      {/* Footer Info */}
      <footer className="mt-8 text-center text-xs text-brand-muted z-10">
        <p>© 2026 Taghyeer. All rights reserved.</p>
      </footer>
    </main>
  );
}
