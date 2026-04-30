/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, PLAN_DETAILS } from "@/contexts/SubscriptionContext";
import { SubAccountMember, SubAccountInvite } from "@/integrations/supabase/types";
import { toast } from "sonner";

interface GroupMemberWithStatus extends SubAccountMember {
  isOnline?: boolean;
  member_name?: string;
}

interface GroupSlot {
  type: "filled" | "pending" | "empty";
  member?: GroupMemberWithStatus;
  invite?: SubAccountInvite;
}

export function useGroupMembers() {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [members, setMembers] = useState<GroupMemberWithStatus[]>([]);
  const [pendingInvites, setPendingInvites] = useState<SubAccountInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const groupId = subscription?.groupId;

  // Fetch members and invites
  useEffect(() => {
    if (!groupId || !user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // 1. Fetch group to find master
        const { data: groupData } = await supabase
          .from("sub_account_groups")
          .select("master_user_id")
          .eq("id", groupId)
          .maybeSingle();

        // 2. Fetch members with their real names
        const { data: membersData } = await supabase
          .from("sub_account_members")
          .select("*")
          .eq("group_id", groupId);

        let allMembers: GroupMemberWithStatus[] = membersData || [];

        // Exclude the master from the dependents list
        if (groupData?.master_user_id) {
          allMembers = allMembers.filter(m => m.user_id !== groupData.master_user_id && m.role !== "master");
        }

        // member_name is now populated from profiles via trigger in DB

        // 4. Fetch online status from account_sessions
        if (allMembers.length > 0) {
          const { data: sessionsData } = await supabase
            .from("account_sessions")
            .select("user_id, is_connected, last_seen_at")
            .eq("group_id", groupId);

          const onlineMap = new Map(
            (sessionsData || []).map((s) => [
              s.user_id,
              s.is_connected && new Date(s.last_seen_at).getTime() > Date.now() - 2 * 60000,
            ])
          );

          setMembers(
            allMembers.map((m) => ({
              ...m,
              isOnline: onlineMap.get(m.user_id) ?? false,
            }))
          );
        }

        // Fetch pending invites
        const { data: invitesData } = await supabase
          .from("sub_account_invites")
          .select("*")
          .eq("group_id", groupId)
          .eq("status", "pending");

        setPendingInvites(invitesData || []);
      } catch (err) {
        if (import.meta.env.DEV) console.error("[DEV] Error fetching group members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Subscribe to realtime updates
    const membersChannel = supabase
      .channel(`group_members_${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sub_account_members",
          filter: `group_id=eq.${groupId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newMember = payload.new as SubAccountMember;
            setMembers((prev) => [...prev, { ...newMember, isOnline: false }]);
            const name = (newMember as any).member_name || "Uma pessoa";
            toast.success(`${name} se juntou ao seu plano!`);
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as SubAccountMember;
            setMembers((prev) =>
              prev.map((m) => (m.id === updated.id ? { ...m, ...updated } : m))
            );
          } else if (payload.eventType === "DELETE") {
            const deleted = payload.old as SubAccountMember;
            setMembers((prev) => prev.filter((m) => m.id !== deleted.id));
          }
        }
      )
      .subscribe();

    const invitesChannel = supabase
      .channel(`group_invites_${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sub_account_invites",
          filter: `group_id=eq.${groupId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPendingInvites((prev) => [...prev, payload.new as SubAccountInvite]);
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as SubAccountInvite;
            if (updated.status !== "pending") {
              setPendingInvites((prev) => prev.filter((i) => i.id !== updated.id));
            }
          } else if (payload.eventType === "DELETE") {
            const deleted = payload.old as SubAccountInvite;
            if (deleted?.id) {
              setPendingInvites((prev) => prev.filter((i) => i.id !== deleted.id));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(membersChannel);
      supabase.removeChannel(invitesChannel);
    };
  }, [groupId, user]);

  // Calculate slots — derive maxSlots from PLAN_DETAILS based on effective plan
  const effectivePlan = subscription?.plan ?? "free";
  const planMax = PLAN_DETAILS[effectivePlan as keyof typeof PLAN_DETAILS]?.maxAccounts ?? 1;
  const maxSlots = Math.max(planMax, 1);
  const filledSlots = members.filter((m) => m.is_active).length;
  const pendingSlots = pendingInvites.filter((i) => i.status === "pending").length;
  const freeSlots = maxSlots - filledSlots - pendingSlots;

  // Build slots array
  const slots: GroupSlot[] = [
    ...members
      .filter((m) => m.is_active)
      .map((m) => ({ type: "filled" as const, member: m })),
    ...pendingInvites
      .filter((i) => i.status === "pending")
      .map((i) => ({ type: "pending" as const, invite: i })),
    ...Array(Math.max(0, freeSlots))
      .fill(null)
      .map(() => ({ type: "empty" as const })),
  ];

  const inviteByEmail = useCallback(
    async (email: string) => {
      if (!user) {
        toast.error("Você precisa estar logado para enviar convites.");
        return false;
      }

      try {
        // Pass group_id if we already have it; the edge function will
        // auto-create a group for multiPRO users who don't have one yet.
        const body: Record<string, string> = { invited_email: email };
        if (groupId) body.group_id = groupId;

        // Garantir que temos uma sessão válida antes de tentar
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error("Sessão expirada. Por favor, faça login novamente.");
          return false;
        }

        // Usar fetch nativo para garantir controle total dos headers e evitar erro 401
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const functionUrl = `${supabaseUrl}/functions/v1/send-invite-email`;

        const response = await fetch(functionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
            "apikey": supabaseKey,
            "x-anon-key": supabaseKey,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const resText = await response.text();
          if (import.meta.env.DEV) console.error("[INVITE] Full Error Response:", resText);
          
          let errorMsg = `Erro ${response.status}: Falha na requisição`;
          try {
            const errorData = JSON.parse(resText);
            errorMsg = errorData.error || errorMsg;
          } catch (e) { /* use default msg */ }
          
          if (response.status === 401) {
            toast.error("Erro de Autenticação (401). Tente sair e entrar novamente no app.");
          } else {
            toast.error(errorMsg);
          }
          return false;
        }

        const data = await response.json();

        if (!data?.success) {
          toast.error("Erro ao enviar convite. Tente novamente.");
          return false;
        }

        toast.success(`Convite enviado para ${email}! ✓`);
        return true;
      } catch (err) {
        if (import.meta.env.DEV) console.error("[DEV] Error sending invite:", err);
        toast.error(err instanceof Error ? err.message : "Erro ao enviar convite");
        return false;
      }
    },
    [groupId, user]
  );

  const removeMember = useCallback(
    async (_memberId: string, memberName: string, userId: string) => {
      if (!groupId || !user) return;

      try {
        // Call new RPC function to convert member to master
        const { error } = await (supabase as any).rpc(
          "remove_member_and_convert_to_master",
          {
            p_member_user_id: userId,
            p_group_id: groupId,
          }
        );

        if (error) throw error;

        // Send notification to member after successful conversion
        await supabase.functions.invoke("send-push-notification", {
          body: {
            user_id: userId,
            title: "Você agora é uma conta principal",
            body: `Você foi removido do plano compartilhado. Agora sua conta é principal (Gratuita) com seu próprio plano independente. Configure sua casa ao próximo acesso.`,
            data: {
              type: "member-removed",
            },
            exclude_user_id: user.id,
          },
        }).catch(() => {}); // Best effort

        toast.success(`${memberName} foi convertido para conta principal com plano independente`);
      } catch (err) {
        if (import.meta.env.DEV) console.error("[DEV] Error removing member:", err);
        toast.error("Erro ao remover membro");
      }
    },
    [groupId, user]
  );

  const cancelInvite = useCallback(
    async (inviteId: string) => {
      if (!groupId) return;
      try {
        const { error } = await supabase
          .from("sub_account_invites")
          .delete()
          .eq("id", inviteId)
          .eq("group_id", groupId);
        if (error) throw error;
        setPendingInvites((prev) => prev.filter((i) => i.id !== inviteId));
        toast.success("Convite cancelado");
      } catch (err) {
        if (import.meta.env.DEV) console.error("[DEV] Error cancelling invite:", err);
        toast.error("Erro ao cancelar convite");
      }
    },
    [groupId]
  );

  const resendInvite = useCallback(
    async (inviteId: string, email: string) => {
      if (!groupId) return;
      try {
        // Para convites pendentes, o usuário quer reenviar o CONVITE do Kaza
        // e não a confirmação de e-mail genérica do Supabase.
        // Vamos deletar o convite antigo e disparar um novo para garantir que o e-mail
        // tenha o link correto do app e o nome de quem convidou.
        
        const { error: deleteError } = await supabase
          .from("sub_account_invites")
          .delete()
          .eq("id", inviteId)
          .eq("group_id", groupId);
          
        if (deleteError) throw deleteError;
        
        // Disparar o convite original novamente
        await inviteByEmail(email);
        toast.success(`Convite reenviado para ${email}`);
      } catch (err) {
        if (import.meta.env.DEV) console.error("[DEV] Error resending invite:", err);
        toast.error("Erro ao reenviar convite");
      }
    },
    [groupId, inviteByEmail]
  );

  return {
    members,
    pendingInvites,
    slots,
    loading,
    filledSlots,
    freeSlots,
    maxSlots,
    inviteByEmail,
    removeMember,
    cancelInvite,
    resendInvite,
  };
}
