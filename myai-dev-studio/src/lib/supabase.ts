import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour la base de données
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  subscription_tier: 'free' | 'pro' | 'enterprise'
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description?: string
  user_id: string
  agent_type: 'frontend' | 'backend' | 'debugger' | 'automation' | 'architect'
  status: 'draft' | 'in_progress' | 'completed' | 'archived'
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export interface Workflow {
  id: string
  name: string
  description?: string
  user_id: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  status: 'draft' | 'active' | 'paused' | 'archived'
  created_at: string
  updated_at: string
  last_run?: string
  run_count: number
}

export interface WorkflowNode {
  id: string
  type: 'trigger' | 'action' | 'logic'
  subType: string
  position: { x: number; y: number }
  data: Record<string, any>
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
}

export interface ApiKey {
  id: string
  user_id: string
  name: string
  service: 'claude' | 'openai' | 'gemini' | 'stripe' | 'other'
  key_hash: string // Stocké hashé pour la sécurité
  is_active: boolean
  created_at: string
  last_used?: string
}

export interface Conversation {
  id: string
  user_id: string
  agent_type: string
  title: string
  messages: ConversationMessage[]
  created_at: string
  updated_at: string
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  metadata?: Record<string, any>
}

// Fonctions utilitaires pour Supabase
export const supabaseHelpers = {
  // Authentification
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Projets
  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()
    return { data, error }
  },

  async getUserProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
    return { data, error }
  },

  async updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  // Workflows
  async createWorkflow(workflow: Omit<Workflow, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('workflows')
      .insert(workflow)
      .select()
      .single()
    return { data, error }
  },

  async getUserWorkflows(userId: string) {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
    return { data, error }
  },

  async updateWorkflow(id: string, updates: Partial<Workflow>) {
    const { data, error } = await supabase
      .from('workflows')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  // API Keys
  async createApiKey(apiKey: Omit<ApiKey, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('api_keys')
      .insert(apiKey)
      .select()
      .single()
    return { data, error }
  },

  async getUserApiKeys(userId: string) {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
    return { data, error }
  },

  async deleteApiKey(id: string) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Conversations
  async createConversation(conversation: Omit<Conversation, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('conversations')
      .insert(conversation)
      .select()
      .single()
    return { data, error }
  },

  async getUserConversations(userId: string, agentType?: string) {
    let query = supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)

    if (agentType) {
      query = query.eq('agent_type', agentType)
    }

    const { data, error } = await query.order('updated_at', { ascending: false })
    return { data, error }
  },

  async updateConversation(id: string, updates: Partial<Conversation>) {
    const { data, error } = await supabase
      .from('conversations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}