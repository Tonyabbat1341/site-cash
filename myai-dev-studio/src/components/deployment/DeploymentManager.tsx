'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/components/auth/AuthProvider'
import { 
  Globe, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle, 
  Loader2,
  Upload,
  Settings
} from 'lucide-react'

interface DeployedSite {
  id: string
  project_id: string
  domain: string
  status: 'deploying' | 'deployed' | 'failed'
  deployment_url: string
  created_at: string
  updated_at: string
}

interface Project {
  id: string
  name: string
  description: string
  status: 'draft' | 'published' | 'archived'
}

export function DeploymentManager() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [deployedSites, setDeployedSites] = useState<DeployedSite[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeploying, setIsDeploying] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [customDomain, setCustomDomain] = useState('')

  useEffect(() => {
    if (user) {
      fetchProjects()
      fetchDeployedSites()
    }
  }, [user])

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/projects?userId=${user?.id}`)
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  const fetchDeployedSites = async () => {
    try {
      const response = await fetch(`/api/deployment/sites?userId=${user?.id}`)
      const data = await response.json()
      setDeployedSites(data.sites || [])
    } catch (error) {
      console.error('Failed to fetch deployed sites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeploy = async () => {
    if (!selectedProject) return

    setIsDeploying(true)
    try {
      const response = await fetch('/api/deployment/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: selectedProject,
          customDomain: customDomain || undefined
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Refresh deployed sites
        await fetchDeployedSites()
        setSelectedProject('')
        setCustomDomain('')
      } else {
        throw new Error(data.error || 'Deployment failed')
      }
    } catch (error) {
      console.error('Deployment failed:', error)
    } finally {
      setIsDeploying(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-800'
      case 'deploying': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'deployed': return 'Déployé'
      case 'deploying': return 'Déploiement en cours'
      case 'failed': return 'Échec'
      default: return status
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Chargement...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Déploiement de sites</h2>
        <p className="text-muted-foreground">
          Déployez vos projets directement sur Supabase Hosting
        </p>
      </div>

      {/* Deploy new site */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Déployer un nouveau site
          </CardTitle>
          <CardDescription>
            Sélectionnez un projet et déployez-le en quelques clics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Projet à déployer</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Sélectionner un projet</option>
              {projects
                .filter(p => p.status !== 'archived')
                .map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Domaine personnalisé (optionnel)</label>
            <Input
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="mon-site.com"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Laissez vide pour un domaine automatique
            </p>
          </div>

          <Button 
            onClick={handleDeploy} 
            disabled={!selectedProject || isDeploying}
            className="w-full"
          >
            {isDeploying ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Globe className="h-4 w-4 mr-2" />
            )}
            {isDeploying ? 'Déploiement...' : 'Déployer le site'}
          </Button>
        </CardContent>
      </Card>

      {/* Deployed sites */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sites déployés</h3>
        
        {deployedSites.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">Aucun site déployé</h4>
              <p className="text-sm text-muted-foreground">
                Déployez votre premier projet pour le voir apparaître ici
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deployedSites.map((site) => (
              <Card key={site.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{site.domain}</CardTitle>
                    <Badge className={getStatusColor(site.status)}>
                      {getStatusText(site.status)}
                    </Badge>
                  </div>
                  <CardDescription>
                    Déployé le {new Date(site.created_at).toLocaleDateString('fr-FR')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {site.status === 'deployed' && site.deployment_url && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          value={site.deployment_url}
                          readOnly
                          className="text-sm"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(site.deployment_url)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(site.deployment_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {site.status === 'deploying' && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Déploiement en cours...</span>
                    </div>
                  )}

                  {site.status === 'failed' && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>Échec du déploiement</span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurer
                    </Button>
                    <Button size="sm" variant="outline">
                      Voir les logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Information card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">Supabase Hosting</h4>
              <p className="text-sm text-blue-700">
                Vos sites sont déployés sur l'infrastructure Supabase avec un CDN global, 
                HTTPS automatique et des domaines personnalisés. Les déploiements sont 
                instantanés et incluent la gestion des versions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}