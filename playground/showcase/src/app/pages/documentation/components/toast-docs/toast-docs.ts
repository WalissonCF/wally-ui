import { Component, inject, signal, WritableSignal } from '@angular/core';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { ToastCodeExamples } from './toast-docs.examples';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../../components/button/button';
import { Toast } from '../../../../components/toast/toast';
import { ToastService } from '../../../../components/toast/lib/services/toast.service';

@Component({
  selector: 'wally-toast-docs',
  imports: [
    Breadcrumb,
    Button,
    Toast
  ],
  templateUrl: './toast-docs.html',
  styleUrl: './toast-docs.css',
})
export class ToastDocs {
  private toastService = inject(ToastService);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Toast' }
  ];

  // Installation & Import
  installationCode = getFormattedCode(ToastCodeExamples.installation, 'bash');
  importCode = getFormattedCode(ToastCodeExamples.import, 'typescript');
  serviceImportCode = getFormattedCode(ToastCodeExamples.serviceImport, 'typescript');
  componentImportCode = getFormattedCode(ToastCodeExamples.componentImport, 'typescript');
  setupExampleCode = getFormattedCode(ToastCodeExamples.setupExample, 'typescript');
  basicUsageCode = getFormattedCode(ToastCodeExamples.basicUsage, 'typescript');

  // Types
  successTypeCode = getFormattedCode(ToastCodeExamples.successType, 'typescript');
  errorTypeCode = getFormattedCode(ToastCodeExamples.errorType, 'typescript');
  infoTypeCode = getFormattedCode(ToastCodeExamples.infoType, 'typescript');
  warningTypeCode = getFormattedCode(ToastCodeExamples.warningType, 'typescript');
  loadingTypeCode = getFormattedCode(ToastCodeExamples.loadingType, 'typescript');
  neutralTypeCode = getFormattedCode(ToastCodeExamples.neutralType, 'typescript');

  // Positions - Top
  topLeftCode = getFormattedCode(ToastCodeExamples.topLeft, 'typescript');
  topCenterCode = getFormattedCode(ToastCodeExamples.topCenter, 'typescript');
  topRightCode = getFormattedCode(ToastCodeExamples.topRight, 'typescript');

  // Positions - Center
  centerLeftCode = getFormattedCode(ToastCodeExamples.centerLeft, 'typescript');
  centerCenterCode = getFormattedCode(ToastCodeExamples.centerCenter, 'typescript');
  centerRightCode = getFormattedCode(ToastCodeExamples.centerRight, 'typescript');

  // Positions - Bottom
  bottomLeftCode = getFormattedCode(ToastCodeExamples.bottomLeft, 'typescript');
  bottomCenterCode = getFormattedCode(ToastCodeExamples.bottomCenter, 'typescript');
  bottomRightCode = getFormattedCode(ToastCodeExamples.bottomRight, 'typescript');

  // Configuration
  customDurationCode = getFormattedCode(ToastCodeExamples.customDuration, 'typescript');
  noDismissCode = getFormattedCode(ToastCodeExamples.noDismiss, 'typescript');
  defaultPositionCode = getFormattedCode(ToastCodeExamples.defaultPosition, 'typescript');

  // Production Examples
  formExampleCode = getFormattedCode(ToastCodeExamples.formExample, 'typescript');
  uploadExampleCode = getFormattedCode(ToastCodeExamples.uploadExample, 'typescript');
  deleteExampleCode = getFormattedCode(ToastCodeExamples.deleteExample, 'typescript');
  clipboardExampleCode = getFormattedCode(ToastCodeExamples.clipboardExample, 'typescript');
  networkExampleCode = getFormattedCode(ToastCodeExamples.networkExample, 'typescript');
  multipleExampleCode = getFormattedCode(ToastCodeExamples.multipleExample, 'typescript');
  stackingDemoCode = getFormattedCode(ToastCodeExamples.stackingDemo, 'typescript');

  // API Reference
  apiCreateMethodCode = getFormattedCode(ToastCodeExamples.apiCreateMethod, 'typescript');
  apiRemoveMethodCode = getFormattedCode(ToastCodeExamples.apiRemoveMethod, 'typescript');
  apiSetDefaultPositionCode = getFormattedCode(ToastCodeExamples.apiSetDefaultPosition, 'typescript');

  // Advanced
  signalsPatternCode = getFormattedCode(ToastCodeExamples.signalsPattern, 'typescript');
  typeDefinitionsCode = getFormattedCode(ToastCodeExamples.typeDefinitions, 'typescript');

  // Interactive states
  loadingToastId: WritableSignal<number | null> = signal(null);

  constructor(
    private aiPromptService: AiPromptService
  ) { }

  // Demo methods
  showSuccess(): void {
    this.toastService.create({
      type: 'success',
      title: 'Success!',
      message: 'Your changes have been saved.'
    });
  }

  showError(): void {
    this.toastService.create({
      type: 'error',
      title: 'Error',
      message: 'Something went wrong. Please try again.'
    });
  }

  showInfo(): void {
    this.toastService.create({
      type: 'info',
      title: 'Info',
      message: 'You have 3 unread notifications.'
    });
  }

  showWarning(): void {
    this.toastService.create({
      type: 'warning',
      title: 'Warning',
      message: 'Your session will expire in 5 minutes.'
    });
  }

  showLoading(): void {
    const id = this.toastService.create({
      type: 'loading',
      message: 'Processing your request...'
    });
    this.loadingToastId.set(id);

    // Auto-dismiss after 3 seconds for demo
    setTimeout(() => {
      this.toastService.remove(id);
      this.loadingToastId.set(null);
    }, 3000);
  }

  showNeutral(): void {
    const id = this.toastService.create({
      type: 'neutral',
      title: 'Information',
      message: 'This is a neutral toast without an icon.'
    });

    // Auto-dismiss after 3 seconds for demo
    setTimeout(() => {
      this.toastService.remove(id);
    }, 3000);
  }

  // Position demos
  showTopLeft(): void {
    this.toastService.create({
      type: 'success',
      message: 'Top left position',
      position: 'top-left'
    });
  }

  showTopCenter(): void {
    this.toastService.create({
      type: 'success',
      message: 'Top center position (default)',
      position: 'top-center'
    });
  }

  showTopRight(): void {
    this.toastService.create({
      type: 'success',
      message: 'Top right position',
      position: 'top-right'
    });
  }

  showCenterLeft(): void {
    this.toastService.create({
      type: 'info',
      message: 'Center left position',
      position: 'center-left'
    });
  }

  showCenter(): void {
    this.toastService.create({
      type: 'info',
      message: 'Center position',
      position: 'center'
    });
  }

  showCenterRight(): void {
    this.toastService.create({
      type: 'info',
      message: 'Center right position',
      position: 'center-right'
    });
  }

  showBottomLeft(): void {
    this.toastService.create({
      type: 'warning',
      message: 'Bottom left position',
      position: 'bottom-left'
    });
  }

  showBottomCenter(): void {
    this.toastService.create({
      type: 'warning',
      message: 'Bottom center position',
      position: 'bottom-center'
    });
  }

  showBottomRight(): void {
    this.toastService.create({
      type: 'warning',
      message: 'Bottom right position',
      position: 'bottom-right'
    });
  }

  // Stacking demo
  showStackingDemo(): void {
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        this.toastService.create({
          type: 'info',
          title: `Toast #${i}`,
          message: `This is toast number ${i}`,
          duration: 10000
        });
      }, i * 500);
    }
  }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }
}
