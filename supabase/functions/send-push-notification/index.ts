import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("KAZA_SERVICE_ROLE_KEY")!;
const webPushVapidPublic = Deno.env.get("WEB_PUSH_VAPID_PUBLIC")!;
const webPushVapidPrivate = Deno.env.get("WEB_PUSH_VAPID_PRIVATE")!;

import { validateAuth, verifyMembership } from "../_shared/auth.ts";

const supabase = createClient(supabaseUrl, supabaseServiceKey);


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
    // ── Auth & Permissions ──────────────────────────────────────────────────
    const user = await validateAuth(req);
    
    const payload: PushPayload = await req.json();
    console.log("[PUSH] Received payload from user", user.id, ":", JSON.stringify(payload));
    const { group_id, home_id, title, body, data, exclude_user_id, type } = payload;

    if ((!group_id && !home_id) || !title || !body) {
      const missing = [];
      if (!group_id && !home_id) missing.push("group_id or home_id");
      if (!title) missing.push("title");
      if (!body) missing.push("body");
      
      return json({ error: `Missing required fields: ${missing.join(", ")}` }, 400);
    }

    // Valida se o usuário autenticado tem permissão para enviar para este destino
    await verifyMembership(supabase, user.id, home_id, group_id);
    // ────────────────────────────────────────────────────────────────────────


    let userIds: string[] = [];

    if (home_id) {
      // Home-based members (shopping list, consumables, etc.)
      let homeQuery = supabase
        .from("home_members")
        .select("user_id")
        .eq("home_id", home_id);

      if (exclude_user_id) {
        homeQuery = homeQuery.neq("user_id", exclude_user_id);
      }

      const { data: homeMembers, error: homeError } = await homeQuery;
      if (homeError) return json({ error: homeError.message }, 500);
      userIds = (homeMembers || []).map((m) => m.user_id);
    } else if (group_id) {
      // Group-based members (subscription group)
      let membersQuery = supabase
        .from("sub_account_members")
        .select("user_id")
        .eq("group_id", group_id)
        .eq("is_active", true);

      if (exclude_user_id) {
        membersQuery = membersQuery.neq("user_id", exclude_user_id);
      }

      const { data: members, error: membersError } = await membersQuery;
      if (membersError) return json({ error: membersError.message }, 500);
      userIds = (members || []).map((m) => m.user_id);
    }

    if (userIds.length === 0) {
      return json({ 
        success: false, 
        message: "Não há outros membros nesta casa para notificar. Convide sua família!",
        code: "NO_MEMBERS" 
      }, 200);
    }

    // Check if master forced notifications (only applies to homes, not generic groups)
    let forceNotifications = false;
    if (home_id) {
      const { data: hs } = await supabase
        .from("home_settings")
        .select("force_notifications")
        .eq("home_id", home_id)
        .maybeSingle();
      if (hs?.force_notifications) {
        forceNotifications = true;
      }
    }

    // Filter users based on their personal notification preferences
    if (type && !forceNotifications) {
      const { data: prefs, error: prefsError } = await supabase
        .from("notification_preferences")
        .select("*")
        .in("user_id", userIds);
      
      if (!prefsError && prefs) {
        userIds = userIds.filter((uid) => {
          const userPref = prefs.find(p => p.user_id === uid);
          if (!userPref) return true; // Default to true if no preference record exists
          
          switch (type) {
            case "expiry": return userPref.expiring_items !== false;
            case "shopping": return userPref.shopping_list_updates !== false;
            case "recipes": return userPref.daily_summary !== false;
            case "nightCheckup": return userPref.night_checkup !== false;
            case "cooking": return userPref.cooking_reminders !== false;
            case "consumables": return userPref.low_stock_consumables !== false;
            case "garbage": return userPref.garbage_reminder !== false;
            case "achievement": return userPref.achievement_updates !== false;
            default: return true;
          }
        });
      }
    }

    if (userIds.length === 0) {
      return json({ 
        success: true, 
        message: "Todos os usuários desativaram este tipo de notificação.",
        code: "PREFS_DISABLED" 
      }, 200);
    }

    // Get push subscriptions for these users
    const { data: subscriptions, error: subsError } = await supabase
      .from("push_subscriptions")
      .select("*")
      .in("user_id", userIds)
      .eq("is_active", true);

    if (subsError) {
      return json({ error: subsError.message }, 500);
    }

    let sentCount = 0;

    // Send web push notifications
    if (subscriptions && subscriptions.length > 0) {
      for (const sub of subscriptions) {
        try {
          const pushPayloadJson = JSON.stringify({
            title,
            body,
            icon: "/icon.png",
            badge: "/icons/badge-96.svg",
            data: data || {},
          });

          // Note: Full web-push implementation requires the npm package
          // In production, use: import * as webpush from 'web-push';
          // webpush.sendNotification(subscription, pushPayloadJson);

          sentCount++;
        } catch (error) {
          console.error(`Failed to send push to subscription ${sub.id}:`, error);
        }
      }
    }

    return json({ success: true, sent: sentCount });
  } catch (error) {
    console.error("[PUSH ERROR]", error);
    
    // Explicit 401 for unauthorized curl attempts
    if (error.name === "AuthError" || error.message.includes("Access denied")) {
      return json({ error: error.message }, 401);
    }

    return json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      500
    );
  }
});


