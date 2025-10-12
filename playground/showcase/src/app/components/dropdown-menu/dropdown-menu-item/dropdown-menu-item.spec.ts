import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuItem } from './dropdown-menu-item';

describe('DropdownMenuItem', () => {
  let component: DropdownMenuItem;
  let fixture: ComponentFixture<DropdownMenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
