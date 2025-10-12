import { Component, effect, ElementRef, input, OnDestroy } from '@angular/core';

import { DropdownMenuService } from './dropdown-menu.service';

export type TriggerMode = 'click' | 'hover';

@Component({
  selector: 'wally-dropdown-menu',
  imports: [],
  providers: [DropdownMenuService],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.css'
})
export class DropdownMenu implements OnDestroy {
  triggerMode = input<TriggerMode>('click');

  private clickOutsideListener: ((event: MouseEvent) => void) | null = null;

  constructor(
    public dropdownMenuService: DropdownMenuService,
    private elementRef: ElementRef
  ) {
    effect(() => {
      const mode = this.triggerMode();
      this.dropdownMenuService.triggerMode.set(mode);
    });

    effect(() => {
      if (this.dropdownMenuService.isOpen()) {
        this.addClickOutsideListener();
      } else {
        this.removeClickOutsideListener();
      }
    });
  }

  ngOnDestroy(): void {
    this.removeClickOutsideListener();
  }

  /**
   * Adds a click listener to the document to detect clicks outside the dropdown.
   * Uses setTimeout to prevent the same click that opens the dropdown from immediately closing it.
   */
  private addClickOutsideListener(): void {
    setTimeout(() => {
      this.clickOutsideListener = (event: MouseEvent) => {
        const clickedElement = event.target as HTMLElement;
        const dropdownElement = this.elementRef.nativeElement as HTMLElement;

        if (!dropdownElement.contains(clickedElement)) {
          this.dropdownMenuService.close();
        }
      };

      document.addEventListener('click', this.clickOutsideListener);
    }, 0);
  }

  /**
   * Removes the click outside listener from the document and cleans up the reference.
   */
  private removeClickOutsideListener(): void {
    if (this.clickOutsideListener) {
      document.removeEventListener('click', this.clickOutsideListener);
      this.clickOutsideListener = null;
    }
  }
}
