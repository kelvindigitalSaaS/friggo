import { useNavigate } from 'react-router-dom';
import { useKaza } from '@/contexts/KazaContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    ArrowLeft,
    TrendingDown,
    TrendingUp,
    Utensils,
    Trash2,
    Info,
    Thermometer,
    Leaf,
    Trophy,
    Flame,
    Droplets,
    Star,
    Award,
    Share2,
    CheckCircle2,
    Calculator
} from 'lucide-react';
import { useAchievements } from '@/contexts/AchievementsContext';
import { PageTransition } from '@/components/PageTransition';
import { cn } from '@/lib/utils';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { ptBR, es, enUS } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

/* ── Ring chart SVG component ── */
function ProgressRing({ percent, size = 120, stroke = 10, color = '#22c55e', bgColor = '#e5e7eb' }: { percent: number; size?: number; stroke?: number; color?: string; bgColor?: string }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (Math.min(percent, 100) / 100) * circ;
    return (
        <svg width={size} height={size} className="rotate-[-90deg]">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bgColor} strokeWidth={stroke} opacity={0.25} />
            <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
                initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                strokeDasharray={circ} />
        </svg>
    );
}

/* ── Animated number counter ── */
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
    return (
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {prefix}{value.toFixed(2).replace('.', ',')}{suffix}
        </motion.span>
    );
}

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export default function MonthlyReportPage() {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const { items, itemHistory } = useKaza();
    const { achievements } = useAchievements();

    const dateLocale = language === 'pt-BR' ? ptBR : language === 'es' ? es : enUS;

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const monthlyHistory = itemHistory.filter((entry) => isWithinInterval(new Date(entry.timestamp), { start: monthStart, end: monthEnd }));

    const totalItems = items?.length ?? 0;

    const consumed = monthlyHistory.filter((h) => h.action === 'consumed');
    const cooked = monthlyHistory.filter((h) => h.action === 'cooked');
    const discarded = monthlyHistory.filter((h) => h.action === 'discarded');
    const defrosted = monthlyHistory.filter((h) => h.action === 'defrosted');

    const totalConsumed = consumed.reduce((sum, h) => sum + h.quantity, 0) + cooked.reduce((sum, h) => sum + h.quantity, 0);
    const totalDiscarded = discarded.reduce((sum, h) => sum + h.quantity, 0);
    const totalDefrosted = defrosted.reduce((sum, h) => sum + h.quantity, 0);
    const totalActions = totalConsumed + totalDiscarded;
    const efficiencyPercent = totalActions > 0 ? Math.round((totalConsumed / totalActions) * 100) : 100;

    // Honest logic: R$ 8,00 per item consumed (avoided waste)
    const SAVINGS_PER_ITEM = 8;
    const totalSavings = totalConsumed * SAVINGS_PER_ITEM;
    const waterSaved = Math.round(totalConsumed * 140); // ~140L per food item
    const co2Saved = (totalConsumed * 0.9).toFixed(1); // ~0.9kg CO2 per item

    const consumedByItem = [...consumed, ...cooked].reduce((acc, h) => {
        acc[h.itemName] = (acc[h.itemName] || 0) + h.quantity;
        return acc;
    }, {} as Record<string, number>);
    const topItemsRaw = Object.entries(consumedByItem)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, quantity]) => ({ name, quantity }));
    const topMax = topItemsRaw[0]?.quantity || 1;

    const ringColor = efficiencyPercent >= 80 ? '#22c55e' : efficiencyPercent >= 50 ? '#f59e0b' : '#ef4444';
    const monthName = format(now, 'MMMM yyyy', { locale: dateLocale });

    const handleShare = async () => {
        const shareText = language === 'pt-BR' 
            ? `Economizei R$ ${totalSavings.toFixed(2).replace('.', ',')} este mês com o Kaza! Minha eficiência foi de ${efficiencyPercent}% e evitei o desperdício de ${totalConsumed} itens. 🍎📉`
            : `I saved R$ ${totalSavings.toFixed(2).replace('.', ',')} this month with Kaza! My efficiency was ${efficiencyPercent}% and I avoided wasting ${totalConsumed} items. 🍎📉`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Meu Impacto com Kaza',
                    text: shareText,
                    url: window.location.origin,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(shareText);
            toast.success(language === 'pt-BR' ? 'Resumo copiado para a área de transferência!' : 'Summary copied to clipboard!');
        }
    };

    return (
        <PageTransition direction="left" className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#091f1c] pb-20">
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] bg-[#fafafa]/80 dark:bg-[#091f1c]/80 px-4 py-4 backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-2xl text-foreground bg-white/80 dark:bg-white/10 backdrop-blur-xl active:scale-[0.97] transition-all">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-foreground leading-tight">{t.savingsTitle}</h1>
                        <p className="text-[11px] text-muted-foreground font-medium capitalize">{t.home} • {monthName}</p>
                    </div>
                </div>
                <button onClick={handleShare} className="flex h-10 w-10 items-center justify-center rounded-2xl text-primary bg-primary/10 active:scale-[0.97] transition-all">
                    <Share2 className="h-5 w-5" />
                </button>
            </header>

            <main className="mx-auto max-w-lg px-5 py-6 space-y-6">

                {/* ── Hero Ring Card ── */}
                <motion.div {...fadeUp} transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white to-gray-50 dark:from-white/[0.06] dark:to-white/[0.02] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06]">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <ProgressRing percent={efficiencyPercent} size={110} stroke={9} color={ringColor} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-foreground">{efficiencyPercent}%</span>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{t.efficiency}</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.monthlyReportSub}</p>
                                <p className="text-3xl font-black text-foreground tracking-tight">
                                    {totalConsumed > 0 ? <AnimatedNumber value={totalSavings} prefix="R$ " /> : 'R$ 0,00'}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: ringColor }}>
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                {efficiencyPercent >= 80 ? t.greetingAllGood : t.tagline}
                            </div>
                        </div>
                    </div>
                    {/* Subtle glow */}
                    <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl" style={{ background: ringColor, opacity: 0.07 }} />
                </motion.div>

                {/* ── Honest Methodology Card ── */}
                <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-2xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/10 p-4 flex gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Calculator className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">{t.savingsMethodology}</p>
                        <p className="text-[11px] leading-relaxed text-amber-700/80 dark:text-amber-400/60 font-medium">
                            {t.savingsExplanation}
                        </p>
                    </div>
                </motion.div>

                {/* ── Stats Strip ── */}
                <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-3 gap-3">
                    {[
                        { label: t.consumed, value: totalConsumed, icon: Utensils, color: '#22c55e', bg: 'bg-emerald-500/10' },
                        { label: t.wasted, value: totalDiscarded, icon: Trash2, color: '#ef4444', bg: 'bg-red-500/10' },
                        { label: t.defrosted, value: totalDefrosted, icon: Thermometer, color: '#3b82f6', bg: 'bg-blue-500/10' },
                    ].map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                            className="flex flex-col items-center gap-2 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                            <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', s.bg)}>
                                <s.icon className="h-5 w-5" style={{ color: s.color }} />
                            </div>
                            <span className="text-2xl font-black text-foreground">{s.value > 0 ? s.value : '—'}</span>
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-center leading-tight">{s.label}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Environmental Impact ── */}
                <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-3">
                    <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[2px] px-1">{t.impactTitle}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-500/[0.06] border border-emerald-200/40 dark:border-emerald-500/10 p-4">
                            <Droplets className="h-5 w-5 text-emerald-500" />
                            <p className="text-xl font-black text-emerald-700 dark:text-emerald-400">{waterSaved > 0 ? `${waterSaved}L` : '—'}</p>
                            <p className="text-[10px] font-semibold text-emerald-600/70 dark:text-emerald-400/60 uppercase tracking-wider leading-tight">{t.waterSavedDesc}</p>
                        </div>
                        <div className="flex flex-col gap-2 rounded-2xl bg-sky-50 dark:bg-sky-500/[0.06] border border-sky-200/40 dark:border-sky-500/10 p-4">
                            <Leaf className="h-5 w-5 text-sky-500" />
                            <p className="text-xl font-black text-sky-700 dark:text-sky-400">{totalConsumed > 0 ? `${co2Saved}kg` : '—'}</p>
                            <p className="text-[10px] font-semibold text-sky-600/70 dark:text-sky-400/60 uppercase tracking-wider leading-tight">{t.co2SavedDesc}</p>
                        </div>
                    </div>
                </motion.section>

                {/* ── Top Items ── */}
                <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[2px]">{language === 'pt-BR' ? 'Mais Consumidos' : 'Top Consumed'}</h3>
                        <Trophy className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="space-y-2">
                        {topItemsRaw.length > 0 ? topItemsRaw.map((item, i) => {
                            const pct = Math.round((item.quantity / topMax) * 100);
                            const medals = ['🥇', '🥈', '🥉'];
                            return (
                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.06 }}
                                    className="relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] px-4 py-3.5">
                                    {/* Progress bar background */}
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.6 + i * 0.06, ease: 'easeOut' }}
                                        className="absolute inset-y-0 left-0 bg-primary/[0.05] dark:bg-primary/[0.08]" />
                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base">{medals[i] || `${i + 1}.`}</span>
                                            <span className="font-bold text-foreground text-sm">{item.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-primary tabular-nums">{item.quantity}x</span>
                                    </div>
                                </motion.div>
                            );
                        }) : (
                            <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] px-5 py-4 text-muted-foreground">
                                <Info className="h-4 w-4 shrink-0" />
                                <p className="text-sm font-medium">{t.noResults}</p>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* ── Achievements ── */}
                <motion.section {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }} className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[2px]">
                            {language === 'pt-BR' ? 'Conquistas da Casa' : language === 'es' ? 'Logros de la Casa' : 'House Achievements'}
                        </h3>
                        <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-3">
                        {achievements.map((achievement, i) => {
                            const isUnlocked = !!achievement.unlockedAt;
                            const percent = Math.min(100, Math.round((achievement.progress / achievement.threshold) * 100));
                            return (
                                <motion.div key={achievement.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.05 }}
                                    className={cn(
                                        "relative overflow-hidden rounded-2xl border p-4 transition-all",
                                        isUnlocked 
                                            ? "bg-white dark:bg-white/[0.04] border-primary/20 shadow-sm" 
                                            : "bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.04] dark:border-white/[0.04] opacity-80"
                                    )}>
                                    <div className="flex items-start gap-3">
                                        <div className={cn(
                                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl shadow-inner",
                                            isUnlocked ? "bg-primary/10" : "bg-black/5 dark:bg-white/5 grayscale opacity-50"
                                        )}>
                                            {achievement.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn("text-[15px] font-bold leading-tight", isUnlocked ? "text-foreground" : "text-muted-foreground")}>
                                                {achievement.name}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug pr-2">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    </div>
                                    {!isUnlocked && (
                                        <div className="mt-3 space-y-1.5">
                                            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                                <span>Progresso</span>
                                                <span>{achievement.progress} / {achievement.threshold}</span>
                                            </div>
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, delay: 0.8 }}
                                                    className="h-full bg-primary/40 rounded-full" />
                                            </div>
                                        </div>
                                    )}
                                    {isUnlocked && (
                                        <div className="absolute top-3 right-3">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                                                <Star className="h-3 w-3 fill-current" />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                <motion.button onClick={handleShare} {...fadeUp} transition={{ duration: 0.5, delay: 0.6 }}
                    className="w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 rounded-[22px] shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                    <Share2 className="h-5 w-5" />
                    {t.shareReport}
                </motion.button>
            </main>
        </PageTransition>
    );
}
