'use client'

import React from 'react'
import { 
  Home, 
  Bot, 
  Workflow, 
  Settings, 
  CreditCard, 
  Code2, 
  Database, 
  Zap, 
  Bug, 
  Building 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const agents = [
  { id: 'frontend', name: 'Frontend Pro', icon: Code2, color: 'text-blue-500' },
  { id: 'backend', name: 'Backend Pro', icon: Database, color: 'text-green-500' },
  { id: 'debugger', name: 'Debugger', icon: Bug, color: 'text-red-500' },
  { id: 'automation', name: 'Automatiser', icon: Zap, color: 'text-yellow-500' },
  { id: 'architect', name: 'Architecte', icon: Building, color: 'text-purple-500' },
]

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-xl font-bold">MyAI Dev Studio</h1>
        <p className="text-sm text-muted-foreground">Plateforme de développement IA</p>
      </div>

      {/* Navigation principale */}
      <div className="px-4 mb-6">
        <nav className="space-y-2">
          <Button 
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button 
            variant={activeTab === 'workflows' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('workflows')}
          >
            <Workflow className="mr-2 h-4 w-4" />
            Workflows
          </Button>
          <Button 
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
          <Button 
            variant={activeTab === 'billing' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('billing')}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Abonnement
          </Button>
        </nav>
      </div>

      {/* Agents IA */}
      <div className="px-4 flex-1">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          AGENTS IA
        </h3>
        <div className="space-y-2">
          {agents.map((agent) => (
            <Button
              key={agent.id}
              variant={activeTab === agent.id ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab(agent.id)}
            >
              <agent.icon className={`mr-2 h-4 w-4 ${agent.color}`} />
              {agent.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Upgrade Card */}
      <div className="p-4">
        <Card className="p-4">
          <div className="text-center">
            <Bot className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h4 className="font-semibold text-sm">Upgrade Pro</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Débloquez tous les agents et workflows
            </p>
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}