import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuSubTrigger } from './dropdown-menu-sub-trigger';

describe('DropdownMenuSubTrigger', () => {
  let component: DropdownMenuSubTrigger;
  let fixture: ComponentFixture<DropdownMenuSubTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuSubTrigger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuSubTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
