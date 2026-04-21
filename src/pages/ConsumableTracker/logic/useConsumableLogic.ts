import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaza } from '@/contexts/KazaContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { ConsumableItem } from '@/types/kaza';

export const INTERVAL_FACTORS = {
    daily: 1,
    weekly: 7,
    fortnightly: 14,
    monthly: 30
};

export const ICON_OPTIONS = [
    '🧻', '🧺', '🧴', '🧼', '🪥', '🧽', '🫧', '🪣',
    '🧹', '🪒', '💊', '🩹', '🩺', '🧪', '🪤', '📦',
    '🧃', '🥤', '🧊', '🕯️', '💡', '🔋', '🗑️', '🛁',
];

export const LABELS = {
    'pt-BR': {
        title: 'Consumíveis',
        consumptionLogged: 'Consumo registrado!',
        restocked: 'Estoque atualizado!',
        save: 'Salvo!',
        addedToList: 'adicionado à lista',
        itemAdded: 'Item adicionado!',
        newItem: 'Novo Item',
        chooseIcon: 'Escolha um ícone',
        itemName: 'Nome do item',
        currentStock: 'Estoque atual',
        unit: 'Unidade',
        dailyUse: 'Consumo por período',
        perPerson: 'por pessoa',
        daily: 'Por dia',
        weekly: 'Por semana',
        fortnightly: 'Por quinzena',
        monthly: 'Por mês',
        dailyTotal: 'Total diário',
        people: 'pessoas',
        minStock: 'Estoque mínimo',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        deleteItem: 'Remover',
        customAmount: 'Quantidade personalizada',
        howItWorks: 'Como funciona?',
        howItWorksDesc: 'O Kaza calcula automaticamente quando seu estoque vai acabar com base no consumo diário e número de moradores.',
        showHidden: 'Mostrar ocultos',
        daysLeft: 'd',
        debit: 'Usar',
        restock: 'Repor',
        addItem: 'Adicionar item',
        editItem: 'Editar item',
        ok: 'OK',
        warning: 'Atenção',
        danger: 'Urgente',
    },
    'en': {
        title: 'Consumables',
        consumptionLogged: 'Consumption logged!',
        restocked: 'Stock updated!',
        save: 'Saved!',
        addedToList: 'added to list',
        itemAdded: 'Item added!',
        newItem: 'New Item',
        chooseIcon: 'Choose an icon',
        itemName: 'Item name',
        currentStock: 'Current stock',
        unit: 'Unit',
        dailyUse: 'Consumption per period',
        perPerson: 'per person',
        daily: 'Per day',
        weekly: 'Per week',
        fortnightly: 'Fortnightly',
        monthly: 'Per month',
        dailyTotal: 'Daily total',
        people: 'people',
        minStock: 'Minimum stock',
        cancel: 'Cancel',
        confirm: 'Confirm',
        deleteItem: 'Remove',
        customAmount: 'Custom amount',
        howItWorks: 'How does it work?',
        howItWorksDesc: 'Kaza automatically calculates when your stock will run out based on daily consumption and number of residents.',
        showHidden: 'Show hidden',
        daysLeft: 'd',
        debit: 'Use',
        restock: 'Restock',
        addItem: 'Add item',
        editItem: 'Edit item',
        ok: 'OK',
        warning: 'Warning',
        danger: 'Urgent',
    },
    'es': {
        title: 'Consumibles',
        consumptionLogged: '¡Consumo registrado!',
        restocked: '¡Stock actualizado!',
        save: '¡Guardado!',
        addedToList: 'agregado a la lista',
        itemAdded: '¡Artículo agregado!',
        newItem: 'Nuevo artículo',
        chooseIcon: 'Elige un ícono',
        itemName: 'Nombre del artículo',
        currentStock: 'Stock actual',
        unit: 'Unidad',
        dailyUse: 'Consumo por período',
        perPerson: 'por persona',
        daily: 'Por día',
        weekly: 'Por semana',
        fortnightly: 'Por quincena',
        monthly: 'Por mes',
        dailyTotal: 'Total diario',
        people: 'personas',
        minStock: 'Stock mínimo',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        deleteItem: 'Eliminar',
        customAmount: 'Cantidad personalizada',
        howItWorks: '¿Cómo funciona?',
        howItWorksDesc: 'Kaza calcula automáticamente cuándo se agotará tu stock según el consumo diario y el número de residentes.',
        showHidden: 'Mostrar ocultos',
        daysLeft: 'd',
        debit: 'Usar',
        restock: 'Reponer',
        addItem: 'Agregar artículo',
        editItem: 'Editar artículo',
        ok: 'OK',
        warning: 'Atención',
        danger: 'Urgente',
    },
} as const;

