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
      return new Response(JSON.stringify({ error: "Assinatura Pro necessária para gerar listas com IA." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { lowStockItems, expiredItems, habits, residents } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `VocÃª Ã© um assistente inteligente de compras para famÃ­lias brasileiras.
Analise os itens em falta e sugira uma lista de compras otimizada, categorizada por tipo de loja.
Considere o nÃºmero de moradores e hÃ¡bitos da casa.

Retorne no formato JSON:
{
  "shoppingList": [
    {
      "name": "Nome do item",
      "quantity": 2,
      "unit": "kg",
      "category": "market|fair|pharmacy",
      "priority": "high|medium|low",
      "reason": "EstÃ¡ acabando"
    }
  ],
  "tips": ["Dica 1 para economizar", "Dica 2"]
}`;

    const userPrompt = `Gere uma lista de compras inteligente:

Itens em estoque baixo: ${lowStockItems.map((i: any) => `${i.name} (${i.quantity} ${i.unit})`).join(', ') || 'Nenhum'}

Itens vencidos/descartados: ${expiredItems.join(', ') || 'Nenhum'}

NÃºmero de moradores: ${residents || 2}
HÃ¡bitos: ${habits?.join(', ') || 'NÃ£o informado'}

Considere uma famÃ­lia brasileira tÃ­pica e sugira quantidades adequadas para 1-2 semanas.`;

    console.log('Generating shopping list');

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
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

    const result = JSON.parse(content);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating shopping list:", error);
    
    // Explicit 401 for unauthorized curl attempts
    const isAuthError = error.name === "AuthError" || (error instanceof Error && error.message.includes("Auth"));
    
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Unknown error",
      shoppingList: [],
      tips: []
    }), {
      status: isAuthError ? 401 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

