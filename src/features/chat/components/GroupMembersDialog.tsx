"use client";

import { Users, X, UserMinus, ShieldCheck, LogOut, Loader2 } from "lucide-react";
import { Conversation, Participant } from "../types/chat.types";
import { useRemoveParticipant } from "../hooks/useConversations";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";

interface GroupMembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation;
  currentUserId?: string;
  onLeaveGroupSuccess?: () => void;
}

export function GroupMembersDialog({
  isOpen,
  onClose,
  conversation,
  currentUserId,
  onLeaveGroupSuccess,
}: GroupMembersDialogProps) {
  const { mutate: removeMember, isPending } = useRemoveParticipant();

  if (!isOpen) return null;

  const participants = (Array.isArray(conversation.participants)
    ? conversation.participants.filter(
        (p): p is Participant => typeof p === "object" && p !== null && "_id" in p
      )
    : []) as Participant[];

  const admins = conversation.admins || [];
  const isAdmin = currentUserId ? admins.includes(currentUserId) : false;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {conversation.name || "Group Members"}
              </h3>
              <p className="text-xs text-slate-500">
                {participants.length} member{participants.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-72 overflow-y-auto divide-y divide-slate-100">
          {participants.map((member) => {
            const memberIsAdmin = admins.includes(member._id);
            const isSelf = member._id === currentUserId;

            return (
              <div
                key={member._id}
                className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <UserAvatar name={member.name} size="sm" />
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {member.name} {isSelf && "(You)"}
                      </p>
                      {memberIsAdmin && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-medium">
                          <ShieldCheck className="h-2.5 w-2.5" /> Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">{member.phone}</p>
                  </div>
                </div>

                <div>
                  {isSelf ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(member._id)}
                      disabled={isPending}
                      className="h-7 text-xs text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-3.5 w-3.5 mr-1" /> Leave
                    </Button>
                  ) : isAdmin ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(member._id)}
                      disabled={isPending}
                      className="h-7 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <UserMinus className="h-3.5 w-3.5 mr-1" /> Remove
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isPending}>
            {isPending && <Loader2 className="h-3 w-3 animate-spin mr-1" />} Close
          </Button>
        </div>
      </div>
    </div>
  );
}
