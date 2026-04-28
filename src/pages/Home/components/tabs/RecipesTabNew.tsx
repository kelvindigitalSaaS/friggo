import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, ChefHat, ShoppingCart, X, Clock, Users, Check, Play, Pause, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useKaza } from "@/contexts/KazaContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { allRecipes } from "@/data/recipeDatabase";
import { Recipe } from "@/types/kaza";

// Simplified categories mapped to recipe.category values from local JSON
const CATEGORY_GROUPS: { label: string; emoji: string; categories: string[] }[] = [
  { label: "Café da Manhã", emoji: "☕", categories: ["Café da Manhã", "Cafés", "Panquecas"] },
  { label: "Carnes", emoji: "🥩", categories: ["Carnes", "Churrasco", "BBQ", "Assados", "Aves", "Porco", "Grelhados", "Grelhados Premium", "Frango Especial"] },
  { label: "Massas e Arroz", emoji: "🍝", categories: ["Massas", "Arrozes", "Risotos", "Massa Fresca"] },
  { label: "Sopas", emoji: "🍲", categories: ["Sopas", "Caldos", "Sopas e Caldos", "Ensopados"] },
  { label: "Saladas", emoji: "🥗", categories: ["Saladas", "Bowls", "Bowls Saudáveis", "Fitness", "Saudável", "Detox", "Low Carb"] },
  { label: "Sobremesas", emoji: "🍰", categories: ["Sobremesas", "Bolos", "Doces", "Chocolates", "Sorvetes", "Sobremesas Gourmet", "Bolos Especiais", "Doces Especiais"] },
  { label: "Lanches", emoji: "🥪", categories: ["Lanches", "Petiscos", "Sanduíches", "Finger Food", "Street Food", "Salgados", "Salgados Festa"] },
  { label: "Peixes e Mar", emoji: "🐟", categories: ["Peixes", "Frutos do Mar", "Frutos do Mar Premium", "Pratos de Mar BR"] },
  { label: "Vegetariano", emoji: "🥦", categories: ["Vegetariana", "Vegetariano", "Vegano", "Proteína Vegetal", "Vegetariano Gourmet"] },
];

