'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { AgentInterface } from '@/components/agents/AgentInterface'
import { WorkflowBuilder } from '@/components/workflow/WorkflowBuilder'
import { Settings } from '@/components/settings/Settings'
import { Billing } from '@/components/billing/Billing'
import { AuthModal } from '@/components/auth/AuthModal'
import { useAuth } from '@/hooks/useAuth'
import { agentsConfig, type AgentId } from '@/lib/agents'

export default function Home() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedModel, setSelectedModel] = useState('auto')
  const [showAuthModal, setShowAuthModal] = useState(false)

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return <Dashboard />
    }
    
    if (activeTab === 'workflows') {
      return <WorkflowBuilder />
    }
    
    if (activeTab === 'settings') {
      return <Settings />
    }
    
    if (activeTab === 'billing') {
      return <Billing />
    }
    
    // Vérifier si c'est un agent
    if (activeTab in agentsConfig) {
      const agent = agentsConfig[activeTab as AgentId]
      return (
        <AgentInterface
          agentId={agent.id}
          agentName={agent.name}
          agentIcon={agent.icon}
          agentColor={agent.color}
          agentDescription={agent.description}
          capabilities={agent.capabilities}
          examples={agent.examples}
        />
      )
    }
    
    return <Dashboard />
  }

  // Afficher un loader pendant le chargement de l'auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  // Afficher la modal d'auth si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/50">
        <AuthModal isOpen={true} onClose={() => {}} />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header 
          selectedModel={selectedModel} 
          setSelectedModel={setSelectedModel} 
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}