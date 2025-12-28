import { Injectable, signal, computed } from '@angular/core';

import { ComboboxInterface } from '../models/combobox.model';

@Injectable()
export class ComboboxService {
  // ========== DATA ==========
  private _data = signal<ComboboxInterface[]>([]);
  data = this._data.asReadonly();

  // ========== UI STATE ==========
  isOpen = signal<boolean>(false);
  position = signal<string | null>(null);
  placeholder = signal<string>('Search...');
  disabled = signal<boolean>(false);
  closeOnSelect = signal<boolean>(true);

  // ========== TRIGGER MODE ==========
  triggerMode = signal<'input' | 'custom'>('input');

  // ========== SEARCH & FILTER ==========
  searchQuery = signal<string>('');
  filteredData = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this._data();

    return this._data().filter(item =>
      item.label.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      item.value.toString().toLowerCase().includes(query)
    );
  });

  // ========== MULTI-SELECT ==========
  multiSelect = signal<boolean>(false);
  selectedValues = signal<(string | number)[]>([]);
  selectedItems = computed(() =>
    this._data().filter(item => this.selectedValues().includes(item.value))
  );

  // ========== KEYBOARD NAVIGATION ==========
  focusedIndex = signal<number>(-1);
  focusedItem = computed(() => {
    const filtered = this.filteredData();
    const idx = this.focusedIndex();
    return idx >= 0 && idx < filtered.length ? filtered[idx] : null;
  });

  // ========== VIRTUAL SCROLLING ==========
  virtualScrollEnabled = signal<boolean>(false);
  itemHeight = signal<number>(48);
  visibleItemsCount = signal<number>(8);

  // ========== GROUPING ==========
  groupBy = signal<string | null>(null);
  groupedData = computed(() => {
    const key = this.groupBy();
    if (!key) return null;

    const groups = new Map<string, ComboboxInterface[]>();
    this.filteredData().forEach(item => {
      const groupKey = (item as any)[key] || 'Other';
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(item);
    });

    return Array.from(groups.entries()).map(([label, items]) => ({
      label,
      items
    }));
  });

  // ========== DATA METHODS ==========
  setData(data: ComboboxInterface[]): void {
    this._data.set(data);
  }

  // ========== OPEN/CLOSE METHODS ==========
  open(): void {
    this.isOpen.set(true);
    this.focusedIndex.set(-1);
  }

  close(): void {
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.focusedIndex.set(-1);
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  // ========== SEARCH METHODS ==========
  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
    this.focusedIndex.set(-1);
  }

  // ========== SELECTION METHODS ==========
  selectItem(value: string | number): void {
    if (this.multiSelect()) {
      const current = this.selectedValues();
      if (current.includes(value)) {
        this.selectedValues.set(current.filter(v => v !== value));
      } else {
        this.selectedValues.set([...current, value]);
      }
    } else {
      this.selectedValues.set([value]);
      if (this.closeOnSelect()) {
        this.close();
      }
    }
  }

  deselectItem(value: string | number): void {
    this.selectedValues.update(current =>
      current.filter(v => v !== value)
    );
  }

  clearSelection(): void {
    this.selectedValues.set([]);
  }

  isSelected(value: string | number): boolean {
    return this.selectedValues().includes(value);
  }

  // ========== KEYBOARD NAVIGATION METHODS ==========
  focusNext(): void {
    const maxIndex = this.filteredData().length - 1;
    if (maxIndex < 0) return;

    this.focusedIndex.update(index =>
      index < maxIndex ? index + 1 : index
    );
  }

  focusPrevious(): void {
    this.focusedIndex.update(index =>
      index > 0 ? index - 1 : index
    );
  }

  focusFirst(): void {
    if (this.filteredData().length > 0) {
      this.focusedIndex.set(0);
    }
  }

  focusLast(): void {
    const maxIndex = this.filteredData().length - 1;
    if (maxIndex >= 0) {
      this.focusedIndex.set(maxIndex);
    }
  }

  selectFocusedItem(): void {
    const focused = this.focusedItem();
    if (focused) {
      this.selectItem(focused.value);
    }
  }

  // ========== CONFIGURATION METHODS ==========
  setTriggerMode(mode: 'input' | 'custom'): void {
    this.triggerMode.set(mode);
  }

  setMultiSelect(enabled: boolean): void {
    this.multiSelect.set(enabled);
    if (!enabled && this.selectedValues().length > 1) {
      this.selectedValues.set([this.selectedValues()[0]]);
    }
  }

  setVirtualScroll(enabled: boolean, itemHeight?: number): void {
    this.virtualScrollEnabled.set(enabled);
    if (itemHeight) {
      this.itemHeight.set(itemHeight);
    }
  }

  setGroupBy(property: string | null): void {
    this.groupBy.set(property);
  }
}
