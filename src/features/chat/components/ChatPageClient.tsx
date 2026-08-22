"use client";

import { useCurrentUser, useLogout } from "@/features/auth/hooks/useAuth";
import { ChatNavbar } from "./ChatNavbar";
import { ChatLayout } from "./ChatLayout";
import { Loader2 } from "lucide-react";

/**
 * ChatPageClient Component.
 * Client-side container managing authenticated session lifecycle,
 * navigation header actions, and two-column chat workspace.
 */
export function ChatPageClient() {
  const { data: user, isLoading } = useCurrentUser();
  const logout = useLogout();

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center gap-3 text-sm text-purple-300 font-medium">
          <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 shadow-lg shadow-purple-950/60">
            <Loader2 className="h-6 w-6 animate-spin text-brand-gradient-to" />
          </div>
          <span className="tracking-wide">
            Initializing Taghyeer Chat session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen h-[100dvh] flex flex-col bg-brand-bg overflow-hidden select-none">
      {/* Top Navigation Bar */}
      <ChatNavbar user={user} onLogout={logout} />

      {/* Main Two-Column Chat Layout */}
      <ChatLayout currentUserId={user?._id} />
    </div>
  );
}
