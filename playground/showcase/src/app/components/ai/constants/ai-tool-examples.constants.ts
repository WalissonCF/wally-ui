import { AITools } from '../core/models/ai-tools.interface';

/**
 * Example tool configurations
 * Use these as templates when implementing tools in ai-composer
 *
 * @example
 * ```typescript
 * // In ai-composer.ts
 * import { DEFAULT_AI_TOOLS } from './constants/ai-tool-examples.constants';
 *
 * enabledTools = signal<AITools[]>(
 *   DEFAULT_AI_TOOLS.map(tool => ({
 *     ...tool,
 *     onClick: () => this.onToolClick(tool.id)
 *   }))
 * );
 * ```
 */

/**
 * Default set of AI tools
 */
export const DEFAULT_AI_TOOLS: Omit<AITools, 'onClick'>[] = [
  {
    id: 'figma',
    name: 'Figma',
    icon: 'figma',
    enabled: false
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'notion',
    enabled: false
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    enabled: false
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'slack',
    enabled: false
  },
  {
    id: 'drive',
    name: 'Google Drive',
    icon: 'drive',
    enabled: false
  },
  {
    id: 'jira',
    name: 'Jira',
    icon: 'jira',
    enabled: false
  },
  {
    id: 'linear',
    name: 'Linear',
    icon: 'linear',
    enabled: false
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: 'calendar',
    enabled: false
  },
  {
    id: 'recommendation',
    name: 'Recomendação',
    icon: 'recommendation',
    enabled: false
  },
  {
    id: 'shopping',
    name: 'Comprar',
    icon: 'shopping',
    enabled: false
  },
  {
    id: 'business-analytics',
    name: 'Análise Ponto Comercial',
    icon: 'business-analytics',
    enabled: false
  },
  {
    id: 'quote',
    name: 'Cotar',
    icon: 'quote',
    enabled: false
  }
];

/**
 * Productivity tools subset
 */
export const PRODUCTIVITY_TOOLS: Omit<AITools, 'onClick'>[] = [
  {
    id: 'notion',
    name: 'Notion',
    icon: 'notion',
    enabled: true
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: 'calendar',
    enabled: true
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: 'gmail',
    enabled: true
  }
];

/**
 * Development tools subset
 */
export const DEVELOPMENT_TOOLS: Omit<AITools, 'onClick'>[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    enabled: true
  },
  {
    id: 'jira',
    name: 'Jira',
    icon: 'jira',
    enabled: true
  },
  {
    id: 'linear',
    name: 'Linear',
    icon: 'linear',
    enabled: true
  }
];

/**
 * Design tools subset
 */
export const DESIGN_TOOLS: Omit<AITools, 'onClick'>[] = [
  {
    id: 'figma',
    name: 'Figma',
    icon: 'figma',
    enabled: true
  },
  {
    id: 'miro',
    name: 'Miro',
    icon: 'miro',
    enabled: true
  }
];

/**
 * Business tools subset
 */
export const BUSINESS_TOOLS: Omit<AITools, 'onClick'>[] = [
  {
    id: 'recommendation',
    name: 'Recomendação',
    icon: 'recommendation',
    enabled: true
  },
  {
    id: 'shopping',
    name: 'Comprar',
    icon: 'shopping',
    enabled: true
  },
  {
    id: 'business-analytics',
    name: 'Análise Ponto Comercial',
    icon: 'business-analytics',
    enabled: true
  },
  {
    id: 'quote',
    name: 'Cotar',
    icon: 'quote',
    enabled: true
  }
];
