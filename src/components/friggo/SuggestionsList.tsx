import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useFriggo } from '@/contexts/FriggoContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Plus, Sparkles } from 'lucide-react';
import { productDatabase, ProductSuggestion } from '@/data/productDatabase';
import { toast } from 'sonner';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SuggestionsListProps { open: boolean; onClose: () => void; }

const categoryGroups = {
 'pt-BR': [
 { id: 'essentials', label: '🥛 Essenciais', items: ['Leite', 'Ovos', 'Pão Francês', 'Manteiga', 'Arroz Branco', 'Feijão Carioca'] },
 { id: 'proteins', label: '🍖 Proteínas', items: ['Peito de Frango', 'Carne Moída', 'Ovos', 'Filé de Peixe'] },
 { id: 'veggies', label: '🥬 Hortifruti', items: ['Tomate', 'Cebola', 'Alho', 'Batata', 'Banana', 'Laranja', 'Alface'] },
 { id: 'cleaning', label: '🧹 Limpeza', items: ['Detergente', 'Sabão em Pó', 'Água Sanitária', 'Papel Higiênico'] },
 { id: 'hygiene', label: '🧴 Higiene', items: ['Shampoo', 'Sabonete', 'Pasta de Dente', 'Desodorante'] },
 ],
 en: [
 { id: 'essentials', label: '🥛 Essentials', items: ['Leite', 'Ovos', 'Pão Francês', 'Manteiga', 'Arroz Branco', 'Feijão Carioca'] },
 { id: 'proteins', label: '🍖 Proteins', items: ['Peito de Frango', 'Carne Moída', 'Ovos', 'Filé de Peixe'] },
 { id: 'veggies', label: '🥬 Produce', items: ['Tomate', 'Cebola', 'Alho', 'Batata', 'Banana', 'Laranja', 'Alface'] },
 { id: 'cleaning', label: '🧹 Cleaning', items: ['Detergente', 'Sabão em Pó', 'Água Sanitária', 'Papel Higiênico'] },
 { id: 'hygiene', label: '🧴 Hygiene', items: ['Shampoo', 'Sabonete', 'Pasta de Dente', 'Desodorante'] },
 ],
 es: [
 { id: 'essentials', label: '🥛 Esenciales', items: ['Leite', 'Ovos', 'Pão Francês', 'Manteiga', 'Arroz Branco', 'Feijão Carioca'] },
 { id: 'proteins', label: '🍖 Proteínas', items: ['Peito de Frango', 'Carne Moída', 'Ovos', 'Filé de Peixe'] },
 { id: 'veggies', label: '🥬 Verduras', items: ['Tomate', 'Cebola', 'Alho', 'Batata', 'Banana', 'Laranja', 'Alface'] },
 { id: 'cleaning', label: '🧹 Limpieza', items: ['Detergente', 'Sabão em Pó', 'Água Sanitária', 'Papel Higiênico'] },
 { id: 'hygiene', label: '🧴 Higiene', items: ['Shampoo', 'Sabonete', 'Pasta de Dente', 'Desodorante'] },
 ],
};

const sugLabels = {
 'pt-BR': { title: 'Sugestões de Compras', itemsFor: 'Itens mais comprados para', person: 'pessoa', people: 'pessoas', smartSuggestion: 'Sugestão Inteligente', basedOn: 'Baseada no seu padrão de consumo', analyzing: 'Analisando seu padrão de consumo...', allProducts: 'Todos os Produtos', addItems: 'Adicionar', item: 'item', items: 'itens', added: 'adicionado!', itemsAdded: 'itens adicionados!' },
 en: { title: 'Shopping Suggestions', itemsFor: 'Most bought items for', person: 'person', people: 'people', smartSuggestion: 'Smart Suggestion', basedOn: 'Based on your consumption pattern', analyzing: 'Analyzing your consumption pattern...', allProducts: 'All Products', addItems: 'Add', item: 'item', items: 'items', added: 'added!', itemsAdded: 'items added!' },
 es: { title: 'Sugerencias de Compras', itemsFor: 'Artículos más comprados para', person: 'persona', people: 'personas', smartSuggestion: 'Sugerencia Inteligente', basedOn: 'Basada en tu patrón de consumo', analyzing: 'Analizando tu patrón de consumo...', allProducts: 'Todos los Productos', addItems: 'Agregar', item: 'artículo', items: 'artículos', added: '¡agregado!', itemsAdded: '¡artículos agregados!' },
};

