import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useKaza } from "@/contexts/FriggoContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Leaf,
  AlertTriangle,
  DollarSign,
  Package
} from "lucide-react";
import { format, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import { useMemo } from "react";

interface MonthlyReportProps {
  open: boolean;
  onClose: () => void;
}

export function MonthlyReport({ open, onClose }: MonthlyReportProps) {
  const { itemHistory, items } = useKaza();
  const { language } = useLanguage();

  const dateLocale = language === "en" ? enUS : language === "es" ? es : ptBR;

  const labels = {
    "pt-BR": {
      report: "Relatório de",
      itemsUsed: "Itens aproveitados",
      itemsDiscarded: "Itens descartados",
      estimatedSavings: "Economia estimada",
      waste: "Desperdício",
      wasteIndex: "Índice de Desperdício",
      excellent: "Excelente! Continue assim 🌟",
      good: "Bom, mas pode melhorar 💪",
      attention: "Atenção! Reduza o desperdício 🌱",
      topConsumed: "🏆 Mais Consumidos",
      topDiscarded: "⚠️ Mais Descartados",
      noData: "Sem dados ainda",
      useApp: "Use o app para ver seu relatório mensal",
      tips: "💡 Dicas para reduzir desperdício",
      tip1: "Planeje suas refeições da semana",
      tip2: "Use primeiro os itens mais próximos do vencimento",
      tip3: "Congele alimentos que não vai usar a tempo",
      tip4: "Compre quantidades menores mais frequentemente"
    },
    en: {
      report: "Report for",
      itemsUsed: "Items used",
      itemsDiscarded: "Items discarded",
      estimatedSavings: "Estimated savings",
      waste: "Waste",
      wasteIndex: "Waste Index",
      excellent: "Excellent! Keep it up 🌟",
      good: "Good, but can improve 💪",
      attention: "Attention! Reduce waste 🌱",
      topConsumed: "🏆 Most Consumed",
      topDiscarded: "⚠️ Most Discarded",
      noData: "No data yet",
      useApp: "Use the app to see your monthly report",
      tips: "💡 Tips to reduce waste",
      tip1: "Plan your weekly meals",
      tip2: "Use items closest to expiry first",
      tip3: "Freeze food you won't use in time",
      tip4: "Buy smaller quantities more often"
    },
    es: {
      report: "Reporte de",
      itemsUsed: "Artículos aprovechados",
      itemsDiscarded: "Artículos descartados",
      estimatedSavings: "Ahorro estimado",
      waste: "Desperdicio",
      wasteIndex: "Índice de Desperdicio",
      excellent: "¡Excelente! Sigue así 🌟",
      good: "Bien, pero puede mejorar 💪",
      attention: "¡Atención! Reduce el desperdicio 🌱",
      topConsumed: "🏆 Más Consumidos",
      topDiscarded: "⚠️ Más Descartados",
      noData: "Sin datos aún",
      useApp: "Usa la app para ver tu reporte mensual",
      tips: "💡 Tips para reducir desperdicio",
      tip1: "Planifica tus comidas de la semana",
      tip2: "Usa primero los artículos más próximos a vencer",
      tip3: "Congela alimentos que no vas a usar a tiempo",
      tip4: "Compra cantidades menores más seguido"
    }
  };

  const l = labels[language];

  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const monthlyHistory = itemHistory.filter((entry) =>
      isWithinInterval(new Date(entry.timestamp), {
        start: monthStart,
        end: monthEnd
      })
    );
    const consumed = monthlyHistory.filter((h) => h.action === "consumed");
    const cooked = monthlyHistory.filter((h) => h.action === "cooked");
    const discarded = monthlyHistory.filter((h) => h.action === "discarded");
    const added = monthlyHistory.filter((h) => h.action === "added");
    const totalConsumed = consumed.reduce((sum, h) => sum + h.quantity, 0);
    const totalCooked = cooked.reduce((sum, h) => sum + h.quantity, 0);
    const totalDiscarded = discarded.reduce((sum, h) => sum + h.quantity, 0);
    const totalAdded = added.reduce((sum, h) => sum + h.quantity, 0);
    const avgPricePerUnit = 8;
    const savedValue = (totalConsumed + totalCooked) * avgPricePerUnit;
    const wastedValue = totalDiscarded * avgPricePerUnit;
    const consumedByItem = consumed.reduce((acc, h) => {
      acc[h.itemName] = (acc[h.itemName] || 0) + h.quantity;
      return acc;
    }, {} as Record<string, number>);
    const discardedByItem = discarded.reduce((acc, h) => {
      acc[h.itemName] = (acc[h.itemName] || 0) + h.quantity;
      return acc;
    }, {} as Record<string, number>);
    const topConsumed = Object.entries(consumedByItem)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const topDiscarded = Object.entries(discardedByItem)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const wastePercentage =
      totalAdded > 0 ? Math.round((totalDiscarded / totalAdded) * 100) : 0;
    return {
      totalConsumed,
      totalCooked,
      totalDiscarded,
      savedValue,
      wastedValue,
      wastePercentage,
      topConsumed,
      topDiscarded,
      monthName: format(now, "MMMM yyyy", { locale: dateLocale })
    };
  }, [itemHistory, dateLocale]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold capitalize">
            <BarChart3 className="h-5 w-5 text-primary" />
            {l.report} {stats.monthName}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)]">
          <div className="space-y-6 px-6 py-5 pb-10">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary/20 p-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">
                  {stats.totalConsumed + stats.totalCooked}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {l.itemsUsed}
                </p>
              </div>
              <div className="rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-destructive/20 p-2">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">
                  {stats.totalDiscarded}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {l.itemsDiscarded}
                </p>
              </div>
              <div className="rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-fresh/20 p-2">
                    <DollarSign className="h-5 w-5 text-fresh" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">
                  R$ {stats.savedValue.toFixed(0)}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {l.estimatedSavings}
                </p>
              </div>
              <div className="rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-warning/20 p-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">
                  R$ {stats.wastedValue.toFixed(0)}
                </p>
                <p className="text-sm font-medium text-gray-500">{l.waste}</p>
              </div>
            </div>

            <div className="rounded-md border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-md p-2 ${
                      stats.wastePercentage <= 10
                        ? "bg-fresh/20"
                        : stats.wastePercentage <= 25
                        ? "bg-warning/20"
                        : "bg-destructive/20"
                    }`}
                  >
                    <Leaf
                      className={`h-5 w-5 ${
                        stats.wastePercentage <= 10
                          ? "text-fresh"
                          : stats.wastePercentage <= 25
                          ? "text-warning"
                          : "text-destructive"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {l.wasteIndex}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stats.wastePercentage <= 10
                        ? l.excellent
                        : stats.wastePercentage <= 25
                        ? l.good
                        : l.attention}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-2xl font-bold ${
                    stats.wastePercentage <= 10
                      ? "text-fresh"
                      : stats.wastePercentage <= 25
                      ? "text-warning"
                      : "text-destructive"
                  }`}
                >
                  {stats.wastePercentage}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${
                    stats.wastePercentage <= 10
                      ? "bg-fresh"
                      : stats.wastePercentage <= 25
                      ? "bg-warning"
                      : "bg-destructive"
                  }`}
                  style={{ width: `${Math.min(stats.wastePercentage, 100)}%` }}
                />
              </div>
            </div>

            {stats.topConsumed.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  {l.topConsumed}
                </h3>
                <div className="space-y-2">
                  {stats.topConsumed.map(([name, qty], index) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 rounded-md bg-card p-3 border border-border"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="flex-1 font-medium text-foreground">
                        {name}
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {qty}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stats.topDiscarded.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  {l.topDiscarded}
                </h3>
                <div className="space-y-2">
                  {stats.topDiscarded.map(([name, qty], index) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 rounded-md bg-destructive/5 p-3 border border-destructive/20"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-sm font-bold text-destructive">
                        {index + 1}
                      </span>
                      <span className="flex-1 font-medium text-foreground">
                        {name}
                      </span>
                      <span className="text-sm font-semibold text-destructive">
                        {qty}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stats.topConsumed.length === 0 &&
              stats.topDiscarded.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Package className="h-10 w-10 text-gray-500" />
                  </div>
                  <p className="text-base font-semibold text-foreground">
                    {l.noData}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{l.useApp}</p>
                </div>
              )}

            <div className="rounded-md p-4">
              <h3 className="mb-2 font-semibold text-foreground">{l.tips}</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• {l.tip1}</li>
                <li>• {l.tip2}</li>
                <li>• {l.tip3}</li>
                <li>• {l.tip4}</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
