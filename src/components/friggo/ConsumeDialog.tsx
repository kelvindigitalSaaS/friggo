import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FriggoItem } from '@/types/friggo';
import { useFriggo } from '@/contexts/FriggoContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Minus, Plus, Utensils, Trash2, ChefHat, Scale, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ConsumeDialogProps {
 item: FriggoItem | null;
 open: boolean;
 onClose: () => void;
}

const labels = {
 'pt-BR': {
 available: 'Disponível',
 consume: 'Consumir',
 cook: 'Cozinhar',
 discard: 'Descartar',
 quantity: 'Quantidade',
 selectUnit: 'Selecione a unidade',
 weight: 'Peso',
 volume: 'Volume',
 count: 'Contagem',
 grams: 'Gramas',
 kilos: 'Quilos',
 milliliters: 'Mililitros',
 liters: 'Litros',
 units: 'Unidades',
 slices: 'Fatias',
 portions: 'Porções',
 spoons: 'Colheres',
 cups: 'Xícaras',
 confirmConsume: '✓ Confirmar Consumo',
 confirmCook: '✓ Confirmar Cozimento',
 confirmDiscard: '✓ Confirmar Descarte',
 consumed: 'consumido',
 cooked: 'usado em receita',
 discarded: 'descartado',
 completely: 'completamente',
 invalidQty: 'Quantidade inválida',
 },
 'en': {
 available: 'Available',
 consume: 'Consume',
 cook: 'Cook',
 discard: 'Discard',
 quantity: 'Quantity',
 selectUnit: 'Select unit',
 weight: 'Weight',
 volume: 'Volume',
 count: 'Count',
 grams: 'Grams',
 kilos: 'Kilos',
 milliliters: 'Milliliters',
 liters: 'Liters',
 units: 'Units',
 slices: 'Slices',
 portions: 'Portions',
 spoons: 'Spoons',
 cups: 'Cups',
 confirmConsume: '✓ Confirm Consumption',
 confirmCook: '✓ Confirm Cooking',
 confirmDiscard: '✓ Confirm Discard',
 consumed: 'consumed',
 cooked: 'used in recipe',
 discarded: 'discarded',
 completely: 'completely',
 invalidQty: 'Invalid quantity',
 },
 'es': {
 available: 'Disponible',
 consume: 'Consumir',
 cook: 'Cocinar',
 discard: 'Descartar',
 quantity: 'Cantidad',
 selectUnit: 'Selecciona unidad',
 weight: 'Peso',
 volume: 'Volumen',
 count: 'Conteo',
 grams: 'Gramos',
 kilos: 'Kilos',
 milliliters: 'Mililitros',
 liters: 'Litros',
 units: 'Unidades',
 slices: 'Rodajas',
 portions: 'Porciones',
 spoons: 'Cucharas',
 cups: 'Tazas',
 confirmConsume: '✓ Confirmar Consumo',
 confirmCook: '✓ Confirmar Cocción',
 confirmDiscard: '✓ Confirmar Descarte',
 consumed: 'consumido',
 cooked: 'usado en receta',
 discarded: 'descartado',
 completely: 'completamente',
 invalidQty: 'Cantidad inválida',
 },
};

type ActionType = 'consumed' | 'cooked' | 'discarded';
const quickQuantities = [0.5, 1, 2, 3, 5];

