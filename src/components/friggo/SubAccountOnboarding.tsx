import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageTransition } from "@/components/PageTransition";
import { ArrowLeft, Check, Eye, EyeOff, Mail, Loader2, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Kept for backwards-compat reads: FriggoContext still checks this key as
// fallback for users who started the flow before this migration.
export const PENDING_INVITE_KEY = "pending_invite_setup";

interface SubAccountOnboardingProps {
  inviteToken: string;
  invitedEmail: string;
  masterName: string;
  groupId: string;
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

// Step order: name → cpf → consumables → password → complete → verify-email
// Password is intentionally last (not saved to DB for security) and only
// entered once right before signUp.
type Step = "loading" | "name" | "cpf" | "consumables" | "password" | "complete" | "verify-email";

const STEP_NUMBERS: Record<string, number> = {
  name: 1,
  cpf: 2,
  consumables: 3,
  password: 4,
  complete: 5,
};

export function SubAccountOnboarding({
  inviteToken,
  invitedEmail,
  masterName,
  groupId,
  onComplete,
}: SubAccountOnboardingProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("loading");
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [selectedConsumables, setSelectedConsumables] = useState<Set<string>>(new Set());
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

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

  // ── Load progress from DB on mount ────────────────────────────────────────
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

        // Pre-fill saved values
        if (saved.name) setName(saved.name);
        if (saved.cpf) setCpf(formatCPF(saved.cpf));
        if (Array.isArray(saved.consumables)) {
          setSelectedConsumables(new Set(saved.consumables));
        }

        // Jump to the next unsaved step (password is always re-entered)
        const resumeStep = progress.current_step ?? 0;
        if (resumeStep >= 3) setStep("password");       // consumables done
        else if (resumeStep >= 2) setStep("consumables"); // cpf done
        else if (resumeStep >= 1) setStep("cpf");         // name done
        else setStep("name");
      } catch {
        setStep("name");
      }
    })();
  }, [inviteToken]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const formatCPF = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const saveStep = async (stepNum: number, data: Record<string, unknown>) => {
    const { error } = await supabase.rpc("save_invite_step", {
      p_token: inviteToken,
      p_step_data: data,
      p_step: stepNum,
    });
    if (error) throw error;
  };

  // ── Step handlers ─────────────────────────────────────────────────────────
  const handleNameNext = async () => {
    if (!name.trim()) { toast.error("Digite seu nome"); return; }
    if (name.trim().length < 2) { toast.error("Nome muito curto"); return; }
    setLoading(true);
    try {
      await saveStep(STEP_NUMBERS.name, { name: name.trim() });
      setStep("cpf");
    } catch {
      toast.error("Erro ao salvar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleCpfNext = async () => {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) { toast.error("CPF inválido"); return; }
    setLoading(true);
    try {
      await saveStep(STEP_NUMBERS.cpf, { cpf: digits });
      setStep("consumables");
    } catch {
      toast.error("Erro ao salvar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleConsumablesNext = async () => {
    setLoading(true);
    try {
      await saveStep(STEP_NUMBERS.consumables, {
        consumables: Array.from(selectedConsumables),
      });
      setStep("password");
    } catch {
      toast.error("Erro ao salvar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordNext = () => {
    if (!password || password.length < 6) {
      toast.error("Senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    setStep("complete");
  };

  // ── Final step: signUp ────────────────────────────────────────────────────
  // At this point all step data is already persisted in DB.
  // We store invite_token in user_metadata so FriggoContext can complete the
  // setup after email confirmation — no localStorage needed.
  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: invitedEmail,
        password,
        options: {
          data: {
            name: name.trim(),
            invite_token: inviteToken,
            invited_to_group: groupId,
          },
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error("Falha ao criar conta");

      if (!authData.session) {
        // Email confirmation required — user must click the link.
        // FriggoContext will complete invite setup after SDK confirms the session.
        setStep("verify-email");
        return;
      }

      // Auto-confirm enabled (local dev / special Supabase setting) — complete immediately.
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

  // ── Navigation ────────────────────────────────────────────────────────────
  const stepOrder: Step[] = ["name", "cpf", "consumables", "password", "complete"];
  const handleBack = () => {
    const idx = stepOrder.indexOf(step);
    if (idx > 0) setStep(stepOrder[idx - 1]);
  };
  const canGoBack = stepOrder.indexOf(step) > 0;

  // Progress bar
  const stepIndex = stepOrder.indexOf(step);
  const progressPct = stepIndex >= 0 ? ((stepIndex + 1) / stepOrder.length) * 100 : 0;

  // ── Render ────────────────────────────────────────────────────────────────
  if (step === "loading") {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <h1 className="text-base font-bold text-foreground">Configure sua conta</h1>
          <p className="text-xs text-muted-foreground">Convidado por {masterName}</p>
        </div>
      </header>

      {/* Progress bar */}
      {step !== "verify-email" && (
        <div className="h-1 bg-black/5 dark:bg-white/5">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      <main className="mx-auto max-w-lg px-4 py-8 space-y-6">

        {/* Step 1: Name */}
        {step === "name" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Passo 1 de 5</p>
              <h2 className="text-2xl font-black text-foreground">Como você quer ser chamado?</h2>
              <p className="text-sm text-muted-foreground">Seu nome aparecerá para os outros membros</p>
            </div>
            <Input
              placeholder="Seu nome completo"
              value={name}
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameNext()}
              className="h-12 text-base"
              autoFocus
            />
            <Button onClick={handleNameNext} size="lg" className="w-full h-12" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Continuar
            </Button>
          </div>
        )}

        {/* Step 2: CPF */}
        {step === "cpf" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Passo 2 de 5</p>
              <h2 className="text-2xl font-black text-foreground">Qual seu CPF?</h2>
              <p className="text-sm text-muted-foreground">Usado apenas para identificação da conta</p>
            </div>
            <Input
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && handleCpfNext()}
              className="h-12 text-base"
              autoFocus
            />
            <Button onClick={handleCpfNext} size="lg" className="w-full h-12" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Continuar
            </Button>
          </div>
        )}

        {/* Step 3: Consumables */}
        {step === "consumables" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Passo 3 de 5</p>
              <h2 className="text-2xl font-black text-foreground">Quais consumíveis você usa?</h2>
              <p className="text-sm text-muted-foreground">Serão adicionados à casa compartilhada (opcional)</p>
            </div>
            <div className="space-y-2">
              {DEFAULT_CONSUMABLES.map((item) => (
                <label
                  key={item.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.08] cursor-pointer hover:bg-primary/5 transition-colors"
                >
                  <Checkbox
                    checked={selectedConsumables.has(item.name)}
                    onCheckedChange={(checked) => {
                      const next = new Set(selectedConsumables);
                      if (checked) next.add(item.name);
                      else next.delete(item.name);
                      setSelectedConsumables(next);
                    }}
                  />
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </label>
              ))}
            </div>
            <Button onClick={handleConsumablesNext} size="lg" className="w-full h-12" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Continuar
            </Button>
          </div>
        )}

        {/* Step 4: Password */}
        {step === "password" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Passo 4 de 5</p>
              <h2 className="text-2xl font-black text-foreground">Crie uma senha</h2>
              <p className="text-sm text-muted-foreground">Mínimo 6 caracteres — não salvamos sua senha no cadastro</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordNext()}
                  className="w-full h-12 px-4 rounded-lg bg-white dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.08] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordNext()}
                  className="w-full h-12 px-4 rounded-lg bg-white dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.08] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <Button onClick={handlePasswordNext} size="lg" className="w-full h-12">
              Continuar
            </Button>
          </div>
        )}

        {/* Step 5: Confirm & create account */}
        {step === "complete" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Passo 5 de 5</p>
              <h2 className="text-2xl font-black text-foreground">Tudo pronto!</h2>
              <p className="text-sm text-muted-foreground">
                Seu cadastro está salvo. Clique abaixo para criar sua conta — você receberá um email de confirmação.
              </p>
            </div>

            {/* Summary */}
            <div className="rounded-xl bg-muted/40 border border-black/[0.04] dark:border-white/[0.06] p-4 text-left space-y-2">
              <SummaryRow label="Nome" value={name} />
              <SummaryRow label="Email" value={invitedEmail} />
              <SummaryRow label="CPF" value={cpf} />
              <SummaryRow
                label="Consumíveis"
                value={
                  selectedConsumables.size > 0
                    ? `${selectedConsumables.size} selecionados`
                    : "Nenhum"
                }
              />
            </div>

            <Button onClick={handleComplete} size="lg" className="w-full h-12" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {loading ? "Criando conta..." : "Criar conta e confirmar email"}
            </Button>
          </div>
        )}

        {/* Verify email */}
        {step === "verify-email" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-foreground">Confirme seu email</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enviamos um link de confirmação para{" "}
                <span className="font-semibold text-foreground">{invitedEmail}</span>.
                <br />
                Clique no link para ativar sua conta.
              </p>
              <p className="text-xs text-muted-foreground">
                Não recebeu? Verifique a pasta de spam.
              </p>
            </div>
            <Button
              onClick={handleResendEmail}
              size="lg"
              variant="outline"
              className="w-full h-12"
              disabled={resending || resendCooldown > 0}
            >
              {resending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RotateCw className="h-4 w-4 mr-2" />
              )}
              {resendCooldown > 0
                ? `Reenviar em ${resendCooldown}s`
                : "Reenviar email de confirmação"}
            </Button>
            <div className="rounded-xl bg-muted/40 border border-black/[0.04] dark:border-white/[0.06] p-4 text-left space-y-1">
              <p className="text-xs font-semibold text-foreground">O que acontece depois?</p>
              <p className="text-xs text-muted-foreground">
                Ao clicar no link, você será redirecionado ao app e seu acesso ao plano{" "}
                <strong>{masterName}</strong> será configurado automaticamente.
              </p>
            </div>
          </div>
        )}

      </main>
    </PageTransition>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold text-foreground">{value}</span>
    </div>
  );
}

