import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const offlineMessages = {
  "pt-BR": {
    title: "Você está offline",
    message:
      "Sua app está offline, e provavelmente não irá salvar. Conecte-se na rede e tenha acesso ao Kaza novamente.",
    retry: "Tentar reconectar"
  },
  en: {
    title: "You're offline",
    message:
      "Your app is offline and probably won't save. Connect to a network to access Kaza again.",
    retry: "Try to reconnect"
  },
  es: {
    title: "Estás sin conexión",
    message:
      "Tu app está sin conexión y probablemente no guardará. Conéctate a la red para acceder a Kaza nuevamente.",
    retry: "Intentar reconectar"
  }
};

function SadFridge() {
  return (
    <svg
      width="180"
      height="260"
      viewBox="0 0 180 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Body */}
      <rect
        x="30"
        y="20"
        width="120"
        height="220"
        rx="16"
        fill="#b0bec5"
        stroke="#78909c"
        strokeWidth="3"
      />

      {/* Freezer door */}
      <rect
        x="38"
        y="28"
        width="104"
        height="60"
        rx="8"
        fill="#eceff1"
        stroke="#90a4ae"
        strokeWidth="2"
      />

      {/* Fridge door */}
      <rect
        x="38"
        y="96"
        width="104"
        height="136"
        rx="8"
        fill="#eceff1"
        stroke="#90a4ae"
        strokeWidth="2"
      />

      {/* Freezer handle */}
      <rect x="126" y="48" width="6" height="24" rx="3" fill="#78909c" />

      {/* Fridge handle */}
      <rect x="126" y="140" width="6" height="40" rx="3" fill="#78909c" />

      {/* Door line */}
      <line x1="38" y1="92" x2="142" y2="92" stroke="#90a4ae" strokeWidth="2" />

      {/* Sad eyes */}
      <ellipse
        cx="68"
        cy="145"
        rx="10"
        ry="12"
        fill="white"
        stroke="#546e7a"
        strokeWidth="2"
      />
      <ellipse
        cx="112"
        cy="145"
        rx="10"
        ry="12"
        fill="white"
        stroke="#546e7a"
        strokeWidth="2"
      />
      <circle cx="68" cy="150" r="5" fill="#37474f" />
      <circle cx="112" cy="150" r="5" fill="#37474f" />
      {/* Eyebrow (sad angle) */}
      <line
        x1="56"
        y1="128"
        x2="78"
        y2="132"
        stroke="#546e7a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="124"
        y1="128"
        x2="102"
        y2="132"
        stroke="#546e7a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Sad mouth (frown arc) */}
      <path
        d="M 72 190 Q 90 175, 108 190"
        stroke="#546e7a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tear drops */}
      <ellipse cx="68" cy="165" rx="3" ry="5" fill="#64b5f6" opacity="0.8">
        <animate
          attributeName="cy"
          values="165;175;165"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.2;0.8"
          dur="2s"
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse cx="112" cy="168" rx="3" ry="5" fill="#64b5f6" opacity="0.6">
        <animate
          attributeName="cy"
          values="168;178;168"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0.1;0.6"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Feet */}
      <rect x="45" y="238" width="20" height="8" rx="4" fill="#78909c" />
      <rect x="115" y="238" width="20" height="8" rx="4" fill="#78909c" />
    </svg>
  );
}

export function OfflineOverlay() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { language } = useLanguage();
  const t = offlineMessages[language] || offlineMessages["pt-BR"];

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm px-6 text-center">
      <SadFridge />

      <div className="mt-6 flex items-center gap-2 text-destructive">
        <WifiOff className="h-6 w-6" />
        <h2 className="text-xl font-bold">{t.title}</h2>
      </div>

      <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
        {t.message}
      </p>

      <button
        onClick={() => {
          if (navigator.onLine) setIsOffline(false);
        }}
        className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md active:scale-95 transition-transform"
      >
        {t.retry}
      </button>
    </div>
  );
}
