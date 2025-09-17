import { NextRequest } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  const ownerId = req.headers.get('x-user-id') || null;
  const supabase = getSupabaseAdminClient();
  const query = ownerId
    ? supabase.from('workflows').select('*').eq('owner_id', ownerId).order('created_at', { ascending: false })
    : supabase.from('workflows').select('*').limit(10);
  const { data, error } = await query;
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return Response.json({ workflows: data });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdminClient();
  const body = await req.json();
  const { id, name, graph, ownerId, projectId } = body as {
    id?: string;
    name: string;
    graph: unknown;
    ownerId?: string | null;
    projectId?: string | null;
  };

  if (!name || !graph) return new Response(JSON.stringify({ error: 'name and graph required' }), { status: 400 });

  if (id) {
    const { data, error } = await supabase
      .from('workflows')
      .update({ name, graph_json: graph, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return Response.json({ workflow: data });
  } else {
    const { data, error } = await supabase
      .from('workflows')
      .insert({ name, graph_json: graph, owner_id: ownerId || null, project_id: projectId || null })
      .select('*')
      .single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return Response.json({ workflow: data });
  }
}

