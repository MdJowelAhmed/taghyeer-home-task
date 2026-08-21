"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth-token";
import { MessageSquare } from "lucide-react";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      router.replace("/chat");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3 animate-pulse">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <MessageSquare className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-slate-500">Loading Taghyeer Chat...</p>
      </div>
    </div>
  );
}
