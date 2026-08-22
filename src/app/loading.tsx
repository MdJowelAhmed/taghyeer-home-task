import { Loader } from "@/components/ui/Loader";


export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-bg text-brand-text space-y-4">
      <Loader size={1.2} />
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm tracking-wider bg-brand-gradient text-transparent bg-clip-text">
          TAGHYEER
        </span>
        <span className="text-xs text-brand-muted font-mono animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
}