export function useConsumableLogic() {
    const navigate = useNavigate();
    const {
        addToShoppingList,
        onboardingData,
        consumables,
        addConsumable,
        updateConsumable,
        removeConsumable
    } = useKaza();
    const { language } = useLanguage();
    const { isMultiPro } = useSubscription();
    const residents = onboardingData?.residents || 2;
    const l = LABELS[language as keyof typeof LABELS] || LABELS['pt-BR'];

    const [screen, setScreen] = useState<'list' | 'add' | 'edit' | 'custom'>('list');
    const [hideMissing, setHideMissing] = useState(false);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    
    const [newItem, setNewItem] = useState({ 
        name: '', 
        icon: '📦', 
        dailyConsumption: '1', 
        unit: 'unidades', 
        currentStock: '10', 
        minStock: '2', 
        usageInterval: 'daily' as ConsumableItem['usageInterval'] 
    });

    const [customAction, setCustomAction] = useState<{ id: string; type: 'debit' | 'restock' } | null>(null);
    const [customAmount, setCustomAmount] = useState('1');

    const [editItem, setEditItem] = useState<ConsumableItem | null>(null);
    const [editIcon, setEditIcon] = useState('');
    const [editDailyConsumption, setEditDailyConsumption] = useState('');
    const [editUsageInterval, setEditUsageInterval] = useState<ConsumableItem['usageInterval']>('daily');
    const [editMinStock, setEditMinStock] = useState('');
    const [editName, setEditName] = useState('');

    const parseFormattedNumber = (val: string): number => {
        if (!val) return 0;
        return parseFloat(val.replace(',', '.')) || 0;
    };

    const handleNumericInput = (val: string, setter: (v: string) => void) => {
        const sanitized = val.replace(/[^0-9.,]/g, '');
        const dots = (sanitized.match(/[.,]/g) || []).length;
        if (dots <= 1) {
            setter(sanitized);
        }
    };

    const calculateDaysUntilEmpty = useCallback((item: ConsumableItem) => {
        const factor = INTERVAL_FACTORS[item.usageInterval || 'daily'];
        const totalDailyUse = (item.dailyConsumption / factor) * residents;
        if (totalDailyUse <= 0) return Infinity;
        const days = item.currentStock / totalDailyUse;
        return days === Infinity ? Infinity : Math.floor(days);
    }, [residents]);

    const getAlertLevel = (daysLeft: number): 'ok' | 'warning' | 'danger' => {
        if (daysLeft <= 3) return 'danger';
        if (daysLeft <= 7) return 'warning';
        return 'ok';
    };

    const handleDebit = (id: string, amount?: number) => {
        const item = consumables.find(i => i.id === id);
        if (item) {
            const debitAmount = amount ?? item.dailyConsumption;
            updateConsumable(id, { currentStock: Math.max(0, item.currentStock - debitAmount) });
            toast.success(l.consumptionLogged);
        }
    };

    const handleAddStock = (id: string, amount: number) => {
        const item = consumables.find(i => i.id === id);
        if (item) {
            updateConsumable(id, { currentStock: item.currentStock + amount });
            toast.success(l.restocked);
        }
    };

    const handleCustomConfirm = () => {
        if (!customAction) return;
        const amt = parseFormattedNumber(customAmount);
        if (Number.isNaN(amt) || amt <= 0) return;
        if (customAction.type === 'debit') handleDebit(customAction.id, amt);
        else handleAddStock(customAction.id, amt);
        setCustomAction(null);
        setCustomAmount('1');
        setScreen('list');
    };

    const handleSaveEdit = () => {
        if (!editItem) return;
        const newDaily = editDailyConsumption === '' ? editItem.dailyConsumption : parseFormattedNumber(editDailyConsumption);
        const newMin = editMinStock === '' ? editItem.minStock : parseFormattedNumber(editMinStock);
        
        updateConsumable(editItem.id, {
            name: editName || editItem.name,
            icon: editIcon || editItem.icon,
            dailyConsumption: newDaily,
            usageInterval: editUsageInterval,
            minStock: newMin,
        });
        
        setEditItem(null);
        setScreen('list');
        toast.success(l.save);
    };

    const openEdit = (item: ConsumableItem) => {
        setEditItem(item);
        setEditName(item.name);
        setEditIcon(item.icon);
        setEditDailyConsumption(String(item.dailyConsumption).replace('.', ','));
        setEditUsageInterval(item.usageInterval || 'daily');
        setEditMinStock(String(item.minStock).replace('.', ','));
        setScreen('edit');
    };

    const handleDelete = (id: string) => {
        removeConsumable(id);
        setScreen('list');
        toast.success(language === 'pt-BR' ? 'Item removido!' : 'Item removed!');
    };

    const handleAddToShopping = (item: ConsumableItem) => {
        addToShoppingList({ 
            name: item.name, 
            quantity: item.minStock * 2, 
            unit: item.unit, 
            category: 'hygiene', 
            store: 'market' 
        });
        toast.success(`${item.name} ${l.addedToList}`);
    };

    const toggleHideItem = (id: string) => {
        const item = consumables.find(i => i.id === id);
        if (item) {
            updateConsumable(id, { hidden: !item.hidden } as any);
        }
    };

    const handleAddNewItem = () => {
        const newConsumable: Omit<ConsumableItem, 'id'> = {
            name: newItem.name, 
            icon: newItem.icon,
            category: 'other',
            currentStock: parseFormattedNumber(newItem.currentStock), 
            unit: newItem.unit,
            dailyConsumption: parseFormattedNumber(newItem.dailyConsumption), 
            usageInterval: newItem.usageInterval,
            minStock: parseFormattedNumber(newItem.minStock),
        };
        addConsumable(newConsumable);
        setNewItem({ 
            name: '', 
            icon: '📦', 
            dailyConsumption: '1', 
            unit: 'unidades', 
            currentStock: '10', 
            minStock: '2', 
            usageInterval: 'daily' 
        });
        setScreen('list');
        toast.success(l.itemAdded);
    };

    return {
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
    };
}
