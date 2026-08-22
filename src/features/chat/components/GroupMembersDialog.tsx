"use client";

import { useEffect } from "react";
import { Users, X, UserMinus, ShieldCheck, LogOut, Loader2, ShieldPlus, MessageSquare } from "lucide-react";
import { Conversation, Participant } from "../types/chat.types";
import { useRemoveParticipant, usePromoteAdmin } from "../hooks/useConversations";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";

interface GroupMembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation;
  currentUserId?: string;
  onLeaveGroupSuccess?: () => void;
  onSelectUser?: (user: { _id: string; name: string; phone?: string }) => void;
}

export function GroupMembersDialog({
  isOpen,
  onClose,
  conversation,
  currentUserId,
  onLeaveGroupSuccess,
  onSelectUser,
}: GroupMembersDialogProps) {
  const { mutate: removeMember, isPending: isRemoving } = useRemoveParticipant();
  const { mutate: promoteAdmin, isPending: isPromoting } = usePromoteAdmin();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const participants = (Array.isArray(conversation.participants)
    ? conversation.participants.filter(
        (p): p is Participant => typeof p === "object" && p !== null && "_id" in p
      )
    : []) as Participant[];

  const admins = conversation.admins || [];
  const isAdmin = currentUserId ? admins.includes(currentUserId) : false;
  const isBusy = isRemoving || isPromoting;

  const handleRemove = (userId: string) => {
    removeMember(
      { conversationId: conversation._id, userId },
      {
        onSuccess: () => {
          if (userId === currentUserId && onLeaveGroupSuccess) {
            onLeaveGroupSuccess();
            onClose();
          }
        },
      }
    );
  };

  const handleMemberClick = (member: Participant) => {
    if (member._id !== currentUserId && onSelectUser) {
      onSelectUser({ _id: member._id, name: member.name, phone: member.phone });
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-brand-card backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/25 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-brand-text"
      >
        <div className="p-4 border-b border-purple-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-gradient text-white shadow-md">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-text">{conversation.name || "Group"}</h3>
              <p className="text-xs text-brand-muted">{participants.length} members</p>
            </div>
          </div>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-text p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-2 max-h-72 overflow-y-auto divide-y divide-purple-500/10">
          {participants.map((member) => {
            const memberIsAdmin = admins.includes(member._id);
            const isSelf = member._id === currentUserId;

            return (
              <div key={member._id} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <UserAvatar
                    name={member.name}
                    phone={member.phone}
                    size="sm"
                    onClick={() => handleMemberClick(member)}
                  />
                  <div className="truncate cursor-pointer" onClick={() => handleMemberClick(member)}>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-brand-text hover:text-fuchsia-400 transition-colors truncate">
                        {member.name} {isSelf && "(You)"}
                      </p>
                      {memberIsAdmin && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 font-medium">
                          <ShieldCheck className="h-2.5 w-2.5" /> Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-brand-muted font-mono">{member.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {!isSelf && onSelectUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMemberClick(member)}
                      title="Send Private Message"
                      className="h-7 px-2 text-xs text-fuchsia-400 hover:bg-purple-500/10"
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1" /> Message
                    </Button>
                  )}
                  {isAdmin && !memberIsAdmin && !isSelf && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => promoteAdmin({ conversationId: conversation._id, userId: member._id })}
                      disabled={isBusy}
                      title="Promote to Admin"
                      className="h-7 px-2 text-[11px] text-brand-gradient-to hover:bg-purple-500/10 dark:hover:bg-purple-950/40"
                    >
                      <ShieldPlus className="h-3.5 w-3.5 mr-1" /> Make Admin
                    </Button>
                  )}
                  {isSelf ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(member._id)}
                      disabled={isBusy}
                      className="h-7 text-xs text-red-500 hover:bg-red-500/10"
                    >
                      <LogOut className="h-3.5 w-3.5 mr-1" /> Leave
                    </Button>
                  ) : isAdmin ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(member._id)}
                      disabled={isBusy}
                      className="h-7 text-xs text-brand-muted hover:text-red-500 hover:bg-red-500/10"
                    >
                      <UserMinus className="h-3.5 w-3.5 mr-1" /> Remove
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-brand-sidebar border-t border-purple-500/15 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isBusy}>
            {isBusy && <Loader2 className="h-3 w-3 animate-spin mr-1" />} Close
          </Button>
        </div>
      </div>
    </div>
  );
}
