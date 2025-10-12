import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuTrigger } from './dropdown-menu-trigger';

describe('DropdownMenuTrigger', () => {
  let component: DropdownMenuTrigger;
  let fixture: ComponentFixture<DropdownMenuTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuTrigger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
