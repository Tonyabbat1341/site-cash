import { AIModel } from '@/types'

export const AI_MODELS = {
  'claude-sonnet-3.5': {
    name: 'Claude Sonnet 3.5',
    provider: 'anthropic',
    description: 'Modèle avancé pour le raisonnement complexe et la génération de code',
    capabilities: ['code-generation', 'reasoning', 'analysis']
  },
  'gemini-pro': {
    name: 'Gemini Pro',
    provider: 'google',
    description: 'Modèle polyvalent pour diverses tâches de développement',
    capabilities: ['code-generation', 'documentation', 'testing']
  },
  'gpt-4.1': {
    name: 'OpenAI GPT-4.1',
    provider: 'openai',
    description: 'Modèle puissant pour la génération et l\'optimisation de code',
    capabilities: ['code-generation', 'debugging', 'optimization']
  },
  'auto': {
    name: 'Mode Auto',
    provider: 'auto',
    description: 'Sélection automatique du meilleur modèle selon la tâche',
    capabilities: ['all']
  }
} as const

export function getModelForTask(task: string, agentType: string): AIModel {
  // Logique de sélection automatique du modèle
  if (task.includes('debug') || task.includes('error')) {
    return 'gpt-4.1'
  }
  if (task.includes('architecture') || task.includes('structure')) {
    return 'claude-sonnet-3.5'
  }
  if (task.includes('frontend') || task.includes('ui')) {
    return 'gemini-pro'
  }
  if (task.includes('backend') || task.includes('api')) {
    return 'gpt-4.1'
  }
  
  return 'claude-sonnet-3.5' // Par défaut
}

export async function callAI(
  model: AIModel,
  prompt: string,
  apiKey: string,
  agentType: string
): Promise<string> {
  // Implémentation des appels API vers les différents modèles
  // Pour l'instant, retournons une réponse simulée
  return `Réponse simulée du modèle ${model} pour l'agent ${agentType}: ${prompt}`
}