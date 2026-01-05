import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface MissionEmailRequest {
  email: string;
  fullName: string;
  activationCode: string;
  missionLink: string;
}

const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
const resendApiKey = Deno.env.get("RESEND_API_KEY");

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, fullName, activationCode, missionLink } = await req.json() as MissionEmailRequest;

    if (!email || !fullName || !activationCode) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
            .header { background: #D4AF37; color: black; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .content { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; }
            .code-box { 
              background: #f0f0f0; 
              padding: 15px; 
              border-left: 4px solid #D4AF37; 
              margin: 20px 0; 
              text-align: center;
              font-family: monospace;
            }
            .code { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #D4AF37; }
            .button { 
              display: inline-block; 
              background: #D4AF37; 
              color: black; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 4px; 
              margin: 20px 0;
              font-weight: bold;
            }
            .button:hover { background: #c99f2a; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Bem-vindo ao Hub de Missões!</h1>
            </div>
            
            <div class="content">
              <h2>Olá, ${fullName}!</h2>
              
              <p>Sua inscrição na missão foi confirmada com sucesso! 🎉</p>
              
              <p>Seu código de ativação exclusivo é:</p>
              
              <div class="code-box">
                <div class="code">${activationCode}</div>
              </div>
              
              <p>Use este código para:</p>
              <ul>
                <li>✓ Acompanhar o progresso da sua missão</li>
                <li>✓ Acessar recursos exclusivos</li>
                <li>✓ Compartilhar com amigos para análise prioritária</li>
              </ul>
              
              <p style="text-align: center;">
                <a href="${missionLink}" class="button">Acessar Minha Missão</a>
              </p>
              
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              
              <p><strong>Próximos passos:</strong></p>
              <ol>
                <li>Guarde seu código de ativação em um local seguro</li>
                <li>Acompanhe seu progresso no dashboard</li>
                <li>Compartilhe seu código com others para acelerar sua aprovação</li>
              </ol>
              
              <p style="font-size: 12px; color: #999;">
                Se você não criou esta conta, ignore este e-mail.
              </p>
            </div>
            
            <div class="footer">
              <p>© 2025 The Deal. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    let success = false;
    let error = null;

    // Try SendGrid first
    if (sendgridApiKey) {
      try {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendgridApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email, name: fullName }],
                subject: `🎯 Código de Ativação: ${activationCode}`,
              },
            ],
            from: { email: "noreply@thedeal.app", name: "The Deal" },
            content: [
              {
                type: "text/html",
                value: emailHtml,
              },
            ],
          }),
        });

        if (response.ok) {
          success = true;
        } else {
          error = `SendGrid error: ${response.status}`;
        }
      } catch (err) {
        console.error("SendGrid error:", err);
        error = err instanceof Error ? err.message : "SendGrid error";
      }
    }

    // Fallback to Resend
    if (!success && resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "The Deal <noreply@thedeal.app>",
            to: email,
            subject: `🎯 Código de Ativação: ${activationCode}`,
            html: emailHtml,
          }),
        });

        if (response.ok) {
          success = true;
        } else {
          error = `Resend error: ${response.status}`;
        }
      } catch (err) {
        console.error("Resend error:", err);
        error = err instanceof Error ? err.message : "Resend error";
      }
    }

    if (!success) {
      return new Response(
        JSON.stringify({
          error: error || "No email service configured",
          email_logged: email,
          code: activationCode,
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, email, message: "Activation code sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
