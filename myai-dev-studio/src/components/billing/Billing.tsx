'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CreditCard, 
  Check, 
  Zap, 
  Crown, 
  Building2,
  Calendar,
  Download
} from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    period: 'mois',
    description: 'Parfait pour commencer',
    features: [
      '2 agents IA disponibles',
      '5 workflows par mois',
      '100 requêtes API/mois',
      'Support communautaire',
      'Projets publics uniquement'
    ],
    limitations: [
      'Pas d\'accès aux agents premium',
      'Workflows limités',
      'Pas de support prioritaire'
    ],
    current: true,
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    period: 'mois',
    description: 'Pour les développeurs sérieux',
    features: [
      'Tous les 5 agents IA',
      'Workflows illimités',
      '10,000 requêtes API/mois',
      'Support prioritaire',
      'Projets privés',
      'Intégrations avancées',
      'Déploiement automatique',
      'Analytics détaillées'
    ],
    limitations: [],
    current: false,
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Entreprise',
    price: 99,
    period: 'mois',
    description: 'Pour les équipes et entreprises',
    features: [
      'Tout du plan Pro',
      'Agents personnalisés',
      'API illimitée',
      'Support dédié 24/7',
      'SSO et sécurité avancée',
      'Workflows collaboratifs',
      'White-label disponible',
      'SLA garanti',
      'Formation équipe incluse'
    ],
    limitations: [],
    current: false,
    popular: false
  }
]

const usageStats = {
  agents: { used: 2, limit: 2, percentage: 100 },
  workflows: { used: 3, limit: 5, percentage: 60 },
  apiCalls: { used: 45, limit: 100, percentage: 45 },
  projects: { used: 4, limit: 10, percentage: 40 }
}

const invoices = [
  {
    id: 'inv_001',
    date: '2024-01-15',
    amount: 0,
    status: 'paid',
    plan: 'Gratuit'
  },
  {
    id: 'inv_002',
    date: '2023-12-15',
    amount: 0,
    status: 'paid',
    plan: 'Gratuit'
  }
]

export function Billing() {
  const [selectedPlan, setSelectedPlan] = useState('free')
  const currentPlan = plans.find(plan => plan.current)

  const handleUpgrade = (planId: string) => {
    // Ici on redirigerait vers Stripe Checkout
    console.log('Upgrade vers:', planId)
    alert(`Redirection vers Stripe pour le plan ${planId}`)
  }

  const handleDownload = (invoiceId: string) => {
    console.log('Télécharger facture:', invoiceId)
    alert('Téléchargement de la facture (simulation)')
  }

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return <Zap className="h-6 w-6" />
      case 'pro':
        return <Crown className="h-6 w-6" />
      case 'enterprise':
        return <Building2 className="h-6 w-6" />
      default:
        return <CreditCard className="h-6 w-6" />
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Abonnement</h1>
        <p className="text-muted-foreground">
          Gérez votre abonnement et votre facturation
        </p>
      </div>

      {/* Plan actuel et usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Plan actuel</CardTitle>
            <CardDescription>
              Vous êtes actuellement sur le plan {currentPlan?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {getPlanIcon(currentPlan?.id || 'free')}
                <div>
                  <h3 className="text-xl font-semibold">{currentPlan?.name}</h3>
                  <p className="text-muted-foreground">
                    {currentPlan?.price === 0 
                      ? 'Gratuit' 
                      : `${currentPlan?.price}€/${currentPlan?.period}`
                    }
                  </p>
                </div>
              </div>
              {currentPlan?.id !== 'enterprise' && (
                <Button onClick={() => handleUpgrade('pro')}>
                  Upgrader
                </Button>
              )}
            </div>

            {/* Statistiques d'usage */}
            <div className="space-y-4">
              <h4 className="font-medium">Utilisation ce mois-ci</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Agents utilisés</span>
                    <span>{usageStats.agents.used}/{usageStats.agents.limit}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${usageStats.agents.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Workflows</span>
                    <span>{usageStats.workflows.used}/{usageStats.workflows.limit}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${usageStats.workflows.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Appels API</span>
                    <span>{usageStats.apiCalls.used}/{usageStats.apiCalls.limit}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${usageStats.apiCalls.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Projets</span>
                    <span>{usageStats.projects.used}/∞</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${usageStats.projects.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facturation */}
        <Card>
          <CardHeader>
            <CardTitle>Facturation</CardTitle>
            <CardDescription>
              Historique et méthode de paiement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-4">
                <CreditCard className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Aucune méthode de paiement configurée
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Ajouter une carte
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-3">Factures récentes</h4>
                <div className="space-y-2">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">{invoice.plan}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(invoice.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {invoice.amount === 0 ? 'Gratuit' : `${invoice.amount}€`}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans disponibles */}
      <Card>
        <CardHeader>
          <CardTitle>Plans disponibles</CardTitle>
          <CardDescription>
            Choisissez le plan qui correspond le mieux à vos besoins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border rounded-lg p-6 ${
                  plan.popular 
                    ? 'border-primary ring-2 ring-primary ring-opacity-20' 
                    : 'border-border'
                } ${plan.current ? 'bg-muted/50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Populaire
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    {getPlanIcon(plan.id)}
                  </div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold">
                    {plan.price === 0 ? 'Gratuit' : `${plan.price}€`}
                    {plan.price > 0 && (
                      <span className="text-sm font-normal text-muted-foreground">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={plan.current ? 'outline' : 'default'}
                  disabled={plan.current}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {plan.current ? 'Plan actuel' : `Passer au ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}