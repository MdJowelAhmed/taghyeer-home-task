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
        "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group",
        isSelected
          ? "bg-indigo-50 border border-indigo-100 shadow-sm"
          : "hover:bg-slate-100/70"
      )}
    >
      {isGroup ? (
        <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
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
                isSelected ? "text-indigo-900" : "text-slate-900"
              )}
            >
              {name}
            </h4>
            {isGroup && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 font-medium shrink-0">
                Group
              </span>
            )}
          </div>
          {formattedTime && (
            <span
              className={cn(
                "text-[11px] shrink-0",
                isSelected ? "text-indigo-600 font-medium" : "text-slate-400"
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
              isSelected ? "text-indigo-700" : "text-slate-500"
            )}
          >
            {lastMessageText}
          </p>
          {phone && (
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              {phone}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
