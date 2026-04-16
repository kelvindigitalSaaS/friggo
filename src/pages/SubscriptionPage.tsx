import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription, SubscriptionPlan, PLAN_DETAILS } from "@/contexts/SubscriptionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
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
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const labels = {
  "pt-BR": {
    title: "Sua Assinatura",
    premiumTrial: "Premium Trial",
    premium: "Premium",
    free: "Grátis",
    memberSince: "Membro desde",
    status: "Status",
    active: "Ativo",
    paymentHistory: "Histórico de Pagamento",
    noHistory: "Nenhum pagamento registrado ainda.",
    upgradeTitle: "Evolua para o Kaza Premium",
    upgradeDesc: "Economize tempo, evite desperdício e tenha total controle da sua cozinha.",
    getStarted: "Assinar Agora",
    priceTag: "R$ 27,00/mês",
    securityTitle: "Segurança Total",
    securityDesc: "Seus dados estão 100% criptografados. Pagamentos processados pela Cakto, a plataforma mais segura do Brasil, com suporte a PIX Parcelado e Recorrência.",
    benefits: [
      "Itens e receitas ilimitadas",
      "Alertas inteligentes sem restrição",
      "Economia real de dinheiro evitando desperdício",
      "Sua vida mais organizada e saudável",
      "Acesso antecipado a novas funções"
    ]
  },
  en: {
    title: "Your Subscription",
    premiumTrial: "Premium Trial",
    premium: "Premium",
    free: "Free",
    memberSince: "Member since",
    status: "Status",
    active: "Active",
    paymentHistory: "Payment History",
    noHistory: "No payment history yet.",
    upgradeTitle: "Upgrade to Kaza Premium",
    upgradeDesc: "Save time, avoid waste, and take full control of your kitchen.",
    getStarted: "Subscribe Now",
    priceTag: "$5.00/mo",
    securityTitle: "Total Security",
    securityDesc: "Your data is 100% encrypted. Payments processed by Cakto, one of the world's most secure platforms.",
    benefits: [
      "Unlimited items and recipes",
      "Unrestricted smart alerts",
      "Real money savings by avoiding waste",
      "A more organized and healthy life",
      "Early access to new features"
    ]
  },
  es: {
    title: "Tu Suscripción",
    premiumTrial: "Premium Trial",
    premium: "Premium",
    free: "Gratis",
    memberSince: "Miembro desde",
    status: "Status",
    active: "Activo",
    paymentHistory: "Historial de Pagos",
    noHistory: "No hay historial de pagos aún.",
    upgradeTitle: "Evoluciona a Kaza Premium",
    upgradeDesc: "Ahorra tiempo, evita el desperdicio y toma el control total de tu cocina.",
    getStarted: "Suscribirse Ahora",
    priceTag: "R$ 27,00/mes",
    securityTitle: "Seguridad Total",
    securityDesc: "Tus datos están 100% encriptados. Pagos procesados por Cakto, la plataforma más segura.",
    benefits: [
      "Items y recetas ilimitados",
      "Alertas inteligentes sin restricción",
      "Ahorro real de dinero evitando el desperdicio",
      "Tu vida más organizada y saludable",
      "Acceso anticipado a nuevas funciones"
    ]
  }
};

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { subscription, trialDaysRemaining, registrationDate } = useSubscription();
  const checkoutUrl = "https://pay.cakto.com.br/wbjq4ne_846287";
  const l = labels[language as keyof typeof labels] || labels.en;

  const isTrial = subscription?.plan === "premium" && trialDaysRemaining > 0;
  const planName = isTrial ? l.premiumTrial : (subscription?.plan === "premium" ? l.premium : l.free);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] pb-10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.06] px-4 h-16 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted/50 text-foreground transition-all active:scale-90"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{l.title}</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* Current Status Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.06] p-6 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Crown className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{l.status}</p>
              <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
                {planName}
                {subscription?.isActive && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-black/[0.04] dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">{l.memberSince}</span>
              </div>
              <span className="text-sm font-bold text-foreground">
                {registrationDate ? new Date(registrationDate).toLocaleDateString(language) : "-"}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-1">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-foreground">{l.active}</span>
              </div>
              <span className="text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
                {subscription?.plan === 'premium' ? 'Premium' : 'Trial'}
              </span>
            </div>
          </div>
        </motion.section>

        {/* Upgrade Card (High Impact) */}
        {subscription?.plan !== 'premium' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[2.5rem] bg-[#111] dark:bg-white/[0.03] p-8 text-white shadow-2xl relative overflow-hidden group border border-white/10"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[2px] text-primary border border-primary/20">
                  <Sparkles className="h-3 w-3" /> {l.premium}
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Investimento</p>
                  <p className="text-2xl font-black text-white">{l.priceTag}</p>
                </div>
              </div>
              
              <h3 className="text-3xl font-black leading-tight mb-3 tracking-tighter">
                {l.upgradeTitle}
              </h3>
              <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed max-w-[280px]">
                {l.upgradeDesc}
              </p>

              <div className="grid gap-4 mb-10">
                {l.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => window.open(checkoutUrl, "_blank")}
                className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 border-b-4 border-black/20"
              >
                {l.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-[10px] text-center text-white/30 font-bold uppercase tracking-widest mt-6">
                Acesso imediato após confirmação do PIX
              </p>
            </div>
          </motion.section>
        )}

        {/* Security Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-[2rem] bg-white dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.06] p-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Lock className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-black text-foreground mb-1">{l.securityTitle}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium mb-4">
                {l.securityDesc}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-primary/10">
                  <img
                    src="https://app.cakto.com.br/logo/green-text-logo-transparent-background-login.png"
                    alt="Cakto Safe Pay"
                    className="h-5 object-contain"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-primary/5 px-2.5 py-1.5 rounded-md border border-primary/10">
                    <Zap className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase">PIX Mensal</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/5 px-2.5 py-1.5 rounded-md border border-emerald-500/10">
                    <CreditCard className="h-3 w-3 text-emerald-600" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase">Cartão de Crédito</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Payment History */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[1.5px] px-1 flex items-center gap-2">
            <History className="h-3.5 w-3.5" /> {l.paymentHistory}
          </h3>
          
          <div className="rounded-[2rem] bg-white dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.06] p-8 text-center shadow-sm">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted/60 mb-4">
              <CreditCard className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <p className="text-sm font-bold text-muted-foreground">{l.noHistory}</p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
