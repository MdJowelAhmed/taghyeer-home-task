"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth-token";
import { useCurrentUser, useLogout } from "@/features/auth/hooks/useAuth";
import { ChatNavbar } from "@/features/chat/components/ChatNavbar";
import { ChatLayout } from "@/features/chat/components/ChatLayout";
import { Loader2 } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
          <span>Loading chat session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden select-none">
      <ChatNavbar user={user} onLogout={logout} />
      <ChatLayout currentUserId={user?._id} />
    </div>
  );
}
