import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuLabel } from './dropdown-menu-label';

describe('DropdownMenuLabel', () => {
  let component: DropdownMenuLabel;
  let fixture: ComponentFixture<DropdownMenuLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuLabel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuLabel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
