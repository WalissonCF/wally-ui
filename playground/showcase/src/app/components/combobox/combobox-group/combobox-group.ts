import { Component, input } from '@angular/core';

@Component({
  selector: 'wally-combobox-group',
  imports: [],
  templateUrl: './combobox-group.html',
  styleUrl: './combobox-group.css'
})
export class ComboboxGroup {
  label = input.required<string>();
}
