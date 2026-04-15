import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  KeyRound,
  CheckCircle2,
  ArrowLeft,
  UserPlus
} from "lucide-react";
import { motion } from "framer-motion";
import KazaLogin from '@/components/friggo/FriggoLogin';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLanguage } from '@/contexts/LanguageContext';
import BrandName from '@/components/friggo/BrandName';
import { isNative, isIOS } from "@/lib/capacitor";
import { openExternalUrl } from "@/lib/nativeBrowser";

type AuthView = "landing" | "login" | "register";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [view, setView] = useState<AuthView>(() => {
    const state = location.state as { initialView?: AuthView };
    return state?.initialView || "landing";
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [splashProgress, setSplashProgress] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  // promoEmail removed — no inline landing capture

  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Splash bar loader animation
  useEffect(() => {
    const duration = 1800;
    const interval = 16;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setSplashProgress(progress);
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setSplashDone(true);
          setTimeout(() => setMounted(true), 100);
        }, 300);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (view === "register") {
      if (formData.password !== formData.confirmPassword) {
        toast.error("As senhas não coincidem");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres");
        return;
      }
    }

    setLoading(true);

    try {
      if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        const redirectUrl = isNative
          ? "kaza://auth/callback"
          : window.location.origin;
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { name: formData.name },
            emailRedirectTo: redirectUrl
          }
        });
        if (error) throw error;

        if (data.user) {
          await supabase.from("profiles").upsert(
            {
              user_id: data.user.id,
              name: formData.name,
              onboarding_completed: false
            },
            { onConflict: "user_id" }
          );
        }

        if (data.user && !data.session) {
          toast.success("Verifique seu email para confirmar a conta!", {
            duration: 6000,
            description:
              "Enviamos um link de confirmação para " + formData.email
          });
          setView("login");
          return;
        }

        toast.success("Conta criada! Bem-vindo ao Kaza!");
        navigate("/");
      }
    } catch (error: any) {
      let message = "Erro ao processar. Tente novamente.";
      if (!navigator.onLine) {
        message = "Sem conexão com a internet. Verifique sua rede.";
      } else if (
        error.message === "Invalid login credentials" ||
        error.message?.includes("invalid_credentials")
      ) {
        message = "Email ou senha incorretos. Verifique e tente novamente.";
      } else if (error.message?.includes("Email not confirmed")) {
        message =
          "Confirme seu email antes de entrar. Verifique sua caixa de entrada.";
      } else if (
        error.message?.includes("already registered") ||
        error.message?.includes("User already registered")
      ) {
        message = "Este email já está cadastrado. Faça login.";
      } else if (error.message?.includes("Password should be at least")) {
        message = "A senha deve ter pelo menos 6 caracteres.";
      } else if (
        error.message?.includes("Too many requests") ||
        error.status === 429
      ) {
        message =
          "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
      } else if (error.message?.includes("weak_password")) {
        message = "Senha fraca. Use letras, números e símbolos.";
      } else if (error.message) {
        message = error.message;
      }
      toast.error(message, { duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
        if (isNative) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: "kaza://auth/callback",
            skipBrowserRedirect: true
          }
        });
        if (error) throw error;
        if (data.url) {
          await openExternalUrl(data.url);
        }
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao entrar com Google");
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
        if (isNative) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "apple",
          options: {
            redirectTo: "kaza://auth/callback",
            skipBrowserRedirect: true
          }
        });
        if (error) throw error;
        if (data.url) {
          await openExternalUrl(data.url);
        }
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "apple",
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao entrar com a Apple");
      setLoading(false);
    }
  };

  // handlePromoSubmit removed

  // Scroll to top when view changes
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [view]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Digite seu email");
      return;
    }

    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth`
      });
      if (error) throw error;
      setResetSent(true);
      toast.success("Email enviado! Verifique sua caixa de entrada.");
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar email");
    } finally {
      setResetLoading(false);
    }
  };

  const closeResetDialog = () => {
    setResetDialogOpen(false);
    setResetSent(false);
    setResetEmail("");
  };

  const goToLanding = () => {
    setView("landing");
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
  };

  // ── Splash Screen with Kaza logo + bar loader ──
  if (!splashDone) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#1a1a1a] dark:bg-[#0a0a0a]">
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-primary flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white/20">
              <svg className="w-16 h-16 text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M58 50 L58 150 C58 165 68 175 83 175 C98 175 108 165 108 150 L108 110 L130 110 C145 110 155 100 155 85 C155 70 145 60 130 60 L58 60 Z M108 50 L108 85 L130 85 C138 85 143 80 143 72 C143 64 138 59 130 59 Z"/>
              </svg>
            </div>
          </div>

          <BrandName label="Kaza" sizeClass="text-3xl md:text-4xl" showIcon={false} animateOnFirstLoad={false} />
          <p className="text-sm text-white/60 mb-10">
            Trazendo tecnologia para sua cozinha.
          </p>

          {/* Bar loader */}
          <div className="w-48 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-75 ease-linear"
              style={{ width: `${splashProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── Auth loading state ──
  if (authLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#1a1a1a] dark:bg-[#0a0a0a]">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary flex items-center justify-center mb-4 overflow-hidden">
          <svg className="w-10 h-10 text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M58 50 L58 150 C58 165 68 175 83 175 C98 175 108 165 108 150 L108 110 L130 110 C145 110 155 100 155 85 C155 70 145 60 130 60 L58 60 Z M108 50 L108 85 L130 85 C138 85 143 80 143 72 C143 64 138 59 130 59 Z"/>
          </svg>
        </div>
        <div className="w-36 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full rounded-full bg-primary animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] relative overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a] selection:bg-primary/20">
      {/* iOS 26 subtle mesh gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--primary)/0.06),transparent_50%),radial-gradient(ellipse_at_80%_20%,hsl(210_100%_80%/0.08),transparent_50%),radial-gradient(ellipse_at_50%_80%,hsl(160_70%_60%/0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 h-[100dvh] flex flex-col">
        {/* ═══════════ LANDING ═══════════ */}
        {view === "landing" && (
          <div className="flex-1 flex flex-col items-center justify-between pt-safe">
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div
                className={cn(
                  "relative mb-6 transition-all duration-700 ease-out",
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-[2rem] bg-white/88 dark:bg-white/8 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-xl flex items-center justify-center overflow-hidden">
                  <img
                    src="/icon.png"
                    alt="Kaza"
                    width={120}
                    height={120}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover transform scale-[1.2]"
                  />
                </div>
              </div>

              <BrandName label="Kaza" sizeClass="text-2xl md:text-3xl" showIcon={false} />
              <p className="text-sm text-muted-foreground mt-2 text-center max-w-[300px] leading-relaxed">
                Trazendo <span className="text-primary font-semibold">tecnologia</span> para sua cozinha.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">Deslize para baixo ou escolha uma opção para começar.</p>
            </div>

            <div className="w-full px-6 pb-8 pb-safe">
              <div className="max-w-md mx-auto space-y-3">
                <button
                  onClick={() => setView("register")}
                  disabled={loading}
                  className="w-full h-14 md:h-16 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/25 transition-transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center"
                >
                  {language === 'pt-BR' ? 'Teste grátis — 7 dias' : language === 'es' ? 'Prueba gratis — 7 días' : 'Free trial — 7 days'}
                </button>

                {/* removed big Google button from landing — keep only Entrar + Teste grátis */}

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"> 
                    <div className="w-full border-t border-black/[0.06] dark:border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-xs text-muted-foreground bg-[#fafafa] dark:bg-[#0a0a0a]">{language === 'pt-BR' ? 'ou' : language === 'es' ? 'o' : 'or'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setView("login")}
                  className="w-full h-12 rounded-2xl text-sm text-primary bg-primary/5 border border-primary/10"
                >
                  {language === 'pt-BR' ? 'Entrar' : language === 'es' ? 'Entrar' : 'Sign in'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ LOGIN / REGISTER ═══════════ */}
        {(view === "login" || view === "register") && (
          <div className="flex-1 flex flex-col pt-safe">
            {/* iOS-style nav bar */}
            <div className="flex items-center px-4 pt-3 pb-2">
              <button
                onClick={goToLanding}
                className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors p-2 -ml-2 rounded-xl active:bg-primary/5"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-[15px] font-medium">Voltar</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain pb-20" ref={formRef}>
              {view === 'login' && (
                <div className="text-center mt-3">
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          className="text-sm text-primary font-medium hover:underline"
                        >
                          {language === 'pt-BR' ? 'Ou entrar com Google' : language === 'es' ? 'O entrar con Google' : 'Or sign in with Google'}
                        </button>
                      </div>
                    )}

              {/* Header */}
              <div className="flex flex-col items-center pt-2 pb-4 px-6">
                  <BrandName label="Kaza" sizeClass="text-xl md:text-2xl" showIcon={false} animateOnFirstLoad={false} />
                  <h1 className="text-2xl font-bold tracking-tight text-foreground text-center mt-1">
                    {view === "login" ? "Bem-vindo de volta" : "Criar conta"}
                  </h1>
                <p className="text-[13px] text-muted-foreground mt-1 text-center max-w-[280px]">
                  {view === "login"
                    ? "Entre para continuar organizando sua casa"
                    : "Crie sua conta Kaza e comece agora sua organização inteligente"}
                </p>
              </div>

              {/* Social Login Section */}
              <div className="px-5 pt-2 pb-6">
                <div className="max-w-sm mx-auto space-y-3">
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleGoogleSignIn}
                          className="w-full h-[46px] md:h-[52px] rounded-2xl bg-white dark:bg-white/5 border border-black/[0.08] dark:border-white/10 hover:bg-background transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 shadow-sm"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span className="text-[15px] font-bold text-foreground">
                        {view === "login" ? "Entrar" : "Cadastrar"} com Google
                      </span>
                    </button>

                    {isIOS && (
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleAppleSignIn}
                        className="w-full h-[56px] rounded-2xl bg-black text-white hover:bg-black/90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 shadow-sm"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.8 1.56-.05 2.88.66 3.65 1.76-3.21 1.95-2.67 6.32.44 7.63-.73 1.63-1.63 3.08-2.75 3.58zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.37-2.03 4.41-3.74 4.25z" />
                        </svg>
                        <span className="text-[15px] font-semibold">Continuar com Apple</span>
                      </button>
                    )}
                  </div>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-black/[0.08] dark:border-white/10" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 text-[12px] font-bold uppercase tracking-[0.15em] text-muted-foreground bg-[#fafafa] dark:bg-[#0a0a0a]">
                        ou use seu email
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Card — modern register */}
              <div className="px-5 pb-8">
                <KazaLogin
                  view={view}
                  formData={formData}
                  setFormData={setFormData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  loading={loading}
                  onSubmit={handleSubmit}
                  onGoogle={handleGoogleSignIn}
                  onApple={handleAppleSignIn}
                  onReset={() => setResetDialogOpen(true)}
                  onToggleView={() => setView(view === 'login' ? 'register' : 'login')}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Password Dialog — iOS sheet style */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md rounded-3xl bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border-white/60 dark:border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground text-lg">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <KeyRound className="h-4 w-4 text-primary" />
              </div>
              Recuperar Senha
            </DialogTitle>
            <DialogDescription className="text-[14px]">
              Digite seu email para receber um link de recuperação.
            </DialogDescription>
          </DialogHeader>

          {resetSent ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                Email Enviado!
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Verifique sua caixa de entrada em{" "}
                <strong>{resetEmail}</strong>
              </p>
              <button
                onClick={closeResetDialog}
                className="w-full h-[50px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] active:scale-[0.98] transition-all"
              >
                Entendi
              </button>
            </div>
          ) : (
            <form onSubmit={handlePasswordReset} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="pl-11 h-[46px] md:h-[52px] rounded-xl bg-background/60 dark:bg-white/5 border-black/[0.06] dark:border-white/10 text-[14px] md:text-[15px]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeResetDialog}
                  className="flex-1 h-[50px] rounded-2xl bg-muted text-foreground font-medium text-[15px] active:scale-[0.98] transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 h-[50px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] active:scale-[0.98] transition-all shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center justify-center"
                >
                  {resetLoading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  ) : (
                    "Enviar"
                  )}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
