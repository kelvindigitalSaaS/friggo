import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const CAKTO_WEBHOOK_SECRET = Deno.env.get("CAKTO_WEBHOOK_SECRET") || "";
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function sendCancellationEmail(toEmail: string, userName: string) {
  if (!resendApiKey) return;
  let fromValue = Deno.env.get("RESEND_FROM_EMAIL") || "Kaza <team@kazapp.tech>";
  fromValue = fromValue.replace(/[\^\"\'\\]/g, "").trim();
  const appUrl = (Deno.env.get("PUBLIC_APP_URL") || "https://kaza.app").replace(/\/$/, "");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
    body: JSON.stringify({
      from: fromValue,
      to: toEmail,
      subject: "Sua assinatura do Kaza foi cancelada",
      html: `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,sans-serif;color:#1f2d2a;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7f6;">
    <tr><td align="center" style="padding:24px 12px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#fff;border-radius:20px;overflow:hidden;">
        <tr><td align="center" style="padding:28px 24px 12px;background:#165a52;">
          <div style="font-size:24px;font-weight:700;color:#fff;">Kaza</div>
        </td></tr>
        <tr><td style="padding:32px 28px;">
          <p style="margin:0 0 14px;font-size:22px;font-weight:700;text-align:center;">Assinatura cancelada</p>
          <p style="margin:0 0 20px;font-size:15px;color:#52635f;text-align:center;">
            Olá, <strong>${userName}</strong>. Sua assinatura do Kaza foi cancelada e seu acesso foi migrado para o plano Grátis.
          </p>
          <p style="margin:0 0 20px;font-size:15px;color:#52635f;text-align:center;">
            Se isso foi um engano ou quiser reativar, clique abaixo.
          </p>
          <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
            <tr><td align="center" bgcolor="#165a52" style="border-radius:14px;">
              <a href="${appUrl}" style="display:inline-block;padding:15px 26px;font-size:15px;font-weight:700;color:#fff;text-decoration:none;border-radius:14px;">Reativar assinatura</a>
            </td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#7b8a87;text-align:center;">Obrigado por usar o Kaza.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
    }),
  }).catch((e) => console.error("❌ Erro ao enviar email de cancelamento:", e));
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const payloadText = await req.text();
    let webhookData;

    try {
      webhookData = JSON.parse(payloadText);
    } catch (_e) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    console.log("🔔 Webhook recebido:", webhookData.event);

    // ── Validação do secret ──
    const secretFromBody = webhookData.secret;
    if (!secretFromBody || secretFromBody !== CAKTO_WEBHOOK_SECRET) {
      console.error("❌ Secret inválido. Esperado:", CAKTO_WEBHOOK_SECRET, "Recebido:", secretFromBody);
      return new Response(JSON.stringify({ error: "Invalid secret" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    console.log("✅ Secret validado");

    // ── Extrair dados ──
    const event = webhookData.event;
    const transaction = webhookData.data;
    const customer = transaction?.customer;

    if (!customer?.email) {
      return new Response(JSON.stringify({ error: "No customer email" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const email = customer.email.toLowerCase().trim();
    console.log("📧 Email do cliente:", email);

    // ── Buscar usuário pelo email ──
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, user_id, plan_type, subscription_status")
      .eq("email", email)
      .maybeSingle();

    if (profileError) {
      console.error("❌ Erro ao buscar perfil:", profileError);
      return new Response(JSON.stringify({ error: "DB error", details: profileError.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    if (!profile) {
      if (email === "test@test.com" || email === "teste@teste.com" || email === "john.doe@example.com") {
        console.log("ℹ️ Evento de teste ignorado com sucesso (Cakto Test)");
        return new Response(JSON.stringify({ success: true, message: "Test payload processed" }), {
          status: 200,
          headers: corsHeaders,
        });
      }
      console.error("❌ Usuário não encontrado para:", email);
      return new Response(JSON.stringify({ error: "User not found", email }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    console.log("👤 Perfil encontrado:", profile.id);

    let resultMsg = "Event ignored";
    const transactionId = transaction.id || "unknown";

    // ── purchase_approved ──
    if (event === "purchase_approved") {
      console.log("💳 Processando compra aprovada...");

      const productId = transaction?.product?.id || "";
      const isMulti = productId.includes("wbjq4ne") || productId.includes("846287");
      const planTier = isMulti ? "multiPRO" : "individualPRO";
      const planLabel = isMulti ? "multiPRO" : "individualPRO";

      console.log(`📦 Plano detectado: ${planTier} (Product ID: ${productId})`);

      const { error: updateErr } = await supabase.from("profiles").update({
        plan_type: planTier,
        subscription_status: "active",
        last_payment_date: new Date().toISOString(),
        payment_method: transaction.paymentMethod || "credit_card",
        cakto_customer_id: customer.docNumber || "",
      }).eq("id", profile.id);

      if (updateErr) {
        console.error("❌ Erro ao atualizar perfil:", updateErr);
      } else {
        console.log(`✅ Perfil atualizado para ${planTier}`);
      }

      // Salvar no histórico
      await supabase.from("payment_history").upsert({
        user_id: profile.user_id,
        cakto_transaction_id: transactionId,
        amount: transaction.amount || 0,
        status: "completed",
        payment_method: transaction.paymentMethod || "credit_card",
        webhook_data: transaction,
      }, { onConflict: "cakto_transaction_id" });

      // Atualizar subscriptions com period/next_billing e registrar evento
      const now = new Date();
      const nextBilling = new Date(now.getTime() + 30 * 24 * 3600 * 1000);
      
      const subUpdate: any = {
        user_id: profile.user_id,
        plan: planTier,
        plan_tier: planTier,
        plan_label: planLabel,
        is_active: true,
        current_period_end: nextBilling.toISOString(),
        next_billing_at: nextBilling.toISOString(),
        payment_status: "paid",
        auto_renew: true,
        cancel_at_period_end: false,
      };

      // Se for Multi, garantir que o grupo de contas esteja pronto
      if (isMulti) {
        // Tenta buscar ou criar um sub_account_group para o mestre
        const { data: group } = await supabase.from("sub_account_groups")
          .select("id")
          .eq("master_user_id", profile.user_id)
          .maybeSingle();

        if (!group) {
          const { data: newGroup } = await supabase.from("sub_account_groups")
            .insert({ master_user_id: profile.user_id, plan_tier: "multiPRO", max_members: 3 })
            .select("id")
            .single();
          if (newGroup) subUpdate.group_id = newGroup.id;
        } else {
          subUpdate.group_id = group.id;
        }
      }

      await supabase.from("subscriptions").upsert(subUpdate, { onConflict: "user_id" });

      await supabase.from("subscription_events").insert({
        user_id: profile.user_id,
        event_type: "payment_succeeded",
        amount: transaction.amount || 0,
        currency: "BRL",
        metadata: { cakto_transaction_id: transactionId, plan_tier: planTier },
      });

      resultMsg = `Purchase approved - user upgraded to ${planTier}`;

    // ── refund / subscription_canceled (nota: Cakto usa 1 'l') ──
    } else if (event === "refund" || event === "subscription_canceled" || event === "subscription_cancelled") {
      console.log("🚫 Processando cancelamento/reembolso...");

      const { error: updateErr } = await supabase.from("profiles").update({
        plan_type: "free",
        subscription_status: "canceled",
      }).eq("id", profile.id);

      if (updateErr) {
        console.error("❌ Erro ao cancelar:", updateErr);
      } else {
        console.log("✅ Assinatura cancelada");
      }

      await supabase.from("payment_history").upsert({
        user_id: profile.user_id,
        cakto_transaction_id: `${event}_${transactionId}`,
        amount: event === "refund" ? -(transaction.amount || 0) : 0,
        status: event,
        payment_method: "cancellation",
        webhook_data: transaction,
      }, { onConflict: "cakto_transaction_id" });

      await supabase.from("subscriptions").upsert({
        user_id: profile.user_id,
        plan: "free",
        is_active: false,
        cancel_at_period_end: true,
        canceled_at: new Date().toISOString(),
        payment_status: event,
      }, { onConflict: "user_id" });

      await supabase.from("subscription_events").insert({
        user_id: profile.user_id,
        event_type: event === "refund" ? "payment_failed" : "canceled",
        amount: event === "refund" ? -(transaction.amount || 0) : 0,
        currency: "BRL",
        metadata: { cakto_transaction_id: transactionId, event },
      });

      // Enviar email de cancelamento ao cliente
      const userName = customer.name || email.split("@")[0];
      await sendCancellationEmail(email, userName);

      // Force-disconnect sub-accounts vinculadas ao grupo do mestre
      const { data: masterGroup } = await supabase
        .from("sub_account_groups")
        .select("id")
        .eq("master_user_id", profile.user_id)
        .maybeSingle();
      if (masterGroup?.id) {
        const { data: members } = await supabase
          .from("sub_account_members")
          .select("user_id")
          .eq("group_id", masterGroup.id)
          .eq("is_active", true)
          .neq("user_id", profile.user_id);
        if (members && members.length > 0) {
          const memberIds = members.map((m: any) => m.user_id);
          await supabase
            .from("account_sessions")
            .update({ force_disconnected: true, is_connected: false })
            .in("user_id", memberIds)
            .eq("group_id", masterGroup.id);
          console.log(`✅ Force-disconnected ${memberIds.length} sub-account(s) do grupo ${masterGroup.id}`);
        }
      }

      resultMsg = "Refund/Cancel processed - user downgraded to free";

    } else {
      console.log("⚠️ Evento não tratado:", event);
      resultMsg = `Event '${event}' acknowledged but not processed`;
    }

    console.log("✅ Resultado:", resultMsg);

    return new Response(JSON.stringify({ success: true, message: resultMsg }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("❌ Erro interno:", err);
    return new Response(JSON.stringify({ error: "Internal error", details: String(err) }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
