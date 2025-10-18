import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

import { Button } from '../../button/button';
import { Tooltip } from '../../tooltip/tooltip';
import { DropdownMenu } from '../../dropdown-menu/dropdown-menu';
import { DropdownMenuContent } from '../../dropdown-menu/dropdown-menu-content/dropdown-menu-content';
import { DropdownMenuTrigger } from '../../dropdown-menu/dropdown-menu-trigger/dropdown-menu-trigger';
import { DropdownMenuItem } from '../../dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { DropdownMenuGroup } from '../../dropdown-menu/dropdown-menu-group/dropdown-menu-group';
import { SelectionPopover } from '../../selection-popover/selection-popover';

type role = 'user' | 'assistant';

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
    SelectionPopover
  ],
  templateUrl: './ai-message.html',
  styleUrl: './ai-message.css'
})
export class AiMessage {
  inputRole: InputSignal<role> = input<role>('user');

  textSelected: OutputEmitterRef<string> = output<string>();

  onAskAbout(text: string): void {
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

  copyText(): void {
    // console.log('Copiando texto selecionado');
    // Lógica para copiar o texto para a área de transferência
  }
}
