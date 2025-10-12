import { Component } from '@angular/core';

import { DropdownMenuService } from '../dropdown-menu.service';

@Component({
  selector: 'wally-dropdown-menu-trigger',
  imports: [],
  templateUrl: './dropdown-menu-trigger.html',
  styleUrl: './dropdown-menu-trigger.css'
})
export class DropdownMenuTrigger {
  private hoverTimeout: any = null;

  constructor(
    public dropdownMenuService: DropdownMenuService
  ) {}

  toggle(): void {
    if (this.dropdownMenuService.triggerMode() === 'click') {
      this.dropdownMenuService.toggle();
    }
  }

  /**
   * Handles mouse enter event for hover mode.
   * Opens the dropdown after a 200ms delay to prevent accidental triggers.
   */
  onMouseEnter(): void {
    if (this.dropdownMenuService.triggerMode() === 'hover') {
      this.hoverTimeout = setTimeout(() => {
        this.dropdownMenuService.open();
      }, 200);
    }
  }

  /**
   * Handles mouse leave event for hover mode.
   * Cancels pending open timeout and closes dropdown after 100ms delay,
   * allowing user to move mouse to dropdown content without it closing.
   */
  onMouseLeave(): void {
    if (this.dropdownMenuService.triggerMode() === 'hover') {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = null;
      }

      setTimeout(() => {
        if (!this.dropdownMenuService.isHoveringContent()) {
          this.dropdownMenuService.close();
        }
      }, 100);
    }
  }
}
