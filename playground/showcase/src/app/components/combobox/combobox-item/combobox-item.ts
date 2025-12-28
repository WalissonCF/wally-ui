import { Component, HostListener, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComboboxService } from '../lib/service/combobox.service';
import { ComboboxInterface } from '../lib/models/combobox.model';

@Component({
  selector: 'wally-combobox-item',
  imports: [CommonModule],
  templateUrl: './combobox-item.html',
  styleUrl: './combobox-item.css'
})
export class ComboboxItem {
  comboboxService = inject(ComboboxService);

  item = input.required<ComboboxInterface>();
  focused = input<boolean>(false);
  selected = input<boolean>(false);

  handleClick(event: MouseEvent): void {
    if (this.item().disabled) return;

    event.stopPropagation();
    this.comboboxService.selectItem(this.item().value);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.item().disabled) return;

    const items = this.comboboxService.filteredData();
    const index = items.findIndex(i => i.value === this.item().value);
    if (index >= 0) {
      this.comboboxService.focusedIndex.set(index);
    }
  }
}
