import { AlertTriangle, Clock, Package, Leaf, X } from 'lucide-react';
import { Alert } from '@/types/friggo';
import { cn } from '@/lib/utils';

interface AlertCardProps {
 alert: Alert;
 onDismiss: () => void;
}

const alertConfig = {
 expiring: {
 icon: Clock,
 bgClass: 'bg-warning/10',
 borderClass: 'border-warning/30',
 iconClass: 'text-warning',
 },
 'low-stock': {
 icon: Package,
 bgClass: 'bg-primary/10',
 borderClass: 'border-primary/30',
 iconClass: 'text-primary',
 },
 overripe: {
 icon: Leaf,
 bgClass: 'bg-ripe/10',
 borderClass: 'border-ripe/30',
 iconClass: 'text-ripe',
 },
 'consume-today': {
 icon: AlertTriangle,
 bgClass: 'bg-destructive/10',
 borderClass: 'border-destructive/30',
 iconClass: 'text-destructive',
 },
};

export function AlertCard({ alert, onDismiss }: AlertCardProps) {
 const config = alertConfig[alert.type];
 const Icon = config.icon;

 return (
 <div
 className={cn(
 'flex items-start gap-3 rounded-2xl border p-3 transition-all duration-200',
 config.bgClass,
 config.borderClass
 )}
 >
 <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', config.bgClass)}>
 <Icon className={cn('h-4 w-4', config.iconClass)} />
 </div>
 <div className="min-w-0 flex-1 pt-0.5">
 <p className="text-sm font-medium leading-snug text-foreground">{alert.message}</p>
 <p className="mt-0.5 text-xs text-muted-foreground">{alert.itemName}</p>
 </div>
 <button
 onClick={onDismiss}
 className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors active:bg-muted"
 >
 <X className="h-3.5 w-3.5" />
 </button>
 </div>
 );
}
