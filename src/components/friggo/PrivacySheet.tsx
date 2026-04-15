import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Lock, Eye, Database, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface PrivacySheetProps { open: boolean; onClose: () => void; }

export function PrivacySheet({ open, onClose }: PrivacySheetProps) {
 const { language } = useLanguage();

 const labels = {
 'pt-BR': {
 title: 'Privacidade e Dados', dataCollected: 'Dados que coletamos',
 dataCollectedDesc: 'Coletamos informações sobre os itens que você adiciona (nome, quantidade, validade), suas preferências de notificação, e dados do seu perfil (nome, tipo de moradia). Não coletamos dados sensíveis ou financeiros.',
 howProtect: 'Como protegemos seus dados',
 howProtectDesc: 'Seus dados são armazenados em servidores seguros com criptografia de ponta a ponta. Utilizamos autenticação segura e não compartilhamos suas informações com terceiros.',
 dataUse: 'Uso dos dados',
 dataUseDesc: 'Usamos seus dados apenas para fornecer as funcionalidades do app: alertas de vencimento, sugestões de receitas, e lista de compras inteligente. Não vendemos seus dados.',
 yourRights: 'Seus Direitos (LGPD)',
 right1: 'Acessar seus dados pessoais', right2: 'Corrigir dados incompletos ou desatualizados',
 right3: 'Solicitar exclusão dos seus dados', right4: 'Exportar seus dados em formato portátil', right5: 'Revogar consentimento a qualquer momento',
 questionsAbout: 'Dúvidas sobre privacidade?', lastUpdate: 'Última atualização: Fevereiro de 2026',
 },
 en: {
 title: 'Privacy & Data', dataCollected: 'Data we collect',
 dataCollectedDesc: 'We collect information about items you add (name, quantity, expiry), your notification preferences, and profile data (name, home type). We do not collect sensitive or financial data.',
 howProtect: 'How we protect your data',
 howProtectDesc: 'Your data is stored on secure servers with end- encryption. We use secure authentication and do not share your information with third parties.',
 dataUse: 'Data usage',
 dataUseDesc: 'We use your data only to provide app features: expiry alerts, recipe suggestions, and smart shopping lists. We do not sell your data.',
 yourRights: 'Your Rights',
 right1: 'Access your personal data', right2: 'Correct incomplete or outdated data',
 right3: 'Request deletion of your data', right4: 'Export your data in portable format', right5: 'Revoke consent at any time',
 questionsAbout: 'Questions about privacy?', lastUpdate: 'Last update: February 2026',
 },
 es: {
 title: 'Privacidad y Datos', dataCollected: 'Datos que recopilamos',
 dataCollectedDesc: 'Recopilamos información sobre los artículos que agregas (nombre, cantidad, vencimiento), tus preferencias de notificación y datos de perfil (nombre, tipo de vivienda). No recopilamos datos sensibles o financieros.',
 howProtect: 'Cómo protegemos tus datos',
 howProtectDesc: 'Tus datos se almacenan en servidores seguros con cifrado de extremo a extremo. Usamos autenticación segura y no compartimos tu información con terceros.',
 dataUse: 'Uso de los datos',
 dataUseDesc: 'Usamos tus datos solo para proporcionar funciones de la app: alertas de vencimiento, sugerencias de recetas y lista de compras inteligente. No vendemos tus datos.',
 yourRights: 'Tus Derechos',
 right1: 'Acceder a tus datos personales', right2: 'Corrigir datos incompletos o desactualizados',
 right3: 'Solicitar eliminación de tus datos', right4: 'Exportar tus datos en formato portátil', right5: 'Revocar consentimiento en cualquier momento',
 questionsAbout: '¿Preguntas sobre privacidad?', lastUpdate: 'Última actualización: Febrero 2026',
 },
 };

 const l = labels[language];

 const sections = [
 { icon: Database, title: l.dataCollected, content: l.dataCollectedDesc },
 { icon: Lock, title: l.howProtect, content: l.howProtectDesc },
 { icon: Eye, title: l.dataUse, content: l.dataUseDesc },
 ];

 return (
 <Sheet open={open} onOpenChange={onClose}>
 <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
 <SheetHeader className="border-b border-gray-200 px-6 py-4">
 <SheetTitle className="flex items-center gap-2 text-lg font-bold"><Shield className="h-5 w-5 text-primary" />{l.title}</SheetTitle>
 </SheetHeader>

 <ScrollArea className="h-[calc(90vh-80px)]">
 <div className="space-y-6 px-6 py-5 pb-10">
 <div className="space-y-4">
 {sections.map((section, index) => (
 <div key={index} className="rounded-md border border-gray-200 bg-white p-4 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
 <div className="flex items-start gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 shrink-0"><section.icon className="h-5 w-5 text-primary" /></div>
 <div><h3 className="font-semibold text-foreground mb-1">{section.title}</h3><p className="text-sm text-gray-500 leading-relaxed">{section.content}</p></div>
 </div>
 </div>
 ))}
 </div>
 <div className="rounded-md border border-gray-200 bg-white p-4">
 <h3 className="font-semibold text-foreground mb-3">{l.yourRights}</h3>
 <ul className="space-y-2 text-sm text-gray-500">
 {[l.right1, l.right2, l.right3, l.right4, l.right5].map((right, i) => <li key={i} className="flex items-center gap-2"><span className="text-primary">•</span>{right}</li>)}
 </ul>
 </div>
 <div className="rounded-md bg-muted/50 p-4 text-center"><p className="text-sm text-gray-500">{l.questionsAbout}</p><p className="text-sm font-medium text-primary mt-1">suporte@kaza.app</p></div>
 <p className="text-xs text-center text-gray-500">{l.lastUpdate}</p>
 </div>
 </ScrollArea>
 </SheetContent>
 </Sheet>
 );
}
