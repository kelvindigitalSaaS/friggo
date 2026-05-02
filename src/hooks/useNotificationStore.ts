import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useKaza } from "@/contexts/KazaContext";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchNotifications,
  dismissNotification,
  clearDismissed,
  getDismissedIds,
  syncPendingNotifications,
  StoredNotification,
} from "@/lib/notificationStore";

export function useNotificationStore() {
  const { homeId } = useKaza();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<StoredNotification[]>([]);

  const reload = useCallback(async () => {
    if (!homeId) return;
    const data = await fetchNotifications(homeId);
    const dismissed = user ? getDismissedIds(user.id) : [];
    setNotifications(data.filter((n) => !dismissed.includes(n.id)));
  }, [homeId, user]);

  // Initial load
  useEffect(() => { reload(); }, [reload]);

  // Listen for local updates
  useEffect(() => {
    window.addEventListener("kaza-notif-update", reload);
    return () => window.removeEventListener("kaza-notif-update", reload);
  }, [reload]);

  // Realtime: new notification inserted by any home member
  useEffect(() => {
    if (!homeId) return;
    const channel = supabase
      .channel(`home-notifs-${homeId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "home_notifications", filter: `home_id=eq.${homeId}` },
        () => reload()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [homeId, reload]);

  // Sync pending queue when back online
  useEffect(() => {
    const handleOnline = async () => {
      if (homeId) {
        await syncPendingNotifications(homeId);
        reload();
      }
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [homeId, reload]);

  const dismiss = useCallback((id: string) => {
    if (!user) return;
    dismissNotification(user.id, id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, [user]);

  const clearAll = useCallback(() => {
    if (!user) return;
    notifications.forEach((n) => dismissNotification(user.id, n.id));
    setNotifications([]);
  }, [user, notifications]);

  // clearDismissed is available for use if needed (resets the dismissed list)
  const resetDismissed = useCallback(() => {
    if (!user) return;
    clearDismissed(user.id);
  }, [user]);

  const unreadCount = notifications.length;

  return { notifications, dismiss, clearAll, resetDismissed, unreadCount };
}
