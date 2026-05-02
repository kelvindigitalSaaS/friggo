import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const offlineMessages = {
  "pt-BR": {
    message: "Você está offline. Conecte-se para usar o Kaza completo.",
    retry: "Reconectar"
  },
  en: {
    message: "You are offline. Connect for full Kaza experience.",
    retry: "Reconnect"
  },
  es: {
    message: "Estás desconectado. Conéctate para usar Kaza completo.",
    retry: "Reconectar"
  }
};

export function OfflineOverlay() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { language } = useLanguage();
  const t = offlineMessages[language] || offlineMessages["pt-BR"];

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    // Suporte para disparar o modo offline manualmente (Ex: timeout ou fetch fail)
    const handleForceOffline = () => setIsOffline(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    window.addEventListener("force-offline", handleForceOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("force-offline", handleForceOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] flex items-center justify-between gap-3 px-4 py-2.5 bg-amber-500 text-white animate-in slide-in-from-top duration-300 shadow-md">
      <div className="flex items-center gap-2 min-w-0">
        <WifiOff className="h-4 w-4 shrink-0" />
        <p className="text-xs font-semibold leading-tight truncate">
          {t.message}
        </p>
      </div>
      <button
        onClick={() => {
          if (navigator.onLine) {
            setIsOffline(false);
            window.location.reload();
          }
        }}
        className="shrink-0 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold active:scale-95 transition-all"
      >
        {t.retry}
      </button>
    </div>
  );
}
