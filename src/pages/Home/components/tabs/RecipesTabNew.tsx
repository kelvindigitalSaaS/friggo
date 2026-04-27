import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { useRecipesAPI } from "@/hooks/useRecipesAPI";
import { Loader2, Search, ChefHat, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

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

export function RecipesTabNew() {
  const { recipes, loading, error, hasNext, loadMore, search, total } = useRecipesAPI();
  const { language } = useLanguage();

  const [query, setQuery] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

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

  const handleQueryChange = (v: string) => {
    setQuery(v);
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(query, selectedCategoryIndex, selectedDifficulty);
  };

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
        <form onSubmit={handleQuerySubmit}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={pt ? "Buscar receitas..." : "Search recipes..."}
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
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
              {pt
                ? `${recipes.length} de ${total} receitas`
                : `${recipes.length} of ${total} recipes`}
            </p>

            {recipes.map((recipe) => (
              <div
                key={recipe.id}
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
                      <span className="text-[10px] text-muted-foreground font-medium">
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
    </div>
  );
}
