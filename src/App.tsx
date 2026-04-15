import { useEffect, useState, ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { SubscriptionProvider, useSubscription } from "@/contexts/SubscriptionContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FriggoProvider, useFriggo } from "@/contexts/FriggoContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PWAProvider } from "@/contexts/PWAContext";
import {
  listenForDeepLinks,
  parseStripeRedirect,
  closeInAppBrowser
} from "@/lib/nativeBrowser";
import { registerBackButton } from "@/lib/nativeUI";
import { supabase } from "@/integrations/supabase/client";
import { Sentry } from "@/lib/sentry";
import { OfflineOverlay } from "@/components/friggo/OfflineOverlay";
import PWAInstallGuide from "@/components/friggo/PWAInstallGuide";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SuccessPage from "@/pages/SuccessPage";
import Checkout from "./pages/Checkout";
import MonthlyReportPage from "./pages/MonthlyReportPage";
import NightCheckupPage from "./pages/NightCheckupPage";
import PlansPage from "./pages/PlansPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutCancelPage";
import AddItemPage from "./pages/AddItemPage";
import ConsumePage from "./pages/ConsumePage";
import RecipePage from "./pages/RecipePage";
import ConsumableTrackerPage from "./pages/ConsumableTrackerPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import GarbageReminderPage from "./pages/GarbageReminderPage";
import InstallGuidePage from "./pages/InstallGuidePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";

const queryClient = new QueryClient();

/** Redireciona para /auth se não estiver logado */
function SplashLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const interval = 16;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p >= 100) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a]">
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.75rem] bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center shadow-lg shadow-primary/10 overflow-hidden">
               <img
                src="/icon.png"
                alt="Friggo"
                width={96}
                height={96}
                className="w-full h-full object-cover transform scale-[1.2]"
                loading="eager"
                decoding="async"
              />
          </div>
          <div className="absolute inset-0 rounded-[1.75rem] bg-primary/10 blur-2xl -z-10 scale-150" />
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-2xl font-black tracking-tighter text-foreground">Friggo</span>
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
        
        <p className="text-[10px] font-black uppercase tracking-[3px] text-muted-foreground/60 mb-8">
          Smart Home Assistant
        </p>

        <div className="w-48 h-1 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/** Redireciona para /auth se não estiver logado */
function ProtectedRoute({ element, allowLocked = false, allowOnboarding = false }: { element: JSX.Element, allowLocked?: boolean, allowOnboarding?: boolean }) {
  const [minLoadingDone, setMinLoadingDone] = useState(false);
  const { user, loading: authLoading, requireAuth } = useAuth();
  const { isLocked, loading: subLoading } = useSubscription();
  const { isOnboarded, loading: friggoLoading } = useFriggo();

  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingDone(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      requireAuth();
    }
  }, [user, authLoading, requireAuth]);

  if (authLoading || subLoading || friggoLoading || !minLoadingDone) {
    return <SplashLoader />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (isLocked && !allowLocked) {
    return <Navigate to="/?subscription=open" replace />;
  }

  // Mandatory Onboarding Flow
  if (!isOnboarded && !allowOnboarding && window.location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  return element;
}

/** Wrapper que verifica autenticação em cada render */
function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading, requireAuth } = useAuth();

  useEffect(() => {
    // Verificar autenticação a cada 30 segundos
    const checkAuth = () => {
      if (!loading) {
        requireAuth();
      }
    };

    const interval = setInterval(checkAuth, 30000);
    checkAuth(); // Verificar imediatamente

    return () => clearInterval(interval);
  }, [loading, requireAuth]);

  // Se não está carregando e não tem usuário, redirecionar
  useEffect(() => {
    if (!loading && !user && window.location.pathname !== "/auth") {
      window.location.href = "/auth";
    }
  }, [user, loading]);

  return <>{children}</>;
}

