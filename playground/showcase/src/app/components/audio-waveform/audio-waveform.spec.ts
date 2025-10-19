import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioWaveform } from './audio-waveform';

describe('AudioWaveform', () => {
  let component: AudioWaveform;
  let fixture: ComponentFixture<AudioWaveform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioWaveform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioWaveform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
