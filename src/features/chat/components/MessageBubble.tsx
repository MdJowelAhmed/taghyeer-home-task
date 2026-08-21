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
          "max-w-[78%] sm:max-w-[65%] rounded-2xl px-4 py-2.5 shadow-sm text-sm break-words relative",
          isSelf
            ? "bg-indigo-600 text-white rounded-br-xs"
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs"
        )}
      >
        <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
        {formattedTime && (
          <div
            className={cn(
              "text-[10px] mt-1 text-right select-none",
              isSelf ? "text-indigo-200" : "text-slate-400"
            )}
          >
            {formattedTime}
          </div>
        )}
      </div>
    </div>
  );
}
