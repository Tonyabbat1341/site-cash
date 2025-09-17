import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, createCustomer } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, email } = await request.json()

    if (!priceId || !userId || !email) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Check if customer already exists
    let { data: existingCustomer } = await supabase
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single()

    let customerId = existingCustomer?.stripe_customer_id

    // Create customer if doesn't exist
    if (!customerId) {
      const customer = await createCustomer(email)
      customerId = customer.id

      // Save customer to database
      await supabase
        .from('stripe_customers')
        .insert({
          user_id: userId,
          stripe_customer_id: customerId
        })
    }

    // Create checkout session
    const session = await createCheckoutSession(priceId, customerId)

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}