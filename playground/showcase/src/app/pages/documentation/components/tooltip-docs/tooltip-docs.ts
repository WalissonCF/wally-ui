import { Component } from '@angular/core';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { TooltipCodeExamples } from './tooltip-docs.examples';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../../components/button/button';
import { Tooltip } from '../../../../components/tooltip/tooltip';
import { Input } from '../../../../components/input/input';

@Component({
  selector: 'app-tooltip-docs',
  imports: [
    Button,
    Breadcrumb,
    Tooltip,
    Input
  ],
  templateUrl: './tooltip-docs.html',
  styleUrl: './tooltip-docs.css'
})
export class TooltipDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Tooltip' }
  ];

  // Installation & Import
  installationCode = getFormattedCode(TooltipCodeExamples.installation, 'bash');
  importCode = getFormattedCode(TooltipCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(TooltipCodeExamples.componentImport, 'typescript');
  basicUsageCode = getFormattedCode(TooltipCodeExamples.basicUsage, 'html');

  // Positioning
  positionsCode = getFormattedCode(TooltipCodeExamples.positions, 'html');

  // Examples
  withButtonCode = getFormattedCode(TooltipCodeExamples.withButton, 'html');
  withIconCode = getFormattedCode(TooltipCodeExamples.withIcon, 'html');
  customDelayCode = getFormattedCode(TooltipCodeExamples.customDelay, 'html');
  disabledCode = getFormattedCode(TooltipCodeExamples.disabled, 'html');
  customOffsetCode = getFormattedCode(TooltipCodeExamples.customOffset, 'html');

  // Production Examples
  dashboardCode = getFormattedCode(TooltipCodeExamples.dashboard, 'html');
  formFieldCode = getFormattedCode(TooltipCodeExamples.formField, 'html');
  navigationCode = getFormattedCode(TooltipCodeExamples.navigation, 'html');
  avatarCode = getFormattedCode(TooltipCodeExamples.avatar, 'html');
  statusBadgeCode = getFormattedCode(TooltipCodeExamples.statusBadge, 'html');

  // Future Features
  richContentCode = getFormattedCode(TooltipCodeExamples.richContent, 'html');

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
