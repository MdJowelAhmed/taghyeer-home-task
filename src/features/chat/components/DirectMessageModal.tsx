"use client";

import { useEffect } from "react";
import { MessageSquare, X, ArrowRight } from "lucide-react";
import { Loader } from "@/components/ui/Loader";
import { useCreateConversation } from "../hooks/useConversations";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";

export interface TargetUser {
  _id: string;
  name: string;
  phone?: string;
}

interface DirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: TargetUser | null;
  onSelectConversation: (id: string) => void;
}

/**
 * DirectMessageModal Component.
 * Prompts user to start or switch to a private 1-to-1 conversation
 * with a group member or clicked user profile.
 */
export function DirectMessageModal({
  isOpen,
  onClose,
  targetUser,
  onSelectConversation,
}: DirectMessageModalProps) {
  const { mutate: createConversation, isPending: isCreating } =
    useCreateConversation((newId) => {
      onSelectConversation(newId);
      onClose();
    });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !targetUser) return null;

  const handleStartChat = () => {
    createConversation({ userId: targetUser._id });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-brand-text"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-brand-card backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-5 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-purple-500/15 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-gradient text-white shadow-md">
              <MessageSquare className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-brand-text">Start Private Chat</h3>
          </div>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-text p-1">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Target User Info */}
        <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <UserAvatar name={targetUser.name} phone={targetUser.phone} size="lg" showTooltip={false} />
          <h4 className="text-sm font-bold text-brand-text leading-tight">{targetUser.name}</h4>
          {targetUser.phone && (
            <p className="text-xs text-brand-muted font-mono">{targetUser.phone}</p>
          )}
        </div>

        <p className="text-xs text-center text-slate-300 leading-relaxed">
          Do you want to send a private 1-to-1 message to{" "}
          <span className="font-bold text-fuchsia-400">{targetUser.name}</span>?
        </p>

        <div className="flex items-center gap-3 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isCreating}
            className="flex-1 h-10 text-xs border-purple-500/25 hover:bg-purple-500/10"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleStartChat}
            disabled={isCreating}
            className="flex-1 h-10 text-xs font-bold bg-brand-gradient hover:brightness-110 text-white gap-1.5 shadow-lg shadow-purple-950/50"
          >
            {isCreating ? (
              <>
                <Loader size={0.3} />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>Start Direct Chat</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
