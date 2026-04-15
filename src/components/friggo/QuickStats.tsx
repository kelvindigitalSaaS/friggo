import { useKaza } from '@/contexts/KazaContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Package, AlertTriangle, ShoppingCart, Leaf } from 'lucide-react';

export function QuickStats() {
 const { items, alerts, shoppingList } = useKaza();
 const { language } = useLanguage();
 
 const labels = {
 'pt-BR': { inFridge: 'Na geladeira', expiresToday: 'Vence hoje', alerts: 'Alertas', toBuy: 'Comprar' },
 en: { inFridge: 'In fridge', expiresToday: 'Expires today', alerts: 'Alerts', toBuy: 'To buy' },
 es: { inFridge: 'En nevera', expiresToday: 'Vence hoy', alerts: 'Alertas', toBuy: 'Comprar' },
 };
 const l = labels[language];

 const fridgeItems = items.filter(i => i.location === 'fridge').length;
 const urgentAlerts = alerts.filter(a => a.priority === 'high').length;
 const shoppingCount = shoppingList.filter(i => !i.isCompleted).length;
 const expiringToday = items.filter(i => {
 if (!i.expirationDate) return false;
 const days = Math.ceil((new Date(i.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
 return days <= 1 && days >= 0;
 }).length;

 const stats = [
 { label: l.inFridge, value: fridgeItems, icon: Package, color: 'bg-primary/10 text-primary' },
 { label: l.expiresToday, value: expiringToday, icon: Leaf, color: 'bg-warning/10 text-warning' },
 { label: l.alerts, value: urgentAlerts, icon: AlertTriangle, color: 'bg-destructive/10 text-destructive' },
 { label: l.toBuy, value: shoppingCount, icon: ShoppingCart, color: 'bg-secondary text-secondary-foreground' },
 ];

 return (
 <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
 {stats.map((stat) => {
 const Icon = stat.icon;
 return (
 <div key={stat.label} className="flex items-center gap-3 rounded-md bg-white p-3 shadow-sm transition-all active:scale-95">
 <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${stat.color}`}>
 <Icon className="h-5 w-5" />
 </div>
 <div className="min-w-0">
 <span className="block text-lg font-bold leading-tight text-foreground">{stat.value}</span>
 <span className="block truncate text-[10px] leading-tight text-gray-500">{stat.label}</span>
 </div>
 </div>
 );
 })}
 </div>
 );
}
