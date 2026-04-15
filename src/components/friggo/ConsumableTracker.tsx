import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFriggo } from "@/contexts/FriggoContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ShoppingCart,
  TrendingDown,
  Calendar,
  Package,
  Bell,
  Plus,
  Minus,
  Settings2,
  ChevronLeft,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { cn, sanitizeFloatInput, parseSafeFloat } from "@/lib/utils";

interface ConsumableTrackerProps {
  open: boolean;
  onClose: () => void;
}

interface ConsumableItem {
  id: string;
  name: string;
  icon: string;
  currentStock: number;
  unit: string;
  dailyConsumption: number;
  minStock: number;
}

const ICON_OPTIONS = [
  "🧻",
  "🧺",
  "🧴",
  "🧼",
  "🪥",
  "🧽",
  "🫧",
  "🪣",
  "🧹",
  "🪒",
  "💊",
  "🩹",
  "🩺",
  "🧪",
  "🪤",
  "📦",
  "🧃",
  "🥤",
  "🧊",
  "🕯️",
  "💡",
  "🔋",
  "🗑️",
  "🛁"
];

const defaultConsumables: ConsumableItem[] = [
  {
    id: "1",
    name: "Papel Higiênico",
    icon: "🧻",
    currentStock: 12,
    unit: "rolos",
    dailyConsumption: 1,
    minStock: 4
  },
  {
    id: "2",
    name: "Papel Toalha",
    icon: "🧺",
    currentStock: 4,
    unit: "rolos",
    dailyConsumption: 0.5,
    minStock: 2
  },
  {
    id: "3",
    name: "Detergente",
    icon: "🧴",
    currentStock: 2,
    unit: "unidades",
    dailyConsumption: 0.1,
    minStock: 1
  },
  {
    id: "4",
    name: "Sabonete",
    icon: "🧼",
    currentStock: 3,
    unit: "unidades",
    dailyConsumption: 0.15,
    minStock: 2
  },
  {
    id: "5",
    name: "Pasta de Dente",
    icon: "🪥",
    currentStock: 2,
    unit: "tubos",
    dailyConsumption: 0.05,
    minStock: 1
  }
];

