import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface AcceptInviteRequest {
  token: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const payload: AcceptInviteRequest = await req.json();
    const { token: inviteToken } = payload;

    if (!inviteToken) {
      return new Response(
        JSON.stringify({ error: "Missing invite token" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate invite exists and is not expired
    const { data: invite, error: inviteError } = await supabase
      .from("sub_account_invites")
      .select("*")
      .eq("token", inviteToken)
      .eq("status", "pending")
      .single();

    if (inviteError || !invite) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired invite token" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if invite has expired
    const expiresAt = new Date(invite.expires_at);
    const now = new Date();

    if (now > expiresAt) {
      return new Response(
        JSON.stringify({ error: "Invite has expired" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if group exists
    const { data: group, error: groupError } = await supabase
      .from("sub_account_groups")
      .select("*")
      .eq("id", invite.group_id)
      .single();

    if (groupError || !group) {
      return new Response(
        JSON.stringify({ error: "Group not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Call the RPC function to accept invite (does the actual acceptance logic)
    const { data, error } = await supabase.rpc("accept_invite", {
      invite_token: inviteToken,
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        group_id: invite.group_id,
        master_name: invite.master_name,
      }),
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
