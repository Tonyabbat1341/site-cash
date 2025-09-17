'use client'

import { Agent } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AgentCardProps {
  agent: Agent
  onSelect: (agent: Agent) => void
  usage: number
  subscriptionTier: 'free' | 'pro' | 'enterprise'
}

export function AgentCard({ agent, onSelect, usage, subscriptionTier }: AgentCardProps) {
  const maxUsage = agent.maxUsage[subscriptionTier]
  const isUnlimited = maxUsage === -1
  const usagePercentage = isUnlimited ? 0 : (usage / maxUsage) * 100
  const isOverLimit = !isUnlimited && usage >= maxUsage

  return (
    <Card className={`transition-all hover:shadow-lg ${isOverLimit ? 'opacity-50' : 'hover:scale-105'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-4xl">{agent.icon}</div>
          <Badge variant={isOverLimit ? 'destructive' : 'secondary'}>
            {isUnlimited ? 'Illimité' : `${usage}/${maxUsage}`}
          </Badge>
        </div>
        <CardTitle className="text-xl">{agent.name}</CardTitle>
        <CardDescription>{agent.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Capacités :</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {agent.capabilities.slice(0, 3).map((capability, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                  {capability}
                </li>
              ))}
              {agent.capabilities.length > 3 && (
                <li className="text-xs text-muted-foreground">
                  +{agent.capabilities.length - 3} autres...
                </li>
              )}
            </ul>
          </div>
          
          {!isUnlimited && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Utilisation</span>
                <span>{usage}/{maxUsage}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    isOverLimit ? 'bg-destructive' : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
              </div>
            </div>
          )}

          <Button 
            onClick={() => onSelect(agent)} 
            className="w-full"
            disabled={isOverLimit}
          >
            {isOverLimit ? 'Limite atteinte' : 'Utiliser cet agent'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}