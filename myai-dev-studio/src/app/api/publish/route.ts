import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const projectRef = (formData.get('projectRef') as string) || '';
  if (!projectRef) {
    return new Response(JSON.stringify({ error: 'projectRef manquant' }), { status: 400 });
  }
  // Placeholder: integrate with Supabase CLI/API to deploy static app from /out
  return Response.json({ ok: true, message: `Deployment triggered for ${projectRef}.` });
}

