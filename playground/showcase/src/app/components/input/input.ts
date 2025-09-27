import { CommonModule } from '@angular/common';
import {
  Component, computed, HostListener, input, InputSignal, signal, untracked, WritableSignal
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'wally-input',
  imports: [
    CommonModule
  ],
  // standalone: true, (If your application is lower than Angular 19, uncomment this line)
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Input,
      multi: true
    }
  ]
})
export class Input implements ControlValueAccessor {
  placeholder: InputSignal<string> = input<string>('');
  type: InputSignal<string> = input<string>('text');
  label: InputSignal<string> = input<string>('');
  autocomplete: InputSignal<string> = input<string>('');

  valid: InputSignal<boolean> = input<boolean>(false);
  errorMessage: InputSignal<string> = input<string>('');
  loading: InputSignal<boolean> = input<boolean>(false);
  disabled: InputSignal<boolean> = input<boolean>(false);

  protected readonly showPassword = signal<boolean>(false);
  protected readonly inputId = `wally-input-${Math.random().toString(36).substring(2, 11)}`;
  protected readonly errorId = computed(() =>
    this.errorMessage() ? `${this.inputId}-error` : undefined
  );

  protected readonly isDisabled = computed(() =>
    this.disabled() || this.internalDisabled()
  );

  private touched: WritableSignal<boolean> = signal<boolean>(false);
  value: WritableSignal<string> = signal<string>('');

  protected readonly currentInputType = computed(() => {
    const currentType = this.type();

    if (currentType !== 'password') {
      return currentType;
    }

    if (this.showPassword()) {
      return 'text';
    }

    return 'password';
  });

  private internalDisabled = signal<boolean>(false);

  private onChange = (value: any) => { };
  private onTouched = () => { };

  writeValue(obj: any): void {
    untracked(() => {
      this.value.set(obj || '');
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.value.set(newValue);
    this.onChange(newValue);
  }

  @HostListener('blur')
  onInputBlur(): void {
    if (!this.touched()) {
      this.touched.set(true);
      this.onTouched();
    }
  }
}
