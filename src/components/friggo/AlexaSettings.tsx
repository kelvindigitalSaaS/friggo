import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useFriggo } from "@/contexts/FriggoContext";
import { Mic, ExternalLink, Copy, CheckCircle2, Info } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────
// Configure as IDs reais abaixo após publicar na Amazon / Google
// ─────────────────────────────────────────────────────────
const ALEXA_SKILL_ID = "amzn1.ask.skill.7f5d4168-85e1-45ca-8969-0b49f4f6c46b";
const GOOGLE_ACTION_ID = "friggo-action";

interface AlexaSettingsProps {
  open: boolean;
  onClose: () => void;
}

export function AlexaSettings({ open, onClose }: AlexaSettingsProps) {
  const { onboardingData, updateProfile } = useFriggo();
  const [alexaEnabled, setAlexaEnabled] = useState(
    onboardingData?.hasAlexa || false
  );
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [copied, setCopied] = useState<"alexa" | "google" | null>(null);

  const handleAlexaToggle = (v: boolean) => {
    setAlexaEnabled(v);
    updateProfile?.({ hasAlexa: v });
    toast.success(
      v ? "Alexa ativada! Ative a skill no app Amazon." : "Alexa desativada."
    );
  };

  const handleGoogleToggle = (v: boolean) => {
    setGoogleEnabled(v);
    toast.success(
      v
        ? "Google Assistant ativado! Ative a Action no app Google."
        : "Google Assistant desativado."
    );
  };

  const copyId = (id: string, type: "alexa" | "google") => {
    navigator.clipboard.writeText(id).catch(() => {});
    setCopied(type);
    toast.success("ID copiado!");
    setTimeout(() => setCopied(null), 2000);
  };

  const commands = [
    {
      cmd: '"Friggo, o que está vencendo?"',
      desc: "Lista itens próximos do vencimento"
    },
    {
      cmd: '"Friggo, adicionar leite na lista"',
      desc: "Adiciona itens à lista de compras"
    },
    {
      cmd: '"Friggo, o que posso cozinhar?"',
      desc: "Sugere receitas disponíveis"
    },
    {
      cmd: '"Friggo, fazer check-up da geladeira"',
      desc: "Inicia o check-up por voz"
    }
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-3xl overflow-auto"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <Mic className="h-5 w-5 text-primary" />
            Assistentes de Voz
          </SheetTitle>
        </SheetHeader>

        <div className="mt-5 space-y-4 pb-10">
          {/* ── Alexa ── */}
          <div
            className={cn(
              "rounded-xl border p-4 space-y-3 transition-colors",
              alexaEnabled
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full text-white font-bold text-sm",
                    alexaEnabled ? "bg-[#00CAFF]" : "bg-muted-foreground/30"
                  )}
                >
                  A
                </div>
                <div>
                  <p className="font-semibold">Amazon Alexa</p>
                  <p className="text-xs text-muted-foreground">
                    {alexaEnabled ? "Skill ativa" : "Ativar skill Friggo"}
                  </p>
                </div>
              </div>
              <Switch
                checked={alexaEnabled}
                onCheckedChange={handleAlexaToggle}
              />
            </div>

            {alexaEnabled && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                {/* Skill ID */}
                <div className="flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2">
                  <span className="flex-1 font-mono text-xs text-foreground truncate">
                    {ALEXA_SKILL_ID}
                  </span>
                  <button
                    onClick={() => copyId(ALEXA_SKILL_ID, "alexa")}
                    className="shrink-0 text-muted-foreground hover:text-primary"
                  >
                    {copied === "alexa" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <a
                  href="https://alexa.amazon.com/spa/index.html#skills"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-primary underline"
                >
                  Ativar skill no app Alexa <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* ── Google Assistant ── */}
          <div
            className={cn(
              "rounded-xl border p-4 space-y-3 transition-colors",
              googleEnabled
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full text-white font-bold text-sm",
                    googleEnabled ? "bg-[#4285F4]" : "bg-muted-foreground/30"
                  )}
                >
                  G
                </div>
                <div>
                  <p className="font-semibold">Google Assistant</p>
                  <p className="text-xs text-muted-foreground">
                    {googleEnabled ? "Action ativa" : "Ativar Action Friggo"}
                  </p>
                </div>
              </div>
              <Switch
                checked={googleEnabled}
                onCheckedChange={handleGoogleToggle}
              />
            </div>

            {googleEnabled && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 rounded-md bg-muted/60 px-3 py-2">
                  <span className="flex-1 font-mono text-xs text-foreground truncate">
                    {GOOGLE_ACTION_ID}
                  </span>
                  <button
                    onClick={() => copyId(GOOGLE_ACTION_ID, "google")}
                    className="shrink-0 text-muted-foreground hover:text-primary"
                  >
                    {copied === "google" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <a
                  href="https://assistant.google.com/explore"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-primary underline"
                >
                  Explorar no Google Assistant{" "}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* ── Comandos de Voz ── */}
          {(alexaEnabled || googleEnabled) && (
            <div className="space-y-2 animate-in fade-in">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                Comandos disponíveis
              </p>
              <div className="space-y-2">
                {commands.map((c, i) => (
                  <div key={i} className="rounded-md bg-muted/50 p-3">
                    <p className="font-medium text-primary text-sm">{c.cmd}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Deeplink info ── */}
          <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Deeplink do app:{" "}
              <span className="font-mono text-primary">friggo://</span>
              <br />
              Ative a skill "Friggo" no app Amazon Alexa ou a Action no Google
              Assistant para usar comandos de voz com sua conta.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
