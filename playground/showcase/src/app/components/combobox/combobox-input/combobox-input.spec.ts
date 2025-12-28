import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ComboboxInput } from './combobox-input';
import { ComboboxService } from '../lib/service/combobox.service';
import { ComboboxInterface } from '../lib/models/combobox.model';

describe('ComboboxInput', () => {
  let component: ComboboxInput;
  let fixture: ComponentFixture<ComboboxInput>;
  let service: ComboboxService;
  let inputElement: DebugElement;

  const mockData: ComboboxInterface[] = [
    { value: 1, label: 'Apple' },
    { value: 2, label: 'Banana' },
    { value: 3, label: 'Orange' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxInput],
      providers: [ComboboxService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxInput);
    component = fixture.componentInstance;
    service = TestBed.inject(ComboboxService);
    service.setData(mockData);
    fixture.detectChanges();

    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ComboboxService', () => {
    expect(service).toBeTruthy();
  });

  describe('Input Focus', () => {
    it('should open combobox on focus', () => {
      expect(service.isOpen()).toBe(false);

      component.onInputFocus();

      expect(service.isOpen()).toBe(true);
    });

    it('should trigger onInputFocus when input is focused', () => {
      spyOn(component, 'onInputFocus');

      inputElement.nativeElement.focus();
      inputElement.triggerEventHandler('focus', {});

      expect(component.onInputFocus).toHaveBeenCalled();
    });
  });

  describe('Input Click', () => {
    it('should open combobox on click if closed', () => {
      expect(service.isOpen()).toBe(false);

      component.onInputClick();

      expect(service.isOpen()).toBe(true);
    });

    it('should not close combobox if already open', () => {
      service.open();
      expect(service.isOpen()).toBe(true);

      component.onInputClick();

      expect(service.isOpen()).toBe(true);
    });

    it('should trigger onInputClick when input is clicked', () => {
      spyOn(component, 'onInputClick');

      inputElement.triggerEventHandler('click', {});

      expect(component.onInputClick).toHaveBeenCalled();
    });
  });

  describe('Input Change', () => {
    it('should update search query on input', () => {
      const event = { target: { value: 'app' } } as any;

      component.onInput(event);

      expect(service.searchQuery()).toBe('app');
    });

    it('should open combobox on input if closed', () => {
      expect(service.isOpen()).toBe(false);

      const event = { target: { value: 'test' } } as any;
      component.onInput(event);

      expect(service.isOpen()).toBe(true);
    });

    it('should keep combobox open on input', () => {
      service.open();

      const event = { target: { value: 'test' } } as any;
      component.onInput(event);

      expect(service.isOpen()).toBe(true);
    });

    it('should trigger onInput when typing', () => {
      spyOn(component, 'onInput');

      const event = new Event('input');
      inputElement.nativeElement.dispatchEvent(event);
      inputElement.triggerEventHandler('input', event);

      expect(component.onInput).toHaveBeenCalled();
    });
  });

  describe('Chip Removal (Multi-Select)', () => {
    beforeEach(() => {
      service.setMultiSelect(true);
      service.selectItem(1);
      service.selectItem(2);
      fixture.detectChanges();
    });

    it('should remove chip when removeChip is called', () => {
      expect(service.selectedValues()).toContain(1);

      const event = new MouseEvent('click');
      component.removeChip(1, event);

      expect(service.selectedValues()).not.toContain(1);
    });

    it('should stop event propagation when removing chip', () => {
      const event = new MouseEvent('click');
      spyOn(event, 'stopPropagation');

      component.removeChip(1, event);

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should remove correct chip', () => {
      component.removeChip(1, new MouseEvent('click'));

      expect(service.selectedValues()).toEqual([2]);
    });
  });

  describe('Clear All', () => {
    beforeEach(() => {
      service.setMultiSelect(true);
      service.selectItem(1);
      service.selectItem(2);
      service.setSearchQuery('test');
      fixture.detectChanges();
    });

    it('should clear all selections', () => {
      expect(service.selectedValues().length).toBe(2);

      component.clearAll(inputElement.nativeElement);

      expect(service.selectedValues()).toEqual([]);
    });

    it('should clear search query', () => {
      expect(service.searchQuery()).toBe('test');

      component.clearAll(inputElement.nativeElement);

      expect(service.searchQuery()).toBe('');
    });

    it('should focus input after clearing', () => {
      const mockInput = jasmine.createSpyObj('HTMLInputElement', ['focus']);
      component.clearAll(mockInput);

      expect(mockInput.focus).toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    describe('Arrow Down', () => {
      it('should open combobox if closed', () => {
        expect(service.isOpen()).toBe(false);

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        spyOn(event, 'preventDefault');
        component.onKeyDown(event);

        expect(service.isOpen()).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should focus first item if none focused', () => {
        service.open();
        expect(service.focusedIndex()).toBe(-1);

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        component.onKeyDown(event);

        expect(service.focusedIndex()).toBe(0);
      });

      it('should focus next item', () => {
        service.open();
        service.focusFirst();

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        component.onKeyDown(event);

        expect(service.focusedIndex()).toBe(1);
      });
    });

    describe('Arrow Up', () => {
      it('should focus previous item', () => {
        service.open();
        service.focusLast();

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        spyOn(event, 'preventDefault');
        component.onKeyDown(event);

        expect(service.focusedIndex()).toBe(1);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should not do anything if combobox is closed', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        component.onKeyDown(event);

        expect(service.isOpen()).toBe(false);
      });
    });

    describe('Enter', () => {
      it('should select focused item', () => {
        service.open();
        service.focusFirst();

        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        spyOn(event, 'preventDefault');
        component.onKeyDown(event);

        expect(service.selectedValues()).toContain(1);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should not select if no item is focused', () => {
        service.open();

        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        component.onKeyDown(event);

        expect(service.selectedValues()).toEqual([]);
      });

      it('should not select if combobox is closed', () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        component.onKeyDown(event);

        expect(service.selectedValues()).toEqual([]);
      });
    });

    describe('Escape', () => {
      it('should close combobox if open', () => {
        service.open();

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        spyOn(event, 'preventDefault');
        component.onKeyDown(event);

        expect(service.isOpen()).toBe(false);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should not prevent default if combobox is closed', () => {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        const preventDefaultSpy = spyOn(event, 'preventDefault');
        component.onKeyDown(event);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });
    });

    describe('Backspace', () => {
      it('should remove last chip if input is empty in multi-select', () => {
        service.setMultiSelect(true);
        service.selectItem(1);
        service.selectItem(2);
        service.selectItem(3);

        const event = new KeyboardEvent('keydown', { key: 'Backspace' });
        component.onKeyDown(event);

        expect(service.selectedValues()).toEqual([1, 2]);
      });

      it('should not remove chip if input has text', () => {
        service.setMultiSelect(true);
        service.selectItem(1);
        service.selectItem(2);
        service.setSearchQuery('test');

        const event = new KeyboardEvent('keydown', { key: 'Backspace' });
        component.onKeyDown(event);

        expect(service.selectedValues()).toEqual([1, 2]);
      });

      it('should not remove chip if no items selected', () => {
        service.setMultiSelect(true);

        const event = new KeyboardEvent('keydown', { key: 'Backspace' });
        component.onKeyDown(event);

        expect(service.selectedValues()).toEqual([]);
      });
    });

    it('should handle HostListener keydown events', () => {
      spyOn(component, 'onKeyDown');

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      fixture.debugElement.nativeElement.dispatchEvent(event);

      expect(component.onKeyDown).toHaveBeenCalledWith(event);
    });
  });

  describe('Template Rendering', () => {
    it('should display selected chips in multi-select mode', () => {
      service.setMultiSelect(true);
      service.selectItem(1);
      service.selectItem(2);
      fixture.detectChanges();

      const chips = fixture.debugElement.queryAll(By.css('div[class*="bg-neutral-100"]'));
      expect(chips.length).toBe(2);
    });

    it('should not display chips in single-select mode', () => {
      service.setMultiSelect(false);
      service.selectItem(1);
      fixture.detectChanges();

      const chips = fixture.debugElement.queryAll(By.css('div[class*="bg-neutral-100"]'));
      expect(chips.length).toBe(0);
    });

    it('should display clear button when items are selected', () => {
      service.selectItem(1);
      fixture.detectChanges();

      const clearButton = fixture.debugElement.query(By.css('button[aria-label="Clear all"]'));
      expect(clearButton).toBeTruthy();
    });

    it('should not display clear button when no items selected', () => {
      fixture.detectChanges();

      const clearButton = fixture.debugElement.query(By.css('button[aria-label="Clear all"]'));
      expect(clearButton).toBeFalsy();
    });

    it('should display dropdown indicator', () => {
      const indicator = fixture.debugElement.query(By.css('svg[class*="rotate-180"]'));
      expect(indicator).toBeTruthy();
    });

    it('should rotate indicator when combobox is open', () => {
      service.open();
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(By.css('svg')).nativeElement;
      expect(indicator.classList.contains('rotate-180')).toBe(true);
    });

    it('should display placeholder when no items selected', () => {
      service.placeholder.set('Test placeholder');
      fixture.detectChanges();

      expect(inputElement.nativeElement.placeholder).toBe('Test placeholder');
    });

    it('should hide placeholder when items are selected', () => {
      service.placeholder.set('Test placeholder');
      service.selectItem(1);
      fixture.detectChanges();

      expect(inputElement.nativeElement.placeholder).toBe('');
    });

    it('should apply disabled state', () => {
      service.disabled.set(true);
      fixture.detectChanges();

      expect(inputElement.nativeElement.disabled).toBe(true);
    });

    it('should apply opacity when disabled', () => {
      service.disabled.set(true);
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('div'));
      expect(container.nativeElement.classList.contains('opacity-50')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have correct role', () => {
      expect(inputElement.nativeElement.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-expanded attribute', () => {
      expect(inputElement.nativeElement.hasAttribute('aria-expanded')).toBe(true);
    });

    it('should update aria-expanded when opened', () => {
      expect(inputElement.nativeElement.getAttribute('aria-expanded')).toBe('false');

      service.open();
      fixture.detectChanges();

      expect(inputElement.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-controls attribute', () => {
      expect(inputElement.nativeElement.getAttribute('aria-controls')).toBe('combobox-listbox');
    });

    it('should have autocomplete off', () => {
      expect(inputElement.nativeElement.getAttribute('autocomplete')).toBe('off');
    });

    it('should have aria-label on clear button', () => {
      service.selectItem(1);
      fixture.detectChanges();

      const clearButton = fixture.debugElement.query(By.css('button[aria-label="Clear all"]'));
      expect(clearButton.nativeElement.getAttribute('aria-label')).toBe('Clear all');
    });

    it('should have aria-label on chip remove buttons', () => {
      service.setMultiSelect(true);
      service.selectItem(1);
      fixture.detectChanges();

      const removeButton = fixture.debugElement.query(By.css('button[aria-label]'));
      expect(removeButton.nativeElement.getAttribute('aria-label')).toContain('Remove');
    });
  });
});
