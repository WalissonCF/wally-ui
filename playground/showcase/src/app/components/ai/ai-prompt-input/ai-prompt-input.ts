import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { AiChatService } from '../ai-chat.service';

@Component({
  selector: 'wally-ai-prompt-input',
  imports: [ReactiveFormsModule],
  templateUrl: './ai-prompt-input.html',
  styleUrl: './ai-prompt-input.css'
})
export class AiPromptInput implements AfterViewInit, OnDestroy {
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  private destroy$ = new Subject<void>();

  messageControl: FormControl<string> = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(1)
    ]
  });

  private aiChatService: AiChatService = inject(AiChatService);

  constructor() { }

  ngAfterViewInit(): void {
    this.setupAutoResize();
    this.syncWithService();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onInput(): void {
    this.setupAutoResize();
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.aiChatService.sendMessage();
      this.clearInput();
    }
  }

  private syncWithService(): void {
    this.messageControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(100)
      )
      .subscribe((value: string) => {
        this.aiChatService.updateCurrentUserMessage(value);
      });

    this.aiChatService.currentUserMessage$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        if (this.messageControl.value !== value) {
          this.messageControl.setValue(value, { emitEvent: false });
          this.setupAutoResize();
        }
      });
  }

  private clearInput(): void {
    this.messageControl.setValue('');
    this.setupAutoResize();
  }

  private setupAutoResize(): void {
    const element = this.textarea.nativeElement;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }
}
