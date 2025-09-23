import { Component, signal, WritableSignal } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../components/button/button';

import { AiPromptService } from '../../../core/services/ai-prompt.service';

@Component({
  selector: 'app-button-docs',
  imports: [
    Button,
    Breadcrumb
  ],
  templateUrl: './button-docs.html',
  styleUrl: './button-docs.css'
})
export class ButtonDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components' },
    { label: 'Button' }
  ];

  clickMessage: WritableSignal<string> = signal<string>('');

  constructor(
    private aiPromptService: AiPromptService
  ) {}

  handleClick(): void {
    this.clickMessage.set('Button clicked!');
  }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }
}
