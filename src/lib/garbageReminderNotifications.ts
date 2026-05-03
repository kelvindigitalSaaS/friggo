/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNative } from "./capacitor";
import {
  scheduleLocalNotification,
} from "./pushNotifications";

interface GarbageReminderConfig {
  enabled: boolean;
  selectedDays: number[]; // 0-6: Sunday-Saturday
  reminderTime: string; // "HH:MM"
  garbageLocation: "street" | "building";
  buildingFloor?: string;
}

/**
 * Initializes local device notifications for garbage collection.
 * For PWA: schedules 3 notifications (24h, 12h, 1h before)
 * For native: schedules 1 notification at exact time
 */
export async function initGarbageReminderNotifications() {
  const config = getGarbageReminderConfig();
  if (!config.enabled || config.selectedDays.length === 0) return;

  const nextCollectionDates = getNextCollectionDates(
    config.selectedDays,
    config.reminderTime,
    isNative ? 1 : 3
  );

  if (nextCollectionDates.length === 0) return;

  for (const date of nextCollectionDates) {
    const delayMs = Math.max(0, date.getTime() - Date.now());
    const hoursUntil = Math.round(delayMs / (1000 * 60 * 60));

    const title =
      config.garbageLocation === "building"
        ? "🗑️ Kaza — Hora de Descer o Lixo!"
        : "🗑️ Kaza — Coleta de Lixo";

    let body: string;
    if (hoursUntil === 0) {
      body =
        config.garbageLocation === "building"
          ? `⏰ É AGORA! Desça o lixo${config.buildingFloor ? ` do ${config.buildingFloor}` : ""} rápido! 🚛`
          : "⏰ É AGORA! Coloque o lixo para fora! 🚛";
    } else if (hoursUntil <= 1) {
      body =
        config.garbageLocation === "building"
          ? `Menos de 1h! Desça o lixo${config.buildingFloor ? ` do ${config.buildingFloor}` : ""} antes do caminhão 🚛`
          : "Menos de 1h! Coloque o lixo para fora 🚛";
    } else if (hoursUntil <= 12) {
      body =
        config.garbageLocation === "building"
          ? `Em ${hoursUntil}h passa a coleta. Prepare o lixo${config.buildingFloor ? ` do ${config.buildingFloor}` : ""} 🏢`
          : `Em ${hoursUntil}h passa a coleta. Separe o lixo! ♻️`;
    } else {
      body =
        config.garbageLocation === "building"
          ? `Amanhã tem coleta! Lembre de descer o lixo${config.buildingFloor ? ` do ${config.buildingFloor}` : ""} 📋`
          : "Amanhã tem coleta! Prepare os sacos de lixo para amanhã 📋";
    }

    await scheduleLocalNotification(
      title,
      body,
      delayMs,
      `garbage-${date.getTime()}`,
      "garbage"
    );
  }
}

/**
 * Syncs the garbage reminder config from DB to localStorage so any device
 * (not just the one that configured it) can fire notifications.
 */
async function syncConfigFromDb(homeId: string): Promise<GarbageReminderConfig | null> {
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase
      .from("garbage_reminders")
      .select("enabled, selected_days, reminder_time, garbage_location, building_floor")
      .eq("home_id", homeId)
      .eq("enabled", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data) return null;
    const cfg: GarbageReminderConfig = {
      enabled: data.enabled,
      selectedDays: data.selected_days ?? [],
      reminderTime: data.reminder_time ?? "20:00",
      garbageLocation: data.garbage_location ?? "street",
      buildingFloor: data.building_floor ?? undefined,
    };
    localStorage.setItem("kaza-garbage-reminder", JSON.stringify(cfg));
    return cfg;
  } catch { return null; }
}

/**
 * Checks DB to see if a garbage notification was already sent in the last FIRE_WINDOW_MS.
 * Prevents multiple devices from firing the same notification.
 */
