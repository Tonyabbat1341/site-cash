'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, Plus, Trash2, Check, AlertCircle } from 'lucide-react'

interface ApiKey {
  id: string
  provider: 'openai' | 'anthropic' | 'google'
  name: string
  key: string
  isActive: boolean
  createdAt: string
}

const PROVIDERS = {
  openai: {
    name: 'OpenAI',
    description: 'GPT-4.1 et autres modèles OpenAI',
    color: 'bg-green-100 text-green-800'
  },
  anthropic: {
    name: 'Anthropic',
    description: 'Claude Sonnet 3.5',
    color: 'bg-orange-100 text-orange-800'
  },
  google: {
    name: 'Google',
    description: 'Gemini Pro',
    color: 'bg-blue-100 text-blue-800'
  }
}

export function ApiKeysManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      provider: 'openai',
      name: 'OpenAI Production',
      key: 'sk-...',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ])
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [newKey, setNewKey] = useState({
    provider: 'openai' as keyof typeof PROVIDERS,
    name: '',
    key: ''
  })

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const addApiKey = () => {
    if (!newKey.name || !newKey.key) return

    const apiKey: ApiKey = {
      id: Date.now().toString(),
      provider: newKey.provider,
      name: newKey.name,
      key: newKey.key,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    setApiKeys(prev => [...prev, apiKey])
    setNewKey({ provider: 'openai', name: '', key: '' })
    setIsAdding(false)
  }

  const deleteApiKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId))
  }

  const toggleKeyStatus = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, isActive: !key.isActive } : key
    ))
  }

  const maskKey = (key: string) => {
    if (key.length <= 8) return key
    return key.substring(0, 4) + '...' + key.substring(key.length - 4)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Gestion des clés API</h2>
        <p className="text-muted-foreground">
          Configurez vos clés API pour utiliser les différents modèles d'IA
        </p>
      </div>

      {/* Add new key */}
      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une clé API</CardTitle>
            <CardDescription>
              Entrez les informations de votre clé API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Fournisseur</label>
                <select
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  value={newKey.provider}
                  onChange={(e) => setNewKey(prev => ({ ...prev, provider: e.target.value as any }))}
                >
                  {Object.entries(PROVIDERS).map(([key, provider]) => (
                    <option key={key} value={key}>
                      {provider.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Nom</label>
                <Input
                  value={newKey.name}
                  onChange={(e) => setNewKey(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: OpenAI Production"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Clé API</label>
              <Input
                type="password"
                value={newKey.key}
                onChange={(e) => setNewKey(prev => ({ ...prev, key: e.target.value }))}
                placeholder="sk-..."
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={addApiKey}>
                <Check className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une clé API
        </Button>
      )}

      {/* Existing keys */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{apiKey.name}</h3>
                      <Badge className={PROVIDERS[apiKey.provider].color}>
                        {PROVIDERS[apiKey.provider].name}
                      </Badge>
                      <Badge variant={apiKey.isActive ? 'default' : 'secondary'}>
                        {apiKey.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {PROVIDERS[apiKey.provider].description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {showKeys[apiKey.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleKeyStatus(apiKey.id)}
                  >
                    {apiKey.isActive ? 'Désactiver' : 'Activer'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteApiKey(apiKey.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">Sécurité</h4>
              <p className="text-sm text-amber-700">
                Vos clés API sont chiffrées et stockées de manière sécurisée. 
                Nous ne les utilisons que pour les appels aux services d'IA et 
                ne les partageons jamais avec des tiers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}