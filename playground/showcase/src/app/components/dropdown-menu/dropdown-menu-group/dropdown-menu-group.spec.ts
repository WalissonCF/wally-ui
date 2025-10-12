import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuGroup } from './dropdown-menu-group';

describe('DropdownMenuGroup', () => {
  let component: DropdownMenuGroup;
  let fixture: ComponentFixture<DropdownMenuGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
