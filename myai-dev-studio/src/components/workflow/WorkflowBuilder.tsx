'use client'

import React, { useState, useCallback } from 'react'
import { 
  ReactFlow, 
  MiniMap, 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Play, 
  Save, 
  Database, 
  Globe, 
  Mail, 
  CreditCard,
  Webhook,
  Filter,
  Code,
  Timer
} from 'lucide-react'

// Types de nodes disponibles
const nodeTypes = {
  trigger: {
    name: 'Déclencheur',
    icon: Play,
    color: 'bg-green-500',
    nodes: [
      { id: 'webhook', label: 'Webhook', icon: Webhook },
      { id: 'schedule', label: 'Planificateur', icon: Timer },
      { id: 'manual', label: 'Manuel', icon: Play },
    ]
  },
  action: {
    name: 'Actions',
    icon: Code,
    color: 'bg-blue-500',
    nodes: [
      { id: 'http', label: 'Requête HTTP', icon: Globe },
      { id: 'email', label: 'Email', icon: Mail },
      { id: 'database', label: 'Base de données', icon: Database },
      { id: 'stripe', label: 'Stripe', icon: CreditCard },
    ]
  },
  logic: {
    name: 'Logique',
    icon: Filter,
    color: 'bg-purple-500',
    nodes: [
      { id: 'condition', label: 'Condition', icon: Filter },
      { id: 'loop', label: 'Boucle', icon: Code },
    ]
  }
}

// Nodes et edges initiaux
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 25 },
    data: { 
      label: 'Démarrer',
      nodeType: 'trigger',
      subType: 'manual'
    },
    style: {
      background: '#10b981',
      color: 'white',
      border: '1px solid #059669',
      borderRadius: '8px',
    }
  }
]

const initialEdges: Edge[] = []

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNodeType, setSelectedNodeType] = useState<string | null>(null)
  const [nodeCounter, setNodeCounter] = useState(2)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addNode = (nodeType: string, subType: string, label: string) => {
    const newNode: Node = {
      id: nodeCounter.toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label,
        nodeType,
        subType
      },
      style: {
        background: nodeType === 'trigger' ? '#10b981' : 
                   nodeType === 'action' ? '#3b82f6' : '#8b5cf6',
        color: 'white',
        border: `1px solid ${nodeType === 'trigger' ? '#059669' : 
                           nodeType === 'action' ? '#2563eb' : '#7c3aed'}`,
        borderRadius: '8px',
        padding: '10px',
        minWidth: '150px',
        textAlign: 'center'
      }
    }

    setNodes((nds) => nds.concat(newNode))
    setNodeCounter(counter => counter + 1)
  }

  const saveWorkflow = () => {
    const workflow = {
      nodes,
      edges,
      name: 'Mon Workflow',
      description: 'Workflow créé avec MyAI Dev Studio',
      createdAt: new Date().toISOString()
    }
    
    // Ici on sauvegarderait dans Supabase
    console.log('Workflow sauvegardé:', workflow)
    alert('Workflow sauvegardé avec succès!')
  }

  const runWorkflow = () => {
    // Ici on exécuterait le workflow
    console.log('Exécution du workflow avec nodes:', nodes, 'et edges:', edges)
    alert('Workflow exécuté! (simulation)')
  }

  return (
    <div className="h-full flex">
      {/* Palette de nodes */}
      <div className="w-80 bg-card border-r p-4 overflow-y-auto">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Workflow Builder</h2>
            <div className="flex space-x-2 mb-4">
              <Button onClick={saveWorkflow} variant="outline" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
              <Button onClick={runWorkflow} size="sm">
                <Play className="mr-2 h-4 w-4" />
                Exécuter
              </Button>
            </div>
          </div>

          {Object.entries(nodeTypes).map(([key, category]) => (
            <Card key={key}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.nodes.map((node) => (
                  <Button
                    key={node.id}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => addNode(key, node.id, node.label)}
                  >
                    <node.icon className="mr-2 h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{node.label}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>1. Cliquez sur un élément pour l'ajouter au workflow</p>
              <p>2. Connectez les éléments en tirant des lignes</p>
              <p>3. Configurez chaque élément selon vos besoins</p>
              <p>4. Sauvegardez et testez votre workflow</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Canvas du workflow */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>

        {/* Panel de configuration (apparaîtrait quand un node est sélectionné) */}
        {selectedNodeType && (
          <div className="absolute top-4 right-4 w-80 bg-card border rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-3">Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Configuration du node sélectionné apparaîtrait ici
            </p>
          </div>
        )}
      </div>
    </div>
  )
}