import { Component } from '@angular/core';

import { AiPromptInput } from '../ai-prompt-input/ai-prompt-input';
import { Button } from '../../button/button';
import { Tooltip } from '../../tooltip/tooltip';

@Component({
  selector: 'wally-ai-composer',
  imports: [
    AiPromptInput,
    Tooltip,
    Button
  ],
  templateUrl: './ai-composer.html',
  styleUrl: './ai-composer.css'
})
export class AiComposer {

}
