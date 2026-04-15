import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
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
import { Plus, Sparkles, Mic, MicOff } from "lucide-react";
import { useFriggo } from "@/contexts/FriggoContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ItemCategory, ItemLocation, MaturationLevel } from "@/types/friggo";
import { toast } from "sonner";
import {
  getSmartExpiration,
  dailyConsumptionDefaults,
  getFoodMetadata
} from "@/data/brazilianRecipes";

export function AddItemSheet() {
  const { addItem, onboardingData } = useFriggo();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [category, setCategory] = useState<ItemCategory>("fruit");
  const [location, setLocation] = useState<ItemLocation>("fridge");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("unidades");
  const [expirationDays, setExpirationDays] = useState("7");
  const [maturation, setMaturation] = useState<MaturationLevel | "">("");
  const [minStock, setMinStock] = useState("");
  const [dailyConsumption, setDailyConsumption] = useState("");
  const [isCooked, setIsCooked] = useState(false);

  const startVoice = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast.error(
        language === "pt-BR"
          ? "Microfone não suportado no seu navegador"
          : "Microphone not supported in your browser"
      );
      return;
    }
    const recognition = new SR();
    recognition.lang =
      language === "en" ? "en-US" : language === "es" ? "es-ES" : "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;
    setIsListening(true);
    recognition.onresult = (e: any) => {
      const transcript: string = e.results[0][0].transcript;
      setName(transcript.trim());
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error(
        language === "pt-BR" ? "Erro ao capturar voz" : "Voice capture error"
      );
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const labels = {
    "pt-BR": {
      addItem: "Adicionar Item",
      name: "Nome",
      placeholder: "Ex: Maçã, Leite, Arroz...",
      category: "Categoria",
      location: "Local",
      quantity: "Quantidade",
      unit: "Unidade",
      expiresIn: "Vence em (dias)",
      aiCalc: "Calculado automaticamente pela IA",
      minStock: "Estoque Mínimo",
      dailyUse: "Uso/dia",
      maturation: "Maturação",
      selectMat: "Selecione...",
      green: "Verde",
      ripe: "Maduro",
      veryRipe: "Muito Maduro",
      overripe: "Passado",
      add: "Adicionar Item",
      added: "adicionado!",
      enterName: "Digite o nome do item",
      units: "Unidades",
      kg: "Kg",
      grams: "Gramas",
      liters: "Litros",
      ml: "mL",
      portions: "Porções",
      fruit: "Fruta",
      vegetable: "Legume/Verdura",
      meat: "Carne",
      dairy: "Laticínio",
      cooked: "Comida Pronta",
      frozen: "Congelado",
      beverage: "Bebida",
      pantry: "Dispensa",
      cleaning: "Limpeza",
      hygiene: "Higiene",
      fridge: "Geladeira",
      freezer: "Freezer",
      pantryLoc: "Dispensa",
      cleaningArea: "Área de Limpeza"
    },
    en: {
      addItem: "Add Item",
      name: "Name",
      placeholder: "Ex: Apple, Milk, Rice...",
      category: "Category",
      location: "Location",
      quantity: "Quantity",
      unit: "Unit",
      expiresIn: "Expires in (days)",
      aiCalc: "Automatically calculated by AI",
      minStock: "Min Stock",
      dailyUse: "Daily use",
      maturation: "Maturation",
      selectMat: "Select...",
      green: "Green",
      ripe: "Ripe",
      veryRipe: "Very Ripe",
      overripe: "Overripe",
      add: "Add Item",
      added: "added!",
      enterName: "Enter the item name",
      units: "Units",
      kg: "Kg",
      grams: "Grams",
      liters: "Liters",
      ml: "mL",
      portions: "Portions",
      fruit: "Fruit",
      vegetable: "Vegetable",
      meat: "Meat",
      dairy: "Dairy",
      cooked: "Prepared Food",
      frozen: "Frozen",
      beverage: "Beverage",
      pantry: "Pantry",
      cleaning: "Cleaning",
      hygiene: "Hygiene",
      fridge: "Fridge",
      freezer: "Freezer",
      pantryLoc: "Pantry",
      cleaningArea: "Cleaning Area"
    },
    es: {
      addItem: "Agregar Artículo",
      name: "Nombre",
      placeholder: "Ej: Manzana, Leche, Arroz...",
      category: "Categoría",
      location: "Ubicación",
      quantity: "Cantidad",
      unit: "Unidad",
      expiresIn: "Vence en (días)",
      aiCalc: "Calculado automáticamente por IA",
      minStock: "Stock Mínimo",
      dailyUse: "Uso/día",
      maturation: "Maduración",
      selectMat: "Seleccionar...",
      green: "Verde",
      ripe: "Maduro",
      veryRipe: "Muy Maduro",
      overripe: "Pasado",
      add: "Agregar Artículo",
      added: "¡agregado!",
      enterName: "Ingresa el nombre del artículo",
      units: "Unidades",
      kg: "Kg",
      grams: "Gramos",
      liters: "Litros",
      ml: "mL",
      portions: "Porciones",
      fruit: "Fruta",
      vegetable: "Verdura",
      meat: "Carne",
      dairy: "Lácteo",
      cooked: "Comida Preparada",
      frozen: "Congelado",
      beverage: "Bebida",
      pantry: "Despensa",
      cleaning: "Limpieza",
      hygiene: "Higiene",
      fridge: "Nevera",
      freezer: "Congelador",
      pantryLoc: "Despensa",
      cleaningArea: "Área de Limpieza"
    }
  };

  const l = labels[language];

  const categories: { value: ItemCategory; label: string }[] = [
    { value: "fruit", label: l.fruit },
    { value: "vegetable", label: l.vegetable },
    { value: "meat", label: l.meat },
    { value: "dairy", label: l.dairy },
    { value: "cooked", label: l.cooked },
    { value: "frozen", label: l.frozen },
    { value: "beverage", label: l.beverage },
    { value: "pantry", label: l.pantry },
    { value: "cleaning", label: l.cleaning },
    { value: "hygiene", label: l.hygiene }
  ];

  const locations: { value: ItemLocation; label: string }[] = [
    { value: "fridge", label: l.fridge },
    { value: "freezer", label: l.freezer },
    { value: "pantry", label: l.pantryLoc },
    { value: "cleaning", label: l.cleaningArea }
  ];

  useEffect(() => {
    if (name.trim().length > 2) {
      const metadata = getFoodMetadata(name);
      const smartDays = getSmartExpiration(
        name,
        location,
        category === "cooked"
      );

      setExpirationDays(smartDays.toString());
      setIsCooked(category === "cooked");

      if (metadata.category && category === "fruit") {
        // Only auto-change category if it's still default
        setCategory(metadata.category as ItemCategory);
      }

      if (metadata.unit) {
        setUnit(metadata.unit === "un" ? "unidades" : metadata.unit);
      }

      if (metadata.dailyConsumption) {
        const residents = onboardingData?.residents || 2;
        setDailyConsumption((metadata.dailyConsumption * residents).toFixed(1));
      }
    }
  }, [name, location, onboardingData]);

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error(l.enterName);
      return;
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + parseInt(expirationDays));
    addItem({
      name: name.trim(),
      category,
      location,
      quantity: parseFloat(quantity) || 1,
      unit,
      addedDate: new Date(),
      expirationDate: parseInt(expirationDays) > 0 ? expirationDate : undefined,
      maturation: maturation || undefined,
      minStock: minStock ? parseFloat(minStock) : undefined,
      dailyConsumption: dailyConsumption
        ? parseFloat(dailyConsumption)
        : undefined,
      isCooked
    });
    toast.success(`${name} ${l.added}`);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setCategory("fruit");
    setLocation("fridge");
    setQuantity("1");
    setUnit("unidades");
    setExpirationDays("7");
    setMaturation("");
    setMinStock("");
    setDailyConsumption("");
    setIsCooked(false);
  };

  const showMaturation = category === "fruit" || category === "vegetable";
  const showConsumption =
    category === "hygiene" || category === "cleaning" || category === "pantry";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 sm:bottom-24 sm:h-16 sm:w-16"
        >
          <Plus className="h-6 w-6 sm:h-7 sm:w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <Plus className="h-5 w-5 text-primary" />
            {l.addItem}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-2 space-y-4 overflow-auto px-6 pb-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              {l.name}
            </Label>
            <div className="flex gap-2">
              <Input
                id="name"
                placeholder={l.placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 flex-1 rounded-md border-border bg-card text-base"
              />
              <button
                type="button"
                onClick={startVoice}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  isListening
                    ? "border-red-400 bg-red-50 text-red-500 dark:bg-red-950/30 animate-pulse"
                    : "border-border bg-card text-muted-foreground hover:text-primary hover:border-primary"
                }`}
                aria-label="Usar microfone"
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{l.category}</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as ItemCategory)}
              >
                <SelectTrigger className="h-12 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{l.location}</Label>
              <Select
                value={location}
                onValueChange={(v) => setLocation(v as ItemLocation)}
              >
                <SelectTrigger className="h-12 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-semibold">
                {l.quantity}
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-12 rounded-md border-border bg-card text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit" className="text-sm font-semibold">
                {l.unit}
              </Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="h-12 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidades">{l.units}</SelectItem>
                  <SelectItem value="kg">{l.kg}</SelectItem>
                  <SelectItem value="g">{l.grams}</SelectItem>
                  <SelectItem value="litros">{l.liters}</SelectItem>
                  <SelectItem value="ml">{l.ml}</SelectItem>
                  <SelectItem value="porções">{l.portions}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 relative">
            <Label
              htmlFor="expiration"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              {l.expiresIn}
              <div className="flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary uppercase">
                <Sparkles className="h-2.5 w-2.5" />
                IA FRIGGO
              </div>
            </Label>
            <Input
              id="expiration"
              type="number"
              min="0"
              value={expirationDays}
              onChange={(e) => setExpirationDays(e.target.value)}
              className="h-12 rounded-md border-primary/30 bg-primary/5 text-base font-bold text-primary focus:border-primary"
            />
            <p className="text-[10px] text-primary/70 font-medium italic">
              Sugerido com base em médias de mercado para{" "}
              {location === "freezer" ? "congelados" : "refrigerados"}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="minStock" className="text-sm font-semibold">
                {l.minStock}
              </Label>
              <Input
                id="minStock"
                type="number"
                min="0"
                step="0.5"
                placeholder="Ex: 2"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                className="h-12 rounded-md border-border bg-card text-base"
              />
            </div>
            {showConsumption && (
              <div className="space-y-2">
                <Label
                  htmlFor="dailyConsumption"
                  className="text-sm font-semibold"
                >
                  {l.dailyUse}
                </Label>
                <Input
                  id="dailyConsumption"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Ex: 0.5"
                  value={dailyConsumption}
                  onChange={(e) => setDailyConsumption(e.target.value)}
                  className="h-12 rounded-md border-border bg-card text-base"
                />
              </div>
            )}
          </div>

          {showMaturation && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{l.maturation}</Label>
              <Select
                value={maturation}
                onValueChange={(v) => setMaturation(v as MaturationLevel)}
              >
                <SelectTrigger className="h-12 rounded-md">
                  <SelectValue placeholder={l.selectMat} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">{l.green}</SelectItem>
                  <SelectItem value="ripe">{l.ripe}</SelectItem>
                  <SelectItem value="very-ripe">{l.veryRipe}</SelectItem>
                  <SelectItem value="overripe">{l.overripe}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="mt-2 w-full rounded-md py-6 text-base font-bold transition-all active:scale-[0.98]"
            size="lg"
          >
            {l.add}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
