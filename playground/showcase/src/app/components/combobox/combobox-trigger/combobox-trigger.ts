import { Component, HostListener, inject } from '@angular/core';

import { ComboboxService } from '../lib/service/combobox.service';

@Component({
  selector: 'wally-combobox-trigger',
  imports: [],
  templateUrl: './combobox-trigger.html',
  styleUrl: './combobox-trigger.css'
})
export class ComboboxTrigger {
  comboboxService = inject(ComboboxService);

  @HostListener('click')
  onClick(): void {
    if (this.comboboxService.triggerMode() === 'custom') {
      this.comboboxService.toggle();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.comboboxService.triggerMode() === 'custom') {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.comboboxService.toggle();
      }
    }
  }
}
