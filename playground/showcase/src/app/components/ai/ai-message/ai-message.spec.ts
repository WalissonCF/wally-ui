import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMessage } from './ai-message';

describe('AiMessage', () => {
  let component: AiMessage;
  let fixture: ComponentFixture<AiMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
