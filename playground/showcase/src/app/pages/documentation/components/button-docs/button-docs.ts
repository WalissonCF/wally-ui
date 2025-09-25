import { Component, signal, WritableSignal } from '@angular/core';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { ButtonCodeExamples } from './button-docs.examples';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../../components/button/button';

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
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Button' }
  ];

  basicUsageCode = getFormattedCode(ButtonCodeExamples.installation, 'bash');
  importCode = getFormattedCode(ButtonCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(ButtonCodeExamples.componentImport, 'typescript');
  basicUsageTemplateCode = getFormattedCode(ButtonCodeExamples.basicUsage, 'html');
  disabledCode = getFormattedCode(ButtonCodeExamples.disabled, 'html');
  loadingCode = getFormattedCode(ButtonCodeExamples.loading, 'html');
  notificationCode = getFormattedCode(ButtonCodeExamples.notification, 'html');
  submitCode = getFormattedCode(ButtonCodeExamples.submit, 'html');
  clickCodeHTML = getFormattedCode(ButtonCodeExamples.clickTemplate, 'html');
  clickCodeTs = getFormattedCode(ButtonCodeExamples.clickMethod, 'typescript');
  iconCode = getFormattedCode(ButtonCodeExamples.iconWithText, 'html');
  iconNotificationCode = getFormattedCode(ButtonCodeExamples.iconOnly, 'html');

  // Properties
  propertyTypeCode = getFormattedCode(ButtonCodeExamples.propertyType, 'typescript');
  propertyDisabledCode = getFormattedCode(ButtonCodeExamples.propertyDisabled, 'typescript');
  propertyLoadingCode = getFormattedCode(ButtonCodeExamples.propertyLoading, 'typescript');
  propertyShowNotificationCode = getFormattedCode(ButtonCodeExamples.propertyShowNotification, 'typescript');

  clickMessage: WritableSignal<string> = signal<string>('');

  constructor(
    private aiPromptService: AiPromptService
  ) { }

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
