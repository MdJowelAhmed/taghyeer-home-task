import { Conversation } from "../types/chat.types";
import { UserAvatar } from "./UserAvatar";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  unreadCount?: number;
  onSelect: (id: string) => void;
}

export function ConversationItem({
  conversation,
  isSelected,
  unreadCount = 0,
  onSelect,
}: ConversationItemProps) {
  const isGroup = conversation.type === "group";
  const name = isGroup
    ? conversation.name || "Group Chat"
    : conversation.participant?.name || "Direct Message";
  const phone = !isGroup ? conversation.participant?.phone : undefined;
  const lastMessageText = conversation.lastMessage?.text || "No messages yet";
  const hasUnread = unreadCount > 0 && !isSelected;

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
        "w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-150 text-left group relative",
        isSelected
          ? "bg-purple-500/15 dark:bg-purple-950/70 border border-purple-500/40 shadow-sm"
          : hasUnread
          ? "bg-gradient-to-r from-purple-600/25 to-fuchsia-600/25 border border-transparent shadow-md"
          : "hover:bg-brand-surface/60 border border-transparent"
      )}
    >
      {isGroup ? (
        <div className="h-10 w-10 rounded-full bg-brand-gradient text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-900/20">
          <Users className="h-5 w-5" />
        </div>
      ) : (
        <UserAvatar name={name} size="md" isOnline={hasUnread ? true : undefined} />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <h4
              className={cn(
                "text-sm truncate",
                isSelected
                  ? "font-bold text-purple-600 dark:text-white"
                  : hasUnread
                  ? "font-extrabold text-purple-500 dark:text-purple-200"
                  : "font-semibold text-brand-text"
              )}
            >
              {name}
            </h4>
            {isGroup && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 font-medium shrink-0">
                Group
              </span>
            )}
          </div>
          {formattedTime && (
            <span
              className={cn(
                "text-[11px] shrink-0",
                isSelected || hasUnread
                  ? "text-purple-600 dark:text-purple-300 font-bold"
                  : "text-brand-muted"
              )}
            >
              {formattedTime}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          <p
            className={cn(
              "truncate max-w-[170px]",
              isSelected
                ? "text-purple-700 dark:text-purple-200/90 font-medium"
                : hasUnread
                ? "text-brand-text font-bold"
                : "text-brand-muted"
            )}
          >
            {lastMessageText}
          </p>

          {hasUnread ? (
            <span className="px-2 py-0.5 rounded-full bg-brand-gradient text-white font-extrabold text-[10px] shadow-md shadow-purple-600/40 animate-bounce-subtle shrink-0">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : phone ? (
            <span className="text-[10px] text-brand-muted font-mono hidden sm:inline">
              {phone}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
