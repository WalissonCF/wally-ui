import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wally-button',
  imports: [
    CommonModule
  ],
  // standalone: true, (If your application is lower than Angular 19, uncomment this line)
  templateUrl: './button.html',
})
export class Button {
  buttonText: InputSignal<string> = input<string>('Wally Button');
  buttonType: InputSignal<string> = input<string>('button');
  buttonDisabled: InputSignal<boolean> = input<boolean>(false);
  buttonLoading: InputSignal<boolean> = input<boolean>(false);
  buttonNotification: InputSignal<boolean> = input<boolean>(false);
}
