"use client";

import { useState, useEffect, useCallback } from "react";
import { Edit3, X, Loader2 } from "lucide-react";
import { useRenameGroup } from "../hooks/useConversations";
import { Button } from "@/components/ui/button";

interface RenameGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  currentName: string;
}

export function RenameGroupDialog({
  isOpen,
  onClose,
  conversationId,
  currentName,
}: RenameGroupDialogProps) {
  const [name, setName] = useState(currentName);

  const handleClose = useCallback(() => {
    setName(currentName);
    onClose();
  }, [currentName, onClose]);

  const { mutate: renameGroup, isPending } = useRenameGroup(handleClose);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isPending || name.trim() === currentName) return;

    renameGroup({
      conversationId,
      payload: { name: name.trim() },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Edit3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Rename Group</h3>
              <p className="text-xs text-slate-500">Change this group&apos;s display name</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 p-1">
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
              placeholder="Enter new group name"
              className="w-full h-9 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              isLoading={isPending}
              disabled={!name.trim() || isPending || name.trim() === currentName}
            >
              {isPending && <Loader2 className="h-3 w-3 animate-spin mr-1" />} Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
