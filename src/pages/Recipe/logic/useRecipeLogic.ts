import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Recipe } from '@/types/kaza';
import { useKaza } from '@/contexts/KazaContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { format, addDays, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

const NOTIF_ICON = '/icon.png';

function useTimer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [initialSeconds, setInitialSeconds] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const beep = useCallback(() => {
        try {
            const ctx = audioCtxRef.current || new AudioContext();
            audioCtxRef.current = ctx;
            const playTone = (freq: number, start: number, dur: number) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.5, ctx.currentTime + start);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + dur);
                osc.start(ctx.currentTime + start);
                osc.stop(ctx.currentTime + start + dur);
            };
            for (let i = 0; i < 5; i++) {
                playTone(880, i * 0.3, 0.2);
            }
        } catch { /* ignore */ }
    }, []);

    const start = useCallback((mins: number) => {
        const totalSec = Math.max(1, Math.round(mins * 60));
        setInitialSeconds(totalSec);
        setSeconds(totalSec);
        setIsRunning(true);
    }, []);

    const stop = useCallback(() => {
        setIsRunning(false);
        setSeconds(0);
        setInitialSeconds(0);
    }, []);

    const toggle = useCallback(() => setIsRunning(p => !p), []);

    useEffect(() => {
        if (isRunning && seconds > 0) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isRunning, seconds]);

    useEffect(() => {
        if (seconds === 0 && initialSeconds > 0) {
            beep();
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('⏰ Timer finalizado!', { body: 'O tempo de cozimento acabou!', icon: NOTIF_ICON });
            }
            toast.success('⏰ Timer finalizado!', { duration: 10000 });
        }
    }, [seconds, initialSeconds, beep]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const progress = initialSeconds > 0 ? ((initialSeconds - seconds) / initialSeconds) * 100 : 0;

    return { seconds, isRunning, start, stop, toggle, formatTime: () => formatTime(seconds), progress, initialSeconds };
}

export function useRecipeLogic() {
    const location = useLocation();
    const navigate = useNavigate();
    const recipe = location.state?.recipe as Recipe | undefined;

    const [currentStep, setCurrentStep] = useState(0);
    const [cookingMode, setCookingMode] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [timerMinutes, setTimerMinutes] = useState('');
    const [showTimerSetup, setShowTimerSetup] = useState(false);
    const timer = useTimer();
    const { language } = useLanguage();
    const { 
      items, 
      addToShoppingList, 
      favoriteRecipes, 
      toggleFavoriteRecipe,
      addToMealPlan 
    } = useKaza();

    const [servings, setServings] = useState(recipe?.servings || 2);
    const [plannerOpen, setPlannerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');

    const isFavorite = recipe ? favoriteRecipes.includes(recipe.id) : false;

    const scaleQuantity = useCallback((ingredient: string) => {
      if (!recipe) return ingredient;
      const originalServings = recipe.servings || 2;
      const ratio = servings / originalServings;
      
      return ingredient.replace(/(\d+([,.]\d+)?|\d+\/\d+)/g, (match) => {
        let value: number;
        if (match.includes('/')) {
          const [num, den] = match.split('/').map(Number);
          value = num / den;
        } else {
          value = parseFloat(match.replace(',', '.'));
        }
        const scaledValue = value * ratio;
        if (Number.isInteger(scaledValue)) return scaledValue.toString();
        return scaledValue.toFixed(1).replace('.', ',');
      });
    }, [recipe, servings]);

    const missingIngredients = recipe 
        ? recipe.missingIngredients && recipe.missingIngredients.length > 0
            ? recipe.missingIngredients
            : recipe.ingredients.filter(ingredient => {
                const ingredientLower = ingredient.toLowerCase();
                return !items.some(item => ingredientLower.includes(item.name.toLowerCase()));
            })
        : [];

    const handleAddMissingToShoppingList = async () => {
        const labels = {
            'pt-BR': { added: 'Itens adicionados à lista de compras!', noMissing: 'Você já tem todos os ingredientes!' },
            'en': { added: 'Items added to shopping list!', noMissing: 'You already have all ingredients!' },
            'es': { added: '¡Artículos añadidos a la lista de compras!', noMissing: '¡Ya tienes todos os ingredientes!' },
        };
        const l = labels[language as keyof typeof labels] || labels['en'];
        if (missingIngredients.length === 0) {
            toast.info(l.noMissing);
            return;
        }
        for (const ingredient of missingIngredients) {
            await addToShoppingList({ name: ingredient, quantity: 1, unit: 'un', category: 'pantry', store: 'market' });
        }
        toast.success(l.added);
    };

    const toggleStep = (index: number) => {
        setCompletedSteps(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const nextStep = () => {
        if (recipe && currentStep < (recipe.instructions ?? []).length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const progress = recipe && (recipe.instructions ?? []).length > 0 
        ? (completedSteps.length / recipe.instructions.length) * 100 
        : 0;

    return {
        recipe,
        currentStep,
        cookingMode,
        setCookingMode,
        completedSteps,
        toggleStep,
        nextStep,
        prevStep,
        progress,
        timer,
        timerMinutes,
        setTimerMinutes,
        showTimerSetup,
        setShowTimerSetup,
        servings,
        setServings,
        plannerOpen,
        setPlannerOpen,
        selectedDate,
        setSelectedDate,
        selectedMeal,
        setSelectedMeal,
        isFavorite,
        toggleFavoriteRecipe,
        scaleQuantity,
        missingIngredients,
        handleAddMissingToShoppingList,
        addToMealPlan,
        language,
        navigate
    };
}
