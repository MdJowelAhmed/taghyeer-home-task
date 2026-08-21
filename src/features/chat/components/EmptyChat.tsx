import { MessageSquare, Sparkles, ShieldCheck } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/60 text-center">
      <div className="max-w-sm space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-inner">
          <MessageSquare className="h-8 w-8" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-slate-900">
            Select a conversation
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Choose an existing message from the sidebar or search for users to
            start a new real-time conversation.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> Instant
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" /> Secure
          </span>
        </div>
      </div>
    </div>
  );
}
