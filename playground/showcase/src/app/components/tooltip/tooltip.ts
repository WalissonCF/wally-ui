import { Component, computed, effect, ElementRef, input, InputSignal, OnDestroy, signal, ViewChild, WritableSignal } from '@angular/core';
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
  actualPosition = signal<Exclude<TooltipPosition, 'auto'>>('top');
  tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  private showTimeout?: number;
  private hideTimeout?: number;

  tooltipClasses = computed(() => {
    const base = 'absolute z-50 py-1.5 px-3 text-sm text-white bg-[#121212] shadow-lg whitespace-nowrap pointer-events-none rounded-xl';
    const darkMode = 'dark:bg-white dark:text-[#121212]';

    const positions = {
      top: `bottom-full left-1/2 -translate-x-1/2 mb-${this.offset()}`,
      bottom: `top-full left-1/2 -translate-x-1/2 mt-${this.offset()}`,
      left: `right-full top-1/2 -translate-y-1/2 mr-${this.offset()}`,
      right: `left-full top-1/2 -translate-y-1/2 ml-${this.offset()}`
    };

    // Animação super suave - apenas fade rápido
    const animation = this.visible()
      ? 'transition-opacity duration-150 opacity-100'
      : 'transition-opacity duration-100 opacity-0';

    return `${base} ${darkMode} ${positions[this.actualPosition()]} ${animation}`;
  });

  constructor(
    private elementRef: ElementRef
  ) {
    effect(() => {
      if (this.visible() && this.position() === 'auto') {
        setTimeout(() => this.calculateBestPosition(), 10);
      }
    });
  }

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
      this.visible.set(true);

      if (this.position() !== 'auto') {
        this.actualPosition.set(this.position() as Exclude<TooltipPosition, 'auto'>);
      }
    }, this.delay());
  }

  hide(): void {
    if (this.showTimeout) {
      window.clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    this.hideTimeout = window.setTimeout(() => {
      this.visible.set(false);
    }, 100);
  }

  private calculateBestPosition() {
    const hostElement =
      this.elementRef.nativeElement.querySelector('.tooltip-wrapper');
    if (!hostElement) return;

    const rect = hostElement.getBoundingClientRect();
    const tooltipEl = this.tooltipElement?.nativeElement;
    if (!tooltipEl) return;

    const tooltipRect = tooltipEl.getBoundingClientRect();
    const offset = this.offset();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const spaceAbove = rect.top;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceLeft = rect.left;
    const spaceRight = viewportWidth - rect.right;

    const tooltipWidth = tooltipRect.width || 150;
    const tooltipHeight = tooltipRect.height || 40;

    const positions: {
      position: Exclude<TooltipPosition, 'auto'>; space: number; isValid: boolean}[] = [
        {
          position: 'top',
          space: spaceAbove,
          isValid: spaceAbove >= tooltipHeight + offset
        },
        {
          position: 'bottom',
          space: spaceBelow,
          isValid: spaceBelow >= tooltipHeight + offset
        },
        {
          position: 'left',
          space: spaceLeft,
          isValid: spaceLeft >= tooltipWidth + offset
        },
        {
          position: 'right',
          space: spaceRight,
          isValid: spaceRight >= tooltipWidth + offset
        }
      ];

    const priorityOrder: Exclude<TooltipPosition, 'auto'>[] = ['top', 'bottom', 'right', 'left'];

    let bestPosition: Exclude<TooltipPosition, 'auto'> = 'top';

    for (const preferred of priorityOrder) {
      const pos = positions.find(p => p.position === preferred);
      if (pos?.isValid) {
        bestPosition = preferred;
        break;
      }
    }

    if (!positions.find(p => p.position ===
      bestPosition)?.isValid) {
      const maxSpace = positions.reduce((max, pos) => pos.space >
        max.space ? pos : max, positions[0]);
      bestPosition = maxSpace.position;
    }

    this.actualPosition.set(bestPosition);

    setTimeout(() => {
      const updatedTooltipRect = tooltipEl.getBoundingClientRect();
      const padding = 8;

      if (bestPosition === 'top' || bestPosition === 'bottom') {
        if (updatedTooltipRect.left < padding) {
          const shift = padding - updatedTooltipRect.left;
          tooltipEl.style.transform = `translateX(${shift}px)`;
        } else if (updatedTooltipRect.right > viewportWidth - padding) {
          const shift = (viewportWidth - padding) - updatedTooltipRect.right;
          tooltipEl.style.transform = `translateX(${shift}px)`;
        }
      }

      if (bestPosition === 'left' || bestPosition === 'right') {
        if (updatedTooltipRect.top < padding) {
          const shift = padding - updatedTooltipRect.top;
          tooltipEl.style.transform = `translateY(${shift}px)`;
        } else if (updatedTooltipRect.bottom > viewportHeight - padding) {
          const shift = (viewportHeight - padding) - updatedTooltipRect.bottom;
          tooltipEl.style.transform = `translateY(${shift}px)`;
        }
      }
    }, 0);
  }
}
