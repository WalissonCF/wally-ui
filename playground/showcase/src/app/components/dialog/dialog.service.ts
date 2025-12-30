import { Injectable, signal } from '@angular/core';

@Injectable()
export class DialogService {
  isOpen = signal<boolean>(false);
  closeOnBackdropClick = signal<boolean>(true);
  closeOnEsc = signal<boolean>(true);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggle(): void {
    this.isOpen.update(value => !value);
  }
}
