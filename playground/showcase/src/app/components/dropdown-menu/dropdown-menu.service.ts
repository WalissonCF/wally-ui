import { Injectable, signal, WritableSignal } from '@angular/core';

export type TriggerMode = 'click' | 'hover';

@Injectable()
export class DropdownMenuService {
  isOpen: WritableSignal<boolean> = signal(false);
  triggerMode = signal<TriggerMode>('click');

  private hoveringContent = signal(false);

  toggle(): void {
    this.isOpen.update(value => !value);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  setHoveringContent(value: boolean) {
    this.hoveringContent.set(value);
  }

  isHoveringContent(): boolean {
    return this.hoveringContent();
  }
}
