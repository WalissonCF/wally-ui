import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuPortal } from './dropdown-menu-portal';

describe('DropdownMenuPortal', () => {
  let component: DropdownMenuPortal;
  let fixture: ComponentFixture<DropdownMenuPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
