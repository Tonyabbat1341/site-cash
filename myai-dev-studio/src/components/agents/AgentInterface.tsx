'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Agent, AIModel } from '@/types'
import { ModelSelector } from '@/components/dashboard/ModelSelector'
import { Send, Loader2, Code, FileText, Zap } from 'lucide-react'

interface AgentInterfaceProps {
  agent: Agent
  onClose: () => void
}

export function AgentInterface({ agent, onClose }: AgentInterfaceProps) {
  const [selectedModel, setSelectedModel] = useState<AIModel>('auto')
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<Array<{
    id: string
    type: 'user' | 'agent'
    content: string
    timestamp: Date
  }>>([])

  const handleSend = async () => {
    if (!prompt.trim() || isLoading) return

    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user' as const,
      content: prompt,
      timestamp: new Date()
    }

    setConversation(prev => [...prev, userMessage])
    setPrompt('')
    setIsLoading(true)

    // Simulation d'un appel à l'IA
    await new Promise(resolve => setTimeout(resolve, 2000))

    const agentResponse = {
      id: `agent-${Date.now()}`,
      type: 'agent' as const,
      content: `Voici la réponse de ${agent.name} pour votre demande : "${prompt}". 

Je vais vous aider à ${agent.capabilities[0].toLowerCase()} en utilisant le modèle ${selectedModel}. 

Voici un exemple de code que je peux générer pour vous :

\`\`\`typescript
// Exemple généré par ${agent.name}
function example() {
  console.log('Hello from ${agent.name}!');
  return 'Generated code';
}
\`\`\`

Que souhaitez-vous que je fasse ensuite ?`,
      timestamp: new Date()
    }

    setConversation(prev => [...prev, agentResponse])
    setIsLoading(false)
  }

  const getAgentIcon = (agentId: string) => {
    switch (agentId) {
      case 'frontend-pro': return <Code className="h-5 w-5" />
      case 'backend-pro': return <Zap className="h-5 w-5" />
      case 'debugger': return <FileText className="h-5 w-5" />
      case 'automatiser': return <Zap className="h-5 w-5" />
      case 'architecte': return <FileText className="h-5 w-5" />
      default: return <Code className="h-5 w-5" />
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{agent.icon}</div>
            <div>
              <h2 className="text-xl font-semibold">{agent.name}</h2>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ModelSelector 
              selectedModel={selectedModel} 
              onModelChange={setSelectedModel} 
            />
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="p-4 border-b">
        <div className="flex flex-wrap gap-2">
          {agent.capabilities.map((capability, index) => (
            <Badge key={index} variant="secondary">
              {capability}
            </Badge>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.length === 0 ? (
          <div className="text-center space-y-4 py-12">
            <div className="text-6xl">{agent.icon}</div>
            <h3 className="text-xl font-semibold">Bonjour ! Je suis {agent.name}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {agent.description}. Comment puis-je vous aider aujourd'hui ?
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Suggestions :</p>
              <div className="flex flex-wrap justify-center gap-2">
                {agent.capabilities.slice(0, 3).map((capability, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(`Aide-moi avec ${capability.toLowerCase()}`)}
                  >
                    {capability}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          conversation.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'agent' && (
                    <div className="flex-shrink-0 mt-1">
                      {getAgentIcon(agent.id)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">L'agent réfléchit...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Posez une question à ${agent.name}...`}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={!prompt.trim() || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}