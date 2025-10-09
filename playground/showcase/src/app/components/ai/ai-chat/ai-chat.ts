import { Component } from '@angular/core';

import { AiPromptInput } from '../ai-prompt-input/ai-prompt-input';
import { AiComposer } from '../ai-composer/ai-composer';

@Component({
  selector: 'wally-ai-chat',
  imports: [
    AiComposer,
    AiPromptInput,
  ],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css'
})
export class AiChat {

}
