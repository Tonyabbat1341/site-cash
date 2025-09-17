export type AIModel = 'claude-sonnet-3.5' | 'gemini-pro' | 'gpt-4.1' | 'auto'

export type SubscriptionTier = 'free' | 'pro' | 'enterprise'

export type AgentType = 'frontend-pro' | 'backend-pro' | 'debugger' | 'automatiser' | 'architecte'

export interface Agent {
  id: AgentType
  name: string
  description: string
  icon: string
  capabilities: string[]
  maxUsage: {
    free: number
    pro: number
    enterprise: number
  }
}

export interface WorkflowNode {
  id: string
  type: 'api' | 'condition' | 'stripe' | 'supabase' | 'ai-agent' | 'data-transform'
  position: { x: number; y: number }
  data: any
  inputs: string[]
  outputs: string[]
}

export interface WorkflowConnection {
  id: string
  source: string
  target: string
  sourceHandle: string
  targetHandle: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  subscriptionTier: SubscriptionTier
  createdAt: string
  updatedAt: string
}