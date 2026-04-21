import { Recipe } from "@/types/kaza";
import recipesData from "./recipes.json";

// Typed constant for the consolidated recipes
export const allRecipes: Recipe[] = recipesData as Recipe[];

// Helper to find a specific recipe by ID
export const getRecipeById = (id: string): Recipe | undefined => {
  return allRecipes.find(r => r.id === id);
};

// Export by culinary category
export const recipesByCategory = allRecipes.reduce<Record<string, Recipe[]>>(
  (acc, recipe) => {
    const cat = recipe.category || "Outras";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(recipe);
    return acc;
  },
  {}
);

// List of all available categories
export const availableCategories = Object.keys(recipesByCategory).sort();

/**
 * IntelliCook Logic:
 * Finds recipes based on available ingredients and gives a match score.
 * Prioritizes recipes that use items in stock.
 */
export function findRecipesByIngredients(
  availableIngredients: string[]
): (Recipe & { matchScore: number; matchingCount: number })[] {
  if (!availableIngredients.length) return [];
  
  const normalizedAvailable = availableIngredients.map((i) =>
    i.toLowerCase().trim()
  );

  return allRecipes
    .map((recipe) => {
      const matchingIngredients = recipe.ingredients.filter((ingredient) => {
        const ingLower = ingredient.toLowerCase();
        return normalizedAvailable.some(
          (avail) => ingLower.includes(avail) || avail.includes(ingLower)
        );
      });

      return {
        ...recipe,
        matchScore: matchingIngredients.length / recipe.ingredients.length,
        matchingCount: matchingIngredients.length
      };
    })
    .filter((r) => r.matchScore > 0.1) // Lower threshold to show more "possible" recipes
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Specifically finds recipes using items close to expiration.
 */
export function findRecipesForExpiringItems(
  expiringItemNames: string[]
): Recipe[] {
  if (!expiringItemNames.length) return [];
  
  const normalizedItems = expiringItemNames.map((i) => i.toLowerCase().trim());

  return allRecipes
    .filter((recipe) =>
      recipe.ingredients.some((ingredient) => {
        const ingLower = ingredient.toLowerCase();
        return normalizedItems.some(
          (item) => ingLower.includes(item) || item.includes(ingLower)
        );
      })
    )
    .map((recipe) => ({ ...recipe, usesExpiringItems: true }));
}

// Stats for internal use or dashboards
export const recipeStats = {
  total: allRecipes.length,
  byType: {
    lunch: allRecipes.filter((r) => r.type === "lunch").length,
    snack: allRecipes.filter((r) => r.type === "snack").length,
    dinner: allRecipes.filter((r) => r.type === "dinner").length,
    dessert: allRecipes.filter((r) => r.type === "dessert").length
  }
};

export default allRecipes;
