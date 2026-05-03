import { useState, useEffect } from "react";
import { WifiOff, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const offlineMessages = {
  "pt-BR": {
    title: "🛰️ Voa solo!",
    message: "Você está voando sem rede! Alguns recursos podem estar obsoletos.",
    hint: "Conecte-se à internet para usar 100% do Kaza",
    retry: "Reconectar"
  },
  en: {
    title: "✈️ Going offline!",
    message: "Flying without network! Some features may be outdated.",
    hint: "Connect to internet for full Kaza experience",
    retry: "Reconnect"
  },
  es: {
    title: "🛫 ¡Modo offline!",
    message: "¡Volando sin red! Algunos recursos pueden estar desactua lizados.",
    hint: "Conecta a internet para 100% de Kaza",
    retry: "Reconectar"
  }
};

export function OfflineOverlay() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { language } = useLanguage();
  const t = offlineMessages[language] || offlineMessages["pt-BR"];

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      // Guardar estado offline no localStorage para não perder configurações
      localStorage.setItem("kaza-offline-mode", "true");
    };

    const handleOnline = () => {
      setIsOffline(false);
      localStorage.removeItem("kaza-offline-mode");
    };

    // Suporte para disparar o modo offline manualmente (Ex: timeout ou fetch fail)
    const handleForceOffline = () => {
      setIsOffline(true);
      localStorage.setItem("kaza-offline-mode", "true");
    };

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
    <div className="fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300">
      <div className="flex items-start gap-3 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
        <div className="flex-shrink-0 pt-0.5">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight">{t.title}</p>
          <p className="text-xs leading-snug mt-0.5 opacity-95">{t.message}</p>
          <p className="text-[10px] leading-snug mt-1 opacity-80 italic">{t.hint}</p>
        </div>
        <button
          onClick={() => {
            if (navigator.onLine) {
              setIsOffline(false);
              localStorage.removeItem("kaza-offline-mode");
              window.location.reload();
            }
          }}
          className="shrink-0 rounded-lg bg-white/25 hover:bg-white/35 px-3 py-1.5 text-xs font-bold active:scale-95 transition-all whitespace-nowrap"
        >
          {t.retry}
        </button>
      </div>
    </div>
  );
}
