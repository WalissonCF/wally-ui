import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxSearch } from './combobox-search';
import { ComboboxService } from '../lib/service/combobox.service';

describe('ComboboxSearch', () => {
  let component: ComboboxSearch;
  let fixture: ComponentFixture<ComboboxSearch>;
  let service: ComboboxService;

  const mockData = [
    { value: 1, label: 'Apple' },
    { value: 2, label: 'Banana' },
    { value: 3, label: 'Orange' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxSearch],
      providers: [ComboboxService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxSearch);
    component = fixture.componentInstance;
    service = TestBed.inject(ComboboxService);
    service.setData(mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ComboboxService', () => {
    expect(service).toBeTruthy();
  });

  describe('Input Handling', () => {
    it('should update search query on input', () => {
      const event = { target: { value: 'apple' } } as any;

      component.onInput(event);

      expect(service.searchQuery()).toBe('apple');
    });

    it('should handle empty input', () => {
      service.setSearchQuery('test');

      const event = { target: { value: '' } } as any;
      component.onInput(event);

      expect(service.searchQuery()).toBe('');
    });

    it('should update search query multiple times', () => {
      const event1 = { target: { value: 'a' } } as any;
      component.onInput(event1);
      expect(service.searchQuery()).toBe('a');

      const event2 = { target: { value: 'ap' } } as any;
      component.onInput(event2);
      expect(service.searchQuery()).toBe('ap');

      const event3 = { target: { value: 'app' } } as any;
      component.onInput(event3);
      expect(service.searchQuery()).toBe('app');
    });
  });

  describe('Keyboard Handling', () => {
    describe('Arrow Down', () => {
      it('should focus next item', () => {
        service.focusFirst();

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        spyOn(event, 'preventDefault');
        component.onKeyDown(event);

        expect(service.focusedIndex()).toBe(1);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should prevent default behavior', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        spyOn(event, 'preventDefault');

        component.onKeyDown(event);

        expect(event.preventDefault).toHaveBeenCalled();
      });
    });

    describe('Arrow Up', () => {
      it('should focus previous item', () => {
        service.focusLast();

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        spyOn(event, 'preventDefault');
        component.onKeyDown(event);

        expect(service.focusedIndex()).toBe(1);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should prevent default behavior', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        spyOn(event, 'preventDefault');

        component.onKeyDown(event);

        expect(event.preventDefault).toHaveBeenCalled();
      });
    });

    describe('Enter', () => {
      it('should select focused item', () => {
        service.focusFirst();

        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        spyOn(event, 'preventDefault');
        component.onKeyDown(event);

        expect(service.selectedValues()).toContain(1);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should prevent default behavior', () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        spyOn(event, 'preventDefault');

        component.onKeyDown(event);

        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should not select if no item is focused', () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        component.onKeyDown(event);

        expect(service.selectedValues()).toEqual([]);
      });
    });

    describe('Other Keys', () => {
      it('should not prevent default for other keys', () => {
        const event = new KeyboardEvent('keydown', { key: 'a' });
        const preventDefaultSpy = spyOn(event, 'preventDefault');

        component.onKeyDown(event);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      it('should not affect service for other keys', () => {
        const initialIndex = service.focusedIndex();

        const event = new KeyboardEvent('keydown', { key: 'Backspace' });
        component.onKeyDown(event);

        expect(service.focusedIndex()).toBe(initialIndex);
      });
    });
  });
});
