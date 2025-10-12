import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

import { DropdownMenuService } from '../dropdown-menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wally-dropdown-menu-item',
  imports: [
    CommonModule
  ],
  templateUrl: './dropdown-menu-item.html',
  styleUrl: './dropdown-menu-item.css'
})
export class DropdownMenuItem {
  disabled: InputSignal<boolean> = input<boolean>(false);

  click: OutputEmitterRef<void> = output<void>();

  constructor(
    private dropdownMenuService: DropdownMenuService
  ) {}

  /**
   * Handles click event on menu item.
   * Stops event propagation to prevent double-firing, emits click event, and closes dropdown.
   * Does nothing if item is disabled.
   */
  handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    event?.stopPropagation();
    this.click.emit();
    this.dropdownMenuService.close();
  }
}
