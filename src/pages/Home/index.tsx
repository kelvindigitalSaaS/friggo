import { Navigate } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { FabAddButton } from "./components/FabAddButton";
import { HomeTab } from "./components/tabs/HomeTab";
import { FridgeTab } from "./components/tabs/FridgeTab";
import { RecipesTabNew as RecipesTab } from "./components/tabs/RecipesTabNew";
import { PlannerTab } from "./components/tabs/PlannerTab";
import { ShoppingTab } from "./components/tabs/ShoppingTab";
import { SettingsTab } from "./components/tabs/SettingsTab";
import Onboarding from "@/pages/Onboarding";
import { motion, AnimatePresence } from "framer-motion";
import { useHomeLogic } from "./logic/useHomeLogic";
import { useAccountSession } from "@/hooks/useAccountSession";
import { SessionConflictModal } from "./components/SessionConflictModal";
import { useKaza } from "@/contexts/KazaContext";
import { useAuth } from "@/hooks/useAuth";

function LoadingScreen() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-primary dark:bg-primary/90 animate-fade-in">
      <div className="flex flex-col items-center">
        <div className="relative mb-5">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.25rem] bg-white flex items-center justify-center shadow-xl overflow-hidden">
            <svg className="w-12 h-12 md:w-14 md:h-14 text-primary" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 50 150 L 100 40 L 150 150"/>
              <line x1="65" y1="115" x2="135" y2="115"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white mb-1">Kaza</h1>
        <p className="text-xs text-white/70 mb-5">Carregando...</p>
        <div className="w-24 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-white animate-[loading-bar_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

const tabSpring = { type: "spring" as const, stiffness: 350, damping: 30, mass: 0.8 };

function KazaApp() {
  const {
    activeTab,
    handleTabChange,
    getTabDirection,
    loading,
    ready,
    user,
    isOnboarded,
    authLoading
  } = useHomeLogic();

  const { homeId } = useKaza();
  const { signOut } = useAuth();
  const { hasConflict, otherSessions, disconnectAllOthers } = useAccountSession(homeId);

  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading || !ready) {
    return <LoadingScreen />;
  }

  if (!isOnboarded) {
    return <Onboarding key={user?.id} />;
  }

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#091f1c] pb-nav-safe overflow-x-hidden">
      <main className="mx-auto max-w-lg px-3 sm:px-4 pt-safe relative h-full">
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

      <SessionConflictModal
        isOpen={hasConflict}
        sessions={otherSessions}
        onDisconnectAll={disconnectAllOthers}
        onCancel={() => signOut()}
      />
    </div>
  );
}

export default function Index() {
  return <KazaApp />;
}
