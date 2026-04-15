import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Refrigerator,
  ShoppingCart,
  ChefHat,
  Bell,
  TrendingDown,
  Mic,
  Smartphone,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface AppTutorialProps {
  open: boolean;
  onClose: () => void;
}

export function AppTutorial({ open, onClose }: AppTutorialProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const labels = {
    "pt-BR": {
    title: "Como usar o Kaza",
      subtitle: "Guia completo do aplicativo",
      next: "Próximo",
      previous: "Anterior",
      finish: "Começar!",
      features: [
        {
          icon: Refrigerator,
          title: "Controle de Estoque",
          description:
            "Cadastre todos os itens da sua geladeira, freezer e dispensa. O app rastreia validades e te avisa quando algo está para vencer.",
          tips: [
            "Use o scanner de código de barras para adicionar rapidamente",
            "Configure o estoque mínimo para receber alertas",
            "Marque a data de abertura para alimentos perecíveis"
          ]
        },
        {
          icon: TrendingDown,
          title: "Rastreamento de Consumíveis",
          description:
            "Acompanhe itens de uso diário como papel higiênico, detergente e produtos de limpeza. O app calcula quando você precisa comprar novamente.",
          tips: [
            "Configure o consumo diário por pessoa",
            "Debite o uso todas as noites",
            "Receba alertas de reposição automáticos"
          ]
        },
        {
          icon: ShoppingCart,
          title: "Lista de Compras Inteligente",
          description:
            "Crie listas de compras organizadas por loja (mercado, feira, farmácia). Compartilhe com familiares e marque itens comprados.",
          tips: [
            "Itens são adicionados automaticamente quando estoque baixo",
            "Compartilhe via WhatsApp ou link",
            "Organize por categorias"
          ]
        },
        {
          icon: ChefHat,
          title: "Receitas com IA",
          description:
            "Gere receitas personalizadas baseadas nos ingredientes que você tem em casa. Prioriza itens que estão perto de vencer.",
          tips: [
            "Selecione o tipo de receita desejada",
            "Salve suas receitas favoritas",
            "Veja tempo de preparo e porções"
          ]
        },
        {
          icon: Bell,
          title: "Alertas e Lembretes",
          description:
            "Receba notificações de vencimento, estoque baixo, e até lembretes do lixo na noite anterior à coleta.",
          tips: [
            "Configure os dias de coleta do lixo",
            "Ajuste quantos dias antes do vencimento alertar",
            "Ative o check-up noturno"
          ]
        },
        
      ]
    },
    en: {
      title: "How to use Kaza",
      subtitle: "Complete app guide",
      next: "Next",
      previous: "Previous",
      finish: "Get Started!",
      features: [
        {
          icon: Refrigerator,
          title: "Inventory Control",
          description:
            "Register all items from your fridge, freezer, and pantry. The app tracks expiration dates and alerts you when something is about to expire.",
          tips: [
            "Use barcode scanner to add items quickly",
            "Set minimum stock to receive alerts",
            "Mark opening date for perishables"
          ]
        },
        {
          icon: TrendingDown,
          title: "Consumables Tracking",
          description:
            "Track daily use items like toilet paper, detergent, and cleaning products. The app calculates when you need to buy again.",
          tips: [
            "Set daily consumption per person",
            "Log usage every night",
            "Receive automatic replenishment alerts"
          ]
        },
        {
          icon: ShoppingCart,
          title: "Smart Shopping List",
          description:
            "Create shopping lists organized by store (supermarket, farmer's market, pharmacy). Share with family and mark purchased items.",
          tips: [
            "Items are added automatically when stock is low",
            "Share via WhatsApp or link",
            "Organize by categories"
          ]
        },
        {
          icon: ChefHat,
          title: "AI Recipes",
          description:
            "Generate personalized recipes based on ingredients you have at home. Prioritizes items close to expiration.",
          tips: [
            "Select the desired recipe type",
            "Save your favorite recipes",
            "View prep time and servings"
          ]
        },
        {
          icon: Bell,
          title: "Alerts and Reminders",
          description:
            "Receive expiration notifications, low stock alerts, and even garbage reminders the night before collection.",
          tips: [
            "Set garbage collection days",
            "Adjust how many days before expiration to alert",
            "Enable nightly check-up"
          ]
        },
        
      ]
    },
    es: {
      title: "Cómo usar Kaza",
      subtitle: "Guía completa de la aplicación",
      next: "Siguiente",
      previous: "Anterior",
      finish: "¡Comenzar!",
      features: [
        {
          icon: Refrigerator,
          title: "Control de Inventario",
          description:
            "Registra todos los artículos de tu nevera, congelador y despensa. La app rastrea las fechas de vencimiento y te avisa cuando algo está por caducar.",
          tips: [
            "Usa el escáner de código de barras para agregar rápido",
            "Configura el stock mínimo para recibir alertas",
            "Marca la fecha de apertura para perecederos"
          ]
        },
        {
          icon: TrendingDown,
          title: "Seguimiento de Consumibles",
          description:
            "Sigue artículos de uso diario como papel higiénico, detergente y productos de limpieza. La app calcula cuándo necesitas comprar de nuevo.",
          tips: [
            "Configura el consumo diario por persona",
            "Registra el uso cada noche",
            "Recibe alertas automáticas de reposición"
          ]
        },
        {
          icon: ShoppingCart,
          title: "Lista de Compras Inteligente",
          description:
            "Crea listas de compras organizadas por tienda (supermercado, mercado, farmacia). Comparte con familia y marca artículos comprados.",
          tips: [
            "Los artículos se agregan automáticamente cuando hay poco stock",
            "Comparte por WhatsApp o enlace",
            "Organiza por categorías"
          ]
        },
        {
          icon: ChefHat,
          title: "Recetas con IA",
          description:
            "Genera recetas personalizadas basadas en los ingredientes que tienes en casa. Prioriza los que están por vencer.",
          tips: [
            "Selecciona el tipo de receta deseada",
            "Guarda tus recetas favoritas",
            "Ve tiempo de preparación y porciones"
          ]
        },
        {
          icon: Bell,
          title: "Alertas y Recordatorios",
          description:
            "Recibe notificaciones de vencimiento, stock bajo, y recordatorios de basura la noche antes de la recolección.",
          tips: [
            "Configura los días de recolección de basura",
            "Ajusta cuántos días antes alertar",
            "Activa el chequeo nocturno"
          ]
        },
        
      ]
    }
  };

  const l = labels[language];
  const feature = l.features[currentStep];
  const Icon = feature.icon;
  const totalSteps = l.features.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <SheetHeader className="border-b border-gray-200 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <Sparkles className="h-5 w-5 text-primary" />
            {l.title}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)]">
          <div className="space-y-6 px-6 py-5 pb-10">
            {/* Progress Dots */}
            <div className="flex justify-center gap-2">
              {l.features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            {/* Feature Icon */}
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl shadow-sm">
                <Icon className="h-12 w-12 text-primary" />
              </div>
            </div>

            {/* Feature Title */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                {feature.title}
              </h2>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>

            {/* Tips */}
            <div className="space-y-3">
              {feature.tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-md bg-card border border-border p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-fresh" />
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              {currentStep > 0 && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex-1 rounded-md py-6"
                >
                  {l.previous}
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 gap-2 rounded-md py-6 font-bold"
              >
                {currentStep === totalSteps - 1 ? l.finish : l.next}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Step Counter */}
            <p className="text-center text-sm text-gray-500">
              {currentStep + 1} / {totalSteps}
            </p>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
