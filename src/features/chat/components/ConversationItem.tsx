import { Conversation } from "../types/chat.types";
import { UserAvatar } from "./UserAvatar";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function ConversationItem({
  conversation,
  isSelected,
  onSelect,
}: ConversationItemProps) {
  const isGroup = conversation.type === "group";
  const name = isGroup
    ? conversation.name || "Group Chat"
    : conversation.participant?.name || "Direct Message";
  const phone = !isGroup ? conversation.participant?.phone : undefined;
  const lastMessageText = conversation.lastMessage?.text || "No messages yet";

  const formattedTime = conversation.updatedAt
    ? new Date(conversation.updatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <button
      onClick={() => onSelect(conversation._id)}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-150 text-left group",
        isSelected
          ? "bg-gradient-to-r from-purple-950/70 to-purple-900/30 border border-purple-500/40 shadow-lg shadow-purple-950/40"
          : "hover:bg-brand-surface/60 border border-transparent"
      )}
    >
      {isGroup ? (
        <div className="h-10 w-10 rounded-full bg-brand-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-900/30">
          <Users className="h-5 w-5" />
        </div>
      ) : (
        <UserAvatar name={name} size="md" />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <h4
              className={cn(
                "text-sm font-semibold truncate",
                isSelected ? "text-white" : "text-slate-200"
              )}
            >
              {name}
            </h4>
            {isGroup && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium shrink-0">
                Group
              </span>
            )}
          </div>
          {formattedTime && (
            <span
              className={cn(
                "text-[11px] shrink-0",
                isSelected ? "text-purple-300 font-medium" : "text-slate-500"
              )}
            >
              {formattedTime}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          <p
            className={cn(
              "truncate max-w-[180px]",
              isSelected ? "text-purple-200/90" : "text-slate-400"
            )}
          >
            {lastMessageText}
          </p>
          {phone && (
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              {phone}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
