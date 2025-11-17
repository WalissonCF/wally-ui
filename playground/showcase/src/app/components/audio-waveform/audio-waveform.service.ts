import { Injectable, signal, WritableSignal } from '@angular/core';

import { SpeechRecognitionService } from './speech-recognition.service';

@Injectable()
export class AudioWaveformService {
  isRecording: WritableSignal<boolean> = signal<boolean>(false);
  audioData: WritableSignal<number[]> = signal<number[]>([]); // Frequency values for bars

  // Recorded audio signals
  recordedAudioBlob: WritableSignal<Blob | null> = signal<Blob | null>(null);
  recordedAudioUrl: WritableSignal<string | null> = signal<string | null>(null);

  // Transcription signals (exposed from SpeechRecognitionService)
  get transcribedText() {
    return this.speechRecognitionService.transcribedText;
  }
  get isTranscribing() {
    return this.speechRecognitionService.isTranscribing;
  }
  get transcriptionError() {
    return this.speechRecognitionService.error;
  }

  // Audio API references
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private animationFrame: number | null = null;
  private stream: MediaStream | null = null;

  // Configuration
  private readonly FFT_SIZE = 256; // Higher = more frequency detail
  private readonly SMOOTHING = 0.8; // 0 (no smoothing) to 1 (max smoothing)

  // Responsive bar count based on screen width
  private get BAR_COUNT(): number {
    if (typeof window === 'undefined') return 30; // SSR fallback
    return window.innerWidth < 768 ? 30 : 65; // Mobile: 30 bars, Desktop: 65 bars
  }

  // MediaRecorded
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(private speechRecognitionService: SpeechRecognitionService) {}

  async startRecording(enableTranscription: boolean = false, language: string = 'pt-BR'): Promise<void> {
    try {
      // Request microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Create audio context
      this.audioContext = new AudioContext();

      // Create analyzer
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.FFT_SIZE;
      this.analyser.smoothingTimeConstant = this.SMOOTHING;

      // Connect microphone to analyzer
      this.microphone = this.audioContext.createMediaStreamSource(this.stream);
      this.microphone?.connect(this.analyser);

      // Init MediaRecorded
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.recordedAudioBlob.set(audioBlob);

        const audioUrl = URL.createObjectURL(audioBlob);
        this.recordedAudioUrl.set(audioUrl);
      };

      this.mediaRecorder.start();

      // Start transcription if enabled
      if (enableTranscription) {
        this.speechRecognitionService.start(language);
      }

      // Start animation loop
      this.isRecording.set(true);
      this.updateWaveForm();

    } catch (error) {
      console.error('Microphone access denied:', error);
      throw error;
    }
  }

  stopRecording(): void {
    // Stop animation
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    // Stop transcription
    if (this.speechRecognitionService.isTranscribing()) {
      this.speechRecognitionService.stop();
    }

    // Disconnect audio nodes
    this.microphone?.disconnect();
    this.audioContext?.close();

    // Stop microphone strem
    this.stream?.getTracks().forEach(track => track.stop());

    // Reset state
    this.isRecording.set(false);
    this.audioData.set([]);

    // Clean up references
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.stream = null;
    this.mediaRecorder = null;
  }

  // Download recorded audio
  downloadRecording(filename: string = `recording-${Date.now()}.webm`): void {
    const url = this.recordedAudioUrl();
    
    if (!url) {
      console.error('No recorded audio available');
      return;
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }

  // Clear recorded audio and free memory
  clearRecording(): void {
    // Revoke URL to free memory
    const url = this.recordedAudioUrl();
    if (url) {
      URL.revokeObjectURL(url);
    }

    this.recordedAudioBlob.set(null);
    this.recordedAudioUrl.set(null);
    this.audioChunks = [];

    // Reset transcription
    this.speechRecognitionService.reset();
  }

  /**
   * Get full transcribed text (final + interim)
   */
  getFullTranscribedText(): string {
    return this.speechRecognitionService.getFullText();
  }

  private updateWaveForm(): void {
    if (!this.analyser || !this.isRecording()) return;

    // Get frequency data
    const bufferLength: number = this.analyser.frequencyBinCount; // 128 (FFT_SIZE/2)
    const dataArray: Uint8Array<ArrayBuffer> = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray); // Values 0-255

    // Reduce to BAR_COUNT bars (average frequencies)
    const bars: number[] = [];
    const samplesPerBar: number = Math.floor(bufferLength / this.BAR_COUNT);

    for (let i = 0; i < this.BAR_COUNT; i++) {
      const start = i * samplesPerBar;
      const end = start + samplesPerBar;

      // Average frequency values for this bar
      let sum = 0;
      for (let j = start; j < end; j++) {
        sum += dataArray[j];
      }
      const average = sum / samplesPerBar;

      // Normalize to 0-100 range for height percentage
      const normalized = (average / 255) * 100;
      bars.push(normalized);
    }

    this.audioData.set(bars);

    this.animationFrame = requestAnimationFrame(() => this.updateWaveForm());
  }
}
