import {
  Home,
  Refrigerator,
  ShoppingCart,
  ChefHat,
  CalendarDays,
  Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const appleSpring = { type: "spring" as const, stiffness: 400, damping: 28, mass: 0.6 };

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t, language } = useLanguage();

  const tabs = [
    { id: "home", label: t.home, icon: Home },
    { id: "fridge", label: language === 'pt-BR' ? 'Dispensa' : language === 'es' ? 'Estoque' : 'Stock', icon: Refrigerator },
    { id: "recipes", label: t.recipes, icon: ChefHat },
    { id: "planner", label: language === 'pt-BR' ? 'Plano' : language === 'es' ? 'Plan' : 'Planner', icon: CalendarDays },
    { id: "shopping", label: t.shopping, icon: ShoppingCart },
    { id: "settings", label: t.settings, icon: Settings2 }
  ];

  return (
    <nav className="fixed bottom-nav-float left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[min(500px,calc(100vw-1.5rem))] z-50 rounded-[2rem] border border-black/[0.05] dark:border-white/[0.08] bg-white/80 dark:bg-[#111]/80 backdrop-blur-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex h-[5.2rem] w-full items-center justify-between px-1 sm:px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={(e) => {
                e.preventDefault();
                onTabChange(tab.id);
              }}
              whileTap={{ scale: 0.85 }}
              transition={appleSpring}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-1 relative cursor-pointer touch-manipulation min-w-[48px] h-full",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground/80"
              )}
            >
              <div className="relative flex h-9 w-9 items-center justify-center">
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-2xl bg-primary/10 shadow-sm"
                    transition={appleSpring}
                  />
                )}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -1 : 0,
                  }}
                  transition={appleSpring}
                >
                  <Icon className={cn("h-[22px] w-[22px] relative z-10 transition-colors", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                </motion.div>
              </div>
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  fontWeight: isActive ? 700 : 500,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="text-[9px] uppercase tracking-tighter"
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
