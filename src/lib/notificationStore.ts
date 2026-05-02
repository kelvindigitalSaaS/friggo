import { supabase } from "@/integrations/supabase/client";

export interface StoredNotification {
  id: string;
  home_id: string;
  title: string;
  body: string;
  type: string;
  created_at: string;
}

const PENDING_KEY = (homeId: string) => `kaza-notif-pending-${homeId}`;
const CACHE_KEY = (homeId: string) => `kaza-notif-cache-${homeId}`;
const DISMISSED_KEY = (userId: string) => `kaza-notif-dismissed-${userId}`;

function emitUpdate() {
  window.dispatchEvent(new Event("kaza-notif-update"));
}

function readJson<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || "") as T; } catch { return fallback; }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function saveNotification(
  homeId: string,
  notif: Pick<StoredNotification, "title" | "body" | "type">
) {
  if (navigator.onLine) {
    try {
      await supabase.from("home_notifications").insert({
        home_id: homeId,
        title: notif.title,
        body: notif.body ?? "",
        type: notif.type,
      });
      emitUpdate();
      return;
    } catch { /* fall through to offline queue */ }
  }

  // Offline: queue locally and update local cache for immediate display
  const pending: StoredNotification[] = readJson(PENDING_KEY(homeId), []);
  const entry: StoredNotification = {
    ...notif,
    id: crypto.randomUUID(),
    home_id: homeId,
    created_at: new Date().toISOString(),
  };
  localStorage.setItem(PENDING_KEY(homeId), JSON.stringify([entry, ...pending].slice(0, 50)));

  const cached: StoredNotification[] = readJson(CACHE_KEY(homeId), []);
  localStorage.setItem(CACHE_KEY(homeId), JSON.stringify([entry, ...cached].slice(0, 50)));
  emitUpdate();
}

export async function fetchNotifications(homeId: string): Promise<StoredNotification[]> {
  if (navigator.onLine) {
    const { data } = await supabase
      .from("home_notifications")
      .select("id, home_id, title, body, type, created_at")
      .eq("home_id", homeId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) {
      localStorage.setItem(CACHE_KEY(homeId), JSON.stringify(data));
      return data as StoredNotification[];
    }
  }
  return readJson<StoredNotification[]>(CACHE_KEY(homeId), []);
}

export async function syncPendingNotifications(homeId: string) {
  if (!navigator.onLine) return;
  const pending: StoredNotification[] = readJson(PENDING_KEY(homeId), []);
  if (!pending.length) return;
  for (const n of pending) {
    await supabase.from("home_notifications").insert({
      home_id: homeId, title: n.title, body: n.body ?? "", type: n.type,
    });
  }
  localStorage.removeItem(PENDING_KEY(homeId));
  emitUpdate();
}

export function getDismissedIds(userId: string): string[] {
  return readJson<string[]>(DISMISSED_KEY(userId), []);
}

export function dismissNotification(userId: string, id: string) {
  const list = getDismissedIds(userId);
  if (!list.includes(id)) {
    localStorage.setItem(DISMISSED_KEY(userId), JSON.stringify([id, ...list].slice(0, 300)));
  }
  emitUpdate();
}

export function clearDismissed(userId: string) {
  localStorage.removeItem(DISMISSED_KEY(userId));
  emitUpdate();
}
