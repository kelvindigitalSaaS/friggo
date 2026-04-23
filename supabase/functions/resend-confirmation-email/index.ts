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
    const { email, redirect_to } = await req.json();
    if (!email) return json({ error: "E-mail é obrigatório" }, 400);

    let appUrl = (Deno.env.get("PUBLIC_APP_URL") || "https://kaza.app").trim();
    // Limpeza profunda para evitar caminhos duplicados (/app/auth) ou espaços
    appUrl = appUrl.replace(/\/app$/, "").replace(/\/$/, "");
    if (!appUrl.startsWith("http")) appUrl = `https://${appUrl}`;

    const redirectTo = redirect_to || `${appUrl}/auth`;

    console.log(`[RESEND] Enviando link para: ${email}`);

    // Geração de Link
    let { data: linkRes, error: linkErr } = await supabase.auth.admin.generateLink({
      type: "signup",
      email,
      options: { redirectTo },
    });

    let isMagic = false;
    if (linkErr) {
      const { data: magicRes, error: magicErr } = await supabase.auth.admin.generateLink({
        type: "magiclink",
        email,
        options: { redirectTo },
      });
      if (magicErr) throw magicErr;
      linkRes = magicRes;
      isMagic = true;
    }

    const actionLink = linkRes?.properties?.action_link;
    if (!actionLink) throw new Error("Link não gerado.");

    // -- DISPARO RESEND --
    let fromValue = Deno.env.get("RESEND_FROM_EMAIL") || "Kaza <team@kazapp.tech>";
    fromValue = fromValue.replace(/[\^\"\'\\]/g, "").trim(); 

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${resendApiKey}` },
      body: JSON.stringify({
        from: fromValue,
        to: email,
        subject: isMagic ? "Seu link de acesso" : "Confirme seu e-mail",
        html: `<div style="font-family:sans-serif;padding:32px;background:#f5fdf9">
          <div style="max-width:480px;margin:0 auto;background:#fff;padding:32px;border-radius:20px;box-shadow:0 4px 24px rgba(0,0,0,0.05)">
            <h2 style="color:#165A52">${isMagic ? "Link de acesso" : "Bem-vindo ao Kaza!"}</h2>
            <p style="color:#548A76;line-height:1.6">${isMagic ? "Clique no botão para entrar na sua conta." : "Clique abaixo para ativar sua conta do Kaza."}</p>
            <a href="${actionLink}" style="display:inline-block;margin-top:20px;background:#165A52;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700">Acessar App →</a>
          </div>
        </div>`
      })
    });

    if (!emailRes.ok) {
       const errText = await emailRes.text();
       return json({ error: `Falha no Resend: ${errText}` }, 500);
    }

    return json({ success: true });
  } catch (err) {
    console.error("ERROR:", err);
    return json({ error: err.message }, 500);
  }
});
