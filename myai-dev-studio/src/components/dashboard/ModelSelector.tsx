'use client'

import { AIModel } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AI_MODELS } from '@/lib/ai-models'

interface ModelSelectorProps {
  selectedModel: AIModel
  onModelChange: (model: AIModel) => void
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Modèle d'IA</label>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionner un modèle" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(AI_MODELS).map(([key, model]) => (
            <SelectItem key={key} value={key}>
              <div className="flex flex-col">
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground">
                  {model.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}