import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { isNative } from "@/lib/capacitor";
import { openExternalUrl } from "@/lib/nativeBrowser";
import { toast } from "sonner";

export type AuthView = "landing" | "login" | "register";

export function useAuthLogic() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();

  const [view, setView] = useState<AuthView>(() => {
    const state = location.state as { initialView?: AuthView };
    return state?.initialView || "landing";
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [splashProgress, setSplashProgress] = useState(0);
  const [exchangingCode, setExchangingCode] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    return p.has("code") || p.has("error");
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Splash progress
  useEffect(() => {
    const duration = 1600;
    const tick = 16;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += tick;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setSplashProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => setSplashDone(true), 260);
      }
    }, tick);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user && !authLoading) navigate("/app/home");
  }, [user, authLoading, navigate]);

  // Handle OAuth / email-confirmation PKCE callback
  useEffect(() => {
    const url = new URL(window.location.href);
    const oauthError = url.searchParams.get("error");
    if (oauthError) {
      const desc = url.searchParams.get("error_description") ?? "Erro na autenticação";
      toast.error(decodeURIComponent(desc.replace(/\+/g, " ")), { duration: 6000 });
      url.searchParams.delete("error");
      url.searchParams.delete("error_description");
      window.history.replaceState({}, "", url.toString());
      setExchangingCode(false);
      return;
    }

    const code = url.searchParams.get("code");
    const type = url.searchParams.get("type");
    if (!code) return;

    url.searchParams.delete("code");
    url.searchParams.delete("type");
    window.history.replaceState({}, "", url.toString());

    supabase.auth.exchangeCodeForSession(code)
      .then(({ error }) => {
        if (error) {
          console.error("[AUTH] code exchange failed:", error);
          const msg = type === "signup"
            ? "Link de confirmação inválido ou expirado."
            : "Erro ao autenticar. Tente novamente.";
          toast.error(msg, { duration: 6000 });
        } else if (type === "signup") {
          toast.success("Email confirmado! Bem-vindo!");
        }
      })
      .catch((err) => {
        console.error("[AUTH] code exchange error:", err);
        toast.error("Erro ao autenticar.", { duration: 6000 });
      })
      .finally(() => setExchangingCode(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = formData.email.trim();
    const password = formData.password.trim();

    const isPasswordStrong = (pwd: string) => {
      if (pwd.length < 8) return false;
      const hasUpper = /[A-Z]/.test(pwd);
      const hasLower = /[a-z]/.test(pwd);
      const hasNumber = /[0-9]/.test(pwd);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
      const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
      return score >= 3;
    };

    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (view === "register") {
      if (password !== formData.confirmPassword.trim()) {
        toast.error("As senhas não coincidem");
        return;
      }
      if (!isPasswordStrong(password)) {
        toast.error("Senha muito simples", {
          description: "Use pelo menos 8 caracteres misturando letras, números e símbolos."
        });
        return;
      }
    }

    setLoading(true);
    try {
      if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Login realizado com sucesso!");
        navigate("/app/home");
      } else {
        const redirectUrl = isNative
          ? "kaza://auth/callback"
          : `${window.location.origin}/auth`;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: formData.name.trim() },
            emailRedirectTo: redirectUrl
          }
        });

        if (error) throw error;

        if (data.user && !data.session) {
          toast.success("Verifique seu email para confirmar a conta!", { duration: 6000 });
          setView("login");
          return;
        }
        toast.success("Conta criada! Bem-vindo!");
        navigate("/app/home");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const redirectUrl = isNative ? "kaza://auth/callback" : `${window.location.origin}/auth`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: isNative
        }
      });
      if (error) throw error;
      if (isNative && data.url) await openExternalUrl(data.url);
    } catch (error: any) {
      toast.error(error.message || "Erro Google");
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      const redirectUrl = isNative ? "kaza://auth/callback" : `${window.location.origin}/auth`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: isNative
        }
      });
      if (error) throw error;
      if (isNative && data.url) await openExternalUrl(data.url);
    } catch (error: any) {
      toast.error(error.message || "Erro Apple");
      setLoading(false);
    }
  };

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
      toast.success("Email enviado!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar email");
    } finally {
      setResetLoading(false);
    }
  };

  const closeResetDialog = useCallback(() => {
    setResetDialogOpen(false);
    setResetSent(false);
    setResetEmail("");
  }, []);

  const goToLanding = useCallback(() => {
    setView("landing");
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, []);

  return {
    view,
    setView,
    loading,
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    splashDone,
    splashProgress,
    exchangingCode,
    authLoading,
    resetEmail,
    setResetEmail,
    resetLoading,
    resetSent,
    resetDialogOpen,
    setResetDialogOpen,
    handleSubmit,
    handleGoogleSignIn,
    handleAppleSignIn,
    handlePasswordReset,
    closeResetDialog,
    goToLanding,
    language
  };
}
