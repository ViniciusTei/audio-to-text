import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from "https://esm.sh/stripe@11.16";
import { corsHeaders } from '../../_shared/cors.ts'

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

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
      { global: { headers: { ...corsHeaders, Authorization: req.headers.get('Authorization')! } } }
    )

    console.log('Running function ', { user_id, user_email })
    const { data: spCustomerDatas, error } = await supabaseClient.from('Customer').select().eq('user_id', user_id)
    const customer = spCustomerDatas ?? []
    
    if (error) {
      console.error('Error fetching customer', error)
      throw error
    }
    
    if (customer[0] && customer[0].stripe_id) {
      console.log('Customer found ', customer[0])
      const stripe_customer = await stripe.customers.retrieve(customer[0].stripe_id)
      console.log('Stripe customer retrieved', stripe_customer)
      return new Response(JSON.stringify({ stripe_customer }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders, },
        status: 200,
      })
    }

    console.log('User not found, creating customer')
    const stripe_customer = await stripe.customers.create({ email: user_email })

    const { error: err } = await supabaseClient.from('Customer').insert({ user_id, stripe_id: stripe_customer.id, credits: 1 })

    if (err) {
      throw err
    }

    console.log('Stripe customer created', stripe_customer)
    return new Response(JSON.stringify({ stripe_customer }), {
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

