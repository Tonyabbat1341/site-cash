'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ApiKeysManager } from './ApiKeysManager'
import { BillingPage } from '../billing/BillingPage'
import { DeploymentManager } from '../deployment/DeploymentManager'
import { User, Settings as SettingsIcon, CreditCard, Key, Bell, Shield, Globe } from 'lucide-react'

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'api-keys' | 'billing' | 'notifications' | 'security' | 'deployment'>('profile')
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    subscriptionTier: 'pro' as 'free' | 'pro' | 'enterprise',
    createdAt: '2024-01-15'
  })

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'api-keys', label: 'Clés API', icon: Key },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'deployment', label: 'Déploiement', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ]

  const handleSaveProfile = () => {
    // Ici on sauvegarderait les modifications du profil
    console.log('Saving profile...')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id as any)}
                className="w-full justify-start"
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Profil utilisateur</h2>
                <p className="text-muted-foreground">
                  Gérez vos informations personnelles
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations de profil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nom</label>
                      <Input
                        value={user.name}
                        onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plan d'abonnement</label>
                    <div className="mt-1 px-3 py-2 bg-muted rounded-md">
                      <span className="capitalize font-medium">{user.subscriptionTier}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Membre depuis</label>
                    <div className="mt-1 px-3 py-2 bg-muted rounded-md">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile}>
                    Sauvegarder les modifications
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'api-keys' && <ApiKeysManager />}

          {activeTab === 'billing' && <BillingPage />}

          {activeTab === 'deployment' && <DeploymentManager />}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Notifications</h2>
                <p className="text-muted-foreground">
                  Configurez vos préférences de notification
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription>
                    Choisissez comment vous souhaitez être notifié
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notifications par email</h4>
                        <p className="text-sm text-muted-foreground">
                          Recevez des mises à jour par email
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notifications de facturation</h4>
                        <p className="text-sm text-muted-foreground">
                          Alertes pour les paiements et factures
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notifications de sécurité</h4>
                        <p className="text-sm text-muted-foreground">
                          Alertes importantes pour la sécurité
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notifications de projet</h4>
                        <p className="text-sm text-muted-foreground">
                          Mises à jour sur vos projets
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                  <Button>Sauvegarder les préférences</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Sécurité</h2>
                <p className="text-muted-foreground">
                  Gérez la sécurité de votre compte
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Changer le mot de passe</CardTitle>
                  <CardDescription>
                    Mettez à jour votre mot de passe pour plus de sécurité
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Mot de passe actuel</label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nouveau mot de passe</label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Confirmer le nouveau mot de passe</label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <Button>Changer le mot de passe</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Authentification à deux facteurs</CardTitle>
                  <CardDescription>
                    Ajoutez une couche de sécurité supplémentaire
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">2FA activé</h4>
                      <p className="text-sm text-muted-foreground">
                        Votre compte est protégé par l'authentification à deux facteurs
                      </p>
                    </div>
                    <Button variant="outline">Configurer</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessions actives</CardTitle>
                  <CardDescription>
                    Gérez vos sessions de connexion actives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Session actuelle</h4>
                        <p className="text-sm text-muted-foreground">
                          Chrome sur Windows • Paris, France
                        </p>
                      </div>
                      <Badge variant="default">Actuelle</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Session mobile</h4>
                        <p className="text-sm text-muted-foreground">
                          Safari sur iOS • Paris, France
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Révoquer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}