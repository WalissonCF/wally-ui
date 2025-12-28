import { TestBed } from '@angular/core/testing';

import { ComboboxService } from './combobox.service';
import { ComboboxInterface } from '../models/combobox.model';

describe('ComboboxService', () => {
  let service: ComboboxService;

  const mockData: ComboboxInterface[] = [
    { value: 1, label: 'Apple', description: 'A red fruit' },
    { value: 2, label: 'Banana', description: 'A yellow fruit' },
    { value: 3, label: 'Orange', description: 'A citrus fruit' },
    { value: 4, label: 'Grape', description: 'Purple berries' }
  ];

  const mockGroupedData: ComboboxInterface[] = [
    { value: 1, label: 'JavaScript', group: 'Frontend' },
    { value: 2, label: 'TypeScript', group: 'Frontend' },
    { value: 3, label: 'Python', group: 'Backend' },
    { value: 4, label: 'Java', group: 'Backend' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComboboxService]
    });
    service = TestBed.inject(ComboboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Data Management', () => {
    it('should initialize with empty data', () => {
      expect(service.data()).toEqual([]);
    });

    it('should set data', () => {
      service.setData(mockData);
      expect(service.data()).toEqual(mockData);
    });

    it('should update data when setData is called multiple times', () => {
      service.setData(mockData);
      expect(service.data().length).toBe(4);

      const newData = [{ value: 5, label: 'Mango' }];
      service.setData(newData);
      expect(service.data()).toEqual(newData);
      expect(service.data().length).toBe(1);
    });
  });

  describe('UI State', () => {
    it('should initialize with closed state', () => {
      expect(service.isOpen()).toBe(false);
    });

    it('should open combobox', () => {
      service.open();
      expect(service.isOpen()).toBe(true);
    });

    it('should close combobox', () => {
      service.open();
      service.close();
      expect(service.isOpen()).toBe(false);
    });

    it('should toggle combobox state', () => {
      expect(service.isOpen()).toBe(false);
      service.toggle();
      expect(service.isOpen()).toBe(true);
      service.toggle();
      expect(service.isOpen()).toBe(false);
    });

    it('should reset focusedIndex when opening', () => {
      service.setData(mockData);
      service.focusFirst();
      expect(service.focusedIndex()).toBe(0);

      service.open();
      expect(service.focusedIndex()).toBe(-1);
    });

    it('should clear search query when closing', () => {
      service.setSearchQuery('apple');
      expect(service.searchQuery()).toBe('apple');

      service.close();
      expect(service.searchQuery()).toBe('');
    });

    it('should have default placeholder', () => {
      expect(service.placeholder()).toBe('Search...');
    });

    it('should update placeholder', () => {
      service.placeholder.set('Select an item...');
      expect(service.placeholder()).toBe('Select an item...');
    });

    it('should initialize as not disabled', () => {
      expect(service.disabled()).toBe(false);
    });

    it('should update disabled state', () => {
      service.disabled.set(true);
      expect(service.disabled()).toBe(true);
    });

    it('should have closeOnSelect enabled by default', () => {
      expect(service.closeOnSelect()).toBe(true);
    });
  });

  describe('Trigger Mode', () => {
    it('should initialize with input trigger mode', () => {
      expect(service.triggerMode()).toBe('input');
    });

    it('should set trigger mode to custom', () => {
      service.setTriggerMode('custom');
      expect(service.triggerMode()).toBe('custom');
    });

    it('should set trigger mode to input', () => {
      service.setTriggerMode('custom');
      service.setTriggerMode('input');
      expect(service.triggerMode()).toBe('input');
    });
  });

  describe('Search & Filter', () => {
    beforeEach(() => {
      service.setData(mockData);
    });

    it('should return all data when search query is empty', () => {
      expect(service.filteredData()).toEqual(mockData);
    });

    it('should filter by label', () => {
      service.setSearchQuery('apple');
      const filtered = service.filteredData();
      expect(filtered.length).toBe(1);
      expect(filtered[0].label).toBe('Apple');
    });

    it('should filter case-insensitively', () => {
      service.setSearchQuery('BANANA');
      const filtered = service.filteredData();
      expect(filtered.length).toBe(1);
      expect(filtered[0].label).toBe('Banana');
    });

    it('should filter by description', () => {
      service.setSearchQuery('citrus');
      const filtered = service.filteredData();
      expect(filtered.length).toBe(1);
      expect(filtered[0].label).toBe('Orange');
    });

    it('should filter by value', () => {
      service.setSearchQuery('2');
      const filtered = service.filteredData();
      expect(filtered.length).toBe(1);
      expect(filtered[0].value).toBe(2);
    });

    it('should return empty array when no matches', () => {
      service.setSearchQuery('xyz');
      expect(service.filteredData()).toEqual([]);
    });

    it('should trim search query', () => {
      service.setSearchQuery('  apple  ');
      expect(service.filteredData().length).toBe(1);
    });

    it('should reset focusedIndex when search query changes', () => {
      service.focusFirst();
      expect(service.focusedIndex()).toBe(0);

      service.setSearchQuery('test');
      expect(service.focusedIndex()).toBe(-1);
    });
  });

  describe('Multi-Select', () => {
    beforeEach(() => {
      service.setData(mockData);
    });

    it('should initialize as single-select', () => {
      expect(service.multiSelect()).toBe(false);
    });

    it('should enable multi-select', () => {
      service.setMultiSelect(true);
      expect(service.multiSelect()).toBe(true);
    });

    it('should select multiple items in multi-select mode', () => {
      service.setMultiSelect(true);
      service.selectItem(1);
      service.selectItem(2);

      expect(service.selectedValues()).toEqual([1, 2]);
      expect(service.selectedItems().length).toBe(2);
    });

    it('should toggle selection in multi-select mode', () => {
      service.setMultiSelect(true);
      service.selectItem(1);
      expect(service.selectedValues()).toContain(1);

      service.selectItem(1); // Deselect
      expect(service.selectedValues()).not.toContain(1);
    });

    it('should keep only first item when switching from multi to single select', () => {
      service.setMultiSelect(true);
      service.selectItem(1);
      service.selectItem(2);
      service.selectItem(3);

      service.setMultiSelect(false);
      expect(service.selectedValues()).toEqual([1]);
    });

    it('should replace selection in single-select mode', () => {
      service.selectItem(1);
      expect(service.selectedValues()).toEqual([1]);

      service.selectItem(2);
      expect(service.selectedValues()).toEqual([2]);
    });

    it('should close after selection in single-select mode when closeOnSelect is true', () => {
      service.open();
      service.closeOnSelect.set(true);
      service.selectItem(1);

      expect(service.isOpen()).toBe(false);
    });

    it('should not close after selection when closeOnSelect is false', () => {
      service.open();
      service.closeOnSelect.set(false);
      service.selectItem(1);

      expect(service.isOpen()).toBe(true);
    });

    it('should not close in multi-select mode', () => {
      service.setMultiSelect(true);
      service.open();
      service.selectItem(1);

      expect(service.isOpen()).toBe(true);
    });

    it('should deselect item', () => {
      service.selectItem(1);
      service.deselectItem(1);

      expect(service.selectedValues()).toEqual([]);
    });

    it('should clear all selections', () => {
      service.setMultiSelect(true);
      service.selectItem(1);
      service.selectItem(2);

      service.clearSelection();
      expect(service.selectedValues()).toEqual([]);
    });

    it('should check if item is selected', () => {
      service.selectItem(1);

      expect(service.isSelected(1)).toBe(true);
      expect(service.isSelected(2)).toBe(false);
    });

    it('should return selected items as full objects', () => {
      service.selectItem(1);
      service.selectItem(3);

      const selected = service.selectedItems();
      expect(selected.length).toBe(1); // Single select mode
      expect(selected[0]).toEqual(mockData[0]);
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      service.setData(mockData);
    });

    it('should initialize with no focused index', () => {
      expect(service.focusedIndex()).toBe(-1);
      expect(service.focusedItem()).toBe(null);
    });

    it('should focus first item', () => {
      service.focusFirst();
      expect(service.focusedIndex()).toBe(0);
      expect(service.focusedItem()).toEqual(mockData[0]);
    });

    it('should focus last item', () => {
      service.focusLast();
      expect(service.focusedIndex()).toBe(3);
      expect(service.focusedItem()).toEqual(mockData[3]);
    });

    it('should focus next item', () => {
      service.focusFirst();
      service.focusNext();
      expect(service.focusedIndex()).toBe(1);
      expect(service.focusedItem()).toEqual(mockData[1]);
    });

    it('should not go beyond last item when focusing next', () => {
      service.focusLast();
      service.focusNext();
      expect(service.focusedIndex()).toBe(3); // Stays at last
    });

    it('should focus previous item', () => {
      service.focusLast();
      service.focusPrevious();
      expect(service.focusedIndex()).toBe(2);
    });

    it('should not go below first item when focusing previous', () => {
      service.focusFirst();
      service.focusPrevious();
      expect(service.focusedIndex()).toBe(0); // Stays at first
    });

    it('should handle empty filtered data', () => {
      service.setSearchQuery('nonexistent');
      service.focusFirst();
      expect(service.focusedIndex()).toBe(-1);
    });

    it('should select focused item', () => {
      service.focusFirst();
      service.selectFocusedItem();

      expect(service.selectedValues()).toContain(1);
    });

    it('should not select when no item is focused', () => {
      service.selectFocusedItem();
      expect(service.selectedValues()).toEqual([]);
    });

    it('should update focusedItem when filtered data changes', () => {
      service.focusFirst();
      expect(service.focusedItem()?.label).toBe('Apple');

      service.setSearchQuery('banana');
      service.focusFirst();
      expect(service.focusedItem()?.label).toBe('Banana');
    });
  });

  describe('Virtual Scrolling', () => {
    it('should initialize with virtual scroll disabled', () => {
      expect(service.virtualScrollEnabled()).toBe(false);
    });

    it('should have default item height', () => {
      expect(service.itemHeight()).toBe(48);
    });

    it('should have default visible items count', () => {
      expect(service.visibleItemsCount()).toBe(8);
    });

    it('should enable virtual scroll', () => {
      service.setVirtualScroll(true);
      expect(service.virtualScrollEnabled()).toBe(true);
    });

    it('should set custom item height', () => {
      service.setVirtualScroll(true, 60);
      expect(service.itemHeight()).toBe(60);
    });

    it('should enable virtual scroll without changing item height', () => {
      service.setVirtualScroll(true);
      expect(service.itemHeight()).toBe(48); // Default
    });
  });

  describe('Grouping', () => {
    beforeEach(() => {
      service.setData(mockGroupedData);
    });

    it('should initialize without grouping', () => {
      expect(service.groupBy()).toBe(null);
      expect(service.groupedData()).toBe(null);
    });

    it('should group data by property', () => {
      service.setGroupBy('group');
      const grouped = service.groupedData();

      expect(grouped).not.toBe(null);
      expect(grouped?.length).toBe(2);
    });

    it('should create correct groups', () => {
      service.setGroupBy('group');
      const grouped = service.groupedData();

      const frontendGroup = grouped?.find(g => g.label === 'Frontend');
      const backendGroup = grouped?.find(g => g.label === 'Backend');

      expect(frontendGroup?.items.length).toBe(2);
      expect(backendGroup?.items.length).toBe(2);
    });

    it('should place items without group property in Other', () => {
      const mixedData = [
        ...mockGroupedData,
        { value: 5, label: 'NoGroup' }
      ];
      service.setData(mixedData);
      service.setGroupBy('group');

      const grouped = service.groupedData();
      const otherGroup = grouped?.find(g => g.label === 'Other');

      expect(otherGroup).toBeDefined();
      expect(otherGroup?.items.length).toBe(1);
    });

    it('should update grouped data when filtered', () => {
      service.setGroupBy('group');
      service.setSearchQuery('java'); // Matches JavaScript and Java

      const grouped = service.groupedData();
      const frontendGroup = grouped?.find(g => g.label === 'Frontend');
      const backendGroup = grouped?.find(g => g.label === 'Backend');

      expect(frontendGroup?.items.length).toBe(1); // JavaScript
      expect(backendGroup?.items.length).toBe(1); // Java
    });

    it('should return null when groupBy is cleared', () => {
      service.setGroupBy('group');
      expect(service.groupedData()).not.toBe(null);

      service.setGroupBy(null);
      expect(service.groupedData()).toBe(null);
    });
  });

  describe('Integration Tests', () => {
    beforeEach(() => {
      service.setData(mockData);
    });

    it('should handle complete selection workflow', () => {
      // Open combobox
      service.open();
      expect(service.isOpen()).toBe(true);

      // Search for item
      service.setSearchQuery('banana');
      expect(service.filteredData().length).toBe(1);

      // Navigate and select
      service.focusFirst();
      service.selectFocusedItem();

      expect(service.selectedValues()).toContain(2);
      expect(service.isOpen()).toBe(false); // Auto-closed
    });

    it('should handle multi-select workflow', () => {
      service.setMultiSelect(true);
      service.open();

      service.selectItem(1);
      service.selectItem(2);
      service.selectItem(3);

      expect(service.selectedValues().length).toBe(3);
      expect(service.isOpen()).toBe(true); // Stays open
    });

    it('should maintain selection when filtering', () => {
      service.selectItem(1);
      service.setSearchQuery('banana');

      expect(service.selectedValues()).toContain(1);
      expect(service.selectedItems()[0].label).toBe('Apple');
    });

    it('should handle deselection workflow', () => {
      service.selectItem(1);
      expect(service.isSelected(1)).toBe(true);

      service.deselectItem(1);
      expect(service.isSelected(1)).toBe(false);
    });

    it('should clear all state when closing', () => {
      service.setSearchQuery('test');
      service.focusFirst();
      service.open();

      service.close();

      expect(service.isOpen()).toBe(false);
      expect(service.searchQuery()).toBe('');
      expect(service.focusedIndex()).toBe(-1);
    });
  });
});
