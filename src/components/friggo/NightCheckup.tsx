import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKaza } from "@/contexts/FriggoContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Moon,
  Minus,
  Trash2,
  UtensilsCrossed,
  Check,
  Camera
} from "lucide-react";
import { KazaItem } from "@/types/friggo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NightCheckupProps {
  open: boolean;
  onClose: () => void;
}

interface CheckupAction {
  itemId: string;
  action: "consumed" | "cooked" | "discarded";
  quantity: number;
}

export function NightCheckup({ open, onClose }: NightCheckupProps) {
  const { items, updateItem, removeItem, addItemHistory } = useKaza();
  const { language } = useLanguage();
  const [actions, setActions] = useState<CheckupAction[]>([]);
  const [customQuantities, setCustomQuantities] = useState<
    Record<string, string>
  >({});

  const labels = {
    "pt-BR": {
      title: "Check-up Noturno",
      subtitle: "O que aconteceu com seus alimentos hoje?",
      takePhoto: "Tirar foto da geladeira",
      noPerishable: "Nenhum item perecível no momento",
      consume: "Consumir",
      cook: "Cozinhar",
      discard: "Descartar",
      action: "ação",
      actions: "ações",
      selected: "selecionadas",
      consumed: "consumidos",
      cooked: "cozinhados",
      discarded: "descartados",
      complete: "Concluir Check-up",
      done: "Check-up concluído!",
      actionsRecorded: "ações registradas."
    },
    en: {
      title: "Night Check-up",
      subtitle: "What happened with your food today?",
      takePhoto: "Take a photo of the fridge",
      noPerishable: "No perishable items at the moment",
      consume: "Consume",
      cook: "Cook",
      discard: "Discard",
      action: "action",
      actions: "actions",
      selected: "selected",
      consumed: "consumed",
      cooked: "cooked",
      discarded: "discarded",
      complete: "Complete Check-up",
      done: "Check-up completed!",
      actionsRecorded: "actions recorded."
    },
    es: {
      title: "Chequeo Nocturno",
      subtitle: "¿Qué pasó con tus alimentos hoy?",
      takePhoto: "Tomar foto de la nevera",
      noPerishable: "No hay artículos perecederos al momento",
      consume: "Consumir",
      cook: "Cocinar",
      discard: "Descartar",
      action: "acción",
      actions: "acciones",
      selected: "seleccionadas",
      consumed: "consumidos",
      cooked: "cocinados",
      discarded: "descartados",
      complete: "Completar Chequeo",
      done: "¡Chequeo completado!",
      actionsRecorded: "acciones registradas."
    }
  };

  const l = labels[language];

  const perishableItems = items.filter((item) =>
    ["fruit", "vegetable", "dairy", "meat", "cooked"].includes(item.category)
  );

  const addAction = (
    itemId: string,
    action: "consumed" | "cooked" | "discarded"
  ) => {
    const existing = actions.find((a) => a.itemId === itemId);
    const qty = parseFloat(customQuantities[itemId] || "1") || 1;
    if (existing) {
      if (existing.action === action)
        setActions(actions.filter((a) => a.itemId !== itemId));
      else
        setActions(
          actions.map((a) =>
            a.itemId === itemId ? { ...a, action, quantity: qty } : a
          )
        );
    } else {
      setActions([...actions, { itemId, action, quantity: qty }]);
    }
  };

  const getItemAction = (itemId: string) =>
    actions.find((a) => a.itemId === itemId)?.action;

  const handleComplete = () => {
    actions.forEach(({ itemId, action, quantity }) => {
      const item = items.find((i) => i.id === itemId);
      if (!item) return;
      if (action === "discarded") {
        removeItem(itemId);
        addItemHistory?.(itemId, item.name, "discarded", quantity);
      } else {
        const newQuantity = item.quantity - quantity;
        if (newQuantity <= 0) removeItem(itemId);
        else updateItem(itemId, { quantity: newQuantity });
        addItemHistory?.(itemId, item.name, action, quantity);
      }
    });
    toast.success(`${l.done} ${actions.length} ${l.actionsRecorded}`);
    setActions([]);
    setCustomQuantities({});
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <Moon className="h-5 w-5 text-primary" />
            {l.title}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)]">
          <div className="space-y-4 px-6 py-5 pb-10">
            <p className="text-sm text-gray-500">{l.subtitle}</p>

            <Button variant="outline" className="w-full gap-2 rounded-md">
              <Camera className="h-4 w-4" />
              {l.takePhoto}
            </Button>

            <div className="space-y-3">
              {perishableItems.length === 0 ? (
                <p className="py-8 text-center text-gray-500">
                  {l.noPerishable}
                </p>
              ) : (
                perishableItems.map((item) => {
                  const currentAction = getItemAction(item.id);
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "rounded-md border border-border bg-card p-4 transition-all",
                        currentAction && "border-primary/30 bg-primary/5"
                      )}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                        <Input
                          type="number"
                          min="0.5"
                          step="0.5"
                          max={item.quantity}
                          value={customQuantities[item.id] || "1"}
                          onChange={(e) =>
                            setCustomQuantities({
                              ...customQuantities,
                              [item.id]: e.target.value
                            })
                          }
                          className="h-9 w-20 rounded-md text-center text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addAction(item.id, "consumed")}
                          className={cn(
                            "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2.5 text-sm font-medium transition-all active:scale-95",
                            currentAction === "consumed"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          )}
                        >
                          <Minus className="h-4 w-4" />
                          {l.consume}
                        </button>
                        <button
                          onClick={() => addAction(item.id, "cooked")}
                          className={cn(
                            "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2.5 text-sm font-medium transition-all active:scale-95",
                            currentAction === "cooked"
                              ? "bg-warning text-warning-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          )}
                        >
                          <UtensilsCrossed className="h-4 w-4" />
                          {l.cook}
                        </button>
                        <button
                          onClick={() => addAction(item.id, "discarded")}
                          className={cn(
                            "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2.5 text-sm font-medium transition-all active:scale-95",
                            currentAction === "discarded"
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          )}
                        >
                          <Trash2 className="h-4 w-4" />
                          {l.discard}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {actions.length > 0 && (
              <div className="space-y-3 pt-4">
                <div className="rounded-md bg-muted/50 p-3">
                  <p className="text-sm font-medium text-foreground">
                    {actions.length}{" "}
                    {actions.length === 1 ? l.action : l.actions} {l.selected}
                  </p>
                  <p className="text-xs text-gray-500">
                    {actions.filter((a) => a.action === "consumed").length}{" "}
                    {l.consumed},{" "}
                    {actions.filter((a) => a.action === "cooked").length}{" "}
                    {l.cooked},{" "}
                    {actions.filter((a) => a.action === "discarded").length}{" "}
                    {l.discarded}
                  </p>
                </div>
                <Button
                  onClick={handleComplete}
                  className="w-full gap-2 rounded-md py-6 font-bold"
                >
                  <Check className="h-5 w-5" />
                  {l.complete}
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
