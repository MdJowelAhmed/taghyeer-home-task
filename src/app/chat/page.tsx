"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth-token";
import { useCurrentUser, useLogout } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { MessageSquare, LogOut, ShieldCheck } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-none">Taghyeer Chat</h1>
            <p className="text-xs text-slate-500 mt-1">Real-time Messaging</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{user.name}</span>
              <span className="text-slate-400">({user.phone})</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="flex items-center gap-1.5 text-slate-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Main chat workspace placeholder */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              {isLoading ? "Authenticating..." : `Welcome, ${user?.name || "User"}!`}
            </h2>
            <p className="text-sm text-slate-500">
              Authentication setup is complete and connected to the backend API.
            </p>
          </div>

          {user && (
            <div className="bg-slate-50 rounded-xl p-4 text-left text-xs text-slate-600 space-y-1.5 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">User ID:</span>
                <code className="text-slate-800 font-mono">{user._id}</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Phone:</span>
                <span className="text-slate-800 font-medium">{user.phone}</span>
              </div>
              {user.createdAt && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Member Since:</span>
                  <span className="text-slate-800">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
