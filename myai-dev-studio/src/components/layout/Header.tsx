'use client'

import React from 'react'
import { Bell, User, Search, Sparkles, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/hooks/useAuth'

interface HeaderProps {
  selectedModel: string
  setSelectedModel: (model: string) => void
}

export function Header({ selectedModel, setSelectedModel }: HeaderProps) {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6 justify-between">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Rechercher des projets, workflows..."
            />
          </div>
        </div>

        {/* Model Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sélectionner un modèle IA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">
                  <div className="flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Auto Mode
                  </div>
                </SelectItem>
                <SelectItem value="claude">Claude Sonnet 3.5</SelectItem>
                <SelectItem value="gpt4">OpenAI GPT-4.1</SelectItem>
                <SelectItem value="gemini">Google Gemini</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}