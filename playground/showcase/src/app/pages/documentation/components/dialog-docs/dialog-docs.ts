import { Component } from '@angular/core';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { DialogCodeExamples } from './dialog-docs.examples';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../../components/button/button';
import { Input } from '../../../../components/input/input';
import { Dialog } from '../../../../components/dialog/dialog';
import { DialogTrigger } from '../../../../components/dialog/dialog-trigger/dialog-trigger';
import { DialogContent } from '../../../../components/dialog/dialog-content/dialog-content';
import { DialogHeader } from '../../../../components/dialog/dialog-header/dialog-header';
import { DialogFooter } from '../../../../components/dialog/dialog-footer/dialog-footer';
import { DialogTitle } from '../../../../components/dialog/dialog-title/dialog-title';
import { DialogDescription } from '../../../../components/dialog/dialog-description/dialog-description';
import { DialogClose } from '../../../../components/dialog/dialog-close/dialog-close';

@Component({
  selector: 'app-dialog-docs',
  imports: [
    Button,
    Breadcrumb,
    Input,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose
  ],
  templateUrl: './dialog-docs.html'
})
export class DialogDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Dialog' }
  ];

  installationCode = getFormattedCode(DialogCodeExamples.installation, 'bash');
  importCode = getFormattedCode(DialogCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(DialogCodeExamples.componentImport, 'typescript');

  basicUsageCode = getFormattedCode(DialogCodeExamples.basicUsage, 'html');
  confirmationDialogCode = getFormattedCode(DialogCodeExamples.confirmationDialog, 'html');
  withFormCode = getFormattedCode(DialogCodeExamples.withForm, 'html');
  customContentCode = getFormattedCode(DialogCodeExamples.customContent, 'html');
  disableBackdropClickCode = getFormattedCode(DialogCodeExamples.disableBackdropClick, 'html');
  closeProgrammaticallyCode = getFormattedCode(DialogCodeExamples.closeProgrammatically, 'typescript');
  componentTsCode = getFormattedCode(DialogCodeExamples.componentTs, 'typescript');

  constructor(
    private aiPromptService: AiPromptService
  ) { }

  onDelete(): void {
    console.log('Account deleted');
  }

  onSave(): void {
    console.log('Changes saved');
  }

  onAddToCart(): void {
    console.log('Added to cart');
  }

  onAccept(): void {
    console.log('User accepted');
  }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }
}
