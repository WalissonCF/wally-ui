import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mcp } from './mcp';

describe('Mcp', () => {
  let component: Mcp;
  let fixture: ComponentFixture<Mcp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mcp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mcp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
