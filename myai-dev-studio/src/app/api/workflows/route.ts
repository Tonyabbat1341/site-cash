import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const { data: workflows, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('project_id', projectId)
      .order('updated_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch workflows' },
        { status: 500 }
      )
    }

    return NextResponse.json({ workflows })
  } catch (error) {
    console.error('Workflows fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, projectId, nodes, connections } = await request.json()

    if (!name || !projectId) {
      return NextResponse.json(
        { error: 'Name and project ID are required' },
        { status: 400 }
      )
    }

    const { data: workflow, error } = await supabase
      .from('workflows')
      .insert({
        name,
        project_id: projectId,
        nodes: nodes || [],
        connections: connections || []
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create workflow' },
        { status: 500 }
      )
    }

    return NextResponse.json({ workflow })
  } catch (error) {
    console.error('Workflow creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, nodes, connections } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Workflow ID is required' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (nodes !== undefined) updateData.nodes = nodes
    if (connections !== undefined) updateData.connections = connections

    const { data: workflow, error } = await supabase
      .from('workflows')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update workflow' },
        { status: 500 }
      )
    }

    return NextResponse.json({ workflow })
  } catch (error) {
    console.error('Workflow update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}