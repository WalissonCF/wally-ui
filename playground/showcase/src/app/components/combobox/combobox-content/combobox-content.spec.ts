import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

import { ComboboxContent } from './combobox-content';
import { ComboboxService } from '../lib/service/combobox.service';
import { ComboboxPosition } from '../lib/types/combobox-position.type';

describe('ComboboxContent', () => {
  let component: ComboboxContent;
  let fixture: ComponentFixture<ComboboxContent>;
  let componentRef: ComponentRef<ComboboxContent>;
  let service: ComboboxService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxContent],
      providers: [ComboboxService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxContent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    service = TestBed.inject(ComboboxService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ComboboxService', () => {
    expect(service).toBeTruthy();
  });

  describe('Input: position', () => {
    it('should default to bottom position', () => {
      expect(component.position()).toBe('bottom');
    });

    it('should accept top position', () => {
      componentRef.setInput('position', 'top');
      fixture.detectChanges();

      expect(component.position()).toBe('top');
    });

    it('should accept all valid positions', () => {
      const positions: ComboboxPosition[] = ['top', 'bottom', 'left', 'right'];

      positions.forEach(pos => {
        componentRef.setInput('position', pos);
        fixture.detectChanges();
        expect(component.position()).toBe(pos);
      });
    });
  });

  describe('Position Calculation', () => {
    it('should initialize with bottom calculated position', () => {
      expect(component.calculatedPosition()).toBe('bottom');
    });

    it('should generate correct position classes for bottom', () => {
      component.calculatedPosition.set('bottom');
      const classes = component.positionClasses();

      expect(classes).toContain('top-full');
      expect(classes).toContain('mt-2');
      expect(classes).toContain('left-0');
    });

    it('should generate correct position classes for top', () => {
      component.calculatedPosition.set('top');
      const classes = component.positionClasses();

      expect(classes).toContain('bottom-full');
      expect(classes).toContain('mb-2');
      expect(classes).toContain('left-0');
    });

    it('should generate correct position classes for right', () => {
      component.calculatedPosition.set('right');
      const classes = component.positionClasses();

      expect(classes).toContain('left-full');
      expect(classes).toContain('ml-2');
      expect(classes).toContain('top-0');
    });

    it('should generate correct position classes for left', () => {
      component.calculatedPosition.set('left');
      const classes = component.positionClasses();

      expect(classes).toContain('right-full');
      expect(classes).toContain('mr-2');
      expect(classes).toContain('top-0');
    });

    it('should include scroll classes', () => {
      const classes = component.positionClasses();

      expect(classes).toContain('max-h-96');
      expect(classes).toContain('overflow-y-auto');
    });
  });

  describe('Global Index Calculation', () => {
    it('should return item index when no grouping', () => {
      const index = component.getGlobalIndex(0, 5);
      expect(index).toBe(5);
    });

    it('should calculate global index for grouped items', () => {
      service.setData([
        { value: 1, label: 'JS', group: 'Frontend' },
        { value: 2, label: 'TS', group: 'Frontend' },
        { value: 3, label: 'Python', group: 'Backend' },
        { value: 4, label: 'Java', group: 'Backend' }
      ]);
      service.setGroupBy('group');

      // First item in second group (Backend)
      const index = component.getGlobalIndex(1, 0);
      expect(index).toBe(2); // After 2 Frontend items
    });

    it('should handle multiple groups correctly', () => {
      service.setData([
        { value: 1, label: 'Item1', group: 'A' },
        { value: 2, label: 'Item2', group: 'A' },
        { value: 3, label: 'Item3', group: 'B' },
        { value: 4, label: 'Item4', group: 'C' },
        { value: 5, label: 'Item5', group: 'C' }
      ]);
      service.setGroupBy('group');

      expect(component.getGlobalIndex(0, 0)).toBe(0); // First item in Group A
      expect(component.getGlobalIndex(1, 0)).toBe(2); // First item in Group B
      expect(component.getGlobalIndex(2, 1)).toBe(4); // Second item in Group C
    });
  });

  describe('Window Resize', () => {
    it('should recalculate position on resize when open', () => {
      spyOn<any>(component, 'calculateBestPosition').and.returnValue('top');
      service.open();

      component.onResize();

      expect(component['calculateBestPosition']).toHaveBeenCalled();
      expect(component.calculatedPosition()).toBe('top');
    });

    it('should not recalculate position on resize when closed', () => {
      spyOn<any>(component, 'calculateBestPosition');

      component.onResize();

      expect(component['calculateBestPosition']).not.toHaveBeenCalled();
    });
  });

  describe('Escape Key', () => {
    it('should close combobox on escape when open', () => {
      service.open();
      expect(service.isOpen()).toBe(true);

      component.onEscape();

      expect(service.isOpen()).toBe(false);
    });

    it('should not error on escape when closed', () => {
      expect(service.isOpen()).toBe(false);

      expect(() => component.onEscape()).not.toThrow();
    });
  });

  describe('Click Outside', () => {
    it('should close when clicking outside', () => {
      service.open();

      const event = new MouseEvent('mousedown');
      Object.defineProperty(event, 'target', { value: document.body, enumerable: true });

      component.onDocumentClick(event);

      expect(service.isOpen()).toBe(false);
    });

    it('should not close when clicking inside content', () => {
      service.open();

      const event = new MouseEvent('mousedown');
      Object.defineProperty(event, 'target', { value: fixture.nativeElement, enumerable: true });

      component.onDocumentClick(event);

      expect(service.isOpen()).toBe(true);
    });

    it('should not process click when combobox is closed', () => {
      const closeSpy = spyOn(service, 'close');

      const event = new MouseEvent('mousedown');
      Object.defineProperty(event, 'target', { value: document.body, enumerable: true });

      component.onDocumentClick(event);

      expect(closeSpy).not.toHaveBeenCalled();
    });
  });

  describe('Position Recalculation on Open', () => {
    it('should recalculate position when opening', (done) => {
      spyOn<any>(component, 'calculateBestPosition').and.returnValue('top');

      service.open();

      setTimeout(() => {
        expect(component['calculateBestPosition']).toHaveBeenCalled();
        done();
      }, 10);
    });
  });
});
