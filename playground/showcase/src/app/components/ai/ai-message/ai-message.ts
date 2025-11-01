import { Component, input, InputSignal, OnInit, output, OutputEmitterRef, signal } from '@angular/core';

import { Button } from '../../button/button';
import { Tooltip } from '../../tooltip/tooltip';
import { DropdownMenu } from '../../dropdown-menu/dropdown-menu';
import { DropdownMenuContent } from '../../dropdown-menu/dropdown-menu-content/dropdown-menu-content';
import { DropdownMenuTrigger } from '../../dropdown-menu/dropdown-menu-trigger/dropdown-menu-trigger';
import { DropdownMenuItem } from '../../dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { DropdownMenuGroup } from '../../dropdown-menu/dropdown-menu-group/dropdown-menu-group';
import { SelectionPopover } from '../../selection-popover/selection-popover';
import { role } from '../types/role.type';
import { Message } from '../types/message.interface';
import { AITools } from '../types/ai-tools.interface';
import { MarkdownPipe } from '../../../pipes/markdown/markdown-pipe';

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
    MarkdownPipe
  ],
  templateUrl: './ai-message.html',
  styleUrl: './ai-message.css'
})
export class AiMessage implements OnInit {
  inputRole: InputSignal<role> = input.required<role>();
  messageContent: InputSignal<string> = input.required<string>();

  // Array com todas as versões desta mensagem (para navegação entre versões)
  messageVersions: InputSignal<Message[]> = input<Message[]>([]);

  // Índice da versão atual sendo exibida (para o controle 1/2, 2/2)
  currentVersionIndex: InputSignal<number> = input<number>(0);

  // Signal interno que controla qual versão está sendo mostrada
  // Este é o estado que muda quando o usuário clica nas setas
  displayedVersionIndex = signal<number>(0);

  textSelected: OutputEmitterRef<string> = output<string>();

  // messages = signal<Message[][]>([]);

  tools: AITools[] = [];
  selectedTools: AITools[] = [];

  ngOnInit(): void {
    // Inicializa com o índice passado como input
    this.displayedVersionIndex.set(this.currentVersionIndex());
    // this.messages.push(
    //   [
    //     [
    //       { message: 'test', role: 'user'},
    //       { message: 'test', role: 'user'}
    //     ],
    //     [
    //       { message: 'test', role: 'assistant'},
    //       { message: 'test 2', role: 'assistant'}
    //     ]
    //   ]
    // );
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

  /**
   * Retorna o conteúdo da mensagem que deve ser exibida atualmente.
   * Isso muda conforme o usuário navega entre as versões.
   */
  get currentMessage(): string {
    const versions = this.messageVersions();
    const index = this.displayedVersionIndex();

    // Se o índice for válido, retorna a mensagem daquela versão
    // Senão, retorna o messageContent padrão (fallback)
    return versions[index]?.message || this.messageContent();
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

  onAskAbout(text: string): void {
    // console.log('3 dimension array: ', this.messages);

    // for (let i = 0; i < this.messages.length; i ++) {
    //   console.log('i', this.messages[i]);

    //   for (let j = 0; j < this.messages[i].length; j++) {
    //     console.log('j', this.messages[i][j]);

    //     for (let k = 0; k < this.messages[i][j].length; k++) {
    //       console.log('k', this.messages[i][j][k]);
    //     }
    //   }
    // }

    // console.log('📝 Texto selecionado:', text);
    // console.log('📏 Tamanho do texto:', text.length);
    this.textSelected.emit(text);
    // Aqui você pode emitir um evento para o componente pai (ai-chat)
    // ou chamar um serviço para adicionar a pergunta ao chat
  }

  askChat(): void {
    // console.log('🤖 Botão "Ask chat" clicado');
    // Este método agora é redundante - o texto é emitido via textSelected
  }
}
