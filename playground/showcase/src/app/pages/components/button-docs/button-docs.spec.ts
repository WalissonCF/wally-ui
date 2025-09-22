import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDocs } from './button-docs';

describe('Button', () => {
  let component: ButtonDocs;
  let fixture: ComponentFixture<ButtonDocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDocs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDocs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
