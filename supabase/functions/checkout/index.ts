import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@11.16";
import { corsHeaders } from '../../_shared/cors.ts'

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { price_id } = await req.json()

    if (!price_id) {
      throw "Missing arguments price_id";
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price_id,
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/audio?success=true',
      cancel_url: 'http://localhost:5173/audio?cancel=true',
    })

    return new Response(JSON.stringify({ session }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 200,
    })
  } catch (error) {
    console.error('Error with the function', error)
    return new Response(JSON.stringify({ error }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      status: 400,
    })
  }

})

