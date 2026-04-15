import { useState } from "react";
import { Plus, X, CreditCard, Wallet, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
  compact?: boolean;
  disabled?: boolean;
}

const paymentMethods = [
  {
    id: "card",
    name: "Cartão de Crédito",
    icon: CreditCard,
    color: "from-blue-500 to-blue-600",
    description: "Visa, Mastercard, Elo",
    badge: "Padrão"
  },
  {
    id: "apple_pay",
    name: "Apple Pay",
    icon: Wallet,
    color: "from-gray-900 to-gray-950",
    description: "Rápido e seguro",
    badge: "Recomendado"
  },
  {
    id: "google_pay",
    name: "Google Pay",
    icon: Wallet,
    color: "from-orange-500 to-orange-600",
    description: "Android & Web",
    badge: "Novo"
  },
  {
    id: "pix",
    name: "PIX",
    icon: Copy,
    color: "from-purple-600 to-purple-700",
    description: "Transferência instantânea",
    badge: "PIX"
  }
];

export default function PaymentMethodSelector({
  selectedMethod,
  onSelect,
  compact = false,
  disabled = false
}: PaymentMethodSelectorProps) {
  const [expanded, setExpanded] = useState(false);
  const selected = paymentMethods.find((m) => m.id === selectedMethod);

  if (compact) {
    return (
      <div className="w-full space-y-2">
        {/* Default Payment Method */}
        <div className="relative">
          <button
            onClick={() => !expanded && onSelect(selectedMethod)}
            disabled={disabled}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all",
              selectedMethod === "card"
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50 bg-muted/20"
            )}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm">Cartão de Crédito</p>
              <p className="text-xs text-muted-foreground">
                Visa, Mastercard, Elo
              </p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              Padrão
            </span>
          </button>
        </div>

        {/* More Options Expandable */}
        <div className="relative">
          <button
            onClick={() => setExpanded(!expanded)}
            disabled={disabled}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed transition-all",
              expanded
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted/50 hover:border-primary/50 text-muted-foreground hover:text-primary"
            )}
          >
            {expanded ? (
              <>
                <X className="h-5 w-5" />
                <span className="font-semibold text-sm">
                  Ocultar Mais Opções
                </span>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                <span className="font-semibold text-sm">+ Outras Opções</span>
              </>
            )}
          </button>

          {/* Expanded Additional Methods */}
          {expanded && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-background border-2 border-primary rounded-xl shadow-lg p-2 space-y-2">
              {paymentMethods.slice(1).map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => {
                      onSelect(method.id);
                      setExpanded(false);
                    }}
                    disabled={disabled}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all border",
                      selectedMethod === method.id
                        ? "border-primary bg-primary/10"
                        : "border-transparent hover:bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "h-6 w-6 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                        method.color
                      )}
                    >
                      <Icon className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-xs font-semibold truncate">
                        {method.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {method.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 bg-muted text-muted-foreground rounded whitespace-nowrap flex-shrink-0">
                      {method.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full view for modal/detailed page
  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              disabled={disabled}
              className={cn(
                "relative flex flex-col items-center gap-2 px-3 py-4 rounded-xl border-2 transition-all",
                selectedMethod === method.id
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-muted hover:border-primary/50 bg-muted/10"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                  method.color
                )}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold">{method.name}</p>
                <p className="text-xs text-muted-foreground">
                  {method.description}
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-muted text-muted-foreground rounded">
                {method.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
