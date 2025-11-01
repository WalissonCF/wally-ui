import { Component, computed, effect, ElementRef, signal } from '@angular/core';
import { DropdownMenuSubService } from '../dropdown-menu-sub.service';

export type SubmenuPosition = 'right' | 'left' | 'bottom' | 'top';

@Component({
  selector: 'wally-dropdown-menu-sub-content',
  imports: [],
  templateUrl: './dropdown-menu-sub-content.html',
  styleUrl: './dropdown-menu-sub-content.css'
})
export class DropdownMenuSubContent {
  calculatedPosition = signal<SubmenuPosition>('right');
  isPositioned = signal<boolean>(false);

  positionClasses = computed(() => {
    const position = this.calculatedPosition();

    const positionMap = {
      right: 'top-0 left-full -ml-2',
      left: 'top-0 right-full -mr-2',
      bottom: 'left-0 top-full -mt-2',
      top: 'left-0 bottom-full -mb-2'
    };

    return positionMap[position];
  });

  constructor(
    public subService: DropdownMenuSubService,
    private elementRef: ElementRef
  ) {
    effect(() => {
      if (this.subService.isOpen()) {
        this.isPositioned.set(false);
        setTimeout(() => {
          const bestPosition = this.calculateBestPosition();
          this.calculatedPosition.set(bestPosition);
          this.isPositioned.set(true);
        }, 0);
      } else {
        this.isPositioned.set(false);
      }
    });
  }

  /**
   * Measures available space around the trigger element in all directions.
   * @returns Object containing trigger dimensions and available space, or null if trigger not found
   */
  private measureAvailableSpace(): {
    triggerRect: DOMRect;
    spaceAbove: number;
    spaceBelow: number;
    spaceLeft: number;
    spaceRight: number;
  } | null {
    const triggerElement = this.elementRef.nativeElement.parentElement;

    if (!triggerElement) {
      return null;
    }

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
   * Calculates the best position for the submenu based on available viewport space.
   * Prioritizes right/left (horizontal) over top/bottom (vertical) for submenus.
   * Always uses the same priority order: right → left → bottom → top
   * @returns The optimal submenu position
   */
  private calculateBestPosition(): SubmenuPosition {
    const space = this.measureAvailableSpace();

    if (!space) {
      return 'right';
    }

    const menuDimensions = this.getMenuDimensions();
    const MENU_MIN_HEIGHT = menuDimensions.height + 20;
    const MENU_MIN_WIDTH = menuDimensions.width + 20;

    // Always use same priority for submenus: right → left → bottom → top
    if (space.spaceRight >= MENU_MIN_WIDTH) return 'right';
    if (space.spaceLeft >= MENU_MIN_WIDTH) return 'left';
    if (space.spaceBelow >= MENU_MIN_HEIGHT) return 'bottom';
    return 'top';
  }

  /**
   * Gets the submenu dimensions from the DOM.
   * @returns Height and width of the submenu
   */
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
    this.subService.setHoveringContent(true);
    this.subService.open();
  }

  onMouseLeave(): void {
    this.subService.setHoveringContent(false);

    setTimeout(() => {
      if (!this.subService.isHoveringContent()) {
        this.subService.close();
      }
    }, 100);
  }
}
