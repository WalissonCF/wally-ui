import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

@Component({
  selector: 'wally-button',
  imports: [
    CommonModule
  ],
  // standalone: true, (If your application is lower than Angular 19, uncomment this line)
  templateUrl: './button.html',
})
export class Button {
  type: InputSignal<string> = input<string>('button');
  disabled: InputSignal<boolean> = input<boolean>(false);
  loading: InputSignal<boolean> = input<boolean>(false);
  showNotification: InputSignal<boolean> = input<boolean>(false);
  variant: InputSignal<ButtonVariant> = input<ButtonVariant>('primary');

  // Accessibility properties
  ariaLabel: InputSignal<string> = input<string>('');
  ariaDescribedBy: InputSignal<string> = input<string>('');
  ariaPressed: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined);

  click: OutputEmitterRef<void> = output<void>();

  handleClick(): void {
    this.click.emit();
  }
}
