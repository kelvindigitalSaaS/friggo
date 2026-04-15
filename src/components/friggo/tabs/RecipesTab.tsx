import { useState } from "react";
import { useKaza } from "@/contexts/FriggoContext";
import { RecipeCard } from "../RecipeCard";
import { allRecipes, findRecipesByIngredients } from "@/data/recipeDatabase";
import { Sparkles, Heart, Filter, ChefHat, Search, ShoppingCart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PlannerTab } from "./PlannerTab";
import { CalendarDays } from "lucide-react";

export function RecipesTab() {
  const { shoppingList, addToShoppingList, items, favoriteRecipes } = useKaza();
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState<"recipes" | "planner">("recipes");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(30);
  const [canCookNow, setCanCookNow] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Logic for smart filtering
  const getFilteredRecipes = () => {
    let baseList = allRecipes;

    if (canCookNow) {
      const ingredientNames = items.map(i => i.name);
      baseList = findRecipesByIngredients(ingredientNames);
    }

    if (showFavorites) {
      baseList = baseList.filter(r => favoriteRecipes.includes(r.id));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      baseList = baseList.filter(r => 
        r.name.toLowerCase().includes(q) || 
        (r.description ?? "").toLowerCase().includes(q)
      );
    }

    return baseList;
  };

  const filteredRecipes = getFilteredRecipes();

  return (
    <div className="space-y-4 pb-24">
      {/* Cabeçalho */}
      <div className="pt-2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              {subTab === "recipes" ? "Receitas" : "Plano Semanal"}
              <div className="rounded-xl bg-primary/10 p-1.5">
                {subTab === "recipes" ? <ChefHat className="h-5 w-5 text-primary" /> : <CalendarDays className="h-5 w-5 text-primary" />}
              </div>
          </h1>
        </div>

        {/* Segmented Control - iOS Style */}
        <div className="flex p-1 bg-black/[0.03] dark:bg-white/[0.05] rounded-2xl w-full max-w-sm mx-auto">
          <button
            onClick={() => setSubTab("recipes")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 text-[13px] font-bold rounded-xl transition-all",
              subTab === "recipes" 
                ? "bg-white dark:bg-white/10 text-primary shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BookOpen className={cn("h-4 w-4", subTab === "recipes" ? "text-primary" : "text-muted-foreground")} />
            Catálogo
          </button>
          <button
            onClick={() => setSubTab("planner")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 text-[13px] font-bold rounded-xl transition-all",
              subTab === "planner" 
                ? "bg-white dark:bg-white/10 text-primary shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CalendarDays className={cn("h-4 w-4", subTab === "planner" ? "text-primary" : "text-muted-foreground")} />
            Plano Semanal
          </button>
        </div>
      </div>

      {subTab === "planner" ? (
        <PlannerTab />
      ) : (
        <>

      {/* Filtros Inteligentes */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setCanCookNow(!canCookNow)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border",
            canCookNow 
              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
              : "bg-white dark:bg-white/5 border-black/[0.04] dark:border-white/[0.06] text-foreground"
          )}
        >
          <Sparkles className={cn("h-4 w-4", !canCookNow && "text-primary")} />
          Posso cozinhar agora?
        </button>

        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border",
            showFavorites
              ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20"
              : "bg-white dark:bg-white/5 border-black/[0.04] dark:border-white/[0.06] text-foreground"
          )}
        >
          <Heart className={cn("h-4 w-4", !showFavorites && "text-red-500")} />
          Meus favoritos
        </button>
      </div>

      {/* Busca */}
      <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar receitas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border-black/[0.04] dark:border-white/[0.06] text-[15px]"
          />
      </div>

      {/* Contagem */}
      <p className="text-xs text-muted-foreground">
        {filteredRecipes.length} receitas
        {searchQuery ? ` para "${searchQuery}"` : ""}
      </p>

      {/* Grid de receitas */}
      {filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] p-4 mb-4">
            <ChefHat className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="font-bold text-foreground">
            Nenhuma receita encontrada
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Tente outra categoria ou busca
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {filteredRecipes.slice(0, visibleCount).map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 20}ms` }}
              >
                <RecipeCard
                  recipe={recipe}
                  onClick={() =>
                    navigate(`/recipe/${recipe.id}`, { state: { recipe } })
                  }
                />
              </div>
            ))}
          </div>
          {filteredRecipes.length > visibleCount && (
            <Button
              variant="outline"
              className="w-full rounded-2xl h-11 bg-white/80 dark:bg-white/5 backdrop-blur-xl border-black/[0.04] dark:border-white/[0.06]"
              onClick={() => setVisibleCount((v) => v + 30)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Ver mais ({filteredRecipes.length - visibleCount} receitas)
            </Button>
          )}
        </>
      )}
        </>
      )}
    </div>
  );
}
