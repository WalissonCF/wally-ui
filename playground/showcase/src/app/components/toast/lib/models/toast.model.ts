import { ToastPosition } from '../types/toast-position.type';
import { ToastType } from '../types/toast-type.type';

export interface Toast {
  id: number;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
}
