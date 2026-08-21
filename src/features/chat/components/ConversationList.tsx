import { Conversation } from "../types/chat.types";
import { ConversationItem } from "./ConversationItem";
import { MessageSquareOff } from "lucide-react";

interface ConversationListProps {
  conversations: Conversation[];
  isLoading: boolean;
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({
  conversations,
  isLoading,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2 p-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 animate-pulse"
          >
            <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-28 bg-slate-200 rounded" />
              <div className="h-2.5 w-40 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
        <MessageSquareOff className="h-8 w-8 text-slate-300 stroke-[1.5]" />
        <p className="text-sm font-medium text-slate-600">No conversations yet</p>
        <p className="text-xs text-slate-400 max-w-[200px]">
          Search for a person above to start your first chat!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-2">
      {conversations.map((conv) => (
        <ConversationItem
          key={conv._id}
          conversation={conv}
          isSelected={selectedConversationId === conv._id}
          onSelect={onSelectConversation}
        />
      ))}
    </div>
  );
}
