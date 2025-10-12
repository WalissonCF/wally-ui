import { Component, computed, input, InputSignal, Signal } from '@angular/core';

type Variant = 'default' | 'outline' | 'secondary' | 'destructive';

@Component({
  selector: 'wally-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css'
})
export class Badge {
  variant: InputSignal<Variant> = input<Variant>('default');

  variantClasses: Signal<string> = computed(() => {
    const variantMap: Record<Variant, string> = {
      default: '#0a0a0a] hover:bg-[#0a0a0a]/85 disabled:bg-[#0a0a0a]/85 dark:text-[#0a0a0a] dark:bg-white dark:hover:bg-white/85 dark:disabled:bg-white/85 dark:disabled:text-[#0a0a0a]/60 shadow',
      outline: '',
      secondary: '',
      destructive: ''
    };

    return variantMap[this.variant()] || variantMap.default;
  });
}
