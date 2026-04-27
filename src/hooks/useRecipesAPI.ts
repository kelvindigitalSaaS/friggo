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
        let queryBuilder = supabase
          .from('recipes')
          .select('*', { count: 'exact' });

        if (query && query.trim()) {
          queryBuilder = queryBuilder.ilike('name', `%${query.trim()}%`);
        }
        if (category && category !== 'all') {
          queryBuilder = queryBuilder.eq('category', category);
        }
        if (difficulty && difficulty !== 'all') {
          queryBuilder = queryBuilder.eq('difficulty', difficulty);
        }

        const { data, error, count } = await queryBuilder
          .range(0, LIMIT - 1)
          .order('name');

        if (error) {
          throw new Error(error.message);
        }

        setRecipes(data || []);
        setTotal(count || 0);
        setHasNext((count || 0) > LIMIT);
        
        // Categroy counts can be derived or fetched separately if needed, but we'll mock or omit for now
        // since we just need the recipes to show up.
        setCategories([]);
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
      
      let queryBuilder = supabase
        .from('recipes')
        .select('*', { count: 'exact' });

      if (currentQuery) {
        queryBuilder = queryBuilder.ilike('name', `%${currentQuery}%`);
      }
      if (currentCategory && currentCategory !== 'all') {
        queryBuilder = queryBuilder.eq('category', currentCategory);
      }
      if (currentDifficulty && currentDifficulty !== 'all') {
        queryBuilder = queryBuilder.eq('difficulty', currentDifficulty);
      }

      const { data, error, count } = await queryBuilder
        .range(newOffset, newOffset + LIMIT - 1)
        .order('name');

      if (error) {
        throw new Error(error.message);
      }

      setRecipes((prev) => [...prev, ...(data || [])]);
      setHasNext((count || 0) > newOffset + LIMIT);
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
