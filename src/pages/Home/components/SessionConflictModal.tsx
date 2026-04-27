import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, LogOut, Monitor, Smartphone, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface Session {
  id: string;
  device_name: string | null;
  platform: string | null;
  last_seen_at: string;
}

interface SessionConflictModalProps {
  isOpen: boolean;
  sessions: Session[];
  onDisconnectAll: () => Promise<void>;
  onCancel: () => void;
}

export function SessionConflictModal({
  isOpen,
  sessions,
  onDisconnectAll,
  onCancel,
}: SessionConflictModalProps) {
  const { t, language } = useLanguage();
  const [loading, setLoading] = React.useState(false);

  const labels = {
    'pt-BR': {
      title: "Sessão Ativa",
      subtitle: "Você já está logado em outro dispositivo. Para continuar aqui, é necessário desconectar das outras sessões.",
      disconnectBtn: "Desconectar outros dispositivos",
      cancelBtn: "Sair agora",
      otherDevices: "Dispositivos conectados:",
      lastSeen: "Visto por último:",
    },
    'en': {
      title: "Active Session",
      subtitle: "You are already logged in on another device. To continue here, you must disconnect from other sessions.",
      disconnectBtn: "Disconnect other devices",
      cancelBtn: "Log out now",
      otherDevices: "Connected devices:",
      lastSeen: "Last seen:",
    },
    'es': {
      title: "Sesión Activa",
      subtitle: "Ya has iniciado sesión em outro dispositivo. Para continuar aquí, debes desconectar las outras sesiones.",
      disconnectBtn: "Desconectar otros dispositivos",
      cancelBtn: "Cerrar sesión ahora",
      otherDevices: "Dispositivos conectados:",
      lastSeen: "Visto por último:",
    }
  };

  const l = labels[language] || labels['pt-BR'];

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onDisconnectAll();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onCancel}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white dark:bg-[#1a1a1a] p-8 shadow-2xl border border-black/5 dark:border-white/5"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-amber-500/10 text-amber-500">
              <AlertCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                {l.title}
              </h2>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed px-4">
                {l.subtitle}
              </p>
            </div>

            <div className="w-full space-y-3 py-2 text-left">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[2px] px-1">
                {l.otherDevices}
              </p>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {sessions.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#222] shadow-sm">
                      {s.platform === 'ios' || s.platform === 'android' ? (
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                      ) : s.platform === 'web' ? (
                        <Globe className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Monitor className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">
                        {s.device_name || "Dispositivo desconhecido"}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-medium">
                        {l.lastSeen} {new Date(s.last_seen_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={cn(
                  "w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 rounded-[22px] shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50",
                  loading && "animate-pulse"
                )}
              >
                <LogOut className="h-5 w-5" />
                {l.disconnectBtn}
              </button>
              
              <button
                onClick={onCancel}
                className="w-full text-sm font-bold text-muted-foreground py-2 active:scale-[0.95] transition-all"
              >
                {l.cancelBtn}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
