import { useState } from 'react';
import { useKaza } from '@/contexts/KazaContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ItemCard } from '../ItemCard';
import { BarcodeScanner } from '../BarcodeScanner';
import { ConsumableTracker } from '../ConsumableTracker';
import { useNavigate } from 'react-router-dom';
import { Refrigerator, Snowflake, Package, Droplets, Search, ScanBarcode, ChevronDown, ChevronUp, TrendingDown, CheckSquare, Square, Trash2, X, Edit3, AlertTriangle, EyeOff, Plus, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ItemLocation, KazaItem } from '@/types/kaza';
import { toast } from 'sonner';

export function FridgeTab() {
    const { items, removeItem, updateItem, consumables, onboardingData, toggleSection: toggleContextSection, isSubAccount } = useKaza();
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'items' | 'consumables'>('items');
    const [activeFilter, setActiveFilter] = useState<ItemLocation | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
    const [trackerOpen, setTrackerOpen] = useState(false);
    const [scannerOpen, setScannerOpen] = useState(false);
    const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [editingItem, setEditingItem] = useState<KazaItem | null>(null);
    const [editQty, setEditQty] = useState('');
    const [editLocation, setEditLocation] = useState<ItemLocation>('fridge');

    const locationFilters: { id: ItemLocation | 'all'; label: string; icon: React.ElementType }[] = [
        { id: 'all', label: t.all, icon: Package },
        { id: 'fridge', label: t.fridge, icon: Refrigerator },
        { id: 'freezer', label: t.freezer, icon: Snowflake },
        { id: 'pantry', label: t.pantry, icon: Package },
        { id: 'cleaning', label: t.cleaning, icon: Droplets },
    ];

    const categoryLabels: Record<string, string> = {
        fruit: t.catFruit,
        vegetable: t.catVegetable,
        meat: t.catMeat,
        dairy: t.catDairy,
        cooked: t.catCooked,
        frozen: t.catFrozen,
        beverage: t.catBeverage,
        pantry: t.catPantry,
        cleaning: t.catCleaning,
        hygiene: t.catHygiene,
    };

    const filteredItems = items.filter((item) => {
        const matchesLocation = activeFilter === 'all' || item.location === activeFilter;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesLocation && matchesSearch;
    });

    const groupedItems = filteredItems.reduce((acc, item) => {
        const key = item.category;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<string, typeof items>);

    const toggleCategory = (category: string) => {
        setCollapsedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
    };

    // Selection handlers
    const toggleSelection = (id: string) => {
        setSelectedItems(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const selectAll = () => {
        if (selectedItems.size === filteredItems.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(filteredItems.map(i => i.id)));
        }
    };

    const deleteSelected = () => {
        selectedItems.forEach(id => removeItem(id));
        const count = selectedItems.size;
        setSelectedItems(new Set());
        setSelectionMode(false);
        toast.success(`${count} ${t.deleted}`);
    };

    const exitSelectionMode = () => {
        setSelectionMode(false);
        setSelectedItems(new Set());
    };

    // Edit handlers
    const startEdit = (item: KazaItem) => {
        setEditingItem(item);
        setEditQty(String(item.quantity));
        setEditLocation(item.location);
    };

    const saveEdit = () => {
        if (!editingItem) return;
        const qty = parseFloat(editQty);
        if (!qty || qty <= 0) return;
        updateItem(editingItem.id, { quantity: qty, location: editLocation });
        setEditingItem(null);
        toast.success(`${editingItem.name} atualizado`);
    };

    // Re-freeze handler
    const refreezeItem = (item: KazaItem) => {
        updateItem(item.id, { location: 'freezer' });
        toast.success(`${item.name} ${t.refrozen}`);
    };

    const INTERVAL_FACTORS = {
        daily: 1,
        weekly: 7,
        fortnightly: 14,
        monthly: 30
    };

    const residents = onboardingData?.residents || 1;

    // Calculate low-stock consumables
    const lowStockConsumables = consumables.filter(c => {
        const factor = INTERVAL_FACTORS[c.usageInterval || 'daily'];
        const dailyUse = (c.dailyConsumption / factor) * residents;
        const daysLeft = dailyUse > 0 ? c.currentStock / dailyUse : Infinity;
        return daysLeft <= 7 || c.currentStock <= (c.minStock || 0);
    });

    return (
        <div className="space-y-4 pb-nav-safe">

            {/* Selection toolbar (when active) */}
            {selectionMode && (
                <div className="flex items-center justify-between rounded-2xl bg-primary/5 border border-primary/10 p-3 animate-slide-down">
                    <div className="flex items-center gap-3">
                        <button onClick={selectAll} className="flex items-center gap-2 text-sm font-semibold text-primary active:scale-[0.97] transition-all">
                            {selectedItems.size === filteredItems.length ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                            {t.selectAll}
                        </button>
                        <span className="text-xs text-muted-foreground">{selectedItems.size} {t.selected}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedItems.size > 0 && !isSubAccount && (
                            <Button onClick={deleteSelected} variant="destructive" size="sm" className="rounded-xl h-9 gap-1.5 active:scale-[0.97] transition-all">
                                <Trash2 className="h-3.5 w-3.5" />
                                {t.deleteSelected} ({selectedItems.size})
                            </Button>
                        )}
                        <button
                            onClick={exitSelectionMode}
                            className="flex items-center gap-1.5 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/[0.04] dark:border-white/10 px-3 py-2 text-sm font-semibold text-foreground transition-all active:scale-[0.97] shadow-sm"
                        >
                            <X className="h-4 w-4" />
                            {t.cancel}
                        </button>
                    </div>
                </div>
            )}

            {/* Low-stock consumables alert */}
            {lowStockConsumables.length > 0 && !selectionMode && !onboardingData?.hiddenSections?.includes('fridge-low-stock') && (
                <div className="rounded-2xl bg-warning/10 border border-warning/20 p-4 animate-scale-in">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <p className="text-sm font-bold text-warning">{t.runningLow}</p>
                        </div>
                        <button
                            onClick={() => toggleContextSection('fridge-low-stock')}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-warning/20 text-warning hover:bg-warning/30 active:scale-90 transition-all"
                        >
                            <EyeOff className="h-3.5 w-3.5" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {lowStockConsumables.map(c => {
                            const factor = INTERVAL_FACTORS[c.usageInterval || 'daily'];
                            const dailyUse = (c.dailyConsumption / factor) * residents;
                            const daysLeft = dailyUse ? Math.floor(c.currentStock / dailyUse) : 0;
                            return (
                                <div key={c.id} className="flex items-center justify-between rounded-xl bg-white/60 dark:bg-white/5 px-3 py-2">
                                    <span className="text-sm font-medium">{c.icon} {c.name}</span>
                                    <span className="text-xs font-bold text-warning">{daysLeft} {t.days}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Tabs for Items vs Consumables */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'items' | 'consumables')} className="w-full">
                <TabsList className="w-full grid grid-cols-2 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] p-1">
                    <TabsTrigger value="items" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-sm gap-2 font-semibold">
                        <Package className="h-4 w-4" />
                        {t.items}
                    </TabsTrigger>
                    <TabsTrigger value="consumables" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-sm gap-2 font-semibold">
                        <TrendingDown className="h-4 w-4" />
                        {t.consumables}
                        {lowStockConsumables.length > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[10px] font-bold text-warning-foreground">{lowStockConsumables.length}</span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="items" className="mt-4 space-y-4">
                    {/* Search & Actions Row */}
                    <div className="flex items-center justify-between px-1 mb-2">
                        <div className="flex items-center gap-2 relative">
                            <h2 className="text-[22px] font-black text-[#1a3d32] dark:text-emerald-50 tracking-tight ml-1">
                                {language === 'pt-BR' ? 'Estoque' : language === 'en' ? 'Stock' : 'Inventario'}
                            </h2>
                            <button
                                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                                className={cn("flex h-8 w-8 items-center justify-center rounded-full transition-colors", locationDropdownOpen || activeFilter !== 'all' ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground hover:bg-black/[0.08]")}
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                            </button>
                            
                            {locationDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setLocationDropdownOpen(false)} />
                                    <div className="absolute top-full left-0 mt-2 w-56 max-h-[300px] overflow-y-auto rounded-2xl bg-white dark:bg-[#11302c] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/[0.04] p-2 z-50 animate-in fade-in slide-in-from-top-2 scrollbar-none">
                                        {locationFilters.map(filter => {
                                            const Icon = filter.icon;
                                            const isActive = activeFilter === filter.id;
                                            const count = filter.id === 'all'
                                                ? items.length
                                                : items.filter(i => i.location === filter.id).length;

                                            return (
                                                <button
                                                    key={filter.id}
                                                    onClick={() => {
                                                        setActiveFilter(filter.id);
                                                        setLocationDropdownOpen(false);
                                                    }}
                                                    className={cn(
                                                        "flex w-full items-center justify-between px-3 py-2.5 rounded-xl transition-all",
                                                        isActive 
                                                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-bold" 
                                                            : "hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-foreground"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="h-[18px] w-[18px] opacity-70" />
                                                        <span className="text-[14px]">
                                                            {filter.id === 'all' ? t.allStock : filter.label}
                                                        </span>
                                                    </div>
                                                    <span className={cn(
                                                        "text-[11px] font-black rounded-full px-1.5 py-0.5",
                                                        isActive ? "bg-emerald-100 dark:bg-emerald-500/30" : "bg-black/[0.05] dark:bg-white/10"
                                                    )}>
                                                        {count}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={cn(
                                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all active:scale-[0.95]",
                                    isSearchOpen || searchQuery ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground hover:bg-black/[0.08]"
                                )}
                            >
                                <Search className="h-[18px] w-[18px]" />
                            </button>
                            <button
                                onClick={() => setScannerOpen(true)}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-all active:scale-[0.95]"
                            >
                                <ScanBarcode className="h-[18px] w-[18px]" />
                            </button>
                            <button
                                onClick={() => { setSelectionMode(true); selectAll(); }}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground transition-all active:scale-[0.95] hover:text-foreground"
                            >
                                <CheckSquare className="h-[18px] w-[18px]" />
                            </button>
                        </div>
                    </div>

                    {/* Expandable Search Input */}
                    {(isSearchOpen || searchQuery) && (
                        <div className="relative animate-in slide-in-from-top-2 fade-in duration-200 z-10 -mx-1 mb-3">
                            <Search className="absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground opacity-50 pointer-events-none" />
                            <Input
                                placeholder={t.searchPlaceholder}
                                value={searchQuery}
                                autoFocus
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-[52px] rounded-2xl border border-black/[0.08] dark:border-white/10 focus-visible:border-emerald-500/50 focus-visible:ring-4 focus-visible:ring-emerald-500/10 bg-white dark:bg-[#11302c]/50 backdrop-blur-xl pl-[3.25rem] pr-12 text-[15px] font-bold tracking-wide shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none placeholder:font-semibold transition-all w-full"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 h-[22px] w-[22px] flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Items by Category with Collapsible */}
                    {Object.entries(groupedItems).length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="mb-4 rounded-2xl bg-muted/50 p-5">
                                <Package className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <p className="text-lg font-semibold text-foreground">{t.noResults}</p>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchQuery ? t.tryAnother : t.addItemsBtn}
                            </p>
                            {searchQuery.trim().length > 0 && (
                                <button
                                    onClick={() => window.location.href = `/app/add-item?name=${encodeURIComponent(searchQuery.trim())}`}
                                    className="mt-4 flex items-center gap-2 rounded-2xl bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-all active:scale-[0.97]"
                                >
                                    <Plus className="h-4 w-4" />
                                    {language === 'pt-BR' ? `Cadastrar "${searchQuery.trim()}"` : language === 'es' ? `Registrar "${searchQuery.trim()}"` : `Register "${searchQuery.trim()}"`}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6 pt-2">
                            {Object.entries(groupedItems).map(([category, categoryItems]) => (
                                <section key={category}>
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="flex w-full items-center justify-between pb-3 text-left transition-all group outline-none"
                                    >
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-[18px] font-black tracking-tight text-[#1a3d32] dark:text-emerald-50 group-hover:text-emerald-600 transition-colors">
                                                {categoryLabels[category] || category}
                                            </h2>
                                            <span className="flex h-5 items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.08] px-2 text-[11px] font-bold text-muted-foreground">
                                                {categoryItems.length}
                                            </span>
                                        </div>
                                        <div className="h-7 w-7 flex items-center justify-center rounded-full bg-black/[0.02] dark:bg-white/[0.02] group-hover:bg-black/[0.04] transition-colors">
                                            {collapsedCategories[category] ? (
                                                <ChevronDown className="h-[18px] w-[18px] text-muted-foreground opacity-70" />
                                            ) : (
                                                <ChevronUp className="h-[18px] w-[18px] text-muted-foreground opacity-70" />
                                            )}
                                        </div>
                                    </button>
                                    {!collapsedCategories[category] && (
                                        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                                            {categoryItems.map((item) => (
                                                <div key={item.id} className="relative">
                                                    {selectionMode && (
                                                        <button
                                                            onClick={() => toggleSelection(item.id)}
                                                            className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-black shadow transition-all active:scale-90"
                                                        >
                                                            {selectedItems.has(item.id) ? (
                                                                <CheckSquare className="h-5 w-5 text-primary" />
                                                            ) : (
                                                                <Square className="h-5 w-5 text-muted-foreground" />
                                                            )}
                                                        </button>
                                                    )}
                                                    <div className={cn(selectionMode && "ml-8 transition-all")}>
                                                        <ItemCard
                                                            item={item}
                                                            onConsume={(i) => selectionMode ? toggleSelection(i.id) : navigate(`/app/consume/${i.id}`)}
                                                            onEdit={!selectionMode ? startEdit : undefined}
                                                            onRefreeze={!selectionMode && item.location !== 'freezer' ? refreezeItem : undefined}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="consumables" className="mt-4 space-y-4">
                    {/* Low stock alerts */}
                    {lowStockConsumables.length > 0 && !onboardingData?.hiddenSections?.includes('fridge-low-stock') && (
                        <div className="space-y-2 animate-fade-in mb-6">
                            <div className="flex items-center justify-between px-1 mb-2">
                                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t.lowStock}</h3>
                                <button
                                    onClick={() => toggleContextSection('fridge-low-stock')}
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-90 transition-all"
                                >
                                    <EyeOff className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            {lowStockConsumables.map(c => {
                                const factor = INTERVAL_FACTORS[c.usageInterval || 'daily'];
                                const dailyUse = (c.dailyConsumption / factor) * residents;
                                const daysLeft = dailyUse ? Math.floor(c.currentStock / dailyUse) : 0;
                                const isOut = c.currentStock <= 0;
                                const isCritical = daysLeft <= 2;
                                return (
                                    <div key={c.id} className={cn(
                                        "flex items-center justify-between rounded-2xl border p-4 transition-all",
                                        isOut ? "bg-destructive/10 border-destructive/20" :
                                            isCritical ? "bg-warning/10 border-warning/20" :
                                                "bg-primary/5 border-primary/10"
                                    )}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{c.icon}</span>
                                            <div>
                                                <p className="text-sm font-semibold">{c.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {c.currentStock.toFixed(2)} {c.unit} • {c.dailyConsumption}/{language === 'pt-BR' ? 'dia' : language === 'en' ? 'day' : 'día'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "rounded-full px-3 py-1 text-xs font-bold",
                                            isOut ? "bg-destructive/20 text-destructive" :
                                                isCritical ? "bg-warning/20 text-warning" :
                                                    "bg-primary/10 text-primary"
                                        )}>
                                            {isOut ? (language === 'pt-BR' ? 'Esgotado' : 'Out') : `${daysLeft}d`}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="rounded-2xl border border-black/[0.04] dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl overflow-hidden shadow-sm">
                        <button
                            onClick={() => setTrackerOpen(!trackerOpen)}
                            className="flex w-full items-center justify-between p-4 text-left transition-all hover:bg-muted/50 outline-none"
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl transition-all", trackerOpen ? "bg-emerald-500 text-white" : "bg-primary/10 text-primary")}>
                                    <TrendingDown className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{t.trackConsumables}</p>
                                    <p className="text-xs text-gray-500">{t.trackConsumablesDesc}</p>
                                </div>
                            </div>
                            <ChevronDown className={cn("h-5 w-5 text-gray-500 transition-transform duration-300", trackerOpen && "rotate-180")} />
                        </button>
                        
                        {trackerOpen && (
                            <div className="border-t border-black/[0.04] dark:border-white/10 bg-white dark:bg-[#11302c]/30 animate-in slide-in-from-top-2 fade-in duration-300">
                                <ConsumableTracker inline />
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Quick Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center animate-backdrop bg-black/40" onClick={() => setEditingItem(null)}>
                    <div className="w-full max-w-lg rounded-t-3xl bg-[#fafafa] dark:bg-[#1a1a1a] p-6 pb-10 animate-sheet-up" onClick={e => e.stopPropagation()}>
                        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Edit3 className="h-5 w-5 text-primary" />
                            {t.editItem}: {editingItem.name}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold">{t.qty}</label>
                                <Input
                                    inputMode="decimal"
                                    type="text"
                                    value={editQty}
                                    onChange={(e) => {
                                        const v = e.target.value.replace(',', '.');
                                        if (v === '' || /^\d*\.?\d*$/.test(v)) setEditQty(v);
                                    }}
                                    className="h-14 rounded-2xl border-black/[0.04] dark:border-white/[0.06] bg-white/80 dark:bg-white/5 backdrop-blur-xl text-base shadow-sm mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold">{t.location}</label>
                                <div className="flex gap-2 mt-2">
                                    {locationFilters.filter(f => f.id !== 'all').map(loc => (
                                        <button
                                            key={loc.id}
                                            onClick={() => setEditLocation(loc.id as ItemLocation)}
                                            className={cn(
                                                "flex-1 rounded-xl py-3 text-xs font-bold transition-all active:scale-95",
                                                editLocation === loc.id
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "bg-white/80 dark:bg-white/5 text-muted-foreground border border-black/[0.04] dark:border-white/[0.06]"
                                            )}
                                        >
                                            {loc.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Button onClick={saveEdit} className="w-full h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.97]">
                                {t.save}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <BarcodeScanner
                open={scannerOpen}
                onClose={() => setScannerOpen(false)}
            />
        </div>
    );
}
