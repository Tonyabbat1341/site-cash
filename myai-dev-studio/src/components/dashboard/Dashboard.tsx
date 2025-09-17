'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Zap, 
  Code2, 
  Database, 
  Bug, 
  Building, 
  Activity,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react'

const stats = [
  {
    title: 'Projets actifs',
    value: '12',
    change: '+2 ce mois',
    icon: Activity,
  },
  {
    title: 'Agents utilisés',
    value: '5',
    change: 'Tous disponibles',
    icon: Users,
  },
  {
    title: 'Workflows créés',
    value: '8',
    change: '+3 cette semaine',
    icon: TrendingUp,
  },
  {
    title: 'Temps économisé',
    value: '24h',
    change: 'Ce mois-ci',
    icon: Clock,
  },
]

const recentProjects = [
  {
    name: 'E-commerce React',
    agent: 'Frontend Pro',
    status: 'En cours',
    lastModified: 'Il y a 2h',
    icon: Code2,
    color: 'text-blue-500',
  },
  {
    name: 'API REST Node.js',
    agent: 'Backend Pro',
    status: 'Terminé',
    lastModified: 'Hier',
    icon: Database,
    color: 'text-green-500',
  },
  {
    name: 'Debug Performance',
    agent: 'Debugger',
    status: 'En cours',
    lastModified: 'Il y a 1h',
    icon: Bug,
    color: 'text-red-500',
  },
]

const quickActions = [
  {
    title: 'Nouveau Projet',
    description: 'Créer un nouveau projet avec un agent IA',
    icon: Plus,
    action: 'create-project',
  },
  {
    title: 'Workflow Builder',
    description: 'Construire un workflow automatisé',
    icon: Zap,
    action: 'create-workflow',
  },
  {
    title: 'Architecture',
    description: 'Planifier l\'architecture d\'un projet',
    icon: Building,
    action: 'architecture',
  },
]

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue sur MyAI Dev Studio - Votre plateforme de développement IA
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Commencez rapidement un nouveau projet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                <action.icon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projets récents</CardTitle>
            <CardDescription>
              Vos derniers projets et leur statut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <project.icon className={`h-6 w-6 ${project.color}`} />
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Agent: {project.agent}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      project.status === 'Terminé' 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`}>
                      {project.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {project.lastModified}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance des Agents</CardTitle>
          <CardDescription>
            Utilisation et efficacité de vos agents IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { name: 'Frontend Pro', usage: 85, icon: Code2, color: 'bg-blue-500' },
              { name: 'Backend Pro', usage: 72, icon: Database, color: 'bg-green-500' },
              { name: 'Debugger', usage: 45, icon: Bug, color: 'bg-red-500' },
              { name: 'Automatiser', usage: 60, icon: Zap, color: 'bg-yellow-500' },
              { name: 'Architecte', usage: 38, icon: Building, color: 'bg-purple-500' },
            ].map((agent) => (
              <div key={agent.name} className="text-center">
                <agent.icon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h4 className="font-medium text-sm">{agent.name}</h4>
                <div className="mt-2">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`${agent.color} h-2 rounded-full`}
                      style={{ width: `${agent.usage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {agent.usage}% utilisé
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}