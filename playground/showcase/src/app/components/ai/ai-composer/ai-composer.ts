import { Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';

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

import { AiChatService } from '../lib/service/ai-chat.service';
import { AITools } from '../lib/models/ai-tools.interface';
import { getToolIcon } from '../lib/utils/ai-tool.utils';
import { DEFAULT_AI_TOOLS } from '../lib/constants';

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
  /**
   * Computed signal for selected text context from the AI chat service.
   * Updates automatically when the user selects text in the chat.
   */
  textSelected = computed(() => this.aiChatService.selectedTextContext());

  /**
   * Observable that emits whether the current user message is valid for sending.
   * Used to enable/disable the send button in the UI.
   */
  isCurrentUserMessageValid$: Observable<boolean>;

  /**
   * Signal indicating if voice recording has started.
   * @default false
   */
  isStartRecoding: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Signal indicating if voice recording has stopped.
   * @default true
   */
  isStopRecoding: WritableSignal<boolean> = signal<boolean>(true);

  /**
   * Signal indicating if audio transcription is in progress.
   * @default false
   */
  isTranscribing: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Signal containing the list of available AI tools with their enabled state.
   * Each tool is initialized with an onClick handler that toggles its state.
   */
  enabledTools: WritableSignal<AITools[]> = signal<AITools[]>(
    DEFAULT_AI_TOOLS.map(tool => ({
      ...tool,
      onClick: () => this.onToolClick(tool.id)
    }))
  );

  /**
   * Mapping of Portuguese trigger words to tool IDs for automatic tool activation.
   * When a message starts with one of these keywords, the corresponding tool is activated.
   *
   * @example
   * "comprar notebook" → activates 'shopping' tool
   * "cotar produto" → activates 'quote' tool
   */
  private readonly TOOL_TRIGGERS: Record<string, string> = {
    'comprar': 'shopping',
    'recomendar': 'recommendation',
    'recomendação': 'recommendation',
    'análise': 'business-analytics',
    'analisar': 'business-analytics',
    'cotar': 'quote',
    'cote': 'quote',
  };

  /**
   * Creates an instance of AiComposer.
   *
   * @param aiChatService - Service for managing AI chat state and operations
   * @param sanitizer - Angular DomSanitizer for safely rendering HTML/SVG icons
   */
  constructor(
    public aiChatService: AiChatService,
    private sanitizer: DomSanitizer
  ) {
    this.isCurrentUserMessageValid$ = this.aiChatService.isCurrentUserMessageValid$;
  }

  /**
   * Lifecycle hook that initializes the component.
   * Sets up automatic tool detection based on user message input.
   * Uses debouncing to avoid excessive processing while typing.
   */
  ngOnInit(): void {
    this.aiChatService.currentUserMessage$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap((message: string) => this.detectAndActivateTool(message))
      )
      .subscribe();
  }

  /**
   * Generic handler for menu item clicks.
   * Currently logs the click event (placeholder for future functionality).
   */
  onItemClick(): void {
    console.log('Item clicked');
  }

  /**
   * Toggles the voice input recording state.
   * Switches between recording and stopped states.
   */
  toggleInputVoice(): void {
    this.isStartRecoding.set(!this.isStartRecoding());
    this.isStopRecoding.set(!this.isStartRecoding());
  }

  /**
   * Handles tool click events.
   * Toggles the enabled state of the clicked tool.
   *
   * @param toolId - ID of the tool (e.g., 'figma', 'notion', 'github')
   * @example
   * onToolClick('shopping') // Toggles shopping tool
   */
  onToolClick(toolId: string): void {
    console.log(`🔧 Tool clicked: ${toolId}`);
    this.toggleTool(toolId);
  }

  /**
   * Toggles a tool's enabled state.
   * Updates the enabledTools signal by flipping the enabled flag for the matching tool.
   *
   * @param toolId - ID of the tool to toggle
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
   * Returns the sanitized SVG icon for a tool.
   * Uses DomSanitizer to prevent XSS attacks when rendering SVG content.
   *
   * @param iconName - Name of the icon (e.g., 'figma', 'notion')
   * @returns Sanitized HTML containing the SVG icon
   */
  getToolIcon(iconName: string): SafeHtml {
    const svgString = getToolIcon(iconName);
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  /**
   * Clears the selected text context in the AI chat service.
   * Removes any text that was previously selected by the user.
   */
  clearTextSelected(): void {
    this.aiChatService.clearSelectedTextContext();
  }

  /**
   * Handles real-time transcription updates from the audio input.
   * Updates the current user message with the transcribed text.
   *
   * @param text - Transcribed text from the audio
   */
  onTranscriptionUpdate(text: string): void {
    this.aiChatService.updateCurrentUserMessage(text);
  }

  /**
   * Handles transcription state changes.
   * Updates the isTranscribing signal to reflect the current transcription status.
   *
   * @param isTranscribing - Whether transcription is currently active
   */
  onTranscriptionStateChange(isTranscribing: boolean): void {
    this.isTranscribing.set(isTranscribing);
  }

  /**
   * Detects keywords in the user's message and automatically activates corresponding tools.
   *
   * Algorithm:
   * 1. Normalizes message to lowercase and trims whitespace
   * 2. If empty, disables all tools
   * 3. Extracts first word and checks against TOOL_TRIGGERS map
   * 4. If match found, enables the corresponding tool
   * 5. If no match, disables all tools
   *
   * @param message - User's current message input
   * @private
   *
   * @example
   * detectAndActivateTool("comprar notebook") // Activates 'shopping' tool
   * detectAndActivateTool("cotar produto") // Activates 'quote' tool
   * detectAndActivateTool("hello") // Disables all tools (no match)
   */
  private detectAndActivateTool(message: string): void {
    const normalizedMessage: string = message.toLowerCase().trim();

    // If message is empty, disable all tools
    if (!normalizedMessage) {
      this.enabledTools.update(tools =>
        tools.map(tool => ({ ...tool, enabled: false }))
      );
      return;
    }

    const firstWord: string = normalizedMessage.split(' ')[0];
    const toolId = this.TOOL_TRIGGERS[firstWord];

    if (toolId) {
      // Enable only the tool corresponding to the keyword
      this.enabledTools.update(tools =>
        tools.map(tool => ({
          ...tool,
          enabled: tool.id === toolId ? true : tool.enabled
        }))
      );
    } else {
      // If no valid trigger, disable all tools
      this.enabledTools.update(tools =>
        tools.map(tool => ({ ...tool, enabled: false }))
      );
    }
  }
}
