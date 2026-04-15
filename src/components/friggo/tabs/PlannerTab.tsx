import { useKaza } from "@/contexts/FriggoContext";
import { 
  CalendarDays, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ChefHat,
  UtensilsCrossed,
  Coffee,
  Moon,
  Cookie
} from "lucide-react";
import { format, addDays, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { allRecipes } from "@/data/recipeDatabase";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";

const MEAL_CONFIG: Record<string, { label: string, icon: any, color: string }> = {
  breakfast: { label: 'Café da Manhã', icon: Coffee, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
  lunch: { label: 'Almoço', icon: UtensilsCrossed, color: 'text-primary bg-primary/10 border-primary/20' },
  dinner: { label: 'Jantar', icon: Moon, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
  snack: { label: 'Lanche', icon: Cookie, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' }
};

export function PlannerTab() {
  const { mealPlan, removeFromMealPlan, addToMealPlan } = useKaza();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayMeals = mealPlan.filter(p => p.planned_date === dateStr);
    
    return {
      date,
      dateStr,
      label: format(date, 'eee', { locale: ptBR }),
      dayNum: format(date, 'dd'),
      meals: dayMeals
    };
  });
  
  const filteredRecipes = allRecipes.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10);

  const handleAddMeal = (recipeId: string, recipeName: string, mealType: string) => {
    if (!selectedDate) return;
    
    addToMealPlan({
      recipe_id: recipeId,
      recipe_name: recipeName,
      planned_date: selectedDate,
      meal_type: mealType as any
    });
    
    setIsDialogOpen(false);
    setSearchQuery("");
    toast.success("Refeição adicionada ao plano!");
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Plano Semanal
            <div className="rounded-xl bg-primary/10 p-1.5">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Organize suas refeições para os próximos dias.</p>
      </div>

      <div className="space-y-6">
        {weekDays.map((day) => (
          <div key={day.dateStr} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex flex-col items-center justify-center h-12 w-12 rounded-2xl border transition-all",
                day.dateStr === format(new Date(), 'yyyy-MM-dd')
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white dark:bg-white/5 border-black/[0.04] dark:border-white/[0.06] text-muted-foreground"
              )}>
                <span className="text-[10px] font-black uppercase leading-none">{day.label}</span>
                <span className="text-lg font-bold leading-tight">{day.dayNum}</span>
              </div>
              <div className="flex-1 h-[1px] bg-black/[0.04] dark:bg-white/[0.06]" />
              
              <button
                onClick={() => {
                  setSelectedDate(day.dateStr);
                  setIsDialogOpen(true);
                }}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary active:scale-90 transition-all"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {day.meals.length === 0 ? (
              <div className="bg-white/30 dark:bg-white/[0.02] border border-dashed border-black/[0.1] dark:border-white/[0.1] rounded-2xl p-4 text-center">
                <p className="text-xs text-muted-foreground italic">Nenhuma refeição planejada</p>
              </div>
            ) : (
              <div className="space-y-2">
                {day.meals.map((meal) => {
                  const config = MEAL_CONFIG[meal.meal_type] || MEAL_CONFIG.lunch;
                  const Icon = config.icon;
                  const recipeData = allRecipes.find(r => r.id === meal.recipe_id);

                  return (
                    <div 
                      key={meal.id}
                      className="group flex items-center gap-3 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] p-3 rounded-2xl shadow-sm animate-scale-in"
                    >
                      <div className={cn("h-10 w-10 flex items-center justify-center rounded-xl border", config.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0" onClick={() => {
                        if (recipeData) navigate(`/recipe/${meal.recipe_id}`, { state: { recipe: recipeData } });
                      }}>
                        <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-0.5">{config.label}</p>
                        <p className="text-sm font-bold text-foreground truncate">{meal.recipe_name}</p>
                      </div>
                      <button 
                        onClick={() => removeFromMealPlan(meal.id)}
                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {mealPlan.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white/50 dark:bg-white/5 rounded-[2.5rem] border border-black/[0.04] dark:border-white/[0.06]">
          <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
            <ChefHat className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold">Seu guia semanal</h3>
          <p className="text-sm text-muted-foreground max-w-[200px] mt-2">
            Adicione receitas ao seu plano para nunca esquecer o que cozinhar.
          </p>
          <Button 
            className="mt-6 rounded-2xl px-6"
            onClick={() => {
              // Switch to recipes tab
              document.querySelector<HTMLButtonElement>('[data-tab="recipes"]')?.click();
            }}
          >
            Explorar Receitas
          </Button>
        </div>
      )}
      {/* Add Meal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md rounded-[2rem] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border-white/60 dark:border-white/10 shadow-2xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              Planejar refeição
              <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center">
                <Plus className="h-3 w-3 text-primary" />
              </div>
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">Escolha uma receita para {selectedDate && format(new Date(selectedDate + 'T00:00:00'), 'eeee', { locale: ptBR })}.</p>
          </DialogHeader>

          <div className="px-6 py-4">
            <div className="relative mb-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar receitas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border-transparent focus:bg-white dark:focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar pb-6">
              {filteredRecipes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">Nenhuma receita encontrada.</p>
                </div>
              ) : (
                filteredRecipes.map((recipe) => (
                  <div key={recipe.id} className="p-1 border border-black/[0.04] dark:border-white/[0.06] rounded-[1.75rem] bg-white/50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-3 px-3 py-2">
                       <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 overflow-hidden shrink-0">
                         {recipe.image ? <img src={recipe.image} className="h-full w-full object-cover" /> : <ChefHat className="h-5 w-5 text-primary" />}
                       </div>
                       <div className="flex-1 min-w-0">
                         <p className="text-sm font-bold truncate">{recipe.name}</p>
                         <p className="text-[10px] text-muted-foreground truncate">{recipe.category}</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 p-1.5 pt-0">
                       <button onClick={() => handleAddMeal(recipe.id, recipe.name, 'breakfast')} className="h-9 rounded-xl bg-orange-500/10 text-orange-600 text-[10px] font-black uppercase tracking-tight hover:bg-orange-500 hover:text-white transition-all">Café</button>
                       <button onClick={() => handleAddMeal(recipe.id, recipe.name, 'lunch')} className="h-9 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-tight hover:bg-primary hover:text-white transition-all">Almoço</button>
                       <button onClick={() => handleAddMeal(recipe.id, recipe.name, 'dinner')} className="h-9 rounded-xl bg-indigo-500/10 text-indigo-600 text-[10px] font-black uppercase tracking-tight hover:bg-indigo-500 hover:text-white transition-all">Jantar</button>
                       <button onClick={() => handleAddMeal(recipe.id, recipe.name, 'snack')} className="h-9 rounded-xl bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-tight hover:bg-amber-500 hover:text-white transition-all">Lanche</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
