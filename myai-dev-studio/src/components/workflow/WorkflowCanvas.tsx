'use client'

import { useState, useRef, useCallback } from 'react'
import { WorkflowNode, WorkflowConnection } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Plus, 
  Play, 
  Save, 
  Settings, 
  Trash2, 
  Copy,
  Download,
  Upload
} from 'lucide-react'
import { WorkflowExecutor } from './WorkflowExecutor'

interface WorkflowCanvasProps {
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  onNodesChange: (nodes: WorkflowNode[]) => void
  onConnectionsChange: (connections: WorkflowConnection[]) => void
  onSave?: () => void
  onExecute?: () => void
}

const NODE_TYPES = [
  { type: 'api', label: 'API Request', icon: '🌐', color: 'bg-blue-100 border-blue-300' },
  { type: 'condition', label: 'Condition', icon: '❓', color: 'bg-yellow-100 border-yellow-300' },
  { type: 'stripe', label: 'Stripe', icon: '💳', color: 'bg-purple-100 border-purple-300' },
  { type: 'supabase', label: 'Supabase', icon: '🗄️', color: 'bg-green-100 border-green-300' },
  { type: 'ai-agent', label: 'Agent IA', icon: '🤖', color: 'bg-orange-100 border-orange-300' },
  { type: 'data-transform', label: 'Transform Data', icon: '🔄', color: 'bg-pink-100 border-pink-300' }
]

