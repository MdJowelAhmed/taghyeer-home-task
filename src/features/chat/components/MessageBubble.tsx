import { Message } from "../types/chat.types";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  isSelf: boolean;
}

export function MessageBubble({ message, isSelf }: MessageBubbleProps) {
  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={cn(
        "flex w-full my-1.5",
        isSelf ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[78%] sm:max-w-[65%] rounded-2xl px-4 py-2.5 shadow-md text-sm break-words relative transition-all",
          isSelf
            ? "bg-brand-gradient text-white shadow-purple-950/20 rounded-br-xs"
            : "bg-brand-card/90 border border-purple-500/20 text-brand-text shadow-sm rounded-bl-xs"
        )}
      >
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
    </div>
  );
}
