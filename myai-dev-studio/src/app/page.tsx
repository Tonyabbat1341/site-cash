export default function HomePage() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">MyAI Dev Studio</h1>
        <p className="mt-2 text-sm opacity-80">MVP: agents, workflows, Supabase, Stripe</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Dashboard" href="/dashboard" />
          <Card title="Workflows" href="/workflows" />
          <Card title="Agents" href="/agents" />
          <Card title="Billing" href="/billing" />
          <Card title="Publish" href="/publish" />
          <Card title="Settings" href="/settings" />
        </div>
      </div>
    </main>
  );
}

function Card({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="rounded-lg border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
    >
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-xs opacity-80">Aller à {title}</div>
    </a>
  );
}

