import { useState, useEffect } from "react";
import { Home, Users, Bell, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useKaza } from "@/contexts/KazaContext";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

interface Member {
  userId: string;
  name: string;
  avatar_url: string | null;
}

const SESSION_KEY = "kaza_plan_card_collapsed";

export function PlanTypeCard() {
  const { user } = useAuth();
  const { homeId } = useKaza();
  const { subscription } = useSubscription();
  const { language } = useLanguage();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved === "true";
    } catch {
      return true;
    }
  });

  const [homeName, setHomeName] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotifyDialog, setShowNotifyDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [notifying, setNotifying] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const isMultiPro = subscription?.plan === "multiPRO" || subscription?.plan === "premium";

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, String(collapsed));
    } catch { /* ignore */ }
  }, [collapsed]);

  const l = {
    "pt-BR": {
      individual: "Conta Individual",
      multi: "Conta Multi",
      home: "Lar",
      linkedPeople: "Pessoas vinculadas",
      person: "pessoa",
      people: "pessoas",
      notifyPeople: "Notificar pessoas",
      selectPeople: "Selecione quem deseja notificar:",
      message: "Mensagem",
      send: "Enviar notificação",
      cancel: "Cancelar",
      sending: "Enviando...",
      selectAtLeastOne: "Selecione pelo menos uma pessoa",
      notificationSent: "Notificação enviada!",
      errorSending: "Erro ao enviar notificação",
      noMembers: "Nenhum membro vinculado",
    },
    en: {
      individual: "Individual Account",
      multi: "Multi Account",
      home: "Home",
      linkedPeople: "Linked people",
      person: "person",
      people: "people",
      notifyPeople: "Notify people",
      selectPeople: "Select who you want to notify:",
      message: "Message",
      send: "Send notification",
      cancel: "Cancel",
      sending: "Sending...",
      selectAtLeastOne: "Select at least one person",
      notificationSent: "Notification sent!",
      errorSending: "Error sending notification",
      noMembers: "No members linked",
    },
    es: {
      individual: "Cuenta Individual",
      multi: "Cuenta Multi",
      home: "Hogar",
      linkedPeople: "Personas vinculadas",
      person: "persona",
      people: "personas",
      notifyPeople: "Notificar personas",
      selectPeople: "Selecciona a quién deseas notificar:",
      message: "Mensaje",
      send: "Enviar notificación",
      cancel: "Cancelar",
      sending: "Enviando...",
      selectAtLeastOne: "Selecciona al menos una persona",
      notificationSent: "¡Notificación enviada!",
      errorSending: "Error al enviar notificación",
      noMembers: "Sin miembros vinculados",
    },
  };

  const t = l[language as keyof typeof l] || l["pt-BR"];

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !homeId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Fetch home name
        const { data: homeData } = await supabase
          .from("homes")
          .select("name")
          .eq("id", homeId)
          .maybeSingle();

        if (homeData) {
          setHomeName(homeData.name);
        }

        // 2. Fetch members if multi account
        if (isMultiPro) {
          const { data: groupData } = await supabase
            .from("sub_account_groups")
            .select("id")
            .eq("master_user_id", user.id)
            .maybeSingle();

          if (groupData) {
            const { data: membersData } = await supabase
              .from("sub_account_members")
              .select("user_id")
              .eq("group_id", groupData.id)
              .eq("role", "member");

            if (membersData && membersData.length > 0) {
              const userIds = membersData.map(m => m.user_id);

              // Fetch member profiles
              const { data: profilesData } = await supabase
                .from("profiles")
                .select("user_id, name, avatar_url")
                .in("user_id", userIds);

              if (profilesData) {
                setMembers(
                  profilesData.map(p => ({
                    userId: p.user_id,
                    name: p.name || "Membro",
                    avatar_url: p.avatar_url,
                  }))
                );
              }
            }
          }
        }
      } catch (err) {
        console.error("[KAZA] Error fetching plan data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, homeId, isMultiPro]);

  const handleNotify = async () => {
    if (selectedMembers.size === 0) {
      toast.error(t.selectAtLeastOne);
      return;
    }

    if (!notificationMsg.trim()) {
      toast.error("Escreva uma mensagem");
      return;
    }

    setNotifying(true);
    try {
      // TODO: Implement notification sending via RPC or edge function
      // For now, just show success
      toast.success(t.notificationSent);
      setShowNotifyDialog(false);
      setSelectedMembers(new Set());
      setNotificationMsg("");
    } catch (err) {
      toast.error(t.errorSending);
    } finally {
      setNotifying(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.08] p-4 flex items-center justify-center h-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const planType = isMultiPro ? "multi" : "individual";
  const memberCount = members.length;
  const countText = memberCount === 1 ? t.person : t.people;

  return (
    <>
      <div className="rounded-2xl bg-white dark:bg-[#11302c] border border-[#E2E1DC] dark:border-white/10 overflow-hidden shadow-sm">
        {/* Header */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center gap-3 px-4 py-3 border-b border-[#E2E1DC] dark:border-white/10 transition-colors active:bg-[#F7F6F3] dark:active:bg-white/5"
        >
          <div className="h-8 w-8 rounded-xl bg-[#EDECEA] dark:bg-white/10 flex items-center justify-center">
            <Home className="h-4 w-4 text-[#3D3D3A] dark:text-white/80" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">
              {planType === "multi" ? t.multi : t.individual}
            </p>
            <p className="text-xs text-muted-foreground">
              {t.home}: {homeName} {isMultiPro && `• ${memberCount} ${countText}`}
            </p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-200">
            {collapsed ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Collapsible Content */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            collapsed ? "max-h-0 opacity-0" : "max-h-[600px] opacity-100"
          )}
        >
          <div className="px-4 py-4 space-y-4">
            {/* Plan Info */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t.linkedPeople}
              </p>
              {isMultiPro && memberCount > 0 ? (
                <div className="space-y-2">
                  {members.map((member) => (
                    <div
                      key={member.userId}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 dark:bg-white/5"
                    >
                      <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarImage src={member.avatar_url || ""} />
                        <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {(member.name || "?")[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-foreground">
                        {member.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {planType === "individual" ? t.individual : t.noMembers}
                </p>
              )}
            </div>

            {/* Notify Button */}
            {isMultiPro && members.length > 0 && (
              <Button
                onClick={() => setShowNotifyDialog(true)}
                className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <Bell className="h-4 w-4 mr-2" />
                {t.notifyPeople}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Notification Dialog */}
      <AlertDialog open={showNotifyDialog} onOpenChange={setShowNotifyDialog}>
        <AlertDialogContent className="rounded-[1.5rem] p-6 gap-6 sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <div className="space-y-2">
            <AlertDialogTitle className="text-xl font-black">
              {t.notifyPeople}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-medium">
              {t.selectPeople}
            </AlertDialogDescription>
          </div>

          {/* Members List */}
          <div className="space-y-2">
            {members.map((member) => (
              <label
                key={member.userId}
                className="flex items-center gap-3 p-3 border border-gray-200 dark:border-white/10 rounded-lg cursor-pointer hover:bg-muted/50 dark:hover:bg-white/5 transition-colors"
              >
                <Checkbox
                  checked={selectedMembers.has(member.userId)}
                  onCheckedChange={(checked) => {
                    const newSelected = new Set(selectedMembers);
                    if (checked) {
                      newSelected.add(member.userId);
                    } else {
                      newSelected.delete(member.userId);
                    }
                    setSelectedMembers(newSelected);
                  }}
                  className="w-5 h-5"
                />
                <Avatar className="h-8 w-8 rounded">
                  <AvatarImage src={member.avatar_url || ""} />
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {(member.name || "?")[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium flex-1">{member.name}</span>
              </label>
            ))}
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {t.message}
            </label>
            <textarea
              value={notificationMsg}
              onChange={(e) => setNotificationMsg(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="w-full h-24 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-muted/40 dark:bg-white/5 text-sm font-medium resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end mt-2">
            <AlertDialogCancel className="h-12 rounded-xl font-bold border-2 border-muted hover:bg-muted/50 w-full sm:w-auto px-6 mt-0">
              {t.cancel}
            </AlertDialogCancel>
            <Button
              onClick={handleNotify}
              disabled={notifying || selectedMembers.size === 0}
              className="h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto px-6 border-0"
            >
              {notifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {t.sending}
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  {t.send}
                </>
              )}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