async function wasGarbageRecentlySent(homeId: string, sinceMs: number): Promise<boolean> {
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const since = new Date(Date.now() - sinceMs).toISOString();
    const { data } = await supabase
      .from("home_notifications")
      .select("id")
      .eq("home_id", homeId)
      .eq("type", "garbage")
      .gte("created_at", since)
      .limit(1)
      .maybeSingle();
    return !!data;
  } catch { return false; }
}

/**
 * Fire-now check: called every 5 minutes by the monitoring loop.
 * All devices run this — DB dedup prevents duplicate fires.
 */
async function fireGarbagePushIfDue(config: GarbageReminderConfig) {
  const homeId = localStorage.getItem("kaza-home-id");
  if (!homeId) return;

  const now = Date.now();
  const FIRE_WINDOW_MS = 6 * 60 * 1000;

  const notifTimes = getNotificationTimesForCheck(config.selectedDays, config.reminderTime);

  for (const { date, hoursUntilCollection } of notifTimes) {
    const diff = now - date.getTime();
    if (diff < 0 || diff > FIRE_WINDOW_MS) continue;

    // Verificar especificamente para a notificação de horário exato
    if (hoursUntilCollection === 0 && Math.abs(diff) > FIRE_WINDOW_MS) continue;

    // Local dedup (fast path — same device)
    const key = `kaza-garbage-pushed-${date.getTime()}`;
    if (localStorage.getItem(key)) continue;

    // DB dedup — check if any device already sent this notification
    const alreadySent = await wasGarbageRecentlySent(homeId, FIRE_WINDOW_MS);
    if (alreadySent) { localStorage.setItem(key, "1"); continue; }

    localStorage.setItem(key, "1");

    const title =
      config.garbageLocation === "building"
        ? "🗑️ Kaza — Hora de Descer o Lixo!"
        : "🗑️ Kaza — Coleta de Lixo";

    let body: string;
    if (hoursUntilCollection === 0) {
      body =
        config.garbageLocation === "building"
          ? `⏰ É AGORA! Desça o lixo${config.buildingFloor ? ` do ${config.buildingFloor}` : ""} rápido! O caminhão está passando 🚛`
          : "⏰ É AGORA! Coloque o lixo para fora! O caminhão está passando 🚛";
    } else if (hoursUntilCollection <= 1) {
      body =
        config.garbageLocation === "building"
          ? `Em menos de 1 hora! Desça o lixo${config.buildingFloor ? ` do ${config.buildingFloor}` : ""} antes que o caminhão passe 🚛`
          : "Em menos de 1 hora! Coloque o lixo para fora antes que o caminhão passe 🚛";
    } else if (hoursUntilCollection <= 12) {
      body =
        config.garbageLocation === "building"
          ? `Em ${hoursUntilCollection}h passa a coleta. Prepare o lixo${config.buildingFloor ? ` do ${config.buildingFloor}` : ""} 🏢`
          : `Em ${hoursUntilCollection}h passa a coleta. Separe o lixo! ♻️`;
    } else {
      body =
        config.garbageLocation === "building"
          ? `Amanhã tem coleta! Lembre de descer o lixo${config.buildingFloor ? ` do ${config.buildingFloor}` : ""} 📋`
          : "Amanhã tem coleta! Prepare os sacos de lixo para amanhã 📋";
    }

    try {
      const { notifyHomeMembers } = await import("./pushNotifications");
      await notifyHomeMembers({ home_id: homeId, title, body, type: "garbage" });
    } catch { /* best-effort */ }
  }
}

/**
 * Returns notification trigger times for the upcoming (or very recently passed) collection.
 * Includes times within the last 24h to catch notifications missed while app was closed.
 */
