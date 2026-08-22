"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Edit3, X } from "lucide-react";
import { Loader } from "@/components/ui/Loader";
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
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-brand-card backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/25 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-brand-text"
      >
        <div className="p-4 border-b border-purple-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-gradient text-white shadow-md">
              <Edit3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-text">Rename Group</h3>
              <p className="text-xs text-brand-muted">Change this group&apos;s display name</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-brand-muted hover:text-brand-text p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-brand-text">Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new group name"
              className="w-full h-9 px-3 rounded-xl bg-brand-sidebar border border-purple-500/20 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-gradient-from"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-500/15">
            <Button type="button" variant="outline" size="sm" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              isLoading={isPending}
              disabled={!name.trim() || isPending || name.trim() === currentName}
            >
              {isPending && <Loader size={0.25} className="mr-1 inline-block" />} Save
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
