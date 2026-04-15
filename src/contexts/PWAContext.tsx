import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAContextType {
  deferredPrompt: BeforeInstallPromptEvent | null;
  canInstall: boolean;
  isIOS: boolean;
  install: () => Promise<void>;
  showGuide: boolean;
  setShowGuide: (show: boolean) => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export function PWAProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      console.log("PWA: beforeinstallprompt event fired");
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsIOS(isIOSDevice || isSafari);

    window.addEventListener("beforeinstallprompt", handler);

    // Watch for app installed event
    const installedHandler = () => {
      console.log("PWA: App installed successfully");
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const install = async () => {
    if (isIOS) {
      setShowGuide(true);
      return;
    }

    if (!deferredPrompt) {
      console.warn("PWA: No installation prompt available");
      // Fallback for browsers that don't support beforeinstallprompt but are installable (like Chrome on Android sometimes)
      setShowGuide(true);
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA: Installation choice: ${outcome}`);
      
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error("PWA: Error during installation prompt", error);
    }
  };

  return (
    <PWAContext.Provider 
      value={{ 
        deferredPrompt, 
        canInstall: !!deferredPrompt || isIOS, 
        isIOS,
        install,
        showGuide,
        setShowGuide
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error("usePWA must be used within a PWAProvider");
  }
  return context;
}
