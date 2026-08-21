"use client";

import { useState } from "react";
import { ArrowLeft, Phone, Users, UserPlus } from "lucide-react";
import { Conversation } from "../types/chat.types";
import { UserAvatar } from "./UserAvatar";
import { AddMemberDialog } from "./AddMemberDialog";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  conversation: Conversation;
  onBack: () => void;
}

export function ChatHeader({ conversation, onBack }: ChatHeaderProps) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const isGroup = conversation.type === "group";
  const name = isGroup
    ? conversation.name || "Group Chat"
    : conversation.participant?.name || "Direct Chat";
  const phone = !isGroup ? conversation.participant?.phone : undefined;

  const memberCount = Array.isArray(conversation.participants)
    ? conversation.participants.length
    : undefined;

  const existingParticipantIds = Array.isArray(conversation.participants)
    ? conversation.participants.map((p) => (typeof p === "string" ? p : p._id))
    : [];

  return (
    <>
      <div className="h-16 px-4 md:px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden -ml-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {isGroup ? (
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Users className="h-5 w-5" />
            </div>
          ) : (
            <UserAvatar name={name} size="md" isOnline={true} />
          )}

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">{name}</h3>
            {isGroup ? (
              <p className="text-xs text-slate-500">
                {memberCount ? `${memberCount} members` : "Group conversation"}
              </p>
            ) : phone ? (
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{phone}</span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isGroup && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddMemberOpen(true)}
              className="flex items-center gap-1.5 text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Member</span>
            </Button>
          )}
        </div>
      </div>

      {isGroup && (
        <AddMemberDialog
          isOpen={isAddMemberOpen}
          onClose={() => setIsAddMemberOpen(false)}
          conversationId={conversation._id}
          existingParticipantIds={existingParticipantIds}
        />
      )}
    </>
  );
}