export function SuggestionsList({ open, onClose }: SuggestionsListProps) {
 const { addToShoppingList, shoppingList, onboardingData } = useFriggo();
 const { language } = useLanguage();
 const [selectedItems, setSelectedItems] = useState<string[]>([]);
 const l = sugLabels[language];
 const groups = categoryGroups[language];
 const residents = onboardingData?.residents || 2;

 const getProductFromDb = (name: string): ProductSuggestion | undefined => productDatabase.find(p => p.name === name);
 const isInList = (name: string) => shoppingList.some(item => item.name.toLowerCase() === name.toLowerCase()) || selectedItems.includes(name);
 const toggleItem = (name: string) => setSelectedItems(prev => prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]);

 const handleAddSelected = () => {
 selectedItems.forEach(name => {
 const product = getProductFromDb(name);
 if (product) {
 const adjustedQty = product.name === 'Leite' ? Math.ceil(residents * 0.5) : product.defaultQuantity;
 addToShoppingList({ name: product.name, category: 'pantry', quantity: adjustedQty, unit: product.unit, store: product.category });
 }
 });
 toast.success(`${selectedItems.length} ${l.itemsAdded}`);
 setSelectedItems([]);
 onClose();
 };

 const handleQuickAdd = (name: string) => {
 const product = getProductFromDb(name);
 if (product) {
 addToShoppingList({ name: product.name, category: 'pantry', quantity: product.defaultQuantity, unit: product.unit, store: product.category });
 toast.success(`${name} ${l.added}`);
 }
 };

 return (
 <Sheet open={open} onOpenChange={onClose}>
 <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
 <SheetHeader className="border-b border-gray-200 px-6 py-4">
 <SheetTitle className="flex items-center gap-2 text-lg font-bold">
 <Lightbulb className="h-5 w-5 text-primary" />{l.title}
 </SheetTitle>
 </SheetHeader>

 <ScrollArea className="h-[calc(90vh-80px)]">
 <div className="space-y-5 px-6 py-5 pb-10">
 <p className="text-sm text-gray-500">
 {l.itemsFor} {residents} {residents === 1 ? l.person : l.people}
 </p>

 <button
 className="flex w-full items-center gap-3 rounded-md p-4 text-left transition-all active:scale-[0.98]"
 onClick={() => toast.info(l.analyzing)}
 >
 <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/20"><Sparkles className="h-5 w-5 text-primary" /></div>
 <div className="flex-1">
 <p className="font-semibold text-foreground">{l.smartSuggestion}</p>
 <p className="text-sm text-gray-500">{l.basedOn}</p>
 </div>
 </button>

 {groups.map((group) => (
 <div key={group.id}>
 <h3 className="mb-3 text-sm font-semibold text-gray-500">{group.label}</h3>
 <div className="flex flex-wrap gap-2">
 {group.items.map((item) => {
 const inList = isInList(item);
 const isSelected = selectedItems.includes(item);
 return (
 <button key={item} onClick={() => inList && !isSelected ? null : toggleItem(item)} disabled={inList && !isSelected}
 className={cn('flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all active:scale-95',
 inList && !isSelected ? 'bg-muted/50 text-gray-500 opacity-50' : isSelected ? 'bg-primary text-primary-foreground' : 'bg-white border border-gray-200 text-foreground hover:bg-muted'
 )}
 >
 {item}{!inList && <Plus className="h-3.5 w-3.5" />}
 </button>
 );
 })}
 </div>
 </div>
 ))}

 <div>
 <h3 className="mb-3 text-sm font-semibold text-gray-500">📦 {l.allProducts} ({productDatabase.length})</h3>
 <div className="max-h-48 overflow-auto rounded-md border border-gray-200 bg-white">
 {productDatabase.map((product, index) => {
 const inList = isInList(product.name);
 return (
 <button key={index} onClick={() => !inList && handleQuickAdd(product.name)} disabled={inList}
 className={cn('flex w-full items-center justify-between p-3 text-left transition-colors',
 index < productDatabase.length - 1 && 'border-b border-gray-200',
 inList ? 'opacity-50' : 'hover:bg-muted active:bg-secondary'
 )}
 >
 <span className="font-medium text-foreground">{product.name}</span>
 <span className="text-xs text-gray-500">{product.category === 'market' ? '🛒' : product.category === 'fair' ? '🌿' : '💊'}</span>
 </button>
 );
 })}
 </div>
 </div>

 {selectedItems.length > 0 && (
 <Button onClick={handleAddSelected} className="w-full gap-2 rounded-md py-6 font-bold">
 <Plus className="h-5 w-5" />
 {l.addItems} {selectedItems.length} {selectedItems.length === 1 ? l.item : l.items}
 </Button>
 )}
 </div>
 </ScrollArea>
 </SheetContent>
 </Sheet>
 );
}
