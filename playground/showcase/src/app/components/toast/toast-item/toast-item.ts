import { Component, computed, effect, inject, input, Signal, signal } from '@angular/core';

import { ToastService } from '../lib/services/toast.service';
import { ToastType } from '../lib/types/toast-type.type';
import { Toast } from '../lib/models/toast.model';

@Component({
  selector: 'wally-toast-item',
  imports: [],
  templateUrl: './toast-item.html',
  // standalone: true, (If your application is lower than Angular 19, uncomment this line)
})
export class ToastItem {
  private toastService = inject(ToastService);

  toast = input.required<Toast>();
  visualIndex = input.required<number>();
  totalVisible = input.required<number>();
  isHovered = input<boolean>(false);

  isClosing = signal(false);
  remainingTime = signal(100);

  /**
   * Calculates CSS transform for stacking effect.
   *
   * @remarks
   * Stacked (not hovered):
   * - Index 0 (newest): No offset, full scale
   * - Index 1+: Moves DOWN by 13px per level, scales down by 2% per level
   *
   * Hovered: Flexbox handles positioning, only removes scale
   */
  transformStyle: Signal<string> = computed(() => {
    const index = this.visualIndex();
    const hovered = this.isHovered();

    if (hovered) {
      return 'scale(1)';
    } else {
      if (index === 0) {
        return 'translateY(0) scale(1)';
      } else {
        // Push older toasts DOWN to show stacked borders behind newest
        // 13px = enough to show ~6-8px of the toast border below
        const yOffset = index * 13;
        const scale = 1 - (index * 0.02); // 2% smaller per level (0.98, 0.96, 0.94, 0.92)
        return `translateY(${yOffset}px) scale(${scale})`;
      }
    }
  });

  /**
   * Calculates opacity for depth perception in stack.
   *
   * @remarks
   * - Index 0 or hovered: Full opacity (1.0)
   * - Index 1+: Reduces by 12% per level (0.88, 0.76, 0.64, 0.52)
   */
  opacityStyle: Signal<number> = computed(() => {
    const index = this.visualIndex();
    const hovered = this.isHovered();

    if (hovered || index === 0) {
      return 1;
    } else {
      return 1 - (index * 0.12); // 12% opacity reduction per level
    }
  });

  zIndex: Signal<number> = computed(() => {
    return 50 - this.visualIndex();
  });

  iconColorClasses: Signal<string> = computed(() => {
    const colorMap: Record<ToastType, string> = {
      success: 'text-green-500',
      error: 'text-red-500',
      info: 'text-blue-500',
      warning: 'text-yellow-500',
      loading: 'text-neutral-400',
      neutral: 'text-neutral-400'
    };
    return colorMap[this.toast().type];
  });

  constructor() {
    effect(() => {
      const toast = this.toast();
      if (toast.duration && toast.duration > 0) {
        this.startProgressTimer(toast.duration);
      }
    });
  }

  private startProgressTimer(duration: number): void {
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const percentage = 100 - (currentStep / steps) * 100;
      this.remainingTime.set(Math.max(0, percentage));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
  }

  onClose(): void {
    this.isClosing.set(true);
    setTimeout(() => {
      this.toastService.remove(this.toast().id);
    }, 200);
  }
}
