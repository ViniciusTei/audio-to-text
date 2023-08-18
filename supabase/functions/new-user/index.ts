import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from "https://esm.sh/stripe@11.16";

serve(async (req: Request) => {
  try {
    const { user_id, user_email } = await req.json()

    if (!user_id) {
      throw "Missing arguments user_id";
    }

    if (!user_email) {
      throw "Missing arguments user_email";
    }
    
    const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
      httpClient: Stripe.createFetchHttpClient(),
    })

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )


    const { data: customer } = await supabaseClient.from('Customer').select().eq('user_id', user_id).single()
    
    if (customer && customer.stripe_id) {
      const stripe_customer = await stripe.customers.retrieve(customer.stripe_id)
      return new Response(JSON.stringify({ stripe_customer }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const stripe_customer = await stripe.customers.create({ email: user_email })

    await supabaseClient.from('Customer').insert({ user_id, stripe_id: stripe_customer.id })

    return new Response(JSON.stringify({ stripe_customer }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }

})

