import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuSeparator } from './dropdown-menu-separator';

describe('DropdownMenuSeparator', () => {
  let component: DropdownMenuSeparator;
  let fixture: ComponentFixture<DropdownMenuSeparator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuSeparator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuSeparator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
