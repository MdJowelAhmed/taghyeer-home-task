import { User } from "@/features/auth/types/auth.types";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, LogOut } from "lucide-react";

interface ChatNavbarProps {
  user?: User;
  onLogout: () => void;
}

export function ChatNavbar({ user, onLogout }: ChatNavbarProps) {
  return (
    <header className="h-16 px-4 md:px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-xs z-20">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-none">
            Taghyeer Chat
          </h1>
          <p className="text-xs text-slate-500 mt-1">Real-time Messaging</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {user && (
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80">
            <UserAvatar name={user.name} size="sm" isOnline={true} />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-none">
                {user.name}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                {user.phone}
              </p>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-1.5 text-slate-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
