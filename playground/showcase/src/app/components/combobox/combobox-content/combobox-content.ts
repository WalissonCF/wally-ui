import { Component, computed, effect, ElementRef, HostListener, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComboboxService } from '../lib/service/combobox.service';
import { ComboboxPosition } from '../lib/types/combobox-position.type';
import { ComboboxItem } from '../combobox-item/combobox-item';
import { ComboboxEmpty } from '../combobox-empty/combobox-empty';
import { ComboboxGroup } from '../combobox-group/combobox-group';
import { ComboboxSearch } from '../combobox-search/combobox-search';

@Component({
  selector: 'wally-combobox-content',
  imports: [
    CommonModule,
    ComboboxItem,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxSearch
  ],
  templateUrl: './combobox-content.html',
  styleUrl: './combobox-content.css'
})
export class ComboboxContent {
  comboboxService = inject(ComboboxService);
  private elementRef = inject(ElementRef);

  position = input<ComboboxPosition>('bottom');

  calculatedPosition = signal<ComboboxPosition>('bottom');

  positionClasses = computed(() => {
    const position = this.calculatedPosition();
    const scrollClasses = 'max-h-96 overflow-y-auto';

    const positionMap = {
      bottom: 'top-full mt-2 left-0',
      top: 'bottom-full mb-2 left-0',
      right: 'left-full ml-2 top-0',
      left: 'right-full mr-2 top-0'
    };

    return `${scrollClasses} ${positionMap[position]}`;
  });

  constructor() {
    // Recalcular ao abrir
    effect(() => {
      if (this.comboboxService.isOpen()) {
        setTimeout(() => {
          const bestPosition = this.calculateBestPosition();
          this.calculatedPosition.set(bestPosition);
        }, 0);
      }
    });
  }

  /**
   * Recalculates position on window resize to maintain optimal placement
   */
  @HostListener('window:resize')
  onResize(): void {
    if (this.comboboxService.isOpen()) {
      const bestPosition = this.calculateBestPosition();
      this.calculatedPosition.set(bestPosition);
    }
  }

  /**
   * Close on Escape key
   */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.comboboxService.isOpen()) {
      this.comboboxService.close();
    }
  }

  /**
   * Close when clicking outside
   */
  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.comboboxService.isOpen()) return;

    const contentElement = this.elementRef.nativeElement;
    const triggerElement = contentElement.parentElement;

    const clickedInside = contentElement.contains(event.target as Node);
    const clickedTrigger = triggerElement?.contains(event.target as Node);

    if (!clickedInside && !clickedTrigger) {
      this.comboboxService.close();
    }
  }

  /**
   * Measures available space around the trigger element in all directions.
   * Pattern from dropdown-menu-content.ts
   */
  private measureAvailableSpace(): {
    triggerRect: DOMRect;
    spaceAbove: number;
    spaceBelow: number;
    spaceLeft: number;
    spaceRight: number;
  } | null {
    const triggerElement = this.elementRef.nativeElement.parentElement;

    if (!triggerElement) return null;

    const triggerRect = triggerElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      triggerRect,
      spaceAbove: triggerRect.top,
      spaceBelow: viewportHeight - triggerRect.bottom,
      spaceLeft: triggerRect.left,
      spaceRight: viewportWidth - triggerRect.right
    };
  }

  /**
   * Calculates the best position for the combobox based on available viewport space.
   * Falls back to alternative positions if preferred position doesn't fit.
   * If no position has enough space, chooses the direction with the most available space.
   */
  private calculateBestPosition(): ComboboxPosition {
    const space = this.measureAvailableSpace();

    if (!space) return this.position();

    const menuDimensions = this.getMenuDimensions();
    const MENU_MIN_HEIGHT = menuDimensions.height + 20;
    const MENU_MIN_WIDTH = menuDimensions.width + 20;

    const preferred = this.position();

    // Try preferred position first, then fallbacks
    switch (preferred) {
      case 'bottom':
        if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
        if (space.spaceAbove >= MENU_MIN_HEIGHT) return 'top';
        if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
        if (space.spaceLeft >= MENU_MIN_WIDTH) return 'left';
        break;

      case 'top':
        if (space.spaceAbove >= MENU_MIN_HEIGHT) return 'top';
        if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
        if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
        if (space.spaceLeft >= MENU_MIN_WIDTH) return 'left';
        break;

      case 'right':
        if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
        if (space.spaceLeft >= MENU_MIN_WIDTH) return 'left';
        if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
        if (space.spaceAbove >= MENU_MIN_HEIGHT) return 'top';
        break;

      case 'left':
        if (space.spaceLeft >= MENU_MIN_WIDTH) return 'left';
        if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
        if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
        if (space.spaceAbove >= MENU_MIN_HEIGHT) return 'top';
        break;
    }

    // If no position has enough space, choose the one with the most space
    const maxVerticalSpace = Math.max(space.spaceAbove, space.spaceBelow);
    const maxHorizontalSpace = Math.max(space.spaceLeft, space.spaceRight);

    // Prefer vertical positions (bottom/top) over horizontal
    if (maxVerticalSpace >= maxHorizontalSpace) {
      return space.spaceBelow >= space.spaceAbove ? 'bottom' : 'top';
    } else {
      return space.spaceRight >= space.spaceLeft ? 'right' : 'left';
    }
  }

  /**
   * Gets actual rendered dimensions of the dropdown menu
   */
  private getMenuDimensions(): { height: number; width: number } {
    const menuElement = this.elementRef.nativeElement.querySelector('[role="listbox"]');

    if (!menuElement) {
      return {
        height: 384, // max-h-96 = 384px
        width: 288   // min-w-72 = 288px
      };
    }

    const rect = menuElement.getBoundingClientRect();

    return {
      height: rect.height || 384,
      width: rect.width || 288
    };
  }

  /**
   * Calculates global index for grouped items
   */
  getGlobalIndex(groupIndex: number, itemIndex: number): number {
    const groups = this.comboboxService.groupedData();
    if (!groups) return itemIndex;

    let globalIndex = 0;
    for (let i = 0; i < groupIndex; i++) {
      globalIndex += groups[i].items.length;
    }
    return globalIndex + itemIndex;
  }
}
