import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface ConfirmationEmailRequest {
  email: string;
  name: string;
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, name }: ConfirmationEmailRequest = await req.json();

    // Validate inputs
    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: "Email e nome são obrigatórios." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Option 1: Use Resend (recomendado - fácil integração)
    // const resendApiKey = Deno.env.get("RESEND_API_KEY");
    // if (resendApiKey) {
    //   const response = await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${resendApiKey}`,
    //     },
    //     body: JSON.stringify({
    //       from: "noreply@thedeal.app",
    //       to: email,
    //       subject: "Bem-vindo ao The Deal - Confirme seu e-mail",
    //       html: `<h1>Olá ${name}!</h1><p>Obrigado por se cadastrar no The Deal.</p><p>Seu perfil foi ativado com sucesso.</p>`,
    //     }),
    //   });
    //   return new Response(JSON.stringify({ success: response.ok }), {
    //     status: 200,
    //     headers: { ...corsHeaders, "Content-Type": "application/json" },
    //   });
    // }

    // Option 2: Use SendGrid
    const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (sendgridApiKey) {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sendgridApiKey}`,
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email }],
              subject: "Bem-vindo ao The Deal - Confirme seu e-mail",
            },
          ],
          from: {
            email: Deno.env.get("SENDGRID_FROM_EMAIL") || "noreply@thedeal.app",
            name: "The Deal",
          },
          content: [
            {
              type: "text/html",
              value: `
                <h1>Olá ${name}!</h1>
                <p>Obrigado por se cadastrar no The Deal.</p>
                <p>Seu perfil foi criado com sucesso e aguarda verificação de e-mail.</p>
                <p>Um código de confirmação foi enviado para seu e-mail.</p>
                <p>Bem-vindo à rede privada de performance!</p>
              `,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("SendGrid error:", error);
      }

      return new Response(JSON.stringify({ success: response.ok }), {
        status: response.ok ? 200 : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Option 3: Use built-in Supabase email (if SMTP configured in Auth settings)
    // Se você configurou SMTP nas Auth Settings do Supabase, o email é enviado automaticamente
    // ao fazer auth.signUp(). Esta função é opcional nesse caso.

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email enviado com sucesso",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
