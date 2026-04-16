# ATUALIZAÇÃO: Remove Install Guide → Entra Garbage Reminder

## RESUMO
- ❌ Remove: `InstallGuidePage.tsx`, `IOSInstallPrompt.tsx`, `AndroidInstallPrompt.tsx`, `PWAInstallGuide.tsx`
- ✅ Adiciona: Garbage Reminder setup no fluxo de onboarding
- ✅ Resultado: Usuário termina onboarding → já tem lembrete de lixo configurado

---

## PASSO 1: Atualizar Onboarding.tsx

No arquivo `src/components/friggo/Onboarding.tsx`, adicione o step de lixo:

```typescript
// ANTES:
const steps = [
  'welcome',
  'homeType',
  'residents',
  'fridge',
  ...(onboardingData?.fridgeType === 'smart' ? ['fridgeBrand'] : []),
  'coolingLevel',
  'habits',
  'notifications',
  'consumables',
  ...(!shouldSkipCpf ? ['cpf'] : []),
  ...(!shouldSkipName ? ['name'] : []),
  'personalize',
  'ready'
];

// DEPOIS:
const steps = [
  'welcome',
  'homeType',
  'residents',
  'fridge',
  ...(onboardingData?.fridgeType === 'smart' ? ['fridgeBrand'] : []),
  'coolingLevel',
  'habits',
  'notifications',
  'consumables',
  ...(!shouldSkipCpf ? ['cpf'] : []),
  ...(!shouldSkipName ? ['name'] : []),
  'garbageReminder',  // ← NOVO!
  'personalize',
  'ready'
];
```

---

## PASSO 2: Adicionar Labels do Garbage Reminder

No objeto `onboardingLabels` em `Onboarding.tsx`:

```typescript
const onboardingLabels = {
  'pt-BR': {
    // ... existing labels ...
    
    // NOVO - Garbage Reminder
    garbageReminder: "Lembrete do Lixo",
    garbageReminderDesc: "Configure quando você colocar o lixo para coleta",
    garbageEnabled: "Ativar lembrete",
    garbageDays: "Dias da coleta",
    garbageTime: "Horário do lembrete",
    garbageLocation: "Onde fica o lixo?",
    garbageFloor: "Andar/Referência (opcional)",
    monday: "Segunda",
    tuesday: "Terça",
    wednesday: "Quarta",
    thursday: "Quinta",
    friday: "Sexta",
    saturday: "Sábado",
    sunday: "Domingo",
    street: "Na rua",
    building: "No edifício",
    internal: "Interno (condomínio)",
  },
  'en': {
    // ... existing labels ...
    garbageReminder: "Garbage Reminder",
    garbageReminderDesc: "Set when you take out the trash",
    garbageEnabled: "Enable reminder",
    garbageDays: "Collection days",
    garbageTime: "Reminder time",
    garbageLocation: "Where is the trash?",
    garbageFloor: "Floor/Reference (optional)",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    street: "On the street",
    building: "In the building",
    internal: "Internal (condominium)",
  },
  'es': {
    // ... existing labels ...
    garbageReminder: "Recordatorio de Basura",
    garbageReminderDesc: "Configura cuándo sacas la basura",
    garbageEnabled: "Activar recordatorio",
    garbageDays: "Días de recolección",
    garbageTime: "Hora del recordatorio",
    garbageLocation: "¿Dónde está la basura?",
    garbageFloor: "Piso/Referencia (opcional)",
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
    street: "En la calle",
    building: "En el edificio",
    internal: "Interno (condominio)",
  }
};
```

---

## PASSO 3: Criar Componente GarbageReminderSetup

**Arquivo:** `src/components/friggo/GarbageReminderSetup.tsx`