const labels = {
  "pt-BR": {
    title: "Rastreamento de Consumíveis",
    howItWorks: "Como funciona",
    howItWorksDesc:
      "Defina seu consumo diário e o app calcula quando você precisará comprar mais.",
    debit: "Debitar",
    restock: "Repor",
    customAmount: "Quantidade",
    confirm: "Confirmar",
    addItem: "Adicionar consumível",
    newItem: "Novo consumível",
    itemName: "Nome do item",
    currentStock: "Estoque atual",
    dailyUse: "Consumo/dia",
    unit: "Unidade",
    minStock: "Estoque mín.",
    perDay: "/dia",
    daysLeft: "d",
    addedToList: "adicionado à lista de compras!",
    consumptionLogged: "Consumo registrado!",
    restocked: "Estoque reposto!",
    itemAdded: "Item adicionado!",
    editSettings: "Configurações",
    save: "Salvar",
    cancel: "Cancelar",
    chooseIcon: "Escolha um ícone",
    back: "Voltar",
    presets: "Carregar básicos",
    presetsDesc: "Escolha um kit de consumíveis para começar",
    loadPreset: "Carregar",
    clearAll: "Limpar tudo",
    clearConfirm: "Isso removerá todos os consumíveis. Continuar?",
    bathroom: "🛁 Banheiro",
    kitchen: "🍳 Cozinha",
    cleaning: "🧹 Limpeza",
    personal: "💆 Higiene Pessoal",
    complete: "📦 Kit Completo",
    loaded: "Preset carregado!",
    cleared: "Consumíveis limpos!",
    configFromZero: "Configurar do zero"
  },
  en: {
    title: "Consumable Tracking",
    howItWorks: "How it works",
    howItWorksDesc:
      "Set your daily consumption and the app calculates when you need to buy more.",
    debit: "Debit",
    restock: "Restock",
    customAmount: "Amount",
    confirm: "Confirm",
    addItem: "Add consumable",
    newItem: "New consumable",
    itemName: "Item name",
    currentStock: "Current stock",
    dailyUse: "Daily use",
    unit: "Unit",
    minStock: "Min stock",
    perDay: "/day",
    daysLeft: "d",
    addedToList: "added to shopping list!",
    consumptionLogged: "Consumption logged!",
    restocked: "Stock restocked!",
    itemAdded: "Item added!",
    editSettings: "Settings",
    save: "Save",
    cancel: "Cancel",
    chooseIcon: "Choose an icon",
    back: "Back",
    presets: "Load basics",
    presetsDesc: "Choose a consumable kit to get started",
    loadPreset: "Load",
    clearAll: "Clear all",
    clearConfirm: "This will remove all consumables. Continue?",
    bathroom: "🛁 Bathroom",
    kitchen: "🍳 Kitchen",
    cleaning: "🧹 Cleaning",
    personal: "💆 Personal Care",
    complete: "📦 Complete Kit",
    loaded: "Preset loaded!",
    cleared: "Consumables cleared!",
    configFromZero: "Configure from zero"
  },
  es: {
    title: "Rastreo de Consumibles",
    howItWorks: "Cómo funciona",
    howItWorksDesc:
      "Define tu consumo diario y la app calcula cuándo necesitarás comprar más.",
    debit: "Debitar",
    restock: "Reponer",
    customAmount: "Cantidad",
    confirm: "Confirmar",
    addItem: "Agregar consumible",
    newItem: "Nuevo consumible",
    itemName: "Nombre del item",
    currentStock: "Stock actual",
    dailyUse: "Consumo/día",
    unit: "Unidad",
    minStock: "Stock mín.",
    perDay: "/día",
    daysLeft: "d",
    addedToList: "agregado a la lista de compras!",
    consumptionLogged: "¡Consumo registrado!",
    restocked: "¡Stock repuesto!",
    itemAdded: "¡Item agregado!",
    editSettings: "Configuración",
    save: "Guardar",
    cancel: "Cancelar",
    chooseIcon: "Elige un ícono",
    back: "Volver",
    presets: "Cargar básicos",
    presetsDesc: "Elige un kit de consumibles para empezar",
    loadPreset: "Cargar",
    clearAll: "Limpiar todo",
    clearConfirm: "Esto eliminará todos los consumibles. ¿Continuar?",
    bathroom: "🛁 Baño",
    kitchen: "🍳 Cocina",
    cleaning: "🧹 Limpieza",
    personal: "💆 Cuidado Personal",
    complete: "📦 Kit Completo",
    loaded: "¡Preset cargado!",
    cleared: "¡Consumibles limpiados!",
    configFromZero: "Configurar desde cero"
  }
};

type ScreenView = "list" | "add" | "edit" | "custom" | "presets";