const App = () => {
  // Listen for deep-link returns (auth callback, Stripe checkout)
  useEffect(() => {
    listenForDeepLinks(async (url) => {
      // Handle OAuth callback (Google/Apple sign-in return)
      if (url.includes("auth/callback") || url.includes("auth%2Fcallback")) {
        await closeInAppBrowser();
        try {
          const normalized = url.replace("friggo://", "https://friggo.app/");
          const urlObj = new URL(normalized);

          // PKCE flow: exchange code for session
          const code = urlObj.searchParams.get("code");
          if (code) {
            await supabase.auth.exchangeCodeForSession(code);
            return;
          }

          // Implicit flow: set session from URL hash tokens
          const hashPart = url.split("#")[1];
          if (hashPart) {
            const hashParams = new URLSearchParams(hashPart);
            const accessToken = hashParams.get("access_token");
            const refreshToken = hashParams.get("refresh_token");
            if (accessToken && refreshToken) {
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              });
            }
          }
        } catch (error) {
          console.error("Auth callback error:", error);
        }
        return;
      }

      // Handle Stripe checkout redirect
      const result = parseStripeRedirect(url);
      if (result) {
        await closeInAppBrowser();
        const params = new URLSearchParams(window.location.search);
        params.set("subscription", result);
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params}`
        );
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    });

    registerBackButton(() => window.history.back());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <LanguageProvider>
            <FriggoProvider>
              <PWAProvider>
                <ThemeProvider>
                  <TooltipProvider>
                    <OfflineOverlay />
                    <PWAInstallGuide />
                    <Toaster />
                    <Sonner />
                    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
                      <AuthGuard>
                        <Routes>
                          <Route
                            path="/"
                            element={<ProtectedRoute element={<Index />} />}
                          />
                          <Route path="/auth" element={<Auth />} />
                          <Route
                            path="/checkout"
                            element={<ProtectedRoute element={<Checkout />} />}
                          />
                          <Route
                            path="/monthly-report"
                            element={
                              <ProtectedRoute element={<MonthlyReportPage />} />
                            }
                          />
                          <Route
                            path="/night-checkup"
                            element={
                              <ProtectedRoute element={<NightCheckupPage />} />
                            }
                          />
                          <Route
                            path="/plans"
                            element={<Navigate to="/settings/subscription" replace />}
                          />
                          <Route
                            path="/checkout/success"
                            element={
                              <ProtectedRoute element={<CheckoutSuccessPage />} allowLocked={true} />
                            }
                          />
                          <Route
                            path="/checkout/cancel"
                            element={
                              <ProtectedRoute element={<CheckoutCancelPage />} allowLocked={true} />
                            }
                          />
                          <Route
                            path="/add-item"
                            element={<ProtectedRoute element={<AddItemPage />} />}
                          />
                          <Route
                            path="/consume/:itemId"
                            element={<ProtectedRoute element={<ConsumePage />} />}
                          />
                          <Route
                            path="/recipe/:recipeId"
                            element={<ProtectedRoute element={<RecipePage />} />}
                          />
                          <Route
                            path="/consumables"
                            element={
                              <ProtectedRoute
                                element={<ConsumableTrackerPage />}
                              />
                            }
                          />
                          <Route
                            path="/notifications"
                            element={
                              <ProtectedRoute element={<NotificationsPage />} />
                            }
                          />
                          <Route
                            path="/profile"
                            element={<ProtectedRoute element={<ProfilePage />} />}
                          />
                          <Route
                            path="/activity-history"
                            element={<ProtectedRoute element={<HistoryPage />} />}
                          />
                          <Route
                            path="/garbage-reminder"
                            element={
                              <ProtectedRoute element={<GarbageReminderPage />} />
                            }
                          />
                          <Route
                            path="/sucesso"
                            element={
                              <ProtectedRoute element={<SuccessPage />} allowOnboarding={true} allowLocked={true} />
                            }
                          />
                          <Route
                            path="/settings/subscription"
                            element={<ProtectedRoute element={<SubscriptionPage />} />}
                          />
                          <Route
                            path="/settings/install"
                            element={<ProtectedRoute element={<InstallGuidePage />} />}
                          />
                          <Route
                            path="/settings/faq"
                            element={<ProtectedRoute element={<FAQPage />} />}
                          />
                          <Route
                            path="/settings/privacy"
                            element={<ProtectedRoute element={<PrivacyPage />} />}
                          />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </AuthGuard>
                    </BrowserRouter>
                  </TooltipProvider>
                </ThemeProvider>
              </PWAProvider>
            </FriggoProvider>
          </LanguageProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Sentry.withErrorBoundary(App, {
  fallback: ({ error }) => (
    <div className="flex h-screen items-center justify-center bg-background p-6 text-center">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Ops! Algo deu errado
        </h1>
        <p className="text-muted-foreground mb-4">
          O app encontrou um erro inesperado.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Recarregar App
        </button>
      </div>
    </div>
  )
});
