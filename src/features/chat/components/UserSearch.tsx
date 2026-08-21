"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2, UserPlus, X } from "lucide-react";
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

  // Close dropdown on click outside
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search people by name..."
          className="w-full h-10 pl-9 pr-8 rounded-xl bg-slate-100/90 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length >= 1 && (
        <div className="absolute left-0 right-0 top-12 z-30 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {isLoading ? (
            <div className="flex items-center justify-center p-4 text-xs text-slate-500 gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
              <span>Searching users...</span>
            </div>
          ) : users && users.length > 0 ? (
            <div className="space-y-1">
              {users.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  disabled={isCreating}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <UserAvatar name={user.name} size="sm" />
                    <div className="truncate">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-slate-400 group-hover:text-indigo-600 pl-2">
                    <UserPlus className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-slate-500">
              No users found matching &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
