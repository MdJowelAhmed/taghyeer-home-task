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
    <aside className="w-full md:w-80 lg:w-96 flex flex-col border-r border-purple-500/15 bg-brand-sidebar shrink-0 h-full min-h-0">
      {/* Top Search bar & New Group Action */}
      <div className="p-4 border-b border-purple-500/15 flex items-center gap-2 shrink-0">
        <div className="flex-1">
          <UserSearch onSelectConversation={onSelectConversation} />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsGroupOpen(true)}
          title="Create Group"
          className="h-10 w-10 shrink-0 rounded-xl text-purple-600 dark:text-purple-300 hover:text-white hover:bg-brand-gradient hover:border-transparent transition-all"
        >
          <Users className="h-4 w-4" />
        </Button>
      </div>

      {/* Header with Counter */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-purple-500/10 shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-brand-gradient-to" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted">
            Conversations
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
          {conversations.length}
        </span>
      </div>

      {/* Scrollable Conversation List */}
      <div className="flex-1 min-h-0 overflow-y-auto">
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
