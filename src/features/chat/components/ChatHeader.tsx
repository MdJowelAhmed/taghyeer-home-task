import { ArrowLeft, Phone, MoreVertical } from "lucide-react";
import { Conversation } from "../types/chat.types";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  conversation: Conversation;
  onBack: () => void;
}

export function ChatHeader({ conversation, onBack }: ChatHeaderProps) {
  const name = conversation.participant?.name || "Direct Chat";
  const phone = conversation.participant?.phone;

  return (
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

        <UserAvatar name={name} size="md" isOnline={true} />

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 truncate">{name}</h3>
          {phone && (
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{phone}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-slate-600 rounded-full"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
