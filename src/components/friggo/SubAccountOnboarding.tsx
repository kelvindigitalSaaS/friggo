import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageTransition } from "@/components/PageTransition";
import { ArrowLeft, Check, Eye, EyeOff, Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Key used to persist invite setup data across email confirmation
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

type Step = "name" | "password" | "cpf" | "consumables" | "complete" | "verify-email";

export function SubAccountOnboarding({
  inviteToken,
  invitedEmail,
  masterName,
  groupId,
  onComplete,
}: SubAccountOnboardingProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("name");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cpf, setCpf] = useState("");
  const [selectedConsumables, setSelectedConsumables] = useState<Set<string>>(new Set());

  const formatCPF = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const handleNameNext = () => {
    if (!name.trim()) { toast.error("Digite seu nome"); return; }
    setStep("password");
  };

  const handlePasswordNext = () => {
    if (!password || password.length < 6) { toast.error("Senha deve ter pelo menos 6 caracteres"); return; }
    if (password !== confirmPassword) { toast.error("As senhas não coincidem"); return; }
    setStep("cpf");
  };

  const handleCPFNext = () => {
    if (cpf.replace(/\D/g, "").length !== 11) { toast.error("CPF inválido"); return; }
    setStep("consumables");
  };

  const handleConsumablesNext = () => setStep("complete");

  /**
   * Called when email-confirmed user has an active session but the setup
   * still needs to run (e.g., auto-confirm enabled in Supabase).
   * Also used by FriggoContext after confirmation when pending data exists
   * in localStorage.
   */
  const runInviteSetup = async (userId: string) => {
    const cleanCPF = cpf.replace(/\D/g, "");

    // accept_invite now ALSO creates home_members (SECURITY DEFINER in DB)
    const { error: inviteErr } = await supabase.rpc("accept_invite", {
      invite_token: inviteToken,
    });
    if (inviteErr) throw inviteErr;

    // Update profile — must use user_id column (not id)
    const { error: profileErr } = await supabase
      .from("profiles")
      .update({ name, cpf: cleanCPF, onboarding_completed: true })
      .eq("user_id", userId);
    if (profileErr) throw profileErr;

    localStorage.removeItem(PENDING_INVITE_KEY);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Persist invite data BEFORE signUp so it survives the email-confirmation
      // redirect. FriggoContext.fetchData will pick this up after the user
      // confirms their email and gets a real session.
      localStorage.setItem(
        PENDING_INVITE_KEY,
        JSON.stringify({
          inviteToken,
          name,
          cpf: cpf.replace(/\D/g, ""),
          consumables: Array.from(selectedConsumables),
        })
      );

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: invitedEmail,
        password,
        options: {
          data: { name, invited_to_group: groupId },
          emailRedirectTo: `${window.location.origin}/app/home`,
        },
      });

      if (signUpError) {
        localStorage.removeItem(PENDING_INVITE_KEY);
        throw signUpError;
      }
      if (!authData.user) throw new Error("Sign up failed");

      if (!authData.session) {
        // Email confirmation required — show the "check your inbox" step.
        // FriggoContext.fetchData will complete the setup after confirmation.
        setStep("verify-email");
        return;
      }

      // Auto-confirm enabled (e.g., local dev) — run setup immediately.
      await runInviteSetup(authData.user.id);
      toast.success("Bem-vindo! Sua conta foi criada.");
      if (onComplete) onComplete();
      else navigate("/app/home");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Erro ao criar sua conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    const order: Step[] = ["name", "password", "cpf", "consumables", "complete"];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  };

  const isNavigableStep = step !== "name" && step !== "verify-email";

  return (
    <PageTransition direction="left" className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#091f1c] pb-24">
      <header className="sticky top-0 z-50 bg-[#fafafa]/90 dark:bg-[#091f1c]/90 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06] px-4 h-16 flex items-center gap-3">
        <button
          onClick={handleBack}
          disabled={!isNavigableStep}
          className={cn(
            "h-10 w-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-foreground transition-all active:scale-90",
            !isNavigableStep && "opacity-30 cursor-not-allowed"
          )}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-foreground">Configure sua conta</h1>
          <p className="text-xs text-muted-foreground">Convidado por {masterName}</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8 space-y-6">

        {/* Step 1: Name */}
        {step === "name" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Como você quer ser chamado?</h2>
              <p className="text-sm text-muted-foreground">Seu nome aparecerá para outros membros do plano</p>
            </div>
            <Input
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameNext()}
              className="h-12 text-base"
              autoFocus
            />
            <Button onClick={handleNameNext} size="lg" className="w-full h-12">
              Continuar
            </Button>
          </div>
        )}

        {/* Step 2: Password */}
        {step === "password" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Crie uma senha</h2>
              <p className="text-sm text-muted-foreground">Mínimo 6 caracteres</p>
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

        {/* Step 3: CPF */}
        {step === "cpf" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Qual seu CPF?</h2>
              <p className="text-sm text-muted-foreground">Usado apenas para identificação da conta</p>
            </div>
            <Input
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && handleCPFNext()}
              className="h-12 text-base"
              autoFocus
            />
            <Button onClick={handleCPFNext} size="lg" className="w-full h-12">
              Continuar
            </Button>
          </div>
        )}

        {/* Step 4: Consumables */}
        {step === "consumables" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Quais consumíveis você usa?</h2>
              <p className="text-sm text-muted-foreground">Eles serão adicionados à casa compartilhada (opcional)</p>
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
            <Button onClick={handleConsumablesNext} size="lg" className="w-full h-12">
              Continuar
            </Button>
          </div>
        )}

        {/* Step 5: Complete — triggers signUp */}
        {step === "complete" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Tudo pronto!</h2>
              <p className="text-sm text-muted-foreground">
                Clique abaixo para criar sua conta. Você receberá um email de confirmação.
              </p>
            </div>
            <Button onClick={handleComplete} size="lg" className="w-full h-12" disabled={loading}>
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </div>
        )}

        {/* Step 6: Verify email — shown when Supabase requires confirmation */}
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
                Enviamos um link para{" "}
                <span className="font-semibold text-foreground">{invitedEmail}</span>.
                <br />
                Clique no link do email para ativar sua conta e entrar no app.
              </p>
              <p className="text-xs text-muted-foreground">
                Não recebeu? Verifique a caixa de spam ou lixo eletrônico.
              </p>
            </div>
            <div className="rounded-xl bg-muted/40 border border-black/[0.04] dark:border-white/[0.06] p-4 text-left space-y-1">
              <p className="text-xs font-semibold text-foreground">O que acontece depois?</p>
              <p className="text-xs text-muted-foreground">
                Ao clicar no link do email, você será redirecionado ao app e sua conta será
                configurada automaticamente.
              </p>
            </div>
          </div>
        )}

      </main>
    </PageTransition>
  );
}
