import { useState } from "react";
import { ArrowLeft, AlertCircle, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentGatewayPanelProps {
  selectedMethod: string;
  planName: string;
  planPrice: string;
  onBack: () => void;
  onPaymentSelect: (method: string) => Promise<void>;
  loading?: boolean;
}

interface PaymentOption {
  id: string;
  name: string;
  icon: string; // emoji ou icone
  color: string;
  description: string;
  available: boolean;
}

const paymentOptions: Record<string, PaymentOption[]> = {
  card: [
    {
      id: "visa",
      name: "Visa",
      icon: "💳",
      color: "from-blue-600 to-blue-700",
      description: "Débito ou Crédito",
      available: true
    },
    {
      id: "mastercard",
      name: "Mastercard",
      icon: "💳",
      color: "from-red-600 to-orange-600",
      description: "Débito ou Crédito",
      available: true
    },
    {
      id: "elo",
      name: "Elo",
      icon: "💳",
      color: "from-purple-600 to-pink-600",
      description: "Débito ou Crédito",
      available: true
    }
  ],
  apple_pay: [
    {
      id: "apple_pay_direct",
      name: "Apple Pay",
      icon: "🍎",
      color: "from-gray-900 to-gray-950",
      description: "Cartões vinculados ao seu ID Apple",
      available: true
    }
  ],
  google_pay: [
    {
      id: "google_pay_direct",
      name: "Google Pay",
      icon: "🔵",
      color: "from-orange-500 to-blue-500",
      description: "Cartões vinculados ao seu Google",
      available: true
    }
  ],
  pix: [
    {
      id: "pix_direct",
      name: "PIX",
      icon: "💜",
      color: "from-purple-600 to-purple-700",
      description: "Transferência instantânea (24h)",
      available: true
    }
  ],
  boleto: [
    {
      id: "boleto_direct",
      name: "Boleto",
      icon: "📄",
      color: "from-amber-600 to-amber-700",
      description: "Até 3 dias úteis",
      available: true
    }
  ]
};

const paymentMethodLabels: Record<string, string> = {
  card: "Cartão de Crédito",
  apple_pay: "Apple Pay",
  google_pay: "Google Pay",
  pix: "PIX",
  boleto: "Boleto"
};

export default function PaymentGatewayPanel({
  selectedMethod,
  planName,
  planPrice,
  onBack,
  onPaymentSelect,
  loading = false
}: PaymentGatewayPanelProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const options = paymentOptions[selectedMethod] || [];
  const methodLabel = paymentMethodLabels[selectedMethod] || selectedMethod;

  const handleSelectPayment = async (paymentId: string) => {
    setSelectedPayment(paymentId);
    setProcessing(true);
    try {
      await onPaymentSelect(paymentId);
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      setProcessing(false);
      setSelectedPayment(null);
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header com Voltar */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <button
          onClick={onBack}
          disabled={processing}
          className="h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm font-bold text-muted-foreground">
            {methodLabel}
          </p>
          <p className="text-lg font-black">{planName}</p>
        </div>
      </div>

      {/* Plano Info */}
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-1">
              Assinatura de:
            </p>
            <p className="text-2xl font-black text-primary">{planPrice}</p>
            <p className="text-xs text-muted-foreground mt-1">
              /mês • Cancelamento a qualquer momento
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-muted-foreground">Método</p>
            <p className="text-sm font-bold text-foreground">{methodLabel}</p>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-muted-foreground">
          {options.length > 1 ? "Escolha uma opção:" : "Método de pagamento:"}
        </p>

        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !processing && handleSelectPayment(option.id)}
            disabled={!option.available || processing}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
              option.available
                ? selectedPayment === option.id
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-muted hover:border-primary/50 bg-muted/10 hover:bg-muted/20"
                : "border-muted/50 bg-muted/5 opacity-50 cursor-not-allowed"
            )}
          >
            {/* Ícone/Logo */}
            <div
              className={cn(
                "h-12 w-12 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                option.color
              )}
            >
              <span className="text-lg">{option.icon}</span>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 text-left">
              <p className="font-bold text-foreground">{option.name}</p>
              <p className="text-xs text-muted-foreground">
                {option.description}
              </p>
            </div>

            {/* Status */}
            {selectedPayment === option.id ? (
              processing ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary flex-shrink-0" />
              ) : (
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
              )
            ) : null}
          </button>
        ))}
      </div>

      {/* Segurança Info */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/20 rounded-lg p-3">
        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold mb-1">Pagamento Seguro</p>
          <p>✅ Criptografia SSL 256-bit</p>
          <p>✅ Processador Stripe certificado</p>
          <p>✅ Proteção contra fraude</p>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={() => selectedPayment && handleSelectPayment(selectedPayment)}
        disabled={!selectedPayment || processing}
        className="w-full h-12 rounded-xl font-bold text-base shadow-md"
      >
        {processing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Processando...
          </>
        ) : (
          <>💳 Pagar {planPrice}</>
        )}
      </Button>
    </div>
  );
}
