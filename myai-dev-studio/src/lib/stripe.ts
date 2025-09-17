import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export const STRIPE_PLANS = {
  free: {
    name: 'Gratuit',
    price: 0,
    features: ['5 agents par mois', '3 projets', '1 workflow']
  },
  pro: {
    name: 'Pro',
    price: 2900, // $29.00 in cents
    features: ['100 agents par mois', 'Projets illimités', '25 workflows']
  },
  enterprise: {
    name: 'Entreprise',
    price: 9900, // $99.00 in cents
    features: ['Agents illimités', 'Projets illimités', 'Workflows illimités']
  }
} as const

export async function createCheckoutSession(
  priceId: string,
  customerId?: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    customer: customerId,
  })

  return session
}

export async function createCustomer(email: string) {
  const customer = await stripe.customers.create({
    email,
  })

  return customer
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  return subscription
}