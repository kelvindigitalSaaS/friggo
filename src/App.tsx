import { useEffect, useState, ReactNode, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { SubscriptionProvider, useSubscription } from "@/contexts/SubscriptionContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { KazaProvider, useKaza } from "@/contexts/FriggoContext";
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

const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SuccessPage = lazy(() => import("@/pages/SuccessPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MonthlyReportPage = lazy(() => import("@/pages/MonthlyReportPage"));
const NightCheckupPage = lazy(() => import("@/pages/NightCheckupPage"));
const PlansPage = lazy(() => import("./pages/PlansPage"));
const CheckoutSuccessPage = lazy(() => import("./pages/CheckoutSuccessPage"));
const CheckoutCancelPage = lazy(() => import("./pages/CheckoutCancelPage"));
const AddItemPage = lazy(() => import("./pages/AddItemPage"));
const ConsumePage = lazy(() => import("./pages/ConsumePage"));
const RecipePage = lazy(() => import("./pages/RecipePage"));
const ConsumableTrackerPage = lazy(() => import("./pages/ConsumableTrackerPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const GarbageReminderPage = lazy(() => import("./pages/GarbageReminderPage"));
const InstallGuidePage = lazy(() => import("./pages/InstallGuidePage"));
const SubscriptionPage = lazy(() => import("./pages/SubscriptionPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));

const queryClient = new QueryClient();

function PageSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20" />
        <div className="h-4 w-32 bg-muted rounded" />
      </div>
    </div>
  );
}

/** Tela de carregamento com visual Kaza */
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
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-primary dark:bg-primary/90">
      <div className="flex flex-col items-center px-6">
        <div className="relative mb-6">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-[1.5rem] bg-white flex items-center justify-center shadow-xl overflow-hidden">
            <svg className="w-16 h-16 md:w-20 md:h-20 text-primary" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <g fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 50 150 L 100 40 L 150 150"/>
                <line x1="65" y1="115" x2="135" y2="115"/>
              </g>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Kaza</h1>
        <p className="text-sm font-medium text-white/80 mb-6">Tudo o que sua casa precisa</p>

        <div className="w-48 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-all duration-300 ease-out"
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
  const { isOnboarded, loading: friggoLoading } = useKaza();

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
            <KazaProvider>
              <PWAProvider>
                <ThemeProvider>
                  <TooltipProvider>
                    <OfflineOverlay />
                    <PWAInstallGuide />
                    <Toaster />
                    <Sonner />
                    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
                      <AuthGuard>
                        <Suspense fallback={<PageSkeleton />}>
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
                        </Suspense>
                      </AuthGuard>
                    </BrowserRouter>
                  </TooltipProvider>
                </ThemeProvider>
              </PWAProvider>
            </KazaProvider>
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
