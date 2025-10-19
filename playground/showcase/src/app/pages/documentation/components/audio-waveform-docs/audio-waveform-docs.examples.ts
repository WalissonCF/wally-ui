// Audio Waveform documentation code examples
export const AudioWaveformCodeExamples = {
  // Installation
  installation: `npx wally-ui add audio-waveform`,

  // Import examples
  import: `import { AudioWaveform } from './components/wally-ui/audio-waveform/audio-waveform';
import { AudioWaveformService } from './components/wally-ui/audio-waveform/audio-waveform.service';`,

  componentImport: `@Component({
  selector: 'app-example',
  imports: [AudioWaveform],
  templateUrl: './example.html'
})`,

  // Basic usage
  basicUsage: `<wally-audio-waveform
  [isStartRecording]="isRecording()"
  [isStopRecording]="!isRecording()">
</wally-audio-waveform>`,

  // With timer
  withTimer: `<wally-audio-waveform
  [isStartRecording]="isRecording()"
  [isStopRecording]="!isRecording()"
  [showTimer]="true">
</wally-audio-waveform>`,

  // Complete Example with Controls
  completeExample: `<div class="flex flex-col gap-4">
  <!-- Waveform Visualizer -->
  <wally-audio-waveform
    [isStartRecording]="isRecording()"
    [isStopRecording]="!isRecording()"
    [showTimer]="true">
  </wally-audio-waveform>

  <!-- Recording Controls -->
  <div class="flex gap-2">
    @if (!isRecording()) {
      <button (click)="startRecording()"
        class="px-4 py-2 bg-red-500 text-white rounded-full">
        Start Recording
      </button>
    } @else {
      <button (click)="stopRecording()"
        class="px-4 py-2 bg-neutral-500 text-white rounded-full">
        Stop Recording
      </button>
    }
  </div>
</div>`,

  completeExampleTs: `export class RecordingComponent {
  isRecording = signal(false);

  startRecording() {
    this.isRecording.set(true);
  }

  stopRecording() {
    this.isRecording.set(false);
  }
}`,

  // Service Integration
  serviceIntegration: `// Access the service to get recorded audio
export class RecordingComponent {
  @ViewChild(AudioWaveform) audioWaveform!: AudioWaveform;

  downloadRecording() {
    const service = this.audioWaveform.audioWaveformService;
    service.downloadRecording('my-recording.webm');
  }

  getRecordedBlob() {
    const service = this.audioWaveform.audioWaveformService;
    const blob = service.recordedAudioBlob();
    return blob;
  }

  clearRecording() {
    const service = this.audioWaveform.audioWaveformService;
    service.clearRecording();
  }
}`,

  // Responsive Configuration
  responsiveConfig: `// Service Configuration (auto-responsive)
// Mobile (< 768px): 30 bars
// Desktop (>= 768px): 65 bars
// Automatically adjusts based on screen width`,

  // Future: Audio Transcription
  futureTranscription: `// COMING SOON: Audio Transcription
// The component will support automatic transcription in a future release

<wally-audio-waveform
  [isStartRecording]="isRecording()"
  [isStopRecording]="!isRecording()"
  [enableTranscription]="true"
  (transcriptionComplete)="onTranscription($event)">
</wally-audio-waveform>`,

  // Web Audio API Concepts
  webAudioConcepts: `// How it works under the hood:
// 1. getUserMedia() - Request microphone access
// 2. AudioContext - Process audio in real-time
// 3. AnalyserNode - FFT analysis (256 samples → 128 frequencies)
// 4. getByteFrequencyData() - Get frequency values (0-255)
// 5. Normalize to 0-100% for bar heights
// 6. requestAnimationFrame - Smooth 60fps animation`,

  // Properties: Inputs
  propertyIsStartRecording: `isStartRecording: InputSignal<boolean> = input<boolean>(false);`,
  propertyIsStopRecording: `isStopRecording: InputSignal<boolean> = input<boolean>(false);`,
  propertyShowTimer: `showTimer: InputSignal<boolean> = input<boolean>(false);`,

  // Properties: Service Signals
  servicePropertyIsRecording: `isRecording: WritableSignal<boolean>`,
  servicePropertyAudioData: `audioData: WritableSignal<number[]>  // Bar heights (0-100%)`,
  servicePropertyRecordedAudioBlob: `recordedAudioBlob: WritableSignal<Blob | null>`,
  servicePropertyRecordedAudioUrl: `recordedAudioUrl: WritableSignal<string | null>`,

  // Methods
  methodDownloadRecording: `downloadRecording(filename?: string): void`,
  methodClearRecording: `clearRecording(): void`,

  // Configuration constants
  configFFTSize: `FFT_SIZE = 256  // Higher = more frequency detail`,
  configBarCount: `BAR_COUNT = 30 (mobile) | 65 (desktop)  // Auto-responsive`,
  configSmoothing: `SMOOTHING = 0.8  // 0 (no smoothing) to 1 (max smoothing)`,

  // Accessibility
  accessibilityExample: `<!-- The component includes built-in accessibility -->
<!-- Timer updates announced via aria-live region (when showTimer=true) -->
<!-- Waveform visualizer is decorative (aria-hidden) -->`,

  // Browser Support
  browserSupport: `// Requires modern browsers with:
// - Web Audio API
// - MediaStream API
// - MediaRecorder API
//
// Supported: Chrome 60+, Firefox 55+, Safari 14+, Edge 79+`,
};
