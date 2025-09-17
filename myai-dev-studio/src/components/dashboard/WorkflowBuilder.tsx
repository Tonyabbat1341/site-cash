'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas'
import { WorkflowNode, WorkflowConnection } from '@/types'
import { Plus, Play, Save, Settings } from 'lucide-react'

interface WorkflowBuilderProps {
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  onNodesChange: (nodes: WorkflowNode[]) => void
  onConnectionsChange: (connections: WorkflowConnection[]) => void
}


export function WorkflowBuilder({ nodes, connections, onNodesChange, onConnectionsChange }: WorkflowBuilderProps) {
  const handleSave = () => {
    // Ici on sauvegarderait le workflow
    console.log('Saving workflow...', { nodes, connections })
  }

  const handleExecute = () => {
    // Ici on exécuterait le workflow
    console.log('Executing workflow...', { nodes, connections })
  }

  return (
    <WorkflowCanvas
      nodes={nodes}
      connections={connections}
      onNodesChange={onNodesChange}
      onConnectionsChange={onConnectionsChange}
      onSave={handleSave}
      onExecute={handleExecute}
    />
  )
}