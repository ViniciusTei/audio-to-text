import React from 'react'
import supabase from 'lib/api'

function CheckoutButton() {
  async function handleCheckout() {
    if (!import.meta.env.VITE_STRIPE_PRICE_ID) {
      throw new Error('Missing Stripe Price ID')
    }
    //call stripe checkout
    const { data, error } = await supabase.functions.invoke('checkout', {
      body: {
        price_id: import.meta.env.VITE_STRIPE_PRICE_ID,
      }
    })

    if (error) {
      throw error
    }

    if ((data as any)?.session.url) {
      window.location.replace((data as any)?.session.url)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Compre créditos
    </button>
  )
}

export default CheckoutButton
