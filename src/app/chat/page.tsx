"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth-token";
import { useCurrentUser, useLogout } from "@/features/auth/hooks/useAuth";
import { ChatNavbar } from "@/features/chat/components/ChatNavbar";
import { ChatLayout } from "@/features/chat/components/ChatLayout";
import { Loader2 } from "lucide-react";

/**
 * Main Chat Application Page.
 * Protects route via JWT token verification and renders the Taghyeer interface.
 */
export default function ChatPage() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const logout = useLogout();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center gap-3 text-sm text-purple-300 font-medium">
          <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 shadow-lg shadow-purple-950/60">
            <Loader2 className="h-6 w-6 animate-spin text-brand-gradient-to" />
          </div>
          <span className="tracking-wide">Initializing Taghyeer Chat session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen h-[100dvh] flex flex-col bg-brand-bg overflow-hidden select-none">
      {/* Top Navbar */}
      <ChatNavbar user={user} onLogout={logout} />

      {/* Main Two-Column Layout */}
      <ChatLayout currentUserId={user?._id} />
    </div>
  );
}
