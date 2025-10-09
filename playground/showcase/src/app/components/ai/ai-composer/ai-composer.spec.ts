import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiComposer } from './ai-composer';

describe('AiComposer', () => {
  let component: AiComposer;
  let fixture: ComponentFixture<AiComposer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiComposer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiComposer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
