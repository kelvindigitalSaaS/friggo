/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { openExternalUrl } from "@/lib/nativeBrowser";
import { isNative } from "@/lib/capacitor";
import type { PlanTierEnum } from "@/integrations/supabase/types";
import { scheduleLocalNotification } from "@/lib/pushNotifications";

/** Plano interno da subscription (campo `plan` na tabela). Mantido para compat. */
export type SubscriptionPlan = "free" | "basic" | "standard" | "premium" | "individualPRO" | "multiPRO";

/** Tier efetivo do plano — o que o front deve usar para lógica de negócio. */
export type PlanTier = PlanTierEnum; // "free" | "individualPRO" | "multiPRO"

export interface PlanLimits {
  itemsLimit: number;
  recipesPerDay: number;
  shoppingListLimit: number;
  notificationChangeDays: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  planTier: PlanTier;
  groupId: string | null;
  price: number | null;
  itemsLimit: number;
  recipesPerDay: number;
  shoppingListLimit: number;
  notificationChangeDays: number;
  lastNotificationChange: Date | null;
  recipesUsedToday: number;
  lastRecipeReset: Date;
  startedAt: Date;
  expiresAt: Date | null;
  isActive: boolean;
  paymentProvider: string | null;
  paymentId: string | null;
  lastPaymentDate: Date | null;
  paymentMethod: string | null;
}

export const PLAN_DETAILS: Record<
  SubscriptionPlan,
  {
    name: string;
    price: number;
    itemsLimit: number;
    recipesPerDay: number;
    shoppingListLimit: number;
    notificationChangeDays: number;
    features: string[];
    tier: "simple" | "almost-premium" | "premium";
    planTier: PlanTier;
    maxAccounts: number;
  }
> = {
  free: {
    name: "Grátis",
    price: 0,
    itemsLimit: 5,
    recipesPerDay: 1,
    shoppingListLimit: 20,
    notificationChangeDays: 7,
    features: [
      "5 itens na geladeira",
      "1 receita por dia",
      "20 itens na lista"
    ],
    tier: "simple",
    planTier: "free",
    maxAccounts: 1
  },
  basic: {
    name: "Básico",
    price: 9.99,
    itemsLimit: 20,
    recipesPerDay: 1,
    shoppingListLimit: 40,
    notificationChangeDays: 7,
    features: [
      "20 itens na geladeira",
      "1 receita por dia",
      "40 itens na lista",
      "Alterar notificação 1x/semana"
    ],
    tier: "simple",
    planTier: "free",
    maxAccounts: 1
  },
  standard: {
    name: "Padrão",
    price: 19.99,
    itemsLimit: 60,
    recipesPerDay: 3,
    shoppingListLimit: 90,
    notificationChangeDays: 2,
    features: [
      "60 itens na geladeira",
      "3 receitas por dia",
      "90 itens na lista",
      "Alterar notificação a cada 2 dias"
    ],
    tier: "almost-premium",
    planTier: "free",
    maxAccounts: 1
  },
  /** Compat: usuários antigos com plan="premium" — mapeados para individualPRO */
  premium: {
    name: "individualPRO",
    price: 19.90,
    itemsLimit: -1,
    recipesPerDay: -1,
    shoppingListLimit: -1,
    notificationChangeDays: 0,
    features: [
      "1 conta",
      "Itens e receitas ilimitados",
      "Lista de compras ilimitada",
      "Alertas inteligentes sem restrição",
      "Planejador de refeições semanal",
      "Histórico completo de consumo"
    ],
    tier: "premium",
    planTier: "individualPRO",
    maxAccounts: 1
  },
  individualPRO: {
    name: "individualPRO",
    price: 19.90,
    itemsLimit: -1,
    recipesPerDay: -1,
    shoppingListLimit: -1,
    notificationChangeDays: 0,
    features: [
      "1 conta",
      "Itens e receitas ilimitados",
      "Lista de compras ilimitada",
      "Alertas inteligentes sem restrição",
      "Planejador de refeições semanal",
      "Histórico completo de consumo"
    ],
    tier: "premium",
    planTier: "individualPRO",
    maxAccounts: 1
  },
  multiPRO: {
    name: "multiPRO",
    price: 37.90,
    itemsLimit: -1,
    recipesPerDay: -1,
    shoppingListLimit: -1,
    notificationChangeDays: 0,
    features: [
      "Até 3 sub-contas no mesmo plano",
      "Geladeira e estoque compartilhados",
      "Configurações e notificações independentes",
      "Lista de compras em tempo real",
      "Notificar outros membros da casa",
      "Conta mestre gerencia acesso"
    ],
    tier: "premium",
    planTier: "multiPRO",
    maxAccounts: 3
  }
};

