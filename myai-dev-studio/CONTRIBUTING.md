# 🤝 Guide de Contribution - MyAI Dev Studio

Merci de votre intérêt à contribuer à MyAI Dev Studio ! Ce guide vous aidera à comprendre comment contribuer efficacement au projet.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Processus de Développement](#processus-de-développement)
- [Standards de Code](#standards-de-code)
- [Tests](#tests)
- [Documentation](#documentation)
- [Questions et Support](#questions-et-support)

## 📜 Code de Conduite

Ce projet adhère au [Code de Conduite Contributor Covenant](https://www.contributor-covenant.org/). En participant, vous acceptez de respecter ce code.

### Nos Engagements

- **Inclusivité** : Accueillir et encourager les personnes de tous horizons
- **Respect** : Traiter tout le monde avec respect et dignité
- **Collaboration** : Travailler ensemble pour le bien du projet
- **Constructivité** : Être constructif dans les critiques et suggestions

## 🚀 Comment Contribuer

### 1. Fork et Clone

```bash
# Fork le repository sur GitHub
# Puis clonez votre fork
git clone https://github.com/votre-username/myai-dev-studio.git
cd myai-dev-studio

# Ajoutez le repository original comme remote
git remote add upstream https://github.com/original-owner/myai-dev-studio.git
```

### 2. Configuration de l'Environnement

```bash
# Installez les dépendances
npm install

# Copiez le fichier d'environnement
cp .env.local.example .env.local

# Configurez vos variables d'environnement
# (Voir README.md pour les détails)

# Lancez le serveur de développement
npm run dev
```

### 3. Créer une Branche

```bash
# Créez une branche pour votre fonctionnalité
git checkout -b feature/nom-de-votre-fonctionnalite

# Ou pour un bug fix
git checkout -b fix/description-du-bug
```

## 🔄 Processus de Développement

### 1. Développement

- **Commits atomiques** : Un commit = une modification logique
- **Messages clairs** : Utilisez des messages de commit descriptifs
- **Tests** : Écrivez des tests pour vos nouvelles fonctionnalités
- **Documentation** : Mettez à jour la documentation si nécessaire

### 2. Format des Messages de Commit

```
type(scope): description courte

Description plus détaillée si nécessaire

Fixes #123
```

**Types :**
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage, point-virgules manquants, etc.
- `refactor` : Refactoring de code
- `test` : Ajout ou modification de tests
- `chore` : Tâches de maintenance

### 3. Pull Request

1. **Poussez votre branche** vers votre fork
2. **Créez une Pull Request** vers la branche `main`
3. **Remplissez le template** de PR
4. **Attendez la review** de l'équipe

## 📝 Standards de Code

### TypeScript

- **Types stricts** : Utilisez TypeScript strict
- **Interfaces** : Définissez des interfaces claires
- **Imports** : Utilisez les imports absolus avec `@/`

```typescript
// ✅ Bon
import { Button } from '@/components/ui/button'
import { User } from '@/types'

// ❌ Éviter
import { Button } from '../../../components/ui/button'
```

### React

- **Composants fonctionnels** : Utilisez les hooks
- **Props typées** : Définissez des interfaces pour les props
- **Hooks personnalisés** : Pour la logique réutilisable

```typescript
// ✅ Bon
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### CSS / Tailwind

- **Classes utilitaires** : Utilisez Tailwind CSS
- **Composants** : Créez des composants réutilisables
- **Responsive** : Pensez mobile-first

```tsx
// ✅ Bon
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Titre</h2>
  <p className="text-gray-600">Description</p>
</div>
```

## 🧪 Tests

### Tests Unitaires

```bash
# Lancer tous les tests
npm run test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage
```

### Tests E2E

```bash
# Lancer les tests E2E
npm run test:e2e

# Interface graphique
npm run test:e2e:ui
```

### Écrire des Tests

```typescript
// Exemple de test unitaire
import { render, screen } from '@testing-library/react'
import { AgentCard } from '@/components/dashboard/AgentCard'

describe('AgentCard', () => {
  it('renders agent information', () => {
    const mockAgent = {
      id: 'frontend-pro',
      name: 'Frontend Pro',
      // ...
    }
    
    render(<AgentCard agent={mockAgent} onSelect={jest.fn()} />)
    
    expect(screen.getByText('Frontend Pro')).toBeInTheDocument()
  })
})
```

## 📚 Documentation

### Code

- **Commentaires** : Expliquez le "pourquoi", pas le "quoi"
- **JSDoc** : Pour les fonctions complexes
- **README** : Mettez à jour les instructions

### API

- **Types** : Définissez des types clairs
- **Exemples** : Fournissez des exemples d'usage
- **Erreurs** : Documentez les cas d'erreur

## 🐛 Signaler un Bug

1. **Vérifiez** les issues existantes
2. **Créez une issue** avec le template bug
3. **Fournissez** :
   - Description détaillée
   - Étapes de reproduction
   - Environnement (OS, navigateur, version)
   - Logs d'erreur si applicable

## ✨ Proposer une Fonctionnalité

1. **Vérifiez** les issues existantes
2. **Créez une issue** avec le template feature
3. **Décrivez** :
   - Le problème à résoudre
   - La solution proposée
   - Les alternatives considérées
   - L'impact sur l'utilisateur

## 🏷️ Labels et Milestones

### Labels

- `bug` : Problème à corriger
- `enhancement` : Amélioration
- `feature` : Nouvelle fonctionnalité
- `documentation` : Documentation
- `good first issue` : Bon pour débuter
- `help wanted` : Aide recherchée
- `priority: high` : Priorité élevée
- `priority: medium` : Priorité moyenne
- `priority: low` : Priorité faible

### Milestones

- `v1.0.0` : Version initiale
- `v1.1.0` : Prochaines fonctionnalités
- `v2.0.0` : Version majeure

## 🔍 Review Process

### Pour les Contributeurs

1. **Attendez** la review d'au moins un mainteneur
2. **Répondez** aux commentaires rapidement
3. **Corrigez** les problèmes identifiés
4. **Soyez patient** : les reviews prennent du temps

### Pour les Reviewers

1. **Soyez constructif** dans vos commentaires
2. **Expliquez** vos suggestions
3. **Reconnaissez** les bonnes pratiques
4. **Approuvez** quand c'est prêt

## 📞 Questions et Support

- **GitHub Issues** : Pour les bugs et fonctionnalités
- **Discussions** : Pour les questions générales
- **Email** : contact@myai-dev-studio.com
- **Discord** : [Serveur communautaire](https://discord.gg/myai-dev-studio)

## 🎉 Reconnaissance

Tous les contributeurs sont reconnus dans :
- Le fichier `CONTRIBUTORS.md`
- Les release notes
- Le site web du projet

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence que le projet (MIT).

---

**Merci de contribuer à MyAI Dev Studio ! 🚀**

Votre contribution aide à faire de cette plateforme un outil encore plus puissant pour les développeurs du monde entier.