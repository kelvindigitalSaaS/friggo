import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { RefreshCw, X } from 'lucide-react';
import { checkForAppUpdate } from '@/lib/cacheVersion';
import { useKaza } from '@/contexts/KazaContext';

export function UpdatePrompt() {
  const { pathname } = useLocation();
  const isAppRoute = pathname.startsWith('/app');

  // Suppress update prompts in development mode (localhost)
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  const [isUpdating, setIsUpdating] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const dismissedRef = useRef(false);
  const toastShownRef = useRef(false);
  const reloadingRef = useRef(false);

  useEffect(() => {
    if (isDev) return; // Skip update checks in dev mode
    checkForAppUpdate().then((available) => {
      if (available && !dismissedRef.current) setHasUpdate(true);
    });

    if (!('serviceWorker' in navigator)) return;

    // When the new SW takes control, reload once (only if user clicked "Atualizar")
    const handleControllerChange = () => {
      if (reloadingRef.current) {
        window.location.reload();
      }
    };
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    const updateCheckInterval = setInterval(() => {
      if (dismissedRef.current) return;
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => {
          reg.update().then(() => {
            if (reg.waiting && !dismissedRef.current) {
              setHasUpdate(true);
            }
          });
        });
      });
    }, 60000);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      clearInterval(updateCheckInterval);
    };
  }, []);

  const { onboardingData } = useKaza();

  useEffect(() => {
    if (isDev) return; // Skip update toast in dev mode
    if (!isAppRoute || toastShownRef.current || !hasUpdate) return;
    
    // Check if user disabled auto prompts in DB or localStorage
    const autoPromptEnabled = onboardingData?.autoUpdatePrompt ?? (localStorage.getItem("kaza_auto_update_prompt") !== "false");
    if (!autoPromptEnabled) return;

    toastShownRef.current = true;

    const applyUpdate = async () => {
      setIsUpdating(true);
      reloadingRef.current = true;
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        const waiting = regs.map(r => r.waiting).find(Boolean);
        if (waiting) {
          waiting.postMessage({ type: 'SKIP_WAITING' });
          // controllerchange handler will reload once new SW takes over
          setTimeout(() => window.location.reload(), 1500); // fallback
        } else {
          window.location.reload();
        }
      } catch {
        window.location.reload();
      }
    };

    const dismiss = (t: string | number) => {
      dismissedRef.current = true;
      setHasUpdate(false);
      toast.dismiss(t);
    };

    toast.custom(
      (t) => (
        <div className="relative flex items-center gap-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-lg p-4 pr-10 shadow-lg max-w-md">
          <RefreshCw className="h-5 w-5 text-primary dark:text-primary animate-spin" />
          <div className="flex-1">
            <p className="font-semibold text-primary dark:text-primary">
              Nova versão disponível!
            </p>
            <p className="text-sm text-primary/80 dark:text-primary/80 mt-1">
              Clique para atualizar e aproveitar as novidades.
            </p>
          </div>
          <button
            onClick={() => {
              toast.dismiss(t);
              applyUpdate();
            }}
            className="ml-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Atualizar
          </button>
          <button
            onClick={() => dismiss(t)}
            aria-label="Fechar"
            className="absolute top-2 right-2 p-1 rounded-md text-primary/70 hover:bg-primary/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ),
      { duration: Infinity }
    );
  }, [hasUpdate, isAppRoute]);

  // Show loading state while updating
  if (isUpdating) {
    return (
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-[#11302c] rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          <p className="font-semibold text-foreground">Atualizando app...</p>
          <p className="text-sm text-muted-foreground">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  return null;
}
