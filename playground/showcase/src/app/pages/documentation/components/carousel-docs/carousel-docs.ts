import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Carousel } from '../../../../components/carousel/carousel';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { CarouselCodeExamples } from './carousel-docs.examples';
import { getFormattedCode } from '../../../../core/utils/prism';

@Component({
  selector: 'wally-carousel-docs',
  imports: [
    Carousel,
    Breadcrumb
  ],
  templateUrl: './carousel-docs.html',
  styleUrl: './carousel-docs.css'
})
export class CarouselDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Carousel' }
  ];

  // Code examples with highlighting
  installationCode = getFormattedCode(CarouselCodeExamples.installation, 'bash');
  importCode = getFormattedCode(CarouselCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(CarouselCodeExamples.componentImport, 'typescript');
  basicUsageCode = getFormattedCode(CarouselCodeExamples.basicUsage, 'html');
  withNavigationIndicatorsCode = getFormattedCode(CarouselCodeExamples.withNavigationIndicators, 'html');
  imageCarouselCode = getFormattedCode(CarouselCodeExamples.imageCarousel, 'html');
  productShowcaseCode = getFormattedCode(CarouselCodeExamples.productShowcase, 'html');
  customContentCode = getFormattedCode(CarouselCodeExamples.customContent, 'html');
  responsiveExampleCode = getFormattedCode(CarouselCodeExamples.responsiveExample, 'html');

  propertyIsNavigationIndicatorCode = getFormattedCode(CarouselCodeExamples.propertyIsNavigationIndicator, 'typescript');
  propertyTotalItemsCountCode = getFormattedCode(CarouselCodeExamples.propertyTotalItemsCount, 'typescript');
  propertyCurrentVisibleItemIndexCode = getFormattedCode(CarouselCodeExamples.propertyCurrentVisibleItemIndex, 'typescript');
  propertyNavigationIndicatorsArrayCode = getFormattedCode(CarouselCodeExamples.propertyNavigationIndicatorsArray, 'typescript');

  apiMethodsCode = getFormattedCode(CarouselCodeExamples.apiMethods, 'typescript');
  keyboardShortcutsCode = getFormattedCode(CarouselCodeExamples.keyboardShortcuts, 'typescript');
  touchGesturesCode = getFormattedCode(CarouselCodeExamples.touchGestures, 'typescript');

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
