import { Component, effect, HostListener, inject, input } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'wally-dialog',
  imports: [],
  providers: [DialogService],
  templateUrl: './dialog.html'
})
export class Dialog {
  dialogService = inject(DialogService);

  closeOnBackdropClick = input<boolean>(true);
  closeOnEsc = input<boolean>(true);

  constructor() {
    effect(() => {
      this.dialogService.closeOnBackdropClick.set(this.closeOnBackdropClick());
      this.dialogService.closeOnEsc.set(this.closeOnEsc());
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.dialogService.isOpen() && this.dialogService.closeOnEsc()) {
      this.dialogService.close();
    }
  }
}
