import { Component, effect, input, InputSignal, signal, WritableSignal } from '@angular/core';

import { AudioWaveformService } from './audio-waveform.service';

@Component({
  selector: 'wally-audio-waveform',
  imports: [],
  providers: [AudioWaveformService],
  templateUrl: './audio-waveform.html',
  styleUrl: './audio-waveform.css'
})
export class AudioWaveform {
  isStartRecording: InputSignal<boolean> = input<boolean>(false);
  isStopRecording: InputSignal<boolean> = input<boolean>(false);
  showTimer: InputSignal<boolean> = input<boolean>(false);

  recordingTime: WritableSignal<number> = signal<number>(0);
  private timerInterval: any = null;

  constructor(
    public audioWaveformService: AudioWaveformService
  ) {
    effect(() => {
      if (this.isStartRecording()) {
        this.startRecording();
      }
    });
    effect(() => {
      if (this.isStopRecording()) {
        this.stopRecording();
      }
    });
  }

  async startRecording(): Promise<void> {
    try {
      await this.audioWaveformService.startRecording();

      this.recordingTime.set(0);
      this.timerInterval = setInterval(() => {
        this.recordingTime.update(time => time + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  }

  stopRecording(): void {
    this.audioWaveformService.stopRecording();

    // Stop timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Format seconds to MM:SS
  get formattedTime(): string {
    const time = this.recordingTime();
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
