'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WorkflowNode, WorkflowConnection } from '@/types'
import { Play, Pause, Square, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'

interface ExecutionStep {
  id: string
  nodeId: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  startTime?: Date
  endTime?: Date
  result?: any
  error?: string
}

interface WorkflowExecutorProps {
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  onClose: () => void
}

export function WorkflowExecutor({ nodes, connections, onClose }: WorkflowExecutorProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([])
  const [currentStep, setCurrentStep] = useState<string | null>(null)

  const getExecutionOrder = (): string[] => {
    // Simple topological sort to determine execution order
    const visited = new Set<string>()
    const result: string[] = []

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return
      visited.add(nodeId)

      // Find all nodes that connect to this one
      const incomingConnections = connections.filter(conn => conn.target === nodeId)
      for (const conn of incomingConnections) {
        visit(conn.source)
      }

      result.push(nodeId)
    }

    // Start with nodes that have no incoming connections
    const startNodes = nodes.filter(node => 
      !connections.some(conn => conn.target === node.id)
    )

    for (const node of startNodes) {
      visit(node.id)
    }

    return result
  }

  const executeWorkflow = async () => {
    setIsRunning(true)
    setExecutionSteps([])
    
    const executionOrder = getExecutionOrder()
    const steps: ExecutionStep[] = executionOrder.map(nodeId => ({
      id: `step-${nodeId}`,
      nodeId,
      status: 'pending'
    }))

    setExecutionSteps(steps)

    // Execute each step
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      const node = nodes.find(n => n.id === step.nodeId)
      
      if (!node) continue

      setCurrentStep(step.id)
      
      // Update step to running
      setExecutionSteps(prev => prev.map(s => 
        s.id === step.id ? { ...s, status: 'running', startTime: new Date() } : s
      ))

      try {
        // Simulate execution based on node type
        const result = await executeNode(node)
        
        // Update step to completed
        setExecutionSteps(prev => prev.map(s => 
          s.id === step.id ? { 
            ...s, 
            status: 'completed', 
            endTime: new Date(),
            result 
          } : s
        ))

        // Small delay between steps
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        // Update step to failed
        setExecutionSteps(prev => prev.map(s => 
          s.id === step.id ? { 
            ...s, 
            status: 'failed', 
            endTime: new Date(),
            error: error instanceof Error ? error.message : 'Unknown error'
          } : s
        ))
        break
      }
    }

    setIsRunning(false)
    setCurrentStep(null)
  }

  const executeNode = async (node: WorkflowNode): Promise<any> => {
    // Simulate different node types
    switch (node.type) {
      case 'api':
        return simulateApiCall(node)
      case 'ai-agent':
        return simulateAIAgent(node)
      case 'stripe':
        return simulateStripeOperation(node)
      case 'supabase':
        return simulateSupabaseOperation(node)
      case 'condition':
        return simulateCondition(node)
      case 'data-transform':
        return simulateDataTransform(node)
      default:
        return { message: 'Node executed successfully' }
    }
  }

  const simulateApiCall = async (node: WorkflowNode): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return {
      status: 200,
      data: { message: 'API call successful' },
      url: node.data.config?.url || 'https://api.example.com'
    }
  }

  const simulateAIAgent = async (node: WorkflowNode): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return {
      agent: node.data.config?.agent || 'frontend-pro',
      response: 'AI agent completed the task successfully',
      tokens: 150
    }
  }

  const simulateStripeOperation = async (node: WorkflowNode): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
      operation: 'payment',
      status: 'succeeded',
      amount: 29.99
    }
  }

  const simulateSupabaseOperation = async (node: WorkflowNode): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      operation: 'database',
      status: 'success',
      records: 5
    }
  }

  const simulateCondition = async (node: WorkflowNode): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      condition: 'evaluated',
      result: true,
      path: 'true'
    }
  }

  const simulateDataTransform = async (node: WorkflowNode): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      transformation: 'completed',
      inputRecords: 10,
      outputRecords: 10
    }
  }

  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed': return { icon: CheckCircle, color: 'text-green-500' }
      case 'failed': return { icon: XCircle, color: 'text-red-500' }
      case 'running': return { icon: Loader2, color: 'text-blue-500' }
      default: return { icon: Clock, color: 'text-gray-500' }
    }
  }

  const getNodeName = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId)
    return node?.data.name || node?.type || 'Unknown'
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Exécution du Workflow</h2>
            <p className="text-sm text-muted-foreground">
              {nodes.length} nodes, {connections.length} connexions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {!isRunning ? (
              <Button onClick={executeWorkflow}>
                <Play className="h-4 w-4 mr-2" />
                Exécuter
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsRunning(false)}>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </div>

      {/* Execution Steps */}
      <div className="flex-1 overflow-y-auto p-4">
        {executionSteps.length === 0 ? (
          <div className="text-center py-12">
            <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Prêt à exécuter</h3>
            <p className="text-muted-foreground">
              Cliquez sur "Exécuter" pour commencer le workflow
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {executionSteps.map((step, index) => {
              const { icon: Icon, color } = getStepStatus(step.status)
              const isCurrent = currentStep === step.id
              
              return (
                <Card key={step.id} className={isCurrent ? 'ring-2 ring-primary' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{getNodeName(step.nodeId)}</h4>
                          <p className="text-sm text-muted-foreground">
                            {step.nodeId}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-5 w-5 ${color} ${step.status === 'running' ? 'animate-spin' : ''}`} />
                        <Badge variant={
                          step.status === 'completed' ? 'default' :
                          step.status === 'failed' ? 'destructive' :
                          step.status === 'running' ? 'secondary' : 'outline'
                        }>
                          {step.status === 'completed' ? 'Terminé' :
                           step.status === 'failed' ? 'Échec' :
                           step.status === 'running' ? 'En cours' : 'En attente'}
                        </Badge>
                      </div>
                    </div>

                    {step.startTime && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Début: {step.startTime.toLocaleTimeString()}
                        {step.endTime && (
                          <span> • Fin: {step.endTime.toLocaleTimeString()}</span>
                        )}
                      </div>
                    )}

                    {step.result && (
                      <div className="mt-3 p-3 bg-muted rounded-md">
                        <h5 className="text-sm font-medium mb-1">Résultat:</h5>
                        <pre className="text-xs text-muted-foreground overflow-x-auto">
                          {JSON.stringify(step.result, null, 2)}
                        </pre>
                      </div>
                    )}

                    {step.error && (
                      <div className="mt-3 p-3 bg-destructive/10 rounded-md">
                        <h5 className="text-sm font-medium text-destructive mb-1">Erreur:</h5>
                        <p className="text-xs text-destructive">{step.error}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}