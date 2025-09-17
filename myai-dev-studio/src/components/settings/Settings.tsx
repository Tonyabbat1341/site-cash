'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Key, 
  User, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff, 
  Save,
  Trash2
} from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  service: 'claude' | 'openai' | 'gemini' | 'supabase' | 'stripe'
  key: string
  isActive: boolean
  lastUsed?: Date
}

export function Settings() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Claude API',
      service: 'claude',
      key: 'sk-ant-api03-...',
      isActive: true,
      lastUsed: new Date()
    },
    {
      id: '2',
      name: 'OpenAI GPT-4',
      service: 'openai',
      key: 'sk-...',
      isActive: false
    }
  ])

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [newApiKey, setNewApiKey] = useState({
    name: '',
    service: 'claude' as const,
    key: ''
  })

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const addApiKey = () => {
    if (!newApiKey.name || !newApiKey.key) return

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newApiKey.name,
      service: newApiKey.service,
      key: newApiKey.key,
      isActive: true
    }

    setApiKeys(prev => [...prev, newKey])
    setNewApiKey({ name: '', service: 'claude', key: '' })
  }

  const deleteApiKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId))
  }

  const getServiceIcon = (service: string) => {
    const icons = {
      claude: '🤖',
      openai: '🧠',
      gemini: '💎',
      supabase: '🗄️',
      stripe: '💳'
    }
    return icons[service as keyof typeof icons] || '🔑'
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">
          Configurez vos API keys et préférences
        </p>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-6">
          {/* Ajouter une nouvelle API Key */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2 h-5 w-5" />
                Ajouter une API Key
              </CardTitle>
              <CardDescription>
                Ajoutez vos clés API pour utiliser les différents services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <input
                    type="text"
                    value={newApiKey.name}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Claude Production"
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Service</label>
                  <select
                    value={newApiKey.service}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, service: e.target.value as any }))}
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    <option value="claude">Claude (Anthropic)</option>
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Google Gemini</option>
                    <option value="supabase">Supabase</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Clé API</label>
                  <input
                    type="password"
                    value={newApiKey.key}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, key: e.target.value }))}
                    placeholder="sk-..."
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
              </div>
              <Button onClick={addApiKey} className="w-full">
                <Key className="mr-2 h-4 w-4" />
                Ajouter la clé API
              </Button>
            </CardContent>
          </Card>

          {/* Liste des API Keys existantes */}
          <Card>
            <CardHeader>
              <CardTitle>Clés API configurées</CardTitle>
              <CardDescription>
                Gérez vos clés API existantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getServiceIcon(apiKey.service)}</div>
                      <div>
                        <h4 className="font-medium">{apiKey.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {apiKey.service}
                        </p>
                        {apiKey.lastUsed && (
                          <p className="text-xs text-muted-foreground">
                            Dernière utilisation: {apiKey.lastUsed.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 font-mono text-sm">
                        <span>
                          {showKeys[apiKey.id] 
                            ? apiKey.key 
                            : '•'.repeat(Math.min(apiKey.key.length, 20))
                          }
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {showKeys[apiKey.id] ? 
                            <EyeOff className="h-4 w-4" /> : 
                            <Eye className="h-4 w-4" />
                          }
                        </Button>
                      </div>
                      
                      <div className={`w-2 h-2 rounded-full ${
                        apiKey.isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {apiKeys.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune clé API configurée</p>
                    <p className="text-sm">Ajoutez vos premières clés API ci-dessus</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informations du profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Préférences de notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configuration des notifications à venir
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Paramètres de sécurité à venir
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}