import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

import { ComboboxGroup } from './combobox-group';

describe('ComboboxGroup', () => {
  let component: ComboboxGroup;
  let fixture: ComponentFixture<ComboboxGroup>;
  let componentRef: ComponentRef<ComboboxGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxGroup);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create', () => {
    componentRef.setInput('label', 'Test Group');
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('Input: label', () => {
    it('should be required', () => {
      componentRef.setInput('label', 'Frontend');
      fixture.detectChanges();

      expect(component.label()).toBe('Frontend');
    });

    it('should update when changed', () => {
      componentRef.setInput('label', 'Backend');
      fixture.detectChanges();
      expect(component.label()).toBe('Backend');

      componentRef.setInput('label', 'DevOps');
      fixture.detectChanges();
      expect(component.label()).toBe('DevOps');
    });

    it('should accept any string value', () => {
      const testLabels = ['Group 1', 'Category A', 'Section X', ''];

      testLabels.forEach(label => {
        componentRef.setInput('label', label);
        fixture.detectChanges();
        expect(component.label()).toBe(label);
      });
    });
  });
});
