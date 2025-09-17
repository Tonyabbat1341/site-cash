import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const subscriptionId = session.subscription as string

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const customerId = subscription.customer as string

        // Get user ID from customer
        const { data: customer } = await supabase
          .from('stripe_customers')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (customer) {
          // Update user subscription
          const tier = subscription.items.data[0].price.id.includes('pro') ? 'pro' : 'enterprise'
          
          await supabase
            .from('users')
            .update({ subscription_tier: tier })
            .eq('id', customer.user_id)

          // Update stripe customer record
          await supabase
            .from('stripe_customers')
            .update({
              subscription_id: subscriptionId,
              subscription_status: subscription.status
            })
            .eq('stripe_customer_id', customerId)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Update subscription status
        await supabase
          .from('stripe_customers')
          .update({
            subscription_status: subscription.status
          })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Get user ID from customer
        const { data: customer } = await supabase
          .from('stripe_customers')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (customer) {
          // Downgrade to free
          await supabase
            .from('users')
            .update({ subscription_tier: 'free' })
            .eq('id', customer.user_id)

          // Update stripe customer record
          await supabase
            .from('stripe_customers')
            .update({
              subscription_id: null,
              subscription_status: 'canceled'
            })
            .eq('stripe_customer_id', customerId)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}