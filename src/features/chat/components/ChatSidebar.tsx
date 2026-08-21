"use client";

import { useState } from "react";
import { Conversation } from "../types/chat.types";
import { UserSearch } from "./UserSearch";
import { ConversationList } from "./ConversationList";
import { CreateGroupDialog } from "./CreateGroupDialog";
import { MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  conversations: Conversation[];
  isLoading: boolean;
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  isLoading,
  selectedConversationId,
  onSelectConversation,
}: ChatSidebarProps) {
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  return (
    <aside className="w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-200 bg-white shrink-0 h-full">
      {/* Top Search bar & New Group Action */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-2">
        <div className="flex-1">
          <UserSearch onSelectConversation={onSelectConversation} />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsGroupOpen(true)}
          title="Create Group"
          className="h-10 w-10 shrink-0 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50"
        >
          <Users className="h-4 w-4" />
        </Button>
      </div>

      {/* Header with Counter */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Messages
          </h3>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {conversations.length}
        </span>
      </div>

      {/* Scrollable Conversation List */}
      <div className="flex-1 overflow-y-auto">
        <ConversationList
          conversations={conversations}
          isLoading={isLoading}
          selectedConversationId={selectedConversationId}
          onSelectConversation={onSelectConversation}
        />
      </div>

      {/* Create Group Dialog Modal */}
      <CreateGroupDialog
        isOpen={isGroupOpen}
        onClose={() => setIsGroupOpen(false)}
        onSuccess={(groupId) => {
          setIsGroupOpen(false);
          onSelectConversation(groupId);
        }}
      />
    </aside>
  );
}
