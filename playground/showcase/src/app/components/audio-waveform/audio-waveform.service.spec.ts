import { TestBed } from '@angular/core/testing';

import { AudioWaveformService } from './audio-waveform.service';

describe('AudioWaveformService', () => {
  let service: AudioWaveformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioWaveformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