```typescript
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Trash2, Bell } from 'lucide-react';

interface GarbageReminderSetupProps {
  onSubmit: (data: {
    enabled: boolean;
    selected_days: number[];
    reminder_time: string;
    garbage_location: string;
    building_floor?: string;
  }) => void;
  language: 'pt-BR' | 'en' | 'es';
}

const DAYS = [
  { id: 0, label: 'Sunday', labelPt: 'Domingo', labelEs: 'Domingo' },
  { id: 1, label: 'Monday', labelPt: 'Segunda', labelEs: 'Lunes' },
  { id: 2, label: 'Tuesday', labelPt: 'Terça', labelEs: 'Martes' },
  { id: 3, label: 'Wednesday', labelPt: 'Quarta', labelEs: 'Miércoles' },
  { id: 4, label: 'Thursday', labelPt: 'Quinta', labelEs: 'Jueves' },
  { id: 5, label: 'Friday', labelPt: 'Sexta', labelEs: 'Viernes' },
  { id: 6, label: 'Saturday', labelPt: 'Sábado', labelEs: 'Sábado' }
];

const LOCATIONS = [
  { id: 'street', label: 'On the street', labelPt: 'Na rua', labelEs: 'En la calle' },
  { id: 'building', label: 'In the building', labelPt: 'No edifício', labelEs: 'En el edificio' },
  { id: 'internal', label: 'Internal (condominium)', labelPt: 'Interno (condomínio)', labelEs: 'Interno (condominio)' }
];

export function GarbageReminderSetup({
  onSubmit,
  language
}: GarbageReminderSetupProps) {
  const [enabled, setEnabled] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 4]); // Default: Monday and Thursday
  const [reminderTime, setReminderTime] = useState('20:00');
  const [location, setLocation] = useState('street');
  const [floor, setFloor] = useState('');

  const getDayLabel = (day: typeof DAYS[0]) => {
    if (language === 'pt-BR') return day.labelPt;
    if (language === 'es') return day.labelEs;
    return day.label;
  };

  const getLocationLabel = (loc: typeof LOCATIONS[0]) => {
    if (language === 'pt-BR') return loc.labelPt;
    if (language === 'es') return loc.labelEs;
    return loc.label;
  };

  const toggleDay = (dayId: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId].sort()
    );
  };

  const handleSubmit = () => {
    onSubmit({
      enabled,
      selected_days: selectedDays,
      reminder_time: reminderTime,
      garbage_location: location,
      building_floor: floor || undefined
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-gradient-to-br from-amber-100 to-orange-100">
            <Trash2 className="w-8 h-8 text-amber-700" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'pt-BR'
            ? 'Lembrete do Lixo'
            : language === 'es'
              ? 'Recordatorio de Basura'
              : 'Garbage Reminder'}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          {language === 'pt-BR'
            ? 'Configure quando você coloca o lixo para coleta'
            : language === 'es'
              ? 'Configura cuándo sacas la basura'
              : 'Set when you take out the trash'}
        </p>
      </div>

      {/* Enable Toggle */}
      <div className="flex items-center gap-3 p-4 rounded-lg border border-amber-200 bg-amber-50">
        <Checkbox
          id="enable-reminder"
          checked={enabled}
          onCheckedChange={(checked) => setEnabled(checked as boolean)}
        />
        <label htmlFor="enable-reminder" className="flex-1 cursor-pointer">
          <p className="font-semibold text-gray-900">
            {language === 'pt-BR' ? 'Ativar lembrete' : language === 'es' ? 'Activar recordatorio' : 'Enable reminder'}
          </p>
          <p className="text-xs text-gray-600">
            {language === 'pt-BR'
              ? 'Você receberá notificações nos dias de coleta'
              : language === 'es'
                ? 'Recibirás notificaciones en los días de recolección'
                : 'You will receive notifications on collection days'}
          </p>
        </label>
      </div>

      {enabled && (
        <div className="space-y-6 animate-in fade-in">
          {/* Days Selection */}
          <div>
            <Label className="text-gray-700 font-semibold mb-3 block">
              {language === 'pt-BR'
                ? 'Dias da coleta'
                : language === 'es'
                  ? 'Días de recolección'
                  : 'Collection days'}
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {DAYS.map((day) => (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={`p-2 text-center rounded-lg text-sm font-semibold transition-all ${
                    selectedDays.includes(day.id)
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {getDayLabel(day).slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Reminder Time */}
          <div>
            <Label htmlFor="reminder-time" className="text-gray-700 font-semibold">
              {language === 'pt-BR'
                ? 'Horário do lembrete'
                : language === 'es'
                  ? 'Hora del recordatorio'
                  : 'Reminder time'}
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Bell className="w-5 h-5 text-amber-600" />
              <Input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {language === 'pt-BR'
                ? 'Notificação será enviada neste horário'
                : language === 'es'
                  ? 'Notificación se enviará en este momento'
                  : 'Notification will be sent at this time'}
            </p>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-gray-700 font-semibold">
              {language === 'pt-BR'
                ? 'Onde fica o lixo?'
                : language === 'es'
                  ? '¿Dónde está la basura?'
                  : 'Where is the trash?'}
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {getLocationLabel(loc)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Floor/Reference */}
          <div>
            <Label htmlFor="floor" className="text-gray-700 font-semibold">
              {language === 'pt-BR'
                ? 'Andar/Referência (opcional)'
                : language === 'es'
                  ? 'Piso/Referencia (opcional)'
                  : 'Floor/Reference (optional)'}
            </Label>
            <Input
              id="floor"
              type="text"
              placeholder={
                language === 'pt-BR'
                  ? 'Ex: Porta esquerda, Próximo ao portão'
                  : language === 'es'
                    ? 'Ej: Puerta izquierda, Junto a la puerta'
                    : 'Ex: Left door, Near the gate'
              }
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg font-semibold"
      >
        {language === 'pt-BR'
          ? 'Continuar'
          : language === 'es'
            ? 'Continuar'
            : 'Continue'}
      </Button>

      {/* Info */}
      <p className="text-xs text-gray-500 text-center">
        {language === 'pt-BR'
          ? 'Você pode alterar isso depois nas configurações'
          : language === 'es'
            ? 'Puedes cambiar esto más tarde en la configuración'
            : 'You can change this later in settings'}
      </p>
    </div>
  );
}
```

---

## PASSO 4: Atualizar lógica do Onboarding.tsx

Adicione este trecho na função principal:

```typescript
// Adicione no state
const [garbageReminderData, setGarbageReminderData] = useState({
  enabled: false,
  selected_days: [1, 4],
  reminder_time: '20:00',
  garbage_location: 'street',
  building_floor: undefined
});

