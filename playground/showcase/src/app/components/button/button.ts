import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'wally-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  buttonText: InputSignal<string> = input<string>('Add your button text here');
}
