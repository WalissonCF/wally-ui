import { Injectable, signal } from '@angular/core';

@Injectable()
export class DropdownMenuSubService {
  isOpen = signal(false);
  private hoveringContent = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  setHoveringContent(value: boolean): void {
    this.hoveringContent.set(value);
  }

  isHoveringContent(): boolean {
    return this.hoveringContent();
  }
}
