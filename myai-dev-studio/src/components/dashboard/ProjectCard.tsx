'use client'

import { Project } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MoreHorizontal, Play, Archive } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
  onArchive: (project: Project) => void
}

export function ProjectCard({ project, onOpen, onArchive }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publié'
      case 'draft': return 'Brouillon'
      case 'archived': return 'Archivé'
      default: return status
    }
  }

  return (
    <Card className="transition-all hover:shadow-lg hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description || 'Aucune description'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(project.status)}>
              {getStatusText(project.status)}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => onOpen(project)} 
              className="flex-1"
              size="sm"
            >
              <Play className="h-4 w-4 mr-2" />
              Ouvrir
            </Button>
            {project.status !== 'archived' && (
              <Button 
                onClick={() => onArchive(project)} 
                variant="outline" 
                size="sm"
              >
                <Archive className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}