import { getModelForTask, AI_MODELS } from '@/lib/ai-models'

describe('AI Models', () => {
  describe('getModelForTask', () => {
    it('returns gpt-4.1 for debug tasks', () => {
      const model = getModelForTask('debug this error', 'debugger')
      expect(model).toBe('gpt-4.1')
    })

    it('returns claude-sonnet-3.5 for architecture tasks', () => {
      const model = getModelForTask('design architecture', 'architecte')
      expect(model).toBe('claude-sonnet-3.5')
    })

    it('returns gemini-pro for frontend tasks', () => {
      const model = getModelForTask('create frontend component', 'frontend-pro')
      expect(model).toBe('gemini-pro')
    })

    it('returns gpt-4.1 for backend tasks', () => {
      const model = getModelForTask('create API endpoint', 'backend-pro')
      expect(model).toBe('gpt-4.1')
    })

    it('returns claude-sonnet-3.5 as default', () => {
      const model = getModelForTask('unknown task', 'unknown-agent')
      expect(model).toBe('claude-sonnet-3.5')
    })
  })

  describe('AI_MODELS', () => {
    it('contains all expected models', () => {
      expect(AI_MODELS).toHaveProperty('claude-sonnet-3.5')
      expect(AI_MODELS).toHaveProperty('gemini-pro')
      expect(AI_MODELS).toHaveProperty('gpt-4.1')
      expect(AI_MODELS).toHaveProperty('auto')
    })

    it('has correct model properties', () => {
      const claude = AI_MODELS['claude-sonnet-3.5']
      expect(claude.name).toBe('Claude Sonnet 3.5')
      expect(claude.provider).toBe('anthropic')
      expect(claude.capabilities).toContain('code-generation')
    })
  })
})