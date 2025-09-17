import { render, screen, fireEvent } from '@testing-library/react'
import { AgentCard } from '@/components/dashboard/AgentCard'
import { Agent } from '@/types'

const mockAgent: Agent = {
  id: 'frontend-pro',
  name: 'Frontend Pro',
  description: 'Expert en développement frontend',
  icon: '🎨',
  capabilities: ['React', 'Tailwind CSS', 'Responsive Design'],
  maxUsage: {
    free: 5,
    pro: 100,
    enterprise: -1
  }
}

describe('AgentCard', () => {
  it('renders agent information correctly', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <AgentCard
        agent={mockAgent}
        onSelect={mockOnSelect}
        usage={2}
        subscriptionTier="free"
      />
    )

    expect(screen.getByText('Frontend Pro')).toBeInTheDocument()
    expect(screen.getByText('Expert en développement frontend')).toBeInTheDocument()
    expect(screen.getByText('2/5')).toBeInTheDocument()
  })

  it('calls onSelect when button is clicked', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <AgentCard
        agent={mockAgent}
        onSelect={mockOnSelect}
        usage={2}
        subscriptionTier="free"
      />
    )

    const button = screen.getByText('Utiliser cet agent')
    fireEvent.click(button)
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockAgent)
  })

  it('disables button when usage limit is reached', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <AgentCard
        agent={mockAgent}
        onSelect={mockOnSelect}
        usage={5}
        subscriptionTier="free"
      />
    )

    const button = screen.getByText('Limite atteinte')
    expect(button).toBeDisabled()
  })

  it('shows unlimited badge for enterprise tier', () => {
    const mockOnSelect = jest.fn()
    
    render(
      <AgentCard
        agent={mockAgent}
        onSelect={mockOnSelect}
        usage={100}
        subscriptionTier="enterprise"
      />
    )

    expect(screen.getByText('Illimité')).toBeInTheDocument()
  })
})