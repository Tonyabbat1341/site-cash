# Guide de Déploiement - MyAI Dev Studio

Ce guide vous accompagne dans le déploiement de MyAI Dev Studio en production.

## 📋 Prérequis

### Comptes Requis
- **Vercel** (ou autre plateforme de déploiement)
- **Supabase** (base de données et authentification)
- **Stripe** (paiements - optionnel)
- **Domaine personnalisé** (optionnel)

### Clés API Nécessaires
- Anthropic Claude API Key
- OpenAI API Key  
- Google Gemini API Key
- Stripe Keys (si paiements activés)

## 🚀 Déploiement sur Vercel

### 1. Préparation du Repository

```bash
# Cloner et préparer le projet
git clone <your-repo-url>
cd myai-dev-studio
npm install
npm run build  # Vérifier que le build fonctionne
```

### 2. Configuration Supabase

1. **Créer un nouveau projet Supabase**
   - Aller sur [supabase.com](https://supabase.com)
   - Créer un nouveau projet
   - Noter l'URL et la clé anonyme

2. **Exécuter le schéma de base de données**
   ```sql
   -- Copier le contenu de supabase-schema.sql
   -- L'exécuter dans l'éditeur SQL de Supabase
   ```

3. **Configurer l'authentification**
   - Activer l'authentification par email
   - Configurer les redirections d'URL
   - Personnaliser les templates d'email

### 3. Déploiement Vercel

1. **Connecter le repository à Vercel**
   ```bash
   # Installer Vercel CLI
   npm i -g vercel
   
   # Se connecter et déployer
   vercel login
   vercel
   ```

2. **Configuration des variables d'environnement**
   
   Dans le dashboard Vercel, ajouter:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   
   # Stripe (optionnel)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Autres
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://your-domain.com
   ```

3. **Déploiement automatique**
   - Chaque push sur `main` déclenche un déploiement
   - Les preview deployments sont créés pour les PR

### 4. Configuration du Domaine (Optionnel)

1. **Ajouter un domaine personnalisé**
   - Dans Vercel Dashboard > Domains
   - Ajouter votre domaine
   - Configurer les DNS selon les instructions

2. **Certificat SSL**
   - Automatiquement géré par Vercel
   - Let's Encrypt gratuit

## 🔧 Configuration Stripe (Optionnel)

### 1. Configuration des Produits

```javascript
// Créer les produits dans Stripe Dashboard
const products = [
  {
    name: "MyAI Dev Studio Pro",
    price: 29,
    currency: "eur",
    interval: "month",
    features: ["Tous les agents", "Workflows illimités", "10k API calls"]
  },
  {
    name: "MyAI Dev Studio Enterprise", 
    price: 99,
    currency: "eur",
    interval: "month",
    features: ["Tout du Pro", "Agents custom", "API illimitée", "Support dédié"]
  }
]
```

### 2. Webhooks Stripe

1. **Configurer l'endpoint webhook**
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Événements: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

2. **Vérifier la signature**
   ```javascript
   // api/webhooks/stripe.js
   import { stripe } from '@/lib/stripe'
   
   export async function POST(req) {
     const signature = req.headers.get('stripe-signature')
     const body = await req.text()
     
     try {
       const event = stripe.webhooks.constructEvent(
         body,
         signature,
         process.env.STRIPE_WEBHOOK_SECRET
       )
       
       // Traiter l'événement
       switch (event.type) {
         case 'customer.subscription.created':
           // Mettre à jour le tier utilisateur
           break
         // ...
       }
     } catch (err) {
       return new Response('Webhook signature verification failed', { status: 400 })
     }
   }
   ```

## 🔒 Sécurité en Production

### 1. Variables d'Environnement
```env
# Utiliser des clés de production
STRIPE_SECRET_KEY=sk_live_...  # Pas sk_test_
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Secrets forts
NEXTAUTH_SECRET=un-secret-tres-long-et-aleatoire
SUPABASE_SERVICE_ROLE_KEY=...  # Garder secret côté serveur uniquement
```

### 2. Row Level Security (RLS)
```sql
-- Vérifier que RLS est activé sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
-- etc.
```

### 3. Rate Limiting
```javascript
// middleware.js
import { ratelimit } from '@/lib/ratelimit'

export async function middleware(request) {
  // Rate limiting pour les API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    
    if (!success) {
      return new Response('Too Many Requests', { status: 429 })
    }
  }
}
```

## 📊 Monitoring & Analytics

### 1. Monitoring des Erreurs
```bash
# Ajouter Sentry
npm install @sentry/nextjs

# Configuration dans next.config.js
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig({
  // ... config Next.js
}, {
  org: 'your-org',
  project: 'myai-dev-studio'
})
```

### 2. Analytics Utilisateur
```javascript
// Posthog (optionnel)
npm install posthog-js

// pages/_app.js
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init('your-api-key', {
    api_host: 'https://app.posthog.com'
  })
}
```

### 3. Monitoring des Performances
- **Vercel Analytics** - Intégré automatiquement
- **Web Vitals** - Métriques de performance
- **Real User Monitoring** - Expérience utilisateur réelle

## 🔄 CI/CD Pipeline

### 1. GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Type check
        run: npm run type-check
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 2. Tests Automatisés
```javascript
// __tests__/api.test.js
import { createMocks } from 'node-mocks-http'
import handler from '../pages/api/agents'

describe('/api/agents', () => {
  it('should return agents list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        authorization: 'Bearer valid-token'
      }
    })

    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data).toHaveProperty('agents')
  })
})
```

## 🚨 Troubleshooting

### Problèmes Courants

1. **Build Errors**
   ```bash
   # Vérifier les types
   npm run type-check
   
   # Vérifier le linting
   npm run lint
   
   # Build local
   npm run build
   ```

2. **Supabase Connection Issues**
   ```javascript
   // Vérifier la configuration
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
   console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10))
   ```

3. **Stripe Webhooks**
   ```bash
   # Tester en local avec Stripe CLI
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   stripe trigger customer.subscription.created
   ```

### Logs et Debugging
```javascript
// lib/logger.js
import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // En production, ajouter un transport vers un service de logs
  ]
})

export default logger
```

## 📈 Optimisations Performance

### 1. Next.js Optimizations
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*']
  },
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif']
  },
  compress: true,
  swcMinify: true
}
```

### 2. Database Optimizations
```sql
-- Index pour les performances
CREATE INDEX CONCURRENTLY idx_projects_user_status ON projects(user_id, status);
CREATE INDEX CONCURRENTLY idx_workflows_user_active ON workflows(user_id) WHERE status = 'active';
```

### 3. Caching Strategy
```javascript
// lib/cache.js
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export const cache = {
  get: (key) => redis.get(key),
  set: (key, value, ttl = 3600) => redis.setex(key, ttl, JSON.stringify(value)),
  del: (key) => redis.del(key)
}
```

## 🎯 Post-Déploiement

### 1. Tests de Production
- [ ] Authentification fonctionne
- [ ] Tous les agents répondent
- [ ] Workflow builder opérationnel
- [ ] Paiements Stripe (si activés)
- [ ] Emails transactionnels

### 2. Monitoring Initial
- [ ] Configurer les alertes Vercel
- [ ] Vérifier les métriques de performance
- [ ] Tester la charge avec des utilisateurs réels

### 3. Documentation Utilisateur
- [ ] Guide de démarrage
- [ ] Tutoriels vidéo
- [ ] FAQ et support

---

🎉 **Félicitations !** Votre instance de MyAI Dev Studio est maintenant en production !

Pour toute question, consultez la documentation ou contactez le support.