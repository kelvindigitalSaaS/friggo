import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useFeedbackSurvey } from "@/hooks/useFeedbackSurvey";
import { cn } from "@/lib/utils";

const LIKED_FEATURES = [
  { id: "alerts", label: "Alertas de validade" },
  { id: "fridge_control", label: "Controle da geladeira" },
  { id: "recipes", label: "Sugestões de receitas" },
  { id: "shopping_list", label: "Lista de compras" },
  { id: "meal_planner", label: "Planejador de refeições" },
  { id: "other", label: "Outro" }
];

const IMPROVEMENT_AREAS = [
  { id: "more_items", label: "Mais tipos de produtos" },
  { id: "better_ui", label: "Interface mais intuitiva" },
  { id: "faster", label: "App mais rápido" },
  { id: "barcode", label: "Leitor de código de barras" },
  { id: "family_sharing", label: "Compartilhamento com família" },
  { id: "offline", label: "Funcionar offline" },
  { id: "other", label: "Outro" }
];

const NO_PURCHASE_REASONS = [
  { id: "price", label: "O preço não cabe no meu orçamento" },
  { id: "not_convinced", label: "Ainda não me convenceu" },
  { id: "temporary_use", label: "Precisei só por um tempo" },
  { id: "competitor", label: "Prefiro outro app" },
  { id: "will_subscribe", label: "Vou assinar sim, só não agora" },
  { id: "other", label: "Outro motivo" }
];

const MAIN_OBJECTIVES = [
  { id: "save_money", label: "💰 Economizar" },
  { id: "organize", label: "📋 Organizar" },
  { id: "reduce_waste", label: "♻️ Reduzir desperdício" },
  { id: "plan_recipes", label: "🍳 Planejar receitas" },
  { id: "other_objective", label: "Outro" }
];

const USAGE_PLATFORMS = [
  { id: "web", label: "💻 Web" },
  { id: "ios", label: "🍎 iPhone (iOS)" },
  { id: "android", label: "🤖 Android" }
];