interface SubscriptionContextType {
  subscription: Subscription | null;
  loading: boolean;
  planTier: PlanTier;
  isMultiPro: boolean;
  canAddItem: () => boolean;
  canUseRecipe: () => boolean;
  canAddShoppingItem: (currentCount: number) => boolean;
  canChangeNotification: () => boolean;
  useRecipe: () => Promise<boolean>;
  upgradePlan: (plan: SubscriptionPlan) => Promise<boolean>;
  startCheckout: (
    plan: SubscriptionPlan
  ) => Promise<{ clientSecret: string; publishableKey: string } | void>;
  openCustomerPortal: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
  getPlanTier: () => "simple" | "almost-premium" | "premium";
  getRemainingItems: () => number;
  getRemainingRecipes: () => number;
  getRemainingShoppingItems: (currentCount: number) => number;
  trialDaysRemaining: number;
  isLocked: boolean;
  billingSoon: boolean;
  registrationDate: Date | null;
  feedbackSubmitted: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export function SubscriptionProvider({
  children
}: {
  children: React.ReactNode;
}) {
    const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState<number>(7);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [registrationDate, setRegistrationDate] = useState<Date | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [billingSoon, setBillingSoon] = useState<boolean>(false);
  const expiryNotifSentRef = useRef<boolean>(false);

  const fetchSubscription = useCallback(async () => {
    if (authLoading) return; // Wait for auth to initialize
    
    if (!user) {
      console.log("[SUB] no user, clearing");
      setSubscription(null);
      setIsLocked(false);
      setTrialDaysRemaining(7);
      setRegistrationDate(null);
      setFeedbackSubmitted(false);
      setLoading(false);
      return;
    }

    const t0 = performance.now();
    console.log("[SUB] fetchSubscription: start for", user.id);
    try {
      // 1. Check if user is a sub-account member
      const { data: subMembership } = await supabase
        .from("sub_account_members")
        .select("group_id")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      let targetUserId = user.id;
      let isSubAccount = false;

      if (subMembership) {
        // Find the master of that group
        const { data: group } = await supabase
          .from("sub_account_groups")
          .select("master_user_id")
          .eq("id", subMembership.group_id)
          .maybeSingle();
        
        if (group?.master_user_id) {
          targetUserId = group.master_user_id;
          isSubAccount = true;
          console.log("[SUB] Sub-account detected via sub_account_members. Inheriting from master:", targetUserId);
        }
      } else {
        // Fallback: check home_members role
        const { data: homeMember } = await supabase
          .from("home_members")
          .select("home_id, role")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle();
          
        if (homeMember && homeMember.role === "resident") {
          // If they are a resident, we need to find the master of that home
          const { data: masterMember } = await supabase
            .from("home_members")
            .select("user_id")
            .eq("home_id", homeMember.home_id)
            .eq("role", "admin")
            .limit(1)
            .maybeSingle();
            
          if (masterMember?.user_id) {
            targetUserId = masterMember.user_id;
            isSubAccount = true;
            console.log("[SUB] Sub-account detected via home_members. Inheriting from master:", targetUserId);
          }
        }
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("created_at")
        .eq("user_id", targetUserId)
        .maybeSingle();

      const trialStart = profile?.created_at ? new Date(profile.created_at) : new Date();
      const daysPassed = Math.floor((new Date().getTime() - trialStart.getTime()) / (1000 * 3600 * 24));
      let remaining = Math.max(0, 7 - daysPassed);
      let locked = remaining === 0;

      // Fonte canônica: view v_user_access
      try {
        const { data: access } = await supabase
          .from("v_user_access")
          .select("has_access, in_trial, trial_days_left, billing_soon")
          .eq("user_id", targetUserId)
          .maybeSingle();
        if (access) {
          remaining = (access as any).trial_days_left ?? remaining;
          locked = !((access as any).has_access);
          const soon = !!((access as any).billing_soon);
          setBillingSoon(soon);

          // Notifica uma vez por sessão quando o trial está acabando ou billing_soon
          const notifKey = `kaza_expiry_notif_${targetUserId}`;
          const alreadyNotified = sessionStorage.getItem(notifKey);
          if (!alreadyNotified && !expiryNotifSentRef.current) {
            if (soon || (remaining > 0 && remaining <= 2)) {
              expiryNotifSentRef.current = true;
              sessionStorage.setItem(notifKey, "1");
              const msg = remaining > 0
                ? `Seu período de teste termina em ${remaining} dia${remaining === 1 ? "" : "s"}. Assine para continuar.`
                : "Sua cobrança está próxima. Verifique sua assinatura.";
              scheduleLocalNotification(
                "⏳ Kaza — Assinatura",
                msg,
                0,
                "subscription-expiry",
                "general"
              ).catch(() => {});
            } else if (locked) {
              expiryNotifSentRef.current = true;
              sessionStorage.setItem(notifKey, "1");
              scheduleLocalNotification(
                "🔒 Kaza — Acesso encerrado",
                "Seu período de teste terminou. Assine para continuar usando o Kaza.",
                0,
                "subscription-locked",
                "general"
              ).catch(() => {});
            }
          }
        }
      } catch {
        // view pode não existir em ambientes antigos — mantém fallback
      }

      setTrialDaysRemaining(remaining);
      setIsLocked(locked);
      setRegistrationDate(profile?.created_at ? new Date(profile.created_at) : null);
      setFeedbackSubmitted(false);

      let data: Record<string, unknown> | null = null;
      if (isSubAccount) {
        // Sub-accounts can't read master's subscriptions directly due to RLS.
        // Use SECURITY DEFINER RPC that resolves the effective user.
        const { data: rpcData } = await (supabase as any).rpc("get_effective_subscription");
        data = rpcData?.[0] ?? null;
      } else {
        const { data: subData, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", targetUserId)
          .maybeSingle();
        if (error) throw error;
        data = subData as Record<string, unknown> | null;
      }

      if (data) {
        // Reset receitas se virou o dia
        const today = new Date().toISOString().split("T")[0];
        const lastReset = data.last_recipe_reset;
        if (lastReset !== today && !isSubAccount) {
          // Apenas o mestre reseta as receitas globais (ou cada um tem seu limite?)
          // No multiPRO as receitas são por CONTA ou por GRUPO? 
          // O usuário pediu "acesso as mesmas informacoes", então o limite deve ser do mestre.
          await supabase
            .from("subscriptions")
            .update({ recipes_used_today: 0, last_recipe_reset: today })
            .eq("id", data.id)
            .eq("user_id", targetUserId);
          data.recipes_used_today = 0;
        }

        // Durante trial = acesso multiPRO completo (ilimitado)
        const inTrial = remaining > 0;
        const effectivePlan = (inTrial ? "multiPRO" : (data.plan || "free")) as SubscriptionPlan;
        const effectiveItemsLimit = inTrial ? -1 : data.items_limit;
        const effectiveRecipesPerDay = inTrial ? -1 : data.recipes_per_day;
        const effectiveShoppingListLimit = inTrial ? -1 : data.shopping_list_limit;

        const rawPlanTier: string = (data as any).plan_tier || "free";
        const effectivePlanTier: PlanTier = inTrial
          ? "multiPRO"
          : (rawPlanTier === "individualPRO" || rawPlanTier === "multiPRO")
            ? rawPlanTier as PlanTier
            : (data.plan === "multiPRO" || data.plan === "standard") && data.is_active
              ? "multiPRO"
              : (data.plan === "premium" || data.plan === "individualPRO") && data.is_active
                ? "individualPRO"
                : "free";

        setSubscription({
          id: data.id,
          userId: data.user_id, // Mantemos o ID do mestre aqui para referência do plano
          plan: effectivePlan,
          planTier: effectivePlanTier,
          groupId: (data as any).group_id ?? subMembership?.group_id ?? null,
          price: data.price,
          itemsLimit: effectiveItemsLimit,
          recipesPerDay: effectiveRecipesPerDay,
          shoppingListLimit: effectiveShoppingListLimit,
          notificationChangeDays: data.notification_change_days,
          lastNotificationChange: data.last_notification_change
            ? new Date(data.last_notification_change)
            : null,
          recipesUsedToday: data.recipes_used_today,
          lastRecipeReset: new Date(data.last_recipe_reset),
          startedAt: new Date(data.started_at),
          expiresAt: data.expires_at ? new Date(data.expires_at) : null,
          isActive: data.is_active,
          paymentProvider: data.payment_provider,
          paymentId: data.payment_id,
          lastPaymentDate: null,
          paymentMethod: null,
        });
      } else if (remaining > 0) {
        // No subscription row yet, but user is in trial → grant synthetic multiPRO access
        setSubscription({
          id: "trial-synthetic",
          userId: targetUserId,
          plan: "multiPRO" as SubscriptionPlan,
          planTier: "multiPRO",
          groupId: subMembership?.group_id ?? null,
          price: null,
          itemsLimit: -1,
          recipesPerDay: -1,
          shoppingListLimit: -1,
          notificationChangeDays: 7,
          lastNotificationChange: null,
          recipesUsedToday: 0,
          lastRecipeReset: new Date(),
          startedAt: trialStart,
          expiresAt: null,
          isActive: false,
          paymentProvider: null,
          paymentId: null,
          lastPaymentDate: null,
          paymentMethod: null,
        });
      } else {
        setSubscription(null);
      }
    } catch (error: any) {
      console.error("[SUB] fetch error:", error);
      setSubscription(null);
    } finally {
      console.log("[SUB] fetchSubscription: done in", (performance.now() - t0).toFixed(0), "ms");
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const t = setTimeout(() => { fetchSubscription(); }, 80);
    return () => clearTimeout(t);
  }, [fetchSubscription]);

  // Verificar assinatura ao retornar do checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subscriptionResult = params.get("subscription");

    if (subscriptionResult === "success" && user) {
      const url = new URL(window.location.href);
      url.searchParams.delete("subscription");
      window.history.replaceState({}, "", url.toString());

      const syncSubscription = async () => {
        try {
          await supabase.functions.invoke("check-subscription");
          await fetchSubscription();
        } catch (error) {
          if (import.meta.env.DEV) { console.error("[DEV] sync error:", error); }
        }
      };
      syncSubscription();
    } else if (subscriptionResult === "canceled") {
      const url = new URL(window.location.href);
      url.searchParams.delete("subscription");
      window.history.replaceState({}, "", url.toString());
    }
  }, [user, fetchSubscription]);

  // Derived state
  const planTier: PlanTier = subscription?.planTier ?? "free";
  const isMultiPro = planTier === "multiPRO";

  // Modelo: trial 7 dias (ilimitado) → PRO (ilimitado) ou travado. Não há plano free parcial.
  const canAddItem = useCallback(() => {
    return !isLocked;
  }, [isLocked]);

  const canUseRecipe = useCallback(() => {
    if (isLocked) return false;
    if (!subscription) return trialDaysRemaining > 0;
    if (subscription.recipesPerDay === -1) return true;
    return subscription.recipesUsedToday < subscription.recipesPerDay;
  }, [isLocked, subscription, trialDaysRemaining]);

  const canAddShoppingItem = useCallback(
    (_currentCount: number) => {
      return !isLocked;
    },
    [isLocked]
  );

  const canChangeNotification = useCallback(() => {
    if (!subscription) return false;
    if (subscription.notificationChangeDays === 0) return true;
    if (!subscription.lastNotificationChange) return true;
    const daysSinceChange = Math.floor(
      (Date.now() - subscription.lastNotificationChange.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return daysSinceChange >= subscription.notificationChangeDays;
  }, [subscription]);

  const useRecipe = useCallback(async () => {
    if (!subscription || !canUseRecipe()) return false;
    try {
      const { error } = await supabase
        .from("subscriptions")
        .update({ recipes_used_today: subscription.recipesUsedToday + 1 })
        .eq("id", subscription.id)
        .eq("user_id", subscription.userId);
      if (error) throw error;
      setSubscription((prev) =>
        prev ? { ...prev, recipesUsedToday: prev.recipesUsedToday + 1 } : null
      );
      return true;
    } catch (error) {
      if (import.meta.env.DEV) { console.error("[DEV] recipe error:", error); }
      return false;
    }
  }, [subscription, canUseRecipe]);

  const upgradePlan = useCallback(
    async (plan: SubscriptionPlan) => {
      if (!subscription) return false;
      const planDetails = PLAN_DETAILS[plan];
      try {
        const { error } = await supabase
          .from("subscriptions")
          .update({
            plan,
            plan_tier: planDetails.planTier,
            price: planDetails.price,
            items_limit: planDetails.itemsLimit,
            recipes_per_day: planDetails.recipesPerDay,
            shopping_list_limit: planDetails.shoppingListLimit,
            notification_change_days: planDetails.notificationChangeDays,
            started_at: new Date().toISOString(),
            is_active: true
          })
          .eq("id", subscription.id)
          .eq("user_id", subscription.userId);
        if (error) throw error;
        await fetchSubscription();
        return true;
      } catch (error) {
        if (import.meta.env.DEV) { console.error("[DEV] upgrade error:", error); }
        return false;
      }
    },
    [subscription, fetchSubscription]
  );

  const startCheckout = useCallback(async (plan: SubscriptionPlan) => {
    if (plan === "free") return;

    const CAKTO_LINKS = {
      individualPRO: "https://pay.cakto.com.br/356go8z",
      multiPRO: "https://pay.cakto.com.br/wbjq4ne_846287"
    };

    // Mapear planos legados para os novos da Cakto
    const effectivePlan = (plan === "premium" || plan === "individualPRO") ? "individualPRO" : "multiPRO";
    let checkoutUrl = CAKTO_LINKS[effectivePlan as keyof typeof CAKTO_LINKS];

    if (!checkoutUrl) {
      throw new Error("Plano de pagamento não configurado.");
    }

    // Tenta anexar o email para preenchimento automático na Cakto (padrão comum ?email=)
    if (user?.email) {
      const glue = checkoutUrl.includes("?") ? "&" : "?";
      checkoutUrl += `${glue}email=${encodeURIComponent(user.email)}`;
    }

    try {
      if (import.meta.env.DEV) {
        console.log(`[SUB] Redirecting to Cakto: ${checkoutUrl}`);
      }
      await openExternalUrl(checkoutUrl);
    } catch (error) {
      console.error("[SUB] Checkout error:", error);
      throw new Error("Não foi possível abrir a página de pagamento.");
    }
  }, [user]);

  const openCustomerPortal = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) {
        await openExternalUrl(data.url);
      }
    } catch (error) {
      if (import.meta.env.DEV) { console.error("[DEV] portal error:", error); }
      throw error;
    }
  }, []);

