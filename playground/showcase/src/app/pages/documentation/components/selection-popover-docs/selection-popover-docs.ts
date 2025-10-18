import { Component, signal, WritableSignal } from '@angular/core';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { SelectionPopoverCodeExamples } from './selection-popover-docs.examples';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../../components/button/button';
import { SelectionPopover } from '../../../../components/selection-popover/selection-popover';

@Component({
  selector: 'app-selection-popover-docs',
  imports: [
    Button,
    Breadcrumb,
    SelectionPopover
  ],
  templateUrl: './selection-popover-docs.html',
  styleUrl: './selection-popover-docs.css'
})
export class SelectionPopoverDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Selection Popover' }
  ];

  // Installation & Import
  installationCode = getFormattedCode(SelectionPopoverCodeExamples.installation, 'bash');
  importCode = getFormattedCode(SelectionPopoverCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(SelectionPopoverCodeExamples.componentImport, 'typescript');
  basicUsageCode = getFormattedCode(SelectionPopoverCodeExamples.basicUsage, 'html');

  // Custom Actions
  customActionsCode = getFormattedCode(SelectionPopoverCodeExamples.customActions, 'html');
  customActionsTsCode = getFormattedCode(SelectionPopoverCodeExamples.customActionsTs, 'typescript');
  withWallyButtonCode = getFormattedCode(SelectionPopoverCodeExamples.withWallyButton, 'html');
  withWallyButtonTsCode = getFormattedCode(SelectionPopoverCodeExamples.withWallyButtonTs, 'typescript');

  // Production Examples
  blogExampleCode = getFormattedCode(SelectionPopoverCodeExamples.blogExample, 'html');
  blogExampleTsCode = getFormattedCode(SelectionPopoverCodeExamples.blogExampleTs, 'typescript');
  documentationExampleCode = getFormattedCode(SelectionPopoverCodeExamples.documentationExample, 'html');
  readingModeExampleCode = getFormattedCode(SelectionPopoverCodeExamples.readingModeExample, 'html');

  // Advanced
  minSelectionLengthCode = getFormattedCode(SelectionPopoverCodeExamples.minSelectionLength, 'html');
  positioningBehaviorCode = getFormattedCode(SelectionPopoverCodeExamples.positioningBehavior, 'html');
  keyboardAccessibilityCode = getFormattedCode(SelectionPopoverCodeExamples.keyboardAccessibility, 'html');
  eventHandlingCode = getFormattedCode(SelectionPopoverCodeExamples.eventHandling, 'html');
  eventHandlingTsCode = getFormattedCode(SelectionPopoverCodeExamples.eventHandlingTs, 'typescript');

  // Full Example
  fullExampleCode = getFormattedCode(SelectionPopoverCodeExamples.fullExample, 'html');
  fullExampleTsCode = getFormattedCode(SelectionPopoverCodeExamples.fullExampleTs, 'typescript');

  // Styling
  customStylingCode = getFormattedCode(SelectionPopoverCodeExamples.customStyling, 'html');

  // Interactive examples
  selectedText: WritableSignal<string> = signal<string>('');
  actionMessage: WritableSignal<string> = signal<string>('');

  constructor(
    private aiPromptService: AiPromptService
  ) { }

  onTextSelected(text: string): void {
    this.selectedText.set(text);
    this.actionMessage.set(`Selected: "${text}"`);

    // Clear message after 3 seconds
    setTimeout(() => {
      this.actionMessage.set('');
    }, 3000);
  }

  askAI(text: string): void {
    this.selectedText.set(text);
    this.actionMessage.set(`Asking AI about: "${text}"`);

    setTimeout(() => {
      this.actionMessage.set('');
    }, 3000);
  }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }
}
