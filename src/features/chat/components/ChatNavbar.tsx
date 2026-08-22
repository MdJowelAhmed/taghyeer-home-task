"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@/features/auth/types/auth.types";
import { UserAvatar } from "./UserAvatar";
import { UserProfileModal } from "./UserProfileModal";
import { Sparkles } from "lucide-react";

interface ChatNavbarProps {
  user?: User;
  onLogout: () => void;
}

export function ChatNavbar({ user, onLogout }: ChatNavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-16 px-4 md:px-6 border-b border-purple-500/15 bg-brand-sidebar flex items-center justify-between shrink-0 z-20 shadow-lg shadow-purple-950/20">
      {/* Clickable Brand Logo & Title to Home */}
      <Link
        href="/"
        className="flex items-center gap-3 group hover:opacity-90 transition-all"
        title="Go to Landing page"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
          <span className="font-extrabold text-lg tracking-wider">T</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-brand-text tracking-wide group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">
              TAGHYEER
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
              <Sparkles className="h-2.5 w-2.5" /> Chat
            </span>
          </div>
          <p className="text-[11px] text-brand-muted">Digital Systems Messaging</p>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        {/* User Profile Trigger Button & Anchored Dropdown */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              type="button"
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-card/80 hover:bg-brand-surface border border-purple-500/25 hover:border-purple-500/50 shadow-inner cursor-pointer transition-all active:scale-95 group text-left"
              title="Open Profile Menu"
            >
              <UserAvatar name={user.name} size="sm" isOnline={true} showTooltip={false} />
              <div className="text-left">
                <p className="text-xs font-semibold text-brand-text group-hover:text-purple-400 leading-none transition-colors">
                  {user.name}
                </p>
                <p className="text-[10px] text-purple-400 font-mono mt-0.5">
                  {user.phone}
                </p>
              </div>
            </button>

            {/* Small Dropdown Menu right below with Home, Theme Toggle & Logout */}
            <UserProfileModal
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              user={user}
              onLogout={onLogout}
            />
          </div>
        )}
      </div>
    </header>
  );
}
