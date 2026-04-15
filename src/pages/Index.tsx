import { useState, useEffect, useRef, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useFriggo } from "@/contexts/FriggoContext";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/friggo/BottomNav";
import { FabAddButton } from "@/components/friggo/FabAddButton";
import { HomeTab } from "@/components/friggo/tabs/HomeTab";
import { FridgeTab } from "@/components/friggo/tabs/FridgeTab";
import { RecipesTab } from "@/components/friggo/tabs/RecipesTab";
import { PlannerTab } from "@/components/friggo/tabs/PlannerTab";
import { ShoppingTab } from "@/components/friggo/tabs/ShoppingTab";
import { SettingsTab } from "@/components/friggo/tabs/SettingsTab";
import { Onboarding } from "@/components/friggo/Onboarding";
import { motion, AnimatePresence } from "framer-motion";
import BrandName from '@/components/friggo/BrandName';

function LoadingScreen() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] animate-fade-in">
      <div className="flex flex-col items-center">
            <div className="relative mb-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center shadow-lg shadow-primary/10 overflow-hidden">
              <img
                src="/icon.png"
                alt="Friggo"
                width={80}
                height={80}
                className="w-full h-full object-cover transform scale-[1.4]"
                loading="eager"
                decoding="async"
              />
            </div>
          <div className="absolute inset-0 rounded-[1.5rem] bg-primary/10 blur-2xl -z-10 scale-150" />
        </div>
        <BrandName label="Friggo" sizeClass="text-xl md:text-2xl" />
        <p className="text-xs text-muted-foreground mb-6">Carregando...</p>
            <div className="w-24 h-1 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-primary/70 animate-[loading-bar_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

const TAB_ORDER = ["home", "fridge", "recipes", "shopping", "settings"];

const TAB_STORAGE_KEY = "friggo-active-tab";

const tabSpring = { type: "spring" as const, stiffness: 350, damping: 30, mass: 0.8 };

function FriggoApp() {
  const { loading: friggoLoading, isOnboarded } = useFriggo();
  const { user, loading: authLoading, requireAuth } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const saved = sessionStorage.getItem(TAB_STORAGE_KEY);
      return saved && TAB_ORDER.includes(saved) ? saved : "home";
    } catch {
      return "home";
    }
  });
  const [prevTab, setPrevTab] = useState(activeTab);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    if (!authLoading && !friggoLoading) {
      hasLoadedOnce.current = true;
    }
  }, [authLoading, friggoLoading]);

  const handleTabChange = useCallback((tab: string) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
    try {
      sessionStorage.setItem(TAB_STORAGE_KEY, tab);
    } catch {}
  }, [activeTab]);

  // Verificar autenticação
  useEffect(() => {
    if (!authLoading) {
      requireAuth();
    }
  }, [authLoading, requireAuth]);

  // Redirecionar se não estiver autenticado
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  const [showLocalLoading, setShowLocalLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if ((authLoading || friggoLoading) && !hasLoadedOnce.current) {
      timeout = setTimeout(() => setShowLocalLoading(true), 300);
    } else {
      setShowLocalLoading(false);
    }
    return () => clearTimeout(timeout);
  }, [authLoading, friggoLoading]);

  // Only show loading on first load, not when returning from background
  if ((authLoading || friggoLoading) && !hasLoadedOnce.current && showLocalLoading) {
    return <LoadingScreen />;
  }

  // Mandatory Onboarding
  if (!isOnboarded) {
    return <Onboarding />;
  }

  const getTabDirection = (): number => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    const prevIndex = TAB_ORDER.indexOf(prevTab);
    return currentIndex > prevIndex ? 1 : -1;
  };

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#0a0a0a] pb-20 overflow-hidden">
      <main className="mx-auto max-w-lg px-4 pt-safe relative h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: getTabDirection() * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: getTabDirection() * -20 }}
            transition={tabSpring}
          >
            {activeTab === "home" && <HomeTab />}
            {activeTab === "fridge" && <FridgeTab />}
            {activeTab === "recipes" && <RecipesTab />}
            {activeTab === "planner" && <PlannerTab />}
            {activeTab === "shopping" && <ShoppingTab />}
            {activeTab === "settings" && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </main>
      <FabAddButton activeTab={activeTab} />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default function Index() {
  const { user, loading } = useAuth();
  const [showLoading, setShowLoading] = useState(false);
  const hasShownLoading = useRef(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading && !hasShownLoading.current) {
      timeout = setTimeout(() => setShowLoading(true), 300);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  if (loading && !hasShownLoading.current && showLoading) {
    return <LoadingScreen />;
  }

  if (!loading) {
    hasShownLoading.current = true;
  }

  // Redirect to auth if not logged in
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  return <FriggoApp />;
}