  const getPlanTier = useCallback(() => {
    if (!subscription) return "simple";
    return PLAN_DETAILS[subscription.plan]?.tier ?? "simple";
  }, [subscription]);

  const getRemainingItems = useCallback(() => {
    if (!subscription) return 0;
    if (subscription.itemsLimit === -1) return -1;
    return subscription.itemsLimit;
  }, [subscription]);

  const getRemainingRecipes = useCallback(() => {
    if (!subscription) return 0;
    if (subscription.recipesPerDay === -1) return -1;
    return subscription.recipesPerDay - subscription.recipesUsedToday;
  }, [subscription]);

  const getRemainingShoppingItems = useCallback(
    (currentCount: number) => {
      if (!subscription) return 0;
      if (subscription.shoppingListLimit === -1) return -1;
      return subscription.shoppingListLimit - currentCount;
    },
    [subscription]
  );

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        planTier,
        isMultiPro,
        canAddItem,
        canUseRecipe,
        canAddShoppingItem,
        canChangeNotification,
        useRecipe,
        upgradePlan,
        startCheckout,
        openCustomerPortal,
        refreshSubscription: fetchSubscription,
        getPlanTier,
        getRemainingItems,
        getRemainingRecipes,
        getRemainingShoppingItems,
        trialDaysRemaining,
        isLocked,
        billingSoon,
        registrationDate,
        feedbackSubmitted
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}
