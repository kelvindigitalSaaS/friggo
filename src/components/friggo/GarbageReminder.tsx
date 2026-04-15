import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFriggo } from "@/contexts/FriggoContext";
import {
  Trash2,
  Bell,
  Clock,
  MapPin,
  Calendar,
  Check,
  Building2,
  Home
} from "lucide-react";
import { toast } from "sonner";

interface GarbageReminderProps {
  open: boolean;
  onClose: () => void;
}

const WEEKDAYS = {
  "pt-BR": [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ],
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
};

export function GarbageReminder({ open, onClose }: GarbageReminderProps) {
  const { language } = useLanguage();
  const { onboardingData } = useFriggo();

  const [enabled, setEnabled] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 4]); // Monday and Thursday
  const [reminderTime, setReminderTime] = useState("20:00");
  const [garbageLocation, setGarbageLocation] = useState<"street" | "building">(
    "street"
  );
  const [buildingFloor, setBuildingFloor] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("friggo-garbage-reminder");
    if (saved) {
      const data = JSON.parse(saved);
      setEnabled(data.enabled ?? false);
      setSelectedDays(data.selectedDays ?? [1, 4]);
      setReminderTime(data.reminderTime ?? "20:00");
      setGarbageLocation(data.garbageLocation ?? "street");
      setBuildingFloor(data.buildingFloor ?? "");
    }
  }, []);

  const labels = {
    "pt-BR": {
      title: "Lembrete do Lixo",
      subtitle: "Nunca mais esqueça de colocar o lixo para fora",
      enableReminder: "Ativar Lembrete",
      enableDesc: "Receba um aviso na noite anterior",
      collectionDays: "Dias de Coleta",
      selectDays: "Selecione os dias que o lixeiro passa",
      reminderTime: "Horário do Lembrete",
      location: "Local do Lixo",
      street: "Rua (Colocar para fora)",
      building: "Prédio (Descer ao lixo)",
      floor: "Andar do Apartamento",
      floorPlaceholder: "Ex: 5º andar",
      save: "Salvar",
      nextReminder: "Próximo lembrete",
      tonight: "Hoje à noite!",
      tomorrow: "Amanhã à noite",
      in: "Em",
      days: "dias",
      reminderMsg: "Não esqueça de colocar o lixo para fora!",
      reminderMsgBuilding: "Não esqueça de descer o lixo!"
    },
    en: {
      title: "Garbage Reminder",
      subtitle: "Never forget to take out the trash",
      enableReminder: "Enable Reminder",
      enableDesc: "Get notified the night before",
      collectionDays: "Collection Days",
      selectDays: "Select the days garbage is collected",
      reminderTime: "Reminder Time",
      location: "Garbage Location",
      street: "Street (Take outside)",
      building: "Building (Take to garbage room)",
      floor: "Apartment Floor",
      floorPlaceholder: "Ex: 5th floor",
      save: "Save",
      nextReminder: "Next reminder",
      tonight: "Tonight!",
      tomorrow: "Tomorrow night",
      in: "In",
      days: "days",
      reminderMsg: "Don't forget to take out the trash!",
      reminderMsgBuilding: "Don't forget to take the trash down!"
    },
    es: {
      title: "Recordatorio de Basura",
      subtitle: "Nunca más olvides sacar la basura",
      enableReminder: "Activar Recordatorio",
      enableDesc: "Recibe un aviso la noche anterior",
      collectionDays: "Días de Recolección",
      selectDays: "Selecciona los días de recolección",
      reminderTime: "Hora del Recordatorio",
      location: "Ubicación de la Basura",
      street: "Calle (Sacar afuera)",
      building: "Edificio (Bajar a la basura)",
      floor: "Piso del Apartamento",
      floorPlaceholder: "Ej: 5º piso",
      save: "Guardar",
      nextReminder: "Próximo recordatorio",
      tonight: "¡Esta noche!",
      tomorrow: "Mañana por la noche",
      in: "En",
      days: "días",
      reminderMsg: "¡No olvides sacar la basura!",
      reminderMsgBuilding: "¡No olvides bajar la basura!"
    }
  };

  const l = labels[language];
  const weekdays = WEEKDAYS[language];
  const isApartment = onboardingData?.homeType === "apartment";

  const toggleDay = (dayIndex: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex].sort()
    );
  };

  const getNextReminderInfo = () => {
    if (selectedDays.length === 0) return null;

    const today = new Date();
    const currentDay = today.getDay();
    const currentHour = today.getHours();
    const reminderHour = parseInt(reminderTime.split(":")[0]);

    // Find the next collection day
    let daysUntilCollection = Infinity;

    for (const day of selectedDays) {
      // Collection is on this day, so reminder is night before
      const reminderDay = day === 0 ? 6 : day - 1;
      let diff = reminderDay - currentDay;

      if (diff < 0) diff += 7;
      if (diff === 0 && currentHour >= reminderHour) diff = 7;

      if (diff < daysUntilCollection) {
        daysUntilCollection = diff;
      }
    }

    if (daysUntilCollection === 0) return l.tonight;
    if (daysUntilCollection === 1) return l.tomorrow;
    return `${l.in} ${daysUntilCollection} ${l.days}`;
  };

  const handleSave = () => {
    const data = {
      enabled,
      selectedDays,
      reminderTime,
      garbageLocation,
      buildingFloor
    };
    localStorage.setItem("friggo-garbage-reminder", JSON.stringify(data));

    const successMsg = {
      "pt-BR": "Lembrete configurado!",
      en: "Reminder configured!",
      es: "¡Recordatorio configurado!"
    };
    toast.success(successMsg[language]);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <Trash2 className="h-5 w-5 text-primary" />
            {l.title}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)]">
          <div className="space-y-4 px-4 py-5 pb-10">
            {/* Enable/Disable */}
            <Card>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label className="font-medium">{l.enableReminder}</Label>
                    <p className="text-xs text-gray-500">{l.enableDesc}</p>
                  </div>
                </div>
                <Switch checked={enabled} onCheckedChange={setEnabled} />
              </CardContent>
            </Card>

            {enabled && (
              <>
                {/* Collection Days */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Calendar className="h-4 w-4 text-primary" />
                      {l.collectionDays}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-xs text-gray-500">{l.selectDays}</p>
                    <div className="flex flex-wrap gap-2">
                      {weekdays.map((day, index) => (
                        <button
                          key={index}
                          onClick={() => toggleDay(index)}
                          className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all active:scale-95 ${
                            selectedDays.includes(index)
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-muted text-gray-500 hover:bg-muted/80"
                          }`}
                        >
                          {selectedDays.includes(index) && (
                            <Check className="h-3 w-3" />
                          )}
                          {day.substring(0, 3)}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reminder Time */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Clock className="h-4 w-4 text-primary" />
                      {l.reminderTime}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="w-full h-12 bg-muted/50 border-none rounded-md text-base font-medium px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </CardContent>
                </Card>

                {/* Location */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <MapPin className="h-4 w-4 text-primary" />
                      {l.location}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setGarbageLocation("street")}
                        className={`flex flex-1 flex-col items-center gap-2 rounded-md border-2 p-4 transition-all active:scale-95 ${
                          garbageLocation === "street"
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <Home className="h-6 w-6" />
                        <span className="text-xs font-medium text-center">
                          {l.street}
                        </span>
                      </button>
                      <button
                        onClick={() => setGarbageLocation("building")}
                        className={`flex flex-1 flex-col items-center gap-2 rounded-md border-2 p-4 transition-all active:scale-95 ${
                          garbageLocation === "building"
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <Building2 className="h-6 w-6" />
                        <span className="text-xs font-medium text-center">
                          {l.building}
                        </span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Reminder */}
                {selectedDays.length > 0 && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-primary/10 p-2">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {l.nextReminder}
                            </p>
                            <p className="text-xs text-gray-500">
                              {garbageLocation === "street"
                                ? l.reminderMsg
                                : l.reminderMsgBuilding}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary"
                        >
                          {getNextReminderInfo()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            <Button
              onClick={handleSave}
              className="w-full rounded-md py-6 font-bold"
            >
              {l.save}
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
