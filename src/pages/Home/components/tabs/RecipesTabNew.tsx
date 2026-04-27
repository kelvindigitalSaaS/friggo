import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { useRecipesAPI, Recipe } from "@/hooks/useRecipesAPI";
import { Loader2, Search, ChefHat, AlertCircle, ShoppingCart, X, Clock, Users, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useKaza } from "@/contexts/KazaContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

// Simplified categories with DB mapping
const CATEGORY_GROUPS: { label: string; emoji: string; dbCategories: string[] }[] = [
  {
    label: "Café da Manhã",
    emoji: "☕",
    dbCategories: ["Café da Manhã", "Cafés", "Panquecas"],
  },
  {
    label: "Carnes",
    emoji: "🥩",
    dbCategories: [
      "Carnes", "Churrasco", "BBQ", "Assados", "Aves", "Porco",
      "Grelhados", "Grelhados Premium", "Frango Especial",
    ],
  },
  {
    label: "Massas e Arroz",
    emoji: "🍝",
    dbCategories: ["Massas", "Arrozes", "Risotos", "Massa Fresca"],
  },
  {
    label: "Sopas",
    emoji: "🍲",
    dbCategories: ["Sopas", "Caldos", "Sopas e Caldos", "Ensopados"],
  },
  {
    label: "Saladas",
    emoji: "🥗",
    dbCategories: [
      "Saladas", "Bowls", "Bowls Saudáveis",
      "Fitness", "Saudável", "Detox", "Low Carb",
    ],
  },
  {
    label: "Sobremesas",
    emoji: "🍰",
    dbCategories: [
      "Sobremesas", "Bolos", "Doces", "Chocolates",
      "Sorvetes", "Sobremesas Gourmet", "Bolos Especiais", "Doces Especiais",
    ],
  },
  {
    label: "Lanches",
    emoji: "🥪",
    dbCategories: [
      "Lanches", "Petiscos", "Sanduíches",
      "Finger Food", "Street Food", "Salgados", "Salgados Festa",
    ],
  },
  {
    label: "Peixes e Mar",
    emoji: "🐟",
    dbCategories: ["Peixes", "Frutos do Mar", "Frutos do Mar Premium", "Pratos de Mar BR"],
  },
  {
    label: "Vegetariano",
    emoji: "🥦",
    dbCategories: [
      "Vegetariana", "Vegetariano", "Vegano",
      "Proteína Vegetal", "Vegetariano Gourmet",
    ],
  },
];