export default function FeedbackSurvey() {
  const navigate = useNavigate();
  const { feedbackSubmitted } = useSubscription();
  const { submitFeedback, skipFeedback } = useFeedbackSurvey();

  // Redirecionar se já respondeu
  useEffect(() => {
    if (feedbackSubmitted) {
      navigate("/app/home?subscription=open", { replace: true });
    }
  }, [feedbackSubmitted, navigate]);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [likedFeatures, setLikedFeatures] = useState<string[]>([]);
  const [likedOtherText, setLikedOtherText] = useState("");
  const [improvementAreas, setImprovementAreas] = useState<string[]>([]);
  const [improvementOtherText, setImprovementOtherText] = useState("");
  const [noPurchaseReason, setNoPurchaseReason] = useState<string>("");
  const [npsScore, setNpsScore] = useState<number>(0);
  const [fairPrice, setFairPrice] = useState<number>(14.99);
  const [allowContact, setAllowContact] = useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState<string>("");
  const [mainObjective, setMainObjective] = useState<string>("");
  const [usagePlatform, setUsagePlatform] = useState<string>("");

  const handleSkip = async () => {
    setLoading(true);
    try {
      await skipFeedback();
      navigate("/app/home?subscription=open", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao pular feedback");
      setLoading(false);
    }
  };

  const handleNext = () => {
    setError(null);
    if (step === 1 && rating === 0) {
      setError("Por favor, selecione uma avaliação");
      return;
    }
    if (step === 2 && likedFeatures.length === 0) {
      setError("Por favor, selecione pelo menos uma opção");
      return;
    }
    if (step === 3 && improvementAreas.length === 0) {
      setError("Por favor, selecione pelo menos uma opção");
      return;
    }
    if (step === 4 && noPurchaseReason === "") {
      setError("Por favor, selecione um motivo");
      return;
    }
    if (step === 5 && npsScore === 0) {
      setError("Por favor, selecione uma nota");
      return;
    }
    if (step === 7 && mainObjective === "") {
      setError("Por favor, selecione pelo menos um objetivo");
      return;
    }
    if (step === 8 && usagePlatform === "") {
      setError("Por favor, selecione uma plataforma");
      return;
    }
    if (step === 9 && allowContact && contactEmail === "") {
      setError("Por favor, preencha seu email");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const likedFeaturesArray = likedFeatures.includes("other")
        ? likedFeatures.filter(f => f !== "other").concat(likedOtherText ? ["other"] : [])
        : likedFeatures;

      const improvementAreasArray = improvementAreas.includes("other")
        ? improvementAreas.filter(a => a !== "other").concat(improvementOtherText ? ["other"] : [])
        : improvementAreas;

      await submitFeedback({
        rating,
        likedFeatures: likedFeaturesArray,
        improvementAreas: improvementAreasArray,
        noPurchaseReason,
        likedFreetext: likedOtherText || undefined,
        improvementFreetext: improvementOtherText || undefined,
        npsScore,
        fairPrice,
        allowContact,
        contactEmail: allowContact ? contactEmail : undefined,
        mainObjective,
        usagePlatform
      });

      navigate("/app/home?subscription=open", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar feedback");
      setLoading(false);
    }
  };

  const handleToggleFeature = (id: string) => {
    setLikedFeatures(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const handleToggleImprovement = (id: string) => {
    setImprovementAreas(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const progress = (step / 9) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-kaza-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-lg font-semibold text-gray-900">Seu feedback é importante</h1>
          <p className="text-sm text-gray-600 mt-1">
            Ajude a melhorar o KAZA — {step} de 9
          </p>
          {/* Barra de progresso */}
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-kaza-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {/* Step 1: Avaliação */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Como você avalia o KAZA nesses 7 dias?
              </h2>
              <p className="text-gray-600">
                Sua opinião honesta nos ajuda a melhorar
              </p>
            </div>

            {/* Stars */}
            <div className="flex gap-4 justify-center py-8">
              {[1, 2, 3, 4, 5].map(i => (
                <button
                  key={i}
                  onClick={() => setRating(i)}
                  className="transition-transform hover:scale-110"
                >
                  <span className={cn(
                    "text-5xl",
                    i <= rating ? "text-yellow-400" : "text-gray-300"
                  )}>
                    ★
                  </span>
                </button>
              ))}
            </div>

            {rating > 0 && (
              <div className="text-center text-sm text-gray-600">
                {rating === 1 && "Preciso melhorar muito"}
                {rating === 2 && "Tem muitos pontos a melhorar"}
                {rating === 3 && "Está ok, mas pode melhorar"}
                {rating === 4 && "Muito bom!"}
                {rating === 5 && "Excelente! Adorei!"}
              </div>
            )}
          </div>
        )}

        {/* Step 2: O que mais gostou */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                O que você mais curtiu?
              </h2>
              <p className="text-gray-600">
                Pode selecionar mais de uma opção
              </p>
            </div>

            <div className="space-y-3">
              {LIKED_FEATURES.map(feature => (
                <label key={feature.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={likedFeatures.includes(feature.id)}
                    onChange={() => handleToggleFeature(feature.id)}
                    className="w-5 h-5 text-kaza-500 rounded"
                  />
                  <span className="text-gray-700">{feature.label}</span>
                </label>
              ))}
            </div>

            {likedFeatures.includes("other") && (
              <div className="mt-4">
                <textarea
                  value={likedOtherText}
                  onChange={e => setLikedOtherText(e.target.value)}
                  placeholder="Conte-nos o que gostou..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaza-500"
                  rows={3}
                />
              </div>
            )}
          </div>
        )}

        {/* Step 3: O que mudaria */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                O que você mudaria ou sentia falta?
              </h2>
              <p className="text-gray-600">
                Sua sugestão é valiosa para nós
              </p>
            </div>

            <div className="space-y-3">
              {IMPROVEMENT_AREAS.map(area => (
                <label key={area.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={improvementAreas.includes(area.id)}
                    onChange={() => handleToggleImprovement(area.id)}
                    className="w-5 h-5 text-kaza-500 rounded"
                  />
                  <span className="text-gray-700">{area.label}</span>
                </label>
              ))}
            </div>

            {improvementAreas.includes("other") && (
              <div className="mt-4">
                <textarea
                  value={improvementOtherText}
                  onChange={e => setImprovementOtherText(e.target.value)}
                  placeholder="Qual seria sua sugestão?"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaza-500"
                  rows={3}
                />
              </div>
            )}
          </div>
        )}

        {/* Step 4: Por que não assinar */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Por que você não vai assinar agora?
              </h2>
              <p className="text-gray-600">
                Entender o motivo nos ajuda a oferecer uma melhor solução
              </p>
            </div>

            <div className="space-y-2">
              {NO_PURCHASE_REASONS.map(reason => (
                <label key={reason.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="purchase-reason"
                    value={reason.id}
                    checked={noPurchaseReason === reason.id}
                    onChange={() => setNoPurchaseReason(reason.id)}
                    className="w-5 h-5 text-kaza-500"
                  />
                  <span className="text-gray-700">{reason.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: NPS (Probabilidade de recomendar) */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Qual a probabilidade de recomendar o KAZA a um amigo?
              </h2>
              <p className="text-gray-600">
                Escala de 0 (improvável) a 10 (muito provável)
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap justify-center">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <button
                    key={i}
                    onClick={() => setNpsScore(i)}
                    className={cn(
                      "w-12 h-12 rounded-lg font-bold transition-all border-2",
                      npsScore === i
                        ? "bg-kaza-500 text-white border-kaza-600"
                        : "bg-white text-gray-900 border-gray-200 hover:border-kaza-300"
                    )}
                  >
                    {i}
                  </button>
                ))}
              </div>
              {npsScore > 0 && (
                <div className="text-center text-sm text-gray-600 mt-4">
                  {npsScore <= 6 && "Obrigado por ser honesto, queremos melhorar!"}
                  {npsScore > 6 && npsScore <= 8 && "Que legal! Comenta para alguém?"}
                  {npsScore > 8 && "Que incrível! Seu apoio significa muito! 🙌"}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 6: Preço justo */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Qual preço você acharia justo para o KAZA?
              </h2>
              <p className="text-gray-600">
                Ajuste o valor com o controle abaixo
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-kaza-500 mb-2">
                  R$ {fairPrice.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600">por mês</p>
              </div>

              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={fairPrice}
                onChange={(e) => setFairPrice(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />

              <div className="flex justify-between text-xs text-gray-600">
                <span>R$ 5</span>
                <span>R$ 50</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Objetivo principal */}
        {step === 7 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Qual é seu principal objetivo com o KAZA?
              </h2>
              <p className="text-gray-600">
                Pode selecionar mais de uma opção
              </p>
            </div>

            <div className="space-y-3">
              {MAIN_OBJECTIVES.map(objective => (
                <label key={objective.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={mainObjective === objective.id}
                    onChange={() => setMainObjective(objective.id)}
                    className="w-5 h-5 text-kaza-500 rounded"
                  />
                  <span className="text-gray-700 text-lg">{objective.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Plataforma de uso */}
        {step === 8 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Em qual plataforma você mais usa o KAZA?
              </h2>
              <p className="text-gray-600">
                Isso ajuda a priorizar melhorias
              </p>
            </div>

            <div className="space-y-3">
              {USAGE_PLATFORMS.map(platform => (
                <label key={platform.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="platform"
                    value={platform.id}
                    checked={usagePlatform === platform.id}
                    onChange={() => setUsagePlatform(platform.id)}
                    className="w-5 h-5 text-kaza-500"
                  />
                  <span className="text-gray-700 text-lg">{platform.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 9: Contato */}
        {step === 9 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Podemos entrar em contato com você?
              </h2>
              <p className="text-gray-600">
                Para saber mais sobre suas necessidades e oferecer uma solução melhor
              </p>
            </div>

            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={allowContact}
                onChange={() => setAllowContact(!allowContact)}
                className="w-5 h-5 text-kaza-500 rounded"
              />
              <div>
                <p className="font-medium text-gray-900">Sim, entrem em contato!</p>
                <p className="text-sm text-gray-600">Receberei atualizações e ofertas especiais</p>
              </div>
            </label>

            {allowContact && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu email:
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kaza-500"
                />
              </div>
            )}
          </div>
        )}

        {/* Mensagens de erro */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Footer com botões */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkip}
            disabled={loading}
            className="flex-1"
          >
            Pular
          </Button>
          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 bg-kaza-500 hover:bg-kaza-600"
            >
              Próximo
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading || noPurchaseReason === ""}
              className="flex-1 bg-kaza-500 hover:bg-kaza-600"
            >
              {loading ? "Enviando..." : "Enviar feedback"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