function getNotificationTimesForCheck(
  selectedDays: number[],
  reminderTime: string
): Array<{ date: Date; hoursUntilCollection: number }> {
  const now = new Date();
  const [hours, minutes] = reminderTime.split(":").map(Number);

  // Look from yesterday forward to find the next collection day
  for (let i = -1; i <= 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    if (!selectedDays.includes(d.getDay())) continue;

    d.setHours(hours, minutes, 0, 0);

    // Skip if collection already passed by more than 25h
    if (d.getTime() < now.getTime() - 25 * 60 * 60 * 1000) continue;

    return [
      { date: new Date(d.getTime() - 24 * 60 * 60 * 1000), hoursUntilCollection: 24 },
      { date: new Date(d.getTime() - 12 * 60 * 60 * 1000), hoursUntilCollection: 12 },
      { date: new Date(d.getTime() - 1 * 60 * 60 * 1000), hoursUntilCollection: 1 },
      { date: d, hoursUntilCollection: 0 },
    ];
  }

  return [];
}

function getNextCollectionDates(
  selectedDays: number[],
  reminderTime: string,
  notificationCount: number
): Date[] {
  const now = new Date();
  const [hours, minutes] = reminderTime.split(":").map(Number);
  const dates: Date[] = [];

  const nextCollectionDays: Date[] = [];

  for (let i = 0; i < 14 && nextCollectionDays.length < 3; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.getDay();

    if (selectedDays.includes(dayOfWeek)) {
      date.setHours(hours, minutes, 0, 0);
      if (i === 0 && date.getTime() < now.getTime()) continue;
      nextCollectionDays.push(date);
    }
  }

  if (nextCollectionDays.length === 0) return [];

  const nextCollectionDate = nextCollectionDays[0];

  if (notificationCount === 1) {
    dates.push(nextCollectionDate);
  } else if (notificationCount === 3) {
    const notif24h = new Date(nextCollectionDate);
    notif24h.setDate(notif24h.getDate() - 1);
    if (notif24h.getTime() > now.getTime()) dates.push(notif24h);

    const notif12h = new Date(nextCollectionDate);
    notif12h.setHours(notif12h.getHours() - 12);
    if (notif12h.getTime() > now.getTime()) dates.push(notif12h);

    const notif1h = new Date(nextCollectionDate);
    notif1h.setHours(notif1h.getHours() - 1);
    if (notif1h.getTime() > now.getTime()) dates.push(notif1h);
  }

  return dates;
}

export function getGarbageReminderConfig(): GarbageReminderConfig {
  const saved = localStorage.getItem("kaza-garbage-reminder");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { enabled: false, selectedDays: [], reminderTime: "20:00", garbageLocation: "street" };
    }
  }
  return { enabled: false, selectedDays: [], reminderTime: "20:00", garbageLocation: "street" };
}

export async function syncGarbageReminderToDb(homeId: string | null | undefined) {
  if (!homeId) return;
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const cfg = getGarbageReminderConfig();
    await supabase.from("garbage_reminders").upsert({
      home_id: homeId,
      user_id: user.id,
      enabled: cfg.enabled,
      selected_days: cfg.selectedDays,
      reminder_time: cfg.reminderTime,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Sao_Paulo",
      garbage_location: cfg.garbageLocation,
      building_floor: cfg.buildingFloor ?? null,
    }, { onConflict: "home_id,user_id" });
  } catch (_e) { /* silent */ }
}

export async function checkAndScheduleGarbageNotifications() {
  // Sync config from DB so any device (not just the one that configured it) runs the check
  const homeId = localStorage.getItem("kaza-home-id");
  if (homeId) await syncConfigFromDb(homeId);

  const config = getGarbageReminderConfig();
  if (!config.enabled) return;

  // Push to home members if a notification time just arrived (DB dedup prevents duplicates)
  await fireGarbagePushIfDue(config);

  // Schedule local device notifications
  await initGarbageReminderNotifications();
}

export function stopGarbageReminderMonitoring() {
  if ((window as any).__garbageMonitorInterval) {
    clearInterval((window as any).__garbageMonitorInterval);
    delete (window as any).__garbageMonitorInterval;
  }
}

export function startGarbageReminderMonitoring() {
  stopGarbageReminderMonitoring();
  // Check every 1 minute to ensure timely notification at exact time
  (window as any).__garbageMonitorInterval = setInterval(() => {
    checkAndScheduleGarbageNotifications();
  }, 1 * 60 * 1000);
  checkAndScheduleGarbageNotifications();
}
