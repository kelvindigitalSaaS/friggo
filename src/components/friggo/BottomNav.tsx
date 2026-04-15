import {
  Home,
  Refrigerator,
  ShoppingCart,
  ChefHat,
  CalendarDays,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabLabels = {
  "pt-BR": {
    home: "Início",
    fridge: "Estoque",
    recipes: "Receitas",
    shopping: "Lista",
    settings: "Perfil"
  },
  en: {
    home: "Home",
    fridge: "Pantry",
    recipes: "Recipes",
    shopping: "Shopping",
    settings: "Settings"
  },
  es: {
    home: "Inicio",
    fridge: "Despensa",
    recipes: "Recetas",
    shopping: "Compras",
    settings: "Ajustes"
  }
};

const appleSpring = { type: "spring" as const, stiffness: 400, damping: 28, mass: 0.6 };

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { language } = useLanguage();
  const l = tabLabels[language];

  const tabs = [
    { id: "home", label: l.home, icon: Home },
    { id: "fridge", label: l.fridge, icon: Refrigerator },
    { id: "recipes", label: l.recipes, icon: ChefHat },
    { id: "shopping", label: l.shopping, icon: ShoppingCart },
    { id: "settings", label: l.settings, icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.06] dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl bottom-nav-safe pb-safe">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileTap={{ scale: 0.85 }}
              transition={appleSpring}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 relative",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <div className="relative flex h-8 w-8 items-center justify-center">
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-xl bg-primary/12 shadow-sm"
                    transition={appleSpring}
                  />
                )}
                <motion.div
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    y: isActive ? -1 : 0,
                  }}
                  transition={appleSpring}
                >
                  <Icon className="h-[22px] w-[22px] relative z-10" />
                </motion.div>
              </div>
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  fontWeight: isActive ? 600 : 500,
                }}
                transition={{ duration: 0.2 }}
                className="text-[10px]"
              >
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
