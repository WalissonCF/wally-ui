import { Component, effect, forwardRef, HostListener, input, InputSignal, model, signal, untracked, WritableSignal } from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'wally-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Input,
      multi: true
    }
  ]
})
export class Input implements ControlValueAccessor {
  type: WritableSignal<string> = signal<string>('text');
  // disabled: WritableSignal<boolean> = signal<boolean>(false);
  disabled = false;
  loading: WritableSignal<boolean> = signal<boolean>(false);
  
  placeholder: InputSignal<string> = input<string>('');

  value = signal<string>('');

  private touched = signal<boolean>(false);

  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor() {
    effect(() => {
      const currentValue = this.value();
      this.onChange(currentValue)
    });
  }

  writeValue(obj: any): void {
    untracked(() => {
      this.value.set(obj || '');
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }

  @HostListener('blur')
  onInputBlur(): void {
    if (!this.touched()) {
      this.touched.set(true);
      this.onTouched();
    }
  }

  onInputFocus(): void {

  }
}
