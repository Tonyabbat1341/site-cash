'use client'

import { useState, useEffect } from 'react'
import { supabaseHelpers, type Workflow } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useWorkflows() {
  const { user } = useAuth()
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkflows = async () => {
    if (!user) {
      setWorkflows([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabaseHelpers.getUserWorkflows(user.id)
    
    if (fetchError) {
      setError(fetchError.message)
      console.error('Error fetching workflows:', fetchError)
    } else {
      setWorkflows(data || [])
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchWorkflows()
  }, [user])

  const createWorkflow = async (workflowData: Omit<Workflow, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    setLoading(true)
    const { data, error } = await supabaseHelpers.createWorkflow({
      ...workflowData,
      user_id: user.id
    })

    if (error) {
      setError(error.message)
      throw error
    }

    if (data) {
      setWorkflows(prev => [data, ...prev])
    }
    
    setLoading(false)
    return data
  }

  const updateWorkflow = async (id: string, updates: Partial<Workflow>) => {
    setLoading(true)
    const { data, error } = await supabaseHelpers.updateWorkflow(id, updates)

    if (error) {
      setError(error.message)
      throw error
    }

    if (data) {
      setWorkflows(prev => prev.map(workflow => 
        workflow.id === id ? data : workflow
      ))
    }
    
    setLoading(false)
    return data
  }

  const deleteWorkflow = async (id: string) => {
    // Note: Cette fonction nécessiterait une fonction helper dans supabaseHelpers
    setWorkflows(prev => prev.filter(workflow => workflow.id !== id))
  }

  const saveWorkflow = async (nodes: any[], edges: any[], name: string, description?: string) => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    // Chercher un workflow existant ou en créer un nouveau
    const existingWorkflow = workflows.find(w => w.name === name)
    
    if (existingWorkflow) {
      return await updateWorkflow(existingWorkflow.id, {
        nodes,
        edges,
        description
      })
    } else {
      return await createWorkflow({
        name,
        description: description || '',
        nodes,
        edges,
        status: 'draft',
        run_count: 0
      })
    }
  }

  return {
    workflows,
    loading,
    error,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    saveWorkflow,
    refetch: fetchWorkflows
  }
}