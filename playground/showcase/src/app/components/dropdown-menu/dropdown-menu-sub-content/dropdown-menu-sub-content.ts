import { Component, computed } from '@angular/core';
import { DropdownMenuSubService } from '../dropdown-menu-sub.service';

@Component({
  selector: 'wally-dropdown-menu-sub-content',
  imports: [],
  templateUrl: './dropdown-menu-sub-content.html',
  styleUrl: './dropdown-menu-sub-content.css'
})
export class DropdownMenuSubContent {
  constructor(public subService: DropdownMenuSubService) {}

  positionClasses = computed(() => {
    return 'top-0 left-full';
  });

  onMouseEnter(): void {
    this.subService.setHoveringContent(true);
    this.subService.open();
  }

  onMouseLeave(): void {
    this.subService.setHoveringContent(false);

    setTimeout(() => {
      if (!this.subService.isHoveringContent()) {
        this.subService.close();
      }
    }, 100);
  }
}
