import Stripe from "https://esm.sh/stripe@13.10.0?target=deno";
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

interface CheckoutRequest {
  plan: "pro-mensal" | "elite-mensal";
  userEmail: string;
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { plan, userEmail }: CheckoutRequest = await req.json();

    // Validate inputs
    if (!plan || !userEmail) {
      return new Response(
        JSON.stringify({ error: "Plan and email são obrigatórios." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Map plan to Stripe price ID (você precisa criar esses preços no Stripe)
    const priceMap: Record<string, string> = {
      "pro-mensal": Deno.env.get("STRIPE_PRICE_PRO_MENSAL") || "",
      "elite-mensal": Deno.env.get("STRIPE_PRICE_ELITE_MENSAL") || "",
    };

    const priceId = priceMap[plan];
    if (!priceId) {
      return new Response(
        JSON.stringify({ error: "Plano inválido ou preço não configurado." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${Deno.env.get("FRONTEND_URL") || "http://localhost:5173"}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get("FRONTEND_URL") || "http://localhost:5173"}/checkout-cancel`,
      customer_email: userEmail,
      metadata: {
        plan,
        email: userEmail,
      },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao criar checkout session:", error);
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
