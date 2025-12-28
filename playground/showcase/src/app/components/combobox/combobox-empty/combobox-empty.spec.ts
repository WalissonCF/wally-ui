import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

import { ComboboxEmpty } from './combobox-empty';

describe('ComboboxEmpty', () => {
  let component: ComboboxEmpty;
  let fixture: ComponentFixture<ComboboxEmpty>;
  let componentRef: ComponentRef<ComboboxEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxEmpty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxEmpty);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input: message', () => {
    it('should have default message', () => {
      expect(component.message()).toBe('No results found');
    });

    it('should accept custom message', () => {
      componentRef.setInput('message', 'No items to display');
      fixture.detectChanges();

      expect(component.message()).toBe('No items to display');
    });

    it('should update when changed', () => {
      componentRef.setInput('message', 'Empty list');
      fixture.detectChanges();
      expect(component.message()).toBe('Empty list');

      componentRef.setInput('message', 'Nothing here');
      fixture.detectChanges();
      expect(component.message()).toBe('Nothing here');
    });

    it('should accept empty string', () => {
      componentRef.setInput('message', '');
      fixture.detectChanges();

      expect(component.message()).toBe('');
    });
  });
});
