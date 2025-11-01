import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMessageList } from './ai-message-list';

describe('AiMessageList', () => {
  let component: AiMessageList;
  let fixture: ComponentFixture<AiMessageList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiMessageList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiMessageList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