export function WorkflowCanvas({ 
  nodes, 
  connections, 
  onNodesChange, 
  onConnectionsChange,
  onSave,
  onExecute
}: WorkflowCanvasProps) {
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<{nodeId: string, handle: string} | null>(null)
  const [draggedNode, setDraggedNode] = useState<WorkflowNode | null>(null)
  const [showExecutor, setShowExecutor] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const addNode = (type: string) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: type as any,
      position: { 
        x: Math.random() * 400 + 100, 
        y: Math.random() * 300 + 100 
      },
      data: {
        name: NODE_TYPES.find(t => t.type === type)?.label || 'New Node',
        description: '',
        config: {}
      },
      inputs: ['input-1'],
      outputs: ['output-1']
    }
    onNodesChange([...nodes, newNode])
  }

  const updateNode = (nodeId: string, updates: Partial<WorkflowNode>) => {
    onNodesChange(nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ))
  }

  const deleteNode = (nodeId: string) => {
    onNodesChange(nodes.filter(node => node.id !== nodeId))
    onConnectionsChange(connections.filter(conn => 
      conn.source !== nodeId && conn.target !== nodeId
    ))
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null)
    }
  }

  const startConnection = (nodeId: string, handle: string) => {
    setIsConnecting(true)
    setConnectionStart({ nodeId, handle })
  }

  const endConnection = (nodeId: string, handle: string) => {
    if (isConnecting && connectionStart && connectionStart.nodeId !== nodeId) {
      const newConnection: WorkflowConnection = {
        id: `conn-${Date.now()}`,
        source: connectionStart.nodeId,
        target: nodeId,
        sourceHandle: connectionStart.handle,
        targetHandle: handle
      }
      onConnectionsChange([...connections, newConnection])
    }
    setIsConnecting(false)
    setConnectionStart(null)
  }

  const deleteConnection = (connectionId: string) => {
    onConnectionsChange(connections.filter(conn => conn.id !== connectionId))
  }

  const handleNodeDrag = (nodeId: string, deltaX: number, deltaY: number) => {
    updateNode(nodeId, {
      position: {
        x: nodes.find(n => n.id === nodeId)!.position.x + deltaX,
        y: nodes.find(n => n.id === nodeId)!.position.y + deltaY
      }
    })
  }

  const getNodeType = (type: string) => {
    return NODE_TYPES.find(t => t.type === type) || NODE_TYPES[0]
  }

  const exportWorkflow = () => {
    const workflow = {
      nodes,
      connections,
      metadata: {
        created: new Date().toISOString(),
        version: '1.0.0'
      }
    }
    
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workflow.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importWorkflow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const workflow = JSON.parse(e.target?.result as string)
        if (workflow.nodes && workflow.connections) {
          onNodesChange(workflow.nodes)
          onConnectionsChange(workflow.connections)
        }
      } catch (error) {
        console.error('Failed to import workflow:', error)
      }
    }
    reader.readAsText(file)
  }

  if (showExecutor) {
    return (
      <WorkflowExecutor
        nodes={nodes}
        connections={connections}
        onClose={() => setShowExecutor(false)}
      />
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b p-4 bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">Workflow Builder</h3>
            <div className="flex items-center space-x-1">
              <Button size="sm" onClick={() => setShowExecutor(true)} disabled={nodes.length === 0}>
                <Play className="h-4 w-4 mr-2" />
                Exécuter
              </Button>
              <Button size="sm" variant="outline" onClick={onSave}>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={exportWorkflow}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <label>
              <Button size="sm" variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Importer
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={importWorkflow}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Node Palette */}
        <div className="w-64 border-r bg-muted/50 p-4 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Nodes</h4>
            <div className="space-y-2">
              {NODE_TYPES.map((nodeType) => (
                <Button
                  key={nodeType.type}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => addNode(nodeType.type)}
                >
                  <span className="mr-2">{nodeType.icon}</span>
                  {nodeType.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Actions</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  onNodesChange([])
                  onConnectionsChange([])
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Effacer tout
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            ref={canvasRef}
            className="w-full h-full relative workflow-canvas"
            style={{
              backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {/* Connections */}
            <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((connection) => {
                const sourceNode = nodes.find(n => n.id === connection.source)
                const targetNode = nodes.find(n => n.id === connection.target)
                
                if (!sourceNode || !targetNode) return null

                const startX = sourceNode.position.x + 150 // Node width
                const startY = sourceNode.position.y + 20
                const endX = targetNode.position.x
                const endY = targetNode.position.y + 20

                return (
                  <g key={connection.id}>
                    <path
                      d={`M ${startX} ${startY} Q ${(startX + endX) / 2} ${startY - 50} ${endX} ${endY}`}
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                    <circle
                      cx={endX}
                      cy={endY}
                      r="4"
                      fill="#3b82f6"
                      className="cursor-pointer"
                      onClick={() => deleteConnection(connection.id)}
                    />
                  </g>
                )
              })}
              
              {/* Arrow marker */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#3b82f6"
                  />
                </marker>
              </defs>
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const nodeType = getNodeType(node.type)
              return (
                <Card
                  key={node.id}
                  className={`absolute cursor-move min-w-[150px] ${nodeType.color} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                    zIndex: 2
                  }}
                  onClick={() => setSelectedNode(node)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span>{nodeType.icon}</span>
                        <span className="text-sm font-medium">{node.data.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNode(node.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {/* Input handles */}
                    <div className="space-y-1 mb-2">
                      {node.inputs.map((input, index) => (
                        <div
                          key={index}
                          className="w-2 h-2 bg-blue-500 rounded-full cursor-pointer"
                          onMouseDown={() => startConnection(node.id, input)}
                          onMouseUp={() => endConnection(node.id, input)}
                        />
                      ))}
                    </div>
                    
                    {/* Output handles */}
                    <div className="space-y-1">
                      {node.outputs.map((output, index) => (
                        <div
                          key={index}
                          className="w-2 h-2 bg-green-500 rounded-full cursor-pointer ml-auto"
                          onMouseDown={() => startConnection(node.id, output)}
                          onMouseUp={() => endConnection(node.id, output)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {nodes.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🎨</div>
                  <h3 className="text-lg font-semibold">Créer votre premier workflow</h3>
                  <p className="text-muted-foreground">
                    Ajoutez des nodes depuis la palette pour commencer
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <div className="w-80 border-l bg-muted/50 p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Propriétés</CardTitle>
                <CardDescription>
                  Configurez les paramètres du node
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    value={selectedNode.data.name || ''}
                    onChange={(e) => updateNode(selectedNode.id, {
                      data: { ...selectedNode.data, name: e.target.value }
                    })}
                    placeholder="Nom du node"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    value={selectedNode.data.description || ''}
                    onChange={(e) => updateNode(selectedNode.id, {
                      data: { ...selectedNode.data, description: e.target.value }
                    })}
                    placeholder="Description du node"
                    rows={3}
                  />
                </div>

                {selectedNode.type === 'api' && (
                  <div>
                    <label className="text-sm font-medium">URL</label>
                    <input
                      type="url"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      value={selectedNode.data.config.url || ''}
                      onChange={(e) => updateNode(selectedNode.id, {
                        data: { 
                          ...selectedNode.data, 
                          config: { ...selectedNode.data.config, url: e.target.value }
                        }
                      })}
                      placeholder="https://api.example.com"
                    />
                  </div>
                )}

                {selectedNode.type === 'ai-agent' && (
                  <div>
                    <label className="text-sm font-medium">Agent</label>
                    <select
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      value={selectedNode.data.config.agent || ''}
                      onChange={(e) => updateNode(selectedNode.id, {
                        data: { 
                          ...selectedNode.data, 
                          config: { ...selectedNode.data.config, agent: e.target.value }
                        }
                      })}
                    >
                      <option value="">Sélectionner un agent</option>
                      <option value="frontend-pro">Frontend Pro</option>
                      <option value="backend-pro">Backend Pro</option>
                      <option value="debugger">Debugger</option>
                      <option value="automatiser">Automatiser</option>
                      <option value="architecte">Architecte</option>
                    </select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}