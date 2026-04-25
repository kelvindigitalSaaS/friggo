import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || null; // Query (nome da receita)
    const category = url.searchParams.get("category") || null;
    const difficulty = url.searchParams.get("difficulty") || null;
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);

    // Validar parâmetros
    if (limit < 1 || limit > 100) {
      return new Response(
        JSON.stringify({ error: "limit deve estar entre 1 e 100" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Criar cliente Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Variáveis de ambiente não configuradas");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Chamar RPC da busca
    const { data, error } = await supabase.rpc("search_recipes", {
      p_query: q,
      p_category: category,
      p_difficulty: difficulty,
      p_limit: limit,
      p_offset: offset,
    });

    if (error) {
      console.error("[search-recipes] RPC error:", error);
      throw error;
    }

    // Extrair total do primeiro resultado
    const recipes = (data || []) as Array<any>;
    const total = recipes.length > 0 ? recipes[0].total_count : 0;

    // Remover campo total_count dos resultados
    const cleanRecipes = recipes.map((r) => {
      const { total_count, ...rest } = r;
      return rest;
    });

    // Buscar categorias (apenas na primeira página)
    let categories = [];
    if (offset === 0) {
      const { data: catData, error: catError } = await supabase.rpc(
        "get_recipe_categories"
      );
      if (!catError) {
        categories = catData || [];
      }
    }

    const hasNext = offset + limit < total;

    return new Response(
      JSON.stringify({
        success: true,
        recipes: cleanRecipes,
        total,
        limit,
        offset,
        has_next: hasNext,
        categories: offset === 0 ? categories : undefined,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("[search-recipes] Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Erro ao buscar receitas",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
