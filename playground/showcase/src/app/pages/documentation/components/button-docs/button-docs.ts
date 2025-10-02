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

  // Installation & Import
  basicUsageCode = getFormattedCode(ButtonCodeExamples.installation, 'bash');
  importCode = getFormattedCode(ButtonCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(ButtonCodeExamples.componentImport, 'typescript');
  basicUsageTemplateCode = getFormattedCode(ButtonCodeExamples.basicUsage, 'html');

  // Variants
  primaryVariantCode = getFormattedCode(ButtonCodeExamples.primaryVariant, 'html');
  secondaryVariantCode = getFormattedCode(ButtonCodeExamples.secondaryVariant, 'html');
  destructiveVariantCode = getFormattedCode(ButtonCodeExamples.destructiveVariant, 'html');
  outlineVariantCode = getFormattedCode(ButtonCodeExamples.outlineVariant, 'html');
  ghostVariantCode = getFormattedCode(ButtonCodeExamples.ghostVariant, 'html');
  linkVariantCode = getFormattedCode(ButtonCodeExamples.linkVariant, 'html');

  // States
  disabledCode = getFormattedCode(ButtonCodeExamples.disabled, 'html');
  loadingCode = getFormattedCode(ButtonCodeExamples.loading, 'html');
  notificationCode = getFormattedCode(ButtonCodeExamples.notification, 'html');

  // Production Examples
  ctaExampleCode = getFormattedCode(ButtonCodeExamples.ctaExample, 'html');
  loginExampleCode = getFormattedCode(ButtonCodeExamples.loginExample, 'html');
  loginExampleTsCode = getFormattedCode(ButtonCodeExamples.loginExampleTs, 'typescript');
  deleteExampleCode = getFormattedCode(ButtonCodeExamples.deleteExample, 'html');
  dashboardExampleCode = getFormattedCode(ButtonCodeExamples.dashboardExample, 'html');
  notificationButtonCode = getFormattedCode(ButtonCodeExamples.notificationButton, 'html');

  // Button Types
  submitCode = getFormattedCode(ButtonCodeExamples.submit, 'html');
  resetCode = getFormattedCode(ButtonCodeExamples.reset, 'html');

  // Events
  clickCodeHTML = getFormattedCode(ButtonCodeExamples.clickTemplate, 'html');
  clickCodeTs = getFormattedCode(ButtonCodeExamples.clickMethod, 'typescript');

  // Icons
  iconCode = getFormattedCode(ButtonCodeExamples.iconWithText, 'html');
  iconOnlyCode = getFormattedCode(ButtonCodeExamples.iconOnly, 'html');
  iconLeftCode = getFormattedCode(ButtonCodeExamples.iconLeft, 'html');

  // Accessibility
  ariaLabelCode = getFormattedCode(ButtonCodeExamples.ariaLabel, 'html');
  ariaPressedCode = getFormattedCode(ButtonCodeExamples.ariaPressed, 'html');
  ariaBusyCode = getFormattedCode(ButtonCodeExamples.ariaBusy, 'html');
  ariaDescribedByCode = getFormattedCode(ButtonCodeExamples.ariaDescribedBy, 'html');

  // Interactive states
  clickMessage: WritableSignal<string> = signal<string>('');
  toggleState: WritableSignal<boolean> = signal<boolean>(false);

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
