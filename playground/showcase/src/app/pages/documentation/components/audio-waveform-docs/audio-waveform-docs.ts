import { Component, signal, WritableSignal } from '@angular/core';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { AudioWaveformCodeExamples } from './audio-waveform-docs.examples';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { AudioWaveform } from '../../../../components/audio-waveform/audio-waveform';
import { Button } from '../../../../components/button/button';

@Component({
  selector: 'app-audio-waveform-docs',
  imports: [
    Breadcrumb,
    AudioWaveform,
    Button
  ],
  templateUrl: './audio-waveform-docs.html',
  styleUrl: './audio-waveform-docs.css'
})
export class AudioWaveformDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Audio Waveform' }
  ];

  // Installation & Import
  installationCode = getFormattedCode(AudioWaveformCodeExamples.installation, 'bash');
  importCode = getFormattedCode(AudioWaveformCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(AudioWaveformCodeExamples.componentImport, 'typescript');

  // Basic Usage
  basicUsageCode = getFormattedCode(AudioWaveformCodeExamples.basicUsage, 'html');
  withTimerCode = getFormattedCode(AudioWaveformCodeExamples.withTimer, 'html');
  completeExampleCode = getFormattedCode(AudioWaveformCodeExamples.completeExample, 'html');
  completeExampleTsCode = getFormattedCode(AudioWaveformCodeExamples.completeExampleTs, 'typescript');

  // Service Integration
  serviceIntegrationCode = getFormattedCode(AudioWaveformCodeExamples.serviceIntegration, 'typescript');

  // Configuration
  responsiveConfigCode = getFormattedCode(AudioWaveformCodeExamples.responsiveConfig, 'typescript');
  webAudioConceptsCode = getFormattedCode(AudioWaveformCodeExamples.webAudioConcepts, 'typescript');

  // Future Features
  futureTranscriptionCode = getFormattedCode(AudioWaveformCodeExamples.futureTranscription, 'html');

  // Properties
  propertyIsStartRecordingCode = getFormattedCode(AudioWaveformCodeExamples.propertyIsStartRecording, 'typescript');
  propertyIsStopRecordingCode = getFormattedCode(AudioWaveformCodeExamples.propertyIsStopRecording, 'typescript');
  propertyShowTimerCode = getFormattedCode(AudioWaveformCodeExamples.propertyShowTimer, 'typescript');

  // Service Properties
  servicePropertyIsRecordingCode = getFormattedCode(AudioWaveformCodeExamples.servicePropertyIsRecording, 'typescript');
  servicePropertyAudioDataCode = getFormattedCode(AudioWaveformCodeExamples.servicePropertyAudioData, 'typescript');
  servicePropertyRecordedAudioBlobCode = getFormattedCode(AudioWaveformCodeExamples.servicePropertyRecordedAudioBlob, 'typescript');
  servicePropertyRecordedAudioUrlCode = getFormattedCode(AudioWaveformCodeExamples.servicePropertyRecordedAudioUrl, 'typescript');

  // Methods
  methodDownloadRecordingCode = getFormattedCode(AudioWaveformCodeExamples.methodDownloadRecording, 'typescript');
  methodClearRecordingCode = getFormattedCode(AudioWaveformCodeExamples.methodClearRecording, 'typescript');

  // Configuration
  configFFTSizeCode = getFormattedCode(AudioWaveformCodeExamples.configFFTSize, 'typescript');
  configBarCountCode = getFormattedCode(AudioWaveformCodeExamples.configBarCount, 'typescript');
  configSmoothingCode = getFormattedCode(AudioWaveformCodeExamples.configSmoothing, 'typescript');

  // Accessibility & Browser Support
  accessibilityExampleCode = getFormattedCode(AudioWaveformCodeExamples.accessibilityExample, 'html');
  browserSupportCode = getFormattedCode(AudioWaveformCodeExamples.browserSupport, 'typescript');

  // Interactive demo state
  isRecording: WritableSignal<boolean> = signal<boolean>(false);
  isRecordingWithoutTimer: WritableSignal<boolean> = signal<boolean>(false);
  isRecordingWithTimer: WritableSignal<boolean> = signal<boolean>(false);
  isRecordingWithDownload: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private aiPromptService: AiPromptService
  ) { }

  startRecording(): void {
    this.isRecording.set(true);
  }

  stopRecording(): void {
    this.isRecording.set(false);
  }

  startRecordingWithoutTimer(): void {
    this.isRecordingWithoutTimer.set(true);
  }

  stopRecordingWithoutTimer(): void {
    this.isRecordingWithoutTimer.set(false);
  }

  startRecordingWithTimer(): void {
    this.isRecordingWithTimer.set(true);
  }

  stopRecordingWithTimer(): void {
    this.isRecordingWithTimer.set(false);
  }

  startRecordingWithDownload(): void {
    this.isRecordingWithDownload.set(true);
  }

  stopRecordingWithDownload(): void {
    this.isRecordingWithDownload.set(false);
  }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }
}
