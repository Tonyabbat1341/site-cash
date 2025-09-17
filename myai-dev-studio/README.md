# MyAI Dev Studio

Une plateforme de développement full-stack alimentée par l'IA, combinant des agents spécialisés, un workflow builder visuel, et des intégrations modernes.

## 🚀 Fonctionnalités

### 🤖 Agents IA Spécialisés
- **Frontend Pro** - Expert en React, Vue, Angular et technologies frontend modernes
- **Backend Pro** - Spécialiste Node.js, Express, APIs et bases de données
- **Debugger** - Expert en débogage, optimisation et résolution de problèmes
- **Automatiser** - Créateur de workflows automatisés style n8n
- **Architecte** - Architecte logiciel pour conception et structure de projets

### 🔧 Workflow Builder
- Éditeur visuel drag-and-drop inspiré de n8n
- Nodes pour requêtes API, logique conditionnelle, intégrations
- Sauvegarde et exécution de workflows complexes
- Intégrations Stripe, Supabase, et services tiers

### 🎯 Sélection de Modèles IA
- **Auto Mode** - Sélection automatique du meilleur modèle pour la tâche
- **Claude Sonnet 3.5** - Pour le raisonnement complexe et la génération de code
- **OpenAI GPT-4.1** - Pour la polyvalence et la créativité
- **Google Gemini** - Pour l'analyse multimodale et la performance

### 💳 Système d'Abonnements
- **Gratuit** - 2 agents, 5 workflows/mois, 100 requêtes API
- **Pro (29€/mois)** - Tous les agents, workflows illimités, 10k requêtes API
- **Entreprise (99€/mois)** - Agents personnalisés, API illimitée, support dédié

### 🔐 Authentification & Sécurité
- Authentification Supabase avec RLS (Row Level Security)
- Stockage sécurisé des clés API (hashées)
- Gestion des permissions par plan d'abonnement

## 🛠 Technologies Utilisées

### Frontend
- **Next.js 15** avec App Router
- **React 19** avec hooks modernes
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **@xyflow/react** pour le workflow builder
- **Lucide React** pour les icônes

### Backend & Base de Données
- **Supabase** pour l'authentification, base de données et storage
- **PostgreSQL** avec Row Level Security
- **Stripe** pour les paiements et abonnements

### Intégrations IA
- **Anthropic Claude** via API
- **OpenAI GPT-4** via API
- **Google Gemini** via API
- Gestion intelligente des tokens et rate limiting

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase
- Compte Stripe (optionnel pour les paiements)

### Configuration

1. **Cloner le repository**
```bash
git clone <repository-url>
cd myai-dev-studio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**
```bash
cp .env.example .env.local
```

Remplir les variables dans `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe (optionnel)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

4. **Configuration de la base de données Supabase**
```bash
# Exécuter le schéma SQL dans votre projet Supabase
# Copier le contenu de supabase-schema.sql dans l'éditeur SQL Supabase
```

5. **Démarrer le serveur de développement**
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🏗 Architecture

### Structure des Dossiers
```
src/
├── app/                    # Next.js App Router
├── components/             # Composants React
│   ├── agents/            # Interfaces des agents IA
│   ├── auth/              # Authentification
│   ├── billing/           # Gestion des abonnements
│   ├── dashboard/         # Dashboard principal
│   ├── layout/            # Layout et navigation
│   ├── settings/          # Configuration utilisateur
│   ├── ui/                # Composants UI réutilisables
│   └── workflow/          # Workflow builder
├── hooks/                  # React hooks personnalisés
├── lib/                    # Utilitaires et configurations
└── types/                  # Types TypeScript
```

### Base de Données (Supabase)
- `users` - Profils utilisateurs étendus
- `projects` - Projets créés par les agents
- `workflows` - Workflows automatisés
- `api_keys` - Clés API sécurisées par utilisateur
- `conversations` - Historique des conversations avec les agents
- `workflow_runs` - Exécutions des workflows
- `deployments` - Déploiements de projets

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter le repository à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres plateformes
- **Netlify** - Compatible avec les builds statiques
- **Railway** - Pour un déploiement full-stack
- **Docker** - Containerisation disponible

