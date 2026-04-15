import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback
} from "react";
import {
  FriggoItem,
  ShoppingItem,
  OnboardingData,
  Alert,
  ItemHistoryEntry,
  ItemCategory,
  ItemLocation,
  MaturationLevel,
  ConsumableItem,
  DefrostTimer,
  MealPlanEntry
} from "@/types/friggo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { scheduleLocalNotification } from "@/lib/pushNotifications";

interface FriggoContextType {
  items: FriggoItem[];
  shoppingList: ShoppingItem[];
  consumables: ConsumableItem[];
  defrostTimers: DefrostTimer[];
  alerts: Alert[];
  onboardingData: OnboardingData | null;
  isOnboarded: boolean;
  onboarding_completed: boolean;
  itemHistory: ItemHistoryEntry[];
  loading: boolean;
  addItem: (item: Omit<FriggoItem, "id">) => Promise<void>;
  updateItem: (id: string, item: Partial<FriggoItem>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  addToShoppingList: (
    item: Omit<ShoppingItem, "id" | "isCompleted">
  ) => Promise<void>;
  toggleShoppingItem: (id: string) => Promise<void>;
  removeFromShoppingList: (id: string) => Promise<void>;
  updateShoppingItemQuantity: (id: string, quantity: number) => Promise<void>;
  addConsumable: (item: Omit<ConsumableItem, "id">) => Promise<void>;
  updateConsumable: (id: string, updates: Partial<ConsumableItem>) => Promise<void>;
  removeConsumable: (id: string) => Promise<void>;
  clearConsumables: () => void;
  setConsumablesBulk: (items: Omit<ConsumableItem, "id">[]) => Promise<void>;
  markAllShoppingComplete: () => Promise<void>;
  clearAllShoppingList: () => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  resetOnboarding: () => Promise<void>;
  updateProfile: (data: Partial<OnboardingData>) => Promise<void>;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  defrostItem: (id: string) => void;
  dismissAlert: (id: string) => void;
  addItemHistory: (
    itemId: string,
    itemName: string,
    action: "added" | "consumed" | "cooked" | "discarded",
    quantity: number,
    unit?: string
  ) => void;
  toggleSection: (id: string) => Promise<void>;
  isSectionHidden: (id: string) => boolean;
  refreshData: () => Promise<void>;
  // Recipe & Planner
  favoriteRecipes: string[];
  toggleFavoriteRecipe: (recipeId: string) => Promise<void>;
  mealPlan: MealPlanEntry[];
  addToMealPlan: (entry: Omit<MealPlanEntry, "id">) => Promise<void>;
  removeFromMealPlan: (id: string) => Promise<void>;
}

const FriggoContext = createContext<FriggoContextType | undefined>(undefined);

const VALID_CATEGORIES: ItemCategory[] = [
  "fruit",
  "vegetable",
  "meat",
  "dairy",
  "cooked",
  "frozen",
  "beverage",
  "cleaning",
  "hygiene",
  "pantry"
];
const VALID_LOCATIONS: ItemLocation[] = [
  "fridge",
  "freezer",
  "pantry",
  "cleaning"
];
const DEFAULT_NOTIFICATION_PREFS = ["expiry", "shopping", "nightCheckup"];
const NOTIFICATION_PREFS_STORAGE_KEY = "friggo_notification_prefs";

const ALERT_NOTIFICATION_PREF_MAP: Record<Alert["type"], string> = {
  expiring: "expiry",
  "consume-today": "expiry",
  overripe: "recipes",
  "low-stock": "shopping"
};

const DEMO_ITEMS: FriggoItem[] = [
  {
    id: "demo-1",
    name: "Maçã",
    category: "fruit",
    location: "fridge",
    quantity: 6,
    unit: "unidades",
    addedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    expirationDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    maturation: "ripe"
  },
  {
    id: "demo-2",
    name: "Leite",
    category: "dairy",
    location: "fridge",
    quantity: 2,
    unit: "litros",
    addedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    openedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

export function FriggoProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [items, setItems] = useState<FriggoItem[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [consumables, setConsumables] = useState<ConsumableItem[]>(() => {
    const saved = localStorage.getItem("friggo_consumables");
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [defrostTimers, setDefrostTimers] = useState<DefrostTimer[]>(() => {
    const saved = localStorage.getItem("friggo_defrost_timers_list");
    return saved ? JSON.parse(saved) : [];
  });
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [onboarding_completed, setOnboardingCompleted] = useState(false);
  const [itemHistory, setItemHistory] = useState<ItemHistoryEntry[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  // Track alert IDs already notified so we don't spam the user
  const notifiedAlertIds = useRef<Set<string>>(new Set());
  const hasHydratedAlerts = useRef(false);

  const getNotificationPrefsStorageKey = (targetUserId?: string) =>
    `${NOTIFICATION_PREFS_STORAGE_KEY}:${targetUserId || "guest"}`;

  const readStoredNotificationPrefs = (targetUserId?: string) => {
    try {
      const raw = localStorage.getItem(
        getNotificationPrefsStorageKey(targetUserId)
      );
      if (!raw) return undefined;

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.filter((value): value is string => typeof value === "string")
        : undefined;
    } catch {
      return undefined;
    }
  };

  const persistNotificationPrefs = (
    prefs: string[] | undefined,
    targetUserId?: string
  ) => {
    try {
      const storageKey = getNotificationPrefsStorageKey(targetUserId);
      if (!prefs || prefs.length === 0) {
        localStorage.removeItem(storageKey);
        return;
      }

      localStorage.setItem(storageKey, JSON.stringify(prefs));
    } catch {
      // Ignore localStorage issues so app startup never breaks.
    }
  };

  const createDefaultOnboardingData = (
    overrides: Partial<OnboardingData> = {},
    targetUserId?: string
  ): OnboardingData => {
    const fallbackName =
      typeof user?.user_metadata?.name === "string" ? user.user_metadata.name : "";

    return {
      name: fallbackName,
      homeType: "apartment",
      residents: 1,
      fridgeType: "regular",
      coolingLevel: 3,
      habits: [],
      notificationPrefs:
        readStoredNotificationPrefs(targetUserId) ?? DEFAULT_NOTIFICATION_PREFS,
      ...overrides
    };
  };

  // Persistence for local states
  useEffect(() => {
    localStorage.setItem("friggo_consumables", JSON.stringify(consumables));
  }, [consumables]);

  useEffect(() => {
    localStorage.setItem(
      "friggo_defrost_timers_list",
      JSON.stringify(defrostTimers)
    );
  }, [defrostTimers]);

  useEffect(() => {
    notifiedAlertIds.current.clear();
    hasHydratedAlerts.current = false;
  }, [user?.id]);

  // Fetch data from Supabase
  const fetchData = useCallback(async () => {
    if (!user) {
      // Use demo data when not logged in
      setItems(DEMO_ITEMS);
      setShoppingList([]);
      setOnboardingData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch items
      const { data: itemsData, error: itemsError } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (itemsError) throw itemsError;

      // Transform DB items to FriggoItem format
      const transformedItems: FriggoItem[] = (itemsData || []).map((item) => {
        const category = VALID_CATEGORIES.includes(
          item.category as ItemCategory
        )
          ? (item.category as ItemCategory)
          : "pantry";
        const location = VALID_LOCATIONS.includes(item.location as ItemLocation)
          ? (item.location as ItemLocation)
          : "fridge";

        return {
          id: item.id,
          name: item.name,
          category,
          location,
          quantity: item.quantity || 1,
          unit: item.unit || "unidades",
          addedDate: new Date(item.created_at || Date.now()),
          expirationDate: item.expiry_date
            ? new Date(item.expiry_date)
            : undefined,
          openedDate: item.opened_date ? new Date(item.opened_date) : undefined,
          minStock: item.min_stock || undefined,
          maturation: (item.maturation as MaturationLevel) || undefined
        };
      });

      setItems(transformedItems);

      // Fetch shopping items
      const { data: shoppingData, error: shoppingError } = await supabase
        .from("shopping_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (shoppingError) throw shoppingError;

      const transformedShopping: ShoppingItem[] = (shoppingData || []).map(
        (item) => {
          const category = VALID_CATEGORIES.includes(
            item.category as ItemCategory
          )
            ? (item.category as ItemCategory)
            : "pantry";
          const storeMap: Record<string, "market" | "fair" | "pharmacy"> = {
            market: "market",
            fair: "fair",
            pharmacy: "pharmacy"
          };

          return {
            id: item.id,
            name: item.name,
            quantity: item.quantity || 1,
            unit: item.unit || "unidades",
            category,
            isCompleted: item.checked || false,
            store: storeMap[item.category] || "market"
          };
        }
      );

      setShoppingList(transformedShopping);

      // Fetch consumables
      const { data: consumablesData, error: consumablesError } = await supabase
        .from("consumables")
        .select("*")
        .eq("user_id", user.id);

      if (consumablesError) throw consumablesError;

      const transformedConsumables: ConsumableItem[] = (consumablesData || []).map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        category: (item.category as ConsumableCategory) || "other",
        currentStock: Number(item.current_stock) || 0,
        unit: item.unit || "unidades",
        dailyConsumption: Number(item.daily_consumption) || 0,
        minStock: Number(item.min_stock) || 0,
        usageInterval: (item.usage_interval as any) || "daily"
      }));

      setConsumables(transformedConsumables);

      // Fetch favorites
      const { data: favData } = await supabase
        .from("recipe_favorites")
        .select("recipe_id")
        .eq("user_id", user.id);
      
      setFavoriteRecipes((favData || []).map(f => f.recipe_id));

      // Fetch meal plan
      const { data: planData } = await supabase
        .from("meal_plan")
        .select("*")
        .eq("user_id", user.id)
        .order("planned_date", { ascending: true });
      
      setMealPlan((planData || []).map(p => ({
        id: p.id,
        recipe_id: p.recipe_id,
        recipe_name: p.recipe_name,
        planned_date: p.planned_date,
        meal_type: p.meal_type as any
      })));

      const storedNotificationPrefs = readStoredNotificationPrefs(user.id);

      // Fetch profile data from multiple tables for enhanced security
      const [
        { data: profileBasic },
        { data: profileSettings },
        { data: profileSensitive }
      ] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("profile_settings").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("profile_sensitive").select("*").eq("user_id", user.id).maybeSingle()
      ]);

      const onboardingActive = profileBasic?.onboarding_completed || false;
      setOnboardingCompleted(onboardingActive);

      setOnboardingData(
        createDefaultOnboardingData(
          {
            name: profileBasic?.name || "",
            avatarUrl: profileBasic?.avatar_url,
            onboarding_completed: onboardingActive,
            
            homeType: profileSettings?.home_type as any,
            residents: profileSettings?.residents,
            fridgeType: profileSettings?.fridge_type as any,
            fridgeBrand: profileSettings?.fridge_brand,
            coolingLevel: profileSettings?.cooling_level,
            habits: profileSettings?.habits,
            hiddenSections: profileSettings?.hidden_sections || [],
            notificationPrefs: (profileSettings?.notification_prefs || storedNotificationPrefs) ?? DEFAULT_NOTIFICATION_PREFS,
            
            cpf: profileSensitive?.cpf
          },
          user.id
        )
      );
    } catch (error: any) {
      console.error("Error fetching data:", error);
      // Suppress specific JWT expired toast for a smoother dev experience if needed
      if (error.message?.includes("JWT expired") || error.code === "PGRST303") {
        setItems(DEMO_ITEMS);
        setShoppingList([]);
        setOnboardingData(createDefaultOnboardingData());
      } else {
        toast({
          title: "Erro ao carregar dados",
          description: error.message,
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Generate alerts based on items
  useEffect(() => {
    const newAlerts: Alert[] = [];
    const now = new Date();

    items.forEach((item) => {
      if (item.expirationDate) {
        const daysUntilExpiry = Math.ceil(
          (new Date(item.expirationDate).getTime() - now.getTime()) /
          (1000 * 60 * 60 * 24)
        );

        if (daysUntilExpiry <= 0) {
          newAlerts.push({
            id: `exp-${item.id}`,
            type: "expiring",
            itemId: item.id,
            itemName: item.name,
            message: `${item.name} venceu!`,
            priority: "high",
            createdAt: now
          });
        } else if (daysUntilExpiry <= 1) {
          newAlerts.push({
            id: `exp-${item.id}`,
            type: "consume-today",
            itemId: item.id,
            itemName: item.name,
            message: `Consumir ${item.name} hoje`,
            priority: "high",
            createdAt: now
          });
        } else if (daysUntilExpiry <= 3) {
          newAlerts.push({
            id: `exp-${item.id}`,
            type: "expiring",
            itemId: item.id,
            itemName: item.name,
            message: `${item.name} vence em ${daysUntilExpiry} dias`,
            priority: "medium",
            createdAt: now
          });
        }
      }

      if (item.maturation === "very-ripe" || item.maturation === "overripe") {
        newAlerts.push({
          id: `mat-${item.id}`,
          type: "overripe",
          itemId: item.id,
          itemName: item.name,
          message: `${item.name} está ${item.maturation === "very-ripe" ? "muito maduro" : "passado"
            }`,
          priority: item.maturation === "overripe" ? "high" : "medium",
          createdAt: now
        });
      }

      if (item.minStock && item.quantity <= item.minStock) {
        newAlerts.push({
          id: `stock-${item.id}`,
          type: "low-stock",
          itemId: item.id,
          itemName: item.name,
          message: `${item.name} está acabando`,
          priority: "low",
          createdAt: now
        });
      }

      if (item.dailyConsumption && item.dailyConsumption > 0) {
        const daysUntilEmpty = Math.floor(
          item.quantity / item.dailyConsumption
        );
        if (daysUntilEmpty <= 3) {
          newAlerts.push({
            id: `consumption-${item.id}`,
            type: "low-stock",
            itemId: item.id,
            itemName: item.name,
            message: `${item.name} acaba em ${daysUntilEmpty} dias`,
            priority: daysUntilEmpty <= 1 ? "high" : "medium",
            createdAt: now
          });
        }
      }

      // Meat in Pantry check
      if (item.category === "meat" && item.location === "pantry") {
        newAlerts.push({
          id: `spoilage-${item.id}`,
          type: "expiring",
          itemId: item.id,
          itemName: item.name,
          message: language === "pt-BR" 
            ? `${item.name} na dispensa vai estragar! Precisa de refrigeração.`
            : language === "es"
              ? `${item.name} en la despensa se echará a perder! Necesita refrigeración.`
              : `${item.name} in pantry will rot! Needs refrigeration.`,
          priority: "high",
          createdAt: now
        });
      }
    });

    setAlerts(newAlerts);

    const notificationPrefs =
      onboardingData?.notificationPrefs ?? DEFAULT_NOTIFICATION_PREFS;

    if (!hasHydratedAlerts.current) {
      newAlerts.forEach((alert) => notifiedAlertIds.current.add(alert.id));
      hasHydratedAlerts.current = true;
      return;
    }

    // Fire system notifications only for alerts created after the initial load.
    newAlerts.forEach((alert) => {
      if (notifiedAlertIds.current.has(alert.id)) return;
      notifiedAlertIds.current.add(alert.id);

      // Only notify for medium and high priority to avoid noise
      if (alert.priority === "low") return;

      const notificationPref = ALERT_NOTIFICATION_PREF_MAP[alert.type];
      if (!notificationPrefs.includes(notificationPref)) return;

      const category =
        alert.type === "consume-today"
          ? "consume-today" as const
          : alert.type === "expiring"
            ? "expiry" as const
            : alert.type === "overripe"
              ? "overripe" as const
              : "low-stock" as const;

      const title =
        alert.type === "consume-today"
          ? "⏰ Friggo — Consumir Hoje!"
          : alert.type === "expiring"
            ? "🕰️ Friggo — Atenção ao Prazo"
            : alert.type === "overripe"
              ? "🍌 Friggo — Hora de Usar"
              : "📦 Friggo — Reposição Necessária";

      scheduleLocalNotification(title, alert.message, 0, alert.id, category);
    });
  }, [items, onboardingData?.notificationPrefs]);

  const defrostItem = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newExpiration = new Date();
    newExpiration.setDate(newExpiration.getDate() + 3); // Default 3 days for defrosted items

    await updateItem(id, {
      location: "fridge",
      expirationDate: newExpiration
    });

    const endTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours from now
    setDefrostTimers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        itemId: id,
        itemName: item.name,
        startedAt: new Date(),
        estimatedMinutes: 120
      }
    ]);

    toast({
      title: language === "pt-BR" ? "Degelo iniciado" : "Defrost started",
      description:
        language === "pt-BR"
          ? `${item.name} movido para a geladeira. Um lembrete será enviado em 2 horas.`
          : `${item.name} moved to the fridge. A reminder will be sent in 2 hours.`
    });
  };

  const addConsumable = async (item: Omit<ConsumableItem, "id">) => {
    if (!user) {
      const newItem = { ...item, id: crypto.randomUUID() };
      setConsumables((prev) => [...prev, newItem]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("consumables")
        .insert({
          user_id: user.id,
          name: item.name,
          icon: item.icon,
          category: item.category,
          current_stock: item.currentStock,
          unit: item.unit,
          daily_consumption: item.dailyConsumption,
          min_stock: item.minStock,
          usage_interval: (item as any).usageInterval || (item as any).usageType || "daily"
        })
        .select()
        .single();

      if (error) throw error;

      const newItem: ConsumableItem = {
        id: data.id,
        name: data.name,
        icon: data.icon,
        category: (data.category as ConsumableCategory) || "other",
        currentStock: Number(data.current_stock) || 0,
        unit: data.unit || "unidades",
        dailyConsumption: Number(data.daily_consumption) || 0,
        minStock: Number(data.min_stock) || 0,
        usageInterval: (data.usage_interval as any) || "daily"
      };

      setConsumables((prev) => [...prev, newItem]);
    } catch (error: any) {
      console.error("Error adding consumable:", error);
    }
  };

  const updateConsumable = async (id: string, updates: Partial<ConsumableItem>) => {
    if (!user) {
      setConsumables((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
      return;
    }

    try {
      const dbUpdates: any = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.currentStock !== undefined) dbUpdates.current_stock = updates.currentStock;
      if (updates.unit !== undefined) dbUpdates.unit = updates.unit;
      if (updates.dailyConsumption !== undefined) dbUpdates.daily_consumption = updates.dailyConsumption;
      if (updates.minStock !== undefined) dbUpdates.min_stock = updates.minStock;
      if (updates.usageInterval !== undefined) dbUpdates.usage_interval = updates.usageInterval;

      const { error } = await supabase
        .from("consumables")
        .update(dbUpdates)
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setConsumables((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
    } catch (error: any) {
      console.error("Error updating consumable:", error);
    }
  };

  const removeConsumable = async (id: string) => {
    if (!user) {
      setConsumables((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from("consumables")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setConsumables((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error("Error removing consumable:", error);
    }
  };

  const clearConsumables = () => {
    setConsumables([]);
  };

  const setConsumablesBulk = async (items: Omit<ConsumableItem, "id">[]) => {
    if (!user) {
      const withIds = items.map((item) => ({ ...item, id: crypto.randomUUID() }));
      setConsumables((prev) => [...prev, ...withIds]);
      return;
    }

    try {
      const dbItems = items.map(item => ({
        user_id: user.id,
        name: item.name,
        icon: item.icon,
        category: item.category,
        current_stock: item.currentStock,
        unit: item.unit,
        daily_consumption: item.dailyConsumption,
        min_stock: item.minStock,
        usage_interval: (item as any).usageInterval || (item as any).usageType || "daily"
      }));

      // Use upsert to prevent duplicates if onboarding is re-run
      const { data, error } = await supabase
        .from("consumables")
        .upsert(dbItems, { onConflict: 'user_id,name' }) 
        .select();

      if (error) throw error;

      const withIds: ConsumableItem[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        category: (item.category as ConsumableCategory) || "other",
        currentStock: Number(item.current_stock) || 0,
        unit: item.unit || "unidades",
        dailyConsumption: Number(item.daily_consumption) || 0,
        minStock: Number(item.min_stock) || 0,
        usageInterval: (item.usage_interval as any) || "daily"
      }));

      setConsumables(withIds); // Replace with cloud state
    } catch (error: any) {
      console.error("Error setting consumables bulk:", error);
    }
  };

  const markAllShoppingComplete = async () => {
    const pending = shoppingList.filter((i) => !i.isCompleted);
    for (const item of pending) {
      await toggleShoppingItem(item.id);
    }
  };

  const clearAllShoppingList = async () => {
    if (!user) {
      setShoppingList([]);
      return;
    }
    try {
      const { error } = await supabase
        .from("shopping_items")
        .delete()
        .eq("user_id", user.id);
      if (error) throw error;
      setShoppingList([]);
    } catch (error: any) {
      console.error("Error clearing shopping list:", error);
      setShoppingList([]);
    }
  };

  const addItem = async (item: Omit<FriggoItem, "id">) => {
    if (!user) {
      // For demo mode, add locally
      const newItem = { ...item, id: crypto.randomUUID() };
      setItems((prev) => [...prev, newItem]);
      addItemHistory(
        newItem.id,
        newItem.name,
        "added",
        newItem.quantity,
        newItem.unit
      );
      return;
    }

    try {
      const { data, error } = await supabase
        .from("items")
        .insert({
          user_id: user.id,
          name: item.name,
          category: item.category,
          location: item.location,
          quantity: item.quantity,
          unit: item.unit,
          expiry_date: item.expirationDate
            ? item.expirationDate.toISOString().split("T")[0]
            : null,
          opened_date: item.openedDate
            ? item.openedDate.toISOString().split("T")[0]
            : null,
          min_stock: item.minStock,
          maturation: item.maturation
        })
        .select()
        .single();

      if (error) throw error;

      const newCategory = VALID_CATEGORIES.includes(
        data.category as ItemCategory
      )
        ? (data.category as ItemCategory)
        : "pantry";
      const newLocation = VALID_LOCATIONS.includes(
        data.location as ItemLocation
      )
        ? (data.location as ItemLocation)
        : "fridge";

      const newItem: FriggoItem = {
        id: data.id,
        name: data.name,
        category: newCategory,
        location: newLocation,
        quantity: data.quantity || 1,
        unit: data.unit || "unidades",
        addedDate: new Date(data.created_at || Date.now()),
        expirationDate: data.expiry_date
          ? new Date(data.expiry_date)
          : undefined,
        openedDate: data.opened_date ? new Date(data.opened_date) : undefined,
        minStock: data.min_stock || undefined,
        maturation: (data.maturation as MaturationLevel) || undefined
      };

      setItems((prev) => [newItem, ...prev]);
      addItemHistory(
        newItem.id,
        newItem.name,
        "added",
        newItem.quantity,
        newItem.unit
      );
    } catch (error: any) {
      console.error("Error adding item:", error);
      if (error.message?.includes("JWT expired") || error.code === "PGRST303") {
        // Fallback to local mode for this item
        const newItem = { ...item, id: crypto.randomUUID() };
        setItems((prev) => [newItem, ...prev]);
        toast({
          title: "Sessão expirada",
          description:
            "Sua sessão expirou. O item foi adicionado localmente para teste, mas não foi salvo no servidor.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao adicionar item",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const updateItem = async (id: string, updates: Partial<FriggoItem>) => {
    if (!user || id.startsWith("demo-")) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
      return;
    }

    try {
      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.category !== undefined)
        updateData.category = updates.category;
      if (updates.location !== undefined)
        updateData.location = updates.location;
      if (updates.quantity !== undefined)
        updateData.quantity = updates.quantity;
      if (updates.unit !== undefined) updateData.unit = updates.unit;
      if (updates.expirationDate !== undefined) {
        updateData.expiry_date = updates.expirationDate
          ? updates.expirationDate.toISOString().split("T")[0]
          : null;
      }
      if (updates.openedDate !== undefined) {
        updateData.opened_date = updates.openedDate
          ? updates.openedDate.toISOString().split("T")[0]
          : null;
      }
      if (updates.minStock !== undefined)
        updateData.min_stock = updates.minStock;
      if (updates.maturation !== undefined)
        updateData.maturation = updates.maturation;

      const { error } = await supabase
        .from("items")
        .update(updateData)
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
    } catch (error: any) {
      console.error("Error updating item:", error);
      if (error.message?.includes("JWT expired") || error.code === "PGRST303") {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
        toast({
          title: "Sessão expirada",
          description:
            "Sua sessão expirou. As alterações foram aplicadas localmente, mas não salvas no servidor.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao atualizar item",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const removeItem = async (id: string) => {
    if (!user || id.startsWith("demo-")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from("items")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error("Error removing item:", error);
      toast({
        title: "Erro ao remover item",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const addToShoppingList = async (
    item: Omit<ShoppingItem, "id" | "isCompleted">
  ) => {
    if (!user) {
      setShoppingList((prev) => [
        ...prev,
        { ...item, id: crypto.randomUUID(), isCompleted: false }
      ]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("shopping_items")
        .insert({
          user_id: user.id,
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          category: item.category,
          checked: false
        })
        .select()
        .single();

      if (error) throw error;

      const addedCategory = VALID_CATEGORIES.includes(
        data.category as ItemCategory
      )
        ? (data.category as ItemCategory)
        : "pantry";

      const storeFromCategory: Record<string, "market" | "fair" | "pharmacy"> =
      {
        hygiene: "pharmacy",
        cleaning: "market",
        fruit: "fair",
        vegetable: "fair"
      };

      setShoppingList((prev) => [
        ...prev,
        {
          id: data.id,
          name: data.name,
          quantity: data.quantity || 1,
          unit: data.unit || "unidades",
          category: addedCategory,
          isCompleted: data.checked || false,
          store: storeFromCategory[data.category] || "market"
        }
      ]);
    } catch (error: any) {
      console.error("Error adding shopping item:", error);
      if (error.message?.includes("JWT expired") || error.code === "PGRST303") {
        setShoppingList((prev) => [
          ...prev,
          { ...item, id: crypto.randomUUID(), isCompleted: false }
        ]);
        toast({
          title: "Sessão expirada",
          description:
            "Sua sessão expirou. O item foi adicionado à lista localmente.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao adicionar item",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const toggleShoppingItem = async (id: string) => {
    const item = shoppingList.find((i) => i.id === id);
    if (!item) return;

    if (!user) {
      setShoppingList((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, isCompleted: !i.isCompleted } : i
        )
      );
      return;
    }

    try {
      const { error } = await supabase
        .from("shopping_items")
        .update({ checked: !item.isCompleted })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setShoppingList((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, isCompleted: !i.isCompleted } : i
        )
      );
    } catch (error: any) {
      console.error("Error toggling shopping item:", error);
      if (error.message?.includes("JWT expired") || error.code === "PGRST303") {
        setShoppingList((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, isCompleted: !i.isCompleted } : i
          )
        );
        toast({
          title: "Sessão expirada",
          description:
            "Sua sessão expirou. A alteração foi aplicada localmente.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao atualizar item",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const removeFromShoppingList = async (id: string) => {
    if (!user) {
      setShoppingList((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from("shopping_items")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setShoppingList((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error("Error removing shopping item:", error);
      if (error.message?.includes("JWT expired") || error.code === "PGRST303") {
        setShoppingList((prev) => prev.filter((item) => item.id !== id));
        toast({
          title: "Sessão expirada",
          description: "Sua sessão expirou. O item foi removido localmente.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao remover item",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const updateShoppingItemQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    if (!user) {
      setShoppingList((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
      return;
    }

    try {
      const { error } = await supabase
        .from("shopping_items")
        .update({ quantity })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setShoppingList((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    } catch (error: any) {
      console.error("Error updating shopping item quantity:", error);
      if (error.message?.includes("JWT expired") || error.code === "PGRST303") {
        setShoppingList((prev) =>
          prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
        toast({
          title: "Sessão expirada",
          description:
            "Sua sessão expirou. A quantidade foi atualizada localmente.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao atualizar quantidade",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const completeOnboarding = async (data: OnboardingData) => {
    if (!user) {
      persistNotificationPrefs(data.notificationPrefs);
      setOnboardingData(createDefaultOnboardingData(data));
      return;
    }

    try {
      // Pre-validate CPF uniqueness to provide a friendlier message and avoid
      // hitting the DB constraint in a Promise.all race.
      const rawCpf = String(data.cpf || "").replace(/\D/g, "");
      if (rawCpf.length > 0) {
        const { data: existingCpf } = await supabase
          .from("profile_sensitive")
          .select("user_id")
          .eq("cpf", rawCpf)
          .maybeSingle();
        if (existingCpf && existingCpf.user_id !== user.id) {
          const msg = language === "pt-BR"
            ? "Este CPF já está cadastrado em outra conta. Por favor, verifique."
            : "This CPF is already registered with another account.";
          toast({ title: "CPF Duplicado", description: msg, variant: "destructive" });
          throw new Error(msg);
        }
      }

      // Split onboarding data across separate secure tables. Use onConflict for
      // profile_sensitive so we update the row for this user instead of inserting
      // a new row that could violate UNIQUE(user_id) or UNIQUE(cpf).
      const results = await Promise.all([
        supabase.from("profiles").upsert({
          user_id: user.id,
          name: data.name,
          avatar_url: data.avatarUrl,
          onboarding_completed: true
        }),
        supabase.from("profile_settings").upsert({
          user_id: user.id,
          home_type: data.homeType || "apartment",
          residents: data.residents || 1,
          fridge_type: data.fridgeType || "regular",
          fridge_brand: data.fridgeBrand || "",
          cooling_level: data.coolingLevel || 3,
          habits: data.habits || [],
          notification_prefs: data.notificationPrefs || []
        }),
        supabase.from("profile_sensitive").upsert(
          { user_id: user.id, cpf: rawCpf.length > 0 ? rawCpf : null },
          { onConflict: "user_id" }
        )
      ]);

      const error = results.find(r => r.error)?.error;
      if (error) throw error;

      setOnboardingCompleted(true);
      persistNotificationPrefs(data.notificationPrefs, user.id);
      setOnboardingData(createDefaultOnboardingData(data, user.id));
    } catch (error: any) {
      console.error("Error completing onboarding:", error);
      
      // Handle unique constraint violation for CPF (Supabase error 23505)
      if (error.code === "23505" || error.message?.includes("profiles_cpf_key") || error.message?.includes("profile_sensitive_cpf_key")) {
        const msg = language === "pt-BR" 
          ? "Este CPF já está cadastrado em outra conta. Por favor, verifique."
          : "This CPF is already registered with another account.";
        toast({ title: "CPF Duplicado", description: msg, variant: "destructive" });
        throw new Error(msg); // Rethrow to allow UI to handle navigation back to CPF step
      }

      if (error.message?.includes("JWT expired") || error.code === "PGRST303") {
        persistNotificationPrefs(data.notificationPrefs, user.id);
        setOnboardingData(createDefaultOnboardingData(data, user.id));
        toast({
          title: "Sessão expirada",
          description: "Sua sessão expirou. O perfil foi salvo localmente.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao salvar perfil",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const resetOnboarding = async () => {
    if (user) {
      try {
        await supabase
          .from("profiles")
          .update({ onboarding_completed: false })
          .eq("user_id", user.id);
      } catch (error: any) {
        console.error("Error resetting onboarding:", error);
      }
    }
    persistNotificationPrefs(undefined, user?.id);
    setOnboardingData(createDefaultOnboardingData({}, user?.id));
  };

  const updateProfile = async (data: Partial<OnboardingData>) => {
    if (!user) {
      setOnboardingData((prev) => {
        const next = createDefaultOnboardingData({ ...(prev ?? {}), ...data });
        persistNotificationPrefs(next.notificationPrefs);
        return next;
      });
      return;
    }

    try {
      const profileUpdates: any = { user_id: user.id };
      const settingsUpdates: any = { user_id: user.id };
      const sensitiveUpdates: any = { user_id: user.id };
      
      let hasProfile = false;
      let hasSettings = false;
      let hasSensitive = false;

      if (data.name !== undefined) { profileUpdates.name = data.name; hasProfile = true; }
      if (data.avatarUrl !== undefined) { profileUpdates.avatar_url = data.avatarUrl; hasProfile = true; }
      
      if (data.homeType !== undefined) { settingsUpdates.home_type = data.homeType; hasSettings = true; }
      if (data.residents !== undefined) { settingsUpdates.residents = data.residents; hasSettings = true; }
      if (data.fridgeType !== undefined) { settingsUpdates.fridge_type = data.fridgeType; hasSettings = true; }
      if (data.fridgeBrand !== undefined) { settingsUpdates.fridge_brand = data.fridgeBrand; hasSettings = true; }
      if (data.habits !== undefined) { settingsUpdates.habits = data.habits; hasSettings = true; }
      if (data.hiddenSections !== undefined) { settingsUpdates.hidden_sections = data.hiddenSections; hasSettings = true; }
      if (data.coolingLevel !== undefined) { settingsUpdates.cooling_level = data.coolingLevel; hasSettings = true; }
      if (data.notificationPrefs !== undefined) { settingsUpdates.notification_prefs = data.notificationPrefs; hasSettings = true; }

      if ((data as any).cpf !== undefined) {
        // Do not allow overwriting CPF once it's been set for this user.
        // CPF is stored in `profile_sensitive`; if onboardingData already
        // contains a CPF we ignore attempts to change it from the client.
        if (!onboardingData?.cpf) {
          const raw = String((data as any).cpf || "").replace(/\D/g, "");
          // Pre-check for duplicate CPF used by another account
          if (raw.length > 0) {
            const { data: existing } = await supabase
              .from("profile_sensitive")
              .select("user_id")
              .eq("cpf", raw)
              .maybeSingle();
            if (existing && existing.user_id !== user.id) {
              const msg = language === "pt-BR"
                ? "Este CPF já está cadastrado em outra conta. Por favor, verifique."
                : "This CPF is already registered with another account.";
              toast({ title: "CPF Duplicado", description: msg, variant: "destructive" });
              throw new Error(msg);
            }
          }
          sensitiveUpdates.cpf = raw.length > 0 ? raw : null;
          hasSensitive = true;
        }
      }

      const promises = [];
      if (hasProfile) promises.push(supabase.from("profiles").upsert(profileUpdates));
      if (hasSettings) promises.push(supabase.from("profile_settings").upsert(settingsUpdates));
      if (hasSensitive) promises.push(supabase.from("profile_sensitive").upsert(sensitiveUpdates));

      const results = await Promise.all(promises);
      const error = results.find(r => r.error)?.error;

      if (error) throw error;
      
      toast({
        title: language === "pt-BR" ? "Perfil atualizado" : "Profile updated",
        description: language === "pt-BR" ? "Suas alterações foram salvas com sucesso." : "Your changes have been saved successfully."
      });

      setOnboardingData((prev) => {
        const next = createDefaultOnboardingData(
          { ...(prev ?? {}), ...data },
          user.id
        );
        persistNotificationPrefs(next.notificationPrefs, user.id);
        return next;
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const addItemHistory = (
    itemId: string,
    itemName: string,
    action: "added" | "consumed" | "cooked" | "discarded",
    quantity: number,
    unit?: string
  ) => {
    setItemHistory((prev) => [
      ...prev,
      {
        itemId,
        itemName,
        action,
        quantity,
        unit,
        timestamp: new Date(),
        user: onboardingData?.name || "Usuário"
      }
    ]);
  };

  const refreshData = async () => {
    await fetchData();
  };

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData((prev) => {
      const next = prev ? { ...prev, ...data } : null;
      if (next) persistNotificationPrefs(next.notificationPrefs, user?.id);
      return next;
    });

    // Auto-save: delegate to `updateProfile` which knows how to split
    // data across `profiles`, `profile_settings` and `profile_sensitive`.
    if (user) {
      updateProfile(data).catch((err) => console.error("Error auto-saving onboarding data:", err));
    }
  };

  return (
    <FriggoContext.Provider
      value={{
        items,
        shoppingList,
        consumables,
        defrostTimers,
        alerts,
        onboardingData,
        isOnboarded: onboarding_completed,
        onboarding_completed,
        itemHistory,
        loading,
        addItem,
        updateItem,
        removeItem,
        addToShoppingList,
        toggleShoppingItem,
        removeFromShoppingList,
        updateShoppingItemQuantity,
        addConsumable,
        updateConsumable,
        removeConsumable,
        clearConsumables,
        setConsumablesBulk,
        markAllShoppingComplete,
        clearAllShoppingList,
        completeOnboarding,
        resetOnboarding,
        updateProfile,
        updateOnboardingData,
        defrostItem,
        dismissAlert,
        addItemHistory,
        toggleSection: async (id: string) => {
          if (!onboardingData) return;
          const currentHidden = onboardingData.hiddenSections || [];
          const newHidden = currentHidden.includes(id)
            ? currentHidden.filter(x => x !== id)
            : [...currentHidden, id];
          
          await updateProfile({ hiddenSections: newHidden });
        },
        isSectionHidden: (id: string) => onboardingData?.hiddenSections?.includes(id) || false,
        refreshData,
        // Recipe & Planner
        favoriteRecipes,
        mealPlan,
        toggleFavoriteRecipe: async (recipeId: string) => {
          if (!user) return;
          const isFav = favoriteRecipes.includes(recipeId);
          
          try {
            if (isFav) {
              await supabase
                .from("recipe_favorites")
                .delete()
                .eq("user_id", user.id)
                .eq("recipe_id", recipeId);
              setFavoriteRecipes(prev => prev.filter(id => id !== recipeId));
            } else {
              await supabase
                .from("recipe_favorites")
                .insert({ user_id: user.id, recipe_id: recipeId });
              setFavoriteRecipes(prev => [...prev, recipeId]);
            }
          } catch (err) {
            console.error("Error toggling favorite:", err);
          }
        },
        addToMealPlan: async (entry) => {
          if (!user) return;
          try {
            const { data, error } = await supabase
              .from("meal_plan")
              .insert({ ...entry, user_id: user.id })
              .select()
              .single();
            
            if (error) throw error;
            if (data) {
              setMealPlan(prev => [...prev, {
                id: data.id,
                recipe_id: data.recipe_id,
                recipe_name: data.recipe_name,
                planned_date: data.planned_date,
                meal_type: data.meal_type as any
              }]);
              toast({ title: "Agendado!", description: "Refeição adicionada ao seu plano." });
            }
          } catch (err) {
            console.error("Error adding to meal plan:", err);
          }
        },
        removeFromMealPlan: async (id) => {
          if (!user) return;
          try {
            await supabase.from("meal_plan").delete().eq("id", id);
            setMealPlan(prev => prev.filter(p => p.id !== id));
          } catch (err) {
            console.error("Error removing from meal plan:", err);
          }
        }
      }}
    >
      {children}
    </FriggoContext.Provider>
  );
}

export function useFriggo() {
  const context = useContext(FriggoContext);
  if (!context) {
    throw new Error("useFriggo must be used within a FriggoProvider");
  }
  return context;
}
