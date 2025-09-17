# MyAI Dev Studio (MVP)

React + Next.js (App Router) + Tailwind + Supabase + Stripe + AI SDKs.

## Démarrage

1. Copier `.env.example` en `.env.local` et renseigner les clés.
2. Installer les dépendances:
```bash
npm install
```
3. Lancer le dev server:
```bash
npm run dev
```

## Fonctionnalités MVP

- Dashboard avec 5 agents (Frontend, Backend, Debugger, Automatiser, Architecte)
- Sélecteur de modèle (Auto, GPT-4.1, Claude 3.5 Sonnet, Gemini 1.5)
- API `/api/ai` proxy vers OpenAI, Anthropic, Gemini
- Workflow builder (React Flow) — sauvegarde Supabase à brancher
- Billing Stripe: `/api/stripe/checkout` et webhook
- Publication: endpoint placeholder `/api/publish`

## Supabase

- Configurez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- À ajouter: tables `users`, `projects`, `workflows`, `api_tokens`

## Stripe

- Configurez `STRIPE_SECRET_KEY`, `STRIPE_PRICE_PRO_ID`, `STRIPE_WEBHOOK_SECRET`
- Exposez le webhook en dev:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Notes

- Ceci est un MVP: UI minimaliste (shadcn-like), logique de persistance à compléter.
- Le mode Auto choisit un modèle en fonction du prompt.