import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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

    // Get deployed sites for user's projects
    const { data: sites, error } = await supabase
      .from('deployed_sites')
      .select(`
        *,
        projects!inner(user_id)
      `)
      .eq('projects.user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch deployed sites' },
        { status: 500 }
      )
    }

    return NextResponse.json({ sites })
  } catch (error) {
    console.error('Deployed sites fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}