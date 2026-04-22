import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
};

/**
 * Valida o JWT do usuário e retorna o objeto User.
 */
/**
 * Valida o JWT do usuário e retorna o objeto User.
 */
export async function validateAuth(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    console.error("[AUTH] Missing Authorization header");
    throw new AuthError("Missing Authorization header");
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("KAZA_ANON_KEY")!;
  
  // Criamos o cliente passando o header de Authorization. 
  // O Supabase resolverá a identidade do usuário automaticamente no servidor.
  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: { user }, error } = await authClient.auth.getUser();

  if (error || !user) {
    console.error("[AUTH] User identification failed:", error?.message);
    throw new AuthError(`Identification failed: ${error?.message || "User not found"}`);
  }

  console.log("[AUTH] User identified:", user.id);
  return user;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}


/**
 * Verifica se o usuário pertence à casa (home_id) ou ao grupo (group_id).
 */
export async function verifyMembership(
  supabaseClient: any, 
  userId: string, 
  homeId?: string, 
  groupId?: string
) {
  if (homeId) {
    const { data: membership, error } = await supabaseClient
      .from("home_members")
      .select("role")
      .eq("home_id", homeId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error || !membership) {
      throw new Error("Access denied: You are not a member of this home.");
    }
    return membership;
  }

  if (groupId) {
    const { data: groupMembership, error } = await supabaseClient
      .from("sub_account_members")
      .select("role")
      .eq("group_id", groupId)
      .eq("user_id", userId)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !groupMembership) {
      throw new Error("Access denied: You are not an active member of this group.");
    }
    return groupMembership;
  }

  return true;
}