const DIFFICULTIES = [
  { label: "Fácil", value: "fácil", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30" },
  { label: "Médio", value: "médio", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
  { label: "Difícil", value: "difícil", color: "text-red-600", bg: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30" },
];

function RecipeSheet({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const { items, addToShoppingList } = useKaza();
  const { language } = useLanguage();
  const pt = language === "pt-BR";
  const es = language === "es";

  const missingIngredients = recipe.ingredients.filter((ing) => {
    const nameL = ing.name.toLowerCase();
    return !items.some((item) => item.name.toLowerCase().includes(nameL) || nameL.includes(item.name.toLowerCase()));
  });

  const handleAddMissing = async () => {
    if (missingIngredients.length === 0) {
      toast.info(pt ? "Você já tem todos os ingredientes!" : es ? "¡Ya tienes todos!" : "You have all ingredients!");
      return;
    }
    for (const ing of missingIngredients) {
      await addToShoppingList({
        name: ing.name,
        quantity: ing.quantity || 1,
        unit: ing.unit || "un",
        category: "pantry",
        store: "market",
      });
    }
    toast.success(
      pt ? `${missingIngredients.length} ingredientes adicionados à lista!`
        : es ? `${missingIngredients.length} ingredientes agregados!`
        : `${missingIngredients.length} ingredients added to list!`
    );
    onClose();
  };

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        key="sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-[#fafafa] dark:bg-[#0d2820] shadow-2xl max-h-[85dvh] flex flex-col"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-black/10 dark:bg-white/10" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 pb-6 pt-2 space-y-5">
          {/* Header */}
          <div className="text-center space-y-1">
            <p className="text-3xl">{recipe.emoji || "🍽️"}</p>
            <h2 className="text-xl font-black text-foreground">{recipe.name}</h2>
            <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{(recipe.prep_time ?? 0) + (recipe.cook_time ?? 0)} min</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{recipe.servings} {pt ? "porções" : es ? "porciones" : "servings"}</span>
              <span className={cn(
                "font-bold px-2 py-0.5 rounded-full",
                recipe.difficulty === "fácil" ? "text-emerald-700 bg-emerald-50" :
                recipe.difficulty === "médio" ? "text-amber-700 bg-amber-50" :
                "text-red-700 bg-red-50"
              )}>{recipe.difficulty}</span>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-sm font-black text-foreground mb-3 uppercase tracking-wider">
              {pt ? "Ingredientes" : es ? "Ingredientes" : "Ingredients"}
            </h3>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, i) => {
                const nameL = ing.name.toLowerCase();
                const inStock = items.some(
                  (item) => item.name.toLowerCase().includes(nameL) || nameL.includes(item.name.toLowerCase())
                );
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 border",
                      inStock
                        ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
                        : "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20"
                    )}
                  >
                    {inStock
                      ? <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      : <ShoppingCart className="h-4 w-4 text-red-400 shrink-0" />
                    }
                    <span className={cn("flex-1 text-sm font-semibold", inStock ? "text-emerald-800 dark:text-emerald-200" : "text-red-800 dark:text-red-200")}>
                      {ing.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {ing.quantity} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions (if available) */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div>
              <h3 className="text-sm font-black text-foreground mb-3 uppercase tracking-wider">
                {pt ? "Modo de Preparo" : es ? "Preparación" : "Instructions"}
              </h3>
              <div className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-6 w-6 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-black flex items-center justify-center mt-0.5">
                      {step.step}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed flex-1">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        {missingIngredients.length > 0 && (
          <div className="px-6 pb-6 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] shrink-0">
            <button
              onClick={handleAddMissing}
              className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl text-white font-black text-sm shadow-lg transition-all active:scale-[0.98]"
              style={{ background: "#165A52" }}
            >
              <ShoppingCart className="h-5 w-5" />
              {pt
                ? `Adicionar ${missingIngredients.length} ingrediente${missingIngredients.length > 1 ? "s" : ""} faltante${missingIngredients.length > 1 ? "s" : ""} à lista`
                : es
                ? `Agregar ${missingIngredients.length} ingrediente${missingIngredients.length > 1 ? "s" : ""} faltante${missingIngredients.length > 1 ? "s" : ""}`
                : `Add ${missingIngredients.length} missing ingredient${missingIngredients.length > 1 ? "s" : ""} to list`}
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

export function RecipesTabNew() {
  const { recipes, loading, error, hasNext, loadMore, search, total } = useRecipesAPI();
  const { language } = useLanguage();

  const [query, setQuery] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const pt = language === "pt-BR";

  const triggerSearch = useCallback(
    (q: string, catIdx: number | null, diff: string | null) => {
      const cats = catIdx !== null ? CATEGORY_GROUPS[catIdx].dbCategories : undefined;
      search(q, cats, diff || undefined);
    },
    [search]
  );

  // Initial load
  useEffect(() => {
    triggerSearch("", null, null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryToggle = (idx: number) => {
    const next = selectedCategoryIndex === idx ? null : idx;
    setSelectedCategoryIndex(next);
    triggerSearch(query, next, selectedDifficulty);
  };

  const handleDifficultyToggle = (val: string) => {
    const next = selectedDifficulty === val ? null : val;
    setSelectedDifficulty(next);
    triggerSearch(query, selectedCategoryIndex, next);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedCategoryIndex(null);
    setSelectedDifficulty(null);
    search("", undefined, undefined);
  };

  const hasFilters = query.trim() || selectedCategoryIndex !== null || selectedDifficulty !== null;

  return (
    <div className="flex flex-col min-h-0">
      {/* ── Sticky filters ── */}
      <div className="px-4 pt-4 pb-2 space-y-3 bg-background">
        {/* Search */}
        <form onSubmit={(e) => { e.preventDefault(); triggerSearch(query, selectedCategoryIndex, selectedDifficulty); }}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={pt ? "Buscar receitas..." : "Search recipes..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => triggerSearch(query, selectedCategoryIndex, selectedDifficulty)}
              className="pl-10 h-11 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border-black/[0.06] dark:border-white/[0.08]"
            />
          </div>
        </form>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORY_GROUPS.map((grp, idx) => {
            const isActive = selectedCategoryIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryToggle(idx)}
                className={cn(
                  "h-8 px-3 rounded-full text-[11px] font-bold shrink-0 transition-all border flex items-center gap-1",
                  isActive
                    ? "bg-primary text-white border-transparent shadow-md"
                    : "bg-white dark:bg-white/5 text-muted-foreground border-black/[0.06] dark:border-white/[0.08]"
                )}
              >
                <span>{grp.emoji}</span>
                <span>{grp.label}</span>
              </button>
            );
          })}
        </div>

        {/* Difficulty pills */}
        <div className="flex gap-2">
          {DIFFICULTIES.map((d) => {
            const isActive = selectedDifficulty === d.value;
            return (
              <button
                key={d.value}
                onClick={() => handleDifficultyToggle(d.value)}
                className={cn(
                  "h-7 px-3 rounded-full text-[11px] font-bold shrink-0 transition-all border",
                  isActive
                    ? `${d.bg} ${d.color} shadow-sm`
                    : "bg-white dark:bg-white/5 text-muted-foreground border-black/[0.06] dark:border-white/[0.08]"
                )}
              >
                {d.label}
              </button>
            );
          })}
          {hasFilters && (
            <button
              onClick={handleClear}
              className="h-7 px-3 rounded-full text-[11px] font-bold shrink-0 bg-black/5 dark:bg-white/10 text-muted-foreground border border-black/[0.06] dark:border-white/[0.08] transition-all"
            >
              {pt ? "Limpar" : "Clear"}
            </button>
          )}
        </div>
      </div>

      {/* ── Results ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2 space-y-3">
        {error && (
          <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {loading && recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {pt ? "Buscando receitas..." : "Searching recipes..."}
            </p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ChefHat className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-bold text-muted-foreground">
              {pt ? "Nenhuma receita encontrada." : "No recipes found."}
            </p>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-semibold text-muted-foreground px-1">
              {pt ? `${recipes.length} de ${total} receitas` : `${recipes.length} of ${total} recipes`}
            </p>

            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="rounded-[1.5rem] bg-white dark:bg-[#11302c]/40 border border-black/[0.04] dark:border-white/[0.05] overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer group"
              >
                <div className="flex items-center gap-4 px-4 py-4">
                  <div className="h-14 w-14 flex items-center justify-center rounded-[1rem] bg-emerald-500/10 shrink-0 border border-emerald-500/10">
                    <span className="text-2xl">{recipe.emoji || "🍽️"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-black text-[#1a3d32] dark:text-emerald-50 truncate leading-tight">
                      {recipe.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {recipe.category}
                      </span>
                      {recipe.difficulty && (
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          recipe.difficulty === "fácil"
                            ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10"
                            : recipe.difficulty === "médio"
                            ? "text-amber-700 bg-amber-50 dark:bg-amber-500/10"
                            : "text-red-700 bg-red-50 dark:bg-red-500/10"
                        )}>
                          {recipe.difficulty}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground font-medium">
                        {(recipe.prep_time ?? 0) + (recipe.cook_time ?? 0)} min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {hasNext && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="w-full py-4 rounded-xl text-sm font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 transition-colors active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  pt ? "Carregar mais receitas" : "Load more recipes"
                )}
              </button>
            )}
          </>
        )}
      </div>

      {/* ── Recipe Detail Sheet ── */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeSheet
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
