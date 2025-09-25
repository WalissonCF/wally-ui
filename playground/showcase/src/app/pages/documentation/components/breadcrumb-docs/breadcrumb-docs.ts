import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { BreadcrumbCodeExamples } from './breadcrumb-docs.examples';

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
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Breadcrumb' }
  ];

  exampleBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Breadcrumb' }
  ];

  simpleBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Components' }
  ];

  installationCode = getFormattedCode(BreadcrumbCodeExamples.installation, 'bash');
  importCode = getFormattedCode(BreadcrumbCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(BreadcrumbCodeExamples.componentImport, 'typescript');
  basicUsageCode = getFormattedCode(BreadcrumbCodeExamples.basicUsage, 'html');
  componentSetupCode = getFormattedCode(BreadcrumbCodeExamples.componentSetup, 'typescript');
  basicSetupCode = getFormattedCode(BreadcrumbCodeExamples.basicSetup, 'typescript');
  multiLevelSetupCode = getFormattedCode(BreadcrumbCodeExamples.multiLevelSetup, 'typescript');
  singleItemSetupCode = getFormattedCode(BreadcrumbCodeExamples.singleItemSetup, 'typescript');
  interfaceCode = getFormattedCode(BreadcrumbCodeExamples.interface, 'typescript');
  withIconsCode = getFormattedCode(BreadcrumbCodeExamples.withIcons, 'html');
  withIconsSetupCode = getFormattedCode(BreadcrumbCodeExamples.withIconsSetup, 'typescript');
  propertyItemsCode = getFormattedCode(BreadcrumbCodeExamples.propertyItems, 'typescript');
  propertySeparatorCode = getFormattedCode(BreadcrumbCodeExamples.propertySeparator, 'typescript');
  propertyMaxItemsCode = getFormattedCode(BreadcrumbCodeExamples.propertyMaxItems, 'typescript');

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