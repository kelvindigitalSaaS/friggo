import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const privacyData = {
  "pt-BR": {
    title: "Privacidade",
    subtitle: "Privacidade e Dados",
    lastUpdate: "Última atualização: Abril de 2024",
    promise: "Sua privacidade é nossa prioridade. Todos os seus dados de consumo, geladeira e preferências são criptografados de ponta a ponta.",
    sections: [
      {
        title: "Dados que coletamos",
        content: "Coletamos apenas o essencial para o funcionamento do app: seu e-mail (para conta), nome (para personalização) e os itens que você insere na geladeira para gerar alertas e receitas.",
        icon: Eye
      },
      {
        title: "Segurança Bancária",
        content: "Não armazenamos dados de cartão de crédito. Todos os pagamentos são processados pela Kiwify, com criptografia de nível bancário e conformidade com as normas internacionais de segurança.",
        icon: Lock
      },
      {
        title: "Uso de Informações",
        content: "Seus dados nunca são vendidos ou compartilhados com terceiros. O algoritmo do Kaza processa suas preferências localmente para oferecer a melhor experiência sem vazar informações.",
        icon: Shield
      }
    ],
    footer: "Ao usar o Kaza, você concorda com nossos termos de uso."
  },
  en: {
    title: "Privacy",
    subtitle: "Privacy & Data",
    lastUpdate: "Last update: April 2024",
    promise: "Your privacy is our priority. All your consumption data, fridge items, and preferences are encrypted end-to-end.",
    sections: [
      {
        title: "Data we collect",
        content: "We collect only the essentials: your email (for account), name (for personalization), and items you enter to generate alerts and recipes.",
        icon: Eye
      },
      {
        title: "Bank-level Security",
        content: "We do not store credit card data. All payments are processed by Kiwify with bank-level encryption.",
        icon: Lock
      }
    ],
    footer: "By using Kaza, you agree to our terms of use."
  },
  es: {
    title: "Privacidad",
    subtitle: "Privacidad y Datos",
    lastUpdate: "Última actualización: Abril 2024",
    promise: "Tu privacidad es nuestra prioridad. Todos tus datos están encriptados de punta a punta.",
    sections: [
      {
        title: "Datos que recolectamos",
        content: "Recolectamos solo lo esencial para el funcionamiento de la app.",
        icon: Eye
      }
    ],
    footer: "Al usar Kaza, aceptas nuestros términos de uso."
  }
};

export default function PrivacyPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const data = privacyData[language as keyof typeof privacyData] || privacyData.en;

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
        <h1 className="text-lg font-bold text-foreground">{data.title}</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-500/10 mb-2">
            <Lock className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-foreground">{data.subtitle}</h2>
          <p className="text-xs text-muted-foreground font-bold">{data.lastUpdate}</p>
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 p-6"
        >
          <div className="flex gap-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 leading-relaxed">
              {data.promise}
            </p>
          </div>
        </motion.section>

        <div className="space-y-4">
          {data.sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.section 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-[1.5rem] border border-black/[0.04] dark:border-white/[0.06] bg-white dark:bg-white/5 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-black text-foreground">{section.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {section.content}
                </p>
              </motion.section>
            );
          })}
        </div>

        <footer className="pt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-black/[0.04] dark:border-white/[0.06]">
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{data.footer}</span>
          </div>
          <p className="mt-4 text-[14px] font-cursive italic text-muted-foreground/60">Kaza Privacy Standard v1.2</p>
        </footer>
      </main>
    </div>
  );
}
