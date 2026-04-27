import { useState, useMemo } from "react";
import { useKaza } from "@/contexts/KazaContext";
import { RecipeCard } from "../RecipeCard";
import { allRecipes, availableCategories } from "@/data/recipeDatabase";
import { Heart, ChefHat, Search, BookOpen, X, SlidersHorizontal, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PlannerTab } from "./PlannerTab";
import { useLanguage } from "@/contexts/LanguageContext";

export function RecipesTab() {
  const { favoriteRecipes, toggleFavoriteRecipe } = useKaza();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState<"recipes" | "planner" | "favorites">("recipes");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string|null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string|null>(null);
  const [visibleCount, setVisibleCount] = useState(30);

  const availableDifficulties = useMemo(() => {
    const diffs = new Set<string>();
    allRecipes.forEach(r => {
      if (r.difficulty) diffs.add(r.difficulty.toLowerCase());
    });
    return Array.from(diffs).sort();
  }, []);

  const getFilteredRecipes = () => {
    let baseList = allRecipes;

    if (selectedCategory) {
      baseList = baseList.filter(r => r.category === selectedCategory);
    }

    if (selectedDifficulty) {
      baseList = baseList.filter(r => r.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase());
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
    <div className="space-y-4 pb-nav-safe">
      {/* ── Header ── */}
      <div className="pt-2 flex flex-col gap-4">
        {/* Segmented control */}
        <div
          className="flex p-1 rounded-2xl w-full"
          style={{ background: "rgba(22,90,82,0.07)" }}
        >
          <button
            onClick={() => setSubTab("recipes")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-[13px] font-bold rounded-xl transition-all",
              subTab === "recipes"
                ? "bg-white dark:bg-white/10 text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BookOpen className={cn("h-4 w-4", subTab === "recipes" ? "text-primary" : "text-muted-foreground")} />
            {t.recipesTitle}
          </button>
          <button
            onClick={() => setSubTab("planner")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-[13px] font-bold rounded-xl transition-all",
              subTab === "planner"
                ? "bg-white dark:bg-white/10 text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CalendarDays className={cn("h-4 w-4", subTab === "planner" ? "text-primary" : "text-muted-foreground")} />
            {t.home}
          </button>
          <button
            onClick={() => setSubTab("favorites")}
            className={cn(
              "flex items-center justify-center gap-1.5 px-4 py-2.5 text-[13px] font-bold rounded-xl transition-all",
              subTab === "favorites"
                ? "bg-white dark:bg-white/10 text-red-500 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className={cn("h-4 w-4", subTab === "favorites" ? "fill-red-500 text-red-500" : "")} />
            {favoriteRecipes.length > 0 && (
              <span className={cn("text-[10px] font-black", subTab === "favorites" ? "text-red-500" : "text-muted-foreground")}>
                {favoriteRecipes.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {subTab === "planner" ? (
        <PlannerTab />
      ) : subTab === "favorites" ? (
        <>
          <p className="text-xs text-muted-foreground">
            {favoriteRecipes.length} {t.recipes}
          </p>
          {favoriteRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] p-4 mb-4">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="font-bold text-foreground">
                {t.noRecipes}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t.noResults}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {allRecipes
                .filter(r => favoriteRecipes.includes(r.id))
                .map((recipe, index) => (
                  <div key={recipe.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 20}ms` }}>
                    <RecipeCard
                      recipe={recipe}
                      onClick={() => navigate(`/app/recipe/${recipe.id}`, { state: { recipe } })}
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavoriteRecipe(recipe.id); toast.success(t.delete); }}
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-black/60 shadow-sm transition-all active:scale-90"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* ── Search ── */}
          <div className="flex gap-2 relative">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border-black/[0.04] dark:border-white/[0.06] text-[15px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <button
               onClick={() => setFilterOpen(!filterOpen)}
               className={cn("flex flex-shrink-0 items-center justify-center h-11 w-11 rounded-2xl border-black/[0.04] dark:border-white/[0.06] bg-white/80 dark:bg-white/5 backdrop-blur-xl transition-all relative", filterOpen || selectedCategory || selectedDifficulty ? "bg-emerald-500 text-white" : "text-muted-foreground")}
            >
               <SlidersHorizontal className="h-4 w-4" />
               {(selectedCategory || selectedDifficulty) && (
                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0F3D38]" />
               )}
            </button>
            
            {filterOpen && (
               <>
                 <div className="fixed inset-0 z-40" onClick={() => setFilterOpen(false)} />
                 <div className="absolute right-0 top-[110%] w-56 bg-white dark:bg-[#11302c] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/[0.04] p-3 rounded-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="max-h-[70vh] overflow-y-auto no-scrollbar flex flex-col gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 px-1">{t.appearance}</p>
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => { setSelectedCategory(null); setFilterOpen(false); }} className={cn("w-full text-left px-3 py-2 text-[13px] rounded-xl transition-colors", !selectedCategory ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-bold" : "hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-foreground")}>
                            Todas
                          </button>
                          {availableCategories.map(cat => (
                            <button key={cat} onClick={() => { setSelectedCategory(cat); setFilterOpen(false); }} className={cn("w-full text-left px-3 py-2 text-[13px] rounded-xl transition-colors", selectedCategory === cat ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-bold" : "hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-foreground")}>
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-black/[0.04] dark:border-white/[0.06] pt-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 px-1">{t.security}</p>
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => { setSelectedDifficulty(null); setFilterOpen(false); }} className={cn("w-full text-left px-3 py-2 text-[13px] rounded-xl transition-colors", !selectedDifficulty ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-bold" : "hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-foreground")}>
                            Todas
                          </button>
                          {availableDifficulties.map(diff => (
                            <button key={diff} onClick={() => { setSelectedDifficulty(diff); setFilterOpen(false); }} className={cn("w-full text-left px-3 py-2 text-[13px] rounded-xl transition-colors capitalize", selectedDifficulty === diff ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-bold" : "hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-foreground")}>
                              {diff}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
               </>
            )}
          </div>

          {/* ── Count ── */}
          <p className="text-xs text-muted-foreground">
            {filteredRecipes.length} {t.recipes}
            {searchQuery ? ` : "${searchQuery}"` : ""}
          </p>

          {/* ── Recipe grid ── */}
          {filteredRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] p-4 mb-4">
                <ChefHat className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="font-bold text-foreground">{t.noRecipes}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.noResults}</p>
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
                      onClick={() => navigate(`/app/recipe/${recipe.id}`, { state: { recipe } })}
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
                  {t.seeAll} ({filteredRecipes.length - visibleCount} {t.recipes})
                </Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
