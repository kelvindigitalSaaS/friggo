import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRecipesAPI } from "@/hooks/useRecipesAPI";
import { Loader2, Search, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RecipesTabNew() {
  const { search, recipes, categories, loading, error, hasNext, loadMore, reset, total } =
    useRecipesAPI();
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>();
  const [hasSearched, setHasSearched] = useState(false);

  const difficulties = ["fácil", "médio", "difícil"];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    if (!query.trim() && !selectedCategory && !selectedDifficulty) {
      // Se nenhum filtro, não fazer nada
      return;
    }

    await search(query, selectedCategory, selectedDifficulty);
  };

  const handleReset = () => {
    setQuery("");
    setSelectedCategory(undefined);
    setSelectedDifficulty(undefined);
    setHasSearched(false);
    reset();
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {language === "pt-BR" ? "🍳 Receitas" : "🍳 Recipes"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {language === "pt-BR"
            ? "Pesquise por nome, categoria ou dificuldade"
            : "Search by name, category or difficulty"}
        </p>
      </div>

      {/* Formulário de busca */}
      <form onSubmit={handleSearch} className="space-y-3">
        {/* Campo de busca por nome */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={language === "pt-BR" ? "Ex: Arroz, Frango..." : "Ex: Rice, Chicken..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {language === "pt-BR" ? "Buscar" : "Search"}
          </Button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-2 gap-2">
          {/* Categoria */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  language === "pt-BR"
                    ? "Categoria"
                    : "Category"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === "pt-BR" ? "Todas" : "All"}
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.category} value={cat.category}>
                  {cat.category} ({cat.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Dificuldade */}
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  language === "pt-BR"
                    ? "Dificuldade"
                    : "Difficulty"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === "pt-BR" ? "Todas" : "All"}
              </SelectItem>
              {difficulties.map((diff) => (
                <SelectItem key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botão resetar */}
        {hasSearched && (recipes.length > 0 || query || selectedCategory || selectedDifficulty) && (
          <Button type="button" variant="outline" onClick={handleReset} className="w-full">
            {language === "pt-BR" ? "Limpar filtros" : "Clear filters"}
          </Button>
        )}
      </form>

      {/* Mensagem de erro */}
      {error && (
        <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Resultados */}
      {hasSearched ? (
        <>
          {loading && recipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                {language === "pt-BR" ? "Buscando receitas..." : "Searching recipes..."}
              </p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {language === "pt-BR"
                  ? "Nenhuma receita encontrada com esses filtros"
                  : "No recipes found with these filters"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {language === "pt-BR"
                  ? `Exibindo ${recipes.length} de ${total} receitas`
                  : `Showing ${recipes.length} of ${total} recipes`}
              </p>

              {/* Lista de receitas */}
              <div className="space-y-2">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{recipe.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{recipe.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {recipe.category}
                          </span>
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                            {recipe.difficulty}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {recipe.prep_time + recipe.cook_time} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão carregar mais */}
              {hasNext && (
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      {language === "pt-BR" ? "Carregando..." : "Loading..."}
                    </>
                  ) : (
                    language === "pt-BR" ? "Carregar mais 50" : "Load more 50"
                  )}
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {language === "pt-BR"
              ? "Use a busca acima para encontrar receitas"
              : "Use the search above to find recipes"}
          </p>
        </div>
      )}
    </div>
  );
}
