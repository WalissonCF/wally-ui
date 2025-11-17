import { Component, effect, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';

import { AudioWaveformService } from './audio-waveform.service';
import { SpeechRecognitionService } from './speech-recognition.service';

@Component({
  selector: 'wally-audio-waveform',
  imports: [],
  providers: [AudioWaveformService, SpeechRecognitionService],
  templateUrl: './audio-waveform.html',
  styleUrl: './audio-waveform.css'
})
export class AudioWaveform {
  // Recording inputs
  isStartRecording: InputSignal<boolean> = input<boolean>(false);
  isStopRecording: InputSignal<boolean> = input<boolean>(false);
  showTimer: InputSignal<boolean> = input<boolean>(false);

  // Transcription inputs
  enableTranscription: InputSignal<boolean> = input<boolean>(false);
  transcriptionLanguage: InputSignal<string> = input<string>('pt-BR');

  // Transcription outputs
  transcriptionText: OutputEmitterRef<string> = output<string>();
  transcriptionComplete: OutputEmitterRef<string> = output<string>();
  transcriptionStateChange: OutputEmitterRef<boolean> = output<boolean>();

  recordingTime: WritableSignal<number> = signal<number>(0);
  private timerInterval: any = null;

  constructor(
    public audioWaveformService: AudioWaveformService
  ) {
    // Effect: Start recording
    effect(() => {
      if (this.isStartRecording()) {
        this.startRecording();
      }
    });

    // Effect: Stop recording
    effect(() => {
      if (this.isStopRecording()) {
        this.stopRecording();
      }
    });

    // Effect: Emit transcription text in real-time
    effect(() => {
      const fullText = this.audioWaveformService.getFullTranscribedText();
      if (fullText && this.enableTranscription()) {
        this.transcriptionText.emit(fullText);
      }
    });

    // Effect: Emit transcription state changes
    effect(() => {
      const isTranscribing = this.audioWaveformService.isTranscribing();
      if (this.enableTranscription()) {
        this.transcriptionStateChange.emit(isTranscribing);
      }
    });
  }

  async startRecording(): Promise<void> {
    try {
      await this.audioWaveformService.startRecording(
        this.enableTranscription(),
        this.transcriptionLanguage()
      );

      this.recordingTime.set(0);
      this.timerInterval = setInterval(() => {
        this.recordingTime.update(time => time + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  }

  stopRecording(): void {
    // Get final transcription before stopping
    const finalText = this.audioWaveformService.getFullTranscribedText();

    this.audioWaveformService.stopRecording();

    // Emit final transcription
    if (finalText && this.enableTranscription()) {
      this.transcriptionComplete.emit(finalText);
    }

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

  // Expose transcribing state
  get isTranscribing() {
    return this.audioWaveformService.isTranscribing;
  }
}
