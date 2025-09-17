# Guide de Contribution - MyAI Dev Studio

Merci de votre intérêt pour contribuer à MyAI Dev Studio ! Ce guide vous aidera à commencer.

## 🚀 Comment Contribuer

### Types de Contributions Bienvenues
- 🐛 **Bug fixes** - Correction de bugs
- ✨ **Nouvelles fonctionnalités** - Ajout de features
- 📚 **Documentation** - Amélioration de la doc
- 🎨 **UI/UX** - Améliorations d'interface
- 🔧 **Optimisations** - Performance et code quality
- 🌐 **Traductions** - Support multi-langues
- 🧪 **Tests** - Ajout de tests unitaires/e2e

## 🛠 Setup de Développement

### 1. Fork & Clone
```bash
# Fork le repository sur GitHub, puis :
git clone https://github.com/YOUR_USERNAME/myai-dev-studio.git
cd myai-dev-studio
```

### 2. Installation
```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local
```

### 3. Configuration Locale
```bash
# Configurer Supabase local (optionnel)
npx supabase init
npx supabase start
npx supabase db reset

# Ou utiliser une instance Supabase cloud pour le dev
```

### 4. Démarrer le Serveur
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 📝 Standards de Code

### Structure des Commits
Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(agents): add new debugger capabilities
fix(workflow): resolve node connection issue  
docs(readme): update installation guide
style(ui): improve button hover states
refactor(auth): simplify user management
test(api): add workflow execution tests
chore(deps): update dependencies
```

### Types de Commits
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Changements de style/formatting
- `refactor`: Refactoring sans changement fonctionnel
- `test`: Ajout/modification de tests
- `chore`: Tâches de maintenance

### Code Style
```javascript
// ✅ Bon
const getUserProjects = async (userId: string): Promise<Project[]> => {
  if (!userId) {
    throw new Error('User ID is required')
  }
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
  
  if (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
  
  return data || []
}

// ❌ Éviter
const getProjects = async (id) => {
  return await supabase.from('projects').select('*').eq('user_id', id)
}
```

### TypeScript
- Utiliser TypeScript strict mode
- Définir des interfaces explicites
- Éviter `any`, préférer `unknown`
- Utiliser les types générés par Supabase

```typescript
// ✅ Bon
interface CreateProjectParams {
  name: string
  description?: string
  agentType: AgentType
}

const createProject = async (params: CreateProjectParams): Promise<Project> => {
  // ...
}

// ❌ Éviter  
const createProject = async (params: any) => {
  // ...
}
```

### React/Next.js
- Utiliser les composants fonctionnels avec hooks
- Préférer les custom hooks pour la logique métier
- Utiliser `'use client'` uniquement quand nécessaire
- Optimiser les re-renders avec `memo`, `useMemo`, `useCallback`

```tsx
// ✅ Bon
'use client'

import { memo, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AgentCardProps {
  agent: Agent
  onSelect: (agentId: string) => void
}

export const AgentCard = memo(({ agent, onSelect }: AgentCardProps) => {
  const { user } = useAuth()
  
  const handleSelect = useCallback(() => {
    onSelect(agent.id)
  }, [agent.id, onSelect])
  
  if (!user) return null
  
  return (
    <div onClick={handleSelect}>
      {/* ... */}
    </div>
  )
})

AgentCard.displayName = 'AgentCard'
```

## 🧪 Tests

### Types de Tests
```bash
# Tests unitaires
npm test

# Tests en mode watch
npm run test:watch

# Coverage
npm run test:coverage

# Tests e2e (à configurer)
npm run test:e2e
```

### Exemple de Test
```javascript
// __tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } }
      }))
    }
  }
}))

describe('useAuth', () => {
  it('should return user when authenticated', async () => {
    const mockUser = { id: '123', email: 'test@example.com' }
    
    require('@/lib/supabase').supabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      // Wait for the effect to complete
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.loading).toBe(false)
  })
})
```

## 🔄 Workflow de Contribution

### 1. Créer une Issue (Optionnel)
Pour les grandes fonctionnalités, créez d'abord une issue pour discuter:

```markdown
## 🎯 Objectif
Ajouter un nouvel agent spécialisé en DevOps

## 📝 Description
Créer un agent capable de :
- Générer des Dockerfiles
- Configurer des pipelines CI/CD
- Optimiser les déploiements

## ✅ Critères d'Acceptation
- [ ] Interface agent DevOps
- [ ] Exemples de prompts
- [ ] Tests unitaires
- [ ] Documentation

## 💭 Questions/Discussions
- Quels outils DevOps prioriser ?
- Intégration avec quels providers (AWS, GCP, Azure) ?
```

### 2. Créer une Branche
```bash
# Créer une branche depuis main
git checkout main
git pull origin main
git checkout -b feat/devops-agent

# Ou pour un bug fix
git checkout -b fix/workflow-connection-issue
```

### 3. Développer
```bash
# Faire vos changements
# Tester localement
npm run dev
npm test
npm run type-check
npm run lint

