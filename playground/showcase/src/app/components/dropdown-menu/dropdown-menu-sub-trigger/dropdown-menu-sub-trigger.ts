import { Component } from '@angular/core';
import { DropdownMenuSubService } from '../dropdown-menu-sub.service';

@Component({
  selector: 'wally-dropdown-menu-sub-trigger',
  imports: [],
  templateUrl: './dropdown-menu-sub-trigger.html',
  styleUrl: './dropdown-menu-sub-trigger.css'
})
export class DropdownMenuSubTrigger {
  private hoverTimeout: any = null;

  constructor(public subService: DropdownMenuSubService) {}

  /**
   * Opens submenu after 150ms delay to prevent accidental triggers.
   */
  onMouseEnter(): void {
    this.hoverTimeout = setTimeout(() => {
      this.subService.open();
    }, 150);
  }

  /**
   * Closes submenu with 300ms delay, allowing user to move mouse to submenu content.
   * Cancels pending open timeout if mouse leaves quickly.
   */
  onMouseLeave(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }

    setTimeout(() => {
      if (!this.subService.isHoveringContent()) {
        this.subService.close();
      }
    }, 300);
  }
}
