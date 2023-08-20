import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../../_shared/cors.ts'

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  { global: { headers: { ...corsHeaders, Authorization: req.headers.get('Authorization')! } } }
)

serve(async (req) => {
  try {
    
    const { user_id, action, transcription_id } = await req.json()

    if (!user_id) {
      throw "Missing arguments user_id";
    }
    
    if (action === 'payment') {
      const { data: customerCredits, error } = await supabaseClient
        .from('Customer')
        .eq('user_id', user_id)
        .select('credits')

      if (error) {
        throw error
      }

      const { data: customer, error: customerError } = await supabaseClient
        .from('Customer')
        .update({ credts: customerCredits + 10 })
        .eq('user_id', user_id)
        .select()
      
      if (customerError) {
        throw customerError.message
      }

      const { error: transactionError } = await supabaseClient
        .from('Transactions')
        .insert({ type: 'payment', user_id: customer.id })

      if (transactionError) {
        throw transactionError
      }

      return new Response(
        JSON.stringify({ sucess: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
      )
    } else if (action === 'transcription') {

      const { data: customerCredits, error } = await supabaseClient
        .from('Customer')
        .eq('user_id', user_id)
        .select('credits')

      if (error) {
        throw error
      }

      const { data: customer, error: customerError } = await supabaseClient
        .from('Customer')
        .update({ credts: customerCredits - 1 })
        .eq('user_id', user_id)
        .select()
      
      if (customerError) {
        throw customerError.message
      }
      
      const { error: transactionError } = await supabaseClient
        .from('Transactions')
        .insert({ type: 'transcription', user_id: customer.id, transcription_id })

      if (transactionError) {
        throw transactionError
      }

      return new Response(
        JSON.stringify({ sucess: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
      )
    }

  } catch (error) {
    return new Response(
      JSON.stringify(error),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 },
    )
  }
})
