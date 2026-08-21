"use client";

import { useState } from "react";
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

  const { data: searchResults, isLoading: isSearching } =
    useUserSearch(searchQuery);

  const handleClose = () => {
    setName("");
    setSearchQuery("");
    setSelectedUsers([]);
    onClose();
  };

  const { mutate: createGroup, isPending } = useCreateGroupConversation(
    (newGroupId) => {
      onSuccess(newGroupId);
      handleClose();
    }
  );

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Create Group</h3>
              <p className="text-xs text-slate-500">Chat with multiple people</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Project 3 Team"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {selectedUsers.length > 0 && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Selected ({selectedUsers.length})
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {selectedUsers.map((user) => (
                  <span
                    key={user._id}
                    className="inline-flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100"
                  >
                    <span>{user.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleUser(user)}
                      className="hover:bg-indigo-200/50 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Add Participants
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name..."
              className="w-full h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
            {isSearching && (
              <div className="flex items-center gap-1 text-xs text-slate-400 pt-1">
                <Loader2 className="h-3 w-3 animate-spin text-indigo-500" />
                <span>Searching...</span>
              </div>
            )}
            {searchResults && searchResults.length > 0 && (
              <div className="mt-1 max-h-36 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 divide-y divide-slate-100">
                {searchResults.map((user) => {
                  const isSelected = selectedUsers.some((u) => u._id === user._id);
                  return (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => toggleUser(user)}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <UserAvatar name={user.name} size="sm" />
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {user.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {user.phone}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-slate-400">
                        {isSelected ? (
                          <Check className="h-4 w-4 text-indigo-600 font-bold" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
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
