# MyAI Dev Studio

Une plateforme web complète qui combine agents IA spécialisés, workflows visuels et déploiement automatique pour accélérer le développement web.

## 🚀 Fonctionnalités principales

### 5 Agents IA Spécialisés
- **Frontend Pro** : Expert en HTML, CSS, React et interfaces utilisateur modernes
- **Backend Pro** : Spécialiste Node.js, Express et intégration Supabase
- **Debugger** : Réduction des erreurs et optimisation du code
- **Automatiser** : Création de workflows visuels style n8n
- **Architecte** : Structure et organisation optimale des projets

### Personnalisation du modèle d'IA
- Support de Claude Sonnet 3.5, Gemini, OpenAI GPT-4.1
- Mode Auto qui choisit le modèle le plus adapté
- Gestion des API keys via interface utilisateur

### Workflow Builder
- Éditeur visuel avec nodes pour requêtes API, logique conditionnelle
- Intégration Stripe et Supabase
- Sauvegarde des workflows en base de données

### Base de données Supabase
- Authentification utilisateur
- Gestion des projets et workflows
- Stockage des API keys et configurations

### Monétisation Stripe
- Plans gratuits, pro et entreprise
- Gestion automatique des droits selon l'abonnement
- Webhooks pour synchronisation des statuts

### Déploiement automatique
- Déploiement direct via Supabase hosting
- Génération de domaines personnalisés
- Gestion des environnements (production, staging, dev)

## 🛠️ Technologies utilisées

- **Frontend** : Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend** : Next.js API Routes, Supabase
- **Base de données** : PostgreSQL (via Supabase)
- **Paiements** : Stripe
- **IA** : OpenAI, Anthropic, Google AI
- **Workflows** : React Flow
- **Déploiement** : Supabase Hosting

## 📦 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd myai-dev-studio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp env.example .env.local
```

Remplir les variables dans `.env.local` :
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# AI APIs
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. **Configurer Supabase**
- Créer un projet Supabase
- Exécuter le script SQL dans `supabase/schema.sql`
- Configurer les politiques RLS

5. **Configurer Stripe**
- Créer un compte Stripe
- Récupérer les clés API
- Configurer les webhooks pour `/api/stripe/webhook`

6. **Lancer le projet**
```bash
npm run dev
```

## 🗄️ Schéma de base de données

Le projet utilise les tables suivantes :
- `profiles` : Profils utilisateurs avec informations d'abonnement
- `projects` : Projets créés par les utilisateurs
- `workflows` : Workflows visuels avec nodes et edges
- `api_keys` : Clés API des utilisateurs
- `deployments` : Historique des déploiements
- `stripe_subscriptions` : Abonnements Stripe

## 🔧 Configuration des agents IA

Chaque agent a un prompt système spécialisé et des capacités définies :
- Prompts optimisés pour chaque domaine
- Gestion des modèles IA multiples
- Fallback automatique entre modèles

## 🎨 Interface utilisateur

- Design moderne avec Tailwind CSS
- Composants réutilisables avec shadcn/ui
- Interface responsive et accessible
- Thème sombre/clair supporté

## 🚀 Déploiement

Le projet peut être déployé sur :
- Vercel (recommandé pour Next.js)
- Netlify
- Supabase Hosting
- Tout hébergeur supportant Node.js

## 📝 Scripts disponibles

```bash
npm run dev          # Démarrer en mode développement
npm run build        # Construire pour la production
npm run start        # Démarrer en mode production
npm run lint         # Linter le code
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement

---

**MyAI Dev Studio** - Révolutionnez votre développement avec l'IA 🚀
