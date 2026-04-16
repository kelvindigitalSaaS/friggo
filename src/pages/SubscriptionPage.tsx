import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Crown,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Zap,
  Calendar,
  History,
  Lock,
  ArrowRight,
  Users,
  User,
  Sparkles,
  XCircle,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

const CAKTO_LOGO = "https://app.cakto.com.br/logo/green-logo-transparent-background.png";

const PLANS = {
  individual: {
    id: "individual",
    url: "https://pay.cakto.com.br/356go8z",
    screens: 1,
    price: "R$ 14,99",
    period: "/mês",
  },
  trio: {
    id: "trio",
    url: "https://pay.cakto.com.br/wbjq4ne_846287",
    screens: 3,
    price: "R$ 27,00",
    period: "/mês",
  },
};

const labels = {
  "pt-BR": {
    title: "Assinatura",
    status: "Status",
    active: "Ativo",
    memberSince: "Membro desde",
    paymentHistory: "Histórico de Pagamento",
    noHistory: "Nenhum pagamento registrado ainda.",
    choosePlan: "Escolha seu plano",
    choosePlanDesc: "Acesso completo ao Kaza Premium. Cancele quando quiser.",
    individual: "Individual",
    individualDesc: "Para uma tela",
    trio: "Trio",
    trioDesc: "Para até 3 telas",
    mostPopular: "Mais popular",
    benefits: [
      "Itens e receitas ilimitadas",
      "Alertas inteligentes sem restrição",
      "Planejador de refeições semanal",
      "Histórico completo de consumo",
      "Acesso antecipado a novas funções",
    ],
    subscribe: "Assinar agora",
    accessAfter: "Acesso imediato após confirmação",
    securityTitle: "Pagamento seguro via Cakto",
    securityDesc: "Seus dados estão 100% protegidos. Aceitamos PIX e cartões de crédito.",
    screens: "tela",
    screensPlural: "telas",
    trial: "Trial Premium",
    premium: "Premium",
    free: "Grátis",
    cancelTitle: "Cancelar assinatura",
    cancelDesc: "Para cancelar sua assinatura, entre em contato com o suporte. O acesso permanece ativo até o fim do período pago.",
    cancelBtn: "Solicitar cancelamento",
  },
  en: {
    title: "Subscription",
    status: "Status",
    active: "Active",
    memberSince: "Member since",
    paymentHistory: "Payment History",
    noHistory: "No payment history yet.",
    choosePlan: "Choose your plan",
    choosePlanDesc: "Full access to Kaza Premium. Cancel anytime.",
    individual: "Individual",
    individualDesc: "For one screen",
    trio: "Trio",
    trioDesc: "For up to 3 screens",
    mostPopular: "Most popular",
    benefits: [
      "Unlimited items and recipes",
      "Unrestricted smart alerts",
      "Weekly meal planner",
      "Full consumption history",
      "Early access to new features",
    ],
    subscribe: "Subscribe now",
    accessAfter: "Immediate access after confirmation",
    securityTitle: "Secure payment via Cakto",
    securityDesc: "Your data is 100% protected. We accept PIX and credit cards.",
    screens: "screen",
    screensPlural: "screens",
    trial: "Premium Trial",
    premium: "Premium",
    free: "Free",
    cancelTitle: "Cancel subscription",
    cancelDesc: "To cancel your subscription, contact support. Access remains active until the end of the paid period.",
    cancelBtn: "Request cancellation",
  },
  es: {
    title: "Suscripción",
    status: "Estado",
    active: "Activo",
    memberSince: "Miembro desde",
    paymentHistory: "Historial de Pagos",
    noHistory: "No hay historial de pagos aún.",
    choosePlan: "Elige tu plan",
    choosePlanDesc: "Acceso completo a Kaza Premium. Cancela cuando quieras.",
    individual: "Individual",
    individualDesc: "Para una pantalla",
    trio: "Trío",
    trioDesc: "Para hasta 3 pantallas",
    mostPopular: "Más popular",
    benefits: [
      "Items y recetas ilimitados",
      "Alertas inteligentes sin restricción",
      "Planificador semanal de comidas",
      "Historial completo de consumo",
      "Acceso anticipado a nuevas funciones",
    ],
    subscribe: "Suscribirse ahora",
    accessAfter: "Acceso inmediato tras confirmación",
    securityTitle: "Pago seguro via Cakto",
    securityDesc: "Tus datos están 100% protegidos. Aceptamos PIX y tarjetas.",
    screens: "pantalla",
    screensPlural: "pantallas",
    trial: "Trial Premium",
    premium: "Premium",
    free: "Gratis",
    cancelTitle: "Cancelar suscripción",
    cancelDesc: "Para cancelar tu suscripción, contacta al soporte. El acceso permanece activo hasta el fin del período pagado.",
    cancelBtn: "Solicitar cancelación",
  },
};

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { subscription, trialDaysRemaining, registrationDate } = useSubscription();
  const l = labels[language as keyof typeof labels] || labels["pt-BR"];

  const [selected, setSelected] = useState<"individual" | "trio">("trio");
  const [showHistory, setShowHistory] = useState(false);

  const isTrial = subscription?.plan === "premium" && trialDaysRemaining > 0;
  const isPremium = subscription?.plan === "premium" && !isTrial;
  const planLabel = isTrial ? l.trial : isPremium ? l.premium : l.free;

  const chosenPlan = PLANS[selected];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] pb-16 font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.06] px-4 h-16 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-foreground transition-all active:scale-90"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{l.title}</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {/* Current Status Card */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] bg-white dark:bg-[#111] border border-black/[0.04] dark:border-white/10 p-6 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-400/10 rounded-full blur-2xl -translate-y-10 translate-x-10 pointer-events-none" />
          <div className="flex items-center gap-4 mb-5">
            <div className="h-12 w-12 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
              <Crown className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{l.status}</p>
              <h2 className="text-xl font-black text-foreground flex items-center gap-2">
                {planLabel}
                {subscription?.isActive && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                )}
              </h2>
            </div>
          </div>
          <div className="flex justify-between items-center py-2.5 border-t border-black/[0.04] dark:border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground">{l.memberSince}</span>
            </div>
            <span className="text-sm font-bold text-foreground">
              {registrationDate ? new Date(registrationDate).toLocaleDateString(language) : "—"}
            </span>
          </div>
        </motion.section>

        {/* Payment History */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          className="space-y-3"
        >
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between px-2 text-left"
          >
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[1.5px] flex items-center gap-2">
              <History className="h-3.5 w-3.5" /> {l.paymentHistory}
            </h3>
            <span className="text-[11px] text-muted-foreground">{showHistory ? "▲" : "▼"}</span>
          </button>
          {showHistory && (
            <div className="rounded-[1.5rem] bg-white dark:bg-[#111] border border-black/[0.04] dark:border-white/10 p-8 text-center shadow-sm">
              <CreditCard className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-bold text-muted-foreground">{l.noHistory}</p>
            </div>
          )}
        </motion.section>

        {/* Plan Chooser — always visible */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="space-y-4"
        >
          <div className="px-1">
            <h3 className="text-lg font-black text-foreground">{l.choosePlan}</h3>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">{l.choosePlanDesc}</p>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-2 gap-3">
            {(["individual", "trio"] as const).map((key) => {
              const plan = PLANS[key];
              const isSelected = selected === key;
              const isTrio = key === "trio";
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={cn(
                    "relative rounded-[1.75rem] p-5 text-left transition-all duration-200 border-2",
                    isSelected
                      ? "bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-600 border-purple-400/60 text-white shadow-xl shadow-purple-500/20 scale-[1.02]"
                      : "bg-white dark:bg-[#111] border-black/[0.06] dark:border-white/10 text-foreground shadow-sm"
                  )}
                >
                  {isTrio && (
                    <span className={cn(
                      "absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border",
                      isSelected
                        ? "bg-white text-purple-600 border-white/30"
                        : "bg-emerald-500 text-white border-emerald-400"
                    )}>
                      {l.mostPopular}
                    </span>
                  )}
                  <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center mb-3", isSelected ? "bg-white/20" : "bg-black/5 dark:bg-white/10")}>
                    {isTrio
                      ? <Users className={cn("h-5 w-5", isSelected ? "text-white" : "text-purple-500")} />
                      : <User className={cn("h-5 w-5", isSelected ? "text-white" : "text-indigo-500")} />
                    }
                  </div>
                  <p className={cn("font-black text-[15px]", isSelected ? "text-white" : "text-foreground")}>
                    {key === "individual" ? l.individual : l.trio}
                  </p>
                  <p className={cn("text-[11px] font-semibold mb-3", isSelected ? "text-white/70" : "text-muted-foreground")}>
                    {plan.screens} {plan.screens === 1 ? l.screens : l.screensPlural}
                  </p>
                  <p className={cn("text-2xl font-black leading-none", isSelected ? "text-white" : "text-foreground")}>
                    {plan.price}
                  </p>
                  <p className={cn("text-[11px] font-bold", isSelected ? "text-white/60" : "text-muted-foreground")}>
                    {plan.period}
                  </p>
                  {isSelected && (
                    <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-white/30 flex items-center justify-center">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Benefits */}
          <div className="rounded-[1.5rem] bg-white dark:bg-[#111] border border-black/[0.04] dark:border-white/10 p-5 space-y-3 shadow-sm">
            {l.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                </div>
                <span className="text-[14px] font-semibold text-foreground leading-snug">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => window.open(chosenPlan.url, "_blank")}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-600 text-white font-black text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 active:scale-[0.98] transition-all"
          >
            <Sparkles className="h-5 w-5" />
            {l.subscribe}
            <ArrowRight className="h-5 w-5 ml-1" />
          </button>
          <p className="text-center text-[11px] text-muted-foreground font-medium">{l.accessAfter}</p>
        </motion.section>

        {/* Security / Cakto */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="rounded-[1.5rem] bg-white dark:bg-[#111] border border-black/[0.04] dark:border-white/10 p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="font-black text-[14px] text-foreground">{l.securityTitle}</h4>
              <p className="text-[12px] text-muted-foreground font-medium">{l.securityDesc}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-black/[0.04] dark:border-white/10">
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
                <Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">PIX</span>
              </div>
              <div className="flex items-center gap-1.5 bg-purple-500/10 px-2.5 py-1.5 rounded-lg border border-purple-500/20">
                <CreditCard className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                <span className="text-[11px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider">Cartão</span>
              </div>
            </div>
            <img
              src={CAKTO_LOGO}
              alt="Cakto"
              className="h-6 object-contain opacity-80 dark:opacity-60"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </motion.section>

        {/* Already Premium badge */}
        {isPremium && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-center gap-3"
          >
            <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              {language === "pt-BR"
                ? "Você já tem acesso Premium ativo. Obrigado por assinar o Kaza!"
                : language === "es"
                  ? "¡Ya tienes acceso Premium activo. ¡Gracias por suscribirte a Kaza!"
                  : "You already have active Premium access. Thank you for subscribing to Kaza!"}
            </p>
          </motion.div>
        )}

        {/* Cancel Subscription — only shown to paying users */}
        {isPremium && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-[1.5rem] border border-red-500/20 bg-red-500/5 p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h4 className="font-black text-[14px] text-foreground">{l.cancelTitle}</h4>
                <p className="text-[12px] text-muted-foreground font-medium">{l.cancelDesc}</p>
              </div>
            </div>
            <button
              onClick={() => window.open("mailto:suporte@kaza.app?subject=Cancelamento%20de%20assinatura", "_blank")}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-bold text-red-600 dark:text-red-400 transition-all active:scale-[0.98] hover:bg-red-500/15"
            >
              <Mail className="h-4 w-4" />
              {l.cancelBtn}
            </button>
          </motion.section>
        )}
      </main>
    </div>
  );
}
