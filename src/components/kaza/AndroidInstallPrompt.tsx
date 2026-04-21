import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const labels = {
  "pt-BR": {
    title: "Instalar Kaza",
    desc: "Adicione à tela inicial para acesso rápido.",
    install: "Instalar app",
    installing: "Instalando..."
  },
  en: {
    title: "Install Kaza",
    desc: "Add to home screen for quick access.",
    install: "Install app",
    installing: "Installing..."
  },
  es: {
    title: "Instalar Kaza",
    desc: "Agrega a la pantalla de inicio para acceso rápido.",
    install: "Instalar app",
    installing: "Instalando..."
  }
};

export function AndroidInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [installing, setInstalling] = useState(false);
  const { language } = useLanguage();

  const l = labels[language] ?? labels["pt-BR"];

  useEffect(() => {
    const dismissed = localStorage.getItem("Kaza-android-install-dismissed");
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Delay a few seconds to avoid appearing too eagerly
      setTimeout(() => setShow(true), 5000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      } else {
        localStorage.setItem(
            "Kaza-android-install-dismissed",
            Date.now().toString()
          );
      }
    } catch {
      // ignore prompt errors
    } finally {
      setShow(false);
      setInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(
      "Kaza-android-install-dismissed",
      Date.now().toString()
    );
  };

  if (!show || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] animate-in slide-in-from-bottom duration-300 px-4 pb-6 safe-area-bottom">
      <div className="relative mx-auto max-w-md rounded-2xl border border-border bg-card shadow-2xl p-4">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
            <span className="text-2xl">🧊</span>
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <p className="font-bold text-foreground text-sm">{l.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
              {l.desc}
            </p>
          </div>
        </div>

        {/* Install button */}
        <button
          onClick={handleInstall}
          disabled={installing}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-bold transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70"
        >
          <Download className="h-4 w-4" />
          {installing ? l.installing : l.install}
        </button>

        {/* hint removed (voice assistants hidden) */}
      </div>
    </div>
  );
}
