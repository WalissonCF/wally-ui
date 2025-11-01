import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit buttonClick when the button is clicked', () => {
    spyOn(component.buttonClick, 'emit');

    component.handleClick(new MouseEvent('click'));

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('Should apply the correct classes when variant is secondary', () => {
    fixture.componentRef.setInput('variant', 'secondary');

    const classes = component.variantClasses();

    expect(classes).toContain('bg-neutral-200');
  });

  it('Should be disabled ', () => {
    fixture.componentRef.setInput('disabled', true);

    const isDisabled = component.disabled();

    expect(isDisabled).toBe(true);
  });

  it('Should be loading', () => {
    fixture.componentRef.setInput('loading', true);

    const isLoading = component.loading();

    expect(isLoading).toBe(true);
  });

  it('Should show notification', () => {
    fixture.componentRef.setInput('showNotification', true);

    const isShowNotification = component.showNotification();

    expect(isShowNotification).toBe(true);
  });

  it('Should have a link', () => {
    fixture.componentRef.setInput('href', 'Link external');

    const href = component.href();
    const hasHref = href !== '';

    expect(hasHref).toBe(true);
  });

  it('Should emit buttonClick when clicking the rendered button in DOM', () => {
    spyOn(component.buttonClick, 'emit');

    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector('button');

    buttonElement.click();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('Should open external link in new tab when variant is link', () => {
    spyOn(window, 'open');

    fixture.componentRef.setInput('variant', 'link');
    fixture.componentRef.setInput('href', 'https://google.com');

    component.handleClick(new MouseEvent('click'));

    expect(window.open).toHaveBeenCalledWith('https://google.com', '_blank');
  });

  it('Should navigate internally when variant is link and href is internal', () => {
    spyOn(component['router'], 'navigate');

    fixture.componentRef.setInput('variant', 'link');
    fixture.componentRef.setInput('href', '/home');

    component.handleClick(new MouseEvent('click'));

    expect(component['router'].navigate).toHaveBeenCalledWith(['/home']);
  });
});
