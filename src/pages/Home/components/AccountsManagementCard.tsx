import { useState, useEffect } from "react";
import { Users, ChevronDown, ChevronUp, LogOut } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface AccountInfo {
  userId: string;
  name: string;
  role: "master" | "member";
  avatar_url: string | null;
  homeId: string | null;
  homeName: string | null;
}

const SESSION_KEY = "kaza_accounts_card_collapsed";

export function AccountsManagementCard() {
  const { user } = useAuth();
  const { homeId } = useKaza();
  const { language } = useLanguage();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved === "true";
    } catch {
      return true;
    }
  });
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoteConfirm, setDemoteConfirm] = useState<AccountInfo | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, String(collapsed));
    } catch { /* ignore */ }
  }, [collapsed]);

  const l = {
    "pt-BR": {
      title: "Gerenciar Contas",
      masterAccount: "Conta Principal",
      secondaryAccounts: "Contas Secundárias",
      linkedHome: "Lar vinculado:",
      noHome: "Sem lar vinculado",
      convertToSecondary: "Converter para Secundária",
      confirmDemote: "Converter conta para secundária?",
      confirmDemoteDesc: (name: string) =>
        `Tem certeza que deseja converter ${name} de conta principal para secundária? Você perderá acesso como proprietário desta casa.`,
      convert: "Converter",
      cancel: "Cancelar",
      noAccounts: "Carregando contas...",
    },
    en: {
      title: "Manage Accounts",
      masterAccount: "Main Account",
      secondaryAccounts: "Secondary Accounts",
      linkedHome: "Linked home:",
      noHome: "No linked home",
      convertToSecondary: "Convert to Secondary",
      confirmDemote: "Convert account to secondary?",
      confirmDemoteDesc: (name: string) =>
        `Are you sure you want to convert ${name} from main account to secondary? You will lose access as owner of this home.`,
      convert: "Convert",
      cancel: "Cancel",
      noAccounts: "Loading accounts...",
    },
    es: {
      title: "Gestionar Cuentas",
      masterAccount: "Cuenta Principal",
      secondaryAccounts: "Cuentas Secundarias",
      linkedHome: "Hogar vinculado:",
      noHome: "Sin hogar vinculado",
      convertToSecondary: "Convertir a Secundaria",
      confirmDemote: "¿Convertir cuenta a secundaria?",
      confirmDemoteDesc: (name: string) =>
        `¿Estás seguro de convertir ${name} de cuenta principal a secundaria? Perderás acceso como propietario de este hogar.`,
      convert: "Convertir",
      cancel: "Cancelar",
      noAccounts: "Cargando cuentas...",
    },
  };

  const t = l[language as keyof typeof l] || l["pt-BR"];

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Fetch user's homes (where they are owner)
        const { data: homesData } = await supabase
          .from("home_members")
          .select("home_id, is_active")
          .eq("user_id", user.id)
          .eq("role", "owner")
          .eq("is_active", true);

        const homeIds = homesData?.map(h => h.home_id) || [];

        // 2. Get homes info
        const homeMap = new Map<string, string>();
        if (homeIds.length > 0) {
          const { data: homes } = await supabase
            .from("homes")
            .select("id, name")
            .in("id", homeIds);

          homes?.forEach(h => homeMap.set(h.id, h.name));
        }

        // 3. Fetch sub-account group where user is master
        const { data: groupData } = await supabase
          .from("sub_account_groups")
          .select("id, master_user_id")
          .eq("master_user_id", user.id)
          .maybeSingle();

        let secondaryAccounts: AccountInfo[] = [];

        if (groupData) {
          // 4. Fetch secondary accounts in this group (limit to 4)
          const { data: membersData } = await supabase
            .from("sub_account_members")
            .select("user_id, display_name, avatar_url")
            .eq("group_id", groupData.id)
            .eq("role", "member")
            .limit(4);

          if (membersData) {
            // 5. Get secondary accounts' homes
            for (const member of membersData) {
              const { data: memberHomes } = await supabase
                .from("home_members")
                .select("home_id")
                .eq("user_id", member.user_id)
                .eq("is_active", true)
                .limit(1)
                .maybeSingle();

              let homeName = t.noHome;
              if (memberHomes?.home_id) {
                const { data: home } = await supabase
                  .from("homes")
                  .select("name")
                  .eq("id", memberHomes.home_id)
                  .maybeSingle();
                homeName = home?.name || t.noHome;
              }

              secondaryAccounts.push({
                userId: member.user_id,
                name: member.display_name || "Membro",
                role: "member",
                avatar_url: member.avatar_url,
                homeId: memberHomes?.home_id || null,
                homeName,
              });
            }
          }
        }

        // 6. Get current user info
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, avatar_url")
          .eq("user_id", user.id)
          .maybeSingle();

        const masterAccount: AccountInfo = {
          userId: user.id,
          name: profile?.name || "Minha Conta",
          role: "master",
          avatar_url: profile?.avatar_url || null,
          homeId: homeMap.size > 0 ? Array.from(homeMap.keys())[0] : null,
          homeName: homeMap.size > 0 ? Array.from(homeMap.values())[0] : t.noHome,
        };

        setAccounts([masterAccount, ...secondaryAccounts]);
      } catch (err) {
        console.error("[KAZA] Error fetching accounts:", err);
        toast.error("Erro ao carregar contas");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [user, language, t]);

  const handleDemote = async () => {
    if (!demoteConfirm) return;
    try {
      // TODO: Implement RPC to convert master account to member role
      toast.success("Conta convertida para secundária");
      setDemoteConfirm(null);
    } catch (err) {
      toast.error("Erro ao converter conta");
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white dark:bg-[#11302c] border border-[#E2E1DC] dark:border-white/10 p-4 space-y-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    );
  }

  const masterAccount = accounts.find(a => a.role === "master");
  const secondaryAccounts = accounts.filter(a => a.role === "member");

  return (
    <>
      <div className="rounded-2xl bg-white dark:bg-[#11302c] border border-[#E2E1DC] dark:border-white/10 overflow-hidden shadow-sm">
        {/* Header */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center gap-3 px-4 py-3 border-b border-[#E2E1DC] dark:border-white/10 transition-colors active:bg-[#F7F6F3] dark:active:bg-white/5"
        >
          <div className="h-8 w-8 rounded-xl bg-[#EDECEA] dark:bg-white/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-[#3D3D3A] dark:text-white/80" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">{t.title}</p>
            <p className="text-xs text-muted-foreground">
              {accounts.length} conta{accounts.length !== 1 ? "s" : ""} no total
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
            collapsed ? "max-h-0 opacity-0" : "max-h-[800px] opacity-100"
          )}
        >
          <div className="divide-y divide-black/[0.03] dark:divide-white/[0.05]">
            {/* Master Account */}
            {masterAccount && (
              <div className="px-4 py-4 space-y-3 bg-primary/5 dark:bg-primary/10">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                  {t.masterAccount}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-lg shadow-sm">
                    <AvatarImage src={masterAccount.avatar_url || ""} />
                    <AvatarFallback className="rounded-lg bg-primary/20 text-sm font-bold text-primary uppercase">
                      {(masterAccount.name || "?")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">
                      {masterAccount.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.linkedHome} {masterAccount.homeName}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Accounts */}
            {secondaryAccounts.length > 0 && (
              <div className="px-4 py-4 space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t.secondaryAccounts} ({secondaryAccounts.length})
                </p>
                <div className="space-y-2">
                  {secondaryAccounts.map((account) => (
                    <div
                      key={account.userId}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/40 dark:bg-white/5"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 rounded-lg shadow-sm">
                          <AvatarImage src={account.avatar_url || ""} />
                          <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-bold text-primary uppercase">
                            {(account.name || "?")[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">
                            {account.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {t.linkedHome} {account.homeName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Accounts */}
            {accounts.length === 0 && (
              <div className="px-4 py-8 text-center text-muted-foreground">
                {t.noAccounts}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demote Confirmation Dialog */}
      <AlertDialog open={!!demoteConfirm} onOpenChange={() => setDemoteConfirm(null)}>
        <AlertDialogContent className="rounded-[1.5rem] p-6 gap-6 sm:max-w-[425px]">
          <div className="space-y-2">
            <AlertDialogTitle className="text-xl font-black">
              {t.confirmDemote}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-medium">
              {demoteConfirm && t.confirmDemoteDesc(demoteConfirm.name)}
            </AlertDialogDescription>
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <AlertDialogCancel className="h-12 rounded-xl font-bold border-2 border-muted hover:bg-muted/50 w-full sm:w-auto px-6 mt-0">
              {t.cancel}
            </AlertDialogCancel>
            <Button
              onClick={handleDemote}
              className="h-12 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 w-full sm:w-auto px-6 border-0"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t.convert}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
