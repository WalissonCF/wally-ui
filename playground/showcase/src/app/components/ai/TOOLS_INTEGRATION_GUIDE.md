# AI Tools Integration Guide

Este guia mostra como integrar o sistema de tools no `ai-composer`.

## Estrutura Criada

```
ai/
├── types/
│   └── ai-tools.interface.ts          # Interface AITools
├── constants/
│   ├── index.ts                        # Barrel exports
│   ├── ai-tool-icons.constants.ts      # 13 ícones SVG
│   └── ai-tool-examples.constants.ts   # Configurações exemplo
└── utils/
    └── ai-tool.utils.ts                # Funções helper
```

## Como Usar no ai-composer

### 1. Importar no ai-composer.ts

```typescript
import { signal, WritableSignal } from '@angular/core';
import { AITools } from '../types/ai-tools.interface';
import { DEFAULT_AI_TOOLS } from '../constants';
import { getToolIcon } from '../utils/ai-tool.utils';
```

### 2. Adicionar Signals de Estado

```typescript
export class AiComposer {
  // ... código existente ...

  enabledTools: WritableSignal<AITools[]> = signal<AITools[]>(
    DEFAULT_AI_TOOLS.map(tool => ({
      ...tool,
      onClick: () => this.onToolClick(tool.id)
    }))
  );
}
```

### 3. Adicionar Métodos de Controle

```typescript
/**
 * Handler quando uma tool é clicada
 */
onToolClick(toolId: string): void {
  console.log(`Tool clicked: ${toolId}`);
  this.toggleTool(toolId);
}

/**
 * Ativa/desativa uma tool
 */
toggleTool(toolId: string): void {
  this.enabledTools.update(tools =>
    tools.map(tool =>
      tool.id === toolId
        ? { ...tool, enabled: !tool.enabled }
        : tool
    )
  );
}

/**
 * Retorna o ícone SVG da tool
 */
getToolIcon(iconName: string): string {
  return getToolIcon(iconName);
}
```

### 4. Atualizar Template (ai-composer.html)

Substitua o botão hardcoded do Figma por:

```html
<!-- Tools Dinâmicas -->
@for (tool of enabledTools(); track tool.id) {
  @if (tool.enabled) {
    <div>
      <wally-button variant="ghost" [rounded]="true" (buttonClick)="tool.onClick()">
        <div class="group flex items-center gap-2">
          <!-- Ícone de Remover (hover) -->
          <div class="max-w-0 group-hover:max-w-6 overflow-hidden transition-all duration-300 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor"
              class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-6 rounded-full p-0.5 bg-neutral-300/40 dark:bg-white/10"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>

          <!-- Ícone da Tool -->
          <div [innerHTML]="getToolIcon(tool.icon)"></div>

          <!-- Nome da Tool -->
          <span class="text-base">{{ tool.name }}</span>
        </div>
      </wally-button>
    </div>
  }
}
```

## Ícones Disponíveis

Os seguintes ícones estão disponíveis em `AI_TOOL_ICONS`:

### Design & Collaboration
- `figma` - Figma (design)
- `miro` - Miro (whiteboard)

### Productivity
- `notion` - Notion (notes)
- `calendar` - Google Calendar
- `gmail` - Gmail (email)

### Development
- `github` - GitHub (code)
- `jira` - Jira (project management)
- `linear` - Linear (issue tracking)
- `confluence` - Confluence (docs)

### Communication
- `slack` - Slack (team chat)

### Storage
- `drive` - Google Drive (cloud storage)

### Project Management
- `asana` - Asana (tasks)
- `trello` - Trello (kanban)

### Business Tools (NEW!)
- `recommendation` - Recomendação (gradiente dourado com estrela)
- `shopping` - Comprar (caixa laranja isométrica)
- `business-analytics` - Análise Ponto Comercial (pin verde + gráfico)
- `quote` - Cotar (calculadora azul/roxa com cifrão)

## Exemplos de Configuração

### Usar apenas tools de design:

```typescript
import { DESIGN_TOOLS } from '../constants';

enabledTools = signal<AITools[]>(
  DESIGN_TOOLS.map(tool => ({
    ...tool,
    onClick: () => this.onToolClick(tool.id)
  }))
);
```

### Usar apenas tools de desenvolvimento:

```typescript
import { DEVELOPMENT_TOOLS } from '../constants';

enabledTools = signal<AITools[]>(
  DEVELOPMENT_TOOLS.map(tool => ({
    ...tool,
    onClick: () => this.onToolClick(tool.id)
  }))
);
```

### Usar apenas tools de negócio (NEW!):

```typescript
import { BUSINESS_TOOLS } from '../constants';

enabledTools = signal<AITools[]>(
  BUSINESS_TOOLS.map(tool => ({
    ...tool,
    onClick: () => this.onToolClick(tool.id)
  }))
);
```

### Criar configuração customizada:

```typescript
enabledTools = signal<AITools[]>([
  {
    id: 'figma',
    name: 'Figma',
    icon: 'figma',
    enabled: true,
    onClick: () => this.onToolClick('figma')
  },
  {
    id: 'custom-tool',
    name: 'Custom Tool',
    icon: 'github', // Reutilizar ícone existente
    enabled: false,
    onClick: () => this.handleCustomTool()
  }
]);
```

## Adicionar Novo Ícone

Para adicionar um novo ícone SVG:

1. Abra `constants/ai-tool-icons.constants.ts`
2. Adicione o novo ícone:

```typescript
export const AI_TOOL_ICONS: Record<string, string> = {
  // ... ícones existentes ...

  'my-tool': `<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <!-- Seu SVG aqui -->
  </svg>`
};
```

3. Use no ai-composer:

```typescript
{
  id: 'my-tool',
  name: 'My Tool',
  icon: 'my-tool',
  enabled: true,
  onClick: () => this.onToolClick('my-tool')
}
```

## Integração com Service (Futuro)

Quando quiser salvar/sincronizar tools com o service:

```typescript
// ai-composer.ts
constructor(private aiChatService: AiChatService) {
  // Carregar tools do service
  this.enabledTools.set(
    this.aiChatService.getEnabledTools().map(tool => ({
      ...tool,
      onClick: () => this.onToolClick(tool.id)
    }))
  );

  // Observar mudanças e salvar
  effect(() => {
    const tools = this.enabledTools();
    this.aiChatService.saveEnabledTools(tools);
  });
}
```

## Notas Importantes

1. **innerHTML Seguro**: Os SVGs são hardcoded no código, então usar `[innerHTML]` é seguro
2. **Track by ID**: Sempre use `track tool.id` no `@for` para performance
3. **ARIA Hidden**: Todos os ícones SVG têm `aria-hidden="true"` para acessibilidade
4. **Dark Mode**: Use `fill="currentColor"` nos SVGs para suporte automático ao dark mode
