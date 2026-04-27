import { useKaza } from '@/contexts/KazaContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCard } from '@/pages/Home/components/AlertCard';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, ArrowLeft, AlertTriangle, Info, Zap, ShoppingCart } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const labels = {
    'pt-BR': {
        title: 'Notificações',
        clearAll: 'Limpar tudo',
        allGood: 'Tudo certo por aqui!',
        noNotifs: 'Você não tem notificações pendentes.',
        urgent: 'Urgente',
        attention: 'Atenção',
        info: 'Informativo',
    },
    en: {
        title: 'Notifications',
        clearAll: 'Clear all',
        allGood: 'All clear!',
        noNotifs: 'You have no pending notifications.',
        urgent: 'Urgent',
        attention: 'Attention',
        info: 'Informational',
    },
    es: {
        title: 'Notificaciones',
        clearAll: 'Limpiar todo',
        allGood: '¡Todo bien!',
        noNotifs: 'No tienes notificaciones pendientes.',
        urgent: 'Urgente',
        attention: 'Atención',
        info: 'Informativo',
    },
};

export default function NotificationsPage() {
    const navigate = useNavigate();
    const { alerts, dismissAlert, items, addToShoppingList, shoppingList } = useKaza();
    const { language } = useLanguage();
    const l = labels[language];

    const highPriorityAlerts = alerts.filter(a => a.priority === 'high');
    const mediumPriorityAlerts = alerts.filter(a => a.priority === 'medium');
    const lowPriorityAlerts = alerts.filter(a => a.priority === 'low');

    const criticalItems = items.filter((item) => {
        if (!item.expirationDate) return false;
        const days = Math.ceil((new Date(item.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return days <= 1 && days >= 0;
    });

    const handleAddCriticalToList = async () => {
        const missing = criticalItems.filter(
            (ci) => !shoppingList.some((s) => s.name.toLowerCase() === ci.name.toLowerCase() && !s.isCompleted)
        );
        if (missing.length === 0) {
            toast.info(language === 'pt-BR' ? 'Itens já estão na lista!' : 'Items already on list!');
            return;
        }
        for (const item of missing) {
            await addToShoppingList({ name: item.name, quantity: item.minStock || 1, unit: item.unit, category: item.category, store: 'market' });
        }
        toast.success(language === 'pt-BR' ? `${missing.length} itens adicionados à lista de compras!` : `${missing.length} items added to shopping list!`);
    };

    const dismissAll = () => alerts.forEach(alert => dismissAlert(alert.id));

    return (
        <PageTransition direction="left" className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#091f1c]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#fafafa]/80 dark:bg-[#091f1c]/80 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06]">
                <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-white/10 text-foreground transition-all active:scale-90"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                        <h1 className="text-xl font-bold text-foreground">{l.title}</h1>
                    </div>
                    {alerts.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={dismissAll}
                            className="gap-1.5 text-sm text-primary font-medium"
                        >
                            <CheckCheck className="h-4 w-4" />
                            {l.clearAll}
                        </Button>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-5 pb-12 space-y-6">
                {/* Críticos: itens vencendo hoje */}
                {criticalItems.length > 0 && (
                    <section className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/5 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20 animate-pulse">
                                    <Zap className="h-4 w-4 text-red-500" />
                                </div>
                                <h2 className="text-sm font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                                    {language === 'pt-BR' ? 'Crítico — Vencendo Hoje' : language === 'es' ? 'Crítico — Vence Hoy' : 'Critical — Expiring Today'}
                                </h2>
                            </div>
                            <button onClick={handleAddCriticalToList}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 text-white text-[11px] font-black transition-all active:scale-90">
                                <ShoppingCart className="h-3.5 w-3.5" />
                                {language === 'pt-BR' ? 'Comprar' : language === 'es' ? 'Comprar' : 'Buy'}
                            </button>
                        </div>
                        <div className="space-y-2">
                            {criticalItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-3 py-2.5">
                                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                                        <p className="text-[10px] text-red-500 font-semibold">
                                            {language === 'pt-BR' ? 'Vence hoje!' : language === 'es' ? '¡Vence hoy!' : 'Expires today!'}
                                        </p>
                                    </div>
                                    <span className="text-xs text-muted-foreground shrink-0">{item.quantity} {item.unit}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {alerts.length === 0 && criticalItems.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-green-950/30">
                            <Bell className="h-9 w-9 text-green-500" />
                        </div>
                        <p className="text-xl font-bold text-foreground">{l.allGood}</p>
                        <p className="mt-2 text-sm text-muted-foreground max-w-[240px]">{l.noNotifs}</p>
                    </div>
                ) : (
                    <>
                        {highPriorityAlerts.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
                                        <Zap className="h-3.5 w-3.5 text-red-500" />
                                    </div>
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-red-500">{l.urgent}</h2>
                                </div>
                                <div className="space-y-2">
                                    {highPriorityAlerts.map((alert) => (
                                        <AlertCard key={alert.id} alert={alert} onDismiss={() => dismissAlert(alert.id)} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {mediumPriorityAlerts.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/40">
                                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                                    </div>
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-amber-500">{l.attention}</h2>
                                </div>
                                <div className="space-y-2">
                                    {mediumPriorityAlerts.map((alert) => (
                                        <AlertCard key={alert.id} alert={alert} onDismiss={() => dismissAlert(alert.id)} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {lowPriorityAlerts.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/40">
                                        <Info className="h-3.5 w-3.5 text-blue-500" />
                                    </div>
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400">{l.info}</h2>
                                </div>
                                <div className="space-y-2">
                                    {lowPriorityAlerts.map((alert) => (
                                        <AlertCard key={alert.id} alert={alert} onDismiss={() => dismissAlert(alert.id)} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </PageTransition>
    );
}