export function ConsumableTracker({ open, onClose }: ConsumableTrackerProps) {
  const {
    consumables,
    addConsumable,
    updateConsumable,
    removeConsumable,
    addToShoppingList,
    clearConsumables,
    setConsumablesBulk
  } = useFriggo();
  const { language } = useLanguage();
  const l = labels[language];

  const [screen, setScreen] = useState<ScreenView>("list");
  const [newItem, setNewItem] = useState({
    name: "",
    icon: "📦",
    dailyConsumption: "1",
    unit: "unidades",
    currentStock: "10",
    minStock: "2",
    category: "hygiene" as any
  });

  const [customAction, setCustomAction] = useState<{
    id: string;
    type: "debit" | "restock";
  } | null>(null);
  const [customAmount, setCustomAmount] = useState("1");

  const [editItem, setEditItem] = useState<ConsumableItem | null>(null);
  const [editIcon, setEditIcon] = useState("");
  const [editDailyConsumption, setEditDailyConsumption] = useState("");
  const [editMinStock, setEditMinStock] = useState("");
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState<
    "cleaning" | "hygiene" | "pantry"
  >("hygiene");

  const calculateDaysUntilEmpty = (item: ConsumableItem) => {
    if (item.dailyConsumption <= 0) return Infinity;
    return Math.floor(item.currentStock / item.dailyConsumption);
  };

  const getAlertLevel = (daysLeft: number): "ok" | "warning" | "danger" => {
    if (daysLeft <= 3) return "danger";
    if (daysLeft <= 7) return "warning";
    return "ok";
  };

  const handleDebit = (id: string, amount?: number) => {
    const item = consumables.find((c) => c.id === id);
    if (!item) return;
    const debitAmount = amount ?? item.dailyConsumption;
    updateConsumable(id, {
      currentStock: Math.max(0, item.currentStock - debitAmount)
    });
    toast.success(l.consumptionLogged);
  };

  const handleAddStock = (id: string, amount: number) => {
    const item = consumables.find((c) => c.id === id);
    if (!item) return;
    updateConsumable(id, { currentStock: item.currentStock + amount });
    toast.success(l.restocked);
  };

  const handleCustomConfirm = () => {
    if (!customAction) return;
    const amt = parseSafeFloat(customAmount, 0);
    if (!Number.isFinite(amt) || amt <= 0) {
      toast.error(language === "pt-BR" ? "Quantidade inválida" : "Invalid amount");
      return;
    }
    if (customAction.type === "debit") handleDebit(customAction.id, amt);
    else handleAddStock(customAction.id, amt);
    setCustomAction(null);
    setCustomAmount("1");
    setScreen("list");
  };

  const handleSaveEdit = () => {
    if (!editItem) return;
    const daily = parseSafeFloat(editDailyConsumption, editItem.dailyConsumption);
    const min = parseSafeFloat(editMinStock, editItem.minStock);
    if (!Number.isFinite(daily) || !Number.isFinite(min)) {
      toast.error(language === "pt-BR" ? "Valores inválidos" : "Invalid values");
      return;
    }
    updateConsumable(editItem.id, {
      name: editName || editItem.name,
      icon: editIcon || editItem.icon,
      dailyConsumption: daily,
      minStock: min,
      category: editCategory
    });
    setEditItem(null);
    setScreen("list");
    toast.success(l.save);
  };

  const openEdit = (item: ConsumableItem) => {
    setEditItem(item);
    setEditName(item.name);
    setEditIcon(item.icon);
    setEditDailyConsumption(String(item.dailyConsumption));
    setEditMinStock(String(item.minStock));
    setEditCategory(item.category);
    setScreen("edit");
  };

  const handleAddToShopping = (item: ConsumableItem) => {
    addToShoppingList({
      name: item.name,
      quantity: item.minStock * 2,
      unit: item.unit,
      category: item.category,
      store: item.category === "hygiene" ? "pharmacy" : "market"
    });
    toast.success(`${item.name} ${l.addedToList}`);
  };

  const handleAddNewItem = () => {
    const current = parseSafeFloat(newItem.currentStock, 10);
    const daily = parseSafeFloat(newItem.dailyConsumption, 1);
    const min = parseSafeFloat(newItem.minStock, 2);
    if (!newItem.name || !Number.isFinite(current) || !Number.isFinite(daily) || !Number.isFinite(min)) {
      toast.error(language === "pt-BR" ? "Preencha todos os valores corretamente" : "Please fill values correctly");
      return;
    }
    addConsumable({
      name: newItem.name,
      icon: newItem.icon,
      currentStock: current,
      unit: newItem.unit,
      dailyConsumption: daily,
      minStock: min,
      category: newItem.category
    });
    setNewItem({
      name: "",
      icon: "📦",
      dailyConsumption: "1",
      unit: "unidades",
      currentStock: "10",
      minStock: "2",
      category: "hygiene"
    });
    setScreen("list");
    toast.success(l.itemAdded);
  };

  const handleClose = () => {
    setScreen("list");
    onClose();
  };

  // --- Sub-screens rendered as full navigation views ---

  const renderAddScreen = () => (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setScreen("list")}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-muted transition-all active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">{l.newItem}</h2>
      </div>

      <div>
        <Label className="text-xs font-semibold text-gray-500">
          {l.chooseIcon}
        </Label>
        <div className="mt-2 grid grid-cols-8 gap-2">
          {ICON_OPTIONS.map((icon) => (
            <button
              key={icon}
              onClick={() => setNewItem((p) => ({ ...p, icon }))}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md text-xl transition-all active:scale-90",
                newItem.icon === icon
                  ? "bg-primary/20 ring-2 ring-primary shadow-sm"
                  : "bg-muted hover:bg-secondary"
              )}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold text-gray-500">
          {l.itemName}
        </Label>
        <Input
          placeholder="Ex: Amaciante"
          value={newItem.name}
          onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))}
          className="h-11 rounded-md mt-1.5"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-semibold text-gray-500">
            {l.currentStock}
          </Label>
          <Input
            type="number"
            value={newItem.currentStock}
            onChange={(e) =>
              setNewItem((p) => ({ ...p, currentStock: sanitizeFloatInput(e.target.value) }))
            }
            className="h-11 rounded-md mt-1.5"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold text-gray-500">
            {l.dailyUse}
          </Label>
          <Input
            type="number"
            step="0.1"
            value={newItem.dailyConsumption}
            onChange={(e) =>
              setNewItem((p) => ({ ...p, dailyConsumption: sanitizeFloatInput(e.target.value) }))
            }
            className="h-11 rounded-md mt-1.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-semibold text-gray-500">
            {l.minStock}
          </Label>
          <Input
            type="number"
            value={newItem.minStock}
            onChange={(e) =>
              setNewItem((p) => ({ ...p, minStock: sanitizeFloatInput(e.target.value) }))
            }
            className="h-11 rounded-md mt-1.5"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold text-gray-500">
            {l.unit}
          </Label>
          <Select
            value={newItem.unit}
            onValueChange={(v) => setNewItem((p) => ({ ...p, unit: v }))}
          >
            <SelectTrigger className="h-11 rounded-md mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unidades">
                {language === "en" ? "units" : "unidades"}
              </SelectItem>
              <SelectItem value="rolos">
                {language === "en" ? "rolls" : "rolos"}
              </SelectItem>
              <SelectItem value="ml">ml</SelectItem>
              <SelectItem value="L">L</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          className="flex-1 h-12 rounded-md"
          onClick={() => setScreen("list")}
        >
          {l.cancel}
        </Button>
        <Button
          className="flex-1 h-12 rounded-md"
          onClick={handleAddNewItem}
          disabled={!newItem.name}
        >
          {l.confirm}
        </Button>
      </div>
    </div>
  );

  const renderEditScreen = () => (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setScreen("list")}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-muted transition-all active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">
          {editItem?.name} - {l.editSettings}
        </h2>
      </div>

      <div>
        <Label className="text-xs font-semibold text-gray-500">
          {l.chooseIcon}
        </Label>
        <div className="mt-2 grid grid-cols-8 gap-2">
          {ICON_OPTIONS.map((icon) => (
            <button
              key={icon}
              onClick={() => setEditIcon(icon)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md text-xl transition-all active:scale-90",
                editIcon === icon
                  ? "bg-primary/20 ring-2 ring-primary shadow-sm"
                  : "bg-muted hover:bg-secondary"
              )}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold text-gray-500">
          {l.itemName}
        </Label>
        <Input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="h-11 rounded-md mt-1.5"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-semibold text-gray-500">
            {l.dailyUse}
          </Label>
          <Input
            type="number"
            step="0.1"
            value={editDailyConsumption}
            onChange={(e) => setEditDailyConsumption(sanitizeFloatInput(e.target.value))}
            className="h-11 rounded-md mt-1.5"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold text-gray-500">
            {l.minStock}
          </Label>
          <Input
            type="number"
            step="0.5"
            value={editMinStock}
            onChange={(e) => setEditMinStock(sanitizeFloatInput(e.target.value))}
            className="h-11 rounded-md mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold text-gray-500">
          {language === "pt-BR" ? "Categoria" : "Category"}
        </Label>
        <Select
          value={editCategory}
          onValueChange={(v) => setEditCategory(v as any)}
        >
          <SelectTrigger className="h-11 rounded-md mt-1.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hygiene">
              {language === "pt-BR" ? "Higiene" : "Hygiene"}
            </SelectItem>
            <SelectItem value="cleaning">
              {language === "pt-BR" ? "Limpeza" : "Cleaning"}
            </SelectItem>
            <SelectItem value="pantry">
              {language === "pt-BR" ? "Dispensa" : "Pantry"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full h-12 rounded-md" onClick={handleSaveEdit}>
        {l.save}
      </Button>
    </div>
  );

  const renderCustomScreen = () => (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setCustomAction(null);
            setScreen("list");
          }}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-muted transition-all active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">{l.customAmount}</h2>
      </div>

      <div className="flex flex-col items-center gap-4 py-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setCustomAmount(
                String(Math.max(0.5, parseSafeFloat(customAmount, 1) - 0.5))
              )
            }
            className="flex h-14 w-14 items-center justify-center rounded-md bg-muted text-foreground transition-all active:scale-90"
          >
            <Minus className="h-6 w-6" />
          </button>
          <Input
            type="number"
            step="0.5"
            min="0.1"
            value={customAmount}
            onChange={(e) => setCustomAmount(sanitizeFloatInput(e.target.value))}
            className="h-16 w-28 rounded-md text-center text-3xl font-bold border-2"
          />
          <button
            onClick={() =>
              setCustomAmount(String(parseSafeFloat(customAmount, 0) + 0.5))
            }
            className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary transition-all active:scale-90"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Button className="w-full h-12 rounded-md" onClick={handleCustomConfirm}>
        {l.confirm}
      </Button>
    </div>
  );

  const renderListScreen = () => (
    <div className="space-y-4">
      <div className="rounded-md bg-primary/10 p-3 border border-primary/20">
        <div className="flex items-start gap-3">
          <Bell className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground">
              {l.howItWorks}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              {l.howItWorksDesc}
            </p>
          </div>
        </div>
      </div>

      {consumables.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-xl bg-muted p-5">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-sm font-bold text-foreground mb-1">{l.configFromZero}</p>
          <p className="text-xs text-muted-foreground mb-4">{l.presetsDesc}</p>
          <Button onClick={() => setScreen("presets")} className="h-11 rounded-md gap-2">
            📦 {l.presets}
          </Button>
        </div>
      ) : (
      <div className="space-y-2.5">
        {consumables.map((item) => {
          const daysLeft = calculateDaysUntilEmpty(item);
          const alertLevel = getAlertLevel(daysLeft);

          return (
            <div
              key={item.id}
              className={cn(
                "rounded-md border p-3 transition-all",
                alertLevel === "danger" &&
                  "bg-destructive/5 border-destructive/30",
                alertLevel === "warning" && "bg-warning/5 border-warning/30",
                alertLevel === "ok" && "bg-card border-border"
              )}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <button
                  onClick={() => openEdit(item)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-xl transition-all active:scale-90 hover:ring-2 hover:ring-primary/30"
                >
                  {item.icon}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {item.currentStock.toFixed(1)} {item.unit} •{" "}
                    {item.dailyConsumption}
                    {l.perDay}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold shrink-0",
                    alertLevel === "danger" &&
                      "bg-destructive/20 text-destructive",
                    alertLevel === "warning" && "bg-warning/20 text-warning",
                    alertLevel === "ok" && "bg-fresh/20 text-fresh"
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {daysLeft === Infinity ? "∞" : `${daysLeft}${l.daysLeft}`}
                </div>
              </div>

              <div className="mb-2.5">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      alertLevel === "danger" && "bg-destructive",
                      alertLevel === "warning" && "bg-warning",
                      alertLevel === "ok" && "bg-fresh"
                    )}
                    style={{
                      width: `${Math.min(
                        100,
                        (item.currentStock / (item.minStock * 3)) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 rounded-md gap-1 text-xs"
                  onClick={() => handleDebit(item.id)}
                >
                  <Minus className="h-3 w-3" />
                  {l.debit}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-md p-0"
                  onClick={() => {
                    setCustomAction({ id: item.id, type: "debit" });
                    setCustomAmount("1");
                    setScreen("custom");
                  }}
                >
                  <Settings2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 rounded-md gap-1 text-xs"
                  onClick={() => handleAddStock(item.id, 1)}
                >
                  <Plus className="h-3 w-3" />
                  {l.restock}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-md p-0"
                  onClick={() => {
                    setCustomAction({ id: item.id, type: "restock" });
                    setCustomAmount("1");
                    setScreen("custom");
                  }}
                >
                  <Settings2 className="h-3 w-3" />
                </Button>
                {alertLevel !== "ok" && (
                  <Button
                    size="sm"
                    className="h-8 w-8 rounded-md p-0"
                    onClick={() => handleAddToShopping(item)}
                  >
                    <ShoppingCart className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      )}

      <Button
        variant="outline"
        className="w-full h-11 rounded-md gap-2"
        onClick={() => setScreen("add")}
      >
        <Package className="h-4 w-4" />
        {l.addItem}
      </Button>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 h-11 rounded-md gap-2"
          onClick={() => setScreen("presets")}
        >
          📦 {l.presets}
        </Button>
        {consumables.length > 0 && (
          <Button
            variant="outline"
            className="h-11 rounded-md gap-2 text-destructive hover:text-destructive"
            onClick={() => {
              if (confirm(l.clearConfirm)) {
                clearConsumables();
                toast.success(l.cleared);
              }
            }}
          >
            {l.clearAll}
          </Button>
        )}
      </div>
    </div>
  );

  const presets: Record<string, { label: string; items: Omit<ConsumableItem, 'id'>[] }> = {
    bathroom: {
      label: l.bathroom,
      items: [
        { name: "Papel Higiênico", icon: "🧻", currentStock: 12, unit: "rolos", dailyConsumption: 0.5, minStock: 4 },
        { name: "Sabonete", icon: "🧼", currentStock: 3, unit: "unidades", dailyConsumption: 0.15, minStock: 1 },
        { name: "Pasta de Dente", icon: "🪥", currentStock: 2, unit: "tubos", dailyConsumption: 0.05, minStock: 1 },
        { name: "Shampoo", icon: "🧴", currentStock: 1, unit: "unidades", dailyConsumption: 0.03, minStock: 1 },
      ],
    },
    kitchen: {
      label: l.kitchen,
      items: [
        { name: "Papel Toalha", icon: "🧺", currentStock: 4, unit: "rolos", dailyConsumption: 0.5, minStock: 2 },
        { name: "Detergente", icon: "🧴", currentStock: 2, unit: "unidades", dailyConsumption: 0.1, minStock: 1 },
        { name: "Esponja", icon: "🧽", currentStock: 3, unit: "unidades", dailyConsumption: 0.07, minStock: 1 },
        { name: "Saco de Lixo", icon: "🗑️", currentStock: 30, unit: "unidades", dailyConsumption: 1, minStock: 5 },
      ],
    },
    cleaning: {
      label: l.cleaning,
      items: [
        { name: "Desinfetante", icon: "🫧", currentStock: 2, unit: "L", dailyConsumption: 0.05, minStock: 1 },
        { name: "Água Sanitária", icon: "🧪", currentStock: 2, unit: "L", dailyConsumption: 0.03, minStock: 1 },
        { name: "Limpador Multiuso", icon: "🧹", currentStock: 1, unit: "unidades", dailyConsumption: 0.03, minStock: 1 },
        { name: "Amaciante", icon: "🧺", currentStock: 2, unit: "L", dailyConsumption: 0.05, minStock: 1 },
      ],
    },
    personal: {
      label: l.personal,
      items: [
        { name: "Desodorante", icon: "🧴", currentStock: 1, unit: "unidades", dailyConsumption: 0.03, minStock: 1 },
        { name: "Protetor Solar", icon: "☀️", currentStock: 1, unit: "tubos", dailyConsumption: 0.02, minStock: 1 },
        { name: "Fio Dental", icon: "🪥", currentStock: 2, unit: "unidades", dailyConsumption: 0.02, minStock: 1 },
        { name: "Lâmina de Barbear", icon: "🪒", currentStock: 4, unit: "unidades", dailyConsumption: 0.14, minStock: 2 },
      ],
    },
    complete: {
      label: l.complete,
      items: [
        { name: "Papel Higiênico", icon: "🧻", currentStock: 12, unit: "rolos", dailyConsumption: 0.5, minStock: 4 },
        { name: "Papel Toalha", icon: "🧺", currentStock: 4, unit: "rolos", dailyConsumption: 0.5, minStock: 2 },
        { name: "Detergente", icon: "🧴", currentStock: 2, unit: "unidades", dailyConsumption: 0.1, minStock: 1 },
        { name: "Sabonete", icon: "🧼", currentStock: 3, unit: "unidades", dailyConsumption: 0.15, minStock: 1 },
        { name: "Pasta de Dente", icon: "🪥", currentStock: 2, unit: "tubos", dailyConsumption: 0.05, minStock: 1 },
        { name: "Esponja", icon: "🧽", currentStock: 3, unit: "unidades", dailyConsumption: 0.07, minStock: 1 },
        { name: "Saco de Lixo", icon: "🗑️", currentStock: 30, unit: "unidades", dailyConsumption: 1, minStock: 5 },
        { name: "Desinfetante", icon: "🫧", currentStock: 2, unit: "L", dailyConsumption: 0.05, minStock: 1 },
      ],
    },
  };

  const handleLoadPreset = (presetKey: string) => {
    const preset = presets[presetKey];
    if (!preset) return;
    const existingNames = consumables.map(c => c.name.toLowerCase());
    const newItems = preset.items.filter(item => !existingNames.includes(item.name.toLowerCase()));
    if (newItems.length > 0) {
      setConsumablesBulk(newItems);
    }
    toast.success(l.loaded);
    setScreen("list");
  };

  const renderPresetsScreen = () => (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setScreen("list")}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-muted transition-all active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-foreground">{l.presets}</h2>
          <p className="text-xs text-gray-500">{l.presetsDesc}</p>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(presets).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => handleLoadPreset(key)}
            className="w-full rounded-xl border border-border bg-card p-4 text-left transition-all active:scale-[0.98] hover:border-primary/30"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-foreground">{preset.label}</h3>
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {preset.items.length} itens
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {preset.items.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {item.icon} {item.name}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <TrendingDown className="h-5 w-5 text-primary" />
            {l.title}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)]">
          <div className="px-5 py-4 pb-10">
            {screen === "list" && renderListScreen()}
            {screen === "add" && renderAddScreen()}
            {screen === "edit" && renderEditScreen()}
            {screen === "custom" && renderCustomScreen()}
            {screen === "presets" && renderPresetsScreen()}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
