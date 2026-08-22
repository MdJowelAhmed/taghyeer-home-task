"use client";

import { useState, useRef, useEffect } from "react";
import { Search, UserPlus, X } from "lucide-react";
import { Loader } from "@/components/ui/Loader";
import { useUserSearch } from "../hooks/useUserSearch";
import { useCreateConversation } from "../hooks/useConversations";
import { UserAvatar } from "./UserAvatar";
import { SearchUser } from "../services/user.service";

interface UserSearchProps {
  onSelectConversation: (id: string) => void;
}

export function UserSearch({ onSelectConversation }: UserSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: users, isLoading } = useUserSearch(query);
  const { mutate: createConversation, isPending: isCreating } =
    useCreateConversation((newId) => {
      onSelectConversation(newId);
      setQuery("");
      setIsOpen(false);
    });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectUser = (user: SearchUser) => {
    createConversation({ userId: user._id });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-500/60" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search people by name..."
          className="w-full h-10 pl-9 pr-8 rounded-xl bg-brand-card/80 border border-purple-500/25 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-gradient-from focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length >= 1 && (
        <div className="absolute left-0 right-0 top-12 z-30 max-h-72 overflow-y-auto rounded-2xl border border-purple-500/30 bg-brand-card/95 backdrop-blur-xl p-1.5 shadow-2xl shadow-purple-950/20 dark:shadow-purple-950/80">
          {isLoading ? (
            <div className="flex items-center justify-center p-4 text-xs text-purple-600 dark:text-purple-300 gap-2">
              <Loader size={0.35} />
              <span>Searching users...</span>
            </div>
          ) : users && users.length > 0 ? (
            <div className="space-y-1">
              {users.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  disabled={isCreating}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-purple-500/10 dark:hover:bg-purple-950/40 transition-colors text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <UserAvatar name={user.name} size="sm" />
                    <div className="truncate">
                      <p className="text-sm font-semibold text-brand-text group-hover:text-purple-600 dark:group-hover:text-purple-300 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-brand-muted font-mono truncate">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-purple-500 group-hover:text-brand-gradient-to pl-2">
                    <UserPlus className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-brand-muted">
              No users found matching &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
