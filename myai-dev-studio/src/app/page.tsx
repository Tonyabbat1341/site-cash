'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AgentCard } from '@/components/dashboard/AgentCard'
import { ModelSelector } from '@/components/dashboard/ModelSelector'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import { WorkflowBuilder } from '@/components/dashboard/WorkflowBuilder'
import { AgentInterface } from '@/components/agents/AgentInterface'
import { SettingsPage } from '@/components/settings/SettingsPage'
import { LoginForm } from '@/components/auth/LoginForm'
import { useAuth } from '@/components/auth/AuthProvider'
import { getAllAgents, getAgent } from '@/lib/agents'
import { AIModel, Agent, Project, WorkflowNode, WorkflowConnection } from '@/types'
import { Plus, Workflow, Code, Settings, Zap, LogOut } from 'lucide-react'

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">🚀</div>
          <h2 className="text-2xl font-semibold">Chargement...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }
  const [selectedModel, setSelectedModel] = useState<AIModel>('auto')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [activeTab, setActiveTab] = useState<'agents' | 'projects' | 'workflows' | 'settings'>('agents')
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Mon Site Web',
      description: 'Site web moderne avec React et Tailwind',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'API E-commerce',
      description: 'API REST pour une boutique en ligne',
      status: 'published',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ])
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([])
  const [workflowConnections, setWorkflowConnections] = useState<WorkflowConnection[]>([])
  const [agentUsage] = useState({
    'frontend-pro': 3,
    'backend-pro': 1,
    'debugger': 0,
    'automatiser': 2,
    'architecte': 1
  })

  const agents = getAllAgents()
  const subscriptionTier: 'free' | 'pro' | 'enterprise' = 'pro'

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent)
    // Ici on ouvrirait l'interface de l'agent
  }

  const handleProjectOpen = (project: Project) => {
    // Ici on ouvrirait le projet
    console.log('Opening project:', project)
  }

  const handleProjectArchive = (project: Project) => {
    setProjects(projects.map(p => 
      p.id === project.id ? { ...p, status: 'archived' as const } : p
    ))
  }

  const tabs = [
    { id: 'agents', label: 'Agents IA', icon: Zap },
    { id: 'projects', label: 'Projets', icon: Code },
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">MyAI Dev Studio</h1>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Modèle:</span>
                <ModelSelector 
                  selectedModel={selectedModel} 
                  onModelChange={setSelectedModel} 
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setActiveTab('settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Projet
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Content */}
        {selectedAgent ? (
          <div className="h-[calc(100vh-200px)]">
            <AgentInterface 
              agent={selectedAgent} 
              onClose={() => setSelectedAgent(null)} 
            />
          </div>
        ) : activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Agents IA Spécialisés</h2>
              <p className="text-muted-foreground">
                Choisissez l'agent le plus adapté à votre tâche
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onSelect={handleAgentSelect}
                  usage={agentUsage[agent.id] || 0}
                  subscriptionTier={subscriptionTier}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Mes Projets</h2>
                <p className="text-muted-foreground">
                  Gérez vos projets et déployez vos applications
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Projet
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={handleProjectOpen}
                  onArchive={handleProjectArchive}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Workflow Builder</h2>
              <p className="text-muted-foreground">
                Créez des workflows visuels pour automatiser vos tâches
              </p>
            </div>
            
            <Card className="h-[600px]">
              <WorkflowBuilder
                nodes={workflowNodes}
                connections={workflowConnections}
                onNodesChange={setWorkflowNodes}
                onConnectionsChange={setWorkflowConnections}
              />
            </Card>
          </div>
        )}

        {activeTab === 'settings' && <SettingsPage />}
      </div>
    </div>
  )
}