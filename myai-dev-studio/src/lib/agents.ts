import { 
  Code2, 
  Database, 
  Bug, 
  Zap, 
  Building 
} from 'lucide-react'

export const agentsConfig = {
  frontend: {
    id: 'frontend',
    name: 'Frontend Pro',
    icon: Code2,
    color: 'text-blue-500',
    description: 'Expert en développement frontend moderne avec React, Vue, Angular et plus',
    capabilities: [
      'Création de composants React/Vue/Angular',
      'Intégration Tailwind CSS et styling moderne',
      'Optimisation des performances frontend',
      'Responsive design et accessibilité',
      'Tests unitaires et E2E',
      'PWA et optimisations SEO',
      'Animations et micro-interactions',
      'État management (Redux, Zustand, Pinia)'
    ],
    examples: [
      {
        title: 'Composant React moderne',
        description: 'Créer un composant avec hooks et TypeScript',
        prompt: 'Crée un composant React TypeScript pour un dashboard avec des cards interactives, utilisant Tailwind CSS et des hooks modernes'
      },
      {
        title: 'Landing page responsive',
        description: 'Page d\'accueil complète avec animations',
        prompt: 'Génère une landing page moderne et responsive pour une SaaS, avec hero section, features, pricing et footer. Utilise Tailwind et Framer Motion'
      },
      {
        title: 'Formulaire avancé',
        description: 'Formulaire avec validation et UX optimisée',
        prompt: 'Crée un formulaire multi-étapes avec validation en temps réel, gestion d\'erreurs et UX fluide en React Hook Form'
      }
    ]
  },
  
  backend: {
    id: 'backend',
    name: 'Backend Pro',
    icon: Database,
    color: 'text-green-500',
    description: 'Spécialiste backend avec Node.js, Express, bases de données et APIs',
    capabilities: [
      'APIs REST et GraphQL',
      'Authentification JWT et OAuth',
      'Intégration bases de données (SQL/NoSQL)',
      'Microservices et architecture distribuée',
      'Sécurité et validation des données',
      'Caching et optimisation des performances',
      'Documentation API automatique',
      'Tests d\'intégration et monitoring'
    ],
    examples: [
      {
        title: 'API REST complète',
        description: 'CRUD avec authentification et validation',
        prompt: 'Crée une API REST Node.js/Express avec authentification JWT, CRUD utilisateurs, validation Joi et intégration MongoDB'
      },
      {
        title: 'Microservice de paiement',
        description: 'Service de paiement avec Stripe',
        prompt: 'Développe un microservice de paiement avec Stripe, webhooks, gestion des abonnements et notifications email'
      },
      {
        title: 'API GraphQL',
        description: 'API GraphQL avec résolveurs optimisés',
        prompt: 'Construis une API GraphQL avec Apollo Server, résolveurs optimisés, DataLoader pour éviter N+1 et système de cache'
      }
    ]
  },

  debugger: {
    id: 'debugger',
    name: 'Debugger',
    icon: Bug,
    color: 'text-red-500',
    description: 'Expert en débogage, optimisation et résolution de problèmes',
    capabilities: [
      'Analyse et correction de bugs',
      'Optimisation des performances',
      'Refactoring de code legacy',
      'Analyse de sécurité',
      'Profiling et monitoring',
      'Correction de fuites mémoire',
      'Optimisation des requêtes DB',
      'Code review et bonnes pratiques'
    ],
    examples: [
      {
        title: 'Performance React',
        description: 'Optimiser un composant React lent',
        prompt: 'Mon composant React est lent avec de gros datasets. Peux-tu analyser et optimiser avec memo, useMemo et virtualisation ?'
      },
      {
        title: 'Fuite mémoire Node.js',
        description: 'Identifier et corriger les fuites mémoire',
        prompt: 'Mon app Node.js a des fuites mémoire. Comment identifier et corriger les event listeners non nettoyés et les références circulaires ?'
      },
      {
        title: 'Requêtes SQL lentes',
        description: 'Optimiser les performances de base de données',
        prompt: 'Mes requêtes SQL sont très lentes. Peux-tu analyser les index manquants et optimiser les jointures complexes ?'
      }
    ]
  },

  automation: {
    id: 'automation',
    name: 'Automatiser',
    icon: Zap,
    color: 'text-yellow-500',
    description: 'Créateur de workflows automatisés et d\'intégrations',
    capabilities: [
      'Workflows automatisés (style n8n)',
      'Intégrations API tierces',
      'Automatisation CI/CD',
      'Scripts de déploiement',
      'Webhooks et événements',
      'Traitement de données en batch',
      'Notifications automatiques',
      'Monitoring et alertes'
    ],
    examples: [
      {
        title: 'Workflow e-commerce',
        description: 'Automatiser les commandes et notifications',
        prompt: 'Crée un workflow qui traite les nouvelles commandes, met à jour l\'inventaire, envoie des emails et synchronise avec la comptabilité'
      },
      {
        title: 'CI/CD Pipeline',
        description: 'Pipeline de déploiement automatisé',
        prompt: 'Configure un pipeline CI/CD avec tests automatiques, build Docker, déploiement staging puis production avec rollback automatique'
      },
      {
        title: 'Synchronisation données',
        description: 'Sync entre plusieurs systèmes',
        prompt: 'Automatise la synchronisation bidirectionnelle entre CRM, système de facturation et plateforme e-commerce en temps réel'
      }
    ]
  },

  architect: {
    id: 'architect',
    name: 'Architecte',
    icon: Building,
    color: 'text-purple-500',
    description: 'Architecte logiciel pour la conception et structure de projets',
    capabilities: [
      'Architecture d\'applications complexes',
      'Patterns de conception (MVC, MVVM, Clean)',
      'Microservices et monolithes modulaires',
      'Scalabilité et haute disponibilité',
      'Sécurité et conformité',
      'Documentation technique',
      'Choix technologiques éclairés',
      'Migration et modernisation'
    ],
    examples: [
      {
        title: 'Architecture e-commerce',
        description: 'Concevoir une plateforme scalable',
        prompt: 'Conçois l\'architecture complète d\'une plateforme e-commerce B2B avec multi-tenancy, 1M+ utilisateurs et intégrations ERP'
      },
      {
        title: 'Migration vers microservices',
        description: 'Stratégie de migration progressive',
        prompt: 'Planifie la migration d\'un monolithe legacy vers des microservices avec stratégie par étapes et zéro downtime'
      },
      {
        title: 'Système de monitoring',
        description: 'Architecture de surveillance complète',
        prompt: 'Conçois un système de monitoring et observabilité avec métriques, logs, traces et alertes pour une architecture distribuée'
      }
    ]
  }
}

export type AgentId = keyof typeof agentsConfig