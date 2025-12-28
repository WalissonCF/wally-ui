import { Component, input } from '@angular/core';

@Component({
  selector: 'wally-combobox-empty',
  imports: [],
  templateUrl: './combobox-empty.html',
  styleUrl: './combobox-empty.css'
})
export class ComboboxEmpty {
  message = input<string>('No results found');
}
