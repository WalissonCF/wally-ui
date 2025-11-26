import { Component, computed, input, InputSignal, OnInit, output, effect, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { DropdownMenuContent } from '../../dropdown-menu/dropdown-menu-content/dropdown-menu-content';
import { DropdownMenuTrigger } from '../../dropdown-menu/dropdown-menu-trigger/dropdown-menu-trigger';
import { DropdownMenuItem } from '../../dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { DropdownMenuGroup } from '../../dropdown-menu/dropdown-menu-group/dropdown-menu-group';
import { SelectionPopover } from '../../selection-popover/selection-popover';
import { MarkdownPipe } from '../../../pipes/markdown/markdown-pipe';
import { DropdownMenu } from '../../dropdown-menu/dropdown-menu';
import { Tooltip } from '../../tooltip/tooltip';
import { Button } from '../../button/button';

import { isUserMessage, isAssistantMessage, Message } from '../lib/types/message.type';
import { EditMessageInterface } from '../lib/models/messages/edit-message.interface';
import { isOffersResult, isQuoteResult, isRecommendationResult } from '../lib/utils/tool-type-guards.utils';
import { AutoResizeTextarea } from '../../../directives/auto-resize-textarea';
import { MessageStatus } from '../lib/types/message-status.type';
import { AiChatService } from '../lib/service/ai-chat.service';
import { copyToClipboard } from '../lib/utils/clipboard.utils';
import { AITools } from '../lib/models/ai-tools.interface';
import { role } from '../lib/types/role.type';
import { OffersResult } from './tool-results/offers-result/offers-result';
import { RecommendationResult } from './tool-results/recommendation-result/recommendation-result';
import { QuoteResult } from './tool-results/quote-result/quote-result';

/**
 * Represents a selected item from recommendation component
 */
interface SelectedItem {
  ean: string;
  product: string;
  manufacturer: string;
  itemsToBuy: number;
  timestamp: Date;
}

@Component({
  selector: 'wally-ai-message',
  imports: [
    Button,
    Tooltip,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    SelectionPopover,
    MarkdownPipe,
    AutoResizeTextarea,
    ReactiveFormsModule,
    OffersResult,
    RecommendationResult,
    QuoteResult,
  ],
  templateUrl: './ai-message.html',
  styleUrl: './ai-message.css'
})
export class AiMessage implements OnInit {
  /**
   * The content of the message to display.
   * @required
   */
  messageContent: InputSignal<string> = input.required<string>();

  /**
   * The index of this message turn in the conversation.
   * Used for tracking position in the chat history.
   * @required
   */
  turnIndex: InputSignal<number> = input.required<number>();

  /**
   * The role of the message sender ('user' or 'assistant').
   * @required
   */
  inputRole: InputSignal<role> = input.required<role>();

  /**
   * Array containing all versions of this message.
   * Each time a message is regenerated, a new version is added.
   */
  messageVersions: InputSignal<Message[]> = input<Message[]>([]);
  currentVersionIndex: InputSignal<number> = input<number>(0);

  /**
   * Internal signal controlling which version is displayed.
   * Changes when user navigates with arrows.
   */
  displayedVersionIndex: WritableSignal<number> = signal<number>(0);

  copiedRole: WritableSignal<role | null> = signal<role | null>(null);
  isEditing = signal<boolean>(false);
  editedMessageControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.minLength(1)]
  });

  editedMessage = output<EditMessageInterface>();
  regenerateMessage = output<EditMessageInterface>();

  currentMessageStatus = computed(() => {
    const index: number = this.displayedVersionIndex();
    const versions: Message[] = this.messageVersions();
    return versions[index]?.status ?? 'sent';
  });

  isLoading = computed(() => {
    const status: MessageStatus = this.currentMessageStatus();
    return status === 'sending' || status === 'streaming';
  });

  hasError = computed(() => {
    const status: MessageStatus = this.currentMessageStatus();
    return status === 'error';
  });

  currentVersion = computed(() => {
    const versions = this.messageVersions();
    const index = this.displayedVersionIndex();
    return versions[index];
  });

  /**
   * Extracts structured data from the current assistant message.
   * Returns undefined if the message is from user or has no structured data.
   *
   * @returns Structured data object containing quotes, offers, etc., or undefined
   */
  currentStructuredData = computed(() => {
    const currentVersion = this.currentVersion();

    if (!currentVersion || !isAssistantMessage(currentVersion)) {
      return undefined;
    }

    return currentVersion.structuredData;
  });

  hasToolResult = computed(() => {
    return this.currentStructuredData() !== undefined;
  });

  /**
   * Type-safe extraction of offers data from structured data.
   * Uses type guard to ensure data is OffersResult before accessing nested properties.
   *
   * @returns Offers array or undefined if data is not an OffersResult
   */
  offersData = computed(() => {
    const data = this.currentStructuredData();
    return isOffersResult(data) ? data.data.data : undefined;
  });

  /**
   * Type-safe extraction of quote data from structured data.
   * Uses type guard to ensure data is QuoteResult before accessing properties.
   *
   * @returns Quote object or undefined if data is not a QuoteResult
   */
  quoteData = computed(() => {
    const data = this.currentStructuredData();
    return isQuoteResult(data) ? data.data : undefined;
  });

  /**
   * Type-safe extraction of recommendation data from structured data.
   * Uses type guard to ensure data is RecommendationResult before accessing properties.
   *
   * @returns Recommendation object or undefined if data is not a RecommendationResult
   */
  recommendationData = computed(() => {
    const data = this.currentStructuredData();
    return isRecommendationResult(data) ? data.data : undefined;
  });

  protected readonly isQuoteResult = isQuoteResult;
  protected readonly isOffersResult = isOffersResult;
  protected readonly isRecommendationResult = isRecommendationResult;

  tools: AITools[] = [];
  selectedTools: AITools[] = [];

  constructor(
    private aiChatService: AiChatService
  ) {
    /**
     * Effect that automatically switches to new versions when they start streaming.
     *
     * Logic:
     * 1. Watches messageVersions and displayedVersionIndex for changes
     * 2. If user is viewing an old version (not the last one)
     * 3. And a new version starts generating (status 'sending' or 'streaming')
     * 4. Automatically jump to the new version to show real-time streaming
     *
     * This ensures users see new regenerated responses as they stream in.
     */
    effect(() => {
      const versions = this.messageVersions();
      const currentIndex = this.displayedVersionIndex();

      if (versions.length > 0 && currentIndex < versions.length - 1) {
        const lastVersion = versions[versions.length - 1];

        if (lastVersion?.status === 'sending' || lastVersion?.status === 'streaming') {
          this.displayedVersionIndex.set(versions.length - 1);
        }
      }
    });
  }

  ngOnInit(): void {
    this.displayedVersionIndex.set(this.currentVersionIndex());
  }

  /**
   * Navigates to the next message version with circular navigation.
   * When reaching the last version, wraps back to the first.
   *
   * @example
   * versions = [v1, v2, v3], current = v3 → goes to v1
   */
  nextVersion(): void {
    const versions = this.messageVersions();
    if (versions.length <= 1) return;

    const currentIndex = this.displayedVersionIndex();
    const nextIndex = (currentIndex + 1) % versions.length;

    this.displayedVersionIndex.set(nextIndex);
  }

  /**
   * Navigates to the previous message version with circular navigation.
   * When at the first version, wraps to the last.
   *
   * @example
   * versions = [v1, v2, v3], current = v1 → goes to v3
   */
  previousVersion(): void {
    const versions = this.messageVersions();
    if (versions.length <= 1) return;

    const currentIndex = this.displayedVersionIndex();
    const prevIndex = currentIndex === 0 ? versions.length - 1 : currentIndex - 1;

    this.displayedVersionIndex.set(prevIndex);
  }

  onAskAbout(text: string): void {
    this.aiChatService.setSelectedTextContext(text);
  }

  startEditing(): void {
    this.editedMessageControl.setValue(this.currentMessage);
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.isEditing.set(false);
  }

  /**
   * Saves the edited message and creates a new version.
   *
   * Flow:
   * 1. Emits edited message with all context (turn index, version index, etc.)
   * 2. Parent adds new version to messageVersions array
   * 3. setTimeout ensures we wait for the new version to be added
   * 4. Automatically switches to the newest version to show the edit
   * 5. Exits edit mode
   */
  saveEdit(): void {
    const newMessage = this.editedMessageControl.value;

    this.editedMessage.emit({
      message: {
        message: newMessage,
        role: this.inputRole(),
        status: 'sent',
        timeStamp: new Date()
      },
      conversationIndex: this.currentVersionIndex(),
      turnoIndex: this.turnIndex(),
      displayedVersionIndex: this.displayedVersionIndex()
    });

    setTimeout(() => {
      this.displayedVersionIndex.set(this.messageVersions().length - 1);
    }, 0);

    this.isEditing.set(false);
  }

  regenerate(): void {
    this.regenerateMessage.emit({
      message: {
        message: this.currentMessage,
        role: this.inputRole(),
        status: 'sending',
        timeStamp: new Date()
      },
      conversationIndex: this.currentVersionIndex(),
      turnoIndex: this.turnIndex(),
      displayedVersionIndex: this.displayedVersionIndex()
    });
  }

  copyToClipboard(message: string): void {
    copyToClipboard(message).then((success) => {
      if (success) {
        this.copiedRole.set(this.inputRole());
        setTimeout(() => this.copiedRole.set(null), 2000);
      }
    });
  }

  isCopied(): boolean {
    return this.copiedRole() === this.inputRole();
  }

  get currentMessage(): string {
    const versions = this.messageVersions();
    const index = this.displayedVersionIndex();
    const version = versions[index];
    return version !== undefined ? version.message : this.messageContent();
  }

  get hasMultipleVersions(): boolean {
    return this.messageVersions().length > 1;
  }

  /**
   * Generates version indicator text in format "2/5".
   * Converts 0-based index to 1-based display (user sees 1-5, not 0-4).
   *
   * @returns Formatted string like "2/5", or empty string if only one version
   */
  get versionIndicator(): string {
    if (!this.hasMultipleVersions) return '';
    const current = this.displayedVersionIndex() + 1;
    const total = this.messageVersions().length;
    return `${current}/${total}`;
  }

  get currentSelectedContext(): string | undefined {
    const versions = this.messageVersions();
    const index = this.displayedVersionIndex();
    const message = versions[index];

    if (message && isUserMessage(message)) {
      return message.selectedContext;
    }

    return undefined;
  }

  /**
   * Handles when a user selects an offer from the offers-result component
   */
  onOfferSelected(offer: any): void {
    console.log('Oferta selecionada:', offer);
    // TODO: Implementar ação quando oferta for selecionada
    // Pode enviar para o chat, salvar em um estado, etc.
  }

  /**
   * Handles when the selection changes in the recommendation-result component
   */
  onRecommendationSelectionChanged(selectedItems: any[]): void {
    console.log('Seleção de recomendações alterada:', selectedItems);
    // TODO: Implementar ação quando seleção mudar
    // Pode enviar para o chat, salvar em um estado, etc.
  }

  /**
   * Handles when the user clicks "Cotar" button in recommendation-result
   * Automatically sends a quote request message with selected EANs to the chat
   */
  onQuoteRequested(selectedItems: SelectedItem[]): void {
    if (selectedItems.length === 0) {
      return;
    }

    // Extract EAN codes
    const eans = selectedItems.map(item => item.ean);

    // Format message based on quantity
    let message: string;
    if (eans.length === 1) {
      message = `Iza, realize a cotação para esse EAN: ${eans[0]}`;
    } else {
      message = `Iza, realize a cotação para esses EANs: ${eans.join(', ')}`;
    }

    // Auto-send to chat
    this.aiChatService.updateCurrentUserMessage(message);
    this.aiChatService.sendMessage();
  }

  /**
   * Handles when the user clicks "Add to cart" button in quote-result
   */
  onAddToCartRequested(cartItems: any[]): void {
    console.log('Adicionar ao carrinho solicitado:', cartItems);
    // TODO: Implementar lógica de adicionar ao carrinho
    // Pode enviar para API, atualizar estado global, ou enviar mensagem para o chat
  }
}
