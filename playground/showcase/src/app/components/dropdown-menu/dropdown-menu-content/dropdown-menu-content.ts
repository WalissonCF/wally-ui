import { Component, computed, effect, ElementRef, input, signal } from '@angular/core';

import { DropdownMenuService } from '../dropdown-menu.service';

export type DropdownPosition = 'bottom' | 'top' | 'left' | 'right';

@Component({
  selector: 'wally-dropdown-menu-content',
  imports: [],
  templateUrl: './dropdown-menu-content.html',
  styleUrl: './dropdown-menu-content.css'
})
export class DropdownMenuContent {
  position = input<DropdownPosition>('bottom');

  calculatedPosition = signal<DropdownPosition>('bottom');

  positionClasses = computed(() => {
    const position = this.calculatedPosition();
    const scrollClasses = 'max-h-96 overflow-visible';

    const positionMap = {
      bottom: 'top-full mt-1 left-0',
      top: 'bottom-full mb-1 left-0',
      right: 'left-full ml-1 top-0',
      left: 'right-full mr-1 top-0'
    };

    return `${scrollClasses} ${positionMap[position]}`;
  });

  constructor(
    public dropdownMenuService: DropdownMenuService,
    private elementRef: ElementRef
  ) {
    effect(() => {
      if (this.dropdownMenuService.isOpen()) {
        setTimeout(() => {
          const bestPosition = this.calculateBestPosition();
          this.calculatedPosition.set(bestPosition);
        }, 0);
      }
    });
  }

  /**
   * Measures available space around the trigger element in all directions.
   * @returns Object containing trigger dimensions and available space, or null if trigger not found
   */
  private measureAvailableSpace(): {
    triggerRect: any;
    spaceAbove: any;
    spaceBelow: number;
    spaceLeft: any;
    spaceRight: number;
  } | null {
    const triggerElement = this.elementRef.nativeElement.parentElement;

    if (!triggerElement) {
      return null;
    }

    const triggerRect = triggerElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const spaceAbove = triggerRect.top;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = viewportWidth - triggerRect.right;

    return {
      triggerRect,
      spaceAbove,
      spaceBelow,
      spaceLeft,
      spaceRight
    };
  }

  /**
   * Calculates the best position for the dropdown based on available viewport space.
   * Falls back to alternative positions if preferred position doesn't fit.
   * @returns The optimal dropdown position
   */
  private calculateBestPosition(): DropdownPosition {
    const space = this.measureAvailableSpace();

    if (!space) {
      return this.position();
    }

    const menuDimensions = this.getMenuDimensions();
    const MENU_MIN_HEIGHT = menuDimensions.height + 20;
    const MENU_MIN_WIDTH = menuDimensions.width + 20;

    const preferred = this.position();

    switch (preferred) {
      case 'bottom':
        if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
        if (space.spaceAbove >= MENU_MIN_HEIGHT) return 'top';
        if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
        return 'left';

      case 'top':
        if (space.spaceAbove >= MENU_MIN_HEIGHT) return 'top';
        if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
        if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
        return 'left';

      case 'right':
        if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
        if (space.spaceLeft >= MENU_MIN_WIDTH) return 'left';
        if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
        return 'top';

      case 'left':
        if (space.spaceLeft >= MENU_MIN_WIDTH) return 'left';
        if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
        if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
        return 'top';

      default:
        return 'bottom';
    }
  }

  private getMenuDimensions(): {
    height: number;
    width: number;
  } {
    const menuElement = this.elementRef.nativeElement.querySelector('[role="menu"]');

    if (!menuElement) {
      return {
        height: 200,
        width: 224
      };
    }

    const rect = menuElement.getBoundingClientRect();

    return {
      height: rect.height || 200,
      width: rect.width || 224
    };
  }

  onMouseEnter(): void {
    if (this.dropdownMenuService.triggerMode() === 'hover') {
      this.dropdownMenuService.setHoveringContent(true);
    }
  }

  onMouseLeave(): void {
    if (this.dropdownMenuService.triggerMode() === 'hover') {
      this.dropdownMenuService.setHoveringContent(false);

      setTimeout(() => {
        if (!this.dropdownMenuService.isHoveringContent()) {
          this.dropdownMenuService.close();
        }
      }, 100);
    }
  }
}
