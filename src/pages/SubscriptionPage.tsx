import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Crown,
  ShieldCheck,
  Clock,
  ArrowRight,
  Users,
  User,
  Zap,
  Star,
  Check,
  Sparkles,
} from "lucide-react";

const labels = {
  "pt-BR": {
    title: "Assinatura",
    status: "Seu plano",
    memberSince: "Membro desde",
    trial: "Período de teste multiPRO",
    trialDesc: "Experimente tudo grátis por 7 dias.",
    daysLeft: "dias restantes",
    dayLeft: "dia restante",
    trialEnded: "Período de teste encerrado",
    viewSubs: "Ver planos disponíveis",
    viewSubsDesc: "Upgrade, downgrade ou gerenciar cobrança",
    freeLabel: "Grátis",
    activeBadge: "Acesso Premium ativo — obrigado!",
    individualDesc: "1 conta · tudo ilimitado",
    multiDesc: "Até 3 contas · geladeira compartilhada",
    trialBadge: "Teste gratuito",
    whyUpgrade: "Por que fazer upgrade?",
    benefits: [
      { icon: Zap, text: "Itens e receitas ilimitados" },
      { icon: Users, text: "Geladeira compartilhada com a família" },
      { icon: Sparkles, text: "Plano alimentar com IA" },
      { icon: Star, text: "Notificações em tempo real" },
    ],
    cta: "Escolher plano",
    ctaActive: "Gerenciar assinatura",
    guarantee: "Cancele quando quiser. Sem multa.",
  },
  en: {
    title: "Subscription",
    status: "Your plan",
    memberSince: "Member since",
    trial: "multiPRO trial",
    trialDesc: "Try everything free for 7 days.",
    daysLeft: "days left",
    dayLeft: "day left",
    trialEnded: "Trial period ended",
    viewSubs: "See available plans",
    viewSubsDesc: "Upgrade, downgrade or manage billing",
    freeLabel: "Free",
    activeBadge: "Active Premium access — thank you!",
    individualDesc: "1 account · everything unlimited",
    multiDesc: "Up to 3 accounts · shared fridge",
    trialBadge: "Free trial",
    whyUpgrade: "Why upgrade?",
    benefits: [
      { icon: Zap, text: "Unlimited items and recipes" },
      { icon: Users, text: "Shared fridge with family" },
      { icon: Sparkles, text: "AI meal planning" },
      { icon: Star, text: "Real-time notifications" },
    ],
    cta: "Choose plan",
    ctaActive: "Manage subscription",
    guarantee: "Cancel anytime. No penalties.",
  },
  es: {
    title: "Suscripción",
    status: "Tu plan",
    memberSince: "Miembro desde",
    trial: "Prueba multiPRO",
    trialDesc: "Prueba todo gratis por 7 días.",
    daysLeft: "días restantes",
    dayLeft: "día restante",
    trialEnded: "Prueba finalizada",
    viewSubs: "Ver planes disponibles",
    viewSubsDesc: "Upgrade, downgrade o gestionar cobro",
    freeLabel: "Gratis",
    activeBadge: "Acceso Premium activo — ¡gracias!",
    individualDesc: "1 cuenta · todo ilimitado",
    multiDesc: "Hasta 3 cuentas · heladera compartida",
    trialBadge: "Prueba gratuita",
    whyUpgrade: "¿Por qué mejorar?",
    benefits: [
      { icon: Zap, text: "Artículos y recetas ilimitadas" },
      { icon: Users, text: "Heladera compartida con familia" },
      { icon: Sparkles, text: "Plan de comidas con IA" },
      { icon: Star, text: "Notificaciones en tiempo real" },
    ],
    cta: "Elegir plan",
    ctaActive: "Gestionar suscripción",
    guarantee: "Cancela cuando quieras.",
  },
};

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { subscription, trialDaysRemaining, registrationDate, planTier } = useSubscription();
  const l = labels[language as keyof typeof labels] || labels["pt-BR"];

  const isTrial = trialDaysRemaining > 0 && !subscription?.isActive;
  const isActive = !!subscription?.isActive;

  const planLabel = isActive
    ? planTier === "multiPRO" ? "multiPRO" : "individualPRO"
    : isTrial ? "multiPRO" : l.freeLabel;

  const PlanIcon = (planTier === "multiPRO" || isTrial) ? Users : User;
  const planDesc = isActive
    ? planTier === "multiPRO" ? l.multiDesc : l.individualDesc
    : isTrial ? l.multiDesc : "";

  const manageRoute = isActive
    ? "/app/settings/subscription/manage"
    : "/app/settings/subscription/manage";

  return (
    <div className="min-h-screen bg-[#FAF8F4] pb-20 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-xl border-b border-black/[0.06] px-4 h-16 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-black/5 text-[#1a1a1a] transition-all active:scale-90"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-[#1a1a1a]">{l.title}</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {/* Hero plan card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[2rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0F3D38 0%, #165A52 60%, #1a7a6e 100%)",
            boxShadow: "0 20px 60px rgba(22,90,82,0.35)",
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.06] rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl translate-y-8 -translate-x-8 pointer-events-none" />

          <div className="relative p-6">
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-4">{l.status}</p>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <PlanIcon className="h-7 w-7 text-emerald-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[28px] font-black text-white leading-none tracking-tight">{planLabel}</h2>
                  {(isActive || isTrial) && (
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />
                  )}
                </div>
                {planDesc && (
                  <p className="text-[12px] text-emerald-300/90 font-semibold mt-0.5">{planDesc}</p>
                )}
                <p className="text-[11px] text-white/50 font-medium mt-1">
                  {registrationDate
                    ? `${l.memberSince} ${new Date(registrationDate).toLocaleDateString(
                        language === "pt-BR" ? "pt-BR" : language === "es" ? "es-ES" : "en-US"
                      )}`
                    : l.memberSince}
                </p>
              </div>
            </div>

            {isTrial && (
              <div className="mt-4 flex items-center gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                <Clock className="h-5 w-5 text-emerald-300 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">{l.trial}</p>
                  <p className="text-[11px] text-white/60">{l.trialDesc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[28px] font-black text-emerald-300 leading-none">{trialDaysRemaining}</p>
                  <p className="text-[10px] text-white/60">{trialDaysRemaining === 1 ? l.dayLeft : l.daysLeft}</p>
                </div>
              </div>
            )}

            {!isTrial && !isActive && (
              <div className="mt-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                <p className="text-sm text-white/70 font-medium">{l.trialEnded}</p>
              </div>
            )}

            {isActive && (
              <div className="mt-4 flex items-center gap-2 bg-emerald-400/20 rounded-2xl px-4 py-3 border border-emerald-400/30">
                <ShieldCheck className="h-4 w-4 text-emerald-300 shrink-0" />
                <p className="text-[12px] font-bold text-emerald-200">{l.activeBadge}</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Benefits section */}
        {!isActive && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            className="rounded-[2rem] bg-white border border-black/[0.06] p-6 shadow-sm"
          >
            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">{l.whyUpgrade}</p>
            <div className="space-y-3">
              {l.benefits.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#1a1a1a]">{text}</span>
                  <Check className="h-4 w-4 text-emerald-500 ml-auto shrink-0" />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          onClick={() => navigate(manageRoute)}
          className="w-full rounded-[1.5rem] p-5 text-left flex items-center gap-4 active:scale-[0.98] transition-all"
          style={{
            background: isActive
              ? "linear-gradient(135deg, #111827 0%, #1f2937 100%)"
              : "linear-gradient(135deg, #0F3D38 0%, #165A52 100%)",
            boxShadow: isActive
              ? "0 8px 24px rgba(0,0,0,0.20)"
              : "0 8px 32px rgba(22,90,82,0.40)",
          }}
        >
          <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-base font-black text-white">{isActive ? l.ctaActive : l.cta}</p>
            <p className="text-[11px] text-white/70 font-medium">{l.viewSubsDesc}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-white shrink-0" />
        </motion.button>

        {/* Guarantee line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="text-center text-[11px] text-black/40 font-medium"
        >
          {l.guarantee}
        </motion.p>
      </main>
    </div>
  );
}
