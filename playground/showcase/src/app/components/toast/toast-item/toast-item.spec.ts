import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastItem } from './toast-item';

describe('ToastItem', () => {
  let component: ToastItem;
  let fixture: ComponentFixture<ToastItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastItem]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToastItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
