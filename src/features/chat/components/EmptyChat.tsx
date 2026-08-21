import { Zap, Sparkles, Shield, Rocket } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center select-none">
      <div className="max-w-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Taghyeer Hero Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/90 border border-purple-500/30 text-xs font-semibold text-purple-500 dark:text-purple-300 shadow-lg shadow-purple-950/10 dark:shadow-purple-950/40">
          <div className="w-2 h-2 rounded-full bg-brand-gradient-to animate-pulse" />
          <span>Taghyeer Digital Systems</span>
        </div>

        {/* Hero Title with Gradient */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-text tracking-tight">
            Building Scalable{" "}
            <span className="text-brand-gradient">
              Digital Chat
            </span>
          </h2>
          <p className="text-xs md:text-sm text-brand-muted leading-relaxed max-w-sm mx-auto">
            Select a conversation from the sidebar or search for contacts to
            experience fast, secure real-time messaging.
          </p>
        </div>

        {/* 3 Taghyeer Feature Mini-Cards */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <div className="p-3 rounded-2xl bg-brand-card/90 border border-purple-500/20 text-center space-y-1.5 shadow-md shadow-purple-950/10 dark:shadow-purple-950/30">
            <div className="w-7 h-7 mx-auto rounded-lg bg-brand-gradient flex items-center justify-center text-white shadow-sm">
              <Zap className="h-3.5 w-3.5" />
            </div>
            <p className="text-[11px] font-bold text-brand-text">Fast</p>
            <p className="text-[9px] text-brand-muted">Instant delivery</p>
          </div>

          <div className="p-3 rounded-2xl bg-brand-card/90 border border-purple-500/20 text-center space-y-1.5 shadow-md shadow-purple-950/10 dark:shadow-purple-950/30">
            <div className="w-7 h-7 mx-auto rounded-lg bg-brand-gradient flex items-center justify-center text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <p className="text-[11px] font-bold text-brand-text">Real-time</p>
            <p className="text-[9px] text-brand-muted">Live sync</p>
          </div>

          <div className="p-3 rounded-2xl bg-brand-card/90 border border-purple-500/20 text-center space-y-1.5 shadow-md shadow-purple-950/10 dark:shadow-purple-950/30">
            <div className="w-7 h-7 mx-auto rounded-lg bg-brand-gradient flex items-center justify-center text-white shadow-sm">
              <Rocket className="h-3.5 w-3.5" />
            </div>
            <p className="text-[11px] font-bold text-brand-text">Scalable</p>
            <p className="text-[9px] text-brand-muted">Groups & 1-1</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-brand-muted">
          <Shield className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
          <span>Enterprise grade JWT authentication & encryption</span>
        </div>
      </div>
    </div>
  );
}
