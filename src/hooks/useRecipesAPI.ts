import { useState, useCallback } from "react";
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

interface UseRecipesReturn {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  total: number;
  hasNext: boolean;
  search: (query: string, categories?: string[], difficulty?: string) => Promise<void>;
  loadMore: () => Promise<void>;
  reset: () => void;
}

const LIMIT = 50;

export function useRecipesAPI(): UseRecipesReturn {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [currentQuery, setCurrentQuery] = useState<string | null>(null);
  const [currentCategories, setCurrentCategories] = useState<string[] | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<string | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);

  const buildQuery = (
    query: string | null,
    categories: string[] | null,
    difficulty: string | null,
    offset: number
  ) => {
    let q = supabase.from("recipes").select("*", { count: "exact" });
    if (query) q = q.ilike("name", `%${query}%`);
    if (categories && categories.length > 0) q = q.in("category", categories);
    if (difficulty) q = q.eq("difficulty", difficulty);
    return q.range(offset, offset + LIMIT - 1).order("name");
  };

  const search = useCallback(
    async (query: string, categories?: string[], difficulty?: string) => {
      setLoading(true);
      setError(null);
      setRecipes([]);
      setCurrentOffset(0);
      const q = query || null;
      const cats = categories && categories.length > 0 ? categories : null;
      const diff = difficulty || null;
      setCurrentQuery(q);
      setCurrentCategories(cats);
      setCurrentDifficulty(diff);

      try {
        const { data, error: err, count } = await buildQuery(q, cats, diff, 0);
        if (err) throw new Error(err.message);
        setRecipes(data || []);
        setTotal(count || 0);
        setHasNext((count || 0) > LIMIT);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Erro ao buscar receitas";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const loadMore = useCallback(async () => {
    if (!hasNext || loading) return;
    setLoading(true);
    const newOffset = currentOffset + LIMIT;
    try {
      const { data, error: err, count } = await buildQuery(
        currentQuery,
        currentCategories,
        currentDifficulty,
        newOffset
      );
      if (err) throw new Error(err.message);
      setRecipes((prev) => [...prev, ...(data || [])]);
      setHasNext((count || 0) > newOffset + LIMIT);
      setCurrentOffset(newOffset);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar mais");
    } finally {
      setLoading(false);
    }
  }, [hasNext, loading, currentOffset, currentQuery, currentCategories, currentDifficulty]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => {
    setRecipes([]);
    setLoading(false);
    setError(null);
    setTotal(0);
    setHasNext(false);
    setCurrentQuery(null);
    setCurrentCategories(null);
    setCurrentDifficulty(null);
    setCurrentOffset(0);
  }, []);

  return { recipes, loading, error, total, hasNext, search, loadMore, reset };
}
