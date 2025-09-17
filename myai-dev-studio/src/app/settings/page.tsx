export default function SettingsPage() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <form className="space-y-3">
          <Field name="OPENAI_API_KEY" label="OpenAI API Key" />
          <Field name="ANTHROPIC_API_KEY" label="Anthropic API Key" />
          <Field name="GEMINI_API_KEY" label="Gemini API Key" />
          <Field name="STRIPE_SECRET_KEY" label="Stripe Secret Key" />
          <Field name="STRIPE_PRICE_PRO_ID" label="Stripe Price (Pro)" />
          <Field name="NEXT_PUBLIC_SUPABASE_URL" label="Supabase URL" />
          <Field name="NEXT_PUBLIC_SUPABASE_ANON_KEY" label="Supabase Anon Key" />
        </form>
        <p className="text-xs opacity-70">Pour l'MVP, renseignez votre fichier .env.local directement.</p>
      </div>
    </main>
  );
}

function Field({ name, label }: { name: string; label: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs opacity-80">{label}</label>
      <input disabled className="w-full rounded-md border border-white/10 bg-white/5 p-2" placeholder={name} />
    </div>
  );
}

