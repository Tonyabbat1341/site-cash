import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSubscription } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user's stripe customer info
    const { data: customer, error: customerError } = await supabase
      .from('stripe_customers')
      .select('stripe_customer_id, subscription_id, subscription_status')
      .eq('user_id', userId)
      .single()

    if (customerError || !customer) {
      return NextResponse.json({ subscription: null })
    }

    if (!customer.subscription_id) {
      return NextResponse.json({ subscription: null })
    }

    // Get subscription details from Stripe
    const subscription = await getSubscription(customer.subscription_id)

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end
      }
    })
  } catch (error) {
    console.error('Subscription fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}