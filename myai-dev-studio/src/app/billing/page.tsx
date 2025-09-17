export default function BillingPage() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold">Abonnement</h1>
        <div className="rounded-md border border-white/10 bg-white/5 p-4">
          <p className="opacity-80">Connectez Stripe pour gérer les abonnements (gratuit, pro, entreprise).</p>
          <form action="/api/stripe/checkout" method="post" className="mt-4">
            <button className="rounded-md border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10" type="submit">
              Passer au Pro
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

