import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'wally-ai-prompt-input',
  imports: [],
  templateUrl: './ai-prompt-input.html',
  styleUrl: './ai-prompt-input.css'
})
export class AiPromptInput implements AfterViewInit {
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  ngAfterViewInit(): void {
    this.adjustHeight();
  }

  public onInput(): void {
    this.adjustHeight();
  }

  private adjustHeight(): void {
    const element = this.textarea.nativeElement;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }
}
