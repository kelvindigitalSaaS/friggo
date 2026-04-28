/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * useAccountSession
 *
 * Rastreia a sessão ativa do dispositivo e, para planos multiPRO,
 * lista os membros do grupo com status de conexão em tempo real.
 *
 * - Ao montar (com usuário logado): faz upsert em account_sessions.
 * - Atualiza last_seen_at a cada 2 minutos.
 * - Verifica force_disconnected — se true, faz signOut automaticamente.
 * - Para conta mestre (multiPRO): expõe disconnectMember(userId).
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { SubAccountMember, AccountSession } from "@/integrations/supabase/types";

// Gera/recupera um device_id estável por dispositivo
function getDeviceId(): string {
  const KEY = "Kaza_device_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

function getPlatform(): string {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "web";
}

function getDeviceName(): string {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) {
    const m = ua.match(/Android[^;]*;\s*([^)]+)\)/);
    return m ? m[1].trim() : "Android";
  }
  if (/iphone/i.test(ua)) return "iPhone";
  if (/ipad/i.test(ua)) return "iPad";
  if (/macintosh/i.test(ua)) return "Mac";
  if (/windows/i.test(ua)) return "Windows";
  return "Web";
}

export interface GroupMemberStatus extends SubAccountMember {
  /** Sessões ativas deste membro (pode ter múltiplos dispositivos) */
  sessions: Pick<AccountSession, "id" | "device_id" | "device_name" | "platform" | "is_connected" | "last_seen_at">[];
  isOnline: boolean;
}

export interface UseAccountSessionReturn {
  /** Sessão do dispositivo atual */
  currentSession: AccountSession | null;
  /** Membros do grupo (apenas multiPRO) */
  groupMembers: GroupMemberStatus[];
  /** Sessões ativas do próprio usuário (excluindo o dispositivo atual) */
  otherSessions: Pick<AccountSession, "id" | "device_name" | "platform" | "last_seen_at">[];
  hasConflict: boolean;
  /** Se o usuário atual é a conta mestre */
  isGroupMaster: boolean;
  /** ID do grupo multiPRO (null se não for multiPRO) */
  groupId: string | null;
  loading: boolean;
  /** Master desconecta um membro à força (invalida todas as sessões dele no grupo) */
  disconnectMember: (targetUserId: string) => Promise<void>;
  /** Desconecta todos os outros dispositivos do usuário atual */
  disconnectAllOthers: () => Promise<void>;
  /** Conta mestre pode re-conectar (desfaz force_disconnect) */
  reconnectMember: (targetUserId: string) => Promise<void>;
}

