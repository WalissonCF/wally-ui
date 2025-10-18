import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPopover } from './selection-popover';

describe('SelectionPopover', () => {
  let component: SelectionPopover;
  let fixture: ComponentFixture<SelectionPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionPopover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
