/* eslint-disable @typescript-eslint/no-explicit-any */
import { scheduleLocalNotification } from "./pushNotifications";
import { supabase } from "@/integrations/supabase/client";

interface NightCheckupConfig {
  enabled: boolean;
  checkupTime: string; // "HH:MM"
}

function getNightCheckupConfig(): NightCheckupConfig {
  const saved = localStorage.getItem("kaza-night-checkup-config");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { enabled: false, checkupTime: "21:00" };
    }
  }
  return { enabled: false, checkupTime: "21:00" };
}

async function wasNightCheckupRecentlySent(homeId: string, sinceMs: number = 25 * 60 * 60 * 1000): Promise<boolean> {
  try {
    const since = new Date(Date.now() - sinceMs).toISOString();
    const { data } = await supabase
      .from("home_notifications")
      .select("id")
      .eq("home_id", homeId)
      .eq("type", "nightCheckup")
      .gte("created_at", since)
      .limit(1)
      .maybeSingle();
    return !!data;
  } catch {
    return false;
  }
}

async function fireNightCheckupIfDue(config: NightCheckupConfig) {
  const homeId = localStorage.getItem("kaza-home-id");
  if (!homeId || !config.enabled) return;

  const now = new Date();
  const [hours, minutes] = config.checkupTime.split(":").map(Number);

  const checkupDate = new Date(now);
  checkupDate.setHours(hours, minutes, 0, 0);

  const now_ms = Date.now();
  const FIRE_WINDOW_MS = 6 * 60 * 1000; // 6 minute window
  const diff = now_ms - checkupDate.getTime();

  // Se já passou a hora de checkup
  if (diff < 0 || diff > FIRE_WINDOW_MS) return;

  // Verificar se já foi enviado hoje
  const alreadySent = await wasNightCheckupRecentlySent(homeId, 25 * 60 * 60 * 1000);
  if (alreadySent) return;

  // Marcar como enviado localmente
  const key = `kaza-night-checkup-sent-${checkupDate.getTime()}`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, "1");

  // Enviar notificação
  const titles = {
    "pt-BR": "🌙 Kaza — Check-up Noturno",
    en: "🌙 Kaza — Night Check-up",
    es: "🌙 Kaza — Chequeo Nocturno"
  };

  const bodies = {
    "pt-BR": "Tudo certo na cozinha para descansar? Fazer uma revisão rápida 📋",
    en: "Everything ready in the kitchen to rest? Quick review? 📋",
    es: "¿Todo bien en la cocina para descansar? Revisión rápida 📋"
  };

  const language = localStorage.getItem("kaza-language") || "pt-BR";
  const title = titles[language as keyof typeof titles] || titles["pt-BR"];
  const body = bodies[language as keyof typeof bodies] || bodies["pt-BR"];

  try {
    const { notifyHomeMembers } = await import("./pushNotifications");
    await notifyHomeMembers({
      home_id: homeId,
      title,
      body,
      type: "nightCheckup"
    });
  } catch {
    // best-effort
  }

  // Agendar notificação local também (delay 0 pois a hora já chegou)
  await scheduleLocalNotification(title, body, 0, `night-checkup-${checkupDate.getTime()}`, "general");
}

export function getNightCheckupTime(): string {
  const config = getNightCheckupConfig();
  return config.checkupTime;
}

export async function checkAndScheduleNightCheckupNotifications() {
  const homeId = localStorage.getItem("kaza-home-id");
  if (!homeId) return;

  // Sync config from onboarding data
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_data")
      .eq("user_id", user.id)
      .single();

    if (profile?.onboarding_data) {
      const onboardingData = profile.onboarding_data as any;
      if (onboardingData.nightCheckupTime || onboardingData.notificationPrefs?.includes("nightCheckup")) {
        const config: NightCheckupConfig = {
          enabled: onboardingData.notificationPrefs?.includes("nightCheckup") ?? true,
          checkupTime: onboardingData.nightCheckupTime || "21:00"
        };
        localStorage.setItem("kaza-night-checkup-config", JSON.stringify(config));
      }
    }
  } catch {
    // continue with cached config
  }

  const config = getNightCheckupConfig();
  if (!config.enabled) return;

  await fireNightCheckupIfDue(config);
}

export function stopNightCheckupMonitoring() {
  if ((window as any).__nightCheckupMonitorInterval) {
    clearInterval((window as any).__nightCheckupMonitorInterval);
    delete (window as any).__nightCheckupMonitorInterval;
  }
}

export function startNightCheckupMonitoring() {
  stopNightCheckupMonitoring();
  (window as any).__nightCheckupMonitorInterval = setInterval(() => {
    checkAndScheduleNightCheckupNotifications();
  }, 5 * 60 * 1000); // Check every 5 minutes
  checkAndScheduleNightCheckupNotifications(); // Check immediately
}
