import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastDocs } from './toast-docs';

describe('ToastDocs', () => {
  let component: ToastDocs;
  let fixture: ComponentFixture<ToastDocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastDocs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastDocs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
