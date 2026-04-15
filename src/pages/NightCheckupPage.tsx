import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKaza } from '@/contexts/KazaContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Moon, Minus, Trash2, UtensilsCrossed, Check, Camera, ArrowLeft, Apple, ChefHat, ThumbsUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckupAction {
    itemId: string;
    action: 'consumed' | 'cooked' | 'discarded';
    quantity: number;
}

type CheckupStep = 'question' | 'items' | 'done';
type DayAnswer = 'consumed' | 'discarded' | 'both' | null;

export default function NightCheckupPage() {
    const navigate = useNavigate();
    const { items, updateItem, removeItem, addItemHistory } = useKaza();
    const { language } = useLanguage();
    const [actions, setActions] = useState<CheckupAction[]>([]);
    const [customQuantities, setCustomQuantities] = useState<Record<string, string>>({});
    const [step, setStep] = useState<CheckupStep>('question');
    const [dayAnswer, setDayAnswer] = useState<DayAnswer>(null);

    const labels = {
        'pt-BR': {
            title: 'Check-up Noturno', subtitle: 'O que aconteceu com seus alimentos hoje?',
            takePhoto: 'Tirar foto da geladeira', noPerishable: 'Nenhum item perecível no momento',
            consume: 'Consumir', cook: 'Cozinhar', discard: 'Descartar',
            action: 'ação', actions: 'ações', selected: 'selecionadas',
            consumed: 'consumidos', cooked: 'cozinhados', discarded: 'descartados',
            complete: 'Concluir Check-up', done: 'Check-up concluído!', actionsRecorded: 'ações registradas.',
            questionTitle: 'Como foi seu dia?',
            questionSubtitle: 'Conte-nos o que aconteceu com seus alimentos hoje',
            optConsumed: 'Consumi alimentos',
            optConsumedDesc: 'Comi ou usei ingredientes da geladeira',
            optDiscarded: 'Descartei alimentos',
            optDiscardedDesc: 'Joguei fora itens vencidos ou estragados',
            optBoth: 'Consumi e descartei',
            optBothDesc: 'Usei alguns e descartei outros',
            optNothing: 'Nada aconteceu',
            optNothingDesc: 'Não mexi na geladeira hoje',
            next: 'Continuar',
            markItems: 'Marque os itens abaixo:',
            doneTitle: 'Tudo certo! 🌙',
            doneSubtitle: 'Seu check-up noturno foi registrado com sucesso.',
            doneConsumed: 'itens consumidos/cozinhados',
            doneDiscarded: 'itens descartados',
            doneSaved: 'Menos desperdício = mais economia!',
            goBack: 'Voltar ao início',
            nothingDone: 'Nenhuma alteração registrada.',
        },
        en: {
            title: 'Night Check-up', subtitle: 'What happened with your food today?',
            takePhoto: 'Take a photo of the fridge', noPerishable: 'No perishable items at the moment',
            consume: 'Consume', cook: 'Cook', discard: 'Discard',
            action: 'action', actions: 'actions', selected: 'selected',
            consumed: 'consumed', cooked: 'cooked', discarded: 'discarded',
            complete: 'Complete Check-up', done: 'Check-up completed!', actionsRecorded: 'actions recorded.',
            questionTitle: 'How was your day?',
            questionSubtitle: 'Tell us what happened with your food today',
            optConsumed: 'I consumed food',
            optConsumedDesc: 'I ate or used ingredients from the fridge',
            optDiscarded: 'I discarded food',
            optDiscardedDesc: 'I threw away expired or spoiled items',
            optBoth: 'Consumed and discarded',
            optBothDesc: 'I used some and discarded others',
            optNothing: 'Nothing happened',
            optNothingDesc: "I didn't touch the fridge today",
            next: 'Continue',
            markItems: 'Mark the items below:',
            doneTitle: 'All done! 🌙',
            doneSubtitle: 'Your night check-up has been recorded successfully.',
            doneConsumed: 'items consumed/cooked',
            doneDiscarded: 'items discarded',
            doneSaved: 'Less waste = more savings!',
            goBack: 'Go back home',
            nothingDone: 'No changes recorded.',
        },
        es: {
            title: 'Chequeo Nocturno', subtitle: '¿Qué pasó con tus alimentos hoy?',
            takePhoto: 'Tomar foto de la nevera', noPerishable: 'No hay artículos perecederos al momento',
            consume: 'Consumir', cook: 'Cocinar', discard: 'Descartar',
            action: 'acción', actions: 'acciones', selected: 'seleccionadas',
            consumed: 'consumidos', cooked: 'cocinados', discarded: 'descartados',
            complete: 'Completar Chequeo', done: '¡Chequeo completado!', actionsRecorded: 'acciones registradas.',
            questionTitle: '¿Cómo fue tu día?',
            questionSubtitle: 'Cuéntanos qué pasó con tus alimentos hoy',
            optConsumed: 'Consumí alimentos',
            optConsumedDesc: 'Comí o usé ingredientes de la nevera',
            optDiscarded: 'Descarté alimentos',
            optDiscardedDesc: 'Tiré artículos vencidos o dañados',
            optBoth: 'Consumí y descarté',
            optBothDesc: 'Usé algunos y descarté otros',
            optNothing: 'Nada pasó',
            optNothingDesc: 'No toqué la nevera hoy',
            next: 'Continuar',
            markItems: 'Marca los artículos abajo:',
            doneTitle: '¡Todo listo! 🌙',
            doneSubtitle: 'Tu chequeo nocturno fue registrado con éxito.',
            doneConsumed: 'artículos consumidos/cocinados',
            doneDiscarded: 'artículos descartados',
            doneSaved: '¡Menos desperdicio = más ahorro!',
            goBack: 'Volver al inicio',
            nothingDone: 'Ningún cambio registrado.',
        },
    };

    const l = labels[language];

    const perishableItems = items.filter(item =>
        ['fruit', 'vegetable', 'dairy', 'meat', 'cooked'].includes(item.category)
    );

    const addAction = (itemId: string, action: 'consumed' | 'cooked' | 'discarded') => {
        const existing = actions.find(a => a.itemId === itemId);
        const qty = parseFloat(customQuantities[itemId] || '1') || 1;
        if (existing) {
            if (existing.action === action) setActions(actions.filter(a => a.itemId !== itemId));
            else setActions(actions.map(a => a.itemId === itemId ? { ...a, action, quantity: qty } : a));
        } else {
            setActions([...actions, { itemId, action, quantity: qty }]);
        }
    };

    const getItemAction = (itemId: string) => actions.find(a => a.itemId === itemId)?.action;

    const handleComplete = () => {
        actions.forEach(({ itemId, action, quantity }) => {
            const item = items.find(i => i.id === itemId);
            if (!item) return;
            if (action === 'discarded') { removeItem(itemId); addItemHistory?.(itemId, item.name, 'discarded', quantity); }
            else {
                const newQuantity = item.quantity - quantity;
                if (newQuantity <= 0) removeItem(itemId); else updateItem(itemId, { quantity: newQuantity });
                addItemHistory?.(itemId, item.name, action, quantity);
            }
        });
        setStep('done');
    };

    const handleNothingToday = () => {
        toast.success(l.nothingDone);
        navigate(-1);
    };

    const handleSelectAnswer = (answer: DayAnswer) => {
        setDayAnswer(answer);
    };

    const handleContinueToItems = () => {
        if (!dayAnswer) return;
        setStep('items');
    };

    const consumedCount = actions.filter(a => a.action === 'consumed' || a.action === 'cooked').length;
    const discardedCount = actions.filter(a => a.action === 'discarded').length;

    const showConsumeBtn = dayAnswer === 'consumed' || dayAnswer === 'both';
    const showDiscardBtn = dayAnswer === 'discarded' || dayAnswer === 'both';
    const showCookBtn = dayAnswer === 'consumed' || dayAnswer === 'both';

    return (
        <PageTransition direction="up" className="pb-8 min-h-[100dvh] bg-[#fafafa] dark:bg-[#0a0a0a] text-foreground">
            <header className="sticky top-0 z-50 flex items-center gap-3 border-b border-black/[0.04] dark:border-white/[0.06] bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 px-4 py-4 backdrop-blur-2xl">
                <button onClick={() => step === 'items' ? setStep('question') : navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-xl active:scale-[0.97] transition-all text-foreground">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="flex items-center gap-2 text-lg font-bold">
                    <Moon className="h-5 w-5 text-primary" />{l.title}
                </h1>
            </header>

            <AnimatePresence mode="wait">
                {step === 'question' && (
                    <motion.main key="question" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }} className="space-y-5 px-6 py-6 pb-24 max-w-lg mx-auto">
                        <div className="text-center space-y-2 py-4">
                            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <Moon className="h-8 w-8 text-primary" />
                            </motion.div>
                            <h2 className="text-xl font-bold">{l.questionTitle}</h2>
                            <p className="text-sm text-muted-foreground">{l.questionSubtitle}</p>
                        </div>

                        <div className="space-y-3">
                            {[
                                { key: 'consumed' as const, icon: Apple, label: l.optConsumed, desc: l.optConsumedDesc, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20', activeBg: 'bg-emerald-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30' },
                                { key: 'discarded' as const, icon: Trash2, label: l.optDiscarded, desc: l.optDiscardedDesc, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20', activeBg: 'bg-red-500/20 border-red-500/50 ring-2 ring-red-500/30' },
                                { key: 'both' as const, icon: ChefHat, label: l.optBoth, desc: l.optBothDesc, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20', activeBg: 'bg-amber-500/20 border-amber-500/50 ring-2 ring-amber-500/30' },
                            ].map((opt, i) => (
                                <motion.button key={opt.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}
                                    onClick={() => handleSelectAnswer(opt.key)}
                                    className={cn('w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98]', dayAnswer === opt.key ? opt.activeBg : opt.bg)}>
                                    <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', dayAnswer === opt.key ? 'bg-white/80 dark:bg-white/20' : 'bg-white/60 dark:bg-white/10')}>
                                        <opt.icon className={cn('h-5 w-5', opt.color)} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-foreground">{opt.label}</p>
                                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            onClick={handleNothingToday}
                            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-sm text-muted-foreground hover:bg-muted/50 transition-all active:scale-[0.98]">
                            <ThumbsUp className="h-4 w-4" />
                            {l.optNothing} — {l.optNothingDesc}
                        </motion.button>

                        {dayAnswer && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                                <Button onClick={handleContinueToItems} className="w-full h-12 gap-2 rounded-xl font-bold text-base">
                                    {l.next} <ArrowLeft className="h-4 w-4 rotate-180" />
                                </Button>
                            </motion.div>
                        )}
                    </motion.main>
                )}

                {step === 'items' && (
                    <motion.main key="items" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4 px-6 py-5 pb-24 max-w-lg mx-auto">
                        <p className="text-sm text-muted-foreground">{l.markItems}</p>

                        <Button variant="outline" className="w-full gap-2 rounded-xl h-12">
                            <Camera className="h-4 w-4" />{l.takePhoto}
                        </Button>

                        <div className="space-y-3">
                            {perishableItems.length === 0 ? (
                                <p className="py-8 text-center text-muted-foreground">{l.noPerishable}</p>
                            ) : (
                                perishableItems.map((item, i) => {
                                    const currentAction = getItemAction(item.id);
                                    return (
                                        <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                                            className={cn('rounded-2xl border p-4 transition-all', currentAction ? 'border-primary/30 bg-primary/5 shadow-sm' : 'border-gray-200 dark:border-white/10 bg-white dark:bg-card')}>
                                            <div className="mb-3 flex items-center justify-between">
                                                <div><h4 className="font-semibold text-foreground">{item.name}</h4><p className="text-sm text-muted-foreground">{item.quantity} {item.unit}</p></div>
                                                <Input type="number" min="0.5" step="0.5" max={item.quantity} value={customQuantities[item.id] || '1'} onChange={(e) => setCustomQuantities({ ...customQuantities, [item.id]: e.target.value })} className="h-9 w-20 rounded-xl text-center text-sm" />
                                            </div>
                                            <div className="flex gap-2">
                                                {showConsumeBtn && (
                                                    <button onClick={() => addAction(item.id, 'consumed')} className={cn('flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium transition-all active:scale-95', currentAction === 'consumed' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}><Minus className="h-4 w-4" />{l.consume}</button>
                                                )}
                                                {showCookBtn && (
                                                    <button onClick={() => addAction(item.id, 'cooked')} className={cn('flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium transition-all active:scale-95', currentAction === 'cooked' ? 'bg-amber-500 text-white shadow-sm' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}><UtensilsCrossed className="h-4 w-4" />{l.cook}</button>
                                                )}
                                                {showDiscardBtn && (
                                                    <button onClick={() => addAction(item.id, 'discarded')} className={cn('flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium transition-all active:scale-95', currentAction === 'discarded' ? 'bg-red-500 text-white shadow-sm' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}><Trash2 className="h-4 w-4" />{l.discard}</button>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        {actions.length > 0 && (
                            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border-t border-black/[0.04] dark:border-white/[0.06]">
                                <div className="max-w-lg mx-auto space-y-3">
                                    <div className="rounded-xl bg-muted/50 p-3">
                                        <p className="text-sm font-medium text-foreground">{actions.length} {actions.length === 1 ? l.action : l.actions} {l.selected}</p>
                                        <p className="text-xs text-muted-foreground">{actions.filter(a => a.action === 'consumed').length} {l.consumed}, {actions.filter(a => a.action === 'cooked').length} {l.cooked}, {actions.filter(a => a.action === 'discarded').length} {l.discarded}</p>
                                    </div>
                                    <Button onClick={handleComplete} className="w-full h-12 gap-2 rounded-xl font-bold"><Check className="h-5 w-5" />{l.complete}</Button>
                                </div>
                            </div>
                        )}
                    </motion.main>
                )}

                {step === 'done' && (
                    <motion.main key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, type: 'spring' }} className="flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto text-center space-y-6">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                            className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                            <Sparkles className="h-10 w-10 text-emerald-500" />
                        </motion.div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">{l.doneTitle}</h2>
                            <p className="text-muted-foreground">{l.doneSubtitle}</p>
                        </div>
                        <div className="flex gap-4 py-2">
                            {consumedCount > 0 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-1 rounded-2xl bg-emerald-500/10 px-5 py-3">
                                    <span className="text-2xl font-bold text-emerald-600">{consumedCount}</span>
                                    <span className="text-xs text-muted-foreground">{l.doneConsumed}</span>
                                </motion.div>
                            )}
                            {discardedCount > 0 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-center gap-1 rounded-2xl bg-red-500/10 px-5 py-3">
                                    <span className="text-2xl font-bold text-red-600">{discardedCount}</span>
                                    <span className="text-xs text-muted-foreground">{l.doneDiscarded}</span>
                                </motion.div>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground italic">{l.doneSaved}</p>
                        <Button onClick={() => navigate(-1)} variant="outline" className="w-full h-12 gap-2 rounded-xl font-medium mt-4">
                            <ArrowLeft className="h-4 w-4" />{l.goBack}
                        </Button>
                    </motion.main>
                )}
            </AnimatePresence>
        </PageTransition>
    );
}
