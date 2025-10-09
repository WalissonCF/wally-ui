import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPromptInput } from './ai-prompt-input';

describe('AiPromptInput', () => {
  let component: AiPromptInput;
  let fixture: ComponentFixture<AiPromptInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPromptInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPromptInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
