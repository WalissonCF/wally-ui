import { Component, computed, input, InputSignal, model, ModelSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { debounce, debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';

import { DropdownMenuSubTrigger } from '../../dropdown-menu/dropdown-menu-sub-trigger/dropdown-menu-sub-trigger';
import { DropdownMenuSubContent } from '../../dropdown-menu/dropdown-menu-sub-content/dropdown-menu-sub-content';
import { DropdownMenuSeparator } from '../../dropdown-menu/dropdown-menu-separator/dropdown-menu-separator';
import { DropdownMenuTrigger } from '../../dropdown-menu/dropdown-menu-trigger/dropdown-menu-trigger';
import { DropdownMenuContent } from '../../dropdown-menu/dropdown-menu-content/dropdown-menu-content';
import { DropdownMenuLabel } from '../../dropdown-menu/dropdown-menu-label/dropdown-menu-label';
import { DropdownMenuGroup } from '../../dropdown-menu/dropdown-menu-group/dropdown-menu-group';
import { DropdownMenuItem } from '../../dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { DropdownMenuSub } from '../../dropdown-menu/dropdown-menu-sub/dropdown-menu-sub';
import { AudioWaveform } from '../../audio-waveform/audio-waveform';
import { AiPromptInput } from '../ai-prompt-input/ai-prompt-input';
import { DropdownMenu } from '../../dropdown-menu/dropdown-menu';
import { Tooltip } from '../../tooltip/tooltip';
import { Button } from '../../button/button';

import { AiChatService } from '../ai-chat.service';
import { AITools } from '../models/ai-tools.interface';
import { DEFAULT_AI_TOOLS } from '../constants';
import { getToolIcon } from '../utils/ai-tool.utils';

@Component({
  selector: 'wally-ai-composer',
  imports: [
    CommonModule,
    AiPromptInput,
    Tooltip,
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    AudioWaveform
  ],
  templateUrl: './ai-composer.html',
  styleUrl: './ai-composer.css'
})
export class AiComposer implements OnInit {
  textSelected = computed(() => this.aiChatService.selectedTextContext());

  isCurrentUserMessageValid$: Observable<boolean>;

  isStartRecoding: WritableSignal<boolean> = signal<boolean>(false);
  isStopRecoding: WritableSignal<boolean> = signal<boolean>(true);

  enabledTools: WritableSignal<AITools[]> = signal<AITools[]>(
    DEFAULT_AI_TOOLS.map(tool => ({
      ...tool,
      onClick: () => this.onToolClick(tool.id)
    }))
  );

  private readonly TOOL_TRIGGERS: Record<string, string> = {
    'comprar': 'shopping',
    'recomendar': 'recommendation',
    'recomendação': 'recommendation',
    'análise': 'business-analytics',
    'analisar': 'business-analytics',
    'cotar': 'quote',
    'cote': 'quote',
  };

  constructor(
    public aiChatService: AiChatService,
    private sanitizer: DomSanitizer
  ) {
    this.isCurrentUserMessageValid$ = this.aiChatService.isCurrentUserMessageValid$;
  }

  ngOnInit(): void {
    this.aiChatService.currentUserMessage$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap((message: string) => this.detectAndActivateTool(message))
      )
      .subscribe();
  }

  onItemClick(): void {
    console.log('Item clicked');
  }

  toggleInputVoice(): void {
    this.isStartRecoding.set(!this.isStartRecoding());
    this.isStopRecoding.set(!this.isStartRecoding());
  }

  /**
   * Handler quando uma tool é clicada
   * @param toolId - ID da tool (ex: 'figma', 'notion', 'github')
   */
  onToolClick(toolId: string): void {
    console.log(`🔧 Tool clicked: ${toolId}`);
    this.toggleTool(toolId);
  }

  /**
   * Ativa/desativa uma tool
   * @param toolId - ID da tool a ser toggleada
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
   * Retorna o ícone SVG da tool (sanitizado para segurança)
   * @param iconName - Nome do ícone (ex: 'figma', 'notion')
   * @returns SafeHtml SVG
   */
  getToolIcon(iconName: string): SafeHtml {
    const svgString = getToolIcon(iconName);
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  clearTextSelected(): void {
    this.aiChatService.clearSelectedTextContext();
  }

  private detectAndActivateTool(message: string): void {
    const normalizedMessage: string = message.toLowerCase().trim();

    // Se mensagem vazia, desativa todas as tools
    if (!normalizedMessage) {
      this.enabledTools.update(tools =>
        tools.map(tool => ({ ...tool, enabled: false }))
      );
      return;
    }

    const firstWord: string = normalizedMessage.split(' ')[0];
    const toolId = this.TOOL_TRIGGERS[firstWord];

    if (toolId) {
      // Ativa apenas a tool correspondente à palavra-chave
      this.enabledTools.update(tools =>
        tools.map(tool => ({
          ...tool,
          enabled: tool.id === toolId ? true : tool.enabled
        }))
      );
    } else {
      // Se não há trigger válido, desativa todas as tools
      this.enabledTools.update(tools =>
        tools.map(tool => ({ ...tool, enabled: false }))
      );
    }
  }
}
