import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuSubContent } from './dropdown-menu-sub-content';

describe('DropdownMenuSubContent', () => {
  let component: DropdownMenuSubContent;
  let fixture: ComponentFixture<DropdownMenuSubContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuSubContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuSubContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
