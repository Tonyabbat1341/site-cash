import Link from 'next/link';

const agents = [
  { id: 'frontend', name: 'Frontend Pro', desc: 'HTML, CSS, React' },
  { id: 'backend', name: 'Backend Pro', desc: 'Node.js, Express, Supabase' },
  { id: 'debugger', name: 'Debugger', desc: 'Réduction des erreurs, optimisation' },
  { id: 'automate', name: 'Automatiser', desc: 'Workflow builder style n8n' },
  { id: 'architect', name: 'Architecte', desc: 'Structure du projet' }
];

export default function Dashboard() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm opacity-75">Choisissez un agent ou ouvrez un workflow</p>
          </div>
          <Link href="/workflows" className="rounded-md border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">
            Ouvrir Workflows
          </Link>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <Link
              key={a.id}
              href={`/agents/${a.id}`}
              className="rounded-lg border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <div className="text-lg font-semibold">{a.name}</div>
              <div className="text-xs opacity-80">{a.desc}</div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

