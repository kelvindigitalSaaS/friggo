import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useSubscription } from "@/contexts/SubscriptionContext";

export interface FeedbackData {
  rating: number;
  likedFeatures: string[];
  improvementAreas: string[];
  noPurchaseReason?: string;
  likedFreetext?: string;
  improvementFreetext?: string;
}

export function useFeedbackSurvey() {
  const { user } = useAuth();
  const { trialDaysRemaining, refreshSubscription } = useSubscription();

  const submitFeedback = useCallback(
    async (data: FeedbackData) => {
      if (!user) throw new Error("Usuário não autenticado");

      const trialDaysUsed = Math.max(0, 7 - trialDaysRemaining);

      // Inserir feedback na tabela
      const { error: insertError } = await supabase
        .from("feedback_surveys")
        .insert([
          {
            user_id: user.id,
            rating: data.rating,
            liked_features: data.likedFeatures,
            improvement_areas: data.improvementAreas,
            no_purchase_reason: data.noPurchaseReason,
            liked_freetext: data.likedFreetext,
            improvement_freetext: data.improvementFreetext,
            trial_days_used: trialDaysUsed,
            platform: "web"
          }
        ]);

      if (insertError) throw insertError;

      // Marcar como respondido no profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ feedback_submitted: true })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // Atualizar contexto
      await refreshSubscription();

      return true;
    },
    [user, trialDaysRemaining, refreshSubscription]
  );

  const skipFeedback = useCallback(async () => {
    if (!user) throw new Error("Usuário não autenticado");

    // Apenas marcar como respondido, sem inserir dados
    const { error } = await supabase
      .from("profiles")
      .update({ feedback_submitted: true })
      .eq("user_id", user.id);

    if (error) throw error;

    // Atualizar contexto
    await refreshSubscription();

    return true;
  }, [user, refreshSubscription]);

  return {
    submitFeedback,
    skipFeedback
  };
}
