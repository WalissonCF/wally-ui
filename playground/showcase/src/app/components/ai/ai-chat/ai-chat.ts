import { Component, signal } from '@angular/core';

import { AiPromptInput } from '../ai-prompt-input/ai-prompt-input';
import { AiComposer } from '../ai-composer/ai-composer';
import { AiChatService } from '../ai-chat.service';
import { AiMessage } from '../ai-message/ai-message';

@Component({
  selector: 'wally-ai-chat',
  imports: [
    AiComposer,
    AiPromptInput,
    AiMessage
  ],
  providers: [
    AiChatService
  ],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css'
})
export class AiChat {
  textSelected = signal<string>('');

  handleTextSelected(text: string): void {
    console.log('📝 Texto selecionado:', text);
    this.textSelected.set(text);
  }
}
