'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/auth/AuthProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Check, X, CreditCard, AlertCircle } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Subscription {
  id: string
  status: string
  current_period_end: number
  cancel_at_period_end: boolean
}

export function SubscriptionManager() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpgrading, setIsUpgrading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchSubscription()
    }
  }, [user])

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`/api/stripe/subscription?userId=${user?.id}`)
      const data = await response.json()
      setSubscription(data.subscription)
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (priceId: string) => {
    if (!user) return

    setIsUpgrading(true)
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          email: user.email
        })
      })

      const { sessionId } = await response.json()
      
      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) throw error
    } catch (error) {
      console.error('Upgrade failed:', error)
    } finally {
      setIsUpgrading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'canceled': return 'bg-red-100 text-red-800'
      case 'past_due': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif'
      case 'canceled': return 'Annulé'
      case 'past_due': return 'En retard'
      default: return status
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Chargement...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Gestion de l'abonnement</h2>
        <p className="text-muted-foreground">
          Gérez votre abonnement et vos factures
        </p>
      </div>

      {subscription ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Abonnement actuel
              <Badge className={getStatusColor(subscription.status)}>
                {getStatusText(subscription.status)}
              </Badge>
            </CardTitle>
            <CardDescription>
              {subscription.cancel_at_period_end 
                ? 'Votre abonnement sera annulé à la fin de la période de facturation'
                : 'Votre abonnement est actif'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Prochaine facturation :</span>
                <p className="text-muted-foreground">
                  {new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <span className="font-medium">Statut :</span>
                <p className="text-muted-foreground">
                  {getStatusText(subscription.status)}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Gérer la facturation
              </Button>
              {subscription.status === 'active' && (
                <Button variant="outline" size="sm">
                  Annuler l'abonnement
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Plan gratuit</CardTitle>
            <CardDescription>
              Vous utilisez actuellement le plan gratuit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Limites actuelles :</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    5 agents par mois
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    3 projets
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    1 workflow
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Upgrader vers :</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-primary">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Pro</CardTitle>
                      <CardDescription>$29/mois</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• 100 agents par mois</li>
                        <li>• Projets illimités</li>
                        <li>• 25 workflows</li>
                      </ul>
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => handleUpgrade('price_pro_monthly')}
                        disabled={isUpgrading}
                      >
                        {isUpgrading ? 'Chargement...' : 'Upgrader vers Pro'}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Entreprise</CardTitle>
                      <CardDescription>$99/mois</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• Agents illimités</li>
                        <li>• Projets illimités</li>
                        <li>• Workflows illimités</li>
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        size="sm"
                        onClick={() => handleUpgrade('price_enterprise_monthly')}
                        disabled={isUpgrading}
                      >
                        {isUpgrading ? 'Chargement...' : 'Upgrader vers Entreprise'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">Information importante</h4>
              <p className="text-sm text-amber-700">
                Les paiements sont traités de manière sécurisée par Stripe. 
                Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}