import { Message } from "../types/chat.types";
import { UserAvatar } from "./UserAvatar";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  isSelf: boolean;
  isGroup?: boolean;
  senderId?: string;
  senderName?: string;
  senderPhone?: string;
  onSelectUser?: (user: { _id: string; name: string; phone?: string }) => void;
}

/**
 * MessageBubble Component displaying message text, formatted timestamp,
 * and sender UserAvatar with name initials.
 * In Group Chats: shows sender name above bubble and hover tooltip/click-to-DM on avatar.
 * In 1-on-1 Chats: cleaner bubble without redundant name header or tooltips.
 */
export function MessageBubble({
  message,
  isSelf,
  isGroup = false,
  senderId,
  senderName = "User",
  senderPhone,
  onSelectUser,
}: MessageBubbleProps) {
  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const showGroupMeta = isGroup && !isSelf;

  const handleAvatarClick = () => {
    if (showGroupMeta && onSelectUser && senderId) {
      onSelectUser({ _id: senderId, name: senderName, phone: senderPhone });
    }
  };

  return (
    <div
      className={cn(
        "flex items-end gap-2 my-2 w-full",
        isSelf ? "justify-end" : "justify-start"
      )}
    >
      {!isSelf && (
        <UserAvatar
          name={senderName}
          phone={senderPhone}
          size="sm"
          showTooltip={showGroupMeta}
          alignTooltip="left"
          onClick={showGroupMeta ? handleAvatarClick : undefined}
          className="mb-0.5"
        />
      )}

      <div
        className={cn(
          "max-w-[78%] sm:max-w-[65%] rounded-2xl px-4 py-2.5 shadow-md text-sm break-words relative transition-all",
          isSelf
            ? "bg-brand-gradient text-white shadow-purple-950/20 rounded-br-xs"
            : "bg-brand-card/90 border border-purple-500/20 text-brand-text shadow-sm rounded-bl-xs"
        )}
      >
        {showGroupMeta && senderName && (
          <p className="text-[11px] font-bold text-fuchsia-400 mb-0.5 select-none">
            {senderName}
          </p>
        )}
        <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
        {formattedTime && (
          <div
            className={cn(
              "text-[10px] mt-1 text-right select-none font-mono",
              isSelf ? "text-purple-100/90" : "text-brand-muted"
            )}
          >
            {formattedTime}
          </div>
        )}
      </div>

      {isSelf && (
        <UserAvatar
          name={senderName}
          phone={senderPhone}
          size="sm"
          showTooltip={false}
          alignTooltip="right"
          className="mb-0.5"
        />
      )}
    </div>
  );
}
