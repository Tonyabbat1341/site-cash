'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  limits: {
    agents: number
    projects: number
    workflows: number
  }
  popular?: boolean
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan
  currentPlan?: string
  onSelect: (plan: SubscriptionPlan) => void
}

const PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    description: 'Parfait pour commencer',
    price: 0,
    interval: 'month',
    features: [
      '5 agents par mois',
      '3 projets',
      '1 workflow',
      'Support communautaire'
    ],
    limits: {
      agents: 5,
      projects: 3,
      workflows: 1
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pour les développeurs professionnels',
    price: 29,
    interval: 'month',
    features: [
      '100 agents par mois',
      'Projets illimités',
      '25 workflows',
      'Support prioritaire',
      'Intégrations avancées',
      'Déploiement automatique'
    ],
    limits: {
      agents: 100,
      projects: -1,
      workflows: 25
    },
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Entreprise',
    description: 'Pour les équipes et organisations',
    price: 99,
    interval: 'month',
    features: [
      'Agents illimités',
      'Projets illimités',
      'Workflows illimités',
      'Support 24/7',
      'Intégrations personnalisées',
      'Déploiement privé',
      'API dédiée',
      'Formation personnalisée'
    ],
    limits: {
      agents: -1,
      projects: -1,
      workflows: -1
    }
  }
]

export function SubscriptionCard({ plan, currentPlan, onSelect }: SubscriptionCardProps) {
  const isCurrentPlan = currentPlan === plan.id
  const isPopular = plan.popular

  return (
    <Card className={`relative transition-all hover:shadow-lg ${isPopular ? 'ring-2 ring-primary' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            Populaire
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground">/{plan.interval === 'month' ? 'mois' : 'an'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Agents:</span>
              <span>{plan.limits.agents === -1 ? 'Illimité' : plan.limits.agents}</span>
            </div>
            <div className="flex justify-between">
              <span>Projets:</span>
              <span>{plan.limits.projects === -1 ? 'Illimité' : plan.limits.projects}</span>
            </div>
            <div className="flex justify-between">
              <span>Workflows:</span>
              <span>{plan.limits.workflows === -1 ? 'Illimité' : plan.limits.workflows}</span>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          variant={isCurrentPlan ? 'outline' : 'default'}
          onClick={() => onSelect(plan)}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Plan actuel' : `Choisir ${plan.name}`}
        </Button>
      </CardContent>
    </Card>
  )
}

export { PLANS }