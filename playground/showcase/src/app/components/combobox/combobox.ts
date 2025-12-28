import { Component, effect, inject, input, output } from '@angular/core';

import { ComboboxService } from './lib/service/combobox.service';
import { ComboboxInterface } from './lib/models/combobox.model';

@Component({
  selector: 'wally-combobox',
  imports: [],
  providers: [ComboboxService],
  templateUrl: './combobox.html',
  styleUrl: './combobox.css'
})
export class Combobox {
  comboboxService = inject(ComboboxService);

  // Inputs para dados
  data = input<ComboboxInterface[]>([]);

  // Inputs para configuração
  multiSelect = input<boolean>(false);
  triggerMode = input<'input' | 'custom'>('input');
  groupBy = input<string | null>(null);
  placeholder = input<string>('Search...');
  closeOnSelect = input<boolean>(true);
  disabled = input<boolean>(false);

  // Output para emitir mudanças de seleção
  selectionChange = output<ComboboxInterface[]>();

  constructor() {
    // Effect para sincronizar inputs com serviço
    effect(() => {
      // Sincronizar dados
      const dataValue = this.data();
      if (dataValue.length > 0) {
        this.comboboxService.setData(dataValue);
      }

      // Sincronizar configurações
      this.comboboxService.setMultiSelect(this.multiSelect());
      this.comboboxService.setTriggerMode(this.triggerMode());

      const groupByValue = this.groupBy();
      if (groupByValue) {
        this.comboboxService.setGroupBy(groupByValue);
      }

      this.comboboxService.placeholder.set(this.placeholder());
      this.comboboxService.closeOnSelect.set(this.closeOnSelect());
      this.comboboxService.disabled.set(this.disabled());
    });

    // Effect para emitir mudanças de seleção
    effect(() => {
      const selected = this.comboboxService.selectedItems();
      this.selectionChange.emit(selected);
    });
  }
}
