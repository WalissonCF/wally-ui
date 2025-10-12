import { Component, input } from '@angular/core';

@Component({
  selector: 'wally-dropdown-menu-group',
  templateUrl: './dropdown-menu-group.html',
  styleUrl: './dropdown-menu-group.css'
})
export class DropdownMenuGroup {
  ariaLabel = input<string>('');
}
