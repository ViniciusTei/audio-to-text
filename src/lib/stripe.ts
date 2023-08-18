import { loadStripe } from '@stripe/stripe-js'

export default async function getStripe() {
    if (import.meta.env.VITE_STRIPE_PUBLIC_KEY === undefined) {
        throw new Error('Please add stripe public key!')
    }
    
    const stripeJs = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

    return stripeJs
}
