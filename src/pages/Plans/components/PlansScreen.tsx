import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import {
  Check,
  Crown,
  Star,
  CreditCard,
  Users,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const INDIVIDUAL_URL = "https://pay.cakto.com.br/356go8z";
const TRIO_URL = "https://pay.cakto.com.br/wbjq4ne_846287";

const INDIVIDUAL_FEATURES = {
  "pt-BR": [
    "Itens e receitas ilimitados",
    "Lista de compras ilimitada",
    "Alertas de vencimento inteligentes",
    "Planejador semanal de refeições",
    "Controle de consumíveis",
    "Lembrete de coleta de lixo",
    "Histórico completo de consumo",
  ],
  en: [
    "Unlimited items and recipes",
    "Unlimited shopping list",
    "Smart expiry alerts",
    "Weekly meal planner",
    "Consumables tracking",
    "Garbage pickup reminder",
    "Full consumption history",
  ],
};

const TRIO_FEATURES = {
  "pt-BR": [
    "Tudo do plano Individual",
    "Até 3 perfis simultâneos",
    "Cada pessoa com sua própria geladeira",
    "Lista de compras compartilhada e sincronizada",
    "Planejador de refeições por pessoa",
    "Notificações independentes por perfil",
    "Sincronização em tempo real entre os membros",
  ],
  en: [
    "Everything in Individual",
    "Up to 3 simultaneous profiles",
    "Each person with their own fridge",
    "Shared & synced shopping list",
    "Meal planner per person",
    "Independent notifications per profile",
    "Real-time sync between members",
  ],
};

interface PlansScreenProps {
  onClose?: () => void;
}

export function PlansScreen({ onClose }: PlansScreenProps) {
  const { language } = useLanguage();
  const { trialDaysRemaining, subscription } = useSubscription();

  const isPremium = subscription?.plan === "premium" || 
                    subscription?.plan === "individualPRO" || 
                    subscription?.plan === "multiPRO";

  const featIndividual = INDIVIDUAL_FEATURES[language as keyof typeof INDIVIDUAL_FEATURES] ?? INDIVIDUAL_FEATURES["pt-BR"];
  const featTrio = TRIO_FEATURES[language as keyof typeof TRIO_FEATURES] ?? TRIO_FEATURES["pt-BR"];

  return (
    <div className="space-y-5 p-4 max-w-lg mx-auto">
      {/* INDIVIDUAL PLAN */}
      <div className="rounded-3xl bg-white dark:bg-[#11302c] border border-[#E2E1DC] dark:border-white/10 shadow-sm overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-11 w-11 rounded-xl bg-[#EDECEA] dark:bg-white/10 flex items-center justify-center">
              <User className="h-5 w-5 text-[#3D3D3A] dark:text-white/70" />
            </div>
            <div>
              <p className="font-black text-[17px] text-[#2C2C2A] dark:text-white leading-tight">Individual</p>
              <p className="text-[12px] text-[#9A998F] dark:text-white/40 font-medium">
                {language === "pt-BR" ? "Para 1 perfil" : "For 1 profile"}
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-[38px] font-black text-[#2C2C2A] dark:text-white tracking-tight leading-none">R$ 14,99</span>
            <span className="text-[14px] font-semibold text-[#B0AFA7] dark:text-white/30">
              {language === "pt-BR" ? "/mês" : "/mo"}
            </span>
          </div>
          
          <div className="space-y-2.5 my-5">
            {featIndividual.map((feat) => (
              <div key={feat} className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-[#3D6B55]" />
                <span className="text-[13px] font-medium text-[#7A7A72] dark:text-white/60">{feat}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => window.open(INDIVIDUAL_URL, "_blank")}
            disabled={isPremium}
            className={cn(
              "w-full h-14 rounded-2xl font-black text-[15px] transition-all active:scale-[0.97] flex items-center justify-center gap-2 shadow-sm",
              isPremium ? "bg-[#EDECEA] text-[#B0AFA7]" : "bg-[#2C2C2A] text-white"
            )}
          >
            {isPremium ? "Já Assinado" : "Assinar Individual"}
          </button>
        </div>
      </div>

      {/* TRIO PLAN */}
      <div className="relative rounded-3xl bg-[#0a2520] px-6 pt-8 pb-6 shadow-xl shadow-[#3D6B55]/20 overflow-hidden">
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#3D6B55] text-white text-[10px] font-black uppercase">
          {language === "pt-BR" ? "Mais Popular" : "Most Popular"}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-11 w-11 rounded-xl bg-[#3D6B55]/30 flex items-center justify-center">
            <Users className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <p className="font-black text-[17px] text-white leading-tight">Trio</p>
            <p className="text-[12px] text-emerald-400/70 font-medium">Até 3 perfis</p>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 mb-5">
          <span className="text-[38px] font-black text-white tracking-tight leading-none">R$ 27,00</span>
          <span className="text-[14px] font-semibold text-white/40">/mês</span>
        </div>

        <div className="space-y-2.5 mb-6">
          {featTrio.map((feat) => (
            <div key={feat} className="flex items-center gap-2.5 text-white/60 text-[13px]">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => window.open(TRIO_URL, "_blank")}
          disabled={isPremium}
          className={cn(
            "w-full h-16 rounded-2xl font-black text-[16px] transition-all active:scale-[0.97] flex items-center justify-center gap-3 shadow-lg",
            isPremium ? "bg-white/10 text-white/30" : "bg-[#3D6B55] text-white"
          )}
        >
          {isPremium ? "Já Assinado" : "Assinar Trio"} <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <p className="text-center text-[11px] text-[#B0AFA7] font-medium py-4">
        Pagamento seguro processado pela Cakto · PIX e cartão
      </p>
    </div>
  );
}
