import { Component } from '@angular/core';

import { DropdownMenuSubTrigger } from '../../dropdown-menu/dropdown-menu-sub-trigger/dropdown-menu-sub-trigger';
import { DropdownMenuSubContent } from '../../dropdown-menu/dropdown-menu-sub-content/dropdown-menu-sub-content';
import { DropdownMenuSeparator } from '../../dropdown-menu/dropdown-menu-separator/dropdown-menu-separator';
import { DropdownMenuTrigger } from '../../dropdown-menu/dropdown-menu-trigger/dropdown-menu-trigger';
import { DropdownMenuContent } from '../../dropdown-menu/dropdown-menu-content/dropdown-menu-content';
import { DropdownMenuLabel } from '../../dropdown-menu/dropdown-menu-label/dropdown-menu-label';
import { DropdownMenuGroup } from '../../dropdown-menu/dropdown-menu-group/dropdown-menu-group';
import { DropdownMenuItem } from '../../dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { DropdownMenuSub } from '../../dropdown-menu/dropdown-menu-sub/dropdown-menu-sub';
import { AiPromptInput } from '../ai-prompt-input/ai-prompt-input';
import { DropdownMenu } from '../../dropdown-menu/dropdown-menu';
import { Tooltip } from '../../tooltip/tooltip';
import { Button } from '../../button/button';

@Component({
  selector: 'wally-ai-composer',
  imports: [
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
    DropdownMenuSubContent
  ],
  templateUrl: './ai-composer.html',
  styleUrl: './ai-composer.css'
})
export class AiComposer {
  onItemClick(): void {
    console.log('Item clicked');
  }
}
