import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
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
  text: InputSignal<string> = input<string>('Wally Button');
  type: InputSignal<string> = input<string>('button');
  disabled: InputSignal<boolean> = input<boolean>(false);
  loading: InputSignal<boolean> = input<boolean>(false);
  showNotification: InputSignal<boolean> = input<boolean>(false);

  click: OutputEmitterRef<void> = output<void>();

  handleClick(): void {
    this.click.emit();
  }
}
