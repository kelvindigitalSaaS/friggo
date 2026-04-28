import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  try {
    const { record } = await req.json();
    const userId = record.user_id;

    console.log("Processing feedback from user:", userId);

    // Buscar user email
    const { data: authData, error: authError } = await supabase.auth.admin.getUserById(userId);
    if (authError || !authData.user) {
      console.error("User not found:", authError);
      throw new Error("User not found");
    }
    const email = authData.user.email;
    console.log("Sending email to:", email);

    // Verificar se tem subscription ativa
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("is_active, expires_at")
      .eq("user_id", userId)
      .maybeSingle();

    if (subError) console.error("Subscription query error:", subError);

    const isActive = subscription?.is_active || (subscription?.expires_at && new Date(subscription.expires_at) > new Date());
    console.log("User subscription active:", isActive);

    // Se NÃO tem subscription, enviar email
    if (!isActive) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        },
        body: JSON.stringify({
          from: "noreply@kaza.app",
          to: email,
          subject: "Aproveite premium no KAZA 🚀",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <!-- Header com Logo -->
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; text-align: center;">
                  <img src="https://cdn-checkout.cakto.com.br/products/e04d9e2b-3252-44d3-86cc-4f8fb94fb659.png?width=180"
                       alt="KAZA"
                       style="max-width: 180px; height: auto;">
                </div>

                <!-- Conteúdo -->
                <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f9fafb;">
                  <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">Oi! 👋</h2>

                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 16px 0;">
                    Vimos que você usou nosso feedback e gostaria de conhecer você melhor.
                  </p>

                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 16px 0;">
                    Que tal ativar o <strong>KAZA Premium</strong>? Com ele você consegue:
                  </p>

                  <ul style="color: #4b5563; font-size: 16px; line-height: 1.8; margin: 20px 0; padding-left: 20px;">
                    <li>✨ <strong>Mais receitas por dia</strong> — Acesso ilimitado ao nosso catálogo</li>
                    <li>🛒 <strong>Listas de compras maiores</strong> — Organize tudo que precisa</li>
                    <li>📲 <strong>Notificações customizadas</strong> — Receba alertas do seu jeito</li>
                    <li>👨‍👩‍👧‍👦 <strong>Múltiplas contas</strong> — Toda a família em um só lugar</li>
                  </ul>

                  <div style="text-align: center; margin: 30px 0;">
                    <a href="https://kaza.app/upgrade"
                       style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                              color: white;
                              padding: 14px 32px;
                              text-decoration: none;
                              border-radius: 8px;
                              display: inline-block;
                              font-weight: 600;
                              font-size: 16px;">
                      Assinar Agora
                    </a>
                  </div>

                  <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 20px 0;">
                    Aproveita os <strong>7 dias grátis</strong>! 🎁
                  </p>

                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

                  <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
                    KAZA — Sua cozinha mais inteligente<br>
                    © 2026 KAZA. Todos os direitos reservados.
                  </p>
                </div>
              </body>
            </html>
          `,
        }),
      });

      console.log("Resend response status:", response.status);
      const resendData = await response.text();
      console.log("Resend response:", resendData);

      if (!response.ok) {
        throw new Error(`Resend error: ${response.status} - ${resendData}`);
      }

      console.log("Email sent successfully to:", email);
    } else {
      console.log("User has active subscription, skipping email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-upgrade-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
