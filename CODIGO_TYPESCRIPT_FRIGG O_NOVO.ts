// ============================================================
// CÓDIGO TYPESCRIPT FRIGGO - NOVO CONTEXTO COM SUPABASE
// Copie e cole isto no seu projeto React
// ============================================================

// ============================================================
// 1. TIPOS (src/types/friggo-v2.ts)
// ============================================================

export interface Profile {
  id: string;
  user_id: string;
  name: string | null;
  cpf: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Home {
  id: string;
  owner_user_id: string;
  name: string;
  home_type: 'apartment' | 'house';
  address: string | null;
  residents: number;
  created_at: string;
  updated_at: string;
}

export interface HomeRole {
  id: string;
  home_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joined_at: string;
}

export interface HomeSettings {
  id: string;
  home_id: string;
  fridge_type: 'regular' | 'smart';
  fridge_brand: string | null;
  cooling_level: number;
  habits: string[];
  notification_prefs: string[];
  hidden_sections: string[];
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: string;
  home_id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  unit: string;
  expiry_date: string | null;
  opened_date: string | null;
  maturation: string;
  min_stock: number | null;
  image_url: string | null;
  added_by_user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Consumable {
  id: string;
  home_id: string;
  name: string;
  icon: string;
  category: string;
  current_stock: number;
  unit: string;
  daily_consumption: number;
  min_stock: number;
  usage_interval: string;
  auto_add_to_shopping: boolean;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: string;
  home_id: string;
  name: string;
  description: string | null;
  ingredients: any[];
  instructions: string[] | null;
  type: string | null;
  category: string | null;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  difficulty: string | null;
  image_url: string | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface MealPlan {
  id: string;
  home_id: string;
  recipe_id: string | null;
  recipe_name: string;
  planned_date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  created_by_user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ShoppingItem {
  id: string;
  home_id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  checked: boolean;
  checked_by_user_id: string | null;
  checked_at: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'basic' | 'standard' | 'premium';
  items_limit: number;
  recipes_per_day: number;
  shopping_list_limit: number;
  started_at: string;
  expires_at: string | null;
  is_active: boolean;
  payment_provider: string | null;
  payment_id: string | null;
  cakto_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================
// 2. SERVIÇO DE PAGAMENTO COM CAKTO (src/services/caktoPayment.ts)
// ============================================================

export class CaktoPaymentService {
  private apiKey: string;
  private baseUrl = 'https://api.cakto.com.br/v1'; // Ou seu endpoint Cakto

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Procura um cliente pelo CPF e retorna suas assinaturas/pagamentos
   */
  async getCustomerByCPF(cpf: string) {
    const cleanCPF = cpf.replace(/\D/g, '');

    try {
      const response = await fetch(
        `${this.baseUrl}/customers?cpf=${cleanCPF}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Cakto API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching customer from Cakto:', error);
      throw error;
    }
  }

  /**
   * Cria uma assinatura no Cakto
   */
  async createSubscription(
    cpf: string,
    email: string,
    name: string,
    planId: string,
    paymentMethod: 'credit_card' | 'pix' | 'boleto'
  ) {
    const cleanCPF = cpf.replace(/\D/g, '');

    try {
      const response = await fetch(`${this.baseUrl}/subscriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: {
            cpf: cleanCPF,
            email,
            name
          },
          plan_id: planId,
          payment_method: paymentMethod
        })
      });

      if (!response.ok) {
        throw new Error(`Cakto API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating subscription on Cakto:', error);
      throw error;
    }
  }

  /**
   * Busca status de uma assinatura
   */
  async getSubscriptionStatus(subscriptionId: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/subscriptions/${subscriptionId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Cakto API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching subscription from Cakto:', error);
      throw error;
    }
  }

  /**
   * Cancela uma assinatura
   */
  async cancelSubscription(subscriptionId: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/subscriptions/${subscriptionId}/cancel`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Cakto API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error canceling subscription on Cakto:', error);
      throw error;
    }
  }
}

// ============================================================
// 3. CONTEXTO FRIGGO V2 (src/contexts/FriggoContextV2.tsx)
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { CaktoPaymentService } from '@/services/caktoPayment';

interface FriggoContextV2Type {
  // Estado
  homeId: string | null;
  homeData: Home | null;
  homeSettings: HomeSettings | null;
  profile: Profile | null;
  subscription: Subscription | null;
  items: Item[];
  consumables: Consumable[];
  recipes: Recipe[];
  mealPlan: MealPlan[];
  shoppingItems: ShoppingItem[];
  loading: boolean;

  // Ações
  loadHomeData: (homeId: string) => Promise<void>;
  addItem: (item: Omit<Item, 'id' | 'home_id' | 'created_at' | 'updated_at'>) => Promise<Item>;
  updateItem: (itemId: string, updates: Partial<Item>) => Promise<void>;
  deleteItem: (itemId: string) => Promise<void>;

  addConsumable: (consumable: Omit<Consumable, 'id' | 'home_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateConsumable: (consumableId: string, updates: Partial<Consumable>) => Promise<void>;
  deleteConsumable: (consumableId: string) => Promise<void>;

  addRecipe: (recipe: Omit<Recipe, 'id' | 'home_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateRecipe: (recipeId: string, updates: Partial<Recipe>) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  toggleFavoriteRecipe: (recipeId: string) => Promise<void>;

  addMealPlan: (mealPlan: Omit<MealPlan, 'id' | 'home_id' | 'created_at' | 'updated_at' | 'created_by_user_id'>) => Promise<void>;
  deleteMealPlan: (mealPlanId: string) => Promise<void>;

  addShoppingItem: (item: Omit<ShoppingItem, 'id' | 'home_id' | 'created_at'>) => Promise<void>;
  toggleShoppingItem: (itemId: string, checked: boolean) => Promise<void>;
  deleteShoppingItem: (itemId: string) => Promise<void>;

  // Pagamentos
  syncPaymentFromCakto: (cpf: string) => Promise<void>;
  upgradeSubscription: (planId: string, paymentMethod: 'credit_card' | 'pix' | 'boleto') => Promise<void>;
}

const FriggoContextV2 = createContext<FriggoContextV2Type | undefined>(undefined);

export function FriggoProviderV2({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [homeId, setHomeId] = useState<string | null>(null);
  const [homeData, setHomeData] = useState<Home | null>(null);
  const [homeSettings, setHomeSettings] = useState<HomeSettings | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [consumables, setConsumables] = useState<Consumable[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const caktoService = new CaktoPaymentService(
    import.meta.env.VITE_CAKTO_API_KEY || ''
  );

  // Carregar dados iniciais
  useEffect(() => {
    const initializeUser = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Carregar profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData as Profile);
        }

        // 2. Carregar primeira casa (padrão)
        const { data: homeMembers } = await supabase
          .from('home_members')
          .select('home_id')
          .eq('user_id', user.id)
          .order('joined_at', { ascending: true })
          .limit(1);

        if (homeMembers && homeMembers.length > 0) {
          const primaryHomeId = homeMembers[0].home_id;
          setHomeId(primaryHomeId);
          await loadHomeData(primaryHomeId);
        }

        // 3. Carregar subscription
        const { data: subscriptionData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (subscriptionData) {
          setSubscription(subscriptionData as Subscription);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
        toast({
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar seus dados. Tente novamente.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [user]);

  // Carregar dados de uma casa específica
  const loadHomeData = useCallback(async (hId: string) => {
    try {
      // 1. Carregar home data
      const { data: home } = await supabase
        .from('homes')
        .select('*')
        .eq('id', hId)
        .single();

      if (home) {
        setHomeData(home as Home);
      }

      // 2. Carregar home settings
      const { data: settings } = await supabase
        .from('home_settings')
        .select('*')
        .eq('home_id', hId)
        .single();

      if (settings) {
        setHomeSettings(settings as HomeSettings);
      }

      // 3. Carregar items
      const { data: itemsData } = await supabase
        .from('items')
        .select('*')
        .eq('home_id', hId);

      if (itemsData) {
        setItems(itemsData as Item[]);
      }

      // 4. Carregar consumables
      const { data: consumablesData } = await supabase
        .from('consumables')
        .select('*')
        .eq('home_id', hId);

      if (consumablesData) {
        setConsumables(consumablesData as Consumable[]);
      }

      // 5. Carregar recipes
      const { data: recipesData } = await supabase
        .from('recipes')
        .select('*')
        .eq('home_id', hId);

      if (recipesData) {
        setRecipes(recipesData as Recipe[]);
      }

      // 6. Carregar meal plans
      const { data: mealPlanData } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('home_id', hId)
        .order('planned_date', { ascending: true });

      if (mealPlanData) {
        setMealPlan(mealPlanData as MealPlan[]);
      }

      // 7. Carregar shopping items
      const { data: shoppingData } = await supabase
        .from('shopping_items')
        .select('*')
        .eq('home_id', hId)
        .order('created_at', { ascending: false });

      if (shoppingData) {
        setShoppingItems(shoppingData as ShoppingItem[]);
      }
    } catch (error) {
      console.error('Error loading home data:', error);
      toast({
        title: 'Erro ao carregar casa',
        description: 'Não foi possível carregar os dados da casa.',
        variant: 'destructive'
      });
    }
  }, [toast]);

  // ===== ITEMS =====
  const addItem = async (item: Omit<Item, 'id' | 'home_id' | 'created_at' | 'updated_at'>) => {
    if (!homeId || !user) throw new Error('No home or user');

    const { data, error } = await supabase
      .from('items')
      .insert({
        home_id: homeId,
        added_by_user_id: user.id,
        ...item
      })
      .select()
      .single();

    if (error) throw error;

    setItems((prev) => [data as Item, ...prev]);
    return data as Item;
  };

  const updateItem = async (itemId: string, updates: Partial<Item>) => {
    if (!homeId) throw new Error('No home');

    const { error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', itemId)
      .eq('home_id', homeId);

    if (error) throw error;

    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, ...updates } : i))
    );
  };

  const deleteItem = async (itemId: string) => {
    if (!homeId) throw new Error('No home');

    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', itemId)
      .eq('home_id', homeId);

    if (error) throw error;

    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // ===== CONSUMABLES =====
  const addConsumable = async (
    consumable: Omit<Consumable, 'id' | 'home_id' | 'created_at' | 'updated_at'>
  ) => {
    if (!homeId) throw new Error('No home');

    const { data, error } = await supabase
      .from('consumables')
      .insert({
        home_id: homeId,
        ...consumable
      })
      .select()
      .single();

    if (error) throw error;

    setConsumables((prev) => [...prev, data as Consumable]);
  };

  const updateConsumable = async (
    consumableId: string,
    updates: Partial<Consumable>
  ) => {
    if (!homeId) throw new Error('No home');

    const { error } = await supabase
      .from('consumables')
      .update(updates)
      .eq('id', consumableId)
      .eq('home_id', homeId);

    if (error) throw error;

    setConsumables((prev) =>
      prev.map((c) => (c.id === consumableId ? { ...c, ...updates } : c))
    );
  };

  const deleteConsumable = async (consumableId: string) => {
    if (!homeId) throw new Error('No home');

    const { error } = await supabase
      .from('consumables')
      .delete()
      .eq('id', consumableId)
      .eq('home_id', homeId);

    if (error) throw error;

    setConsumables((prev) => prev.filter((c) => c.id !== consumableId));
  };

  // ===== RECIPES =====
  const addRecipe = async (
    recipe: Omit<Recipe, 'id' | 'home_id' | 'created_at' | 'updated_at'>
  ) => {
    if (!homeId) throw new Error('No home');

    const { data, error } = await supabase
      .from('recipes')
      .insert({
        home_id: homeId,
        ...recipe
      })
      .select()
      .single();

    if (error) throw error;

    setRecipes((prev) => [...prev, data as Recipe]);
  };

  const updateRecipe = async (recipeId: string, updates: Partial<Recipe>) => {
    if (!homeId) throw new Error('No home');

    const { error } = await supabase
      .from('recipes')
      .update(updates)
      .eq('id', recipeId)
      .eq('home_id', homeId);

    if (error) throw error;

    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, ...updates } : r))
    );
  };

  const deleteRecipe = async (recipeId: string) => {
    if (!homeId) throw new Error('No home');

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipeId)
      .eq('home_id', homeId);

    if (error) throw error;

    setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
  };

  const toggleFavoriteRecipe = async (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe || !homeId) return;

    await updateRecipe(recipeId, { is_favorite: !recipe.is_favorite });
  };

  // ===== MEAL PLANS =====
  const addMealPlan = async (
    mealPlan: Omit<
      MealPlan,
      'id' | 'home_id' | 'created_at' | 'updated_at' | 'created_by_user_id'
    >
  ) => {
    if (!homeId || !user) throw new Error('No home or user');

    const { data, error } = await supabase
      .from('meal_plans')
      .insert({
        home_id: homeId,
        created_by_user_id: user.id,
        ...mealPlan
      })
      .select()
      .single();

    if (error) throw error;

    setMealPlan((prev) => [...prev, data as MealPlan]);
  };

  const deleteMealPlan = async (mealPlanId: string) => {
    if (!homeId) throw new Error('No home');

    const { error } = await supabase
      .from('meal_plans')
      .delete()
      .eq('id', mealPlanId)
      .eq('home_id', homeId);

    if (error) throw error;

    setMealPlan((prev) => prev.filter((m) => m.id !== mealPlanId));
  };

  // ===== SHOPPING ITEMS =====
  const addShoppingItem = async (
    item: Omit<ShoppingItem, 'id' | 'home_id' | 'created_at'>
  ) => {
    if (!homeId) throw new Error('No home');

    const { data, error } = await supabase
      .from('shopping_items')
      .insert({
        home_id: homeId,
        ...item
      })
      .select()
      .single();

    if (error) throw error;

    setShoppingItems((prev) => [...prev, data as ShoppingItem]);
  };

  const toggleShoppingItem = async (itemId: string, checked: boolean) => {
    if (!homeId || !user) throw new Error('No home or user');

    const { error } = await supabase
      .from('shopping_items')
      .update({
        checked,
        checked_by_user_id: user.id,
        checked_at: checked ? new Date().toISOString() : null
      })
      .eq('id', itemId)
      .eq('home_id', homeId);

    if (error) throw error;

    setShoppingItems((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? {
              ...i,
              checked,
              checked_by_user_id: user.id,
              checked_at: checked ? new Date().toISOString() : null
            }
          : i
      )
    );
  };

  const deleteShoppingItem = async (itemId: string) => {
    if (!homeId) throw new Error('No home');

    const { error } = await supabase
      .from('shopping_items')
      .delete()
      .eq('id', itemId)
      .eq('home_id', homeId);

    if (error) throw error;

    setShoppingItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // ===== PAGAMENTOS (CAKTO) =====
  const syncPaymentFromCakto = async (cpf: string) => {
    if (!user) throw new Error('No user');

    try {
      const customerData = await caktoService.getCustomerByCPF(cpf);

      if (customerData && customerData.subscriptions) {
        const latestSubscription = customerData.subscriptions[0];

        // Atualizar subscription no Supabase
        const { error } = await supabase
          .from('subscriptions')
          .update({
            cakto_subscription_id: latestSubscription.id,
            plan: latestSubscription.plan || 'free',
            is_active: latestSubscription.status === 'active',
            payment_id: latestSubscription.payment_id,
            payment_provider: 'cakto'
          })
          .eq('user_id', user.id);

        if (error) throw error;

        // Recarregar subscription
        const { data: newSubscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (newSubscription) {
          setSubscription(newSubscription as Subscription);
        }

        toast({
          title: 'Pagamento sincronizado',
          description: 'Seu plano foi atualizado com sucesso.',
          variant: 'default'
        });
      }
    } catch (error) {
      console.error('Error syncing payment:', error);
      toast({
        title: 'Erro ao sincronizar pagamento',
        description: 'Não foi possível sincronizar seu pagamento do Cakto.',
        variant: 'destructive'
      });
    }
  };

  const upgradeSubscription = async (
    planId: string,
    paymentMethod: 'credit_card' | 'pix' | 'boleto'
  ) => {
    if (!user || !profile) throw new Error('No user or profile');

    try {
      const caktoSubscription = await caktoService.createSubscription(
        profile.cpf || '',
        user.email || '',
        profile.name || 'Usuário',
        planId,
        paymentMethod
      );

      // Atualizar subscription no Supabase
      const { error } = await supabase
        .from('subscriptions')
        .update({
          cakto_subscription_id: caktoSubscription.id,
          plan: caktoSubscription.plan,
          is_active: caktoSubscription.status === 'active',
          payment_id: caktoSubscription.payment_id,
          payment_provider: 'cakto'
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Recarregar subscription
      const { data: newSubscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (newSubscription) {
        setSubscription(newSubscription as Subscription);
      }

      toast({
        title: 'Plano atualizado',
        description: 'Seu novo plano foi ativado com sucesso.',
        variant: 'default'
      });
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      toast({
        title: 'Erro ao atualizar plano',
        description: 'Não foi possível processar sua assinatura.',
        variant: 'destructive'
      });
    }
  };

  return (
    <FriggoContextV2.Provider
      value={{
        homeId,
        homeData,
        homeSettings,
        profile,
        subscription,
        items,
        consumables,
        recipes,
        mealPlan,
        shoppingItems,
        loading,
        loadHomeData,
        addItem,
        updateItem,
        deleteItem,
        addConsumable,
        updateConsumable,
        deleteConsumable,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavoriteRecipe,
        addMealPlan,
        deleteMealPlan,
        addShoppingItem,
        toggleShoppingItem,
        deleteShoppingItem,
        syncPaymentFromCakto,
        upgradeSubscription
      }}
    >
      {children}
    </FriggoContextV2.Provider>
  );
}

export function useFriggoV2() {
  const context = useContext(FriggoContextV2);
  if (!context) {
    throw new Error('useFriggoV2 must be used within FriggoProviderV2');
  }
  return context;
}

// ============================================================
// 4. HOOK PARA SINCRONIZAR CPF COM CAKTO
// src/hooks/useSyncCaktoPayment.ts
// ============================================================

export function useSyncCaktoPayment() {
  const { profile, syncPaymentFromCakto } = useFriggoV2();

  const syncWithCakto = useCallback(async () => {
    if (!profile || !profile.cpf) {
      console.warn('No CPF available for payment sync');
      return;
    }

    try {
      await syncPaymentFromCakto(profile.cpf);
    } catch (error) {
      console.error('Error syncing with Cakto:', error);
    }
  }, [profile, syncPaymentFromCakto]);

  return { syncWithCakto };
}
