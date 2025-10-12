import { Component, computed, inject, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';

@Component({
  selector: 'wally-button',
  imports: [
    CommonModule
  ],
  // standalone: true, (If your application is lower than Angular 19, uncomment this line)
  templateUrl: './button.html',
})
export class Button {
  private router = inject(Router);

  type: InputSignal<string> = input<string>('button');
  disabled: InputSignal<boolean> = input<boolean>(false);
  loading: InputSignal<boolean> = input<boolean>(false);
  showNotification: InputSignal<boolean> = input<boolean>(false);
  variant: InputSignal<ButtonVariant> = input<ButtonVariant>('primary');
  href: InputSignal<string> = input<string>('');
  rounded: InputSignal<boolean> = input<boolean>(false);

  // Accessibility properties
  ariaLabel: InputSignal<string> = input<string>('');
  ariaDescribedBy: InputSignal<string> = input<string>('');
  ariaPressed: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined);

  click: OutputEmitterRef<void> = output<void>();

  // Computed classes based on variant
  variantClasses: Signal<string> = computed(() => {
    const variantMap: Record<ButtonVariant, string> = {
      primary: 'bg-[#0a0a0a] hover:bg-[#0a0a0a]/85 disabled:bg-[#0a0a0a]/85 dark:text-[#0a0a0a] dark:bg-white dark:hover:bg-white/85 dark:disabled:bg-white/85 dark:disabled:text-[#0a0a0a]/60 shadow',
      secondary: '!text-[#0a0a0a] bg-neutral-200 hover:bg-neutral-200/60 disabled:bg-neutral-200/80 disabled:!text-neutral-400 dark:!text-white dark:bg-white/20 dark:hover:bg-white/10 dark:disabled:bg-white/5 dark:disabled:text-white/50 shadow',
      destructive: 'dark:text-white bg-red-500 hover:bg-red-500/80 disabled:bg-red-500/80 disabled:text-white/80 dark:disabled:text-white/60 shadow',
      outline: '!text-[#0a0a0a] bg-transparent border border-neutral-400 hover:bg-neutral-200/60 disabled:!text-neutral-500 dark:!text-white dark:border-neutral-500 dark:bg-neutral-500/10 dark:hover:bg-neutral-500/20 dark:disabled:!text-white/60 shadow',
      ghost: '!text-[#0a0a0a] bg-transparent hover:bg-neutral-100 disabled:!text-neutral-400 dark:!text-white dark:hover:bg-white/5 dark:disabled:!text-white/50',
      link: '!text-blue-600 bg-transparent underline-offset-4 hover:underline disabled:!text-blue-400 dark:!text-blue-600 dark:hover:!text-blue-500 dark:disabled:!text-blue-400'
    };

    return variantMap[this.variant()] || variantMap.primary;
  });

  handleClick(): void {
    if (this.variant() === 'link' && this.href()) {
      if (this.href().startsWith('http://') || this.href().startsWith('https://')) {
        window.open(this.href(), '_blank');
      } else {
        this.router.navigate([this.href()]);
      }
    }

    this.click.emit();
  }
}
