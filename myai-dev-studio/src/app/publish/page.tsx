export default function PublishPage() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold">Publication</h1>
        <div className="rounded-md border border-white/10 bg-white/5 p-4">
          <p className="opacity-80">Connectez votre projet Supabase pour déployer un site statique.</p>
          <form action="/api/publish" method="post" className="mt-4 space-y-2">
            <input className="w-full rounded-md border border-white/10 bg-white/5 p-2" name="projectRef" placeholder="supabase project ref" />
            <button className="rounded-md border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10" type="submit">
              Déployer
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

