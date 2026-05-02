import { useKaza } from "@/contexts/KazaContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCard } from "./AlertCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, CheckCheck, ShoppingCart, ChefHat, Trash2, Package, Trophy, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/hooks/useNotificationStore";

interface NotificationsMenuProps {
  children?: React.ReactNode;
}

const labels = {
  "pt-BR": {
    title: "Notificações",
    clearAll: "Limpar tudo",
    allGood: "Tudo certo!",
    noNotifs: "Nenhuma notificação no momento",
    urgent: "Urgente",
    attention: "Atenção",
    info: "Informativo",
    activity: "Atividade Recente"
  },
  en: {
    title: "Notifications",
    clearAll: "Clear all",
    allGood: "All good!",
    noNotifs: "No notifications at the moment",
    urgent: "Urgent",
    attention: "Attention",
    info: "Informational",
    activity: "Recent Activity"
  },
  es: {
    title: "Notificaciones",
    clearAll: "Limpiar todo",
    allGood: "¡Todo bien!",
    noNotifs: "Sin notificaciones por el momento",
    urgent: "Urgente",
    attention: "Atención",
    info: "Informativo",
    activity: "Actividad Reciente"
  }
};

const typeIcon: Record<string, React.ReactNode> = {
  shopping: <ShoppingCart className="h-4 w-4 text-primary" />,
  recipes: <ChefHat className="h-4 w-4 text-orange-500" />,
  garbage: <Trash2 className="h-4 w-4 text-green-600" />,
  consumables: <Package className="h-4 w-4 text-blue-500" />,
  achievement: <Trophy className="h-4 w-4 text-yellow-500" />,
};

function relativeTime(iso: string, language: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);
  if (language === "pt-BR") {
    if (min < 1) return "agora";
    if (min < 60) return `${min}min atrás`;
    if (hr < 24) return `${hr}h atrás`;
    return `${day}d atrás`;
  }
  if (min < 1) return "now";
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  return `${day}d ago`;
}

export function NotificationsMenu({ children }: NotificationsMenuProps) {
  const { alerts, dismissAlert } = useKaza();
  const { language } = useLanguage();
  const l = labels[language as keyof typeof labels] || labels["pt-BR"];

  const { notifications: storedNotifs, dismiss: handleDismissStored, clearAll: clearStoredAll } = useNotificationStore();

  const highPriorityAlerts = alerts.filter((a) => a.priority === "high");
  const mediumPriorityAlerts = alerts.filter((a) => a.priority === "medium");
  const lowPriorityAlerts = alerts.filter((a) => a.priority === "low");

  const totalCount = alerts.length + storedNotifs.length;

  const dismissAll = () => {
    alerts.forEach((alert) => dismissAlert(alert.id));
    clearStoredAll();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-card border border-border shadow-sm transition-all active:scale-95">
            <Bell className="h-5 w-5 text-foreground" />
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg font-bold">
              <Bell className="h-5 w-5 text-primary" />
              {l.title}
            </SheetTitle>
            {(alerts.length > 0 || storedNotifs.length > 0) && (
              <Button variant="ghost" size="sm" onClick={dismissAll} className="gap-2 text-gray-500">
                <CheckCheck className="h-4 w-4" />
                {l.clearAll}
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)]">
          <div className="space-y-4 px-6 py-5 pb-10">
            {alerts.length === 0 && storedNotifs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <Bell className="h-10 w-10 text-gray-500" />
                </div>
                <p className="text-base font-semibold text-foreground">{l.allGood}</p>
                <p className="mt-1 text-sm text-gray-500">{l.noNotifs}</p>
              </div>
            ) : (
              <>
                {highPriorityAlerts.length > 0 && (
                  <section>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-destructive">{l.urgent}</h3>
                    <div className="space-y-2">
                      {highPriorityAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} onDismiss={() => dismissAlert(alert.id)} />
                      ))}
                    </div>
                  </section>
                )}
                {mediumPriorityAlerts.length > 0 && (
                  <section>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-warning">{l.attention}</h3>
                    <div className="space-y-2">
                      {mediumPriorityAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} onDismiss={() => dismissAlert(alert.id)} />
                      ))}
                    </div>
                  </section>
                )}
                {lowPriorityAlerts.length > 0 && (
                  <section>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">{l.info}</h3>
                    <div className="space-y-2">
                      {lowPriorityAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} onDismiss={() => dismissAlert(alert.id)} />
                      ))}
                    </div>
                  </section>
                )}

                {storedNotifs.length > 0 && (
                  <section>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{l.activity}</h3>
                    <div className="space-y-2">
                      {storedNotifs.map((notif) => (
                        <div key={notif.id} className={cn("flex items-start gap-3 rounded-2xl border p-3 transition-all", "border-primary/20 bg-primary/5")}>
                          <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-0.5">
                            {typeIcon[notif.type] || <AlertTriangle className="h-4 w-4 text-muted-foreground" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground leading-tight">{notif.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{notif.body}</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">{relativeTime(notif.created_at, language)}</p>
                          </div>
                          <button onClick={() => handleDismissStored(notif.id)} className="h-6 w-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 shrink-0">
                            <CheckCheck className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
