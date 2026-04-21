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
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    info: "Informativo"
  },
  en: {
    title: "Notifications",
    clearAll: "Clear all",
    allGood: "All good!",
    noNotifs: "No notifications at the moment",
    urgent: "Urgent",
    attention: "Attention",
    info: "Informational"
  },
  es: {
    title: "Notificaciones",
    clearAll: "Limpiar todo",
    allGood: "¡Todo bien!",
    noNotifs: "Sin notificaciones por el momento",
    urgent: "Urgente",
    attention: "Atención",
    info: "Informativo"
  }
};

export function NotificationsMenu({ children }: NotificationsMenuProps) {
  const { alerts, dismissAlert } = useKaza();
  const { language } = useLanguage();
  const l = labels[language];

  const highPriorityAlerts = alerts.filter((a) => a.priority === "high");
  const mediumPriorityAlerts = alerts.filter((a) => a.priority === "medium");
  const lowPriorityAlerts = alerts.filter((a) => a.priority === "low");

  const dismissAll = () => {
    alerts.forEach((alert) => dismissAlert(alert.id));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-card border border-border shadow-sm transition-all active:scale-95">
            <Bell className="h-5 w-5 text-foreground" />
            {alerts.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {alerts.length}
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
            {alerts.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissAll}
                className="gap-2 text-gray-500"
              >
                <CheckCheck className="h-4 w-4" />
                {l.clearAll}
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)]">
          <div className="space-y-4 px-6 py-5 pb-10">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <Bell className="h-10 w-10 text-gray-500" />
                </div>
                <p className="text-base font-semibold text-foreground">
                  {l.allGood}
                </p>
                <p className="mt-1 text-sm text-gray-500">{l.noNotifs}</p>
              </div>
            ) : (
              <>
                {highPriorityAlerts.length > 0 && (
                  <section>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-destructive">
                      {l.urgent}
                    </h3>
                    <div className="space-y-2">
                      {highPriorityAlerts.map((alert) => (
                        <AlertCard
                          key={alert.id}
                          alert={alert}
                          onDismiss={() => dismissAlert(alert.id)}
                        />
                      ))}
                    </div>
                  </section>
                )}
                {mediumPriorityAlerts.length > 0 && (
                  <section>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-warning">
                      {l.attention}
                    </h3>
                    <div className="space-y-2">
                      {mediumPriorityAlerts.map((alert) => (
                        <AlertCard
                          key={alert.id}
                          alert={alert}
                          onDismiss={() => dismissAlert(alert.id)}
                        />
                      ))}
                    </div>
                  </section>
                )}
                {lowPriorityAlerts.length > 0 && (
                  <section>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                      {l.info}
                    </h3>
                    <div className="space-y-2">
                      {lowPriorityAlerts.map((alert) => (
                        <AlertCard
                          key={alert.id}
                          alert={alert}
                          onDismiss={() => dismissAlert(alert.id)}
                        />
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
