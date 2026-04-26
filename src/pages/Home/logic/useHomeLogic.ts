import { useState, useEffect, useRef, useCallback } from "react";
import { useKaza } from "@/contexts/KazaContext";
import { useAuth } from "@/hooks/useAuth";

const TAB_ORDER = ["home", "fridge", "recipes", "planner", "shopping", "settings"];
const TAB_STORAGE_KEY = "Kaza-active-tab";

export function useHomeLogic() {
  const { loading: KazaLoading, isOnboarded, homeId } = useKaza();
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
  const prevUserId = useRef<string | undefined>(undefined);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    if (user?.id !== prevUserId.current) {
      hasLoadedOnce.current = false;
      prevUserId.current = user?.id;
    }
    if (!authLoading && !KazaLoading && user) {
      hasLoadedOnce.current = true;
    }
  }, [homeId, user?.id, authLoading, KazaLoading]);

  const handleTabChange = useCallback((tab: string) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
    try {
      sessionStorage.setItem(TAB_STORAGE_KEY, tab);
    } catch { /* ignore */ }
  }, [activeTab]);

  useEffect(() => {
    const handleNavigateTab = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && TAB_ORDER.includes(customEvent.detail)) {
        handleTabChange(customEvent.detail);
      }
    };
    window.addEventListener("navigateTab", handleNavigateTab);
    return () => window.removeEventListener("navigateTab", handleNavigateTab);
  }, [handleTabChange]);

  useEffect(() => {
    if (!authLoading) requireAuth();
  }, [authLoading, requireAuth]);

  const getTabDirection = useCallback((): number => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    const prevIndex = TAB_ORDER.indexOf(prevTab);
    return currentIndex > prevIndex ? 1 : -1;
  }, [activeTab, prevTab]);

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    getTabDirection,
    loading: (authLoading || KazaLoading) && !hasLoadedOnce.current,
    ready: user && !KazaLoading,
    user,
    isOnboarded,
    authLoading
  };
}
