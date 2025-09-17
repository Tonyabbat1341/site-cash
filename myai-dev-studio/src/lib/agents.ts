import { Agent, AgentType } from '@/types'

export const AGENTS: Record<AgentType, Agent> = {
  'frontend-pro': {
    id: 'frontend-pro',
    name: 'Frontend Pro',
    description: 'Expert en développement frontend avec React, HTML, CSS et Tailwind',
    icon: '🎨',
    capabilities: [
      'Création de composants React',
      'Styling avec Tailwind CSS',
      'Responsive design',
      'Optimisation des performances',
      'Accessibilité web'
    ],
    maxUsage: {
      free: 10,
      pro: 100,
      enterprise: -1
    }
  },
  'backend-pro': {
    id: 'backend-pro',
    name: 'Backend Pro',
    description: 'Spécialiste des APIs, bases de données et intégrations',
    icon: '⚙️',
    capabilities: [
      'APIs REST et GraphQL',
      'Intégration Supabase',
      'Authentification et sécurité',
      'Optimisation des requêtes',
      'Microservices'
    ],
    maxUsage: {
      free: 10,
      pro: 100,
      enterprise: -1
    }
  },
  'debugger': {
    id: 'debugger',
    name: 'Debugger',
    description: 'Expert en résolution de bugs et optimisation du code',
    icon: '🐛',
    capabilities: [
      'Détection d\'erreurs',
      'Optimisation des performances',
      'Refactoring de code',
      'Tests unitaires',
      'Analyse de logs'
    ],
    maxUsage: {
      free: 5,
      pro: 50,
      enterprise: -1
    }
  },
  'automatiser': {
    id: 'automatiser',
    name: 'Automatiser',
    description: 'Créateur de workflows et d\'automatisations',
    icon: '🤖',
    capabilities: [
      'Workflows visuels',
      'Intégrations API',
      'Automatisation de tâches',
      'Orchestration de services',
      'Monitoring et alertes'
    ],
    maxUsage: {
      free: 3,
      pro: 25,
      enterprise: -1
    }
  },
  'architecte': {
    id: 'architecte',
    name: 'Architecte',
    description: 'Conception de l\'architecture et structure des projets',
    icon: '🏗️',
    capabilities: [
      'Architecture de projet',
      'Design patterns',
      'Scalabilité',
      'Sécurité',
      'Documentation technique'
    ],
    maxUsage: {
      free: 5,
      pro: 25,
      enterprise: -1
    }
  }
}

export function getAgent(agentType: AgentType): Agent {
  return AGENTS[agentType]
}

export function getAllAgents(): Agent[] {
  return Object.values(AGENTS)
}