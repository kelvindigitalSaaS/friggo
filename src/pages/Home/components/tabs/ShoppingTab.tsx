/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useKaza } from "@/contexts/KazaContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  ShoppingCart,
  Plus,
  Check,
  Trash2,
  Store,
  Flower,
  Pill,
  Loader2,
  Sparkles,
  Minus,
  ChevronDown,
  ChevronUp,
  LayoutList,
  LayoutGrid,
  CheckCircle2,
  CheckSquare,
  AlertTriangle,
  Share2,
  Save,
  Pencil,
  X,
  SlidersHorizontal,
  Bell,
  Calendar,
  Utensils,
  Zap,
  AlignJustify,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { searchProducts, ProductSuggestion } from "@/data/productDatabase";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rateLimit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { notifyHomeMembers } from "@/lib/pushNotifications";
import { allRecipes } from "@/data/recipeDatabase";
import { useAchievements } from "@/contexts/AchievementsContext";

export function ShoppingTab() {
  const {
    items,
    shoppingList,
    consumables,
    addToShoppingList,
    addItem,
    toggleShoppingItem,
    removeFromShoppingList,
    updateShoppingItemQuantity,
    onboardingData,
    markAllShoppingComplete,
    clearAllShoppingList,
    homeId,
    isSubAccount,
    mealPlan,
    favoriteRecipes,
  } = useKaza();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { recordShoppingCompletion, recordShare } = useAchievements();
  const [activeFilter, setActiveFilter] = useState("all");
  const [newItem, setNewItem] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSavedLists, setShowSavedLists] = useState(false);
  const [savedLists, setSavedLists] = useState<Array<{ id: string; date: string; name?: string; items: Array<{ name: string; quantity?: number; unit?: string; store?: string }> }>>([]);
  const [newItemUnit, setNewItemUnit] = useState("un");
  const [newItemQty, setNewItemQty] = useState("1");
  const [newItemStore, setNewItemStore] = useState<"market" | "fair" | "pharmacy" | "other">("market");
  const [newItemCategory, setNewItemCategory] = useState<string>("pantry");
  const [showFilters, setShowFilters] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isNotifying, setIsNotifying] = useState(false);
  const [daysHorizon, setDaysHorizon] = useState<3 | 7 | 15>(7);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showBatchAdd, setShowBatchAdd] = useState(false);
  const [batchText, setBatchText] = useState("");
  const [recentBatches, setRecentBatches] = useState<Array<{ id: string; name?: string; date: string; items: any[] }>>([]);

  type BatchRow = { name: string; qty: string; unit: string };
  const BATCH_CATEGORIES = [
    { key: "pantry",    emoji: "🥫", label: language === "pt-BR" ? "Mercearia"       : "Pantry",     store: "market"   as const },
    { key: "fruit",     emoji: "🍎", label: language === "pt-BR" ? "Frutas"          : "Fruit",      store: "fair"     as const },
    { key: "vegetable", emoji: "🥦", label: language === "pt-BR" ? "Verduras/Legumes": "Vegetables",  store: "fair"     as const },
    { key: "meat",      emoji: "🥩", label: language === "pt-BR" ? "Carnes"          : "Meat",       store: "market"   as const },
    { key: "dairy",     emoji: "🧀", label: language === "pt-BR" ? "Laticínios"      : "Dairy",      store: "market"   as const },
    { key: "beverage",  emoji: "🧃", label: language === "pt-BR" ? "Bebidas"         : "Beverages",  store: "market"   as const },
    { key: "frozen",    emoji: "🧊", label: language === "pt-BR" ? "Congelados"      : "Frozen",     store: "market"   as const },
    { key: "hygiene",   emoji: "🧴", label: language === "pt-BR" ? "Higiene"         : "Hygiene",    store: "pharmacy" as const },
    { key: "cleaning",  emoji: "🧹", label: language === "pt-BR" ? "Limpeza"         : "Cleaning",   store: "market"   as const },
  ] as const;
  const emptyRow = (): BatchRow => ({ name: "", qty: "1", unit: "un" });
  const [batchRows, setBatchRows] = useState<Record<string, BatchRow[]>>(
    () => Object.fromEntries(BATCH_CATEGORIES.map(c => [c.key, [emptyRow()]]))
  );
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showCreateBatchDialog, setShowCreateBatchDialog] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [showAddToStockDialog, setShowAddToStockDialog] = useState(false);
  const [stockCandidates, setStockCandidates] = useState<Array<{ id: string; name: string; quantity: number; unit: string; store: string; category: string }>>([]);
  const [selectedForStock, setSelectedForStock] = useState<Set<string>>(new Set());
  const [pendingDeletes, setPendingDeletes] = useState<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const itemCategories = [
    { label: "🍎 Frutas", value: "fruit", store: "fair" as const },
    { label: "🥬 Verduras/Legumes", value: "vegetable", store: "fair" as const },
    { label: "🥩 Carnes", value: "meat", store: "market" as const },
    { label: "🧀 Latícinios", value: "dairy", store: "market" as const },
    { label: "🧃 Bebidas", value: "beverage", store: "market" as const },
    { label: "🧊 Congelados", value: "frozen", store: "market" as const },
    { label: "💊 Remédios", value: "medicine", store: "pharmacy" as const },
    { label: "🧴 Higiene", value: "hygiene", store: "pharmacy" as const },
    { label: "💪 Suplementos", value: "supplement", store: "pharmacy" as const },
    { label: "🧹 Limpeza", value: "cleaning", store: "market" as const },
    { label: "📦 Outros", value: "other", store: "other" as const },
  ];

  const handleUpdateItemCategory = async (itemId: string, categoryValue: string, storeValue: string) => {
    const { error } = await supabase
      .from("shopping_list")
      .update({
        category: categoryValue,
        store: storeValue
      })
      .eq("id", itemId);

    if (error) {
      toast.error("Erro ao atualizar categoria");
    } else {
      toast.success("Categoria atualizada!");
      setEditingItemId(null);
      setShowCategoryDialog(false);
    }
  };

  const labels = {
    "pt-BR": {
      title: "Lista de Compras",
      pending: "pendentes",
      bought: "comprados",
      generateAI: "Gerar sugestões para hoje",
      generating: "Analisando estoque...",
      lowStockCount: "itens em estoque baixo",
      analyzeStock: "Sugere itens com base no que está acabando",
      addPlaceholder: "Adicionar item...",
      emptyList: "Lista vazia",
      emptyDesc: "Adicione itens ou peça sugestões",
      itemAdded: "Item adicionado à lista",
      tooManyReq: "Muitas requisições. Tente novamente em alguns segundos.",
      aiSuggested: "itens sugeridos com base no estoque!",
      listUpdated: "Lista atualizada com itens em falta",
      all: "Todos",
      market: "Mercado",
      fair: "Feira",
      pharmacy: "Farmácia",
      marketEmoji: "🛒 Mercado",
      fairEmoji: "🌿 Feira",
      pharmacyEmoji: "💊 Farmácia",
      groupBy: "Agrupar",
      flat: "Lista",
      selectAll: "Selecionar todos",
      payList: "Guardar lista",
      allBought: "Lista salva!",
      deleteAll: "Apagar tudo",
      confirmDeleteAll: "Tem certeza? Todos os itens serão removidos.",
      allDeleted: "Todos os itens foram removidos!",
      shareWhatsApp: "Compartilhar no WhatsApp",
      filters: "Filtros",
      concluir: "Concluir",
      listasSalvas: "Listas Salvas",
      nenhumaLista: "Nenhuma lista salva ainda.",
      carregar: "Carregar",
      listaCarregada: "Lista carregada!",
      listaDeCompras: "Lista de compras",
      notificarCasa: "Notificar Casa",
      casaNotificada: "Casa notificada! 🔔",
      erroNotificar: "Erro ao notificar grupo",
      alguem: "Alguém",
      estamosComSede: "atualizou a lista. Alguém pode passar no mercado?"
    },
    en: {
      title: "Shopping List",
      pending: "pending",
      bought: "bought",
      generateAI: "Get shopping suggestions",
      generating: "Analyzing stock...",
      lowStockCount: "low stock items",
      analyzeStock: "Suggests items based on what's running low",
      addPlaceholder: "Add item...",
      emptyList: "Empty list",
      emptyDesc: "Add items or get suggestions",
      itemAdded: "Item added to list",
      tooManyReq: "Too many requests. Try again in a few seconds.",
      aiSuggested: "items suggested based on stock!",
      listUpdated: "List updated with missing items",
      all: "All",
      market: "Market",
      fair: "Fair",
      pharmacy: "Pharmacy",
      marketEmoji: "🛒 Market",
      fairEmoji: "🌿 Fair",
      pharmacyEmoji: "💊 Pharmacy",
      groupBy: "Group",
      flat: "List",
      selectAll: "Select all",
      payList: "Save list",
      allBought: "List saved!",
      deleteAll: "Delete all",
      confirmDeleteAll: "Are you sure? All items will be removed.",
      allDeleted: "All items removed!",
      shareWhatsApp: "Share on WhatsApp",
      filters: "Filters",
      concluir: "Done",
      listasSalvas: "Saved Lists",
      nenhumaLista: "No saved lists yet.",
      carregar: "Load",
      listaCarregada: "List loaded!",
      listaDeCompras: "Shopping list",
      notificarCasa: "Notify Home",
      casaNotificada: "Home notified! 🔔",
      erroNotificar: "Error notifying home",
      alguem: "Someone",
      estamosComSede: "updated the list. Can someone stop by the market?"
    },
    es: {
      title: "Lista de Compras",
      pending: "pendientes",
      bought: "comprados",
      generateAI: "Generar lista con IA",
      generating: "Generando lista...",
      lowStockCount: "artículos con stock bajo",
      analyzeStock: "Analiza tu stock y sugiere compras",
      addPlaceholder: "Agregar artículo...",
      emptyList: "Lista vacía",
      emptyDesc: "Agrega artículos o genera con IA",
      itemAdded: "Artículo agregado a la lista",
      tooManyReq: "Demasiadas solicitudes. Intenta de nuevo en unos segundos.",
      aiSuggested: "artículos sugeridos por IA!",
      listUpdated: "Lista actualizada con artículos faltantes",
      all: "Todos",
      market: "Mercado",
      fair: "Feria",
      pharmacy: "Farmacia",
      marketEmoji: "🛒 Mercado",
      fairEmoji: "🌿 Feria",
      pharmacyEmoji: "💊 Farmacia",
      groupBy: "Agrupar",
      flat: "Lista",
      selectAll: "Seleccionar todos",
      payList: "Guardar lista",
      allBought: "¡Lista guardada!",
      deleteAll: "Eliminar todo",
      confirmDeleteAll: "¿Estás seguro? Todos los artículos serán eliminados.",
      allDeleted: "¡Todos los artículos eliminados!",
      shareWhatsApp: "Compartir en WhatsApp",
      filters: "Filtros",
      concluir: "Finalizar",
      listasSalvas: "Listas Guardadas",
      nenhumaLista: "Ninguna lista guardada aún.",
      carregar: "Cargar",
      listaCarregada: "¡Lista cargada!",
      listaDeCompras: "Lista de compras",
      notificarCasa: "Notificar Hogar",
      casaNotificada: "¡Hogar notificado! 🔔",
      erroNotificar: "Error al notificar al grupo",
      alguem: "Alguien",
      estamosComSede: "actualizó la lista. ¿Alguien puede pasar por el mercado?"
    }
  };

  const l = labels[language] || labels["pt-BR"];

  const storeCategoryLabels: Record<string, string> = {
    market: l.marketEmoji,
    fair: l.fairEmoji,
    pharmacy: l.pharmacyEmoji,
    other: language === 'pt-BR' ? "📦 Outros" : language === 'es' ? "📦 Otros" : "📦 Other"
  };

  useEffect(() => {
    const results = searchProducts(newItem);
    setSuggestions(results);
    setShowSuggestions(results.length > 0 && newItem.length > 0);
  }, [newItem]);

  const lowStockItems = items.filter(
    (item) => item.minStock && item.quantity <= item.minStock
  );

  // Itens críticos: vencendo hoje/amanhã e não estão na lista de compras
  const criticalItems = items.filter((item) => {
    if (!item.expirationDate) return false;
    const days = Math.ceil(
      (new Date(item.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (days > 1 || days < 0) return false;
    return !shoppingList.some(
      (s) => s.name.toLowerCase() === item.name.toLowerCase() && !s.isCompleted
    );
  });

  const filteredList = shoppingList.filter(
    (item) => (activeFilter === "all" || item.store === activeFilter) && !pendingDeletes.has(item.id)
  );
  const pendingCount = shoppingList.filter((i) => !i.isCompleted).length;

  // Group items by store category
  const groupedList = filteredList.reduce((acc, item) => {
    const key = item.store || "other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof filteredList>);

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const loadRecentBatches = async () => {
    if (!user || !homeId) return;
    const { data } = await supabase
      .from("saved_shopping_lists")
      .select("id, name, items, created_at")
      .eq("home_id", homeId)
      .order("created_at", { ascending: false })
      .limit(5);
    setRecentBatches((data || []).map((r: any) => ({ id: r.id, name: r.name, date: r.created_at, items: Array.isArray(r.items) ? r.items : [] })));
  };

  useEffect(() => { loadRecentBatches(); }, [homeId, user?.id]);

  const loadSavedLists = async () => {
    if (!user || !homeId) { setSavedLists([]); return; }
    const { data } = await supabase
      .from("saved_shopping_lists")
      .select("id, name, items, created_at")
      .eq("home_id", homeId)
      .order("created_at", { ascending: false })
      .limit(20);
    setSavedLists(
      (data || []).map((row: any) => ({
        id: row.id,
        date: row.created_at,
        name: row.name,
        items: Array.isArray(row.items) ? row.items : [],
      }))
    );
  };

  const handleSaveList = async () => {
    if (!user || !homeId) {
      toast.error(language === "pt-BR" ? "Faça login para salvar listas" : "Login to save lists");
      return;
    }
    const buyerName = onboardingData?.name || user.email?.split("@")[0] || (language === "pt-BR" ? "Alguém" : "Someone");
    const dateStr = new Date().toLocaleDateString(language === "pt-BR" ? "pt-BR" : language === "es" ? "es-ES" : "en-US");
    const itemsToSave = shoppingList.map(i => ({ name: i.name, quantity: i.quantity, unit: i.unit, store: i.store }));
    const { error } = await supabase.from("saved_shopping_lists").insert({
      home_id: homeId,
      user_id: user.id,
      name: `${buyerName} — ${dateStr}`,
      items: itemsToSave,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    const candidates = shoppingList.map(i => ({ id: i.id, name: i.name, quantity: i.quantity || 1, unit: i.unit || "un", store: i.store || "market", category: i.category || "pantry" }));
    await clearAllShoppingList();
    recordShoppingCompletion();
    toast.success(l.allBought);
    loadRecentBatches();
    setStockCandidates(candidates);
    setSelectedForStock(new Set(candidates.map(c => c.id)));
    setShowAddToStockDialog(true);
  };

  const handleLoadSavedList = (list: any) => {
    list.items.forEach((item: any) => {
      const store = (item.store as any) || "market";
      addToShoppingList({
        name: item.name,
        quantity: item.quantity || 1,
        unit: item.unit || "un",
        category: store === "pharmacy" ? "hygiene" : store === "fair" ? "vegetable" : "pantry",
        store,
      });
    });
    setShowSavedLists(false);
    toast.success(l.listaCarregada);
  };

  const handleDeleteSavedList = async (id: string) => {
    if (!homeId) return;
    await supabase.from("saved_shopping_lists").delete().eq("id", id).eq("home_id", homeId);
    setSavedLists(prev => prev.filter(l => l.id !== id));
  };

  const handleShareWhatsApp = () => {
    const pending = shoppingList.filter(i => !i.isCompleted);
    if (pending.length === 0) { toast.info(l.emptyList); return; }
    recordShare();
    const text = pending.map(i => `• ${i.name}${i.quantity ? ` (${i.quantity} ${i.unit || ''})` : ''}`).join('\n');
    const msg = encodeURIComponent(`🛒 *${l.title}*\n\n${text}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const handleNotifyGroup = async () => {
    if (!homeId || !user) return;
    
    setIsNotifying(true);
    const profile = await supabase.from("profiles").select("name").eq("user_id", user.id).single();
    const userName = profile.data?.name || l.alguem;
    
    const result = await notifyHomeMembers({
      home_id: homeId,
      title: l.title + "!",
      body: `${userName} ${l.estamosComSede}`,
      exclude_user_id: user.id
    });

    if (result.success) {
      toast.success(l.casaNotificada);
    } else {
      const msg = result.error || l.erroNotificar;
      if (result.error?.includes("membros")) {
        toast(msg);
      } else {
        toast.error(msg);
      }
    }
    setIsNotifying(false);
  };

  const handleAddItem = (product?: ProductSuggestion) => {
    const itemName = product?.name || newItem.trim();
    if (!itemName) return;

    const chosenStore = product?.category || newItemStore;
    const parsedQty = parseFloat(newItemQty.replace(',', '.'));
    
    addToShoppingList({
      name: itemName,
      category: (product
        ? (chosenStore === "pharmacy" ? "hygiene" : chosenStore === "fair" ? "vegetable" : "pantry")
        : newItemCategory) as any,
      quantity: product?.defaultQuantity || (Number.isFinite(parsedQty) ? parsedQty : 1),
      unit: product?.unit || newItemUnit,
      store: chosenStore as any
    });
    
    setNewItem("");
    setNewItemQty("1");
    setNewItemCategory("pantry");
    setShowSuggestions(false);
    toast.success(l.itemAdded);
  };

  const handleBatchAdd = async () => {
    const entries: Array<{ name: string; qty: string; unit: string; catKey: string }> = [];
    BATCH_CATEGORIES.forEach(cat => {
      (batchRows[cat.key] || []).forEach(row => {
        if (row.name.trim()) entries.push({ ...row, catKey: cat.key });
      });
    });
    if (entries.length === 0) return;
    for (const e of entries) {
      const cat = BATCH_CATEGORIES.find(c => c.key === e.catKey)!;
      await addToShoppingList({
        name: e.name.trim(),
        quantity: parseFloat(e.qty.replace(",", ".")) || 1,
        unit: e.unit || "un",
        category: cat.key as any,
        store: cat.store,
      });
    }
    setBatchRows(Object.fromEntries(BATCH_CATEGORIES.map(c => [c.key, [emptyRow()]])));
    setShowBatchAdd(false);
    toast.success(language === "pt-BR" ? `${entries.length} itens adicionados!` : `${entries.length} items added!`);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleMarkSelectedAsBought = async () => {
    const toToggle = filteredList.filter(i => selectedIds.has(i.id) && !i.isCompleted);
    for (const item of toToggle) await toggleShoppingItem(item.id);
    setSelectedIds(new Set());
    setSelectionMode(false);
  };

  const handleCreateBatch = async () => {
    if (!user || !homeId) return;
    const selected = shoppingList.filter(i => selectedIds.has(i.id));
    if (!selected.length) return;
    const buyerName = onboardingData?.name || user.email?.split("@")[0] || (language === "pt-BR" ? "Alguém" : "Someone");
    const dateStr = new Date().toLocaleDateString(language === "pt-BR" ? "pt-BR" : language === "es" ? "es-ES" : "en-US");
    const name = batchName.trim() || `${buyerName} — ${dateStr}`;
    const { error } = await supabase.from("saved_shopping_lists").insert({
      home_id: homeId,
      user_id: user.id,
      name,
      items: selected.map(i => ({ name: i.name, quantity: i.quantity, unit: i.unit, store: i.store })),
    });
    if (error) { toast.error(error.message); return; }
    for (const item of selected) await removeFromShoppingList(item.id);
    toast.success(language === "pt-BR" ? `Lote "${name}" salvo!` : `Batch "${name}" saved!`);
    setShowCreateBatchDialog(false);
    setBatchName("");
    setSelectedIds(new Set());
    setSelectionMode(false);
    loadRecentBatches();
  };

  const handleGenerateSmartList = async () => {
    const rl = checkRateLimit(
      "shoppingList",
      RATE_LIMITS.shoppingList.maxRequests,
      RATE_LIMITS.shoppingList.windowMs
    );
    if (!rl.allowed) {
      toast.error(l.tooManyReq);
      return;
    }

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const suggestedItems: any[] = [];
    const residents = onboardingData?.residents || 1;
    const habits = onboardingData?.habits || [];
    const homeType = onboardingData?.homeType || "apartment";
    const timeScale = daysHorizon / 3;
    const scaleFactor = residents * timeScale;

    lowStockItems.forEach((item) => {
      suggestedItems.push({
        name: item.name,
        quantity: Math.ceil((item.minStock || 1) * 2 * scaleFactor),
        unit: item.unit,
        store: item.category === "fruit" || item.category === "vegetable" ? "fair" : "market"
      });
    });

    consumables.filter((c) => (c.dailyConsumption > 0 ? c.currentStock / c.dailyConsumption : 100) <= 3)
      .forEach((item) => {
        suggestedItems.push({
          name: item.name,
          quantity: Math.ceil(item.minStock * 3 * scaleFactor),
          unit: item.unit,
          store: item.category === "hygiene" ? "pharmacy" : "market"
        });
      });

    // Lifestyle Staples
    if (habits.includes("cook-daily") || habits.includes("family") || residents >= 2) {
      suggestedItems.push(
        { name: language === "pt-BR" ? "Arroz" : "Rice", quantity: Math.ceil(residents * 0.5 * timeScale), unit: "kg", store: "market" },
        { name: language === "pt-BR" ? "Feijão" : "Beans", quantity: Math.ceil(residents * 0.3 * timeScale), unit: "kg", store: "market" }
      );
    }

    // Itens do plano alimentar que estão faltando no estoque
    if (mealPlan && mealPlan.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const upcomingMeals = mealPlan.filter((m: any) => m.planned_date >= today);
      upcomingMeals.forEach((meal: any) => {
        const recipeName: string = meal.recipe_name || "";
        const recipe = allRecipes.find((r) => r.name.toLowerCase() === recipeName.toLowerCase());
        if (recipe) {
          recipe.ingredients.forEach((ing: string) => {
            const ingLower = ing.toLowerCase();
            const inStock = items.some(
              (item) => item.name.toLowerCase().includes(ingLower) || ingLower.includes(item.name.toLowerCase())
            );
            if (!inStock) {
              suggestedItems.push({ name: ing, quantity: 1, unit: "un", store: "market" });
            }
          });
        }
      });
    }

    let addedCount = 0;
    suggestedItems.forEach((item) => {
      const exists = shoppingList.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
      if (!exists) {
        addToShoppingList({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          category: item.store === "pharmacy" ? "hygiene" : "pantry",
          store: item.store as any
        }, { silent: true });
        addedCount++;
      }
    });

    if (addedCount > 0) {
      toast.success(`${addedCount} ${l.aiSuggested}`);
    } else {
      toast.info(language === "pt-BR" ? "Seu estoque está em dia!" : "Your stock is up to date!");
    }
    setIsGenerating(false);
  };

  const handleToggleItem = async (item: any) => {
    const becomingComplete = !item.isCompleted;
    await toggleShoppingItem(item.id);
    if (becomingComplete) {
      const pt = language === "pt-BR";
      const es = language === "es";
      toast.success(
        pt ? `✓ ${item.name} comprado!` : es ? `✓ ${item.name} comprado!` : `✓ ${item.name} purchased!`,
        {
          action: {
            label: pt ? "Adicionar ao estoque" : es ? "Agregar al stock" : "Add to stock",
            onClick: () => {
              addItem({
                name: item.name,
                category: item.category || "pantry",
                location: "pantry",
                quantity: item.quantity || 1,
                unit: item.unit || "un",
                addedDate: new Date(),
              });
              toast.success(
                pt ? `${item.name} adicionado ao estoque!`
                  : es ? `${item.name} agregado al stock!`
                  : `${item.name} added to stock!`
              );
            },
          },
          duration: 5000,
        }
      );
    }
  };

  const renderItem = (item: any, index: number) => (
    <div
      key={item.id}
      className={cn(
        "flex items-center gap-2.5 rounded-2xl border bg-white/80 dark:bg-white/5 backdrop-blur-xl border-black/[0.04] dark:border-white/[0.06] p-3 transition-all duration-300 shadow-sm cursor-pointer hover:border-primary/30",
        item.isCompleted && "opacity-60",
        selectionMode && selectedIds.has(item.id) && "border-primary/50 bg-primary/5"
      )}
      onClick={() => {
        if (selectionMode) {
          toggleSelectItem(item.id);
        } else {
          setEditingItemId(item.id);
          setShowCategoryDialog(true);
        }
      }}
    >
      {selectionMode ? (
        <div className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
          selectedIds.has(item.id) ? "border-primary bg-primary" : "border-muted-foreground/40 bg-transparent"
        )}>
          {selectedIds.has(item.id) && <Check className="h-3.5 w-3.5 text-white" />}
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleItem(item);
          }}
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 active:scale-90"
          )}
          style={{
            borderColor: "#165A52",
            background: item.isCompleted ? "#165A52" : "transparent",
            color: "#fff"
          }}
        >
          {item.isCompleted && <Check className="h-3.5 w-3.5" />}
        </button>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className={cn("text-sm font-semibold text-foreground transition-all", item.isCompleted && "line-through text-muted-foreground")}>
            {item.name}
          </p>
          {/* Badge Crítico */}
          {!item.isCompleted && items.some(i => i.name.toLowerCase() === item.name.toLowerCase() && i.minStock && i.quantity <= i.minStock) && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-tighter border border-red-500/20 animate-pulse">
              <Zap className="h-2.5 w-2.5" /> {language === 'pt-BR' ? 'Crítico' : 'Critical'}
            </span>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground">{item.unit}</p>
      </div>
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => {
            const currentQty = item.quantity || 1;
            if (currentQty > 1) updateShoppingItemQuantity(item.id, currentQty - 1);
          }}
          className="flex h-7 w-7 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all active:scale-90"
        >
          <Minus className="h-3 w-3" />
        </button>
        <div className="w-8 text-center"><span className="text-xs font-bold text-foreground">{item.quantity || 1}</span></div>
        <button
          onClick={() => updateShoppingItemQuantity(item.id, (item.quantity || 1) + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all active:scale-90"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
      {!isSubAccount && <button
        onClick={(e) => {
          e.stopPropagation();
          const copy = { ...item };
          setPendingDeletes(prev => {
            const next = new Map(prev);
            const tid = setTimeout(() => {
              removeFromShoppingList(copy.id);
              setPendingDeletes(p => { const n = new Map(p); n.delete(copy.id); return n; });
            }, 4500);
            next.set(copy.id, tid);
            return next;
          });
          toast(language === "pt-BR" ? `"${item.name}" removido` : `"${item.name}" removed`, {
            duration: 4500,
            action: {
              label: language === "pt-BR" ? "Desfazer" : "Undo",
              onClick: () => {
                setPendingDeletes(prev => {
                  const next = new Map(prev);
                  const tid = next.get(copy.id);
                  if (tid) clearTimeout(tid);
                  next.delete(copy.id);
                  return next;
                });
              },
            },
          });
        }}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-all active:bg-destructive/10 active:text-destructive active:scale-90"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>}
    </div>
  );

  return (
    <div className={cn("space-y-4", selectionMode ? "pb-[14rem]" : "pb-nav-safe")}>
      <div className="mb-4 p-4 rounded-3xl bg-[#F7F6F3] dark:bg-white/5 border border-[#E2E1DC] dark:border-white/10">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#165A52]" />
            <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              {language === 'pt-BR' ? 'Período de compras' : language === 'es' ? 'Período de compras' : 'Shopping Period'}
            </span>
          </div>
          <div className="flex bg-black/[0.05] dark:bg-white/10 p-1 rounded-xl gap-1">
            {([3, 7, 15] as const).map(d => (
              <button
                key={d}
                onClick={() => setDaysHorizon(d)}
                className={cn("px-3 py-1 rounded-lg text-[10px] font-bold transition-all", daysHorizon === d ? "bg-white dark:bg-[#165A52] text-[#165A52] dark:text-white shadow-sm" : "text-muted-foreground")}
              >
                {d === 15 ? '15d' : d === 7 ? (language === 'pt-BR' ? '1 sem' : '1 wk') : '3d'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerateSmartList}
          disabled={isGenerating}
          className="w-full group relative flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-[#E2E1DC] dark:border-white/10 transition-all hover:shadow-md active:scale-[0.98]"
        >
          <div className="h-12 w-12 rounded-xl bg-[#165A52]/10 flex items-center justify-center shrink-0">
            {isGenerating ? <Loader2 className="h-5 w-5 animate-spin text-[#165A52]" /> : <Sparkles className="h-5 w-5 text-[#165A52]" />}
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-sm font-black text-foreground group-hover:text-[#165A52]">{isGenerating ? l.generating : l.generateAI}</h4>
            <p className="text-[11px] font-medium text-muted-foreground">{l.analyzeStock}</p>
          </div>
        </button>
      </div>

      {shoppingList.length > 0 && (
        <div className="grid grid-cols-[1fr_auto_auto] gap-2">
          <button onClick={handleSaveList} className="flex items-center justify-center gap-2 h-[52px] rounded-2xl text-white font-bold transition-all active:scale-[0.97]" style={{ background: "#165A52" }}><Save className="h-5 w-5" /><span className="text-sm">{l.concluir}</span></button>
          <button onClick={handleShareWhatsApp} className="flex items-center justify-center h-[52px] w-[52px] rounded-2xl border border-black/[0.06] bg-white/80 dark:bg-white/5 transition-all active:scale-[0.95]" title={l.shareWhatsApp}><Share2 className="h-5 w-5 text-[#25D366]" /></button>
          <button onClick={handleNotifyGroup} disabled={isNotifying} className={cn("flex items-center justify-center h-[52px] w-[52px] rounded-2xl border border-black/[0.06] bg-white/80 dark:bg-white/5 transition-all active:scale-[0.95]", isNotifying && "opacity-50")} title={l.notificarCasa}><Bell className={cn("h-5 w-5 text-primary", isNotifying && "animate-pulse")} /></button>
        </div>
      )}

      {shoppingList.length > 0 && (
        <div className="flex gap-2">
          {!isSubAccount && <button onClick={() => setShowDeleteDialog(true)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive transition-all active:scale-[0.97]"><Trash2 className="h-4 w-4" /></button>}
          <button
            onClick={() => { setSelectionMode(v => { if (!v) setShowBatchAdd(false); return !v; }); setSelectedIds(new Set()); }}
            className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all active:scale-[0.97]",
              selectionMode ? "bg-primary text-white border-primary" : "bg-white/80 dark:bg-white/5 border-black/[0.06] text-foreground")}
            title={language === "pt-BR" ? "Selecionar itens" : "Select items"}
          ><CheckSquare className="h-4 w-4" /></button>
          <button onClick={() => { loadSavedLists(); setShowSavedLists(true); }} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-black/[0.06] bg-white/80 dark:bg-white/5 text-foreground text-sm font-semibold h-12 px-4 transition-all active:scale-[0.97]"><Save className="h-4 w-4 text-primary" /><span>{l.listasSalvas}</span></button>
        </div>
      )}

      {/* Recent Batches — always visible */}
      {recentBatches.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
            <Save className="h-3.5 w-3.5" />
            {language === "pt-BR" ? "Lotes Salvos" : "Saved Batches"}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {recentBatches.map(batch => {
              const isSingle = batch.items.length === 1;
              const title = isSingle ? batch.items[0]?.name : (batch.name || (language === "pt-BR" ? "Lista de compras" : "Shopping list"));
              const subtitle = isSingle
                ? (batch.name || new Date(batch.date).toLocaleDateString(language === "pt-BR" ? "pt-BR" : "en-US"))
                : `${batch.items.length} ${language === "pt-BR" ? "itens" : "items"} · ${new Date(batch.date).toLocaleDateString(language === "pt-BR" ? "pt-BR" : "en-US")}`;
              return (
                <div key={batch.id} className="flex flex-col items-start shrink-0 min-w-[140px] max-w-[180px] rounded-2xl border border-black/[0.06] bg-white/80 dark:bg-white/5 overflow-hidden">
                  <button
                    onClick={() => handleLoadSavedList(batch)}
                    className="flex flex-col items-start w-full p-3 text-left transition-all active:scale-95"
                  >
                    <ShoppingCart className="h-4 w-4 text-primary mb-1.5" />
                    <p className="text-xs font-bold text-foreground leading-tight line-clamp-2">{title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 truncate w-full">{subtitle}</p>
                  </button>
                  {!isSubAccount && (
                    <button
                      onClick={async (e) => { e.stopPropagation(); await handleDeleteSavedList(batch.id); setRecentBatches(prev => prev.filter(b => b.id !== batch.id)); }}
                      className="flex w-full items-center justify-center gap-1 py-1.5 border-t border-black/[0.04] text-destructive text-[10px] font-semibold transition-all active:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                      {language === "pt-BR" ? "Excluir" : "Delete"}
                    </button>
                  )}
                </div>
              );
            })}
            <button
              onClick={() => { loadSavedLists(); setShowSavedLists(true); }}
              className="flex flex-col items-center justify-center shrink-0 min-w-[80px] rounded-2xl border border-dashed border-black/[0.08] bg-transparent text-muted-foreground p-3 transition-all active:scale-95 text-xs font-semibold gap-1"
            >
              <Plus className="h-4 w-4" />
              {language === "pt-BR" ? "Ver todos" : "See all"}
            </button>
          </div>
        </div>
      )}

      {/* Saved Lists Modal & Delete Dialog */}
      {showSavedLists && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40" onClick={() => setShowSavedLists(false)}>
          <div className="w-full max-w-lg rounded-t-3xl bg-[#fafafa] dark:bg-[#1a1a1a] p-6 pb-10 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{l.listasSalvas}</h2><button onClick={() => setShowSavedLists(false)} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10"><X className="h-4 w-4" /></button></div>
            {savedLists.length === 0 ? <p className="text-center text-sm text-muted-foreground py-8">{l.nenhumaLista}</p> : (
              <div className="space-y-3">
                {savedLists.map(list => {
                  const isSingle = list.items.length === 1;
                  const title = isSingle ? list.items[0].name : (list.name || l.listaDeCompras);
                  const subtitle = isSingle
                    ? list.name || new Date(list.date).toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-US')
                    : `${list.items.length} ${language === 'pt-BR' ? 'itens' : 'items'} · ${new Date(list.date).toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-US')}`;
                  return (
                  <div key={list.id} className="rounded-2xl border border-black/[0.04] dark:border-white/[0.06] bg-white dark:bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0"><p className="font-semibold text-foreground text-sm">{title}</p><p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p></div>
                      <div className="flex items-center gap-2"><button onClick={() => handleLoadSavedList(list)} className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-all active:scale-95"><ShoppingCart className="h-3.5 w-3.5" />{l.carregar}</button>
                      {!isSubAccount && <button onClick={() => handleDeleteSavedList(list.id)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition-all active:scale-95"><Trash2 className="h-3.5 w-3.5" /></button>}</div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="rounded-2xl max-w-sm mx-auto">
          <DialogHeader><DialogTitle className="text-center">{l.deleteAll}</DialogTitle><DialogDescription className="text-center">{l.confirmDeleteAll}</DialogDescription></DialogHeader>
          <DialogFooter className="flex flex-row gap-2 mt-2 w-full justify-center">
            <Button variant="outline" className="flex-1 h-12 rounded-xl text-xs" onClick={() => setShowDeleteDialog(false)}>{t.cancel}</Button>
            <Button variant="destructive" className="flex-1 h-12 rounded-xl text-xs font-bold" onClick={() => { clearAllShoppingList(); toast.success(l.allDeleted); setShowDeleteDialog(false); }}><Trash2 className="h-4 w-4 mr-1" />{l.deleteAll}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Input Section */}
      <div className="relative">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(['all', 'market', 'fair', 'pharmacy', 'other'] as const).map(cat => {
              const isActive = cat === 'all' ? activeFilter === 'all' : activeFilter === cat;
              return (
                <button key={cat} onClick={() => { setActiveFilter(cat); if (cat !== 'all') setNewItemStore(cat); }} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all", isActive ? "bg-primary text-primary-foreground" : "bg-white/80 dark:bg-white/5 border border-black/[0.04] text-muted-foreground")}>
                  {cat === 'all' ? l.all : cat === 'market' ? l.market : cat === 'fair' ? l.fair : cat === 'pharmacy' ? l.pharmacy : 'Outros'}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Input ref={inputRef} placeholder={l.addPlaceholder} value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddItem()} className="flex-1 h-[52px] rounded-2xl border-black/[0.04] bg-white/80 dark:bg-white/5 text-sm" />
            <Input inputMode="decimal" placeholder="Qtd" value={newItemQty} onChange={(e) => setNewItemQty(e.target.value)} className="flex-shrink-0 h-[52px] w-[48px] text-center rounded-2xl border-black/[0.04] bg-white/80 dark:bg-white/5 text-sm font-bold" />
            <Select value={newItemUnit} onValueChange={setNewItemUnit}>
              <SelectTrigger className="h-[52px] w-[58px] rounded-2xl border-black/[0.04] bg-white/80 dark:bg-white/5 text-xs font-bold shrink-0 px-2"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="un">un</SelectItem><SelectItem value="kg">kg</SelectItem><SelectItem value="g">g</SelectItem><SelectItem value="L">L</SelectItem><SelectItem value="ml">ml</SelectItem><SelectItem value="pct">pct</SelectItem></SelectContent>
            </Select>
            <Button onClick={() => handleAddItem()} size="icon" className="rounded-2xl shrink-0 h-[52px] w-[52px]" style={{ background: "#165A52" }}><Plus className="h-5 w-5" /></Button>
          </div>
          {/* Categoria do alimento */}
          <Select value={newItemCategory} onValueChange={setNewItemCategory}>
            <SelectTrigger className="h-10 rounded-2xl border-black/[0.04] bg-white/80 dark:bg-white/5 text-xs font-semibold text-muted-foreground"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[
                { value: "pantry",   label: language === "pt-BR" ? "🥫 Mercearia" : "🥫 Pantry" },
                { value: "fruit",    label: language === "pt-BR" ? "🍎 Frutas" : "🍎 Fruit" },
                { value: "vegetable",label: language === "pt-BR" ? "🥦 Verduras/Legumes" : "🥦 Vegetable" },
                { value: "meat",     label: language === "pt-BR" ? "🥩 Carnes" : "🥩 Meat" },
                { value: "dairy",    label: language === "pt-BR" ? "🧀 Laticínios" : "🧀 Dairy" },
                { value: "beverage", label: language === "pt-BR" ? "🧃 Bebidas" : "🧃 Beverage" },
                { value: "frozen",   label: language === "pt-BR" ? "🧊 Congelados" : "🧊 Frozen" },
                { value: "hygiene",  label: language === "pt-BR" ? "🧴 Higiene" : "🧴 Hygiene" },
                { value: "cleaning", label: language === "pt-BR" ? "🧹 Limpeza" : "🧹 Cleaning" },
              ].map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Batch add toggle */}
          <button
            onClick={() => { setShowBatchAdd(v => !v); setBatchRows(Object.fromEntries(BATCH_CATEGORIES.map(c => [c.key, [emptyRow()]]))); }}
            className={cn("flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all self-start", showBatchAdd ? "bg-primary text-primary-foreground" : "bg-white/80 dark:bg-white/5 border border-black/[0.04] text-muted-foreground")}
          >
            <AlignJustify className="h-3.5 w-3.5" />
            {language === "pt-BR" ? "Adicionar em lote" : "Batch add"}
          </button>

          {showBatchAdd && (
            <div className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-3">
              <p className="text-[11px] font-bold text-primary uppercase tracking-wider px-1">
                {language === "pt-BR" ? "Escreva os itens em cada categoria:" : "Write items in each category:"}
              </p>
              {BATCH_CATEGORIES.map(cat => (
                <div key={cat.key} className="space-y-1.5">
                  <p className="text-xs font-black text-foreground/70 flex items-center gap-1.5 px-1">
                    <span>{cat.emoji}</span> {cat.label}
                  </p>
                  {(batchRows[cat.key] || [emptyRow()]).map((row, idx) => (
                    <div key={idx} className="flex gap-1.5 items-center">
                      <Input
                        placeholder={language === "pt-BR" ? "Nome do item" : "Item name"}
                        value={row.name}
                        onChange={e => setBatchRows(prev => {
                          const rows = [...(prev[cat.key] || [emptyRow()])];
                          rows[idx] = { ...rows[idx], name: e.target.value };
                          return { ...prev, [cat.key]: rows };
                        })}
                        className="flex-1 h-9 text-xs rounded-xl border-black/[0.04] bg-white/80 dark:bg-white/5"
                      />
                      <Input
                        inputMode="decimal"
                        placeholder="Qtd"
                        value={row.qty}
                        onChange={e => setBatchRows(prev => {
                          const rows = [...(prev[cat.key] || [emptyRow()])];
                          rows[idx] = { ...rows[idx], qty: e.target.value };
                          return { ...prev, [cat.key]: rows };
                        })}
                        className="w-12 h-9 text-center text-xs rounded-xl border-black/[0.04] bg-white/80 dark:bg-white/5"
                      />
                      <select
                        value={row.unit}
                        onChange={e => setBatchRows(prev => {
                          const rows = [...(prev[cat.key] || [emptyRow()])];
                          rows[idx] = { ...rows[idx], unit: e.target.value };
                          return { ...prev, [cat.key]: rows };
                        })}
                        className="h-9 rounded-xl border border-black/[0.04] bg-white/80 dark:bg-white/10 text-xs font-bold px-1 text-foreground"
                      >
                        {["un","kg","g","L","ml","pct"].map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                      {idx === (batchRows[cat.key] || []).length - 1 ? (
                        <button
                          onClick={() => setBatchRows(prev => ({ ...prev, [cat.key]: [...(prev[cat.key] || []), emptyRow()] }))}
                          className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0"
                        ><Plus className="h-3.5 w-3.5" /></button>
                      ) : (
                        <button
                          onClick={() => setBatchRows(prev => {
                            const rows = [...(prev[cat.key] || [])];
                            rows.splice(idx, 1);
                            return { ...prev, [cat.key]: rows };
                          })}
                          className="h-9 w-9 flex items-center justify-center rounded-xl bg-destructive/10 text-destructive shrink-0"
                        ><X className="h-3.5 w-3.5" /></button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <Button
                onClick={handleBatchAdd}
                className="w-full rounded-2xl h-11 mt-1"
                style={{ background: "#165A52" }}
              >
                <Plus className="h-4 w-4 mr-2" />
                {language === "pt-BR" ? "Adicionar Todos" : "Add All"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end mt-2">
        <button onClick={() => setGroupByCategory(!groupByCategory)} className={cn("flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all", groupByCategory ? "bg-primary text-primary-foreground" : "bg-white/80 dark:bg-white/5 border border-black/[0.04] text-foreground")}>
          {groupByCategory ? <LayoutGrid className="h-3.5 w-3.5" /> : <LayoutList className="h-3.5 w-3.5" />}{groupByCategory ? l.groupBy : l.flat}
        </button>
      </div>

      {/* ── Seção Crítica ── */}
      {criticalItems.length > 0 && (
        <div className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/5 p-3 space-y-2">
          <div className="flex items-center gap-2 px-1">
            <Zap className="h-4 w-4 text-red-500 shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-red-400">
              {language === "pt-BR" ? "Vencendo hoje — adicionar à lista?" : language === "es" ? "Vence hoy — ¿agregar a la lista?" : "Expiring today — add to list?"}
            </span>
          </div>
          {criticalItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-3 py-2">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
              <span className="flex-1 text-sm font-semibold text-foreground truncate">{item.name}</span>
              <button
                onClick={() => {
                  addToShoppingList({
                    name: item.name,
                    category: item.category,
                    quantity: item.minStock || 1,
                    unit: item.unit,
                    store: item.category === "fruit" || item.category === "vegetable" ? "fair" : "market",
                  });
                  toast.success(language === "pt-BR" ? `${item.name} adicionado à lista!` : `${item.name} added to list!`);
                }}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500 text-white text-[11px] font-bold transition-all active:scale-90"
              >
                <Plus className="h-3 w-3" />
                {language === "pt-BR" ? "Comprar" : language === "es" ? "Comprar" : "Buy"}
              </button>
            </div>
          ))}
        </div>
      )}

      {filteredList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-2xl bg-white/80 dark:bg-white/5 p-5"><ShoppingCart className="h-12 w-12 text-muted-foreground" /></div>
          <p className="text-lg font-bold text-foreground">{l.emptyList}</p><p className="mt-1 text-sm text-muted-foreground">{l.emptyDesc}</p>
        </div>
      ) : (
        <div className="space-y-1.5">{filteredList.map((item, index) => renderItem(item, index))}</div>
      )}

      {/* Add-to-Stock Dialog */}
      <Dialog open={showAddToStockDialog} onOpenChange={setShowAddToStockDialog}>
        <DialogContent className="rounded-2xl max-w-sm mx-auto max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-center">
              {language === "pt-BR" ? "Adicionar ao estoque?" : "Add to inventory?"}
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              {language === "pt-BR" ? "Selecione os itens comprados para registrar no estoque" : "Select purchased items to add to your inventory"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between px-1 py-1">
            <button className="text-xs text-primary font-semibold" onClick={() => setSelectedForStock(new Set(stockCandidates.map(c => c.id)))}>
              {language === "pt-BR" ? "Selecionar todos" : "Select all"}
            </button>
            <button className="text-xs text-muted-foreground font-semibold" onClick={() => setSelectedForStock(new Set())}>
              {language === "pt-BR" ? "Limpar" : "Clear"}
            </button>
          </div>
          <div className="overflow-y-auto flex-1 space-y-1.5 px-0.5">
            {stockCandidates.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedForStock(prev => {
                  const next = new Set(prev);
                  if (next.has(c.id)) next.delete(c.id); else next.add(c.id);
                  return next;
                })}
                className={cn("w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all border",
                  selectedForStock.has(c.id) ? "border-primary/40 bg-primary/5" : "border-transparent bg-muted/40")}
              >
                <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all",
                  selectedForStock.has(c.id) ? "border-primary bg-primary" : "border-muted-foreground/40"
                )}>
                  {selectedForStock.has(c.id) && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className="flex-1 text-sm font-semibold text-foreground truncate">{c.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">{c.quantity} {c.unit}</span>
              </button>
            ))}
          </div>
          <DialogFooter className="flex flex-row gap-2 mt-2">
            <Button variant="outline" className="flex-1 rounded-xl h-11 text-xs" onClick={() => setShowAddToStockDialog(false)}>
              {language === "pt-BR" ? "Pular" : "Skip"}
            </Button>
            <Button
              disabled={selectedForStock.size === 0}
              className="flex-1 rounded-xl h-11 text-xs font-bold"
              style={{ background: "#165A52" }}
              onClick={() => {
                stockCandidates.filter(c => selectedForStock.has(c.id)).forEach(c => {
                  addItem({
                    name: c.name,
                    category: c.category as any,
                    location: c.store === "pharmacy" ? "cleaning" : c.store === "fair" ? "fridge" : "pantry",
                    quantity: c.quantity,
                    unit: c.unit,
                    addedDate: new Date(),
                  });
                });
                setShowAddToStockDialog(false);
                toast.success(language === "pt-BR" ? `${selectedForStock.size} itens adicionados ao estoque!` : `${selectedForStock.size} items added to inventory!`);
              }}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              {language === "pt-BR" ? `Adicionar (${selectedForStock.size})` : `Add (${selectedForStock.size})`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating Selection Bar */}
      {selectionMode && (
        <div
          className="fixed left-4 right-4 z-50 rounded-2xl bg-[#165A52] text-white shadow-2xl p-3"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.5rem)" }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold">
              {selectedIds.size > 0
                ? (language === "pt-BR" ? `${selectedIds.size} selecionado${selectedIds.size > 1 ? "s" : ""}` : `${selectedIds.size} selected`)
                : (language === "pt-BR" ? "Nenhum selecionado" : "None selected")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (selectedIds.size === filteredList.length) {
                    setSelectedIds(new Set());
                  } else {
                    setSelectedIds(new Set(filteredList.map(i => i.id)));
                  }
                }}
                className="text-[11px] font-semibold underline underline-offset-2 opacity-80"
              >
                {selectedIds.size === filteredList.length
                  ? (language === "pt-BR" ? "Desmarcar todos" : "Deselect all")
                  : (language === "pt-BR" ? "Selecionar todos" : "Select all")}
              </button>
              <button onClick={() => { setSelectionMode(false); setSelectedIds(new Set()); }} className="opacity-70 text-[11px] font-semibold">
                {language === "pt-BR" ? "Cancelar" : "Cancel"}
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              disabled={selectedIds.size === 0}
              onClick={handleMarkSelectedAsBought}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white/20 py-2.5 text-xs font-bold transition-all active:scale-95 disabled:opacity-40"
            >
              <Check className="h-4 w-4" />
              {language === "pt-BR" ? "Marcar comprados" : "Mark as bought"}
            </button>
            <button
              disabled={selectedIds.size === 0}
              onClick={() => setShowCreateBatchDialog(true)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white/20 py-2.5 text-xs font-bold transition-all active:scale-95 disabled:opacity-40"
            >
              <Save className="h-4 w-4" />
              {language === "pt-BR" ? "Criar Lote" : "Create Batch"}
            </button>
          </div>
        </div>
      )}

      {/* Create Batch Dialog */}
      <Dialog open={showCreateBatchDialog} onOpenChange={setShowCreateBatchDialog}>
        <DialogContent className="rounded-2xl max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              {language === "pt-BR" ? "Criar Lote" : "Create Batch"}
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              {language === "pt-BR"
                ? `${selectedIds.size} item${selectedIds.size > 1 ? "s" : ""} selecionado${selectedIds.size > 1 ? "s" : ""}. Dê um nome ao lote:`
                : `${selectedIds.size} item${selectedIds.size > 1 ? "s" : ""} selected. Name this batch:`}
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder={language === "pt-BR" ? "Ex: Compras do mês, Feira da semana…" : "E.g. Weekly groceries…"}
            value={batchName}
            onChange={e => setBatchName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleCreateBatch()}
            className="rounded-xl h-12"
            autoFocus
          />
          <DialogFooter className="flex flex-row gap-2 mt-1">
            <Button variant="outline" className="flex-1 rounded-xl h-12 text-xs" onClick={() => setShowCreateBatchDialog(false)}>
              {language === "pt-BR" ? "Cancelar" : "Cancel"}
            </Button>
            <Button className="flex-1 rounded-xl h-12 text-xs font-bold" style={{ background: "#165A52" }} onClick={handleCreateBatch}>
              <Save className="h-4 w-4 mr-1.5" />
              {language === "pt-BR" ? "Salvar Lote" : "Save Batch"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Selection Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {language === "pt-BR" ? "Selecionar Categoria" : "Select Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-1.5 max-h-80 overflow-y-auto">
            {itemCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  if (editingItemId) {
                    handleUpdateItemCategory(editingItemId, cat.value, cat.store);
                  }
                }}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg border border-primary/20 bg-white dark:bg-white/5 hover:border-primary hover:bg-primary/10 dark:hover:bg-primary/10 transition-all active:scale-95"
              >
                <span className="text-lg">{cat.label.split(" ")[0]}</span>
                <span className="text-[10px] font-semibold text-center leading-tight">
                  {cat.label.replace(/^[^\s]+ /, "")}
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
