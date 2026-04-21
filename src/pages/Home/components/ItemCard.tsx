import { KazaItem } from "@/types/kaza";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Clock,
  Package,
  Droplets,
  Apple,
  Carrot,
  Drumstick,
  Milk,
  Snowflake,
  Scale,
  Edit3,
  Refrigerator
} from "lucide-react";

import { useKaza } from "@/contexts/KazaContext";

interface ItemCardProps {
  item: KazaItem;
  onConsume?: (item: KazaItem) => void;
  onEdit?: (item: KazaItem) => void;
  onRefreeze?: (item: KazaItem) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  fruit: Apple,
  vegetable: Carrot,
  meat: Drumstick,
  dairy: Milk,
  frozen: Snowflake,
  cleaning: Droplets,
  pantry: Package,
  cooked: Drumstick,
  beverage: Droplets,
  hygiene: Package
};

const maturationColors = {
  green: "bg-fresh text-fresh-foreground",
  ripe: "bg-warning text-warning-foreground",
  "very-ripe": "bg-ripe text-ripe-foreground",
  overripe: "bg-destructive text-destructive-foreground"
};

const maturationLabelsMap = {
  "pt-BR": {
    green: "Verde",
    ripe: "Maduro",
    "very-ripe": "Muito Maduro",
    overripe: "Passado"
  },
  en: {
    green: "Green",
    ripe: "Ripe",
    "very-ripe": "Very Ripe",
    overripe: "Overripe"
  },
  es: {
    green: "Verde",
    ripe: "Maduro",
    "very-ripe": "Muy Maduro",
    overripe: "Pasado"
  }
};

const statusLabels = {
  "pt-BR": { expired: "Vencido", low: "Baixo" },
  en: { expired: "Expired", low: "Low" },
  es: { expired: "Vencido", low: "Bajo" }
};

export function ItemCard({ item, onConsume, onEdit, onRefreeze }: ItemCardProps) {
  const { language } = useLanguage();
  const { defrostItem } = useKaza();
  const Icon = categoryIcons[item.category] || Package;
  const matLabels = maturationLabelsMap[language];
  const sLabels = statusLabels[language];

  const getDaysUntilExpiry = () => {
    if (!item.expirationDate) return null;
    const now = new Date();
    const expiry = new Date(item.expirationDate);
    return Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const daysUntilExpiry = getDaysUntilExpiry();
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 3;
  const isExpired = daysUntilExpiry !== null && daysUntilExpiry <= 0;

  return (
    <div
      onClick={() => onConsume?.(item)}
      className={cn(
        "rounded-2xl border bg-white/80 dark:bg-white/5 backdrop-blur-xl border-black/[0.04] dark:border-white/[0.06] p-3 transition-all duration-200 shadow-sm",
        "cursor-pointer active:scale-[0.97]",
        isExpired && "border-destructive/30 bg-destructive/5"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ">
          <Icon className="h-5 w-5 text-secondary-foreground" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {item.name}
          </h3>
          <p className="text-xs font-medium text-muted-foreground">
            {item.quantity} {item.unit}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onEdit && (
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(item); }}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all active:scale-90 hover:bg-muted"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
          )}
          {onRefreeze && (
            <button
              onClick={(e) => { e.stopPropagation(); onRefreeze(item); }}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 transition-all active:scale-90"
              title={language === 'pt-BR' ? 'Recongelar' : 'Re-freeze'}
            >
              <Snowflake className="h-3.5 w-3.5" />
            </button>
          )}
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Scale className="h-4 w-4" />
          </div>
        </div>
      </div>

      {item.location === "freezer" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            defrostItem(item.id);
          }}
          className="mt-1.5 ml-[52px] flex items-center gap-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-700 dark:text-cyan-400 transition-all active:scale-[0.97]"
        >
          <Snowflake className="h-2.5 w-2.5" />
          {language === "pt-BR" ? "Descongelar" : "Defrost"}
        </button>
      )}

      {(item.maturation ||
        daysUntilExpiry !== null ||
        (item.minStock && item.quantity <= item.minStock)) && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5 pl-[52px]">
          {item.maturation && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                maturationColors[item.maturation]
              )}
            >
              {matLabels[item.maturation]}
            </span>
          )}
          {daysUntilExpiry !== null && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5",
                isExpired
                  ? "bg-destructive/15 text-destructive"
                  : isExpiringSoon
                  ? "bg-warning/15 text-warning"
                  : "bg-muted/50 text-muted-foreground"
              )}
            >
              <Clock className="h-3 w-3" />
              <span className="text-[10px] font-bold">
                {isExpired ? sLabels.expired : `${daysUntilExpiry}d`}
              </span>
            </div>
          )}
          {item.minStock && item.quantity <= item.minStock && (
            <div className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-primary">
              <Package className="h-3 w-3" />
              <span className="text-[10px] font-bold">{sLabels.low}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
