import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { callAI } from '@/lib/ai-models'

export async function POST(request: NextRequest) {
  try {
    const { agentType, model, prompt, userId } = await request.json()

    if (!agentType || !model || !prompt || !userId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Check if user can use the agent
    const { data: canUse, error: canUseError } = await supabase
      .rpc('can_use_agent', {
        user_uuid: userId,
        agent_type: agentType
      })

    if (canUseError) {
      return NextResponse.json(
        { error: 'Failed to check agent usage' },
        { status: 500 }
      )
    }

    if (!canUse) {
      return NextResponse.json(
        { error: 'Agent usage limit exceeded' },
        { status: 429 }
      )
    }

    // Get user's API key for the selected model
    const { data: apiKey, error: keyError } = await supabase
      .from('api_keys')
      .select('key_encrypted')
      .eq('user_id', userId)
      .eq('provider', model === 'auto' ? 'openai' : model)
      .eq('is_active', true)
      .single()

    if (keyError || !apiKey) {
      return NextResponse.json(
        { error: 'API key not found for selected model' },
        { status: 400 }
      )
    }

    // Call the AI model
    const response = await callAI(
      model,
      prompt,
      apiKey.key_encrypted, // In production, decrypt this
      agentType
    )

    // Update usage count
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
    const { error: usageError } = await supabase
      .from('agent_usage')
      .upsert({
        user_id: userId,
        agent_type: agentType,
        usage_count: 1,
        month_year: currentMonth
      }, {
        onConflict: 'user_id,agent_type,month_year',
        ignoreDuplicates: false
      })

    if (usageError) {
      console.error('Failed to update usage:', usageError)
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}