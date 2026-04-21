/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useKaza } from '@/contexts/KazaContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, TrendingDown, Calendar, Package, Bell, Plus, Minus, Settings2, ArrowLeft, Users, EyeOff, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/PageTransition';

import { ConsumableItem } from '@/types/kaza';

import { useConsumableLogic, LABELS, ICON_OPTIONS, INTERVAL_FACTORS } from './logic/useConsumableLogic';

export default function ConsumableTrackerPage() {
    const {
        screen,
        setScreen,
        hideMissing,
        setHideMissing,
        expandedItem,
        setExpandedItem,
        newItem,
        setNewItem,
        customAction,
        setCustomAction,
        customAmount,
        setCustomAmount,
        editItem,
        setEditItem,
        editIcon,
        setEditIcon,
        editDailyConsumption,
        setEditDailyConsumption,
        editUsageInterval,
        setEditUsageInterval,
        editMinStock,
        setEditMinStock,
        editName,
        setEditName,
        parseFormattedNumber,
        handleNumericInput,
        calculateDaysUntilEmpty,
        getAlertLevel,
        handleDebit,
        handleAddStock,
        handleCustomConfirm,
        handleSaveEdit,
        openEdit,
        handleDelete,
        handleAddToShopping,
        toggleHideItem,
        handleAddNewItem,
        residents,
        l,
        consumables,
        navigate,
        language
    } = useConsumableLogic();

    const renderScreenContent = () => {
        if (screen === 'add') {
            const dailyTotal = (parseFormattedNumber(newItem.dailyConsumption) / INTERVAL_FACTORS[newItem.usageInterval]) * residents;
            return (
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setScreen('list')} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-xl transition-all active:scale-[0.97] text-foreground">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-black text-foreground">{l.newItem}</h2>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-white/5 rounded-3xl p-6 border border-black/[0.03] dark:border-white/[0.03] space-y-6">
                        <div>
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">{l.chooseIcon}</Label>
                            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                                {ICON_OPTIONS.map((icon) => (
                                    <button
                                        key={icon}
                                        onClick={() => setNewItem(p => ({ ...p, icon }))}
                                        className={cn('flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all active:scale-95 border-2', newItem.icon === icon ? 'bg-primary/10 border-primary shadow-sm' : 'border-transparent bg-muted/50 hover:bg-secondary')}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{l.itemName}</Label>
                            <Input 
                                placeholder="Ex: Amaciante" 
                                value={newItem.name} 
                                onChange={(e) => setNewItem(p => ({ ...p, name: e.target.value }))} 
                                className="h-14 rounded-2xl border-2 focus:border-primary transition-all text-base font-bold" 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{l.currentStock}</Label>
                                <Input 
                                    inputMode="decimal"
                                    value={newItem.currentStock} 
                                    onChange={(e) => handleNumericInput(e.target.value, (v) => setNewItem(p => ({ ...p, currentStock: v })))} 
                                    className="h-14 rounded-2xl border-2 focus:border-primary transition-all text-base font-bold" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{l.unit}</Label>
                                <Select value={newItem.unit} onValueChange={(v) => setNewItem(p => ({ ...p, unit: v }))}>
                                    <SelectTrigger className="h-14 rounded-2xl border-2 font-bold"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unidades">un</SelectItem>
                                        <SelectItem value="rolos">rolos</SelectItem>
                                        <SelectItem value="ml">ml</SelectItem>
                                        <SelectItem value="L">L</SelectItem>
                                        <SelectItem value="kg">kg</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                {l.dailyUse} <span className="text-[10px] opacity-60">({l.perPerson})</span>
                            </Label>
                            <div className="flex gap-2">
                                <Input 
                                    inputMode="decimal"
                                    value={newItem.dailyConsumption} 
                                    onChange={(e) => handleNumericInput(e.target.value, (v) => setNewItem(p => ({ ...p, dailyConsumption: v })))} 
                                    className="h-14 rounded-2xl border-2 focus:border-primary transition-all text-base font-bold flex-1" 
                                />
                                <Select value={newItem.usageInterval} onValueChange={(v: any) => setNewItem(p => ({ ...p, usageInterval: v }))}>
                                    <SelectTrigger className="h-14 rounded-2xl border-2 w-32 font-bold"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">{l.daily}</SelectItem>
                                        <SelectItem value="weekly">{l.weekly}</SelectItem>
                                        <SelectItem value="fortnightly">{l.fortnightly}</SelectItem>
                                        <SelectItem value="monthly">{l.monthly}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {residents > 1 && (
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                    {l.dailyTotal}: {dailyTotal.toFixed(2)} /dia ({residents} {l.people})
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{l.minStock}</Label>
                            <Input 
                                inputMode="decimal"
                                value={newItem.minStock} 
                                onChange={(e) => handleNumericInput(e.target.value, (v) => setNewItem(p => ({ ...p, minStock: v })))} 
                                className="h-14 rounded-2xl border-2 focus:border-primary transition-all text-base font-bold" 
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 pb-12">
                        <Button variant="outline" className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest shadow-sm" onClick={() => setScreen('list')}>{l.cancel}</Button>
                        <Button className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20" onClick={handleAddNewItem} disabled={!newItem.name}>{l.confirm}</Button>
                    </div>
                </div>
            );
        }

        if (screen === 'edit') {
            const dailyTotal = (parseFormattedNumber(editDailyConsumption) / INTERVAL_FACTORS[editUsageInterval]) * residents;
            return (
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setScreen('list')} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-xl transition-all active:scale-[0.97] text-foreground">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-black text-foreground truncate">{editItem?.name}</h2>
                    </div>

                    <div className="bg-white/50 dark:bg-white/5 rounded-3xl p-6 border border-black/[0.03] dark:border-white/[0.03] space-y-6">
                         <div>
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">{l.chooseIcon}</Label>
                            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                                {ICON_OPTIONS.map((icon) => (
                                    <button
                                        key={icon}
                                        onClick={() => setEditIcon(icon)}
                                        className={cn('flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all active:scale-95 border-2', editIcon === icon ? 'bg-primary/10 border-primary shadow-sm' : 'border-transparent bg-muted/50 hover:bg-secondary')}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{l.itemName}</Label>
                            <Input 
                                value={editName} 
                                onChange={(e) => setEditName(e.target.value)} 
                                className="h-14 rounded-2xl border-2 focus:border-primary transition-all text-base font-bold" 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                {l.dailyUse} <span className="text-[10px] opacity-60">({l.perPerson})</span>
                            </Label>
                            <div className="flex gap-2">
                                <Input 
                                    inputMode="decimal"
                                    value={editDailyConsumption} 
                                    onChange={(e) => handleNumericInput(e.target.value, setEditDailyConsumption)} 
                                    className="h-14 rounded-2xl border-2 focus:border-primary transition-all text-base font-bold flex-1" 
                                />
                                <Select value={editUsageInterval} onValueChange={(v: any) => setEditUsageInterval(v)}>
                                    <SelectTrigger className="h-14 rounded-2xl border-2 w-32 font-bold"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">{l.daily}</SelectItem>
                                        <SelectItem value="weekly">{l.weekly}</SelectItem>
                                        <SelectItem value="fortnightly">{l.fortnightly}</SelectItem>
                                        <SelectItem value="monthly">{l.monthly}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {residents > 1 && (
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                    {l.dailyTotal}: {dailyTotal.toFixed(2)} /dia ({residents} {l.people})
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{l.minStock}</Label>
                            <Input 
                                inputMode="decimal"
                                value={editMinStock} 
                                onChange={(e) => handleNumericInput(e.target.value, setEditMinStock)} 
                                className="h-14 rounded-2xl border-2 focus:border-primary transition-all text-base font-bold" 
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 pb-12">
                        <Button variant="destructive" className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest shadow-sm" onClick={() => editItem && handleDelete(editItem.id)}>{l.deleteItem}</Button>
                        <Button className="flex-[2] h-16 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20" onClick={handleSaveEdit}>{l.save}</Button>
                    </div>
                </div>
            );
        }

        if (screen === 'custom') {
            return (
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <button onClick={() => { setCustomAction(null); setScreen('list'); }} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-xl transition-all active:scale-[0.97] text-foreground">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-black text-foreground uppercase tracking-tighter">{l.customAmount}</h2>
                    </div>
                    <div className="flex flex-col items-center gap-6 py-10">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => {
                                    const next = Math.max(0, parseFormattedNumber(customAmount) - 0.5);
                                    setCustomAmount(String(next).replace('.', ','));
                                }}
                                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-foreground transition-all active:scale-90 border-2"
                            >
                                <Minus className="h-6 w-6" />
                            </button>
                            <Input
                                inputMode="decimal"
                                value={customAmount}
                                onChange={(e) => handleNumericInput(e.target.value, setCustomAmount)}
                                className="h-20 w-40 rounded-3xl text-center text-5xl font-black border-4 shadow-xl focus:ring-primary focus:border-primary transition-all"
                            />
                            <button
                                onClick={() => {
                                    const next = parseFormattedNumber(customAmount) + 0.5;
                                    setCustomAmount(String(next).replace('.', ','));
                                }}
                                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all active:scale-90 border-2 border-primary/20"
                            >
                                <Plus className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    <div className="pt-4 pb-12">
                        <Button className="w-full h-16 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20" onClick={handleCustomConfirm}>{l.confirm}</Button>
                    </div>
                </div>
            );
        }

        // List view
        const hiddenCount = consumables.filter(i => i.hidden).length;
        const visibleItems = consumables.filter(item => !hideMissing || !item.hidden);

        return (
            <div className="space-y-6 pb-24">
                <div className="rounded-2xl bg-primary/5 p-4 border border-primary/20 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Bell className="h-5 w-5 animate-bounce" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-foreground tracking-tight">{l.howItWorks}</p>
                            <p className="text-xs font-bold text-muted-foreground mt-0.5 opacity-80 leading-relaxed">{l.howItWorksDesc}</p>
                        </div>
                    </div>
                </div>

                {hiddenCount > 0 && (
                    <div className="flex items-center justify-between rounded-2xl bg-white/50 dark:bg-white/5 px-5 py-4 border border-black/[0.02] dark:border-white/[0.02] backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50">
                                {hideMissing ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                            </div>
                            <span className="text-sm font-black text-foreground uppercase tracking-widest">
                                {l.showHidden} <span className="text-primary font-black ml-1">({hiddenCount})</span>
                            </span>
                        </div>
                        <Switch checked={!hideMissing} onCheckedChange={(v) => setHideMissing(!v)} className="data-[state=checked]:bg-primary" />
                    </div>
                )}

                {/* Compact grid view - collapsed by default */}
                {visibleItems.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 px-1">Visão Rápida</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {visibleItems.map((item) => {
                                const daysLeft = calculateDaysUntilEmpty(item);
                                const alertLevel = getAlertLevel(daysLeft);

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                                        className={cn(
                                            "relative rounded-2xl p-3 transition-all active:scale-[0.95] flex flex-col items-center gap-2",
                                            expandedItem === item.id ? "ring-2 ring-primary bg-primary/5" : "bg-white dark:bg-white/5",
                                            alertLevel === 'danger' && "border border-destructive/30",
                                            alertLevel === 'warning' && "border border-warning/30",
                                            alertLevel === 'ok' && "border border-black/[0.04] dark:border-white/[0.04]",
                                            item.hidden && "opacity-40"
                                        )}
                                    >
                                        <div className="text-3xl">{item.icon}</div>
                                        <div className={cn(
                                            "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                                            alertLevel === 'danger' && "bg-destructive/10 text-destructive",
                                            alertLevel === 'warning' && "bg-warning/10 text-warning",
                                            alertLevel === 'ok' && "bg-emerald-500/10 text-emerald-600"
                                        )}>
                                            {daysLeft === Infinity ? '∞' : daysLeft}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Expanded details */}
                <div className="grid grid-cols-1 gap-3">
                    {visibleItems.map((item) => {
                        const daysLeft = calculateDaysUntilEmpty(item);
                        const alertLevel = getAlertLevel(daysLeft);
                        const isExpanded = expandedItem === item.id;

                        return (
                            <div key={item.id} className={cn(
                                "rounded-2xl border transition-all shadow-sm overflow-hidden",
                                item.hidden && "opacity-40 grayscale-[0.5]",
                                alertLevel === 'danger' && !item.hidden && "border-destructive/20 bg-destructive/[0.02]",
                                alertLevel === 'warning' && !item.hidden && "border-warning/20 bg-warning/[0.02]",
                                (alertLevel === 'ok' || item.hidden) && "border-black/[0.04] dark:border-white/[0.06] bg-white dark:bg-white/[0.02]"
                            )}>
                                {/* Collapsed header */}
                                <button
                                    onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                                    className="w-full flex items-center gap-3 p-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.02] active:bg-black/[0.02] dark:active:bg-white/[0.03] transition-colors"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/50 text-xl border border-black/[0.02] dark:border-white/[0.02]">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {Number(item.currentStock).toFixed(1)} {item.unit} • {daysLeft === Infinity ? '∞ dias' : `${daysLeft}d`}
                                        </p>
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest",
                                        alertLevel === 'danger' && "bg-destructive/10 text-destructive",
                                        alertLevel === 'warning' && "bg-warning/10 text-warning",
                                        alertLevel === 'ok' && "bg-emerald-500/10 text-emerald-600"
                                    )}>
                                        <Calendar className="h-3 w-3" />
                                        {daysLeft === Infinity ? '∞' : daysLeft}
                                    </div>
                                </button>

                                {/* Expanded content */}
                                {isExpanded && (
                                    <div className="border-t border-black/[0.02] dark:border-white/[0.05] p-4 space-y-4">
                                        <div>
                                            <div className="h-2 rounded-full bg-muted/40 overflow-hidden border border-black/[0.02] dark:border-white/[0.02]">
                                                <div className={cn(
                                                    "h-full rounded-full transition-all duration-700",
                                                    alertLevel === 'danger' && "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.4)]",
                                                    alertLevel === 'warning' && "bg-warning shadow-[0_0_8px_rgba(245,158,11,0.4)]",
                                                    alertLevel === 'ok' && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                                                )} style={{ width: `${Math.min(100, (item.currentStock / (item.minStock * 4)) * 100)}%` }} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="rounded-lg bg-muted/30 p-2">
                                                <p className="font-bold text-foreground">{Number(item.currentStock).toFixed(1)}</p>
                                                <p className="text-muted-foreground text-[10px]">{item.unit}</p>
                                            </div>
                                            <div className="rounded-lg bg-primary/5 p-2">
                                                <p className="font-bold text-primary">{Number(item.dailyConsumption).toFixed(2)}</p>
                                                <p className="text-muted-foreground text-[10px]">/{l[item.usageInterval || 'daily']}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="flex-1 h-9 rounded-lg text-xs gap-1.5"
                                                onClick={() => handleDebit(item.id)}
                                            >
                                                <Minus className="h-3 w-3" />{l.debit}
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="flex-1 h-9 rounded-lg text-xs gap-1.5"
                                                onClick={() => handleAddStock(item.id, 1)}
                                            >
                                                <Plus className="h-3 w-3" />{l.restock}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-9 w-9 rounded-lg"
                                                onClick={() => toggleHideItem(item.id)}
                                            >
                                                {item.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                            </Button>
                                            {alertLevel !== 'ok' && !item.hidden && (
                                                <Button
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                                                    onClick={() => handleAddToShopping(item)}
                                                >
                                                    <ShoppingCart className="h-3.5 w-3.5" />
                                                </Button>
                                            )}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full h-8 text-xs"
                                            onClick={() => openEdit(item)}
                                        >
                                            {l.editItem}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="fixed bottom-0 top-auto left-0 right-0 p-4 border-t border-black/[0.04] dark:border-white/[0.06] bg-[#fafafa]/90 dark:bg-[#091f1c]/90 backdrop-blur-3xl z-50">
                    <div className="max-w-lg mx-auto">
                        <Button className="w-full h-14 rounded-2xl gap-2 font-black uppercase tracking-widest shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setScreen('add')}>
                            <Package className="h-5 w-5" />{l.addItem}
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <PageTransition direction="up" className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#091f1c]">
            <header className="sticky top-0 z-50 flex items-center gap-4 border-b border-black/[0.02] dark:border-white/[0.02] bg-[#fafafa]/80 dark:bg-[#091f1c]/80 px-4 py-3 backdrop-blur-3xl">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground bg-white/80 dark:bg-white/10 shadow-sm border border-black/[0.03] dark:border-white/[0.03] active:scale-[0.95] transition-all"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex-1">
                    <h1 className="flex items-center gap-2 text-xl font-black tracking-tight">
                        <TrendingDown className="h-6 w-6 text-primary" />
                        {l.title}
                    </h1>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-2 border border-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-black text-primary tracking-tighter">{residents}</span>
                </div>
            </header>
            <main className="max-w-lg mx-auto px-5 py-6">
                {renderScreenContent()}
            </main>
        </PageTransition>
    );
}
