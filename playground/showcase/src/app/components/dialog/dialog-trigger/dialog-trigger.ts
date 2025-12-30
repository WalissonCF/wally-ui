import { Component, HostListener, inject } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'wally-dialog-trigger',
  imports: [],
  templateUrl: './dialog-trigger.html'
})
export class DialogTrigger {
  dialogService = inject(DialogService);

  @HostListener('click')
  onClick(): void {
    this.dialogService.open();
  }
}
