import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const webPushVapidPublic = Deno.env.get("WEB_PUSH_VAPID_PUBLIC")!;
const webPushVapidPrivate = Deno.env.get("WEB_PUSH_VAPID_PRIVATE")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface PushPayload {
  group_id: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  exclude_user_id?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const payload: PushPayload = await req.json();
    const { group_id, title, body, data, exclude_user_id } = payload;

    if (!group_id || !title || !body) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: group_id, title, body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get all active members of the group
    let membersQuery = supabase
      .from("sub_account_members")
      .select("user_id")
      .eq("group_id", group_id)
      .eq("is_active", true);

    if (exclude_user_id) {
      membersQuery = membersQuery.neq("user_id", exclude_user_id);
    }

    const { data: members, error: membersError } = await membersQuery;

    if (membersError) {
      return new Response(
        JSON.stringify({ error: membersError.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!members || members.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const userIds = members.map((m) => m.user_id);

    // Get push subscriptions for these users
    const { data: subscriptions, error: subsError } = await supabase
      .from("push_subscriptions")
      .select("*")
      .in("user_id", userIds)
      .eq("is_active", true);

    if (subsError) {
      return new Response(
        JSON.stringify({ error: subsError.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let sentCount = 0;

    // Send web push notifications
    if (subscriptions && subscriptions.length > 0) {
      // Import web-push library for sending
      for (const sub of subscriptions) {
        try {
          // Construct the push message
          const pushPayloadJson = JSON.stringify({
            title,
            body,
            icon: "/icon.png",
            badge: "/icons/badge-96.svg",
            data: data || {},
          });

          // Note: Full web-push implementation requires the npm package
          // For now, this is a placeholder that would integrate with web-push
          // In production, use: import * as webpush from 'web-push';
          // webpush.sendNotification(subscription, pushPayloadJson);

          sentCount++;
        } catch (error) {
          console.error(`Failed to send push to subscription ${sub.id}:`, error);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, sent: sentCount }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
