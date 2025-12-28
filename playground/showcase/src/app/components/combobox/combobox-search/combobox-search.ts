import { Component, inject } from '@angular/core';

import { ComboboxService } from '../lib/service/combobox.service';

@Component({
  selector: 'wally-combobox-search',
  imports: [],
  templateUrl: './combobox-search.html',
  styleUrl: './combobox-search.css'
})
export class ComboboxSearch {
  comboboxService = inject(ComboboxService);

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.comboboxService.setSearchQuery(input.value);
  }

  onKeyDown(event: KeyboardEvent): void {
    // Prevent input from losing focus on arrow keys
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();

      if (event.key === 'ArrowDown') {
        this.comboboxService.focusNext();
      } else {
        this.comboboxService.focusPrevious();
      }
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.comboboxService.selectFocusedItem();
    }
  }
}
