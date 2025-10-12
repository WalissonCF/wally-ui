import { TestBed } from '@angular/core/testing';

import { DropdownMenuService } from './dropdown-menu.service';

describe('DropdownMenuService', () => {
  let service: DropdownMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
