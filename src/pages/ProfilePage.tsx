import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriggo } from '@/contexts/FriggoContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, User, Home, Users, Refrigerator, Loader2, CreditCard } from 'lucide-react';
import AvatarUpload from '@/components/friggo/AvatarUpload';
import { isValidCPF, formatCPF } from '@/lib/utils/validation';
import { toast } from 'sonner';
import { PageTransition } from '@/components/PageTransition';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { onboardingData, updateProfile, onboarding_completed } = useFriggo();
    const { language } = useLanguage();
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [residents, setResidents] = useState('1');
    const [homeType, setHomeType] = useState<'apartment' | 'house'>('house');
    const [fridgeType, setFridgeType] = useState<'regular' | 'smart'>('regular');
    const [fridgeBrand, setFridgeBrand] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
    const [cpf, setCpf] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading] = useState(false);

    useEffect(() => {
        if (onboardingData) {
            setName(onboardingData.name || '');
            setResidents(onboardingData.residents?.toString() || '1');
            setHomeType(onboardingData.homeType || 'house');
            setFridgeType(onboardingData.fridgeType || 'regular');
            setFridgeBrand(onboardingData.fridgeBrand || '');
            setAvatarUrl(onboardingData.avatarUrl);
            setCpf(formatCPF(onboardingData.cpf || ''));
        }
    }, [onboardingData]);

    const labels = {
        'pt-BR': {
            title: 'Editar Perfil',
            name: 'Seu Nome',
            residents: 'Número de Residentes',
            homeType: 'Tipo de Residência',
            house: 'Casa',
            apartment: 'Apartamento',
            fridgeType: 'Tipo de Geladeira',
            regular: 'Convencional',
            smart: 'Smart (Conectada)',
            fridgeBrand: 'Marca da Geladeira',
            save: 'Salvar Alterações',
            uploading: 'Enviando...',
            saving: 'Salvando...',
            success: 'Perfil atualizado!',
            error: 'Erro ao salvar perfil',
            cpf: 'CPF (Necessário para Trial)',
            cpfPlaceholder: '000.000.000-00',
            invalidCpf: 'CPF inválido',
        },
        'en': {
            title: 'Edit Profile',
            name: 'Your Name',
            residents: 'Number of Residents',
            homeType: 'Residence Type',
            house: 'House',
            apartment: 'Apartment',
            fridgeType: 'Fridge Type',
            regular: 'Regular',
            smart: 'Smart (Connected)',
            fridgeBrand: 'Fridge Brand',
            save: 'Save Changes',
            uploading: 'Uploading...',
            saving: 'Saving...',
            success: 'Profile updated!',
            error: 'Error saving profile',
            cpf: 'CPF (Trial purposes)',
            cpfPlaceholder: '000.000.000-00',
            invalidCpf: 'Invalid CPF',
        },
        'es': {
            title: 'Editar Perfil',
            name: 'Tu Nombre',
            residents: 'Número de Residentes',
            homeType: 'Tipo de Residencia',
            house: 'Casa',
            apartment: 'Apartamento',
            fridgeType: 'Tipo de Refrigerador',
            regular: 'Convencional',
            smart: 'Smart (Conectado)',
            fridgeBrand: 'Marca del Refrigerador',
            save: 'Guardar Cambios',
            uploading: 'Subiendo...',
            saving: 'Guardando...',
            success: '¡Perfil actualizado!',
            error: 'Error al guardar perfil',
        },
    };

    const l = labels[language];

    // AvatarUpload component handle upload and calls updateProfile via FriggoContext

    const handleSave = async () => {
        if (cpf && !isValidCPF(cpf)) {
            toast.error(l.invalidCpf);
            return;
        }

        setIsSaving(true);
        try {
            const rawCpf = cpf.replace(/\D/g, '');
            if (rawCpf && !isValidCPF(rawCpf)) {
                toast.error(language === 'pt-BR' ? 'CPF inválido' : 'Invalid CPF');
                setIsSaving(false);
                return;
            }

            // Note: server-side uniqueness validation via Supabase requires an RPC or server role.
            // Here we perform client-side format validation and then save. The backend migration
            // includes a cpf column and can enforce uniqueness server-side if desired.

            await updateProfile({
                name,
                residents: parseInt(residents),
                homeType,
                fridgeType,
                fridgeBrand: fridgeType === 'smart' ? fridgeBrand : '',
                avatarUrl,
                cpf: rawCpf
            });
            toast.success(l.success);
            navigate(-1);
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error(l.error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <PageTransition direction="left" className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#0a0a0a] pb-20">
            <header className="sticky top-0 z-50 flex items-center gap-3 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 px-4 py-4 backdrop-blur-2xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-foreground active:scale-[0.97] transition-all bg-white/80 dark:bg-white/10 backdrop-blur-xl"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-lg font-bold text-foreground">{l.title}</h1>
            </header>

            <main className="mx-auto max-w-lg px-6 py-6 space-y-8">
                <div className="flex flex-col items-center gap-4">
                    <AvatarUpload currentUrl={avatarUrl || null} size={96} className="rounded-full" />
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-semibold">
                            <User className="h-4 w-4 text-primary" /> {l.name}
                        </Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12 bg-muted/30" />
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-semibold">
                            <CreditCard className="h-4 w-4 text-primary" /> {l.cpf}
                        </Label>
                        <Input 
                            value={cpf} 
                            onChange={(e) => setCpf(formatCPF(e.target.value))} 
                            placeholder={l.cpfPlaceholder}
                            maxLength={14}
                            disabled={Boolean(onboardingData?.cpf)}
                            className={cn("h-12 bg-muted/30", cpf && !isValidCPF(cpf) && "border-destructive focus-visible:ring-destructive")} 
                        />
                        <p className="text-[10px] text-muted-foreground mt-1 px-1">
                            {language === 'pt-BR'
                                ? 'Necessário para ativação dos 7 dias de trial.'
                                : language === 'es'
                                ? 'Necesário para la activación de la prueba de 7 días.'
                                : 'Required for 7-day trial activation.'}
                        </p>
                        {onboardingData?.cpf && (
                            <p className="text-[11px] text-muted-foreground mt-1 px-1">{language === 'pt-BR' ? 'CPF configurado — não é possível alterar.' : language === 'es' ? 'CPF configurado — no es posible cambiar.' : 'CPF set — cannot be changed.'}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-semibold">
                                <Users className="h-4 w-4 text-primary" /> {l.residents}
                            </Label>
                            <Select value={residents} onValueChange={setResidents}>
                                <SelectTrigger className="h-12 bg-muted/30">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                        <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-semibold">
                                <Home className="h-4 w-4 text-primary" /> {l.homeType}
                            </Label>
                            <Select value={homeType} onValueChange={(v: 'apartment' | 'house') => setHomeType(v)}>
                                <SelectTrigger className="h-12 bg-muted/30">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="house">{l.house}</SelectItem>
                                    <SelectItem value="apartment">{l.apartment}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-semibold">
                            <Refrigerator className="h-4 w-4 text-primary" /> {l.fridgeType}
                        </Label>
                        <Select value={fridgeType} onValueChange={(v: 'regular' | 'smart') => setFridgeType(v)}>
                            <SelectTrigger className="h-12 bg-muted/30">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regular">{l.regular}</SelectItem>
                                <SelectItem value="smart">{l.smart}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {fridgeType === 'smart' && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                            <Label className="text-sm font-semibold">{l.fridgeBrand}</Label>
                            <Input value={fridgeBrand} onChange={(e) => setFridgeBrand(e.target.value)} className="h-12 bg-muted/30" placeholder="Ex: Samsung, LG..." />
                        </div>
                    )}
                </div>

                <Button onClick={handleSave} className="w-full h-12 md:h-14 text-base md:text-lg font-bold shadow-lg" disabled={isSaving}>
                    {isSaving ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <img src="/icon.png" alt="Salvar" width={20} height={20} className="mr-2 h-5 w-5 object-contain inline-block" loading="lazy" decoding="async" />
                    )}
                        {l.save}
                </Button>
            </main>
        </PageTransition>
    );
}
