import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxTrigger } from './combobox-trigger';
import { ComboboxService } from '../lib/service/combobox.service';

describe('ComboboxTrigger', () => {
  let component: ComboboxTrigger;
  let fixture: ComponentFixture<ComboboxTrigger>;
  let service: ComboboxService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxTrigger],
      providers: [ComboboxService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxTrigger);
    component = fixture.componentInstance;
    service = TestBed.inject(ComboboxService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject ComboboxService', () => {
    expect(service).toBeTruthy();
  });

  describe('Click Handling', () => {
    it('should toggle combobox on click in custom mode', () => {
      service.setTriggerMode('custom');
      expect(service.isOpen()).toBe(false);

      component.onClick();

      expect(service.isOpen()).toBe(true);
    });

    it('should toggle from open to closed on click', () => {
      service.setTriggerMode('custom');
      service.open();

      component.onClick();

      expect(service.isOpen()).toBe(false);
    });

    it('should not toggle in input mode', () => {
      service.setTriggerMode('input');
      expect(service.isOpen()).toBe(false);

      component.onClick();

      expect(service.isOpen()).toBe(false);
    });
  });

  describe('Keyboard Handling', () => {
    it('should toggle on Enter key in custom mode', () => {
      service.setTriggerMode('custom');
      expect(service.isOpen()).toBe(false);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');
      component.onKeyDown(event);

      expect(service.isOpen()).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should toggle on Space key in custom mode', () => {
      service.setTriggerMode('custom');
      expect(service.isOpen()).toBe(false);

      const event = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(event, 'preventDefault');
      component.onKeyDown(event);

      expect(service.isOpen()).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not toggle on other keys in custom mode', () => {
      service.setTriggerMode('custom');

      const event = new KeyboardEvent('keydown', { key: 'a' });
      component.onKeyDown(event);

      expect(service.isOpen()).toBe(false);
    });

    it('should not toggle on Enter in input mode', () => {
      service.setTriggerMode('input');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      const preventDefaultSpy = spyOn(event, 'preventDefault');
      component.onKeyDown(event);

      expect(service.isOpen()).toBe(false);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should not toggle on Space in input mode', () => {
      service.setTriggerMode('input');

      const event = new KeyboardEvent('keydown', { key: ' ' });
      const preventDefaultSpy = spyOn(event, 'preventDefault');
      component.onKeyDown(event);

      expect(service.isOpen()).toBe(false);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe('HostListener', () => {
    it('should handle click event via HostListener', () => {
      spyOn(component, 'onClick');
      service.setTriggerMode('custom');

      fixture.nativeElement.click();

      expect(component.onClick).toHaveBeenCalled();
    });

    it('should handle keydown event via HostListener', () => {
      spyOn(component, 'onKeyDown');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      fixture.nativeElement.dispatchEvent(event);

      expect(component.onKeyDown).toHaveBeenCalledWith(event);
    });
  });
});
