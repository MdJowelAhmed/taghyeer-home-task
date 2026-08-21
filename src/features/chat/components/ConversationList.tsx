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
            className="flex items-center gap-3 p-3 rounded-2xl bg-[#0B102B]/60 border border-purple-500/10 animate-pulse"
          >
            <div className="h-10 w-10 rounded-full bg-purple-950/40 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-28 bg-purple-950/40 rounded-md" />
              <div className="h-2.5 w-40 bg-purple-950/30 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2.5">
        <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <MessageSquareOff className="h-6 w-6 stroke-[1.5]" />
        </div>
        <p className="text-sm font-semibold text-slate-200">No conversations yet</p>
        <p className="text-xs text-slate-400 max-w-[200px]">
          Search for a user or create a group to start your first chat!
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
