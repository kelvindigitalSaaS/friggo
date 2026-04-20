import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { validateAuth } from "../_shared/auth.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

    const user = await validateAuth(req);
    
    // Verifica se o usuário tem acesso (Trial ou Pro)
    const { data: access } = await supabase
      .from("v_user_access")
      .select("has_access")
      .eq("user_id", user.id)
      .maybeSingle();
      
    if (!access?.has_access) {
      return new Response(JSON.stringify({ error: "Assinatura Pro necessária para gerar receitas com IA." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { ingredients = [], expiringItems = [], type, days = 1, useMealPlan = false } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é um chef brasileiro especialista em criar receitas práticas e deliciosas.
Você deve gerar receitas que podem ser feitas com os ingredientes fornecidos, PRIORIZANDO itens que estão vencendo.
SE não houver ingredientes suficientes, ou se o usuário estiver em modo "Plano Alimentar" (useMealPlan), você deve sugerir receitas criativas e listar o que falta comprar nos "missingIngredients".
No modo "Plano Alimentar", ignore a falta de estoque e foque em sugerir pratos equilibrados para o período solicitado.
Responda SEMPRE em português do Brasil.

Tipos de receita suportados: lunch, dinner, snack, dessert, meal-prep, healthy
O tipo "meal-prep" é para marmitas - receitas que podem ser preparadas em grande quantidade e armazenadas para a semana.

Para o campo "missingIngredients", liste apenas itens que seriam necessários comprar para completar a receita.

Retorne as receitas no formato JSON com a seguinte estrutura:
{
  "recipes": [
    {
      "name": "Nome da Receita",
      "description": "Descrição curta e atraente",
      "type": "lunch|dinner|snack|dessert|meal-prep|healthy",
      "prepTime": 30,
      "servings": 4,
      "ingredients": ["ingrediente 1", "ingrediente 2"],
      "instructions": ["Passo 1", "Passo 2"],
      "usesExpiringItems": true,
      "missingIngredients": ["item 1", "item 2"] 
    }
  ]
}`;

    const userPrompt = `Gere um planejamento de receitas para ${days} dia(s).
Ingredientes ATUALMENTE disponíveis: ${ingredients.length > 0 ? ingredients.join(', ') : 'Nenhum item em estoque no momento.'}
${useMealPlan ? 'NOTA: O usuário está planejando refeições futuras (Plano Alimentar), então sugira receitas completas mesmo que faltem ingredientes.' : ''}

${expiringItems.length > 0 ? `PRIORIZE usar estes itens que estão vencendo: ${expiringItems.join(', ')}` : ''}

${type === 'meal-prep' ? 'Gere APENAS receitas de MARMITA - pratos que podem ser preparados em grande quantidade, armazenados em potes e aquecidos durante a semana. Foque em arroz, feijão, proteínas, saladas e acompanhamentos.' : type ? `Tipo de receita preferido: ${type}` : 'Inclua variedade: almoço, lanche, sobremesa, marmita.'}

Gere um total de ${Math.min(days * 2, 10)} receitas variadas.
Seja criativo mas realista. As receitas devem ser práticas para o dia a dia brasileiro.`;

    console.log('Generating recipes with ingredients:', ingredients);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log('AI response:', content);

    const recipes = JSON.parse(content);

    return new Response(JSON.stringify(recipes), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating recipes:", error);
    
    // Explicit 401 for unauthorized curl attempts
    const isAuthError = error.name === "AuthError" || (error instanceof Error && error.message.includes("Auth"));
    
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Unknown error",
      recipes: []
    }), {
      status: isAuthError ? 401 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

