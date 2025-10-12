import { TestBed } from '@angular/core/testing';

import { DropdownMenuSubService } from './dropdown-menu-sub.service';

describe('DropdownMenuSubService', () => {
  let service: DropdownMenuSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownMenuSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
