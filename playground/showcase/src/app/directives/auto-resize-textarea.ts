import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[wallyAutoResizeTextarea]'
})
export class AutoResizeTextarea implements AfterViewInit {

  constructor(
    private elementRef: ElementRef<HTMLTextAreaElement>
  ) { }

  ngAfterViewInit(): void {
    this.resize();
  }

  @HostListener('input')
  onInput(): void {
    this.resize();
  }

  private resize(): void {
    const textarea = this.elementRef.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