// Na função handleNext(), adicione case para garbageReminder:
case 'garbageReminder':
  setGarbageReminderData({
    enabled: data.enabled,
    selected_days: data.selected_days,
    reminder_time: data.reminder_time,
    garbage_location: data.garbage_location,
    building_floor: data.building_floor
  });
  
  // Salvar no banco
  if (user && homeId) {
    const { error } = await supabase
      .from('garbage_reminders')
      .upsert({
        home_id: homeId,
        enabled: data.enabled,
        selected_days: data.selected_days,
        reminder_time: data.reminder_time,
        garbage_location: data.garbage_location,
        building_floor: data.building_floor
      }, { onConflict: 'home_id' });
    
    if (error) console.error('Error saving garbage reminder:', error);
  }
  break;
```

---

## PASSO 5: Renderizar o componente

No render do Onboarding, adicione:

```typescript
{currentStep === 'garbageReminder' && (
  <GarbageReminderSetup
    onSubmit={(data) => {
      setData((prev) => ({ ...prev, ...data }));
      handleNext();
    }}
    language={language}
  />
)}
```

---

## PASSO 6: Remover InstallGuide

1. **Delete:** `src/pages/InstallGuidePage.tsx`
2. **Delete:** `src/components/friggo/IOSInstallPrompt.tsx`
3. **Delete:** `src/components/friggo/AndroidInstallPrompt.tsx`
4. **Delete:** `src/components/friggo/PWAInstallGuide.tsx`

3. **Remova routes em `src/App.tsx`:**
```typescript
// Remove estas rotas:
// <Route path="/install-guide" element={<InstallGuidePage />} />
```

4. **Remova links/buttons que apontam para install guide**

---

## PASSO 7: Resultado Final

Novo fluxo de onboarding:

```
1. Bem-vindo
2. Tipo de casa
3. Residentes
4. Tipo de geladeira
5. (Se smart) Marca
6. Nível de resfriamento
7. Hábitos
8. Notificações
9. Consumíveis
10. (Se sem CPF) CPF
11. (Se sem nome) Nome
12. ✨ GARBAGE REMINDER ← NOVO!
13. Personalização (tema)
14. Pronto!
```

---

## PASSO 8: Testes

```typescript
// Testar se garbage_reminder foi criado
SELECT * FROM garbage_reminders WHERE home_id = 'seu-home-id';

// Deve retornar:
// {
//   enabled: true/false,
//   selected_days: [1,4],
//   reminder_time: '20:00',
//   garbage_location: 'street',
//   building_floor: null/string
// }
```

---

## RESULTADO

✅ **Antes:** Usuário terminava onboarding → vinha InstallGuide
❌ **Depois:** Usuário termina onboarding → já tem Garbage Reminder configurado

**Vantagem:** Usuário já recebe notificações automaticamente desde o início!

---

## CHECKLIST

- [ ] Atualizar steps em Onboarding.tsx
- [ ] Adicionar labels de garbage reminder
- [ ] Criar GarbageReminderSetup.tsx
- [ ] Adicionar lógica de salvamento do garbage reminder
- [ ] Renderizar GarbageReminderSetup no onboarding
- [ ] Deletar InstallGuidePage e componentes relacionados
- [ ] Remover rotas de install guide
- [ ] Testar fluxo completo
- [ ] Verificar se garbage_reminders foi criado no banco
