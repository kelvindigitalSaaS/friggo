import { Recipe } from '@/types/friggo';

const CACHE_KEY = 'friggo_recipe_cache';
const CACHE_EXPIRY_KEY = 'friggo_recipe_cache_expiry';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedRecipes {
  ingredients: string[];
  recipes: Recipe[];
  timestamp: number;
}

// Get cached recipes
export function getCachedRecipes(ingredients: string[]): Recipe[] | null {
  try {
    const cacheJson = localStorage.getItem(CACHE_KEY);
    const expiryTime = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (!cacheJson || !expiryTime) return null;
    
    // Check if cache is expired
    if (Date.now() > parseInt(expiryTime)) {
      clearRecipeCache();
      return null;
    }
    
    const cache: CachedRecipes = JSON.parse(cacheJson);
    
    // Check if ingredients match (at least 70% overlap)
    const normalizedInput = ingredients.map(i => i.toLowerCase()).sort();
    const normalizedCached = cache.ingredients.map(i => i.toLowerCase()).sort();
    
    const overlap = normalizedInput.filter(i => normalizedCached.includes(i));
    if (overlap.length / Math.max(normalizedInput.length, normalizedCached.length) >= 0.7) {
      return cache.recipes;
    }
    
    return null;
  } catch {
    return null;
  }
}

// Save recipes to cache
export function cacheRecipes(ingredients: string[], recipes: Recipe[]): void {
  try {
    const cache: CachedRecipes = {
      ingredients,
      recipes,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
  } catch (error) {
    console.error('Failed to cache recipes:', error);
  }
}

// Clear recipe cache
export function clearRecipeCache(): void {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_EXPIRY_KEY);
}

// Get cache info
export function getCacheInfo(): { hasCache: boolean; expiresAt: Date | null; recipeCount: number } {
  try {
    const cacheJson = localStorage.getItem(CACHE_KEY);
    const expiryTime = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (!cacheJson || !expiryTime) {
      return { hasCache: false, expiresAt: null, recipeCount: 0 };
    }
    
    const cache: CachedRecipes = JSON.parse(cacheJson);
    return {
      hasCache: true,
      expiresAt: new Date(parseInt(expiryTime)),
      recipeCount: cache.recipes.length,
    };
  } catch {
    return { hasCache: false, expiresAt: null, recipeCount: 0 };
  }
}

// Saved/favorite recipes
const SAVED_RECIPES_KEY = 'friggo_saved_recipes';

export function getSavedRecipes(): Recipe[] {
  try {
    const saved = localStorage.getItem(SAVED_RECIPES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveRecipe(recipe: Recipe): void {
  try {
    const saved = getSavedRecipes();
    if (!saved.find(r => r.id === recipe.id)) {
      saved.push(recipe);
      localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(saved));
    }
  } catch (error) {
    console.error('Failed to save recipe:', error);
  }
}

export function unsaveRecipe(recipeId: string): void {
  try {
    const saved = getSavedRecipes();
    const filtered = saved.filter(r => r.id !== recipeId);
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to unsave recipe:', error);
  }
}

export function isRecipeSaved(recipeId: string): boolean {
  const saved = getSavedRecipes();
  return saved.some(r => r.id === recipeId);
}
