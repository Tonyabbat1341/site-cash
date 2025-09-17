'use client'

import { useState, useEffect } from 'react'
import { supabaseHelpers, type Project } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useProjects() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabaseHelpers.getUserProjects(user.id)
    
    if (fetchError) {
      setError(fetchError.message)
      console.error('Error fetching projects:', fetchError)
    } else {
      setProjects(data || [])
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [user])

  const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    setLoading(true)
    const { data, error } = await supabaseHelpers.createProject({
      ...projectData,
      user_id: user.id
    })

    if (error) {
      setError(error.message)
      throw error
    }

    if (data) {
      setProjects(prev => [data, ...prev])
    }
    
    setLoading(false)
    return data
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    setLoading(true)
    const { data, error } = await supabaseHelpers.updateProject(id, updates)

    if (error) {
      setError(error.message)
      throw error
    }

    if (data) {
      setProjects(prev => prev.map(project => 
        project.id === id ? data : project
      ))
    }
    
    setLoading(false)
    return data
  }

  const deleteProject = async (id: string) => {
    // Note: Cette fonction nécessiterait une fonction helper dans supabaseHelpers
    setProjects(prev => prev.filter(project => project.id !== id))
  }

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  }
}