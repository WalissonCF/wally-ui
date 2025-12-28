import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

import { Combobox } from './combobox';
import { ComboboxService } from './lib/service/combobox.service';
import { ComboboxInterface } from './lib/models/combobox.model';

describe('Combobox', () => {
  let component: Combobox;
  let fixture: ComponentFixture<Combobox>;
  let componentRef: ComponentRef<Combobox>;
  let service: ComboboxService;

  const mockData: ComboboxInterface[] = [
    { value: 1, label: 'Apple', description: 'A red fruit' },
    { value: 2, label: 'Banana', description: 'A yellow fruit' },
    { value: 3, label: 'Orange', description: 'A citrus fruit' }
  ];

  const mockGroupedData: ComboboxInterface[] = [
    { value: 1, label: 'JavaScript', group: 'Frontend' },
    { value: 2, label: 'TypeScript', group: 'Frontend' },
    { value: 3, label: 'Python', group: 'Backend' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Combobox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Combobox);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    service = component.comboboxService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ComboboxService', () => {
    expect(service).toBeTruthy();
  });

  describe('Input: data', () => {
    it('should initialize with empty data', () => {
      fixture.detectChanges();
      expect(service.data()).toEqual([]);
    });

    it('should set data through input', () => {
      componentRef.setInput('data', mockData);
      fixture.detectChanges();

      expect(service.data()).toEqual(mockData);
    });

    it('should update service when data input changes', () => {
      componentRef.setInput('data', mockData);
      fixture.detectChanges();
      expect(service.data().length).toBe(3);

      const newData = [{ value: 4, label: 'Mango' }];
      componentRef.setInput('data', newData);
      fixture.detectChanges();

      expect(service.data()).toEqual(newData);
      expect(service.data().length).toBe(1);
    });

    it('should not set empty data array', () => {
      componentRef.setInput('data', []);
      fixture.detectChanges();

      // Service should still be empty
      expect(service.data()).toEqual([]);
    });
  });

  describe('Input: multiSelect', () => {
    it('should initialize with single-select mode', () => {
      fixture.detectChanges();
      expect(service.multiSelect()).toBe(false);
    });

    it('should enable multi-select mode', () => {
      componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      expect(service.multiSelect()).toBe(true);
    });

    it('should disable multi-select mode', () => {
      componentRef.setInput('multiSelect', true);
      fixture.detectChanges();
      expect(service.multiSelect()).toBe(true);

      componentRef.setInput('multiSelect', false);
      fixture.detectChanges();
      expect(service.multiSelect()).toBe(false);
    });

    it('should keep only first item when switching from multi to single', () => {
      componentRef.setInput('data', mockData);
      componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      service.selectItem(1);
      service.selectItem(2);
      service.selectItem(3);
      expect(service.selectedValues().length).toBe(3);

      componentRef.setInput('multiSelect', false);
      fixture.detectChanges();

      expect(service.selectedValues()).toEqual([1]);
    });
  });

  describe('Input: triggerMode', () => {
    it('should initialize with input trigger mode', () => {
      fixture.detectChanges();
      expect(service.triggerMode()).toBe('input');
    });

    it('should set custom trigger mode', () => {
      componentRef.setInput('triggerMode', 'custom');
      fixture.detectChanges();

      expect(service.triggerMode()).toBe('custom');
    });

    it('should switch between trigger modes', () => {
      componentRef.setInput('triggerMode', 'custom');
      fixture.detectChanges();
      expect(service.triggerMode()).toBe('custom');

      componentRef.setInput('triggerMode', 'input');
      fixture.detectChanges();
      expect(service.triggerMode()).toBe('input');
    });
  });

  describe('Input: groupBy', () => {
    beforeEach(() => {
      componentRef.setInput('data', mockGroupedData);
    });

    it('should initialize without grouping', () => {
      fixture.detectChanges();
      expect(service.groupBy()).toBe(null);
      expect(service.groupedData()).toBe(null);
    });

    it('should group data by property', () => {
      componentRef.setInput('groupBy', 'group');
      fixture.detectChanges();

      expect(service.groupBy()).toBe('group');
      expect(service.groupedData()).not.toBe(null);
    });

    it('should not set null groupBy if not provided', () => {
      // Ensure null groupBy doesn't trigger setGroupBy unnecessarily
      componentRef.setInput('groupBy', null);
      fixture.detectChanges();

      expect(service.groupBy()).toBe(null);
    });

    it('should update grouping when property changes', () => {
      const mixedData = mockGroupedData.map(item => ({ ...item, category: item.group }));
      componentRef.setInput('data', mixedData);
      componentRef.setInput('groupBy', 'group');
      fixture.detectChanges();

      expect(service.groupBy()).toBe('group');

      componentRef.setInput('groupBy', 'category');
      fixture.detectChanges();

      expect(service.groupBy()).toBe('category');
    });
  });

  describe('Input: placeholder', () => {
    it('should initialize with default placeholder', () => {
      fixture.detectChanges();
      expect(service.placeholder()).toBe('Search...');
    });

    it('should set custom placeholder', () => {
      componentRef.setInput('placeholder', 'Select a fruit...');
      fixture.detectChanges();

      expect(service.placeholder()).toBe('Select a fruit...');
    });

    it('should update placeholder dynamically', () => {
      componentRef.setInput('placeholder', 'First');
      fixture.detectChanges();
      expect(service.placeholder()).toBe('First');

      componentRef.setInput('placeholder', 'Second');
      fixture.detectChanges();
      expect(service.placeholder()).toBe('Second');
    });
  });

  describe('Input: closeOnSelect', () => {
    it('should initialize with closeOnSelect enabled', () => {
      fixture.detectChanges();
      expect(service.closeOnSelect()).toBe(true);
    });

    it('should disable closeOnSelect', () => {
      componentRef.setInput('closeOnSelect', false);
      fixture.detectChanges();

      expect(service.closeOnSelect()).toBe(false);
    });

    it('should keep dropdown open when closeOnSelect is false', () => {
      componentRef.setInput('data', mockData);
      componentRef.setInput('closeOnSelect', false);
      fixture.detectChanges();

      service.open();
      service.selectItem(1);

      expect(service.isOpen()).toBe(true);
    });
  });

  describe('Input: disabled', () => {
    it('should initialize as not disabled', () => {
      fixture.detectChanges();
      expect(service.disabled()).toBe(false);
    });

    it('should disable combobox', () => {
      componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(service.disabled()).toBe(true);
    });

    it('should enable combobox', () => {
      componentRef.setInput('disabled', true);
      fixture.detectChanges();

      componentRef.setInput('disabled', false);
      fixture.detectChanges();

      expect(service.disabled()).toBe(false);
    });
  });

  describe('Output: selectionChange', () => {
    it('should emit when selection changes', (done) => {
      componentRef.setInput('data', mockData);
      fixture.detectChanges();

      component.selectionChange.subscribe((items: ComboboxInterface[]) => {
        expect(items.length).toBe(1);
        expect(items[0].value).toBe(1);
        done();
      });

      service.selectItem(1);
    });

    it('should emit empty array when cleared', (done) => {
      componentRef.setInput('data', mockData);
      fixture.detectChanges();

      service.selectItem(1);

      component.selectionChange.subscribe((items: ComboboxInterface[]) => {
        expect(items).toEqual([]);
        done();
      });

      service.clearSelection();
    });

    it('should emit multiple items in multi-select mode', (done) => {
      componentRef.setInput('data', mockData);
      componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      service.selectItem(1);
      service.selectItem(2);

      component.selectionChange.subscribe((items: ComboboxInterface[]) => {
        if (items.length === 3) {
          expect(items[0].value).toBe(1);
          expect(items[1].value).toBe(2);
          expect(items[2].value).toBe(3);
          done();
        }
      });

      service.selectItem(3);
    });

    it('should emit updated selection when item is deselected', (done) => {
      componentRef.setInput('data', mockData);
      componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      service.selectItem(1);
      service.selectItem(2);

      component.selectionChange.subscribe((items: ComboboxInterface[]) => {
        if (items.length === 1 && items[0].value === 1) {
          done();
        }
      });

      service.deselectItem(2);
    });
  });

  describe('Integration Tests', () => {
    it('should sync all inputs to service on initialization', () => {
      componentRef.setInput('data', mockData);
      componentRef.setInput('multiSelect', true);
      componentRef.setInput('triggerMode', 'custom');
      componentRef.setInput('groupBy', 'group');
      componentRef.setInput('placeholder', 'Custom placeholder');
      componentRef.setInput('closeOnSelect', false);
      componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(service.data()).toEqual(mockData);
      expect(service.multiSelect()).toBe(true);
      expect(service.triggerMode()).toBe('custom');
      expect(service.groupBy()).toBe('group');
      expect(service.placeholder()).toBe('Custom placeholder');
      expect(service.closeOnSelect()).toBe(false);
      expect(service.disabled()).toBe(true);
    });

    it('should handle input changes reactively', () => {
      componentRef.setInput('data', mockData);
      fixture.detectChanges();

      expect(service.data().length).toBe(3);

      const newData = [{ value: 4, label: 'New' }];
      componentRef.setInput('data', newData);
      fixture.detectChanges();

      expect(service.data().length).toBe(1);
    });

    it('should complete selection workflow with inputs', (done) => {
      componentRef.setInput('data', mockData);
      componentRef.setInput('placeholder', 'Pick a fruit');
      fixture.detectChanges();

      component.selectionChange.subscribe((items: ComboboxInterface[]) => {
        if (items.length === 1) {
          expect(items[0].label).toBe('Apple');
          expect(service.placeholder()).toBe('Pick a fruit');
          done();
        }
      });

      service.open();
      service.selectItem(1);
    });

    it('should handle multi-select workflow with closeOnSelect', () => {
      componentRef.setInput('data', mockData);
      componentRef.setInput('multiSelect', true);
      componentRef.setInput('closeOnSelect', false);
      fixture.detectChanges();

      service.open();
      service.selectItem(1);
      expect(service.isOpen()).toBe(true);

      service.selectItem(2);
      expect(service.isOpen()).toBe(true);
      expect(service.selectedValues().length).toBe(2);
    });
  });
});
