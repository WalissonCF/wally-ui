import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiChat } from './ai-chat';

describe('AiChat', () => {
  let component: AiChat;
  let fixture: ComponentFixture<AiChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
