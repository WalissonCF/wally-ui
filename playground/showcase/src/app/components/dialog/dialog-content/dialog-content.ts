import { Component, ElementRef, inject } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'wally-dialog-content',
  imports: [],
  templateUrl: './dialog-content.html'
})
export class DialogContent {
  dialogService = inject(DialogService);
  private elementRef = inject(ElementRef);

  onBackdropClick(event: MouseEvent): void {
    // Close only if clicking directly on backdrop (not on dialog content)
    if (event.target === event.currentTarget && this.dialogService.closeOnBackdropClick()) {
      this.dialogService.close();
    }
  }
}
