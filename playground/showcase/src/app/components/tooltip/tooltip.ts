import { Component, computed, ElementRef, input, InputSignal, OnDestroy, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

@Component({
  selector: 'wally-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css'
})
export class Tooltip implements OnDestroy {
  @ViewChild('tooltipElement', { read: ElementRef }) tooltipElement?: ElementRef<HTMLDivElement>;

  text: InputSignal<string> = input.required<string>();
  position: InputSignal<TooltipPosition> = input<TooltipPosition>('auto');
  delay: InputSignal<number> = input<number>(200);
  disabled: InputSignal<boolean> = input<boolean>(false);
  offset: InputSignal<number> = input<number>(2);

  visible: WritableSignal<boolean> = signal<boolean>(false);
  actualPosition: WritableSignal<"top" | "bottom" | "left" | "right"> = signal<Exclude<TooltipPosition, 'auto'>>('top');
  tooltipId: string = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  isPositioned: WritableSignal<boolean> = signal<boolean>(false);

  private showTimeout?: number;
  private hideTimeout?: number;

  tooltipClasses = computed(() => {
    const base = 'absolute z-10 py-1.5 px-3 text-sm text-white font-medium bg-[#121212] shadow-lg whitespace-nowrap pointer-events-none rounded-xl';
    const darkMode = 'dark:bg-white dark:text-[#121212]';

    const positions = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const animation = this.visible() && this.isPositioned()
      ? 'transition-opacity duration-150 opacity-100'
      : 'opacity-0';

    return `${base} ${darkMode} ${positions[this.actualPosition()]} ${animation}`;
  });

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnDestroy() {
    if (this.showTimeout) {
      window.clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
    }
  }

  show(): void {
    if (this.disabled()) {
      return;
    }

    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }

    this.showTimeout = window.setTimeout(() => {
      // Set initial position
      if (this.position() !== 'auto') {
        this.actualPosition.set(this.position() as Exclude<TooltipPosition, 'auto'>);
      }

      // Make tooltip visible with opacity 0 to measure it
      this.visible.set(true);

      // Calculate best position before showing (next frame after DOM update)
      requestAnimationFrame(() => {
        this.calculateBestPosition();
      });
    }, this.delay());
  }

  hide(): void {
    if (this.showTimeout) {
      window.clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    this.hideTimeout = window.setTimeout(() => {
      this.visible.set(false);
      this.isPositioned.set(false); // Reset positioning flag
    }, 100);
  }

  /**
   * Calculates the best position for the tooltip based on available viewport space.
   *
   * This method intelligently positions the tooltip to ensure it remains fully visible
   * within the viewport boundaries. It respects the user's preferred position but will
   * automatically switch to an alternative position if the preferred one doesn't fit.
   *
   * **Algorithm Steps:**
   * 1. Measures available space in all four directions (top, bottom, left, right)
   * 2. Validates each position considering:
   *    - Tooltip dimensions (width/height)
   *    - Viewport boundaries
   *    - Required offset and padding (8px each)
   * 3. Determines priority order:
   *    - If `position="auto"`: tries top → bottom → right → left
   *    - If specific position: tries that position first, then fallback to others
   * 4. Selects the first valid position from priority order
   * 5. If no position is fully valid, selects the one with most available space
   * 6. Applies fine-tuning adjustments:
   *    - For top/bottom: shifts horizontally if edges overflow
   *    - For left/right: shifts vertically if edges overflow
   *
   * **Position Validation:**
   * - **Top/Bottom**: Checks if there's enough vertical space AND tooltip fits horizontally
   * - **Left/Right**: Checks if there's enough horizontal space AND tooltip fits vertically
   *
   * **Viewport Adjustment:**
   * - Uses `calc()` to adjust `left` or `top` CSS properties
   * - Preserves Tailwind's `-translate-x-1/2` and `-translate-y-1/2` transforms
   * - Ensures 8px minimum padding from all viewport edges
   *
   * @example
   * // User specifies position="bottom"
   * // If bottom doesn't fit → tries top → right → left
   * // Applies horizontal shift if tooltip overflows left/right edges
   *
   * @returns void
   */
  private calculateBestPosition() {
    const wrapperElement = this.elementRef.nativeElement.querySelector('.tooltip-wrapper');
    if (!wrapperElement) {
      return;
    }

    const tooltipElement = this.tooltipElement?.nativeElement;
    if (!tooltipElement) {
      return;
    }

    const wrapperBounds = wrapperElement.getBoundingClientRect();
    const tooltipBounds = tooltipElement.getBoundingClientRect();

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Available space in each direction from the wrapper element
    const availableSpaceAbove = wrapperBounds.top;
    const availableSpaceBelow = viewportHeight - wrapperBounds.bottom;
    const availableSpaceLeft = wrapperBounds.left;
    const availableSpaceRight = viewportWidth - wrapperBounds.right;

    // Actual tooltip dimensions
    const tooltipWidth = tooltipBounds.width;
    const tooltipHeight = tooltipBounds.height;

    // Fixed spacing values (8px each = 0.5rem in Tailwind)
    const offsetFromWrapper = 8; // Gap between tooltip and wrapper
    const edgePadding = 8; // Minimum distance from viewport edges

    // Calculate horizontal center position of the wrapper
    const wrapperCenterX = wrapperBounds.left + wrapperBounds.width / 2;
    const wrapperCenterY = wrapperBounds.top + wrapperBounds.height / 2;

    // Calculate where tooltip edges would be when centered
    const tooltipLeftEdgeWhenCentered = wrapperCenterX - tooltipWidth / 2;
    const tooltipRightEdgeWhenCentered = wrapperCenterX + tooltipWidth / 2;
    const tooltipTopEdgeWhenCentered = wrapperCenterY - tooltipHeight / 2;
    const tooltipBottomEdgeWhenCentered = wrapperCenterY + tooltipHeight / 2;

    // Check if tooltip fits within viewport for each position
    const positionValidations: {
      position: Exclude<TooltipPosition, 'auto'>;
      availableSpace: number;
      fitsInViewport: boolean;
      fitsHorizontally?: boolean;
      fitsVertically?: boolean;
    }[] = [
        {
          position: 'top',
          availableSpace: availableSpaceAbove,
          fitsInViewport: availableSpaceAbove >= tooltipHeight + offsetFromWrapper + edgePadding,
          fitsHorizontally: tooltipLeftEdgeWhenCentered >= edgePadding &&
            tooltipRightEdgeWhenCentered <= viewportWidth - edgePadding
        },
        {
          position: 'bottom',
          availableSpace: availableSpaceBelow,
          fitsInViewport: availableSpaceBelow >= tooltipHeight + offsetFromWrapper + edgePadding,
          fitsHorizontally: tooltipLeftEdgeWhenCentered >= edgePadding &&
            tooltipRightEdgeWhenCentered <= viewportWidth - edgePadding
        },
        {
          position: 'left',
          availableSpace: availableSpaceLeft,
          fitsInViewport: availableSpaceLeft >= tooltipWidth + offsetFromWrapper + edgePadding,
          fitsVertically: tooltipTopEdgeWhenCentered >= edgePadding &&
            tooltipBottomEdgeWhenCentered <= viewportHeight - edgePadding
        },
        {
          position: 'right',
          availableSpace: availableSpaceRight,
          fitsInViewport: availableSpaceRight >= tooltipWidth + offsetFromWrapper + edgePadding,
          fitsVertically: tooltipTopEdgeWhenCentered >= edgePadding &&
            tooltipBottomEdgeWhenCentered <= viewportHeight - edgePadding
        }
      ];

    // Determine which positions to try, in order of preference
    let positionsToTryInOrder: Exclude<TooltipPosition, 'auto'>[];

    if (this.position() === 'auto') {
      // Auto mode: use default priority order
      positionsToTryInOrder = ['top', 'bottom', 'right', 'left'];
    } else {
      // Specific position: try user's preference first, then fallback to others
      const userPreferredPosition = this.position() as Exclude<TooltipPosition, 'auto'>;
      const allOtherPositions = (['top', 'bottom', 'right', 'left'] as Exclude<TooltipPosition, 'auto'>[])
        .filter(position => position !== userPreferredPosition);

      positionsToTryInOrder = [userPreferredPosition, ...allOtherPositions];
    }

    // Find the first position that fits completely in the viewport
    let finalSelectedPosition: Exclude<TooltipPosition, 'auto'> = positionsToTryInOrder[0];

    for (const candidatePosition of positionsToTryInOrder) {
      const validation = positionValidations.find(v => v.position === candidatePosition);
      if (validation?.fitsInViewport) {
        finalSelectedPosition = candidatePosition;
        break;
      }
    }

    // Fallback: if no position fits, use the one with most available space
    const currentPositionValidation = positionValidations.find(v => v.position === finalSelectedPosition);
    if (!currentPositionValidation?.fitsInViewport) {
      const positionWithMostSpace = positionValidations.reduce((best, current) =>
        current.availableSpace > best.availableSpace ? current : best,
        positionValidations[0]
      );
      finalSelectedPosition = positionWithMostSpace.position;
    }

    this.actualPosition.set(finalSelectedPosition);

    // Apply fine-tuning adjustments after position is set
    requestAnimationFrame(() => {
      // Mark as positioned to trigger fade-in animation
      this.isPositioned.set(true);


      const tooltipBoundsAfterPositioning = tooltipElement.getBoundingClientRect();

      // Reset any previous adjustments
      tooltipElement.style.left = '';
      tooltipElement.style.top = '';

      // Adjust horizontal position for top/bottom tooltips that overflow edges
      if (finalSelectedPosition === 'top' || finalSelectedPosition === 'bottom') {
        let horizontalAdjustment = 0;

        // Check if tooltip overflows left edge
        if (tooltipBoundsAfterPositioning.left < edgePadding) {
          horizontalAdjustment = edgePadding - tooltipBoundsAfterPositioning.left;
        }
        // Check if tooltip overflows right edge
        else if (tooltipBoundsAfterPositioning.right > viewportWidth - edgePadding) {
          horizontalAdjustment = (viewportWidth - edgePadding) - tooltipBoundsAfterPositioning.right;
        }

        if (horizontalAdjustment !== 0) {
          // Shift tooltip while preserving centered alignment
          tooltipElement.style.left = `calc(50% + ${horizontalAdjustment}px)`;
        }
      }

      // Adjust vertical position for left/right tooltips that overflow edges
      if (finalSelectedPosition === 'left' || finalSelectedPosition === 'right') {
        let verticalAdjustment = 0;

        // Check if tooltip overflows top edge
        if (tooltipBoundsAfterPositioning.top < edgePadding) {
          verticalAdjustment = edgePadding - tooltipBoundsAfterPositioning.top;
        }
        // Check if tooltip overflows bottom edge
        else if (tooltipBoundsAfterPositioning.bottom > viewportHeight - edgePadding) {
          verticalAdjustment = (viewportHeight - edgePadding) - tooltipBoundsAfterPositioning.bottom;
        }

        if (verticalAdjustment !== 0) {
          // Shift tooltip while preserving centered alignment
          tooltipElement.style.top = `calc(50% + ${verticalAdjustment}px)`;
        }
      }
    });
  }
}
