export type ModelProvider = 'openai' | 'anthropic' | 'gemini';
export type ModelName =
  | 'gpt-4.1-mini'
  | 'gpt-4.1'
  | 'claude-3-5-sonnet-20240620'
  | 'gemini-1.5-pro'
  | 'gemini-1.5-flash';

export type AutoMode = 'auto';

export const MODEL_OPTIONS: Array<{ label: string; value: ModelName | AutoMode; provider?: ModelProvider }> = [
  { label: 'Auto Mode', value: 'auto' },
  { label: 'OpenAI GPT-4.1', value: 'gpt-4.1' },
  { label: 'OpenAI GPT-4.1 mini', value: 'gpt-4.1-mini' },
  { label: 'Claude Sonnet 3.5', value: 'claude-3-5-sonnet-20240620', provider: 'anthropic' },
  { label: 'Gemini 1.5 Pro', value: 'gemini-1.5-pro', provider: 'gemini' },
  { label: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash', provider: 'gemini' }
];

export function chooseModelByTask(task: string): ModelName {
  const t = task.toLowerCase();
  if (t.includes('frontend') || t.includes('react') || t.includes('ui')) return 'gpt-4.1-mini';
  if (t.includes('architecture') || t.includes('design')) return 'claude-3-5-sonnet-20240620';
  if (t.includes('analysis') || t.includes('long') || t.includes('document')) return 'gemini-1.5-pro';
  return 'gpt-4.1-mini';
}

