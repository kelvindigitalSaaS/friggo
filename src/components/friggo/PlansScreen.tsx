import { useState } from "react";
import {
  Check,
  Crown,
  Users,
  User,
  X,
  Loader2,
  ArrowRight,
  Sparkles,
  Shield,
} from "lucide-react";
import {
  useSubscription,
  PLAN_DETAILS,
  SubscriptionPlan
} from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { openExternalUrl } from "@/lib/nativeBrowser";
import { toast } from "sonner";
import { MiniCheckout } from "./MiniCheckout";
import { motion } from "framer-motion";

interface PlansScreenProps {
  onClose?: () => void;
}

const INDIVIDUAL_FEATURES = [
  "1 conta · uso pessoal",
  "Itens e receitas ilimitados",
  "Lista de compras ilimitada",
  "Alertas inteligentes sem restrição",
  "Planejador de refeições semanal",
  "Histórico completo de consumo",
];

const MULTI_FEATURES = [
  "Até 3 sub-contas no mesmo plano",
  "Geladeira e estoque compartilhados",
  "Lista de compras em tempo real",
  "Configurações e notificações independentes",
  "Notificar outros membros da casa",
  "Conta mestre gerencia acesso",
];

export function PlansScreen({ onClose }: PlansScreenProps) {
  const {
    subscription,
    startCheckout,
    openCustomerPortal,
    refreshSubscription,
    upgradePlan,
    trialDaysRemaining,
  } = useSubscription();
  const { language } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState<SubscriptionPlan | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<SubscriptionPlan | null>(null);

  const l = {
    "pt-BR": {
      title: "Escolha seu plano",
      subtitle: "Sem limitações. Sem complicações.",
      currentPlan: "Plano atual",
      subscribe: "Começar agora",
      currentPlanBtn: "Plano ativo",
      manageSub: "Gerenciar assinatura",
      footer: "Cancele quando quiser · Pagamento seguro",
      processing: "Processando...",
      errorCheckout: "Erro ao iniciar checkout",
      perMonth: "/mês",
      trial: "dias de teste restantes",
      popular: "Mais popular",
      individual: "individualPRO",
      multi: "multiPRO",
      individualTagline: "Para uso pessoal",
      multiTagline: "Para toda a família",
    },
    en: {
      title: "Choose your plan",
      subtitle: "No limits. No complications.",
      currentPlan: "Current plan",
      subscribe: "Get started",
      currentPlanBtn: "Active plan",
      manageSub: "Manage subscription",
      footer: "Cancel anytime · Secure payment",
      processing: "Processing...",
      errorCheckout: "Error starting checkout",
      perMonth: "/mo",
      trial: "trial days left",
      popular: "Most popular",
      individual: "individualPRO",
      multi: "multiPRO",
      individualTagline: "For personal use",
      multiTagline: "For the whole family",
    },
    es: {
      title: "Elige tu plan",
      subtitle: "Sin límites. Sin complicaciones.",
      currentPlan: "Plan actual",
      subscribe: "Empezar ahora",
      currentPlanBtn: "Plan activo",
      manageSub: "Gestionar suscripción",
      footer: "Cancela cuando quieras · Pago seguro",
      processing: "Procesando...",
      errorCheckout: "Error al iniciar checkout",
      perMonth: "/mes",
      trial: "días de prueba restantes",
      popular: "Más popular",
      individual: "individualPRO",
      multi: "multiPRO",
      individualTagline: "Para uso personal",
      multiTagline: "Para toda la familia",
    },
  };
  const t = l[language as keyof typeof l] || l["pt-BR"];

  if (checkoutPlan) {
    return (
      <MiniCheckout
        plan={checkoutPlan}
        onSuccess={async () => {
          await upgradePlan(checkoutPlan);
          await refreshSubscription();
          setCheckoutPlan(null);
          toast.success(
            language === "pt-BR" ? "Assinatura ativada!" : "Subscription activated!"
          );
        }}
        onCancel={() => setCheckoutPlan(null)}
      />
    );
  }

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    if (plan === subscription?.plan) return;
    setLoading(plan);
    try {
      await startCheckout(plan);
    } catch (_err) {
      toast.error(t.errorCheckout);
      try {
        const base = "https://pay.cakto.com.br/wbjq4ne_846287";
        const emailParam = user?.email ? `?email=${encodeURIComponent(user.email)}` : "";
        await openExternalUrl(`${base}${emailParam}`);
      } catch (_e) { /* silent */ }
    } finally {
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      await openCustomerPortal();
    } catch (_error) {
      toast.error("Error opening portal");
    } finally {
      setPortalLoading(false);
    }
  };

  const isIndividualActive = subscription?.plan === "individualPRO" || subscription?.plan === "premium";
  const isMultiActive = subscription?.plan === "multiPRO";
  const hasPaidPlan = isIndividualActive || isMultiActive;

  return (
    <div className="min-h-screen bg-[#FAF8F4] pb-24 font-sans">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-[26px] font-black text-[#1a1a1a] tracking-tight">{t.title}</h1>
          <p className="text-[14px] text-black/50 font-medium mt-0.5">{t.subtitle}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl bg-black/5 flex items-center justify-center text-[#1a1a1a] active:scale-90 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Trial banner */}
      {trialDaysRemaining > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mt-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 px-4 py-3 flex items-center gap-3"
        >
          <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
          <p className="text-[13px] font-semibold text-emerald-800">
            {trialDaysRemaining} {t.trial}
          </p>
        </motion.div>
      )}

      <div className="px-5 mt-5 space-y-4">
        {/* individualPRO — white card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`relative rounded-[2rem] bg-white border p-6 shadow-sm ${
            isIndividualActive
              ? "border-emerald-400 ring-2 ring-emerald-400/30"
              : "border-black/[0.07]"
          }`}
        >
          {isIndividualActive && (
            <div className="absolute top-5 right-5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              {t.currentPlanBtn}
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="h-11 w-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <User className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-[18px] font-black text-[#1a1a1a]">{t.individual}</h2>
              <p className="text-[12px] text-black/50 font-medium">{t.individualTagline}</p>
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-5">
            <span className="text-[36px] font-black text-[#1a1a1a] leading-none">
              R$ {PLAN_DETAILS.individualPRO.price.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-[14px] text-black/50 font-semibold">{t.perMonth}</span>
          </div>

          <ul className="space-y-2.5 mb-6">
            {INDIVIDUAL_FEATURES.map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[13px] text-[#1a1a1a] font-medium">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {hasPaidPlan ? (
            <button
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="w-full h-12 rounded-2xl bg-black/5 text-[14px] font-black text-[#1a1a1a] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t.manageSub}
            </button>
          ) : (
            <button
              onClick={() => handleSelectPlan("individualPRO")}
              disabled={Boolean(loading)}
              className="w-full h-12 rounded-2xl text-[14px] font-black text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              style={{
                background: "linear-gradient(135deg, #0F3D38 0%, #165A52 100%)",
                boxShadow: "0 6px 20px rgba(22,90,82,0.30)",
              }}
            >
              {loading === "individualPRO" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {t.subscribe}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </motion.div>

        {/* multiPRO — dark card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-[2rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0F3D38 0%, #165A52 60%, #1a7a6e 100%)",
            boxShadow: "0 20px 50px rgba(22,90,82,0.40)",
          }}
        >
          {/* Blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.05] rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-emerald-300/10 rounded-full blur-2xl translate-y-6 -translate-x-6 pointer-events-none" />

          {/* Popular badge */}
          <div className="absolute top-5 right-5 bg-emerald-400 text-[#0F3D38] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            {isMultiActive ? t.currentPlanBtn : t.popular}
          </div>

          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <Users className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <h2 className="text-[18px] font-black text-white">{t.multi}</h2>
                <p className="text-[12px] text-emerald-300/80 font-medium">{t.multiTagline}</p>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-[36px] font-black text-white leading-none">
                R$ {PLAN_DETAILS.multiPRO.price.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-[14px] text-white/60 font-semibold">{t.perMonth}</span>
            </div>

            <ul className="space-y-2.5 mb-6">
              {MULTI_FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13px] text-white font-medium">
                  <Check className="h-4 w-4 text-emerald-300 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {hasPaidPlan ? (
              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="w-full h-12 rounded-2xl bg-white/10 border border-white/20 text-[14px] font-black text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-all backdrop-blur-sm"
              >
                {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {t.manageSub}
              </button>
            ) : (
              <button
                onClick={() => handleSelectPlan("multiPRO")}
                disabled={Boolean(loading)}
                className="w-full h-12 rounded-2xl bg-emerald-400 text-[14px] font-black text-[#0F3D38] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-emerald-400/20"
              >
                {loading === "multiPRO" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Crown className="h-4 w-4" />
                    {t.subscribe}
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="flex items-center justify-center gap-2 pt-2"
        >
          <Shield className="h-3.5 w-3.5 text-black/30" />
          <p className="text-[11px] text-black/40 font-medium text-center">{t.footer}</p>
        </motion.div>
      </div>
    </div>
  );
}
