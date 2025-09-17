# MyAI Dev Studio

Une plateforme web complète pour le développement assisté par IA, inspirée de MGX AI avec des fonctionnalités avancées de workflow et d'intégration.

## 🚀 Fonctionnalités

### Agents IA Spécialisés
- **Frontend Pro** : Expert en React, HTML, CSS et Tailwind
- **Backend Pro** : Spécialiste des APIs, bases de données et intégrations
- **Debugger** : Résolution de bugs et optimisation du code
- **Automatiser** : Créateur de workflows et d'automatisations
- **Architecte** : Conception d'architecture et structure de projets

### Modèles d'IA Supportés
- Claude Sonnet 3.5 (Anthropic)
- Gemini Pro (Google)
- OpenAI GPT-4.1
- Mode Auto (sélection automatique)

### Workflow Builder
- Éditeur visuel style n8n
- Nodes pour API, conditions, Stripe, Supabase
- Intégration d'agents IA dans les workflows
- Sauvegarde et exécution des workflows

### Intégrations
- **Supabase** : Base de données, authentification, hosting
- **Stripe** : Paiements et abonnements
- **Déploiement** : Publication automatique de sites

### Monétisation
- Plans gratuits, pro et entreprise
- Gestion des limites par abonnement
- Intégration Stripe complète

## 🛠️ Technologies

- **Frontend** : Next.js 14, React, TypeScript
- **Styling** : Tailwind CSS, shadcn/ui
- **Backend** : Next.js API Routes
- **Base de données** : Supabase
- **Paiements** : Stripe
- **IA** : OpenAI, Anthropic, Google AI

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

3. **Configuration de l'environnement**
```bash
cp .env.local.example .env.local
```

4. **Configurer Supabase**
   - Créer un projet sur [supabase.com](https://supabase.com)
   - Récupérer l'URL et la clé anonyme
   - Les ajouter dans `.env.local`

5. **Configurer Stripe** (optionnel)
   - Créer un compte sur [stripe.com](https://stripe.com)
   - Récupérer les clés API
   - Les ajouter dans `.env.local`

6. **Lancer le serveur de développement**
```bash
npm run dev
```

## 🗄️ Base de données

Le projet utilise Supabase avec les tables suivantes :

- `users` : Comptes utilisateurs et abonnements
- `projects` : Projets créés par les utilisateurs
- `workflows` : Workflows sauvegardés
- `api_keys` : Clés API des utilisateurs (chiffrées)

## 🔧 Configuration

### Variables d'environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# IA (optionnel)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_API_KEY=your_google_api_key
```

## 🚀 Déploiement

### Vercel (recommandé)

1. Connecter le repository à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres plateformes

Le projet peut être déployé sur toute plateforme supportant Next.js :
- Netlify
- Railway
- DigitalOcean App Platform

## 📱 Utilisation

1. **Créer un compte** et choisir un plan d'abonnement
2. **Configurer les clés API** dans les paramètres
3. **Sélectionner un agent** selon vos besoins
4. **Créer des projets** et utiliser les agents IA
5. **Construire des workflows** pour automatiser les tâches
6. **Déployer vos projets** directement depuis la plateforme

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir une issue pour signaler un bug
- Proposer de nouvelles fonctionnalités
- Soumettre une pull request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de support

---

**MyAI Dev Studio** - Développement assisté par IA, simplifié.