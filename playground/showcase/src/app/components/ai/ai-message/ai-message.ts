import { Component, computed, input, InputSignal, OnInit, output, effect, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

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
import { MessageStatus } from '../lib/types/message-status.type';
import { role } from '../lib/types/role.type';

import { AITools } from '../lib/models/ai-tools.interface';

import { EditMessageInterface } from '../lib/models/messages/edit-message.interface';

import { AiChatService } from '../lib/service/ai-chat.service';

import { isOffersResult, isQuoteResult } from '../lib/utils/tool-type-guards.utils';
import { copyToClipboard } from '../lib/utils/clipboard.utils';

import { AutoResizeTextarea } from '../../../directives/auto-resize-textarea';

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
    JsonPipe // TODO: TEMPORARIO
  ],
  templateUrl: './ai-message.html',
  styleUrl: './ai-message.css'
})
export class AiMessage implements OnInit {
  messageContent: InputSignal<string> = input.required<string>();
  turnIndex: InputSignal<number> = input.required<number>();
  inputRole: InputSignal<role> = input.required<role>();

  // Array com todas as versões desta mensagem (para navegação entre versões)
  messageVersions: InputSignal<Message[]> = input<Message[]>([]);

  // Índice da versão atual sendo exibida (para o controle 1/2, 2/2)
  currentVersionIndex: InputSignal<number> = input<number>(0);

  // Signal interno que controla qual versão está sendo mostrada
  // Este é o estado que muda quando o usuário clica nas setas
  displayedVersionIndex: WritableSignal<number> = signal<number>(0);

  copiedRole: WritableSignal<role | null> = signal<role | null>(null);
  isEditing = signal<boolean>(false);
  editedMessageControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.minLength(1)
    ]
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

  // Computed específicos para cada tipo de tool (type-safe)
  offersData = computed(() => {
    const data = this.currentStructuredData();
    return isOffersResult(data) ? data.data.data : undefined;
  });

  quoteData = computed(() => {
    const data = this.currentStructuredData();
    return isQuoteResult(data) ? data.data : undefined;
  });

  protected readonly isQuoteResult = isQuoteResult;
  protected readonly isOffersResult = isOffersResult;

  tools: AITools[] = [];
  selectedTools: AITools[] = [];

  constructor(
    private aiChatService: AiChatService
  ) {
    effect(() => {
      const versions = this.messageVersions();
      const currentIndex = this.displayedVersionIndex();

      if (versions.length > 0 && currentIndex < versions.length - 1) {
        // Verifica se a nova versão (última) está com status 'sending' ou 'streaming'
        const lastVersion = versions[versions.length - 1];

        if (lastVersion?.status === 'sending' || lastVersion?.status === 'streaming') {
          // Nova versão sendo gerada, mostra ela automaticamente
          this.displayedVersionIndex.set(versions.length - 1);
        }
      }
    });
  }

  ngOnInit(): void {
    // Inicializa com o índice passado como input
    this.displayedVersionIndex.set(this.currentVersionIndex());
  }

  /**
   * Navega para a próxima versão da mensagem.
   * Quando chega na última versão, volta para a primeira (comportamento circular).
   */
  nextVersion(): void {
    const versions = this.messageVersions();
    if (versions.length <= 1) return; // Não faz nada se só tem uma versão

    const currentIndex = this.displayedVersionIndex();
    const nextIndex = (currentIndex + 1) % versions.length;

    this.displayedVersionIndex.set(nextIndex);
  }

  /**
   * Navega para a versão anterior da mensagem.
   * Quando está na primeira versão, vai para a última (comportamento circular).
   */
  previousVersion(): void {
    const versions = this.messageVersions();
    if (versions.length <= 1) return; // Não faz nada se só tem uma versão

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

  saveEdit(): void {
    const newMessage = this.editedMessageControl.value;

    console.log('newMessage', newMessage);

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

  askChat(): void {
    console.log('🤖 Botão "Ask chat" clicado');
    // Este método agora é redundante - o texto é emitido via textSelected
  }

  copyToClipboard(message: string): void {
    copyToClipboard(message).then((success) => {
      if (success) {
        this.copiedRole.set(this.inputRole());

        setTimeout(() => {
          this.copiedRole.set(null);
        }, 2000);
      }
    });
  }

  isCopied(): boolean {
    return this.copiedRole() === this.inputRole();
  }

  /**
   * Retorna o conteúdo da mensagem que deve ser exibida atualmente.
   * Isso muda conforme o usuário navega entre as versões.
   */
  get currentMessage(): string {
    const versions = this.messageVersions();
    const index = this.displayedVersionIndex();

    // Verifica se existe a versão no índice
    const version = versions[index];

    // Se existir, retorna a mensagem (mesmo vazia), senão fallback
    return version !== undefined ? version.message : this.messageContent();
  }

  /**
   * Verifica se há múltiplas versões disponíveis.
   * Controla a visibilidade dos controles de navegação.
   */
  get hasMultipleVersions(): boolean {
    return this.messageVersions().length > 1;
  }

  /**
   * Retorna o texto do indicador de versão no formato "2/5".
   */
  get versionIndicator(): string {
    if (!this.hasMultipleVersions) return '';
    const current = this.displayedVersionIndex() + 1; // +1 porque mostramos de 1 a N, não de 0 a N-1
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
}
