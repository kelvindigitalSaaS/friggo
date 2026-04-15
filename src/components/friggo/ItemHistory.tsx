import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFriggo } from "@/contexts/FriggoContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  History,
  Plus,
  Minus,
  Trash2,
  UtensilsCrossed,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";

interface ItemHistoryProps {
  open: boolean;
  onClose: () => void;
}

export function ItemHistory({ open, onClose }: ItemHistoryProps) {
  const { itemHistory } = useFriggo();
  const { language } = useLanguage();

  const dateLocale = language === "en" ? enUS : language === "es" ? es : ptBR;

  const labels = {
    "pt-BR": {
      title: "Histórico de Atividades",
      noActivity: "Nenhuma atividade",
      actionsHere: "Suas ações aparecerão aqui",
      added: "Adicionou",
      consumed: "Consumiu",
      cooked: "Cozinhou",
      discarded: "Descartou"
    },
    en: {
      title: "Activity History",
      noActivity: "No activity",
      actionsHere: "Your actions will appear here",
      added: "Added",
      consumed: "Consumed",
      cooked: "Cooked",
      discarded: "Discarded"
    },
    es: {
      title: "Historial de Actividades",
      noActivity: "Sin actividad",
      actionsHere: "Tus acciones aparecerán aquí",
      added: "Agregó",
      consumed: "Consumió",
      cooked: "Cocinó",
      discarded: "Descartó"
    }
  };

  const l = labels[language];

  const actionIcons = {
    added: Plus,
    consumed: Minus,
    cooked: UtensilsCrossed,
    discarded: Trash2
  };
  const actionLabels: Record<string, string> = {
    added: l.added,
    consumed: l.consumed,
    cooked: l.cooked,
    discarded: l.discarded
  };
  const actionColors: Record<string, string> = {
    added: "bg-primary/10 text-primary",
    consumed: "bg-secondary text-secondary-foreground",
    cooked: "bg-warning/10 text-warning",
    discarded: "bg-destructive/10 text-destructive"
  };

  const sortedHistory = [...(itemHistory || [])].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  const groupedByDate = sortedHistory.reduce((acc, item) => {
    const date = format(new Date(item.timestamp), "yyyy-MM-dd");
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof sortedHistory>);

  const formatDateHeader = (date: string) => {
    if (language === "en")
      return format(new Date(date), "EEEE, MMMM d", { locale: enUS });
    if (language === "es")
      return format(new Date(date), "EEEE, d 'de' MMMM", { locale: es });
    return format(new Date(date), "EEEE, d 'de' MMMM", { locale: ptBR });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <History className="h-5 w-5 text-primary" />
            {l.title}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)]">
          <div className="space-y-6 px-6 py-5 pb-10">
            {Object.keys(groupedByDate).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <History className="h-10 w-10 text-gray-500" />
                </div>
                <p className="text-base font-semibold text-foreground">
                  {l.noActivity}
                </p>
                <p className="mt-1 text-sm text-gray-500">{l.actionsHere}</p>
              </div>
            ) : (
              Object.entries(groupedByDate).map(([date, items]) => (
                <div key={date}>
                  <h3 className="mb-3 text-sm font-semibold text-gray-500">
                    {formatDateHeader(date)}
                  </h3>
                  <div className="space-y-2">
                    {items.map((item, index) => {
                      const Icon = actionIcons[item.action] || History;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-md bg-card p-3 border border-border"
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                              actionColors[item.action]
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-foreground">
                              <span className="text-gray-500">
                                {actionLabels[item.action]}
                              </span>{" "}
                              {item.itemName}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>
                                {item.quantity} {item.unit || "un"}
                              </span>
                              {item.user && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {item.user}
                                  </span>
                                </>
                              )}
                              <span>•</span>
                              <span>
                                {format(new Date(item.timestamp), "HH:mm")}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
