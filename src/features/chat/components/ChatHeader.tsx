"use client";

import { useState } from "react";
import { ArrowLeft, Phone, Users, UserPlus, Info, Edit3 } from "lucide-react";
import { Conversation } from "../types/chat.types";
import { UserAvatar } from "./UserAvatar";
import { AddMemberDialog } from "./AddMemberDialog";
import { GroupMembersDialog } from "./GroupMembersDialog";
import { RenameGroupDialog } from "./RenameGroupDialog";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  conversation: Conversation;
  currentUserId?: string;
  onBack: () => void;
  onSelectUser?: (user: { _id: string; name: string; phone?: string }) => void;
}

export function ChatHeader({
  conversation,
  currentUserId,
  onBack,
  onSelectUser,
}: ChatHeaderProps) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

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

  const isAdmin = isGroup && currentUserId
    ? (conversation.admins || []).includes(currentUserId)
    : false;

  return (
    <>
      <div className="h-16 px-4 md:px-6 border-b border-purple-500/15 bg-brand-sidebar flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden -ml-2 text-brand-text hover:text-purple-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {isGroup ? (
            <div className="h-10 w-10 rounded-full bg-brand-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-900/20">
              <Users className="h-5 w-5" />
            </div>
          ) : (
            <UserAvatar name={name} size="md" isOnline={true} />
          )}

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-brand-text truncate">{name}</h3>
            {isGroup ? (
              <p className="text-xs text-purple-600 dark:text-purple-300">
                {memberCount ? `${memberCount} members` : "Group conversation"}
              </p>
            ) : phone ? (
              <p className="text-xs text-brand-muted font-mono flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{phone}</span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isGroup && (
            <>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRenameOpen(true)}
                  className="flex items-center gap-1 text-xs text-brand-text hover:text-purple-500 hover:bg-purple-950/10 dark:hover:bg-purple-950/40"
                  title="Rename Group"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Rename</span>
                </Button>
              )}

              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddMemberOpen(true)}
                  className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-300 hover:text-white border-purple-500/30 bg-brand-card/60 hover:bg-brand-gradient hover:border-transparent"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMembersOpen(true)}
                className="flex items-center gap-1 text-xs text-brand-text hover:text-purple-500 hover:bg-purple-950/10 dark:hover:bg-purple-950/40"
              >
                <Info className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Members</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {isGroup && (
        <>
          <AddMemberDialog
            isOpen={isAddMemberOpen}
            onClose={() => setIsAddMemberOpen(false)}
            conversationId={conversation._id}
            existingParticipantIds={existingParticipantIds}
          />
          <GroupMembersDialog
            isOpen={isMembersOpen}
            onClose={() => setIsMembersOpen(false)}
            conversation={conversation}
            currentUserId={currentUserId}
            onLeaveGroupSuccess={onBack}
            onSelectUser={onSelectUser}
          />
          <RenameGroupDialog
            isOpen={isRenameOpen}
            onClose={() => setIsRenameOpen(false)}
            conversationId={conversation._id}
            currentName={conversation.name || ""}
          />
        </>
      )}
    </>
  );
}
