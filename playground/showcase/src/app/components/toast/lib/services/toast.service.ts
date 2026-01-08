import { Injectable, signal } from '@angular/core';

import { ToastPosition } from '../types/toast-position.type';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  private _defaultPosition = signal<ToastPosition>('top-center');
  private _timeouts = new Map<number, { timeout: ReturnType<typeof setTimeout>, remainingTime: number, startTime: number }>();
  private _pausedToasts = new Set<number>();

  readonly toasts = this._toasts.asReadonly();
  readonly defaultPosition = this._defaultPosition.asReadonly();

  setDefaultPosition(position: ToastPosition): void {
    this._defaultPosition.set(position);
  }

  /**
   * Creates a new toast notification.
   *
   * @remarks
   * - Loading and neutral toasts have duration=0 (no auto-dismiss, must be removed manually)
   * - Other types default to 5000ms auto-dismiss
   *
   * @returns The toast ID - save this to remove loading toasts manually
   */
  create(toast: Omit<Toast, "id">): number {
    const id: number = Date.now();
    const duration: number = (toast.type === 'loading' || toast.type === 'neutral') ? 0 : (toast.duration ?? 5000);

    const newToast: Toast = {
      id: id,
      duration: duration,
      position: toast.position || this._defaultPosition(),
      ...toast
    }

    this._toasts.update(currentToasts => [...currentToasts, newToast]);

    if (duration > 0) {
      this.scheduleRemoval(id, duration);
    }

    return id;
  }

  private scheduleRemoval(id: number, duration: number): void {
    const timeout = setTimeout(() => {
      this.remove(id);
      this._timeouts.delete(id);
    }, duration);

    this._timeouts.set(id, {
      timeout,
      remainingTime: duration,
      startTime: Date.now()
    });
  }

  /**
   * Pauses auto-dismiss timer for a toast (e.g., when hovering).
   *
   * @remarks
   * Calculates elapsed time since timer started and subtracts from remaining time.
   * This allows resuming with the correct remaining duration.
   */
  pause(id: number): void {
    const timeoutData = this._timeouts.get(id);

    if (timeoutData && !this._pausedToasts.has(id)) {
      clearTimeout(timeoutData.timeout);
      const elapsed = Date.now() - timeoutData.startTime;
      timeoutData.remainingTime = Math.max(0, timeoutData.remainingTime - elapsed);
      this._pausedToasts.add(id);
    }
  }

  /**
   * Resumes auto-dismiss timer for a paused toast.
   *
   * @remarks
   * Creates a new setTimeout with the remaining time calculated during pause.
   * Updates startTime to now for accurate future pause calculations.
   */
  resume(id: number): void {
    const timeoutData = this._timeouts.get(id);

    if (timeoutData && this._pausedToasts.has(id)) {
      this._pausedToasts.delete(id);
      timeoutData.startTime = Date.now();
      timeoutData.timeout = setTimeout(() => {
        this.remove(id);
        this._timeouts.delete(id);
      }, timeoutData.remainingTime);
    }
  }

  remove(id: number): void {
    const timeoutData = this._timeouts.get(id);

    if (timeoutData) {
      clearTimeout(timeoutData.timeout);
      this._timeouts.delete(id);
    }

    this._pausedToasts.delete(id);
    this._toasts.update(current => current.filter(toast => toast.id !== id));
  }
}