## 🔧 Configuration des Agents IA

### Ajouter une nouvelle clé API
1. Aller dans **Paramètres > API Keys**
2. Cliquer sur "Ajouter une API Key"
3. Sélectionner le service (Claude, OpenAI, Gemini)
4. Entrer la clé API et un nom descriptif

### Mode Auto
Le mode Auto sélectionne automatiquement le meilleur modèle selon:
- **Frontend/UI** → Claude (excellent pour le code React/CSS)
- **Backend/API** → GPT-4 (forte expertise en architectures)
- **Debugging** → Claude (analyse approfondie des erreurs)
- **Automation** → GPT-4 (logique de workflows)
- **Architecture** → Gemini (vision système complète)

## 📊 Workflow Builder

### Types de Nodes Disponibles

#### Déclencheurs (Triggers)
- **Webhook** - Déclencher via HTTP
- **Planificateur** - Exécution programmée
- **Manuel** - Déclenchement manuel

#### Actions
- **Requête HTTP** - Appels API externes
- **Email** - Envoi d'emails
- **Base de données** - Opérations CRUD
- **Stripe** - Gestion des paiements

#### Logique
- **Condition** - Branchement conditionnel
- **Boucle** - Itération sur des données

### Exemple de Workflow
```json
{
  "name": "Traitement Commande E-commerce",
  "nodes": [
    {
      "id": "webhook",
      "type": "trigger",
      "subType": "webhook"
    },
    {
      "id": "validate",
      "type": "logic", 
      "subType": "condition"
    },
    {
      "id": "stripe",
      "type": "action",
      "subType": "stripe"
    },
    {
      "id": "email",
      "type": "action",
      "subType": "email"
    }
  ]
}
```

## 🔒 Sécurité

### Bonnes Pratiques Implémentées
- **Row Level Security (RLS)** sur toutes les tables
- **Hashage des clés API** avec bcrypt
- **Validation des entrées** côté client et serveur
- **Rate limiting** sur les appels IA
- **Audit logs** des actions sensibles

### Variables Sensibles
- Les clés API sont stockées hashées en base
- Les tokens d'authentification sont gérés par Supabase
- Les webhooks Stripe sont vérifiés cryptographiquement

## 📈 Monitoring & Analytics

### Métriques Suivies
- Utilisation des agents par utilisateur
- Performance des workflows
- Consommation d'API par modèle IA
- Taux de conversion des abonnements

### Logs & Debugging
- Logs structurés avec Winston
- Monitoring des erreurs avec Sentry (à configurer)
- Analytics utilisateur avec Posthog (optionnel)

## 🤝 Contribution

### Développement Local
1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Standards de Code
- **ESLint** et **Prettier** configurés
- **TypeScript strict mode** activé
- **Conventional Commits** pour les messages
- **Tests** avec Jest et React Testing Library

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

### Documentation
- [Guide de démarrage](docs/getting-started.md)
- [API Reference](docs/api-reference.md)
- [Workflow Examples](docs/workflow-examples.md)

### Communauté
- **Discord** - [Lien vers le serveur Discord]
- **GitHub Issues** - Pour les bugs et feature requests
- **Email Support** - support@myaidevstudio.com

## 🗺 Roadmap

### Version 1.1 (Q2 2024)
- [ ] Agents personnalisés par utilisateur
- [ ] Marketplace de workflows
- [ ] Intégration GitHub/GitLab
- [ ] API publique pour développeurs

### Version 1.2 (Q3 2024)
- [ ] Collaboration en équipe
- [ ] Templates de projets
- [ ] Monitoring avancé
- [ ] Support multi-langues

### Version 2.0 (Q4 2024)
- [ ] Agents multimodaux (images, vidéos)
- [ ] IDE intégré dans le navigateur
- [ ] Déploiement multi-cloud
- [ ] Intelligence collective des agents

---

**MyAI Dev Studio** - Révolutionner le développement avec l'intelligence artificielle 🚀