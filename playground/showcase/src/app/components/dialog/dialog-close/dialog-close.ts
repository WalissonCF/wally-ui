import { Component, HostListener, inject } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'wally-dialog-close',
  imports: [],
  templateUrl: './dialog-close.html'
})
export class DialogClose {
  dialogService = inject(DialogService);

  @HostListener('click')
  onClick(): void {
    this.dialogService.close();
  }
}
