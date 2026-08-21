"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, X, Plus, Check, Loader2 } from "lucide-react";
import { useUserSearch } from "../hooks/useUserSearch";
import { useCreateGroupConversation } from "../hooks/useConversations";
import { SearchUser } from "../services/user.service";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";

interface CreateGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (groupId: string) => void;
}

export function CreateGroupDialog({
  isOpen,
  onClose,
  onSuccess,
}: CreateGroupDialogProps) {
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<SearchUser[]>([]);

  const { data: searchResults, isLoading } = useUserSearch(searchQuery);

  const handleClose = useCallback(() => {
    setName("");
    setSearchQuery("");
    setSelectedUsers([]);
    onClose();
  }, [onClose]);

  const { mutate: createGroup, isPending } = useCreateGroupConversation((newId) => {
    onSuccess(newId);
    handleClose();
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const toggleUser = (user: SearchUser) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || selectedUsers.length === 0 || isPending) return;

    createGroup({
      name: name.trim(),
      participantIds: selectedUsers.map((u) => u._id),
    });
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-brand-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/25 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-100"
      >
        <div className="p-4 border-b border-purple-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-gradient text-white shadow-md">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Create Group</h3>
              <p className="text-xs text-slate-400">Chat with multiple people</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Project 3 Team"
              className="w-full h-9 px-3 rounded-xl bg-brand-sidebar border border-purple-500/20 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gradient-from"
              required
            />
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {selectedUsers.map((u) => (
                <span
                  key={u._id}
                  className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-medium border border-purple-500/30"
                >
                  <span>{u.name}</span>
                  <button type="button" onClick={() => toggleUser(u)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="space-y-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search participants by name..."
              className="w-full h-9 px-3 rounded-xl bg-brand-sidebar border border-purple-500/20 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gradient-from"
            />
            {isLoading && (
              <div className="flex items-center gap-1 text-xs text-purple-300 pt-1">
                <Loader2 className="h-3 w-3 animate-spin text-brand-gradient-to" />
                <span>Searching...</span>
              </div>
            )}
            {searchResults && searchResults.length > 0 && (
              <div className="max-h-36 overflow-y-auto rounded-xl border border-purple-500/20 bg-brand-sidebar/90 p-1 divide-y divide-purple-500/10 mt-1">
                {searchResults.map((u) => {
                  const isSelected = selectedUsers.some((sel) => sel._id === u._id);
                  return (
                    <button
                      key={u._id}
                      type="button"
                      onClick={() => toggleUser(u)}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-purple-950/40 text-left"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <UserAvatar name={u.name} size="sm" />
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-200 truncate">{u.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{u.phone}</p>
                        </div>
                      </div>
                      {isSelected ? (
                        <Check className="h-4 w-4 text-brand-gradient-to" />
                      ) : (
                        <Plus className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-500/15">
            <Button type="button" variant="outline" size="sm" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              isLoading={isPending}
              disabled={!name.trim() || selectedUsers.length === 0 || isPending}
            >
              Create Group
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
