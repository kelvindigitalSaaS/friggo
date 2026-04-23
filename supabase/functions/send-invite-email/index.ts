import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-anon-key",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function validateAuth(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) throw new Error("Missing Authorization header");
  
  const { data: { user }, error } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (error || !user) throw new Error("Invalid token");
  return user;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const user = await validateAuth(req);
    const { invited_email, group_id: requested_group_id } = await req.json();

    if (!invited_email) return json({ error: "Email do convidado é obrigatório" }, 400);

    let groupId = requested_group_id;

    if (!groupId) {
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("group_id, plan_tier, is_active")
        .eq("user_id", user.id)
        .maybeSingle();

      if (sub?.group_id) {
        groupId = sub.group_id;
      } else {
        const { data: access } = await supabase.from("v_user_access").select("in_trial").eq("user_id", user.id).maybeSingle();
        const isPro = access?.in_trial || (sub?.is_active && (sub.plan_tier === "multiPRO" || sub.plan_tier === "multi"));

        if (!isPro) return json({ error: "Você precisa de um plano PRO para convidar membros." }, 403);

        const { data: newGroup, error: groupErr } = await supabase
          .from("sub_account_groups")
          .insert({ master_user_id: user.id, plan_tier: "multi", max_members: 3 })
          .select("id")
          .single();

        if (groupErr) throw new Error("Falha ao criar grupo.");
        groupId = newGroup.id;
        await supabase.from("subscriptions").update({ group_id: groupId }).eq("user_id", user.id);
      }
    }

    const { data: group } = await supabase.from("sub_account_groups").select("id").eq("id", groupId).eq("master_user_id", user.id).maybeSingle();
    if (!group) return json({ error: "Permissão negada para este grupo." }, 403);

    const { data: masterProfile } = await supabase.from("profiles").select("name").eq("user_id", user.id).maybeSingle();
    const masterName = masterProfile?.name || user.email?.split("@")[0] || "Usuário Kaza";

    // UPSERT para evitar erro 23505 no reenvio
    const { data: invite, error: inviteErr } = await supabase
      .from("sub_account_invites")
      .upsert({ 
        group_id: groupId, 
        master_user_id: user.id, 
        master_name: masterName, 
        invited_email: invited_email.toLowerCase(),
        status: 'pending'
      }, { 
        onConflict: 'group_id,invited_email',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (inviteErr) throw inviteErr;

    // -- DISPARO RESEND --
    let appUrl = (Deno.env.get("PUBLIC_APP_URL") || "https://kaza.app").trim();
    // Limpeza profunda para evitar URLs malformadas ou com path duplicado
    appUrl = appUrl.replace(/\/app$/, "").replace(/\/$/, "");
    if (!appUrl.startsWith("http")) appUrl = `https://${appUrl}`;
    
    const inviteUrl = `${appUrl}/invite?token=${invite.token}`;
    
    // Limpeza da variável From para evitar Erro 422
    let fromValue = Deno.env.get("RESEND_FROM_EMAIL") || "Kaza <onboarding@kazapp.tech>";
    fromValue = fromValue.replace(/[\^\"\'\\]/g, "").trim(); // Remove lixo de terminal (como ^ ou aspas)

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${resendApiKey}` },
      body: JSON.stringify({
        from: fromValue,
        to: invited_email,
        subject: `${masterName} te convidou para o Kaza`,
        html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f4f7f6; font-family:Arial, Helvetica, sans-serif; color:#1f2d2a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background-color:#f4f7f6;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; width:100%; background-color:#ffffff; border-radius:20px; overflow:hidden;">
          <tr>
            <td align="center" style="padding:28px 24px 12px 24px; background-color:#165a52;">
              <img src="https://cdn-checkout.cakto.com.br/products/e04d9e2b-3252-44d3-86cc-4f8fb94fb659.png?width=180" alt="Kaza" width="96" style="display:block; width:96px; height:96px; border:0; border-radius:22px; margin:0 auto 16px auto;" />
              <div style="font-size:24px; line-height:32px; font-weight:700; color:#ffffff;">Kaza</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <p style="margin:0 0 14px 0; font-size:24px; line-height:32px; font-weight:700; color:#1f2d2a; text-align:center;">Você recebeu um convite</p>
              <p style="margin:0 0 24px 0; font-size:15px; line-height:24px; color:#52635f; text-align:center;">
                <strong>${masterName}</strong> te convidou para compartilhar a rotina no <strong>Kaza</strong>. Clique no botão abaixo para aceitar o convite e começar.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                <tr>
                  <td align="center" bgcolor="#165a52" style="border-radius:14px;">
                    <a href="${inviteUrl}" style="display:inline-block; padding:15px 26px; font-size:15px; line-height:20px; font-weight:700; color:#ffffff; text-decoration:none; background-color:#165a52; border-radius:14px;">Aceitar convite</a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0 0; font-size:12px; line-height:20px; color:#7b8a87; text-align:center;">Se você não esperava esta mensagem, ignore este e-mail.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
      })
    });

    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      return json({ error: `Falha no Resend: ${errorText}` }, 500);
    }

    return json({ success: true, invite_id: invite.id });
  } catch (err) {
    console.error(err);
    return json({ error: err.message }, 500);
  }
});