export function ConsumeDialog({ item, open, onClose }: ConsumeDialogProps) {
 const { updateItem, removeItem, addItemHistory } = useFriggo();
 const { language } = useLanguage();
 const l = labels[language];

 const [quantity, setQuantity] = useState('1');
 const [unit, setUnit] = useState(item?.unit || 'un');
 const [action, setAction] = useState<ActionType>('consumed');
 const [showUnitSelector, setShowUnitSelector] = useState(false);

 const unitCategories = [
 { label: l.weight, units: [{ value: 'g', label: l.grams, factor: 1 }, { value: 'kg', label: l.kilos, factor: 1000 }] },
 { label: l.volume, units: [{ value: 'ml', label: l.milliliters, factor: 1 }, { value: 'l', label: l.liters, factor: 1000 }] },
 { label: l.count, units: [
 { value: 'un', label: l.units, factor: 1 },
 { value: 'fatia', label: l.slices, factor: 1 },
 { value: 'porção', label: l.portions, factor: 1 },
 { value: 'colher', label: l.spoons, factor: 1 },
 { value: 'xícara', label: l.cups, factor: 1 },
 ]},
 ];
 const allUnits = unitCategories.flatMap(cat => cat.units);

 useEffect(() => {
 if (item) { setUnit(item.unit || 'un'); setQuantity('1'); setAction('consumed'); setShowUnitSelector(false); }
 }, [item]);

 const handleAction = () => {
 if (!item) return;
 const consumedQty = parseFloat(quantity) || 0;
 if (consumedQty <= 0) { toast.error(l.invalidQty); return; }

 let adjustedQty = consumedQty;
 const itemUnit = item.unit?.toLowerCase() || 'un';
 const selectedUnit = unit.toLowerCase();

 if (['g', 'kg'].includes(itemUnit) && ['g', 'kg'].includes(selectedUnit)) {
 adjustedQty = (consumedQty * (selectedUnit === 'kg' ? 1000 : 1)) / (itemUnit === 'kg' ? 1000 : 1);
 } else if (['ml', 'l'].includes(itemUnit) && ['ml', 'l'].includes(selectedUnit)) {
 adjustedQty = (consumedQty * (selectedUnit === 'l' ? 1000 : 1)) / (itemUnit === 'l' ? 1000 : 1);
 }

 const newQuantity = Math.max(0, item.quantity - adjustedQty);
 addItemHistory(item.id, item.name, action, consumedQty, unit);
 const actionText = action === 'consumed' ? l.consumed : action === 'cooked' ? l.cooked : l.discarded;

 if (newQuantity <= 0) {
 removeItem(item.id);
 toast.success(`${item.name} ${actionText} ${l.completely}`);
 } else {
 updateItem(item.id, { quantity: newQuantity });
 toast.success(`${consumedQty} ${unit} ${item.name} ${actionText}`);
 }
 onClose();
 setQuantity('1');
 };

 const handleQuantityChange = (newQty: number) => setQuantity(String(Math.min(Math.max(0.1, newQty), item?.quantity || 999)));
 const getCurrentUnitLabel = () => allUnits.find(u => u.value === unit)?.label || unit;

 if (!item) return null;

 return (
 <Dialog open={open} onOpenChange={onClose}>
 <DialogContent className="mx-4 max-w-sm rounded-3xl p-0 overflow-hidden border-gray-200/50">
 <div className=" p-6 pb-4">
 <DialogHeader>
 <DialogTitle className="text-center text-xl font-bold text-foreground">{item.name}</DialogTitle>
 <div className="mt-2 flex items-center justify-center gap-2">
 <div className="rounded-full bg-background/80 px-3 py-1 text-sm font-medium text-gray-500">
 {l.available}: <span className="font-bold text-foreground">{item.quantity} {item.unit}</span>
 </div>
 </div>
 </DialogHeader>
 </div>

 <div className="p-6 pt-4 space-y-5">
 <div className="grid grid-cols-3 gap-2">
 {([
 { type: 'consumed' as ActionType, icon: Utensils, label: l.consume, color: 'primary' },
 { type: 'cooked' as ActionType, icon: ChefHat, label: l.cook, color: 'warning' },
 { type: 'discarded' as ActionType, icon: Trash2, label: l.discard, color: 'destructive' },
 ]).map(({ type, icon: Icon, label, color }) => (
 <button key={type} onClick={() => setAction(type)} className={cn(
 'flex flex-col items-center gap-2 rounded-md p-3 transition-all duration-200 active:scale-95',
 action === type
 ? color === 'primary' ? 'bg-primary text-primary-foreground shadow-sm '
 : color === 'warning' ? 'bg-warning text-warning-foreground shadow-sm '
 : 'bg-destructive text-destructive-foreground shadow-sm '
 : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
 )}>
 <Icon className="h-5 w-5" /><span className="text-xs font-semibold">{label}</span>
 </button>
 ))}
 </div>

 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <label className="text-sm font-semibold text-foreground">{l.quantity}</label>
 <button onClick={() => setShowUnitSelector(!showUnitSelector)} className="flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:bg-secondary">
 <Scale className="h-3.5 w-3.5" />{getCurrentUnitLabel()}
 </button>
 </div>
 <div className="flex gap-2">
 {quickQuantities.map(qty => (
 <button key={qty} onClick={() => setQuantity(String(qty))} className={cn(
 'flex-1 rounded-md py-2 text-sm font-semibold transition-all active:scale-95',
 parseFloat(quantity) === qty ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-gray-500 hover:bg-secondary'
 )}>{qty}</button>
 ))}
 </div>
 <div className="flex items-center gap-3">
 <Button variant="outline" size="icon" onClick={() => handleQuantityChange(parseFloat(quantity) - 1)} className="h-14 w-14 rounded-md border-2 text-lg font-bold transition-all active:scale-95">
 <Minus className="h-5 w-5" />
 </Button>
 <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="h-14 flex-1 rounded-md text-center text-2xl font-bold border-2" step="0.1" min="0.1" />
 <Button variant="outline" size="icon" onClick={() => handleQuantityChange(parseFloat(quantity) + 1)} className="h-14 w-14 rounded-md border-2 text-lg font-bold transition-all active:scale-95">
 <Plus className="h-5 w-5" />
 </Button>
 </div>
 </div>

 {showUnitSelector && (
 <div className="space-y-3 animate-fade-in rounded-md bg-muted/50 p-4">
 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{l.selectUnit}</p>
 {unitCategories.map(category => (
 <div key={category.label}>
 <p className="text-xs text-gray-500 mb-2">{category.label}</p>
 <div className="flex flex-wrap gap-2">
 {category.units.map(u => (
 <button key={u.value} onClick={() => { setUnit(u.value); setShowUnitSelector(false); }} className={cn(
 'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-all active:scale-95',
 unit === u.value ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-background text-foreground hover:bg-secondary border border-gray-200'
 )}>
 {u.label}{unit === u.value && <Check className="h-3.5 w-3.5" />}
 </button>
 ))}
 </div>
 </div>
 ))}
 </div>
 )}

 <Button onClick={handleAction} className={cn(
 "h-14 w-full rounded-md text-base font-bold shadow-sm transition-all active:scale-[0.98]",
 action === 'consumed' && "",
 action === 'cooked' && "bg-warning hover:bg-warning/90 ",
 action === 'discarded' && ""
 )} variant={action === 'discarded' ? 'destructive' : 'default'}>
 {action === 'consumed' ? l.confirmConsume : action === 'cooked' ? l.confirmCook : l.confirmDiscard}
 </Button>
 </div>
 </DialogContent>
 </Dialog>
 );
}
