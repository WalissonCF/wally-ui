import { Component } from '@angular/core';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { DropdownMenuCodeExamples } from './dropdown-menu-docs.examples';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../../components/button/button';
import { DropdownMenu } from '../../../../components/dropdown-menu/dropdown-menu';
import { DropdownMenuTrigger } from '../../../../components/dropdown-menu/dropdown-menu-trigger/dropdown-menu-trigger';
import { DropdownMenuContent } from '../../../../components/dropdown-menu/dropdown-menu-content/dropdown-menu-content';
import { DropdownMenuItem } from '../../../../components/dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { DropdownMenuLabel } from '../../../../components/dropdown-menu/dropdown-menu-label/dropdown-menu-label';
import { DropdownMenuSeparator } from '../../../../components/dropdown-menu/dropdown-menu-separator/dropdown-menu-separator';
import { DropdownMenuGroup } from '../../../../components/dropdown-menu/dropdown-menu-group/dropdown-menu-group';
import { DropdownMenuSub } from '../../../../components/dropdown-menu/dropdown-menu-sub/dropdown-menu-sub';
import { DropdownMenuSubTrigger } from '../../../../components/dropdown-menu/dropdown-menu-sub-trigger/dropdown-menu-sub-trigger';
import { DropdownMenuSubContent } from '../../../../components/dropdown-menu/dropdown-menu-sub-content/dropdown-menu-sub-content';

@Component({
  selector: 'app-dropdown-menu-docs',
  imports: [
    Button,
    Breadcrumb,
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
  templateUrl: './dropdown-menu-docs.html'
})
export class DropdownMenuDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Dropdown Menu' }
  ];

  installationCode = getFormattedCode(DropdownMenuCodeExamples.installation, 'bash');
  importCode = getFormattedCode(DropdownMenuCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(DropdownMenuCodeExamples.componentImport, 'typescript');

  basicUsageCode = getFormattedCode(DropdownMenuCodeExamples.basicUsage, 'html');
  withLabelCode = getFormattedCode(DropdownMenuCodeExamples.withLabel, 'html');
  withGroupsCode = getFormattedCode(DropdownMenuCodeExamples.withGroups, 'html');
  withSubmenusCode = getFormattedCode(DropdownMenuCodeExamples.withSubmenus, 'html');
  withIconsCode = getFormattedCode(DropdownMenuCodeExamples.withIcons, 'html');
  hoverModeCode = getFormattedCode(DropdownMenuCodeExamples.hoverMode, 'html');
  positioningCode = getFormattedCode(DropdownMenuCodeExamples.positioning, 'html');
  disabledItemsCode = getFormattedCode(DropdownMenuCodeExamples.disabledItems, 'html');
  destructiveActionCode = getFormattedCode(DropdownMenuCodeExamples.destructiveAction, 'html');
  componentTsCode = getFormattedCode(DropdownMenuCodeExamples.componentTs, 'typescript');
  realWorldExampleCode = getFormattedCode(DropdownMenuCodeExamples.realWorldExample, 'html');
  nestedSubmenuExampleCode = getFormattedCode(DropdownMenuCodeExamples.nestedSubmenuExample, 'html');
  centeredPositionCode = getFormattedCode(DropdownMenuCodeExamples.centeredPosition, 'html');

  constructor(
    private aiPromptService: AiPromptService
  ) { }

  onProfile(): void {
    console.log('Navigate to profile');
  }

  onSettings(): void {
    console.log('Navigate to settings');
  }

  onBilling(): void {
    console.log('Navigate to billing');
  }

  onLogout(): void {
    console.log('User logged out');
  }

  onNew(): void {
    console.log('New action');
  }

  onOpen(): void {
    console.log('Open action');
  }

  onEdit(): void {
    console.log('Edit action');
  }

  onDuplicate(): void {
    console.log('Duplicate action');
  }

  onArchive(): void {
    console.log('Archive action');
  }

  onDelete(): void {
    console.log('Delete action');
  }

  onShareEmail(): void {
    console.log('Share via email');
  }

  onShareLink(): void {
    console.log('Copy share link');
  }

  onShareSocial(): void {
    console.log('Share on social media');
  }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }
}
