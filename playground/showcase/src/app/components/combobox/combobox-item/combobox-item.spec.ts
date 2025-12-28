import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

import { ComboboxItem } from './combobox-item';
import { ComboboxService } from '../lib/service/combobox.service';
import { ComboboxInterface } from '../lib/models/combobox.model';

describe('ComboboxItem', () => {
  let component: ComboboxItem;
  let fixture: ComponentFixture<ComboboxItem>;
  let componentRef: ComponentRef<ComboboxItem>;
  let service: ComboboxService;

  const mockItem: ComboboxInterface = { value: 1, label: 'Apple', description: 'A red fruit' };
  const mockData: ComboboxInterface[] = [
    mockItem,
    { value: 2, label: 'Banana' },
    { value: 3, label: 'Orange' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxItem],
      providers: [ComboboxService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxItem);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    service = TestBed.inject(ComboboxService);

    componentRef.setInput('item', mockItem);
    service.setData(mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ComboboxService', () => {
    expect(service).toBeTruthy();
  });

  describe('Input: item', () => {
    it('should be required', () => {
      expect(component.item()).toEqual(mockItem);
    });

    it('should update when changed', () => {
      const newItem: ComboboxInterface = { value: 4, label: 'Mango' };
      componentRef.setInput('item', newItem);
      fixture.detectChanges();

      expect(component.item()).toEqual(newItem);
    });
  });

  describe('Input: focused', () => {
    it('should default to false', () => {
      expect(component.focused()).toBe(false);
    });

    it('should accept true', () => {
      componentRef.setInput('focused', true);
      fixture.detectChanges();

      expect(component.focused()).toBe(true);
    });
  });

  describe('Input: selected', () => {
    it('should default to false', () => {
      expect(component.selected()).toBe(false);
    });

    it('should accept true', () => {
      componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(component.selected()).toBe(true);
    });
  });

  describe('Click Handling', () => {
    it('should select item on click', () => {
      const event = new MouseEvent('click');
      spyOn(event, 'stopPropagation');

      component.handleClick(event);

      expect(service.selectedValues()).toContain(1);
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should not select disabled item', () => {
      const disabledItem: ComboboxInterface = { value: 5, label: 'Disabled', disabled: true };
      componentRef.setInput('item', disabledItem);
      fixture.detectChanges();

      const event = new MouseEvent('click');
      component.handleClick(event);

      expect(service.selectedValues()).not.toContain(5);
    });

    it('should stop event propagation', () => {
      const event = new MouseEvent('click');
      spyOn(event, 'stopPropagation');

      component.handleClick(event);

      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('Mouse Enter Handling', () => {
    it('should focus item on mouse enter', () => {
      component.onMouseEnter();

      expect(service.focusedIndex()).toBe(0);
    });

    it('should not focus disabled item', () => {
      const disabledItem: ComboboxInterface = { value: 5, label: 'Disabled', disabled: true };
      componentRef.setInput('item', disabledItem);
      fixture.detectChanges();

      component.onMouseEnter();

      expect(service.focusedIndex()).toBe(-1);
    });

    it('should find correct index in filtered data', () => {
      service.setData([
        { value: 1, label: 'Apple' },
        { value: 2, label: 'Banana' },
        { value: 3, label: 'Apricot' }
      ]);

      service.setSearchQuery('ban');
      fixture.detectChanges();

      const bananaItem: ComboboxInterface = { value: 2, label: 'Banana' };
      componentRef.setInput('item', bananaItem);
      fixture.detectChanges();

      component.onMouseEnter();

      expect(service.focusedIndex()).toBe(0); // First in filtered results
    });

    it('should not focus if item not found in filtered data', () => {
      service.setSearchQuery('xyz'); // No matches

      component.onMouseEnter();

      expect(service.focusedIndex()).toBe(-1);
    });
  });

  describe('HostListener', () => {
    it('should handle mouseenter event via HostListener', () => {
      spyOn(component, 'onMouseEnter');

      const event = new MouseEvent('mouseenter');
      fixture.nativeElement.dispatchEvent(event);

      expect(component.onMouseEnter).toHaveBeenCalled();
    });
  });
});
