import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageTransition } from "@/components/PageTransition";
import { ArrowLeft, Check, Lock, Eye, EyeOff, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

export function SubAccountOnboarding({
  inviteToken,
  invitedEmail,
  masterName,
  groupId,
  onComplete,
}: SubAccountOnboardingProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"name" | "password" | "cpf" | "consumables" | "complete">(
    "name"
  );
  const [loading, setLoading] = useState(false);

  // Step 1: Name
  const [name, setName] = useState("");

  // Step 2: Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 3: CPF
  const [cpf, setCpf] = useState("");

  // Step 4: Consumables
  const [selectedConsumables, setSelectedConsumables] = useState<Set<string>>(new Set());

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleNameNext = () => {
    if (!name.trim()) {
      toast.error("Digite seu nome");
      return;
    }
    setStep("password");
  };

  const handlePasswordNext = async () => {
    if (!password || password.length < 6) {
      toast.error("Senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    setStep("cpf");
  };

  const handleCPFNext = () => {
    const cleanCPF = cpf.replace(/\D/g, "");
    if (cleanCPF.length !== 11) {
      toast.error("CPF inválido");
      return;
    }
    setStep("consumables");
  };

  const handleConsumablesNext = () => {
    setStep("complete");
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Sign up with Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: invitedEmail,
        password,
        options: {
          data: {
            name,
            invited_to_group: groupId,
          },
        },
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error("Sign up failed");

      // Accept the invite via RPC
      const { data: inviteResult, error: acceptError } = await supabase.rpc("accept_invite", {
        invite_token: inviteToken,
      });

      if (acceptError) throw acceptError;

      // Update profile with CPF
      const cleanCPF = cpf.replace(/\D/g, "");
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          display_name: name,
          cpf: cleanCPF,
          onboarding_completed: true,
        })
        .eq("id", authData.user.id);

      if (profileError) throw profileError;

      // Set home settings
      const { data: homes } = await supabase
        .from("homes")
        .select("id")
        .eq("owner_id", authData.user.id)
        .limit(1);

      if (homes && homes.length > 0) {
        const homeId = homes[0].id;

        // Add selected consumables
        if (selectedConsumables.size > 0) {
          const consumablesToAdd = DEFAULT_CONSUMABLES.filter((c) =>
            selectedConsumables.has(c.name)
          ).map((c) => ({
            home_id: homeId,
            name: c.name,
            icon: c.icon,
            category: "cleaning" as const,
            current_stock: 5,
            unit: "unidades",
            daily_consumption: 0.5,
            min_stock: 2,
            usage_interval: "daily" as const,
          }));

          await supabase.from("consumables").insert(consumablesToAdd).catch(() => {
            // Ignore if consumables fail to add
          });
        }
      }

      toast.success("Bem-vindo! Sua conta foi criada.");

      // Redirect to home
      if (onComplete) {
        onComplete();
      } else {
        navigate("/app/home");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Erro ao criar sua conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "name") return;
    const steps: (typeof step)[] = ["name", "password", "cpf", "consumables", "complete"];
    const currentIdx = steps.indexOf(step);
    if (currentIdx > 0) {
      setStep(steps[currentIdx - 1]);
    }
  };

  return (
    <PageTransition direction="left" className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#091f1c] pb-24">
      <header className="sticky top-0 z-50 bg-[#fafafa]/90 dark:bg-[#091f1c]/90 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06] px-4 h-16 flex items-center gap-3">
        <button
          onClick={handleBack}
          disabled={step === "name"}
          className={cn(
            "h-10 w-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-foreground transition-all active:scale-90",
            step === "name" && "opacity-30 cursor-not-allowed"
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
              <p className="text-sm text-muted-foreground">Usado apenas para cadastro</p>
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
              <p className="text-sm text-muted-foreground">Escolha quais itens você consome (opcional)</p>
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
                      const newSet = new Set(selectedConsumables);
                      if (checked) {
                        newSet.add(item.name);
                      } else {
                        newSet.delete(item.name);
                      }
                      setSelectedConsumables(newSet);
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

        {/* Step 5: Complete */}
        {step === "complete" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Tudo pronto!</h2>
              <p className="text-sm text-muted-foreground">Sua conta foi criada com sucesso</p>
            </div>
            <Button
              onClick={handleComplete}
              size="lg"
              className="w-full h-12"
              disabled={loading}
            >
              {loading ? "Finalizando..." : "Ir para o App"}
            </Button>
          </div>
        )}
      </main>
    </PageTransition>
  );
}
