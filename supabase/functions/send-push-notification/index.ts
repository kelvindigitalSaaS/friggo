import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import webpush from "npm:web-push@3.6.7";

import { validateAuth, verifyMembership } from "../_shared/auth.ts";

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

interface PushPayload {
  group_id?: string;
  home_id?: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  exclude_user_id?: string;
  type?: "expiry" | "shopping" | "recipes" | "nightCheckup" | "cooking" | "consumables" | "garbage" | "achievement";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const user = await validateAuth(req);

    const payload: PushPayload = await req.json();
    console.log("[PUSH] Received from user", user.id, ":", JSON.stringify(payload));
    const { group_id, home_id, title, body, data, exclude_user_id, type } = payload;

    if ((!group_id && !home_id) || !title || !body) {
      const missing = [];
      if (!group_id && !home_id) missing.push("group_id or home_id");
      if (!title) missing.push("title");
      if (!body) missing.push("body");
      return json({ error: `Missing required fields: ${missing.join(", ")}` }, 400);
    }

    await verifyMembership(supabase, user.id, home_id, group_id);

    let userIds: string[] = [];

    if (home_id) {
      let q = supabase.from("home_members").select("user_id").eq("home_id", home_id);
      if (exclude_user_id) q = q.neq("user_id", exclude_user_id);
      const { data: members, error } = await q;
      if (error) return json({ error: error.message }, 500);
      userIds = (members || []).map((m) => m.user_id);
    } else if (group_id) {
      let q = supabase.from("sub_account_members").select("user_id").eq("group_id", group_id).eq("is_active", true);
      if (exclude_user_id) q = q.neq("user_id", exclude_user_id);
      const { data: members, error } = await q;
      if (error) return json({ error: error.message }, 500);
      userIds = (members || []).map((m) => m.user_id);
    }

    if (userIds.length === 0) {
      return json({ success: false, message: "Nenhum membro para notificar.", code: "NO_MEMBERS" }, 200);
    }

    // force_notifications override
    let forceNotifications = false;
    if (home_id) {
      const { data: hs } = await supabase
        .from("home_settings").select("force_notifications").eq("home_id", home_id).maybeSingle();
      if (hs?.force_notifications) forceNotifications = true;
    }

    // Filter by notification preferences
    if (type && !forceNotifications) {
      const { data: prefs } = await supabase
        .from("notification_preferences").select("*").in("user_id", userIds);
      if (prefs) {
        userIds = userIds.filter((uid) => {
          const pref = prefs.find((p) => p.user_id === uid);
          if (!pref) return true;
          switch (type) {
            case "expiry":       return pref.expiring_items !== false;
            case "shopping":     return pref.shopping_list_updates !== false;
            case "recipes":      return pref.daily_summary !== false;
            case "nightCheckup": return pref.night_checkup !== false;
            case "cooking":      return pref.cooking_reminders !== false;
            case "consumables":  return pref.low_stock_consumables !== false;
            case "garbage":      return pref.garbage_reminder !== false;
            case "achievement":  return pref.achievement_updates !== false;
            default:             return true;
          }
        });
      }
    }

    if (userIds.length === 0) {
      return json({ success: true, message: "Notificações desativadas pelos membros.", code: "PREFS_DISABLED" }, 200);
    }

    const { data: subscriptions, error: subsError } = await supabase
      .from("push_subscriptions").select("*").in("user_id", userIds).eq("is_active", true);

    if (subsError) return json({ error: subsError.message }, 500);

    const pushPayloadJson = JSON.stringify({
      title,
      body,
      icon: "/icons/100.png",
      badge: "/icons/badge-96.svg",
      data: data || {},
    });

    let sentCount = 0;
    const expiredIds: string[] = [];

    for (const sub of subscriptions || []) {
      if (!sub.endpoint || !sub.p256dh || !sub.auth) continue;
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          pushPayloadJson,
          { TTL: 60 * 60 * 24 } // 24h TTL
        );
        sentCount++;
      } catch (err: any) {
        console.error(`[PUSH] Failed for sub ${sub.id}:`, err?.statusCode, err?.body);
        // 410 Gone or 404 = subscription expired, mark inactive
        if (err?.statusCode === 410 || err?.statusCode === 404) {
          expiredIds.push(sub.id);
        }
      }
    }

    // Clean up expired subscriptions
    if (expiredIds.length > 0) {
      await supabase.from("push_subscriptions").update({ is_active: false }).in("id", expiredIds);
    }

    console.log(`[PUSH] Sent ${sentCount}/${(subscriptions || []).length} notifications`);
    return json({ success: true, sent: sentCount });
  } catch (error) {
    console.error("[PUSH ERROR]", error);
    if (error.name === "AuthError" || error.message?.includes("Access denied")) {
      return json({ error: error.message }, 401);
    }
    return json({ error: error instanceof Error ? error.message : "Internal server error" }, 500);
  }
});
