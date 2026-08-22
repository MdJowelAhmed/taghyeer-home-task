import { User } from "@/features/auth/types/auth.types";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogOut, Sparkles } from "lucide-react";

interface ChatNavbarProps {
  user?: User;
  onLogout: () => void;
}

export function ChatNavbar({ user, onLogout }: ChatNavbarProps) {
  return (
    <header className="h-16 px-4 md:px-6 border-b border-purple-500/15 bg-brand-sidebar flex items-center justify-between shrink-0 z-20 shadow-lg shadow-purple-950/20">
      <div className="flex items-center gap-3">
        {/* Taghyeer Logo */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-lg shadow-purple-600/30">
          <span className="font-extrabold text-lg tracking-wider">T</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-brand-text tracking-wide">
              TAGHYEER
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Sparkles className="h-2.5 w-2.5" /> Chat
            </span>
          </div>
          <p className="text-[11px] text-brand-muted">Digital Systems Messaging</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 md:gap-3">
        {user && (
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-brand-card/80 border border-purple-500/25 shadow-inner">
            <UserAvatar name={user.name} size="sm" isOnline={true} />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-brand-text leading-none">
                {user.name}
              </p>
              <p className="text-[10px] text-purple-400 font-mono mt-0.5">
                {user.phone}
              </p>
            </div>
          </div>
        )}

        {/* Theme Toggle Button */}
        <ThemeToggle />

        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs text-brand-text hover:text-red-400 hover:border-red-500/40 hover:bg-red-950/20"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
