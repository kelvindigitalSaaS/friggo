import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import webpush from "npm:web-push@3.6.7";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("KAZA_SERVICE_ROLE_KEY")!;
const webPushVapidPublic = Deno.env.get("WEB_PUSH_VAPID_PUBLIC")!;
const webPushVapidPrivate = Deno.env.get("WEB_PUSH_VAPID_PRIVATE")!;
const webPushContact = Deno.env.get("WEB_PUSH_CONTACT") || "mailto:suporte@kaza.app";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

if (webPushVapidPublic && webPushVapidPrivate) {
  webpush.setVapidDetails(webPushContact, webPushVapidPublic, webPushVapidPrivate);
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, apikey, x-client-info",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

/**
 * Processa notificações agendadas de lixo (garbage_reminders) e checkup noturno (notification_preferences)
 * Executado via cron job a cada 5 minutos
 */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    console.log("[CRON] Starting scheduled notifications processing");

    // ── PROCESSA GARBAGE REMINDERS ──────────────────────────────────────────
    console.log("[CRON] Processing garbage reminders...");
    const garbageResult = await processGarbageReminders();
    console.log("[CRON] Garbage result:", garbageResult);

    // ── PROCESSA NIGHT CHECKUP ──────────────────────────────────────────────
    console.log("[CRON] Processing night checkup...");
    const checkupResult = await processNightCheckup();
    console.log("[CRON] Night checkup result:", checkupResult);

    return json({
      success: true,
      garbage: garbageResult,
      checkup: checkupResult,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("[CRON ERROR]", error);
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal error",
      },
      500
    );
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// GARBAGE REMINDERS
// ═══════════════════════════════════════════════════════════════════════════

async function processGarbageReminders() {
  const FIRE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
  let processed = 0;
  let sent = 0;
  let errors = 0;

  try {
    // Buscar garbage_reminders que estão vencidas (next_fire_at <= now e <= 10min atrás)
    const { data: reminders, error: queryError } = await supabase
      .from("garbage_reminders")
      .select("id, home_id, user_id, enabled, selected_days, reminder_time, timezone, garbage_location, building_floor, last_fired_at")
      .eq("enabled", true)
      .lte("next_fire_at", new Date().toISOString())
      .gte("next_fire_at", new Date(Date.now() - FIRE_WINDOW_MS).toISOString());

    if (queryError) {
      console.error("[CRON] Error querying garbage_reminders:", queryError);
      return { processed: 0, sent: 0, errors: 1 };
    }

    if (!reminders || reminders.length === 0) {
      console.log("[CRON] No garbage reminders to process");
      return { processed: 0, sent: 0 };
    }

    console.log(`[CRON] Found ${reminders.length} garbage reminders to process`);

    for (const reminder of reminders) {
      processed++;

      try {
        // Verificar deduplicação: já foi enviado nos últimos 25h?
        const { data: recentNotif } = await supabase
          .from("home_notifications")
          .select("id")
          .eq("home_id", reminder.home_id)
          .eq("type", "garbage")
          .gte("created_at", new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString())
          .limit(1)
          .maybeSingle();

        if (recentNotif) {
          console.log(`[CRON] Garbage notification already sent for home ${reminder.home_id}`);
          continue;
        }

        // Buscar membros da casa
        const { data: members, error: membersError } = await supabase
          .from("home_members")
          .select("user_id")
          .eq("home_id", reminder.home_id);

        if (membersError || !members || members.length === 0) {
          console.warn(`[CRON] No members found for home ${reminder.home_id}`);
          errors++;
          continue;
        }

        const userIds = members.map((m) => m.user_id);

        // Buscar subscriptions ativas
        const { data: subscriptions, error: subsError } = await supabase
          .from("push_subscriptions")
          .select("id, endpoint, p256dh, auth")
          .in("user_id", userIds)
          .eq("is_active", true);

        if (subsError) {
          console.error(`[CRON] Error fetching subscriptions for home ${reminder.home_id}:`, subsError);
          errors++;
          continue;
        }

        if (!subscriptions || subscriptions.length === 0) {
          console.log(`[CRON] No active subscriptions for home ${reminder.home_id}`);
          continue;
        }

        // Construir mensagem
        const title = reminder.garbage_location === "building"
          ? "🗑️ Kaza — Hora de Descer o Lixo!"
          : "🗑️ Kaza — Coleta de Lixo";

        const body = reminder.garbage_location === "building"
          ? `Desça o lixo${reminder.building_floor ? ` do ${reminder.building_floor}` : ""} agora! O caminhão está passando 🚛`
          : "Coloque o lixo para fora agora! O caminhão está passando 🚛";

        const pushPayload = JSON.stringify({
          title,
          body,
          icon: "/icons/100.png",
          badge: "/icons/badge-96.svg",
          data: {
            type: "garbage",
            action: "garbage",
            url: "/app/home?tab=home"
          },
        });

        // Enviar push para cada subscription
        let sentCount = 0;
        const expiredIds: string[] = [];

        for (const sub of subscriptions) {
          if (!sub.endpoint || !sub.p256dh || !sub.auth) continue;
          try {
            await webpush.sendNotification(
              { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
              pushPayload,
              { TTL: 60 * 60 * 24 } // 24h TTL
            );
            sentCount++;
          } catch (err: any) {
            console.error(`[CRON] Failed to send push to ${sub.id}:`, err?.statusCode);
            // 410 Gone ou 404 = subscription expirada
            if (err?.statusCode === 410 || err?.statusCode === 404) {
              expiredIds.push(sub.id);
            }
          }
        }

        // Marcar subscriptions expiradas
        if (expiredIds.length > 0) {
          await supabase.from("push_subscriptions").update({ is_active: false }).in("id", expiredIds);
        }

        // Gravar notificação em home_notifications (deduplication + histórico)
        await supabase.from("home_notifications").insert({
          home_id: reminder.home_id,
          title,
          body,
          type: "garbage",
        });

        // Atualizar last_fired_at e calcular próximo next_fire_at
        // O trigger SQL vai atualizar next_fire_at automaticamente
        const { error: updateError } = await supabase
          .from("garbage_reminders")
          .update({ last_fired_at: new Date().toISOString() })
          .eq("id", reminder.id);

        if (updateError) {
          console.error(`[CRON] Error updating garbage reminder ${reminder.id}:`, updateError);
          errors++;
        } else {
          sent += sentCount;
          console.log(`[CRON] Sent ${sentCount} garbage notifications for home ${reminder.home_id}`);
        }
      } catch (err) {
        console.error(`[CRON] Error processing garbage reminder ${reminder.id}:`, err);
        errors++;
      }
    }

    return { processed, sent, errors };
  } catch (error) {
    console.error("[CRON] Unexpected error in processGarbageReminders:", error);
    return { processed, sent, errors: errors + 1 };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// NIGHT CHECKUP
// ═══════════════════════════════════════════════════════════════════════════

async function processNightCheckup() {
  let processed = 0;
  let sent = 0;
  let errors = 0;

  try {
    // Buscar todas as preferências onde night_checkup está ativo
    const { data: prefs, error: queryError } = await supabase
      .from("notification_preferences")
      .select("user_id, home_id, night_checkup, nightly_checkup_time, timezone")
      .eq("night_checkup", true)
      .not("nightly_checkup_time", "is", null);

    if (queryError) {
      console.error("[CRON] Error querying notification_preferences:", queryError);
      return { processed: 0, sent: 0, errors: 1 };
    }

    if (!prefs || prefs.length === 0) {
      console.log("[CRON] No night checkup preferences to process");
      return { processed: 0, sent: 0 };
    }

    console.log(`[CRON] Found ${prefs.length} night checkup preferences`);

    // Agrupar por home_id para evitar duplicatas
    const homeCheckups: Record<string, { timezone: string; checkupTime: string }> = {};
    for (const pref of prefs) {
      if (!homeCheckups[pref.home_id!]) {
        homeCheckups[pref.home_id!] = {
          timezone: pref.timezone || "America/Sao_Paulo",
          checkupTime: pref.nightly_checkup_time as string,
        };
      }
    }

    for (const [homeId, config] of Object.entries(homeCheckups)) {
      processed++;

      try {
        // Verificar se estamos na janela ±5 minutos do horário configurado
        const now = new Date();
        const timeZone = config.timezone || "America/Sao_Paulo";

        // Obter hora atual na timezone
        const currentTimeStr = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone,
        }).format(now);

        const [currentHours, currentMinutes] = currentTimeStr.split(":").map(Number);
        const currentTotalMinutes = currentHours * 60 + currentMinutes;

        const [checkupHours, checkupMinutes] = config.checkupTime.split(":").map(Number);
        const checkupTotalMinutes = checkupHours * 60 + checkupMinutes;

        const diffMinutes = Math.abs(currentTotalMinutes - checkupTotalMinutes);

        // Se não está na janela de ±5 minutos, pular
        if (diffMinutes > 5 && (1440 - diffMinutes) > 5) {
          continue;
        }

        // Verificar deduplicação: já foi enviado nos últimas 23h?
        const { data: recentNotif } = await supabase
          .from("home_notifications")
          .select("id")
          .eq("home_id", homeId)
          .eq("type", "nightCheckup")
          .gte("created_at", new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString())
          .limit(1)
          .maybeSingle();

        if (recentNotif) {
          console.log(`[CRON] Night checkup already sent for home ${homeId}`);
          continue;
        }

        // Buscar membros da casa
        const { data: members, error: membersError } = await supabase
          .from("home_members")
          .select("user_id")
          .eq("home_id", homeId);

        if (membersError || !members || members.length === 0) {
          console.warn(`[CRON] No members found for home ${homeId}`);
          errors++;
          continue;
        }

        const userIds = members.map((m) => m.user_id);

        // Buscar subscriptions ativas
        const { data: subscriptions, error: subsError } = await supabase
          .from("push_subscriptions")
          .select("id, endpoint, p256dh, auth")
          .in("user_id", userIds)
          .eq("is_active", true);

        if (subsError || !subscriptions || subscriptions.length === 0) {
          console.log(`[CRON] No active subscriptions for home ${homeId}`);
          continue;
        }

        // Mensagem do checkup
        const title = "✅ Kaza — Checkup da Noite";
        const body = "Como foi o dia? Responda o checkup para melhorar os alertas!";

        const pushPayload = JSON.stringify({
          title,
          body,
          icon: "/icons/100.png",
          badge: "/icons/badge-96.svg",
          data: {
            type: "nightCheckup",
            action: "checkup",
            url: "/app/home?tab=home"
          },
        });

        // Enviar push
        let sentCount = 0;
        const expiredIds: string[] = [];

        for (const sub of subscriptions) {
          if (!sub.endpoint || !sub.p256dh || !sub.auth) continue;
          try {
            await webpush.sendNotification(
              { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
              pushPayload,
              { TTL: 60 * 60 * 24 }
            );
            sentCount++;
          } catch (err: any) {
            if (err?.statusCode === 410 || err?.statusCode === 404) {
              expiredIds.push(sub.id);
            }
          }
        }

        if (expiredIds.length > 0) {
          await supabase.from("push_subscriptions").update({ is_active: false }).in("id", expiredIds);
        }

        // Gravar notificação
        await supabase.from("home_notifications").insert({
          home_id: homeId,
          title,
          body,
          type: "nightCheckup",
        });

        sent += sentCount;
        console.log(`[CRON] Sent ${sentCount} night checkup notifications for home ${homeId}`);
      } catch (err) {
        console.error(`[CRON] Error processing checkup for home ${homeId}:`, err);
        errors++;
      }
    }

    return { processed, sent, errors };
  } catch (error) {
    console.error("[CRON] Unexpected error in processNightCheckup:", error);
    return { processed, sent, errors: errors + 1 };
  }
}
