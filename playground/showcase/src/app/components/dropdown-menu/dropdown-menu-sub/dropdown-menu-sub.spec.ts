import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuSub } from './dropdown-menu-sub';

describe('DropdownMenuSub', () => {
  let component: DropdownMenuSub;
  let fixture: ComponentFixture<DropdownMenuSub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuSub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuSub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
