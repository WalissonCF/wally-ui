import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComboboxService } from '../lib/service/combobox.service';

@Component({
  selector: 'wally-combobox-input',
  imports: [CommonModule],
  templateUrl: './combobox-input.html',
  styleUrl: './combobox-input.css'
})
export class ComboboxInput {
  comboboxService = inject(ComboboxService);

  onInputFocus(): void {
    this.comboboxService.open();
  }

  onInputClick(): void {
    if (!this.comboboxService.isOpen()) {
      this.comboboxService.open();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.comboboxService.setSearchQuery(input.value);

    if (!this.comboboxService.isOpen()) {
      this.comboboxService.open();
    }
  }

  removeChip(value: string | number, event: MouseEvent): void {
    event.stopPropagation();
    this.comboboxService.deselectItem(value);
  }

  clearAll(inputElement: HTMLInputElement): void {
    this.comboboxService.clearSelection();
    this.comboboxService.setSearchQuery('');
    inputElement.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.comboboxService.isOpen()) {
          this.comboboxService.open();
        }
        if (this.comboboxService.focusedIndex() === -1) {
          this.comboboxService.focusFirst();
        } else {
          this.comboboxService.focusNext();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.comboboxService.isOpen()) {
          this.comboboxService.focusPrevious();
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (this.comboboxService.isOpen() && this.comboboxService.focusedIndex() >= 0) {
          this.comboboxService.selectFocusedItem();
        }
        break;

      case 'Escape':
        if (this.comboboxService.isOpen()) {
          event.preventDefault();
          this.comboboxService.close();
        }
        break;

      case 'Backspace':
        // Remove last chip if input is empty
        if (!this.comboboxService.searchQuery() && this.comboboxService.selectedItems().length > 0) {
          const items = this.comboboxService.selectedItems();
          this.comboboxService.deselectItem(items[items.length - 1].value);
        }
        break;
    }
  }
}
