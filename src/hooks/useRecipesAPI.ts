import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeInstruction {
  step: number;
  description: string;
  duration_minutes?: number | null;
  tips?: string | null;
}

export interface Recipe {
  id: string;
  recipe_id: string;
  name: string;
  category: string;
  difficulty: "fácil" | "médio" | "difícil";
  prep_time: number;
  cook_time: number;
  servings: number;
  emoji: string;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
}

export interface RecipeCategory {
  category: string;
  count: number;
}

interface UseRecipesReturn {
  recipes: Recipe[];
  categories: RecipeCategory[];
  loading: boolean;
  error: string | null;
  total: number;
  hasNext: boolean;
  search: (query: string, category?: string, difficulty?: string) => Promise<void>;
  loadMore: () => Promise<void>;
  reset: () => void;
}

export function useRecipesAPI(): UseRecipesReturn {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [currentQuery, setCurrentQuery] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<string | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);

  const LIMIT = 50;

  const search = useCallback(
    async (query: string, category?: string, difficulty?: string) => {
      setLoading(true);
      setError(null);
      setRecipes([]);
      setCurrentOffset(0);
      setCurrentQuery(query || null);
      setCurrentCategory(category || null);
      setCurrentDifficulty(difficulty || null);

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl) {
          throw new Error("VITE_SUPABASE_URL não definida");
        }

        const params = new URLSearchParams();
        if (query && query.trim()) params.append("q", query.trim());
        if (category) params.append("category", category);
        if (difficulty) params.append("difficulty", difficulty);
        params.append("limit", LIMIT.toString());
        params.append("offset", "0");

        const response = await fetch(
          `${supabaseUrl}/functions/v1/search-recipes?${params}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: Falha na busca`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Erro ao buscar receitas");
        }

        setRecipes(data.recipes || []);
        setTotal(data.total || 0);
        setHasNext(data.has_next || false);
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Erro ao buscar receitas";
        setError(errorMsg);
        console.error("[useRecipesAPI] Search error:", errorMsg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadMore = useCallback(async () => {
    if (!hasNext || loading) return;

    setLoading(true);
    setError(null);

    try {
      const newOffset = currentOffset + LIMIT;
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl) {
        throw new Error("VITE_SUPABASE_URL não definida");
      }

      const params = new URLSearchParams();
      if (currentQuery) params.append("q", currentQuery);
      if (currentCategory) params.append("category", currentCategory);
      if (currentDifficulty) params.append("difficulty", currentDifficulty);
      params.append("limit", LIMIT.toString());
      params.append("offset", newOffset.toString());

      const response = await fetch(
        `${supabaseUrl}/functions/v1/search-recipes?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: Falha na busca`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Erro ao carregar mais receitas");
      }

      setRecipes((prev) => [...prev, ...data.recipes]);
      setHasNext(data.has_next || false);
      setCurrentOffset(newOffset);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro ao carregar mais";
      setError(errorMsg);
      console.error("[useRecipesAPI] LoadMore error:", errorMsg);
    } finally {
      setLoading(false);
    }
  }, [currentOffset, hasNext, loading, currentQuery, currentCategory, currentDifficulty]);

  const reset = useCallback(() => {
    setRecipes([]);
    setCategories([]);
    setLoading(false);
    setError(null);
    setTotal(0);
    setHasNext(false);
    setCurrentQuery(null);
    setCurrentCategory(null);
    setCurrentDifficulty(null);
    setCurrentOffset(0);
  }, []);

  return {
    recipes,
    categories,
    loading,
    error,
    total,
    hasNext,
    search,
    loadMore,
    reset,
  };
}
