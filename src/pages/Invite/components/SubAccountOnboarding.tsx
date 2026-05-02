/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";
import { ArrowLeft, Check, Eye, EyeOff, Mail, Loader2, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getPasswordRequirements, isPasswordStrong, isValidCPF } from "@/lib/utils/validation";

export const PENDING_INVITE_KEY = "pending_invite_setup";

interface SubAccountOnboardingProps {
  inviteToken: string;
  invitedEmail: string;
  masterName: string;
  groupId: string;
  planTier?: string;
  inTrial?: boolean;
  onComplete?: () => void;
}

const DEFAULT_CONSUMABLES = [
  { name: "Papel Higiênico", icon: "🧻" },
  { name: "Papel Toalha", icon: "🧺" },
  { name: "Detergente", icon: "🧴" },
  { name: "Sabonete", icon: "🧼" },
  { name: "Pasta de Dente", icon: "🪥" },
  { name: "Shampoo", icon: "🧴" },
  { name: "Desodorante", icon: "🚿" },
  { name: "Álcool em Gel", icon: "🧴" },
];

type Step = "loading" | "name" | "password" | "complete" | "verify-email";

const STEP_NUMBERS: Record<string, number> = {
  name: 1,
  password: 2,
  complete: 3,
};

export function SubAccountOnboarding({
  inviteToken,
  invitedEmail,
  masterName,
  groupId,
  planTier = "multiPRO",
  inTrial = false,
  onComplete,
}: SubAccountOnboardingProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("loading");
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Password requirements real-time check
  const passwordReqs = getPasswordRequirements(password);


  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);



  const handleResendEmail = async () => {
    if (resending || resendCooldown > 0) return;
    setResending(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "resend-confirmation-email",
        {
          body: {
            email: invitedEmail,
            redirect_to: `${window.location.origin}/auth`,
            invite_token: inviteToken,
          },
        }
      );
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Erro ao reenviar");
      toast.success("Email de confirmação reenviado!");
      setResendCooldown(60);
    } catch (error: any) {
      if (error?.status === 429 || error?.message?.includes("security purposes")) {
        toast.error("Aguarde um momento antes de reenviar.");
        setResendCooldown(60);
      } else {
        toast.error(error?.message || "Erro ao reenviar email");
      }
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.rpc("get_invite_progress", {
          p_token: inviteToken,
        });
        if (error || !data || data.length === 0) {
          setStep("name");
          return;
        }
        const progress = data[0];
        const saved = (progress.step_data ?? {}) as Record<string, any>;

        if (saved.name) setName(saved.name);
        if (saved.cpf) setCpf(saved.cpf);
        if (saved.cpf) setCpf(saved.cpf);

        const resumeStep = progress.current_step ?? 0;
        if (resumeStep >= 2) setStep("complete");    // password done
        else if (resumeStep >= 1) setStep("password");  // name/cpf done
        else setStep("name");
      } catch {
        setStep("name");
      }
    })();
  }, [inviteToken]);

  const saveStep = async (stepNum: number, data: Record<string, unknown>) => {
    const { error } = await supabase.rpc("save_invite_step", {
      p_token: inviteToken,
      p_step_data: data,
      p_step: stepNum,
    });
    if (error) throw error;
  };

  const handleNameNext = async () => {
    if (!name.trim()) { toast.error("Digite seu nome"); return; }
    if (name.trim().length < 2) { toast.error("Nome muito curto"); return; }
    if (!isValidCPF(cpf)) { toast.error("Digite um CPF válido"); return; }
    
    setLoading(true);
    try {
      await saveStep(STEP_NUMBERS.name, { 
        name: name.trim(),
        cpf: cpf.trim() 
      });
      toast.success("Nome e CPF salvos");
      setStep("password");
    } catch {
      toast.error("Erro ao salvar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordNext = async () => {
    if (!isPasswordStrong(password)) {
      toast.error("A senha não cumpre os requisitos de segurança");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    setLoading(true);
    try {
      // For security, we don't save the password in clear text in step_data.
      // We just mark that the password step is completed.
      await saveStep(STEP_NUMBERS.password, { password_defined: true }); 
      toast.success("Senha definida com sucesso");
      setStep("complete");
    } catch {
      toast.error("Erro ao salvar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
    // Save invite context to localStorage so KazaContext can complete setup after OAuth redirect
    localStorage.setItem(PENDING_INVITE_KEY, JSON.stringify({
      inviteToken,
      groupId,
      name: name.trim() || undefined,
      cpf: cpf.trim() || undefined,
    }));
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth` },
    });
    if (error) {
      localStorage.removeItem(PENDING_INVITE_KEY);
      toast.error(error.message || "Erro ao conectar com Google");
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: invitedEmail,
        password,
        options: {
          data: {
            name: name.trim(),
            cpf: cpf.trim(),
            invite_token: inviteToken,
            invited_to_group: groupId,
          },
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error("Falha ao criar conta");

      if (!authData.session) {
        setStep("verify-email");
        return;
      }

      await completeInviteSetup(authData.user.id, inviteToken);
      toast.success("Bem-vindo! Sua conta foi criada.");
      if (onComplete) onComplete();
      else navigate("/app/home");
    } catch (error: any) {
      const msg =
        error?.message?.includes("already registered")
          ? "Este email já tem uma conta. Faça login."
          : "Erro ao criar sua conta. Tente novamente.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const stepOrder: Step[] = ["name", "password", "complete"];
  const handleBack = () => {
    const idx = stepOrder.indexOf(step);
    if (idx > 0) setStep(stepOrder[idx - 1]);
  };
  const canGoBack = stepOrder.indexOf(step) > 0;

  const stepIndex = stepOrder.indexOf(step);
  const progressPct = stepIndex >= 0 ? ((stepIndex + 1) / stepOrder.length) * 100 : 0;

  if (step === "loading") {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const effectivePlanName = planTier === "multiPRO" ? "MultiPRO" : planTier;
  const trialText = inTrial ? " (Benefício de Teste Ativo)" : "";

  return (
    <PageTransition direction="left" className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#091f1c] pb-24">
      <header className="sticky top-0 z-50 bg-[#fafafa]/90 dark:bg-[#091f1c]/90 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06] px-4 h-16 flex items-center gap-3">
        <button
          onClick={handleBack}
          disabled={!canGoBack}
          className={cn(
            "h-10 w-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-foreground transition-all active:scale-90",
            !canGoBack && "opacity-30 cursor-not-allowed"
          )}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-foreground">Ativar sua conta</h1>
          <p className="text-xs text-muted-foreground truncate">
            Convidado por {masterName} — Plano {effectivePlanName}{trialText}
          </p>
        </div>
      </header>

      {step !== "verify-email" && (
        <div className="h-1 bg-black/5 dark:bg-white/5">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      <main className="mx-auto max-w-lg px-4 py-8 space-y-6">

        {step === "name" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Identificação</p>
              <h2 className="text-2xl font-black text-foreground">Quem é você?</h2>
              <p className="text-sm text-muted-foreground">Precisamos do seu nome e CPF para o cadastro</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-muted-foreground ml-1">NOME COMPLETO</span>
                <Input
                  placeholder="Seu nome"
                  value={name}
                  maxLength={80}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-base rounded-xl"
                  autoFocus
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-muted-foreground ml-1">CPF</span>
                <Input
                  placeholder="000.000.000-00"
                  value={cpf}
                  maxLength={14}
                  onChange={(e) => {
                    // Máscara simples de CPF
                    const val = e.target.value.replace(/\D/g, "");
                    setCpf(val);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleNameNext()}
                  className="h-12 text-base rounded-xl"
                />
              </div>
            </div>
            <Button onClick={handleNameNext} size="lg" className="w-full h-14 rounded-2xl font-bold text-base" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Continuar
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
              <span className="text-xs text-muted-foreground font-medium">ou</span>
              <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-14 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center gap-3 font-bold text-sm text-foreground hover:bg-black/[0.02] dark:hover:bg-white/10 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                <path d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" fill="#FFC107"/>
                <path d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" fill="#FF3D00"/>
                <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.5 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.7 39.5 16.3 44 24 44z" fill="#4CAF50"/>
                <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.2 5.2C37 38.2 44 33 44 24c0-1.2-.1-2.3-.4-3.5z" fill="#1976D2"/>
              </svg>
              Continuar com Google
            </button>
          </div>
        )}


        {step === "password" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Segurança</p>
              <h2 className="text-2xl font-black text-foreground">Defina sua senha</h2>
              <p className="text-sm text-muted-foreground">Crie uma senha forte para sua conta</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordNext()}
                  className="w-full h-14 px-5 rounded-2xl bg-white dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.08] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Requirements UI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 rounded-2xl bg-muted/30 border border-black/[0.03] dark:border-white/[0.03]">
                <RequirementItem fulfilled={passwordReqs.minLength} label="Mínimo 8 caracteres" />
                <RequirementItem fulfilled={passwordReqs.hasUpper} label="Letra maiúscula" />
                <RequirementItem fulfilled={passwordReqs.hasLower} label="Letra minúscula" />
                <RequirementItem fulfilled={passwordReqs.hasNumber} label="Número" />
                <RequirementItem fulfilled={passwordReqs.hasSymbol} label="Símbolo (!@#$)" />
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordNext()}
                  className="w-full h-14 px-5 rounded-2xl bg-white dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.08] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <Button 
              onClick={handlePasswordNext} 
              size="lg" 
              className="w-full h-14 rounded-2xl font-bold text-base"
              disabled={loading || !isPasswordStrong(password)}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Continuar
            </Button>
          </div>
        )}

        {step === "complete" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center">
                <Check className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Confirmação</p>
              <h2 className="text-2xl font-black text-foreground">Quase lá!</h2>
              <p className="text-sm text-muted-foreground px-4">
                Ao clicar abaixo, você receberá um link de ativação no seu e-mail. A conta será ativada e vinculada automaticamente após o clique.
              </p>
            </div>

            <div className="rounded-2xl bg-muted/40 border border-black/[0.04] dark:border-white/[0.06] p-5 text-left space-y-3">
              <SummaryRow label="Nome" value={name} />
              <SummaryRow label="CPF" value={cpf} />
              <SummaryRow label="Email" value={invitedEmail} />
            </div>

            <Button onClick={handleComplete} size="lg" className="w-full h-16 rounded-[1.75rem] font-black uppercase tracking-widest text-base shadow-xl shadow-emerald-500/20" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
              Criar e Confirmar
            </Button>
          </div>
        )}

        {step === "verify-email" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-[2rem] bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-foreground">Verifique seu e-mail</h2>
              <p className="text-sm text-muted-foreground leading-relaxed px-4">
                Enviamos o link de ativação para <span className="font-bold text-foreground">{invitedEmail}</span>.
                <br /><br />
                Clique no botão de acesso dentro do e-mail para **ativar sua conta instantaneamente**.
              </p>
            </div>
            <Button
              onClick={handleResendEmail}
              size="lg"
              variant="outline"
              className="w-full h-14 rounded-2xl font-bold"
              disabled={resending || resendCooldown > 0}
            >
              {resending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RotateCw className="h-4 w-4 mr-2" />
              )}
              {resendCooldown > 0
                ? `Reenviar em ${resendCooldown}s`
                : "Reenviar e-mail de ativação"}
            </Button>
          </div>
        )}

      </main>
    </PageTransition>
  );
}

function RequirementItem({ fulfilled, label }: { fulfilled: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "h-4 w-4 rounded-full flex items-center justify-center transition-colors",
        fulfilled ? "bg-emerald-500 text-white" : "bg-black/10 dark:bg-white/10"
      )}>
        {fulfilled && <Check className="h-3 w-3" />}
      </div>
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-wider transition-colors",
        fulfilled ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/60"
      )}>
        {label}
      </span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/[0.03] dark:border-white/[0.03] pb-2 last:border-0 last:pb-0">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className="text-sm font-black text-foreground">{value}</span>
    </div>
  );
}

export async function completeInviteSetup(userId: string, inviteToken: string) {
  const { data: progressRows } = await supabase.rpc("get_invite_progress", {
    p_token: inviteToken,
  });
  const progress = progressRows?.[0];
  const saved = (progress?.step_data ?? {}) as Record<string, any>;

  const { data: { user } } = await supabase.auth.getUser();
  const userName = saved.name || user?.user_metadata?.name || "";
  const userCpf = saved.cpf || user?.user_metadata?.cpf || null;

  // Pass p_user_id explicitly — the RPC is idempotent and handles retries safely
  const { error: inviteErr } = await supabase.rpc("accept_invite", {
    invite_token: inviteToken,
    p_user_id: userId,
  });
  if (inviteErr) throw inviteErr;

  // Find which home the user was added to (master's home)
  const { data: membership } = await supabase
    .from("home_members")
    .select("home_id")
    .eq("user_id", userId)
    .order("joined_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  // Update notification_preferences with the correct home_id (fixes 409 duplicate key)
  if (membership?.home_id) {
    await supabase
      .from("notification_preferences")
      .upsert(
        { user_id: userId, home_id: membership.home_id },
        { onConflict: "user_id" }
      );
  }

  const { error: profileErr } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: userId,
        name: userName,
        cpf: userCpf,
        onboarding_completed: true,
      },
      { onConflict: "user_id" }
    );
  if (profileErr) throw profileErr;

  // Sync display_name into sub_account_members so master can read it without profiles RLS
  if (userName) {
    await supabase
      .from("sub_account_members")
      .update({ display_name: userName })
      .eq("user_id", userId)
      .eq("is_active", true);
  }
}
