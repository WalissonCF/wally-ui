import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../../components/breadcrumb/breadcrumb';

import { AiPromptService } from '../../../core/services/ai-prompt.service';

@Component({
  selector: 'app-breadcrumb-docs',
  imports: [
    Breadcrumb
  ],
  templateUrl: './breadcrumb-docs.html',
  styleUrl: './breadcrumb-docs.css'
})
export class BreadcrumbDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components' },
    { label: 'Breadcrumb' }
  ];

  exampleBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components' },
    { label: 'Breadcrumb' }
  ];

  simpleBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Components' }
  ];

  constructor(
    private aiPromptService: AiPromptService
  ) { }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }
}