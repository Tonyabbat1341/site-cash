import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { chooseModelByTask } from '@/lib/ai/models';

type Provider = 'openai' | 'anthropic' | 'gemini';

function getProviderForModel(model: string): Provider {
  if (model.startsWith('gpt')) return 'openai';
  if (model.startsWith('claude')) return 'anthropic';
  return 'gemini';
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  let prompt = '';
  let model: string | undefined = undefined;

  if (contentType.includes('application/json')) {
    const body = await req.json();
    prompt = body.prompt;
    model = body.model;
  } else {
    const formData = await req.formData();
    prompt = String(formData.get('prompt') || '');
    model = String(formData.get('model') || 'auto');
  }
  const chosen = model === 'auto' || !model ? chooseModelByTask(prompt) : model;
  const provider = getProviderForModel(chosen);

  try {
    if (provider === 'openai') {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const res = await client.chat.completions.create({
        model: chosen,
        messages: [
          { role: 'system', content: 'You are MyAI Dev Studio coding assistant.' },
          { role: 'user', content: prompt }
        ]
      });
      const text = res.choices[0]?.message?.content ?? '';
      return Response.json({ provider, model: chosen, text });
    }

    if (provider === 'anthropic') {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const res = await client.messages.create({
        model: chosen,
        max_tokens: 1024,
        messages: [
          { role: 'user', content: prompt }
        ]
      } as any);
      const text = (res as any).content?.[0]?.text ?? '';
      return Response.json({ provider, model: chosen, text });
    }

    {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const m = genAI.getGenerativeModel({ model: chosen });
      const res = await m.generateContent(prompt);
      const text = res.response.text();
      return Response.json({ provider, model: chosen, text });
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'AI request failed' }), { status: 500 });
  }
}

