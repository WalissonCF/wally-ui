import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuContent } from './dropdown-menu-content';

describe('DropdownMenuContent', () => {
  let component: DropdownMenuContent;
  let fixture: ComponentFixture<DropdownMenuContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
