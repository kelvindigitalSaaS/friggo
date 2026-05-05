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
    <nav className="fixed bottom-nav-float left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[min(500px,calc(100vw-1.5rem))] z-50 rounded-[2.5rem] border border-white/[0.08] bg-black/40 dark:bg-black/60 backdrop-blur-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center">
      <div className="mx-auto flex h-[4.8rem] w-full items-center justify-between px-2 sm:px-4">
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
              whileTap={{ scale: 0.88 }}
              transition={appleSpring}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-1 relative cursor-pointer touch-manipulation min-w-[44px] h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-white/40 hover:text-white/60"
              )}
            >
              <div className="relative flex h-8 w-8 items-center justify-center">
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-2xl bg-primary/20 shadow-[0_0_15px_rgba(36,200,90,0.2)]"
                    transition={appleSpring}
                  />
                )}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    y: isActive ? -1 : 0,
                  }}
                  transition={appleSpring}
                >
                  <Icon className={cn("h-[20px] w-[20px] relative z-10 transition-colors", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                </motion.div>
              </div>
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="text-[8px] font-bold uppercase tracking-[0.05em]"
              >
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Apple Home Indicator Style */}
      <div className="w-24 h-1 mb-1.5 rounded-full bg-white/20 shrink-0" />
    </nav>
  );
}
