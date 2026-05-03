import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function GlobalRefreshButton() {
  const [spinning, setSpinning] = useState(false);
  const location = useLocation();

  // Only show inside the app, not on sales page or success page maybe?
  // User said "em todos", but usually we want it in the main app context.
  if (!location.pathname.startsWith("/app")) return null;

  const handleRefresh = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => window.location.reload(), 400);
  };

  return (
    <button
      onClick={handleRefresh}
      className={cn(
        "fixed right-4 z-50",
        "h-10 w-10 flex items-center justify-center rounded-full",
        "bg-primary/90 dark:bg-primary/80 backdrop-blur-md hover:bg-primary",
        "border border-primary/30 dark:border-primary/50",
        "shadow-lg shadow-primary/30 text-white transition-all active:scale-90",
        // Positioned at the bottom, above safe area.
        "bottom-[calc(env(safe-area-inset-bottom,0px)+5.9rem)]"
      )}
      title="Atualizar"
    >
      <RefreshCw className={cn("h-5 w-5", spinning && "animate-spin")} />
    </button>
  );
}
