import { notFound } from 'next/navigation';
import { MODEL_OPTIONS } from '@/lib/ai/models';

const agentMap: Record<string, { title: string; system: string; placeholder: string }> = {
  frontend: {
    title: 'Frontend Pro',
    system: 'You are a senior frontend engineer expert in React and Tailwind.',
    placeholder: 'Décris ta tâche frontend...'
  },
  backend: {
    title: 'Backend Pro',
    system: 'You are a senior backend engineer expert in Node, Express and Supabase.',
    placeholder: 'Décris ta tâche backend...'
  },
  debugger: {
    title: 'Debugger',
    system: 'You reduce errors and optimize code. Explain fixes clearly.',
    placeholder: 'Colle une erreur ou un snippet...'
  },
  automate: {
    title: 'Automatiser',
    system: 'You design n8n-like workflows with nodes and edges.',
    placeholder: 'Décris un workflow à construire...'
  },
  architect: {
    title: 'Architecte',
    system: 'You propose clean architecture and project structure.',
    placeholder: 'Décris la structure souhaitée...'
  }
};

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = agentMap[params.id];
  if (!agent) return notFound();
  return (
    <main className="p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold">{agent.title}</h1>
        <form action="/api/ai" method="post" className="space-y-3">
          <ModelSelector />
          <textarea
            name="prompt"
            placeholder={agent.placeholder}
            className="min-h-[140px] w-full rounded-md border border-white/10 bg-white/5 p-3 outline-none"
          />
          <button className="rounded-md border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10" type="submit">
            Envoyer
          </button>
        </form>
        <p className="text-xs opacity-70">Sélectionnez le modèle ci-dessus. Le mode Auto choisit en fonction de la tâche.</p>
      </div>
    </main>
  );
}

function ModelSelector() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {MODEL_OPTIONS.map((m) => (
        <label key={m.value} className="flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10">
          <input type="radio" name="model" value={m.value} defaultChecked={m.value === 'auto'} />
          {m.label}
        </label>
      ))}
    </div>
  );
}