const DIFFICULTIES = [
  { label: "Fácil", value: "fácil", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30" },
  { label: "Médio", value: "médio", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
  { label: "Difícil", value: "difícil", color: "text-red-600", bg: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30" },
];

const VISIBLE_STEP = 50;

function RecipeSheet({ recipe, onClose, onFilterByCategory }: { recipe: Recipe; onClose: () => void; onFilterByCategory?: (categoryIdx: number) => void }) {
  const { items, addToShoppingList } = useKaza();
  const { language } = useLanguage();
  const pt = language === "pt-BR";
  const es = language === "es";

  const [cookingMode, setCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const instructions = (recipe.instructions ?? []) as string[];

  const missingIngredients = (recipe.ingredients as string[]).filter((ing) => {
    const nameL = ing.toLowerCase();
    return !items.some((item) =>
      item.name.toLowerCase().includes(nameL) || nameL.includes(item.name.toLowerCase())
    );
  });

  const handleAddMissing = async () => {
    if (missingIngredients.length === 0) {
      toast.info(pt ? "Você já tem todos os ingredientes!" : es ? "¡Ya tienes todos!" : "You have all ingredients!");
      return;
    }
    for (const ing of missingIngredients) {
      await addToShoppingList({ name: ing, quantity: 1, unit: "un", category: "pantry", store: "market" });
    }
    toast.success(pt ? `${missingIngredients.length} ingredientes adicionados à lista!` : `${missingIngredients.length} ingredients added!`);
    onClose();
  };

  const toggleStep = (i: number) =>
    setCompletedSteps((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const progress = instructions.length > 0 ? (completedSteps.length / instructions.length) * 100 : 0;

  const diffColor = recipe.difficulty === "fácil" || recipe.difficulty === "easy"
    ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10"
    : recipe.difficulty === "médio" || recipe.difficulty === "medium"
    ? "text-amber-700 bg-amber-50 dark:bg-amber-500/10"
    : "text-red-700 bg-red-50 dark:bg-red-500/10";

  return (
    <>
      <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div key="sh" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-[#fafafa] dark:bg-[#0d2820] shadow-2xl max-h-[90dvh] flex flex-col"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>

        {/* Handle + close */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-black/10 dark:bg-white/10" />
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-muted-foreground">
          <X className="h-4 w-4" />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 pb-4 pt-2 space-y-4">

          {/* Header */}
          <div className="text-center space-y-1 pt-1">
            <p className="text-3xl">{recipe.emoji || "🍽️"}</p>
            <h2 className="text-[18px] font-black text-foreground leading-tight">{recipe.name}</h2>
            {recipe.description && (
              <p className="text-xs text-muted-foreground leading-relaxed mt-1 px-2">{recipe.description}</p>
            )}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
              {recipe.prepTime && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full">
                  <Clock className="h-3 w-3" />{recipe.prepTime} min
                </span>
              )}
              {recipe.servings && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full">
                  <Users className="h-3 w-3" />{recipe.servings} {pt ? "porções" : "servings"}
                </span>
              )}
              {recipe.difficulty && (
                <span className={cn("text-[11px] font-black px-2.5 py-1 rounded-full", diffColor)}>
                  {recipe.difficulty}
                </span>
              )}
              {recipe.category && onFilterByCategory && (
                <button
                  onClick={() => {
                    const categoryIdx = CATEGORY_GROUPS.findIndex(g => g.categories.includes(recipe.category!));
                    if (categoryIdx !== -1) {
                      onFilterByCategory(categoryIdx);
                    }
                  }}
                  className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors active:scale-95"
                >
                  {recipe.category}
                </button>
              )}
            </div>
          </div>

          {/* ── COOKING MODE ── */}
          {cookingMode && instructions.length > 0 ? (
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                  <span>{pt ? "Progresso" : "Progress"}</span>
                  <span>{completedSteps.length}/{instructions.length}</span>
                </div>
                <div className="h-2 rounded-full bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Current step card */}
              <div className="rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-primary text-white font-black text-lg">
                    {currentStep + 1}
                  </div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    {pt ? `Passo ${currentStep + 1} de ${instructions.length}` : `Step ${currentStep + 1} of ${instructions.length}`}
                  </p>
                </div>
                <p className="text-[16px] font-semibold text-foreground leading-relaxed">
                  {instructions[currentStep]}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                  disabled={currentStep === 0}
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/5 text-foreground font-bold text-sm transition-all active:scale-95 disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {pt ? "Anterior" : "Back"}
                </button>
                <button
                  onClick={() => {
                    toggleStep(currentStep);
                    if (currentStep < instructions.length - 1) setCurrentStep((s) => s + 1);
                    else toast.success(pt ? "🎉 Receita concluída!" : "🎉 Recipe done!");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl text-white font-black text-sm transition-all active:scale-95"
                  style={{ background: "#165A52" }}
                >
                  {currentStep === instructions.length - 1 ? (
                    <><Check className="h-4 w-4" />{pt ? "Concluir" : "Done"}</>
                  ) : (
                    <>{pt ? "Próximo" : "Next"}<ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>

              {/* All steps mini list */}
              <div className="space-y-1.5">
                {instructions.map((step, i) => (
                  <button key={i} onClick={() => { setCurrentStep(i); toggleStep(i); }}
                    className={cn(
                      "w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all border",
                      i === currentStep
                        ? "bg-primary/10 border-primary/20"
                        : completedSteps.includes(i)
                        ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 opacity-70"
                        : "bg-white dark:bg-white/5 border-black/[0.04] dark:border-white/[0.06]"
                    )}>
                    <div className={cn(
                      "h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5",
                      completedSteps.includes(i) ? "bg-emerald-500 text-white" : i === currentStep ? "bg-primary text-white" : "bg-black/10 dark:bg-white/10 text-muted-foreground"
                    )}>
                      {completedSteps.includes(i) ? <Check className="h-3 w-3" /> : i + 1}
                    </div>
                    <p className="text-xs text-foreground leading-relaxed flex-1 line-clamp-2">{step}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── NORMAL VIEW ── */
            <>
              {/* Ingredients */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-black text-foreground mb-2 uppercase tracking-wider">
                    {pt ? "Ingredientes" : es ? "Ingredientes" : "Ingredients"}
                  </h3>
                  <div className="space-y-1.5">
                    {(recipe.ingredients as string[]).map((ing, i) => {
                      const nameL = ing.toLowerCase();
                      const inStock = items.some(
                        (item) => item.name.toLowerCase().includes(nameL) || nameL.includes(item.name.toLowerCase())
                      );
                      return (
                        <div key={i} className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 border",
                          inStock
                            ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
                            : "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20"
                        )}>
                          {inStock
                            ? <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            : <ShoppingCart className="h-3.5 w-3.5 text-red-400 shrink-0" />}
                          <span className={cn("flex-1 text-sm font-medium",
                            inStock ? "text-emerald-800 dark:text-emerald-200" : "text-red-800 dark:text-red-200"
                          )}>{ing}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Instructions list */}
              {instructions.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-black text-foreground mb-2 uppercase tracking-wider">
                    {pt ? "Modo de Preparo" : es ? "Preparación" : "Instructions"}
                  </h3>
                  <div className="space-y-2">
                    {instructions.map((step, i) => (
                      <div key={i} onClick={() => toggleStep(i)}
                        className={cn(
                          "flex gap-3 rounded-xl px-3 py-3 border cursor-pointer transition-all active:scale-[0.99]",
                          completedSteps.includes(i)
                            ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
                            : "bg-white dark:bg-white/5 border-black/[0.04] dark:border-white/[0.06]"
                        )}>
                        <div className={cn(
                          "h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-[11px] font-black mt-0.5 transition-all",
                          completedSteps.includes(i) ? "bg-emerald-500 text-white" : "bg-black/10 dark:bg-white/10 text-muted-foreground"
                        )}>
                          {completedSteps.includes(i) ? <Check className="h-3.5 w-3.5" /> : i + 1}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer CTAs ── */}
        <div className="px-5 pb-6 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] shrink-0 space-y-2">
          {/* Cooking mode toggle */}
          {instructions.length > 0 && (
            <button
              onClick={() => { setCookingMode((m) => !m); setCurrentStep(0); setCompletedSteps([]); }}
              className={cn(
                "w-full flex items-center justify-center gap-2 h-12 rounded-2xl font-black text-sm transition-all active:scale-[0.98] border",
                cookingMode
                  ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30"
                  : "bg-black/[0.03] dark:bg-white/[0.04] text-foreground border-black/[0.06] dark:border-white/[0.08]"
              )}>
              {cookingMode
                ? <><Pause className="h-4 w-4" />{pt ? "Sair do Modo Cozinha" : "Exit Cooking Mode"}</>
                : <><Play className="h-4 w-4" />{pt ? "Iniciar Modo Cozinha" : "Start Cooking Mode"}</>
              }
            </button>
          )}

          {/* Add missing ingredients */}
          {missingIngredients.length > 0 && (
            <button onClick={handleAddMissing}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl text-white font-black text-sm shadow-lg transition-all active:scale-[0.98]"
              style={{ background: "#165A52" }}>
              <ShoppingCart className="h-5 w-5" />
              {pt ? `Adicionar ${missingIngredients.length} ingrediente${missingIngredients.length > 1 ? "s" : ""} faltante${missingIngredients.length > 1 ? "s" : ""} à lista`
                : `Add ${missingIngredients.length} missing ingredient${missingIngredients.length > 1 ? "s" : ""} to list`}
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}

export function RecipesTabNew() {
  const { language } = useLanguage();
  const { favoriteRecipes } = useKaza();
  const [query, setQuery] = useState("");
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_STEP);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const pt = language === "pt-BR";

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const cats = selectedCategoryIdx !== null ? CATEGORY_GROUPS[selectedCategoryIdx].categories : null;
    const diff = selectedDifficulty;

    return allRecipes.filter((r) => {
      if (showOnlyFavorites && !favoriteRecipes.includes(r.id)) return false;
      if (q && !r.name.toLowerCase().includes(q) && !(r.description ?? "").toLowerCase().includes(q)) return false;
      if (cats && !cats.includes(r.category ?? "")) return false;
      if (diff) {
        const d = (r.difficulty ?? "").toLowerCase();
        if (diff === "fácil" && d !== "fácil" && d !== "easy") return false;
        if (diff === "médio" && d !== "médio" && d !== "medium") return false;
        if (diff === "difícil" && d !== "difícil" && d !== "hard") return false;
      }
      return true;
    });
  }, [query, selectedCategoryIdx, selectedDifficulty, showOnlyFavorites, favoriteRecipes]);

  const displayed = filtered.slice(0, visibleCount);
  const hasFilters = query.trim() || selectedCategoryIdx !== null || selectedDifficulty !== null;

  const handleCategoryToggle = (idx: number) => {
    setSelectedCategoryIdx((prev) => (prev === idx ? null : idx));
    setVisibleCount(VISIBLE_STEP);
  };

  const handleDifficultyToggle = (val: string) => {
    setSelectedDifficulty((prev) => (prev === val ? null : val));
    setVisibleCount(VISIBLE_STEP);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedCategoryIdx(null);
    setSelectedDifficulty(null);
    setVisibleCount(VISIBLE_STEP);
  };

  return (
    <div className="flex flex-col min-h-0">
      {/* ── Favorites Toggle ── */}
      {favoriteRecipes.length > 0 && (
        <div className="px-4 pt-3 pb-2">
          <button
            onClick={() => {
              setShowOnlyFavorites(!showOnlyFavorites);
              setVisibleCount(VISIBLE_STEP);
            }}
            className={cn(
              "w-full flex items-center justify-center gap-2 h-9 rounded-xl text-sm font-semibold transition-all border",
              showOnlyFavorites
                ? "bg-red-500/10 text-red-600 border-red-500/20"
                : "bg-black/[0.02] dark:bg-white/[0.03] text-foreground/70 border-black/[0.06] dark:border-white/[0.08]"
            )}
          >
            <Heart className={cn("h-3.5 w-3.5", showOnlyFavorites && "fill-current")} />
            {pt ? "Favoritos" : "Favorites"}
            <span className="ml-auto text-xs font-bold opacity-70">
              {favoriteRecipes.length}
            </span>
          </button>
        </div>
      )}

      {/* ── Filters ── */}
      <div className="px-4 pb-2 space-y-3 bg-background">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={pt ? "Buscar receitas..." : "Search recipes..."}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisibleCount(VISIBLE_STEP); }}
            className="pl-10 h-11 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border-black/[0.06] dark:border-white/[0.08]"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORY_GROUPS.map((grp, idx) => (
            <button key={idx} onClick={() => handleCategoryToggle(idx)}
              className={cn(
                "h-8 px-3 rounded-full text-[11px] font-bold shrink-0 transition-all border flex items-center gap-1",
                selectedCategoryIdx === idx
                  ? "bg-primary text-white border-transparent shadow-md"
                  : "bg-white dark:bg-white/5 text-muted-foreground border-black/[0.06] dark:border-white/[0.08]"
              )}>
              <span>{grp.emoji}</span><span>{grp.label}</span>
            </button>
          ))}
        </div>

        {/* Difficulty + clear */}
        <div className="flex gap-2 items-center">
          {DIFFICULTIES.map((d) => (
            <button key={d.value} onClick={() => handleDifficultyToggle(d.value)}
              className={cn(
                "h-7 px-3 rounded-full text-[11px] font-bold shrink-0 transition-all border",
                selectedDifficulty === d.value
                  ? `${d.bg} ${d.color} shadow-sm`
                  : "bg-white dark:bg-white/5 text-muted-foreground border-black/[0.06] dark:border-white/[0.08]"
              )}>
              {d.label}
            </button>
          ))}
          {hasFilters && (
            <button onClick={handleClear}
              className="h-7 px-3 rounded-full text-[11px] font-bold shrink-0 bg-black/5 dark:bg-white/10 text-muted-foreground border border-black/[0.06] dark:border-white/[0.08] transition-all ml-auto">
              {pt ? "Limpar" : "Clear"}
            </button>
          )}
        </div>
      </div>

      {/* ── List ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2 space-y-3">
        <p className="text-[11px] font-semibold text-muted-foreground px-1">
          {pt ? `${filtered.length} receitas` : `${filtered.length} recipes`}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ChefHat className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-bold text-muted-foreground">
              {pt ? "Nenhuma receita encontrada." : "No recipes found."}
            </p>
          </div>
        ) : (
          <>
            {displayed.map((recipe) => {
              const isFavorite = favoriteRecipes.includes(recipe.id);
              return (
                <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)}
                  className="rounded-[1.5rem] bg-white dark:bg-[#11302c]/40 border border-black/[0.04] dark:border-white/[0.05] overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer group relative">
                  {isFavorite && (
                    <div className="absolute top-2.5 right-2.5 z-10 text-red-500">
                      <Heart className="h-4 w-4 fill-current" />
                    </div>
                  )}
                  <div className="flex items-center gap-4 px-4 py-4">
                    <div className="h-14 w-14 flex items-center justify-center rounded-[1rem] bg-emerald-500/10 shrink-0 border border-emerald-500/10">
                      <span className="text-2xl">{recipe.emoji || "🍽️"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-black text-[#1a3d32] dark:text-emerald-50 truncate leading-tight">{recipe.name}</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        {recipe.category && (
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{recipe.category}</span>
                        )}
                        {recipe.difficulty && (
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full",
                            recipe.difficulty === "fácil" || recipe.difficulty === "easy" ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10" :
                            recipe.difficulty === "médio" || recipe.difficulty === "medium" ? "text-amber-700 bg-amber-50 dark:bg-amber-500/10" :
                            "text-red-700 bg-red-50 dark:bg-red-500/10"
                          )}>{recipe.difficulty}</span>
                        )}
                        {recipe.prepTime && (
                          <span className="text-[10px] text-muted-foreground font-medium">{recipe.prepTime} min</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length > visibleCount && (
              <button onClick={() => setVisibleCount((v) => v + VISIBLE_STEP)}
                className="w-full py-4 rounded-xl text-sm font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 transition-colors active:scale-95">
                {pt ? `Carregar mais (${filtered.length - visibleCount})` : `Load more (${filtered.length - visibleCount})`}
              </button>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedRecipe && (
          <RecipeSheet
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onFilterByCategory={(categoryIdx) => {
              setSelectedCategoryIdx(categoryIdx);
              setVisibleCount(VISIBLE_STEP);
              setSelectedRecipe(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