export function useAccountSession(groupId: string | null = null): UseAccountSessionReturn {
  const { user, signOut } = useAuth();
  const [currentSession, setCurrentSession] = useState<AccountSession | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMemberStatus[]>([]);
  const [otherSessions, setOtherSessions] = useState<Pick<AccountSession, "id" | "device_name" | "platform" | "last_seen_at">[]>([]);
  const [hasConflict, setHasConflict] = useState(false);
  const [isGroupMaster, setIsGroupMaster] = useState(false);
  const [loading, setLoading] = useState(true);
  const deviceId = useRef(getDeviceId());
  const platform = useRef(getPlatform());

  // ── Upsert da sessão local ──────────────────────────────────────────
  const upsertSession = useCallback(async (gid: string | null) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("account_sessions")
        .upsert(
          {
            user_id: user.id,
            group_id: gid,
            device_id: deviceId.current,
            device_name: getDeviceName(),
            platform: platform.current,
            is_connected: true,
            force_disconnected: false,
            last_seen_at: new Date().toISOString(),
          },
          { onConflict: "user_id,device_id" }
        )
        .select()
        .single();

      if (!error && data) {
        const session = data as AccountSession;
        setCurrentSession(session);

        // Verifica se foi force-disconnected por outro membro
        if (session.force_disconnected) {
          await signOut();
          return;
        }

        // Verifica conflitos (outras sessões ativas do mesmo usuário)
        const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
        const { data: others } = await supabase
          .from("account_sessions")
          .select("id, device_name, platform, last_seen_at")
          .eq("user_id", user.id)
          .neq("device_id", deviceId.current)
          .eq("is_connected", true)
          .gt("last_seen_at", twoMinAgo);

        if (others && others.length > 0) {
          setOtherSessions(others as any);
          setHasConflict(true);
        } else {
          setHasConflict(false);
        }
      }
    } catch {
      // silently fail — não crítico
    }
  }, [user, signOut]);

  // ── Buscar membros do grupo e suas sessões ──────────────────────────
  const fetchGroupData = useCallback(async (gid: string) => {
    if (!user) return;
    try {
      // Verifica se é master
      const { data: groupData } = await supabase
        .from("sub_account_groups")
        .select("master_user_id")
        .eq("id", gid)
        .maybeSingle();
      const isMaster = (groupData as any)?.master_user_id === user.id;
      setIsGroupMaster(isMaster);

      // Busca membros
      const { data: members } = await supabase
        .from("sub_account_members")
        .select("*")
        .eq("group_id", gid)
        .eq("is_active", true);

      if (!members || members.length === 0) {
        setGroupMembers([]);
        return;
      }

      const memberIds = members.map((m: any) => m.user_id);

      // Busca sessões dos membros
      const { data: sessions } = await supabase
        .from("account_sessions")
        .select("id, user_id, device_id, device_name, platform, is_connected, last_seen_at")
        .in("user_id", memberIds)
        .eq("group_id", gid);

      const sessionsByUser: Record<string, any[]> = {};
      (sessions || []).forEach((s: any) => {
        if (!sessionsByUser[s.user_id]) sessionsByUser[s.user_id] = [];
        sessionsByUser[s.user_id].push(s);
      });

      const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000);
      const membersWithStatus: GroupMemberStatus[] = members.map((m: any) => {
        const userSessions = sessionsByUser[m.user_id] || [];
        const isOnline = userSessions.some(
          (s) => s.is_connected && new Date(s.last_seen_at) > twoMinAgo
        );
        return {
          ...m,
          sessions: userSessions,
          isOnline,
        };
      });

      setGroupMembers(membersWithStatus);
    } catch {
      // silently fail
    }
  }, [user]);

  // ── Efeito principal: upsert + fetch grupo ─────────────────────────
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const init = async () => {
      await upsertSession(groupId);
      if (groupId && mounted) {
        await fetchGroupData(groupId);
      }
      if (mounted) setLoading(false);
    };

    init();

    // Atualiza last_seen_at a cada 2 minutos
    const heartbeat = setInterval(async () => {
      if (!user || !mounted) return;
      try {
        const { data, error } = await (supabase as any)
          .from("account_sessions")
          .update({ last_seen_at: new Date().toISOString(), is_connected: true })
          .eq("user_id", user.id)
          .eq("device_id", deviceId.current)
          .select("force_disconnected")
          .single();

        if (error) {
          console.warn("[SESSION] Heartbeat error:", error);
          return;
        }
        if (data && data.force_disconnected && mounted) {
          await signOut();
        }
      } catch (err: unknown) {
        console.error("[SESSION] Heartbeat failed:", err);
      }
    }, 2 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(heartbeat);
      // Marca sessão como desconectada ao sair
      if (user) {
        (supabase as any)
          .from("account_sessions")
          .update({ is_connected: false })
          .eq("user_id", user.id)
          .eq("device_id", deviceId.current)
          .then(() => {})
          .catch((err: unknown) => {
            if (import.meta.env.DEV) console.error("[SESSION] Cleanup error:", err);
          });
      }
    };
  }, [user, groupId, upsertSession, fetchGroupData, signOut]);

  // ── Realtime: escuta mudanças nas sessões do grupo ──────────────────
  useEffect(() => {
    if (!groupId || !user) return;

    const channel = supabase
      .channel(`group-sessions-${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "account_sessions",
          filter: `group_id=eq.${groupId}`,
        },
        (payload) => {
          // Verifica force_disconnect para o usuário atual
          const row = payload.new as AccountSession;
          if (row?.user_id === user.id && row?.force_disconnected) {
            signOut();
            return;
          }
          // Atualiza lista de membros
          fetchGroupData(groupId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId, user, fetchGroupData, signOut]);

  // ── Ações do master ─────────────────────────────────────────────────
  const disconnectMember = useCallback(async (targetUserId: string) => {
    if (!isGroupMaster || !groupId) return;
    await supabase
      .from("account_sessions")
      .update({ force_disconnected: true, is_connected: false })
      .eq("user_id", targetUserId)
      .eq("group_id", groupId);
    // Atualiza local
    await fetchGroupData(groupId);
  }, [isGroupMaster, groupId, fetchGroupData]);

  const reconnectMember = useCallback(async (targetUserId: string) => {
    if (!isGroupMaster || !groupId) return;
    await supabase
      .from("account_sessions")
      .update({ force_disconnected: false })
      .eq("user_id", targetUserId)
      .eq("group_id", groupId);
    await fetchGroupData(groupId);
  }, [isGroupMaster, groupId, fetchGroupData]);

  const disconnectAllOthers = useCallback(async () => {
    if (!user) return;
    await supabase
      .from("account_sessions")
      .update({ force_disconnected: true, is_connected: false })
      .eq("user_id", user.id)
      .neq("device_id", deviceId.current);
    
    setHasConflict(false);
    setOtherSessions([]);
  }, [user]);

  return {
    currentSession,
    groupMembers,
    otherSessions,
    hasConflict,
    isGroupMaster,
    groupId,
    loading,
    disconnectMember,
    disconnectAllOthers,
    reconnectMember,
  };
}
