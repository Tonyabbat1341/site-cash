import Link from 'next/link';

const agents = [
  { id: 'frontend', name: 'Frontend Pro' },
  { id: 'backend', name: 'Backend Pro' },
  { id: 'debugger', name: 'Debugger' },
  { id: 'automate', name: 'Automatiser' },
  { id: 'architect', name: 'Architecte' }
];

export default function AgentsIndex() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold">Agents</h1>
        <div className="grid gap-3 sm:grid-cols-2">
          {agents.map((a) => (
            <Link key={a.id} href={`/agents/${a.id}`} className="rounded-md border border-white/10 bg-white/5 p-3 hover:bg-white/10">
              {a.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