# Commits réguliers
git add .
git commit -m "feat(agents): add DevOps agent interface"
git commit -m "feat(agents): add DevOps agent examples"
git commit -m "test(agents): add DevOps agent tests"
```

### 4. Push & Pull Request
```bash
# Push vers votre fork
git push origin feat/devops-agent
```

Créez une Pull Request avec ce template :

```markdown
## 🎯 Type de Changement
- [ ] Bug fix
- [x] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## 📝 Description
Ajout d'un nouvel agent DevOps capable de générer des configurations d'infrastructure et de déploiement.

## ✅ Changements
- [x] Nouvel agent DevOps dans `src/lib/agents.ts`
- [x] Interface utilisateur pour l'agent
- [x] Exemples de prompts Docker/CI-CD
- [x] Tests unitaires
- [x] Documentation mise à jour

## 🧪 Tests
- [x] Tests unitaires passent
- [x] Tests d'intégration passent
- [x] Testé manuellement en local
- [x] Pas de régression sur les autres agents

## 📸 Screenshots (si applicable)
[Ajouter des captures d'écran]

## 📚 Documentation
- [x] README mis à jour
- [x] Code commenté
- [x] Types TypeScript ajoutés

## ⚠️ Notes Spéciales
- Nécessite la clé API OpenAI pour les exemples Docker
- Compatible avec tous les plans d'abonnement
```

## 🎨 Guidelines UI/UX

### Design System
- Utiliser les composants de `src/components/ui/`
- Respecter la palette de couleurs Tailwind
- Suivre les patterns d'interface existants
- Assurer l'accessibilité (WCAG 2.1 AA)

### Responsive Design
```tsx
// ✅ Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Contenu */}
</div>

// ✅ Breakpoints cohérents
const breakpoints = {
  sm: '640px',   // Mobile large
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Desktop large
  '2xl': '1536px' // Desktop XL
}
```

### Accessibilité
- Utiliser des labels ARIA appropriés
- Assurer un contraste suffisant
- Support navigation clavier
- Tester avec un lecteur d'écran

```tsx
// ✅ Bon
<button
  aria-label="Démarrer le workflow"
  className="focus:outline-none focus:ring-2 focus:ring-primary"
  onClick={handleStart}
>
  <Play className="h-4 w-4" />
</button>

// ❌ Éviter
<div onClick={handleStart}>
  <Play />
</div>
```

## 🌐 Internationalisation

### Ajout de Nouvelles Langues
```typescript
// src/lib/i18n.ts
export const translations = {
  fr: {
    'dashboard.title': 'Tableau de bord',
    'agents.frontend.name': 'Frontend Pro',
    'workflow.save': 'Sauvegarder'
  },
  en: {
    'dashboard.title': 'Dashboard', 
    'agents.frontend.name': 'Frontend Pro',
    'workflow.save': 'Save'
  },
  es: {
    'dashboard.title': 'Panel de Control',
    'agents.frontend.name': 'Frontend Pro', 
    'workflow.save': 'Guardar'
  }
}
```

### Utilisation
```tsx
import { useTranslation } from '@/hooks/useTranslation'

export function Dashboard() {
  const { t } = useTranslation()
  
  return (
    <h1>{t('dashboard.title')}</h1>
  )
}
```

## 🐛 Signalement de Bugs

### Template d'Issue Bug
```markdown
## 🐛 Description du Bug
Description claire et concise du problème.

## 🔄 Étapes pour Reproduire
1. Aller sur '...'
2. Cliquer sur '...'
3. Faire défiler jusqu'à '...'
4. Voir l'erreur

## ✅ Comportement Attendu
Ce qui devrait se passer normalement.

## 📸 Screenshots
Si applicable, ajouter des captures d'écran.

## 🖥 Environnement
- OS: [e.g. macOS 12.0]
- Navigateur: [e.g. Chrome 95.0]
- Version Node: [e.g. 18.17.0]
- Version de l'app: [e.g. 1.2.0]

## 📝 Contexte Additionnel
Toute autre information utile.
```

## 🏆 Reconnaissance

### Contributors
Tous les contributeurs sont reconnus dans :
- README.md
- Page About de l'application
- Release notes

### Types de Contributions Reconnues
- 💻 Code
- 📖 Documentation  
- 🎨 Design
- 🐛 Bug reports
- 💡 Ideas & feedback
- 🌐 Traductions
- 📢 Promotion
- 🤔 Answering Questions

## 📞 Support

### Canaux de Communication
- **GitHub Issues** - Bugs et feature requests
- **GitHub Discussions** - Questions générales
- **Discord** - Chat en temps réel (lien à venir)
- **Email** - contact@myaidevstudio.com

### Code de Conduite
Nous nous engageons à maintenir un environnement accueillant et inclusif. Voir [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## 📋 Checklist PR

Avant de soumettre votre PR, vérifiez :

- [ ] 🧪 Tests passent (`npm test`)
- [ ] 📝 Types valides (`npm run type-check`)  
- [ ] 🎨 Linting OK (`npm run lint`)
- [ ] 📱 Responsive testé
- [ ] ♿ Accessibilité vérifiée
- [ ] 📚 Documentation mise à jour
- [ ] 🔄 Pas de breaking changes (ou documentés)
- [ ] 🎯 Issue liée (si applicable)

---

Merci de contribuer à MyAI Dev Studio ! 🚀

Votre contribution aide à démocratiser l'accès aux outils de développement IA pour tous les développeurs.