/**
 * Complete invite setup for a user that already has a session.
 * Called directly when Supabase auto-confirms (no email confirmation needed),
 * or by FriggoContext after the user confirms their email.
 */
export async function completeInviteSetup(userId: string, inviteToken: string) {
  // Load saved step data from DB
  const { data: progressRows } = await supabase.rpc("get_invite_progress", {
    p_token: inviteToken,
  });
  const progress = progressRows?.[0];
  const saved = (progress?.step_data ?? {}) as Record<string, any>;

  // Accept invite → creates sub_account_members + joins home_members
  const { error: inviteErr } = await supabase.rpc("accept_invite", {
    invite_token: inviteToken,
  });
  if (inviteErr) throw inviteErr;

  // Upsert profile with saved name + cpf
  const { error: profileErr } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: userId,
        name: saved.name ?? "",
        cpf: saved.cpf ?? null,
        onboarding_completed: true,
      },
      { onConflict: "user_id" }
    );
  if (profileErr) throw profileErr;

  // Insert selected consumables into the shared home
  if (Array.isArray(saved.consumables) && saved.consumables.length > 0) {
    // Find the home the user just joined
    const { data: membership } = await supabase
      .from("home_members")
      .select("home_id")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();

    if (membership?.home_id) {
      const DEFAULT_CONSUMABLES_MAP: Record<string, { icon: string; category: string }> = {
        "Papel Higiênico": { icon: "🧻", category: "hygiene" },
        "Papel Toalha": { icon: "🧺", category: "cleaning" },
        "Detergente": { icon: "🧴", category: "cleaning" },
        "Sabonete": { icon: "🧼", category: "hygiene" },
        "Pasta de Dente": { icon: "🪥", category: "hygiene" },
        "Shampoo": { icon: "🧴", category: "hygiene" },
        "Desodorante": { icon: "🚿", category: "hygiene" },
        "Álcool em Gel": { icon: "🧴", category: "hygiene" },
      };

      const rows = saved.consumables.map((name: string) => {
        const info = DEFAULT_CONSUMABLES_MAP[name] || { icon: "📦", category: "other" };
        return {
          home_id: membership.home_id,
          name,
          icon: info.icon,
          category: info.category,
          current_stock: 1,
          unit: "un",
          daily_consumption: 0,
          min_stock: 1,
          usage_interval: "weekly",
        };
      });

      // Upsert to avoid duplicates if the home already has some of these
      await supabase
        .from("consumables")
        .upsert(rows, { onConflict: "home_id,name" });
    }
  }
}
