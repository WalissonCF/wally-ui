import { Component, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wally-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.html',
})
export class Carousel implements OnInit {
  items = [1, 2, 3, 4];
  itemVisible = signal<number>(0);

  ngOnInit(): void {
  }

  // test - algorithm Circular Buffer:
  nextIndex(currentIndex: number): number {
    return (currentIndex + 1) % this.items.length;
  }

  previosIndex(currentIndex: number): number {
    return (currentIndex - 1 + this.items.length) % this.items.length;
  }

  goNext(): void {
    this.itemVisible.set(this.nextIndex(this.itemVisible()));
  }

  goPrevios(): void {
    this.itemVisible.set(this.previosIndex(this.itemVisible()));
  }

  goToSlide(index: number): void {
    this.itemVisible.set(index);
  }
  // end test Circular Buffer ---
}
