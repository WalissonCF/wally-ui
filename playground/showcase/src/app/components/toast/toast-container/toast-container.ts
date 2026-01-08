import { Component, computed, inject, Signal, signal } from '@angular/core';

import { ToastPosition } from '../lib/types/toast-position.type';
import { ToastService } from '../lib/services/toast.service';
import { ToastItem } from '../toast-item/toast-item';
import { Toast } from '../lib/models/toast.model';

@Component({
  selector: 'wally-toast-container',
  imports: [ToastItem],
  templateUrl: './toast-container.html',
  // standalone: true, (If your application is lower than Angular 19, uncomment this line)
})
export class ToastContainer {
  private toastService = inject(ToastService);

  private readonly MAX_VISIBLE = 5;

  private hoverStates = new Map<ToastPosition, ReturnType<typeof signal<boolean>>>();

  toastsByPosition: Signal<Record<ToastPosition, Toast[]>> = computed(() => {
    const toasts = this.toastService.toasts();
    const grouped: Record<ToastPosition, Toast[]> = {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'center-left': [],
      'center': [],
      'center-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': []
    };

    toasts.forEach(toast => {
      const position = toast.position || 'top-center';
      grouped[position].push(toast);
    });

    return grouped;
  });

  visiblePositions: Signal<ToastPosition[]> = computed(() => {
    const grouped = this.toastsByPosition();
    return (Object.keys(grouped) as ToastPosition[]).filter(
      pos => grouped[pos].length > 0
    );
  });

  getPositionClasses(position: ToastPosition): string {
    const positionMap: Record<ToastPosition, string> = {
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'top-right': 'top-4 right-4',
      'center-left': 'top-1/2 left-4 -translate-y-1/2',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'center-right': 'top-1/2 right-4 -translate-y-1/2',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4'
    };
    return positionMap[position];
  }

  getTransformOrigin(position: ToastPosition): string {
    if (position.startsWith('top')) return 'top';
    if (position.startsWith('bottom')) return 'bottom';
    return 'center';
  }

  /**
   * Gets toasts for a position, limiting to MAX_VISIBLE (5) newest.
   *
   * @remarks
   * - slice(-5): Gets last 5 toasts (newest)
   * - reverse(): Puts newest first (index 0 = front of stack)
   */
  getToastsForPosition(position: ToastPosition): Toast[] {
    const toasts = this.toastsByPosition()[position];
    return toasts.slice(-this.MAX_VISIBLE).reverse();
  }

  getVisualIndex(toast: Toast, position: ToastPosition): number {
    const toasts = this.getToastsForPosition(position);
    return toasts.indexOf(toast);
  }

  trackByToastId(_index: number, toast: Toast): number {
    return toast.id;
  }

  getHoverSignal(position: ToastPosition): Signal<boolean> {
    if (!this.hoverStates.has(position)) {
      this.hoverStates.set(position, signal(false));
    }
    return this.hoverStates.get(position)!;
  }

  onMouseEnter(position: ToastPosition): void {
    const hoverSignal = this.hoverStates.get(position);
    if (hoverSignal) {
      hoverSignal.set(true);
    } else {
      this.hoverStates.set(position, signal(true));
    }

    const toasts = this.getToastsForPosition(position);
    toasts.forEach(toast => {
      this.toastService.pause(toast.id);
    });
  }

  onMouseLeave(position: ToastPosition): void {
    const hoverSignal = this.hoverStates.get(position);
    if (hoverSignal) {
      hoverSignal.set(false);
    }

    const toasts = this.getToastsForPosition(position);
    toasts.forEach(toast => {
      this.toastService.resume(toast.id);
    });
  }

  /**
   * Calculates container height for stacking effect.
   *
   * @remarks
   * Hovered: 'auto' - flexbox with gap-3 handles spacing
   *
   * Stacked: 64px base + 8px per additional toast
   * - 1 toast: 64px
   * - 2 toasts: 64 + 8 = 72px
   * - 5 toasts: 64 + 32 = 96px
   *
   * The 8px matches the visible border offset between stacked toasts
   */
  getContainerHeight(position: ToastPosition): string {
    const toasts = this.getToastsForPosition(position);
    const count = toasts.length;
    const hovered = this.getHoverSignal(position)();

    if (hovered) {
      return 'auto';
    } else {
      return `${64 + (count - 1) * 8}px`;
    }
  }
}
