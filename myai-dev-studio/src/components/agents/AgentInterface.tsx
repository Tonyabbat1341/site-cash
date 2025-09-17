'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Send, 
  Copy, 
  Download, 
  Play, 
  Settings,
  MessageSquare,
  Code,
  FileText
} from 'lucide-react'

interface AgentInterfaceProps {
  agentId: string
  agentName: string
  agentIcon: React.ComponentType<any>
  agentColor: string
  agentDescription: string
  capabilities: string[]
  examples: { title: string; description: string; prompt: string }[]
}

export function AgentInterface({ 
  agentId, 
  agentName, 
  agentIcon: AgentIcon, 
  agentColor,
  agentDescription,
  capabilities,
  examples 
}: AgentInterfaceProps) {
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState<Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date()
    }

    setConversation(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    // Simuler une réponse de l'agent
    setTimeout(() => {
      const assistantMessage = {
        role: 'assistant' as const,
        content: `Je suis ${agentName}, votre assistant spécialisé. Voici ma réponse à votre demande: "${message}"\n\nJe vais analyser votre demande et vous fournir une solution adaptée. Pouvez-vous me donner plus de détails sur votre projet ?`,
        timestamp: new Date()
      }
      setConversation(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleExampleClick = (prompt: string) => {
    setMessage(prompt)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-background border`}>
          <AgentIcon className={`h-8 w-8 ${agentColor}`} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{agentName}</h1>
          <p className="text-muted-foreground">{agentDescription}</p>
        </div>
        <Button variant="outline" size="icon" className="ml-auto">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat avec {agentName}
            </CardTitle>
            <CardDescription>
              Décrivez votre projet et laissez l'agent vous aider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="code">Code généré</TabsTrigger>
                <TabsTrigger value="files">Fichiers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="space-y-4">
                {/* Conversation */}
                <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
                  {conversation.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <AgentIcon className={`h-12 w-12 mx-auto mb-4 ${agentColor}`} />
                      <p>Commencez une conversation avec {agentName}</p>
                      <p className="text-sm">Utilisez les exemples ci-dessous pour commencer</p>
                    </div>
                  ) : (
                    conversation.map((msg, index) => (
                      <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Décrivez votre projet à ${agentName}...`}
                    className="flex-1 min-h-[60px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!message.trim() || isLoading}
                    size="icon"
                    className="self-end"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-4">
                <div className="h-96 border rounded-lg p-4">
                  <div className="text-center text-muted-foreground py-12">
                    <Code className="h-12 w-12 mx-auto mb-4" />
                    <p>Le code généré apparaîtra ici</p>
                    <p className="text-sm">Commencez une conversation pour générer du code</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Copier
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                  <Button variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Exécuter
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="files" className="space-y-4">
                <div className="h-96 border rounded-lg p-4">
                  <div className="text-center text-muted-foreground py-12">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p>Les fichiers du projet apparaîtront ici</p>
                    <p className="text-sm">Structure du projet générée par l'agent</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle>Capacités</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{capability}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Exemples</CardTitle>
              <CardDescription>
                Cliquez pour utiliser un exemple
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {examples.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left h-auto p-3"
                  onClick={() => handleExampleClick(example.prompt)}
                >
                  <div>
                    <div className="font-medium text-sm">{example.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {example.description}
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}