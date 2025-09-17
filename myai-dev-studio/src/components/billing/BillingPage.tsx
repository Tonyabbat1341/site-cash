'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SubscriptionCard, PLANS } from './SubscriptionCard'
import { SubscriptionManager } from './SubscriptionManager'
import { CreditCard, Shield, Zap } from 'lucide-react'

export function BillingPage() {
  const [activeTab, setActiveTab] = useState<'plans' | 'subscription'>('plans')
  const [currentPlan, setCurrentPlan] = useState('pro')
  const [isLoading, setIsLoading] = useState(false)

  const handlePlanSelect = async (plan: any) => {
    setIsLoading(true)
    // Ici on intégrerait Stripe pour le paiement
    console.log('Selecting plan:', plan)
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setCurrentPlan(plan.id)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Facturation</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gérez votre abonnement et choisissez le plan qui vous convient
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-1">
          <Button
            variant={activeTab === 'plans' ? 'default' : 'outline'}
            onClick={() => setActiveTab('plans')}
          >
            Plans d'abonnement
          </Button>
          <Button
            variant={activeTab === 'subscription' ? 'default' : 'outline'}
            onClick={() => setActiveTab('subscription')}
          >
            Mon abonnement
          </Button>
        </div>

        {activeTab === 'subscription' ? (
          <SubscriptionManager />
        ) : (
          <>
            {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Agents IA Puissants</CardTitle>
              <CardDescription>
                Accédez à nos 5 agents spécialisés pour automatiser votre développement
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Sécurité Avancée</CardTitle>
              <CardDescription>
                Vos clés API et données sont protégées avec un chiffrement de niveau entreprise
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Paiement Sécurisé</CardTitle>
              <CardDescription>
                Paiements sécurisés via Stripe avec facturation transparente
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <SubscriptionCard
              key={plan.id}
              plan={plan}
              currentPlan={currentPlan}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Puis-je changer de plan à tout moment ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. 
                  Les changements prennent effet immédiatement.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Que se passe-t-il si je dépasse mes limites ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous vous notifierons avant d'atteindre vos limites. Vous pourrez 
                  upgrader votre plan ou attendre le renouvellement mensuel.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mes données sont-elles sécurisées ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolument. Nous utilisons un chiffrement de bout en bout et 
                  ne stockons jamais vos clés API en clair.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Puis-je annuler à tout moment ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, vous pouvez annuler votre abonnement à tout moment. 
                  Vous gardez l'accès jusqu'à la fin de votre période de facturation.
                </p>
              </CardContent>
            </Card>
          </div>
        </>
        )}
      </div>
    </div>
  )
}